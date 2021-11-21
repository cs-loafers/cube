import json
import os
import sys
import numpy as np
from django.shortcuts import render, HttpResponse



os.environ['CUDA_VISIBLE_DEVICES']='0'  # Add this line to run Python app.py directly. The function of this line is to specify GPU 0
o_path = os.getcwd()
sys.path.append(o_path)
sys.path.append('../')
sys.path.append('./code/scripts/')
#import nnetSolve

FEToState = [6, 3, 0, 7, 4, 1, 8, 5, 2, 15, 12, 9, 16, 13, 10, 17, 14, 11, 24, 21, 18, 25, 22, 19, 26, 23, 20, 33, 30, 27, 34, 31, 28, 35, 32, 29, 38, 41, 44, 37, 40, 43, 36, 39, 42, 51, 48, 45, 52, 49, 46, 53, 50, 47]
legalMoves = ["U_-1", "U_1", "D_-1", "D_1", "L_-1", "L_1", "R_-1", "R_1", "B_-1", "B_1", "F_-1", "F_1"]
rotateIdxs_new = {
    "B_-1": [36, 37, 38, 38, 41, 44, 44, 43, 42, 42, 39, 36, 2, 5, 8, 35, 34, 33, 15, 12, 9, 18, 19, 20],
    "B_1": [36, 37, 38, 38, 41, 44, 44, 43, 42, 42, 39, 36, 2, 5, 8, 35, 34, 33, 15, 12, 9, 18, 19, 20],
    "D_-1": [9, 10, 11, 11, 14, 17, 17, 16, 15, 15, 12, 9, 18, 21, 24, 36, 39, 42, 27, 30, 33, 45, 48, 51],
    "D_1": [9, 10, 11, 11, 14, 17, 17, 16, 15, 15, 12, 9, 18, 21, 24, 36, 39, 42, 27, 30, 33, 45, 48, 51],
    "F_-1": [45, 46, 47, 47, 50, 53, 53, 52, 51, 51, 48, 45, 0, 3, 6, 24, 25, 26, 17, 14, 11, 29, 28, 27],
    "F_1": [45, 46, 47, 47, 50, 53, 53, 52, 51, 51, 48, 45, 0, 3, 6, 24, 25, 26, 17, 14, 11, 29, 28, 27],
    "L_-1": [18, 19, 20, 20, 23, 26, 26, 25, 24, 24, 21, 18, 0, 1, 2, 44, 43, 42, 9, 10, 11, 45, 46, 47],
    "L_1": [18, 19, 20, 20, 23, 26, 26, 25, 24, 24, 21, 18, 0, 1, 2, 44, 43, 42, 9, 10, 11, 45, 46, 47],
    "R_-1": [27, 28, 29, 29, 32, 35, 35, 34, 33, 33, 30, 27, 6, 7, 8, 51, 52, 53, 15, 16, 17, 38, 37, 36],
    "R_1": [27, 28, 29, 29, 32, 35, 35, 34, 33, 33, 30, 27, 6, 7, 8, 51, 52, 53, 15, 16, 17, 38, 37, 36],
    "U_-1": [0, 1, 2, 2, 5, 8, 8, 7, 6, 6, 3, 0, 20, 23, 26, 47, 50, 53, 29, 32, 35, 38, 41, 44],
    "U_1": [0, 1, 2, 2, 5, 8, 8, 7, 6, 6, 3, 0, 20, 23, 26, 47, 50, 53, 29, 32, 35, 38, 41, 44]}
