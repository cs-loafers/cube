import os
import sys
import numpy as np
import pickle as pickle
import argparse
import time
from subprocess import Popen, PIPE
from multiprocessing import Process, Queue
o_path = os.getcwd()
sys.path.append(o_path)
sys.path.append('./')
sys.path.append('../')
sys.path.append('../code')
sys.path.append('../data')
sys.path.append('./solvers/cube3/')
sys.path.append(os.path.abspath(os.path.dirname(os.getcwd())+os.path.sep+".") + '/code/environments/')
import env_utils
import socket
import gc
# from solver_algs import Kociemba
# from solver_algs import Optimal
sys.path.append(os.path.abspath(os.path.dirname(os.getcwd())+os.path.sep+".") + '/code/ml_utils/')
import nnet_utils
import search_utils

Environment = env_utils.getEnvironment('cube3')
numParallel = 0
dataQueues = []
resQueues = []
socketName = ''


def dataListener(dataQueue, resQueue, gpuNum=None):
    # Environment = env_utils.getEnvironment('cube3')
    nnet = nnet_utils.loadNnet(os.path.abspath('..')+'/code/savedModels/cube3/1', 'model.meta"', True, Environment, gpuNum=gpuNum)
    while True:
        data = dataQueue.get()
        nnetResult = nnet(data)
        resQueue.put(nnetResult)


def fileListener(sock, heuristicFn, Environment):
    sock.listen(1)
    exampleState = np.expand_dims(Environment.generate_envs(1, [0, 0])[0][0], 0)
    stateDim = exampleState.shape[1]

    maxBytes = 4096
    connection, client_address = sock.accept()
    while True:
        dataRec = connection.recv(8)
        while not dataRec:
            connection, client_address = sock.accept()
            dataRec = connection.recv(8)

        numBytesRecv = np.frombuffer(dataRec, dtype=np.int64)[0]

        # startTime = time.time()
        numBytesSeen = 0
        dataRec = ""
        while numBytesSeen < numBytesRecv:
            conRec = connection.recv(maxBytes)
            dataRec = dataRec + conRec
            numBytesSeen = numBytesSeen + len(conRec)

        states = np.frombuffer(dataRec, dtype=Environment.dtype)
        states = states.reshape(len(states) / stateDim, stateDim)
        # print("Rec Time: %s" % (time.time()-startTime))

        ### Run nnet
        # startTime = time.time()
        results = heuristicFn(states)
        # print("Heur Time: %s" % (time.time()-startTime))

        ### Write file
        # startTime = time.time()
        connection.sendall(results.astype(np.float32))
        # print("Write Time: %s" % (time.time()-startTime))


def validSoln(state, soln, Environment):
    solnState = state
    for move in soln:
        solnState = Environment.next_state(solnState, move)

    return (Environment.checkSolved(solnState))


def heuristicFn_nnet(x):
    ### Write data
    parallelNums = range(min(numParallel, x.shape[0]))
    splitIdxs = np.array_split(np.arange(x.shape[0]), len(parallelNums))
    for num in parallelNums:
        dataQueues[num].put(x[splitIdxs[num]])

    ### Check until all data is obtaied
    results = [None] * len(parallelNums)
    for num in parallelNums:
        results[num] = resQueues[num].get()

    results = np.concatenate(results)

    return (results)


def solve(state):
    global numParallel
    global socketName
    sys.path.append('./')
    sys.path.append('./solvers/cube3/')
    sys.path.append(os.path.abspath(os.path.dirname(os.getcwd())+os.path.sep+".") + '/code/solvers/cube3/')
    useGPU = True
    if len(os.environ['CUDA_VISIBLE_DEVICES']) > 1:
        gpuNums = [int(x) for x in os.environ['CUDA_VISIBLE_DEVICES'].split(",")]
    else:
        gpuNums = [None]
    numParallel = len(gpuNums)

    ### Initialize files
    for num in range(numParallel):
        dataQueues.append(Queue(1))
        resQueues.append(Queue(1))

        dataListenerProc = Process(target=dataListener, args=(dataQueues[num], resQueues[num], gpuNums[num],))
        dataListenerProc.daemon = True
        dataListenerProc.start()

    outFileLoc_pre = "a"
    socketName = "%s_socket" % (outFileLoc_pre)
    try:
        os.unlink(socketName)
    except OSError:
        if os.path.exists(socketName):
            raise

    sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
    sock.bind(socketName)

    fileListenerProc = Process(target=fileListener, args=(sock, heuristicFn_nnet, Environment,))
    fileListenerProc.daemon = True
    fileListenerProc.start()
    [state, soln] = runMethods(state)
    # print(soln)
    return soln


def runMethods(state):
    stateStr = " ".join([str(x) for x in state])
    # print(stateStr)
    start_time = time.time()
    runType = "python"
        # if (args.env.upper() in ['CUBE3','PUZZLE15','PUZZLE24','PUZZLE35']) or ('LIGHTSOUT' in args.env.upper()):
        #    runType = "cpp"
        # else:
    #    runType = "python"
    if runType == "cpp":
        popen = Popen(
            ['./ml_utils/parallel_weighted_astar', stateStr, str(0.2), str(100),
             socketName, 'cube3'], stdout=PIPE, stderr=PIPE, bufsize=1, universal_newlines=True)
        lines = []
        for stdout_line in iter(popen.stdout.readline, ""):
            stdout_line = stdout_line.strip('\n')
            lines.append(stdout_line)
            # if args.verbose:
            #     sys.stdout.write("%s\n" % (stdout_line))
            #     sys.stdout.flush()

        moves = [int(x) for x in lines[-3].split(" ")[:-1]]
        soln = [Environment.legalPlays[x] for x in moves][::-1]
        nodesGenerated_num = int(lines[-1])
    else:
        BestFS_solve = search_utils.BestFS_solve([state], heuristicFn_nnet, Environment, 0)
        isSolved, solveSteps, nodesGenerated_num = BestFS_solve.run(numParallel=100,
                                                                    depthPenalty=0.2,
                                                                    verbose=False)
        BestFS_solve = []
        del BestFS_solve
        gc.collect()

        soln = solveSteps[0]
        nodesGenerated_num = nodesGenerated_num[0]

    elapsedTime = time.time() - start_time
    assert (validSoln(state, soln, Environment))
    return [state, soln]

