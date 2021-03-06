#coding:utf-8

from django.test import TestCase, Client
import json
import copy


def reOrderArray(arr, indecies):
    temp = []
    for i in range(len(indecies)):
        index = indecies[i]
        temp.append(arr[index])
    return temp


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

stateSet_200 = [
[0,41,51,37,4,14,53,28,9,44,32,38,19,13,10,45,30,33,47,34,29,25,22,50,24,43,2,42,48,17,1,31,39,8,21,36,11,16,15,46,40,12,26,5,27,6,52,18,3,49,23,20,7,35],
[47,23,2,37,4,41,45,43,18,35,39,15,30,13,48,27,21,6,26,34,24,7,22,28,51,16,8,9,5,44,3,31,25,36,14,29,17,10,53,32,40,46,0,1,20,11,19,42,52,49,50,38,12,33],
[9,34,11,32,4,12,38,48,33,51,1,20,25,13,41,0,50,53,42,7,8,10,22,30,26,46,27,36,39,45,19,31,52,2,5,6,47,3,29,21,40,28,18,37,24,35,14,15,16,49,43,17,23,44]
]

# ????????????
class viewTestCase(TestCase):

    @classmethod
    def setUpClass(cls):
    	print("allstart")
    	
    @classmethod
    def tearDownClass(cls):
    	print("allDown")
    	
#    def setUp(self):
#        print("hello world")
#        
#    def tearDown(self):
#    	print("tearDown")
    
    # ??????get
    def test_index(self):
    	resp = self.client.get('/index/')
    	self.assertEqual(resp.status_code, 200)
    	
    def test_index_guidance(self):
    	resp = self.client.get('/index/guidance/')
    	self.assertEqual(resp.status_code, 200)
        
    def test_index_challenge(self):
    	resp = self.client.get('/index/challenge/')
    	self.assertEqual(resp.status_code, 200)
    	
    # ??????post initState, ????????????
    # ?????????initState???solvePlus???????????????????????????????????????????????????
    def test_guidance_init_state(self):
    	resp = self.client.post('/index/guidance/initState/', data={}, dataType='json')
    	self.assertEqual(resp.status_code, 200)
    	resp_json = json.loads(resp.content)
    	self.assertEqual(FEToState, resp_json['FEToState'])
    	self.assertEqual(legalMoves, resp_json['legalMoves'])
    	self.assertEqual(rotateIdxs_new, resp_json['rotateIdxs_new'])
    	self.assertEqual(rotateIdxs_old, resp_json['rotateIdxs_old'])
    	self.assertEqual(state, resp_json['state'])
    	self.assertEqual(stateToFE, resp_json['stateToFE'])
    	
    # ??????solve
    # ???????????????????????????????????????,??????????????????????????????????????????,?????????????????????,???????????????
#    def test_guidance_solve(self):
#        for s in stateSet_200:
#            resp = self.client.post('/index/guidance/solvePlus/', data={"state": json.dumps(s)}, dataType='json')
#            # ???????????????move?????????????????????????????????????????????????????????????????????state
#            for move in json.loads(resp.content)["moves"]:
#                s_rep = reOrderArray(s,FEToState)
#                newState_rep = copy.deepcopy(s_rep)
#                for i in range(len(rotateIdxs_new[move])):
#                    newState_rep[rotateIdxs_new[move][i]] = s_rep[rotateIdxs_old[move][i]]
#                newState = reOrderArray(newState_rep,stateToFE);
#                s = newState
#            self.assertEqual(s, state)
           
            
    def test_web(self):
        import subprocess
        import os
        import sys
        from selenium import webdriver
        from time import sleep
        
        p = subprocess.Popen("bash start.sh", shell=True)
        
        driver = webdriver.Chrome()
        driver.get("http://localhost:8000/index/")
        sleep(3)
        driver.find_element_by_id("scramble").click()
#        driver.find_element_by_id("solve").click()

        driver.quit()
        
        p.kill()
    	    
        