rotateIdxs_old = {
    "B_-1": [38, 41, 44, 44, 43, 42, 42, 39, 36, 36, 37, 38, 18, 19, 20, 2, 5, 8, 35, 34, 33, 15, 12, 9],
    "B_1": [42, 39, 36, 36, 37, 38, 38, 41, 44, 44, 43, 42, 35, 34, 33, 15, 12, 9, 18, 19, 20, 2, 5, 8],
    "D_-1": [11, 14, 17, 17, 16, 15, 15, 12, 9, 9, 10, 11, 45, 48, 51, 18, 21, 24, 36, 39, 42, 27, 30, 33],
    "D_1": [15, 12, 9, 9, 10, 11, 11, 14, 17, 17, 16, 15, 36, 39, 42, 27, 30, 33, 45, 48, 51, 18, 21, 24],
    "F_-1": [47, 50, 53, 53, 52, 51, 51, 48, 45, 45, 46, 47, 29, 28, 27, 0, 3, 6, 24, 25, 26, 17, 14, 11],
    "F_1": [51, 48, 45, 45, 46, 47, 47, 50, 53, 53, 52, 51, 24, 25, 26, 17, 14, 11, 29, 28, 27, 0, 3, 6],
    "L_-1": [20, 23, 26, 26, 25, 24, 24, 21, 18, 18, 19, 20, 45, 46, 47, 0, 1, 2, 44, 43, 42, 9, 10, 11],
    "L_1": [24, 21, 18, 18, 19, 20, 20, 23, 26, 26, 25, 24, 44, 43, 42, 9, 10, 11, 45, 46, 47, 0, 1, 2],
    "R_-1": [29, 32, 35, 35, 34, 33, 33, 30, 27, 27, 28, 29, 38, 37, 36, 6, 7, 8, 51, 52, 53, 15, 16, 17],
    "R_1": [33, 30, 27, 27, 28, 29, 29, 32, 35, 35, 34, 33, 51, 52, 53, 15, 16, 17, 38, 37, 36, 6, 7, 8],
    "U_-1": [2, 5, 8, 8, 7, 6, 6, 3, 0, 0, 1, 2, 38, 41, 44, 20, 23, 26, 47, 50, 53, 29, 32, 35],
    "U_1": [6, 3, 0, 0, 1, 2, 2, 5, 8, 8, 7, 6, 47, 50, 53, 29, 32, 35, 38, 41, 44, 20, 23, 26]}
state = [2, 5, 8, 1, 4, 7, 0, 3, 6, 11, 14, 17, 10, 13, 16, 9, 12, 15, 20, 23, 26, 19, 22, 25, 18, 21, 24, 29, 32, 35, 28, 31, 34, 27, 30, 33, 42, 39, 36, 43, 40, 37, 44, 41, 38, 47, 50, 53, 46, 49, 52, 45, 48, 51]
stateToFE = [2, 5, 8, 1, 4, 7, 0, 3, 6, 11, 14, 17, 10, 13, 16, 9, 12, 15, 20, 23, 26, 19, 22, 25, 18, 21, 24, 29, 32, 35, 28, 31, 34, 27, 30, 33, 42, 39, 36, 43, 40, 37, 44, 41, 38, 47, 50, 53, 46, 49, 52, 45, 48, 51]

edges = [[1, 43], [5, 28], [7, 46], [3, 19], [30, 50], [32, 41], [39, 21], [23, 48], [10, 52], [14, 34], [16, 37], [12, 25]]
edgesSet = {2: [1, 23], 3: [7, 32], 4: [5, 41], 5: [3, 50], 12: [10, 21], 13: [16, 30], 14: [12, 39], 15: [14, 48], 24: [19, 43], 25: [25, 46], 34: [34, 37], 35: [28, 52]}
angles = [[0, 18, 42], [2, 29, 44], [6, 20, 45], [8, 27, 47], [9, 26, 51], [11, 33, 53], [15, 24, 36], [17, 35, 38]]
anglesSet = {24: [2, 20, 44], 25: [0, 26, 47], 34: [8, 35, 38], 35: [6, 29, 53], 124: [9, 18, 42], 125: [11, 24, 45], 134: [15, 33, 36], 135: [17, 27, 51]}


def index(requests):
    return render(requests,'index.html')


def index_plus(requests):
    return render(requests, 'index.plus.html')


def initState(requests):
    data = {'FEToState': FEToState, 'legalMoves': legalMoves, 'rotateIdxs_new': rotateIdxs_new, 'rotateIdxs_old': rotateIdxs_old, 'state': state, 'stateToFE': stateToFE}
    return HttpResponse(json.dumps(data))


def reOrderArray(arr, indecies):
    temp = []
    for i in range(len(indecies)):
        index = indecies[i]
        temp.append(arr[index])
    return temp


def color2Status(color):
    status = [0] * 54
    for i in range(6):
        status[4 + i * 9] = 4 + i * 9
    for edge in edges:
        color1 = color[edge[0]]
        color2 = color[edge[1]]
        if color1 > color2:
            hColor = color1
            lColor = color2
            hIdx = edge[0]
            lIdx = edge[1]
        else:
            hColor = color2
            lColor = color1
            hIdx = edge[1]
            lIdx = edge[0]
        edgeIdx = 10 * lColor + hColor
        if edgeIdx in edgesSet.keys():
            edgeStatus = edgesSet[edgeIdx]
        else:
            print("not in leng")
            return False
        status[lIdx] = edgeStatus[0]
        status[hIdx] = edgeStatus[1]
    for angle in angles:
        angleColor = [color[angle[0]], color[angle[1]], color[angle[2]]]
        sortColor = []
        for i in angleColor:
            sortColor.append(i)
        sortColor.sort()
        idxArr = []
        angleIdx = 0
        for i in range(3):
            angleIdx = sortColor[i] + angleIdx * 10
            for j in range(3):
                if angleColor[j] == sortColor[i]:
                    idxArr.append(angle[j])
                    break
        if angleIdx in anglesSet.keys():
            angleStatus = anglesSet[angleIdx]
        else:
            print("not in jiao")
            return False
        for i in range(3):
            status[idxArr[i]] = angleStatus[i]
    # print(status)
    for checkStickers in range(0, 54):
        if checkStickers not in status:
            return False
    return status


# def solve(request):
#     url = 'http://deepcube.igb.uci.edu'
#     import requests
#     state = request.POST.get('state')
#     r = requests.post(url + '/solve', data={'state': state})
#     key = json.loads(r.text)    # json content
#     return HttpResponse(json.dumps(key))


def solve(request):
    o_path = os.getcwd()
    sys.path.append(o_path)
    sys.path.append('../')
    sys.path.append('./code/scripts/')
    sys.path.append(os.path.abspath(os.path.dirname(os.getcwd())+os.path.sep+".") + '/code/scripts/')
    import nnetSolve
    stateUnicode = request.POST.get('state')
    stateStr = stateUnicode.encode('utf-8')
    stateStr = stateStr.replace("[", "")
    stateStr = stateStr.replace("]", "")
    stateSpilt = stateStr.split(",")
    stateArray = []
    for stickers in stateSpilt:
        stateArray.append(int(stickers))
    stateArray2 = reOrderArray(stateArray, FEToState)
    state = np.array(stateArray2)
    soln = nnetSolve.solve(state)
    moves = []
    moves_rev = []
    solve_text = []
    for step in soln:
        if step[1] == -1:
            moves.append(step[0] + "_-1")
            moves_rev.append(step[0] + "_1")
            solve_text.append(step[0] + "'")
        else:
            moves.append(step[0] + "_1")
            moves_rev.append(step[0] + "_-1")
            solve_text.append(step[0])
    data = {'moves': moves, 'moves_rev': moves_rev, 'solve_text': solve_text}
    return HttpResponse(json.dumps(data))


def reOrderArray(arr, indecies):
    temp = []
    for i in range(len(indecies)):
        index = indecies[i]
        temp.append(arr[index])
    return temp


def solve_plus(request):
    o_path = os.getcwd()
    sys.path.append(o_path)
    sys.path.append('../')
    sys.path.append('./code/scripts/')
    sys.path.append(os.path.abspath(os.path.dirname(os.getcwd())+os.path.sep+".") + '/code/scripts/')
    import nnetSolve
    stateUnicode = request.POST.get('state')
    stateStr = stateUnicode.encode('utf-8')
    stateStr = stateStr.replace("[", "")
    stateStr = stateStr.replace("]", "")
    stateSpilt = stateStr.split(",")
    colorArray = []
    for stickers in stateSpilt:
        colorArray.append(int(stickers) // 9)
    stateArray = color2Status(colorArray)
    if stateArray == False:
        print("error")
        data = {'moves': [], 'moves_rev': [], 'solve_text': [], 'state': [], 'error': 1}
        return data
    stateArray2 = reOrderArray(stateArray, FEToState)
    state = np.array(stateArray2)
    soln = nnetSolve.solve(state)
    moves = []
    moves_rev = []
    solve_text = []
    for step in soln:
        if step[1] == -1:
            moves.append(step[0] + "_-1")
            moves_rev.append(step[0] + "_1")
            solve_text.append(step[0] + "'")
        else:
            moves.append(step[0] + "_1")
            moves_rev.append(step[0] + "_-1")
            solve_text.append(step[0])
    data = {'moves': moves, 'moves_rev': moves_rev, 'solve_text': solve_text, 'state': stateArray, 'error': 0}
    return HttpResponse(json.dumps(data))