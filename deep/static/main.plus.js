
var state = [];
var rotateIdxs_old = null;
var rotateIdxs_new = null;
var stateToFE = null;
var FEToState = null;
var legalMoves = null;

//当前步骤
var solveStartState = [];
var solveMoves = [];
var solveMoves_rev = [];
var solveIdx = null;
var solution_text = null;

var faceNames = ["top", "bottom", "left", "right", "back", "front"];
var colorMap = {0: "#ffffff", 1: "#ffff1a", 4: "#0000ff", 5: "#33cc33", 2: "#ff8000",3: "#e60000"};
var lastMouseX = 0, lastMouseY = 0;
var rotX = -30, rotY = -30;

var moves = [];

function reOrderArray(arr,indecies) {
	var temp = [];
	for(var i = 0; i < indecies.length; i++) {
		var index = indecies[i];
		temp.push(arr[index]);
	}

	return temp;
}

// 取一min到max的数
function randInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}


function clearCube() {
	for (i = 0; i < faceNames.length; i++) {
		var myNode = document.getElementById(faceNames[i]);
		while (myNode.firstChild) {
			myNode.removeChild(myNode.firstChild);
		}
	}
}


// rbg转颜色
function translateColors(color) {
	switch (color) {
		case "rgb(255, 255, 255)":
			return "white";
		case "rgb(255, 128, 0)":
			return "orange";
		case "rgb(51, 204, 51)":
			return "green";
		case "rgb(230, 0, 0)":
			return "red";
		case "rgb(0, 0, 255)":
			return "blue";
		case "rgb(255, 255, 26)":
			return "yellow";
		default:
			return "black";
	}
}

// 根据newState设置颜色?
function setStickerColors(newState) {
	state = newState;
	clearCube();

	idx = 0;
	for (i = 0; i < faceNames.length; i++) {
		for (j = 0; j < 9; j++) {
			var iDiv = document.createElement('div');
			iDiv.className = 'sticker';
			iDiv.style["background-color"] = colorMap[Math.floor(newState[idx]/9)]
			document.getElementById(faceNames[i]).appendChild(iDiv);
			idx = idx + 1;
		}
	}


	// 魔方编码方式
	//
	//				36 37 38
	//				39 40 41
	//				42 43 44
	//
	//	27 28 29	00 01 02	18 19 20	17 16 15
	//	30 31 32	03 04 05	21 22 23	14 13 12
	//	33 34 35	06 07 08	24 25 26	11 10 09
	//
	//				45 46 47
	//				48 49 50
	//				51 52 53
	//
	// 涂色展开图编码方式
	//
	//				00 01 02
	//				03 04 05
	//				06 07 08
	//
	//	18 19 20	45 46 47	27 28 29	44 43 42
	//	21 22 23	48 49 50	30 31 32	41 40 39
	//	24 25 26	51 52 53	33 34 35	38 37 36
	//
	//				09 10 11
	//				12 13 14
	//				15 16 17
	if (document.getElementById('redButton')){
	    var stickers = document.getElementsByClassName("sticker");
	    document.getElementById("stickers_0").style.backgroundColor = translateColors(stickers[36].style.backgroundColor);
	    document.getElementById("stickers_1").style.backgroundColor = translateColors(stickers[37].style.backgroundColor);
	    document.getElementById("stickers_2").style.backgroundColor = translateColors(stickers[38].style.backgroundColor);
	    document.getElementById("stickers_3").style.backgroundColor = translateColors(stickers[39].style.backgroundColor);
	    document.getElementById("stickers_4").style.backgroundColor = translateColors(stickers[40].style.backgroundColor);
	    document.getElementById("stickers_5").style.backgroundColor = translateColors(stickers[41].style.backgroundColor);
	    document.getElementById("stickers_6").style.backgroundColor = translateColors(stickers[42].style.backgroundColor);
	    document.getElementById("stickers_7").style.backgroundColor = translateColors(stickers[43].style.backgroundColor);
	    document.getElementById("stickers_8").style.backgroundColor = translateColors(stickers[44].style.backgroundColor);
	    document.getElementById("stickers_18").style.backgroundColor = translateColors(stickers[27].style.backgroundColor);
	    document.getElementById("stickers_19").style.backgroundColor = translateColors(stickers[28].style.backgroundColor);
	    document.getElementById("stickers_20").style.backgroundColor = translateColors(stickers[29].style.backgroundColor);
	    document.getElementById("stickers_21").style.backgroundColor = translateColors(stickers[30].style.backgroundColor);
	    document.getElementById("stickers_22").style.backgroundColor = translateColors(stickers[31].style.backgroundColor);
	    document.getElementById("stickers_23").style.backgroundColor = translateColors(stickers[32].style.backgroundColor);
	    document.getElementById("stickers_24").style.backgroundColor = translateColors(stickers[33].style.backgroundColor);
	    document.getElementById("stickers_25").style.backgroundColor = translateColors(stickers[34].style.backgroundColor);
	    document.getElementById("stickers_26").style.backgroundColor = translateColors(stickers[35].style.backgroundColor);
	    document.getElementById("stickers_45").style.backgroundColor = translateColors(stickers[0].style.backgroundColor);
	    document.getElementById("stickers_46").style.backgroundColor = translateColors(stickers[1].style.backgroundColor);
	    document.getElementById("stickers_47").style.backgroundColor = translateColors(stickers[2].style.backgroundColor);
	    document.getElementById("stickers_48").style.backgroundColor = translateColors(stickers[3].style.backgroundColor);
	    document.getElementById("stickers_49").style.backgroundColor = translateColors(stickers[4].style.backgroundColor);
	    document.getElementById("stickers_50").style.backgroundColor = translateColors(stickers[5].style.backgroundColor);
	    document.getElementById("stickers_51").style.backgroundColor = translateColors(stickers[6].style.backgroundColor);
	    document.getElementById("stickers_52").style.backgroundColor = translateColors(stickers[7].style.backgroundColor);
	    document.getElementById("stickers_53").style.backgroundColor = translateColors(stickers[8].style.backgroundColor);
	    document.getElementById("stickers_27").style.backgroundColor = translateColors(stickers[18].style.backgroundColor);
	    document.getElementById("stickers_28").style.backgroundColor = translateColors(stickers[19].style.backgroundColor);
	    document.getElementById("stickers_29").style.backgroundColor = translateColors(stickers[20].style.backgroundColor);
	    document.getElementById("stickers_30").style.backgroundColor = translateColors(stickers[21].style.backgroundColor);
	    document.getElementById("stickers_31").style.backgroundColor = translateColors(stickers[22].style.backgroundColor);
	    document.getElementById("stickers_32").style.backgroundColor = translateColors(stickers[23].style.backgroundColor);
	    document.getElementById("stickers_33").style.backgroundColor = translateColors(stickers[24].style.backgroundColor);
	    document.getElementById("stickers_34").style.backgroundColor = translateColors(stickers[25].style.backgroundColor);
	    document.getElementById("stickers_35").style.backgroundColor = translateColors(stickers[26].style.backgroundColor);
	    document.getElementById("stickers_44").style.backgroundColor = translateColors(stickers[17].style.backgroundColor);
	    document.getElementById("stickers_43").style.backgroundColor = translateColors(stickers[16].style.backgroundColor);
	    document.getElementById("stickers_42").style.backgroundColor = translateColors(stickers[15].style.backgroundColor);
	    document.getElementById("stickers_41").style.backgroundColor = translateColors(stickers[14].style.backgroundColor);
	    document.getElementById("stickers_40").style.backgroundColor = translateColors(stickers[13].style.backgroundColor);
	    document.getElementById("stickers_39").style.backgroundColor = translateColors(stickers[12].style.backgroundColor);
	    document.getElementById("stickers_38").style.backgroundColor = translateColors(stickers[11].style.backgroundColor);
	    document.getElementById("stickers_37").style.backgroundColor = translateColors(stickers[10].style.backgroundColor);
	    document.getElementById("stickers_36").style.backgroundColor = translateColors(stickers[9].style.backgroundColor);
	    document.getElementById("stickers_9").style.backgroundColor = translateColors(stickers[45].style.backgroundColor);
	    document.getElementById("stickers_10").style.backgroundColor = translateColors(stickers[46].style.backgroundColor);
	    document.getElementById("stickers_11").style.backgroundColor = translateColors(stickers[47].style.backgroundColor);
	    document.getElementById("stickers_12").style.backgroundColor = translateColors(stickers[48].style.backgroundColor);
	    document.getElementById("stickers_13").style.backgroundColor = translateColors(stickers[49].style.backgroundColor);
	    document.getElementById("stickers_14").style.backgroundColor = translateColors(stickers[50].style.backgroundColor);
	    document.getElementById("stickers_15").style.backgroundColor = translateColors(stickers[51].style.backgroundColor);
	    document.getElementById("stickers_16").style.backgroundColor = translateColors(stickers[52].style.backgroundColor);
	    document.getElementById("stickers_17").style.backgroundColor = translateColors(stickers[53].style.backgroundColor);
	}
}

// 增加计时功能
// 状态存储队列,当前增加的组件ID(number),限制保存状态的个数
var stateQueue = [];
var indexNewBotton = 10000;
var LIMIT = 5;
var n = 0;
var restartFlag = false;

// 读取状态
function addButtonTimeStateShow(newBottonId){
    setStickerColors(stateQueue[newBottonId-10000]);
}

function addButtonTimeState(){
    // 提示已满
    //TODO 重复的状态不允许再存
    if(n == LIMIT){
        alert("魔方状态存得太多啦，删掉一些吧");
        return;
    }
    //如果该位置已经存过状态了，转下一个位置
    while(stateQueue[Number(indexNewBotton)-10000] != null){
        // 递增
        indexNewBotton = ((indexNewBotton + 1) % 10000) % LIMIT + 10000;
    }
    stateQueue[Number(indexNewBotton)-10000] = state;
    var o=document.createElement("input");
    var oDelete=document.createElement("input");
    
    o.id=indexNewBotton;
    o.type = "button" ; 
    o.style = "";
    o.value = document.getElementById('fen').value + "m" + document.getElementById('miao').value +"s";
    
    
    oDelete.id="d_" + indexNewBotton;
    oDelete.type = "button" ; 
    oDelete.style = "color:rgb(227, 23, 13);";
    oDelete.value = "删除";
    
    var div = document.createElement("div"); 
    div.id = "v_" + indexNewBotton;
    div.appendChild(o);
    div.appendChild(oDelete);
    div.style = "display: inline-block; float: left; width: 80px;"
    
    document.getElementById('saveStatesolution_container').appendChild(div);
    n++;

    // o.addEventListener("click",addButtonTimeStateShow(Number(document.getElementById(indexNewBotton).id)));
    // o.addEventListener("click",newindex());
    
    // 读取
    o.onclick=function(){
        if (confirm("确定要读取这个状态吗？现在未保存的进度会消失！")) {
            var val=$(this).attr("id");
            addButtonTimeStateShow(val);
        }
    };
    
    // 删除
    oDelete.onclick=function(){
        if (confirm("确定要删除这个状态吗？")) {
            var val=$(this).attr("id");
            var num = val.split("_")[1];
            var v = document.getElementById("v_" + num)
            v.parentNode.removeChild(v);
            stateQueue[Number(num)-10000] = null;
            n--;
            console.log(stateQueue);
        }
    };
    // 及时解除不再使用的变量引用,即将其赋值为 null;  
    o = null;
    oDelete= null;
    div = null;
    
}


// function newindex(){
//   a = Number(document.getElementById(indexNewBotton).id);
//   alert(a);
// }


function buttonPressed(ev) {
	var face = ''
	var direction = '1'

	if (ev.shiftKey) {
		direction = '-1'
	}
	if (ev.which == 85 || ev.which == 117) {
		face='U'
	} else if (ev.which == 68 || ev.which == 100) {
		face = 'D'
	} else if (ev.which == 76 || ev.which == 108) {
		face = 'L'
	} else if (ev.which == 82 || ev.which == 114) {
		face = 'R'
	} else if (ev.which == 66 || ev.which == 98) {
		face = 'B'
	} else if (ev.which == 70 || ev.which == 102) {
		face = 'F'
	}
	if (face != '') {
		clearSoln();
		moves.push(face + "_" + direction);
		nextState();
	}
}

// 启用前进、后退等四个Scroll按钮
function enableScroll() {
	document.getElementById("first_state").disabled=false;
	document.getElementById("prev_state").disabled=false;
	document.getElementById("next_state").disabled=false;
	document.getElementById("last_state").disabled=false;
}


// 禁止前进、后退等四个Scroll按钮
function disableScroll() {
	//so keyboard input can work without having to click away from disabled button
	document.getElementById("first_state").blur(); 
	document.getElementById("prev_state").blur();
	document.getElementById("next_state").blur();
	document.getElementById("last_state").blur();

	document.getElementById("first_state").disabled=true;
	document.getElementById("prev_state").disabled=true;
	document.getElementById("next_state").disabled=true;
	document.getElementById("last_state").disabled=true;
}

// 清除还原解决方案，使Scroll失效
function clearSoln() {
	solveIdx = 0;
	solveStartState = [];
	solveMoves = [];
	solveMoves_rev = [];
	solution_text = null;
	document.getElementById("solution_text").innerHTML = "Solution:";
	disableScroll();
}

function setSolnText(setColor=true) {
	solution_text_mod = JSON.parse(JSON.stringify(solution_text));
	if (solveIdx >= 0) {
		if (setColor == true) {
			solution_text_mod[solveIdx] = solution_text_mod[solveIdx].bold().fontcolor("blue")
		} else {
			solution_text_mod[solveIdx] = solution_text_mod[solveIdx]
		}
	}
	document.getElementById("solution_text").innerHTML = "Solution: "+ solution_text_mod.join(" ");
}

// 启用打乱、解决按钮,绑定buttonPressed到keypress事件,启用旋转按钮和涂色按钮的启用
function enableInput() {
    if(document.getElementById("scramble")){
        document.getElementById("scramble").disabled=false;
	    document.getElementById("solve").disabled=false;
    }
    else{
        document.getElementById("scramble_challenge").disabled=false;
	    document.getElementById("solve_challenge").disabled=false;
    }
	

	$(document).on("keypress", buttonPressed);
	
//	document.getElementById("input").disabled = false;
//	document.getElementById("rotation").disabled = false;
	if (document.getElementById("initcube"))
	    document.getElementById("initcube").disabled = false;
	
	if (document.getElementById('U1')){
	    document.getElementById("U1").disabled = false;
	    document.getElementById("U2").disabled = false;
	    document.getElementById("D1").disabled = false;
	    document.getElementById("D2").disabled = false;
	    document.getElementById("L1").disabled = false;
	    document.getElementById("L2").disabled = false;
	    document.getElementById("R1").disabled = false;
	    document.getElementById("R2").disabled = false;
	    document.getElementById("F1").disabled = false;
	    document.getElementById("F2").disabled = false;
	    document.getElementById("B1").disabled = false;
	    document.getElementById("B2").disabled = false;
	}
	
	if (document.getElementById('redButton')){
	    document.getElementById("redButton").disabled = false;
	    document.getElementById("yellowButton").disabled = false;
	    document.getElementById("orangeButton").disabled = false;
	    document.getElementById("greenButton").disabled = false;
	    document.getElementById("whiteButton").disabled = false;
	    document.getElementById("blueButton").disabled = false;
	    document.getElementById("cancelButton").disabled = false;
	    document.getElementById("stickers_0").disabled = false;
	    document.getElementById("stickers_1").disabled = false;
	    document.getElementById("stickers_2").disabled = false;
	    document.getElementById("stickers_3").disabled = false;
	    document.getElementById("stickers_4").disabled = false;
	    document.getElementById("stickers_5").disabled = false;
	    document.getElementById("stickers_6").disabled = false;
	    document.getElementById("stickers_7").disabled = false;
	    document.getElementById("stickers_8").disabled = false;
	    document.getElementById("stickers_9").disabled = false;
	    document.getElementById("stickers_10").disabled = false;
	    document.getElementById("stickers_11").disabled = false;
	    document.getElementById("stickers_12").disabled = false;
	    document.getElementById("stickers_13").disabled = false;
	    document.getElementById("stickers_14").disabled = false;
	    document.getElementById("stickers_15").disabled = false;
	    document.getElementById("stickers_16").disabled = false;
	    document.getElementById("stickers_17").disabled = false;
	    document.getElementById("stickers_18").disabled = false;
	    document.getElementById("stickers_19").disabled = false;
	    document.getElementById("stickers_20").disabled = false;
	    document.getElementById("stickers_21").disabled = false;
	    document.getElementById("stickers_22").disabled = false;
	    document.getElementById("stickers_23").disabled = false;
	    document.getElementById("stickers_24").disabled = false;
	    document.getElementById("stickers_25").disabled = false;
	    document.getElementById("stickers_26").disabled = false;
	    document.getElementById("stickers_27").disabled = false;
	    document.getElementById("stickers_28").disabled = false;
	    document.getElementById("stickers_29").disabled = false;
	    document.getElementById("stickers_30").disabled = false;
	    document.getElementById("stickers_31").disabled = false;
	    document.getElementById("stickers_32").disabled = false;
	    document.getElementById("stickers_33").disabled = false;
	    document.getElementById("stickers_34").disabled = false;
	    document.getElementById("stickers_35").disabled = false;
	    document.getElementById("stickers_36").disabled = false;
	    document.getElementById("stickers_37").disabled = false;
	    document.getElementById("stickers_38").disabled = false;
	    document.getElementById("stickers_39").disabled = false;
	    document.getElementById("stickers_40").disabled = false;
	    document.getElementById("stickers_41").disabled = false;
	    document.getElementById("stickers_42").disabled = false;
	    document.getElementById("stickers_43").disabled = false;
	    document.getElementById("stickers_44").disabled = false;
	    document.getElementById("stickers_45").disabled = false;
	    document.getElementById("stickers_46").disabled = false;
	    document.getElementById("stickers_47").disabled = false;
	    document.getElementById("stickers_48").disabled = false;
	    document.getElementById("stickers_49").disabled = false;
	    document.getElementById("stickers_50").disabled = false;
	    document.getElementById("stickers_51").disabled = false;
	    document.getElementById("stickers_52").disabled = false;
	    document.getElementById("stickers_53").disabled = false;
	}
}


// 禁用打乱、解决按钮,解除绑定,禁用旋转按钮和涂色按钮
function disableInput() {
    if(document.getElementById("scramble")){
        document.getElementById("scramble").disabled=true;
	    document.getElementById("solve").disabled=true;
    }
    else{
        document.getElementById("scramble_challenge").disabled=true;
	    document.getElementById("solve_challenge").disabled=true;
    }
	$(document).off("keypress", buttonPressed);
	
//	document.getElementById("input").disabled = true;
//	document.getElementById("rotation").disabled = true;
	if (document.getElementById("initcube"))
	    document.getElementById("initcube").disabled = false;
	
	if (document.getElementById('U1')){
	    document.getElementById("U1").disabled = true;
	    document.getElementById("U2").disabled = true;
	    document.getElementById("D1").disabled = true;
	    document.getElementById("D2").disabled = true;
	    document.getElementById("L1").disabled = true;
	    document.getElementById("L2").disabled = true;
	    document.getElementById("R1").disabled = true;
	    document.getElementById("R2").disabled = true;
	    document.getElementById("F1").disabled = true;
	    document.getElementById("F2").disabled = true;
	    document.getElementById("B1").disabled = true;
	    document.getElementById("B2").disabled = true;
	}
	
	if (document.getElementById('redButton')){
	    document.getElementById("redButton").disabled = true;
	    document.getElementById("yellowButton").disabled = true;
	    document.getElementById("orangeButton").disabled = true;
	    document.getElementById("greenButton").disabled = true;
	    document.getElementById("whiteButton").disabled = true;
	    document.getElementById("blueButton").disabled = true;
	    document.getElementById("cancelButton").disabled = true;
        document.getElementById("stickers_0").disabled = true;
	    document.getElementById("stickers_1").disabled = true;
	    document.getElementById("stickers_2").disabled = true;
	    document.getElementById("stickers_3").disabled = true;
	    document.getElementById("stickers_4").disabled = true;
	    document.getElementById("stickers_5").disabled = true;
	    document.getElementById("stickers_6").disabled = true;
	    document.getElementById("stickers_7").disabled = true;
	    document.getElementById("stickers_8").disabled = true;
	    document.getElementById("stickers_9").disabled = true;
	    document.getElementById("stickers_10").disabled = true;
	    document.getElementById("stickers_11").disabled = true;
	    document.getElementById("stickers_12").disabled = true;
	    document.getElementById("stickers_13").disabled = true;
	    document.getElementById("stickers_14").disabled = true;
	    document.getElementById("stickers_15").disabled = true;
	    document.getElementById("stickers_16").disabled = true;
	    document.getElementById("stickers_17").disabled = true;
	    document.getElementById("stickers_18").disabled = true;
	    document.getElementById("stickers_19").disabled = true;
	    document.getElementById("stickers_20").disabled = true;
	    document.getElementById("stickers_21").disabled = true;
	    document.getElementById("stickers_22").disabled = true;
	    document.getElementById("stickers_23").disabled = true;
	    document.getElementById("stickers_24").disabled = true;
	    document.getElementById("stickers_25").disabled = true;
	    document.getElementById("stickers_26").disabled = true;
	    document.getElementById("stickers_27").disabled = true;
	    document.getElementById("stickers_28").disabled = true;
	    document.getElementById("stickers_29").disabled = true;
	    document.getElementById("stickers_30").disabled = true;
	    document.getElementById("stickers_31").disabled = true;
	    document.getElementById("stickers_32").disabled = true;
	    document.getElementById("stickers_33").disabled = true;
	    document.getElementById("stickers_34").disabled = true;
	    document.getElementById("stickers_35").disabled = true;
	    document.getElementById("stickers_36").disabled = true;
	    document.getElementById("stickers_37").disabled = true;
	    document.getElementById("stickers_38").disabled = true;
	    document.getElementById("stickers_39").disabled = true;
	    document.getElementById("stickers_40").disabled = true;
	    document.getElementById("stickers_41").disabled = true;
	    document.getElementById("stickers_42").disabled = true;
	    document.getElementById("stickers_43").disabled = true;
	    document.getElementById("stickers_44").disabled = true;
	    document.getElementById("stickers_45").disabled = true;
	    document.getElementById("stickers_46").disabled = true;
	    document.getElementById("stickers_47").disabled = true;
	    document.getElementById("stickers_48").disabled = true;
	    document.getElementById("stickers_49").disabled = true;
	    document.getElementById("stickers_50").disabled = true;
	    document.getElementById("stickers_51").disabled = true;
	    document.getElementById("stickers_52").disabled = true;
	    document.getElementById("stickers_53").disabled = true;
	}
}

function enableState(){
    for (i in stateQueue){
        document.getElementById(Number(i) + 10000).disabled = true;
        document.getElementById("d_" + (Number(i) + 10000)).disabled = true;
    }
}

function disableState(){
    for (i in stateQueue){
        document.getElementById(Number(i) + 10000).disabled = true;
        document.getElementById("d_" + (Number(i) + 10000)).disabled = true;
    }
}

function nextState(moveTimeout=0) {
	if (moves.length > 0) {
		disableInput();
		disableScroll();
		move = moves.shift(); // get Move

		//convert to python representation
		state_rep = reOrderArray(state,FEToState);
		newState_rep = JSON.parse(JSON.stringify(state_rep));

		//swap stickers
		for (var i = 0; i < rotateIdxs_new[move].length; i++) {
			newState_rep[rotateIdxs_new[move][i]] = state_rep[rotateIdxs_old[move][i]];
		}

		// Change move highlight
		if (moveTimeout != 0){ //check if nextState is used for first_state click, prev_state,etc.
				solveIdx++;
				setSolnText(setColor=true);
		}

		//convert back to HTML representation
		newState = reOrderArray(newState_rep,stateToFE);

		//set new state
		setStickerColors(newState);

		//Call again if there are more moves
		if (moves.length > 0) {
			setTimeout(function(){nextState(moveTimeout)}, moveTimeout);
		} else {
		    if(restartFlag && document.getElementById("restart")){
		        if(document.getElementById("restart").disabled){
		            document.getElementById("restart").disabled = false;
		            disableState();
		        }
		    }
		    else{
		        enableInput();
		    }
		    
			if (solveMoves.length > 0) {
				enableScroll();
				setSolnText();
			}
		}
	} else {
		if (solveMoves.length > 0) {
			enableScroll();
			setSolnText();
		}
	}
}

function scrambleCube() {
	disableInput();
	clearSoln();

	numMoves = randInt(100,200);
	for (var i = 0; i < numMoves; i++) {
		moves.push(legalMoves[randInt(0,legalMoves.length)]);
	}

	nextState(0);
}

function solveCube() {
	msgtxt.length = 0;
	disableInput();
	clearSoln();
	document.getElementById("solution_text").innerText = "TESTING...";
	var stickers = document.getElementsByClassName("sticker");
	// 魔方编码方式
	//
	//				36 37 38
	//				39 40 41
	//				42 43 44
	//
	//	27 28 29	00 01 02	18 19 20	17 16 15
	//	30 31 32	03 04 05	21 22 23	14 13 12
	//	33 34 35	06 07 08	24 25 26	11 10 09
	//
	//				45 46 47
	//				48 49 50
	//				51 52 53
	//
	// 涂色展开图编码方式
	//
	//				00 01 02
	//				03 04 05
	//				06 07 08
	//
	//	18 19 20	45 46 47	27 28 29	44 43 42
	//	21 22 23	48 49 50	30 31 32	41 40 39
	//	24 25 26	51 52 53	33 34 35	38 37 36
	//
	//				09 10 11
	//				12 13 14
	//				15 16 17
	var stickers_background_temparr = [];
	stickers_background_temparr.push(stickers[36].style.backgroundColor);
	stickers_background_temparr.push(stickers[37].style.backgroundColor);
	stickers_background_temparr.push(stickers[38].style.backgroundColor);
	stickers_background_temparr.push(stickers[39].style.backgroundColor);
	stickers_background_temparr.push(stickers[40].style.backgroundColor);
	stickers_background_temparr.push(stickers[41].style.backgroundColor);
	stickers_background_temparr.push(stickers[42].style.backgroundColor);
	stickers_background_temparr.push(stickers[43].style.backgroundColor);
	stickers_background_temparr.push(stickers[44].style.backgroundColor);
	stickers_background_temparr.push(stickers[27].style.backgroundColor);
	stickers_background_temparr.push(stickers[28].style.backgroundColor);
	stickers_background_temparr.push(stickers[29].style.backgroundColor);
	stickers_background_temparr.push(stickers[0].style.backgroundColor);
	stickers_background_temparr.push(stickers[1].style.backgroundColor);
	stickers_background_temparr.push(stickers[2].style.backgroundColor);
	stickers_background_temparr.push(stickers[18].style.backgroundColor);
	stickers_background_temparr.push(stickers[19].style.backgroundColor);
	stickers_background_temparr.push(stickers[20].style.backgroundColor);
	stickers_background_temparr.push(stickers[17].style.backgroundColor);
	stickers_background_temparr.push(stickers[16].style.backgroundColor);
	stickers_background_temparr.push(stickers[15].style.backgroundColor);
	stickers_background_temparr.push(stickers[30].style.backgroundColor);
	stickers_background_temparr.push(stickers[31].style.backgroundColor);
	stickers_background_temparr.push(stickers[32].style.backgroundColor);
	stickers_background_temparr.push(stickers[3].style.backgroundColor);
	stickers_background_temparr.push(stickers[4].style.backgroundColor);
	stickers_background_temparr.push(stickers[5].style.backgroundColor);
	stickers_background_temparr.push(stickers[21].style.backgroundColor);
	stickers_background_temparr.push(stickers[22].style.backgroundColor);
	stickers_background_temparr.push(stickers[23].style.backgroundColor);
	stickers_background_temparr.push(stickers[14].style.backgroundColor);
	stickers_background_temparr.push(stickers[13].style.backgroundColor);
	stickers_background_temparr.push(stickers[12].style.backgroundColor);
	stickers_background_temparr.push(stickers[33].style.backgroundColor);
	stickers_background_temparr.push(stickers[34].style.backgroundColor);
	stickers_background_temparr.push(stickers[35].style.backgroundColor);
	stickers_background_temparr.push(stickers[6].style.backgroundColor);
	stickers_background_temparr.push(stickers[7].style.backgroundColor);
	stickers_background_temparr.push(stickers[8].style.backgroundColor);
	stickers_background_temparr.push(stickers[24].style.backgroundColor);
	stickers_background_temparr.push(stickers[25].style.backgroundColor);
	stickers_background_temparr.push(stickers[26].style.backgroundColor);
	stickers_background_temparr.push(stickers[11].style.backgroundColor);
	stickers_background_temparr.push(stickers[10].style.backgroundColor);
	stickers_background_temparr.push(stickers[9].style.backgroundColor);
	stickers_background_temparr.push(stickers[45].style.backgroundColor);
	stickers_background_temparr.push(stickers[46].style.backgroundColor);
	stickers_background_temparr.push(stickers[47].style.backgroundColor);
	stickers_background_temparr.push(stickers[48].style.backgroundColor);
	stickers_background_temparr.push(stickers[49].style.backgroundColor);
	stickers_background_temparr.push(stickers[50].style.backgroundColor);
	stickers_background_temparr.push(stickers[51].style.backgroundColor);
	stickers_background_temparr.push(stickers[52].style.backgroundColor);
	stickers_background_temparr.push(stickers[53].style.backgroundColor);
	var stickers_background_arr = [];
	for(var i = 0; i < stickers_background_temparr.length; i++){
		switch (stickers_background_temparr[i]) {
			case "rgb(255, 255, 255)":
				stickers_background_arr.push('W');
				break;
			case "rgb(255, 128, 0)":
				stickers_background_arr.push('O');
				break;
			case "rgb(51, 204, 51)":
				stickers_background_arr.push("G");
				break;
			case "rgb(230, 0, 0)":
				stickers_background_arr.push("R");
				break;
			case "rgb(0, 0, 255)":
				stickers_background_arr.push("B");
				break;
			case "rgb(255, 255, 26)":
				stickers_background_arr.push("Y");
				break;
			default:
				break;
		}
	}
	var stickers_background = stickers_background_arr.join('');
	// 对于平面展开图，从左上到右下的颜色简写
	// stickers_background: ROBGWRYBOBWRGOGWGWRWYYORYGRWROGBOYGOYBBWBWRBGBROYYWOYG
	var verify = verify_main(stickers_background); //verify_main是验证魔方的函数
	if (verify == 0) {
		document.getElementById("solution_text").innerHTML = "SOLVING...";
		$.ajax({
			url: 'solvePlus/',
			data: {"state": JSON.stringify(state)},
			type: 'POST',
			dataType: 'json',
			success: function(response) {
			
				solveStartState = JSON.parse(JSON.stringify(state));
				solveMoves = response["moves"];
				solveMoves_rev = response["moves_rev"];
				solution_text = response["solve_text"];
				solution_text.push("SOLVED!");
				setSolnText(true);
                
				moves = JSON.parse(JSON.stringify(solveMoves));

				setTimeout(function(){nextState(500)}, 500);
				
				// 如果不在challenge页面，无所谓
				restartFlag = true;
				
				if(document.getElementById("redButton")){
				    enableInput();
				}
                
			},
			error: function(error) {
					console.log(error);
					document.getElementById("solution_text").innerHTML = "...";
					setTimeout(function(){solveCube()}, 500);
			},
		});
	}
	else{
		document.getElementById("solution_text").innerHTML = msgtxt.join('');
		enableInput();
	}
}

var a=0;
var b=0;
var t;

function timer(){
        document.getElementById('miao').value=b;
        b +=1;
        t = setTimeout(function(){
            timer();
        },1000)
    if(b == 60){
        a= a+1;
        document.getElementById('fen').value = a;
        b=0;
    }
}

function initTimer(){
    a = 0;
    b = 0;
}

// DOM就绪时调用
// 每次刷新时,ajax向initState路由发出请求,获得views的HttpResponse返回数据,用于js
// initState路由本身也可访问得到数据
// 关联各项按钮click事件到函数
$( document ).ready($(function() {
	disableInput();
	
	clearSoln();
	$.ajax({
		url: 'initState/',
		data: {},
		type: 'POST',
		dataType: 'json',
		success: function(response) {
			setStickerColors(response["state"]);
			rotateIdxs_old = response["rotateIdxs_old"];
			rotateIdxs_new = response["rotateIdxs_new"];
			stateToFE = response["stateToFE"];
			FEToState = response["FEToState"];
			legalMoves = response["legalMoves"];
			enableInput();
		},
		error: function(error) {
			console.log(error);
		},
	});

	$("#cube").css("transform", "translateZ( -100px) rotateX( " + rotX + "deg) rotateY(" + rotY + "deg)"); //Initial orientation
	
	

	$('#scramble_challenge').click(function() {
	    if(document.getElementById("scramble_challenge").innerHTML == "开始挑战"){
	        scrambleCube();
	        timer();
	        document.getElementById("saveState").disabled = false;
	        enableState();
	        document.getElementById("scramble_challenge").innerHTML = "重新打乱";
	    }
	    else{
	        if (confirm("真的要重来吗？")) {
	            clearTimeout(t);
	            initTimer();
                scrambleCube();
	            timer();
            }
	    }
	});

	$('#solve_challenge').click(function() {
	    if (confirm("真的要放弃吗？")) {
	        document.getElementById("saveState").disabled = true;
	        disableState();
	        solveCube();
            clearTimeout(t);
            disableInput();
        }
	});
	
	$('#scramble').click(function() {
	    scrambleCube();
	});
	
	$('#solve').click(function() {
	    solveCube();
	});

	$('#first_state').click(function() {
		if (solveIdx > 0) {
			moves = solveMoves_rev.slice(0, solveIdx).reverse();
			solveIdx = 0;
			nextState();
		}
	});

	$('#prev_state').click(function() {
		if (solveIdx > 0) {
			solveIdx = solveIdx - 1;
			moves.push(solveMoves_rev[solveIdx]);
			nextState()
		}
	});

	$('#next_state').click(function() {
		if (solveIdx < solveMoves.length) {
			moves.push(solveMoves[solveIdx]);
			solveIdx = solveIdx + 1;
			nextState()
		}
	});

	$('#last_state').click(function() {
		if (solveIdx < solveMoves.length) {
			moves = solveMoves.slice(solveIdx, solveMoves.length);
			solveIdx = solveMoves.length;
			nextState();
		}
	});

	$('#cube_div').on("mousedown", function(ev) {
		lastMouseX = ev.clientX;
		lastMouseY = ev.clientY;
		$('#cube_div').on("mousemove", mouseMoved);
	});
	$('#cube_div').on("mouseup", function() {
		$('#cube_div').off("mousemove", mouseMoved);
	});
	$('#cube_div').on("mouseleave", function() {
		$('#cube_div').off("mousemove", mouseMoved);
	});
    
//    if (!document.getElementById('redButton')){
//	    console.log( "hi!" );
//	    
//	}
	
}));


function mouseMoved(ev) {
  var deltaX = ev.pageX - lastMouseX;
  var deltaY = ev.pageY - lastMouseY;

  lastMouseX = ev.pageX;
  lastMouseY = ev.pageY;

  rotY += deltaX * 0.2;
  rotX -= deltaY * 0.5;

  $("#cube").css("transform", "translateZ( -100px) rotateX( " + rotX + "deg) rotateY(" + rotY + "deg)");
}

// index.plus中点击涂色按钮对应事件,colors数组中某处为1即对应按钮有效
var colors=[0,0,0,0,0,0];
var data=["red","yellow","orange","green","white","blue"];
var colorWordToIdx = {"white": 0, "yellow": 1, "orange": 2, "red": 3, "blue": 4, "green": 5};
var buttonColor="";

function colorSelect(ele){
	buttonColor=ele.id;
	colors=[0,0,0,0,0,0];
	switch(buttonColor){
		case "redButton":
			colors[0]=1;
			break;
		case "yellowButton":
			colors[1]=1;
			break;
		case "orangeButton":
			colors[2]=1;
			break;
		case "greenButton":
			colors[3]=1;
			break;
		case "whiteButton":
			colors[4]=1;
			break;
		case "blueButton":
			colors[5]=1;
			break;
		case "cancelButton":
			colors=[0,0,0,0,0,0];
		break;
	}
}

// 对平面图任一方块设置颜色
function colorSet(ele){
	var strId = ele.id;
	var tempStickerIdxArr = strId.split('_');
	var tempIdx = parseInt(tempStickerIdxArr[1]);
	var indexSet=-1;
	indexSet=colors.indexOf(1);
	if (indexSet >=0 ){
		var colorValue=data[indexSet];
		var colorIdx = colorWordToIdx[colorValue];
		ele.style.backgroundColor=colorValue;
		state[tempIdx] = 9 * colorIdx;
		setStickerColors(state);
	}
}

//转动按钮
function singleRotation(id){
	switch (id) {
		case "U1":
			moves.push("U_1");
			break;
		case "U2":
			moves.push("U_-1");
			break;
		case "D1":
			moves.push("D_1");
			break;
		case "D2":
			moves.push("D_-1");
			break;
		case "L1":
			moves.push("L_1");
			break;
		case "L2":
			moves.push("L_-1");
			break;
		case "R1":
			moves.push("R_1");
			break;
		case "R2":
			moves.push("R_-1");
			break;
		case "F1":
			moves.push("F_1");
			break;
		case "F2":
			moves.push("F_-1");
			break;
		case "B1":
			moves.push("B_1");
			break;
		case "B2":
			moves.push("B_-1");
			break;
		default:
			break;
	}
	nextState()
}


// 转动??
//function rotation() {
//	var input = document.getElementById("input").value;
//	var input_arr = input.split(/\s+/);
//	moves = [];
//	for (var i = 0; i < input_arr.length; i++){
//		var direction = 1, move = "";
//		if(input_arr[i].indexOf('\'') > 0){
//			direction = -1;
//			move = input_arr[i][0].toString() + "_" + direction.toString();
//		}else if(input_arr[i].indexOf('2') > 0){
//			move = input_arr[i][0].toString() + "_" + direction.toString();
//			moves.push(move);
//		}else{
//			move = input_arr[i][0].toString() + "_" + direction.toString();
//		}
//		moves.push(move);
//	}
//	nextState(0);
//}

// 初始化,和$( document ).ready处重复
function initCube(){
	disableInput();
	clearSoln();
	$.ajax({
		url: 'initState/',
		data: {},
		type: 'POST',
		dataType: 'json',
		success: function(response) {
			setStickerColors(response["state"]);
			rotateIdxs_old = response["rotateIdxs_old"];
			rotateIdxs_new = response["rotateIdxs_new"];
			stateToFE = response["stateToFE"];
			FEToState = response["FEToState"];
			legalMoves = response["legalMoves"];
			enableInput();
		},
		error: function(error) {
			console.log(error);
		},
	});
	document.getElementById('input').value = "";
}


// 验证模块
// 参考: https://github.com/mfeather1/3ColorCube/blob/main/verify.js
"use strict";
var msgtxt = [];
var CENTERS = [4, 22, 25, 28, 31, 49];
var CORNERS = [ 0,  2,  6,  8,  9, 11, 33, 35, 12, 14, 36, 38, 15, 17, 39, 41, 18, 20, 42, 44, 45, 47, 51, 53];
var EDGES =  [ 1,  3,  5,  7, 10, 21, 23, 34, 13, 24, 26, 37, 16, 27, 29, 40, 19, 30, 32, 43, 46, 48, 50, 52];
function verify_main(c) {
  var n;
  n = check_blank(c);   if (n) return(n);
  n = check_centers(c); if (n) return(n);
  n = check_corners(c); if (n) return(n);
  n = check_edges(c);   if (n) return(n);
  n = verify_cubestr(c);
  return(n);
}

function check_blank(c) {
  for (var i=0, n=0; i < 54; i++)
    if (c[i] == 'L')
      n++;
  if (n == 54) {
      msgtxt.push("No colors have been entered<br>Color the cube layout before solving");
    return(1);
  }
  return(0);
}

function check_centers(c) {
  var centers = [];
  for (var i=0; i < 6; i++)
    centers[i] = c[CENTERS[i]];
  for (i=0; i < 6; i++)
    if (centers[i] == 'L') {
        msgtxt.push("There is a problem with the CENTERS, one or more is blank<br>");
      return(1);
    }
  centers.sort();
  var rtn = uniq(centers, 6, 1, 0);
  if (rtn != 0) {
    msgtxt.push("There is a problem with the CENTERS, ");
    msgtxt.push("there should be one of each color but you have:<br>");
    uniq(centers, 6, 1, 1);
    return(1);
  }
  return(0);
}

function check_corners(c) {
  var corners = [];
  for (var i=0; i < 24; i++)
    corners[i] = c[CORNERS[i]];
  for (i=0; i < 24; i++)
    if (corners[i] == 'L') {
      msgtxt.push("There is a problem with the CORNERS, one or more is blank");
      return(1);
    }
  corners.sort();
  var rtn = uniq(corners, 24, 4, 0);
  if (rtn != 0) {
    msgtxt.push("There is a problem with the CORNERS, ");
    msgtxt.push("there should be four of each color but you have:<br>");
    uniq(corners, 24, 4, 1);
    return(1);
  }
  return(0);
}

function check_edges(c) {
  var edges = [];
  for (var i=0; i < 24; i++)
    edges[i] = c[EDGES[i]];
  for (i=0; i < 24; i++)
    if (edges[i] == 'L') {
      msgtxt.push("There is a problem with the EDGES, one or more is blank");
      return(1);
    }
  edges.sort();
  var rtn = uniq(edges, 24, 4, 0);
  if (rtn != 0) {
    msgtxt.push("There is a problem with the EDGES, ");
    msgtxt.push("there should be four of each color but you have:<br>");
    uniq(edges, 24, 4, 1);
    return(1);
  }
  return(0);
}

function uniq(s, n, v, f) {
  var stat = 0;
  var p = s[0];
  for (var i=1, j=1; i < n; i++)
    if (s[i] == p)
      j++;
    else {
      if (j != v) {
         stat = 1;
         if (f) msgtxt.push(j + ' ' + color_str(s[i-1]) + '<br>');
      }
      p = s[i];
      j = 1;
    }
  if (j != v) {
     stat = 1;
     if (f) msgtxt.push(j + ' ' + color_str(s[i-1]) + '<br>');
  }
  return(stat);
}

function verify_cubestr(s) {
  var check = [];
  // init_conv();
  convert_cnr_6c(s, cps, cts);
  convert_edg_6c(s, eps, ets);
  for (var i=0; i < 8; i++)
    check[i] = 0;
  for (var i=0, tw=0; i < 8; i++) {
    check[cps[i]] = 1;
    tw += cts[i];
  }
  for (var i=0, pos=0; i < 8; i++)
    pos += check[i];
  // to get this error twist one corner
  if (pos != 8 || tw%3 != 0) {
    msgtxt.push("There is a problem with the input, check the CORNERS\n");
    return(1);
  }
  for (i=0; i < 12; i++)
    check[i] = 0;
  for (i=tw=0; i < 12; i++) {
    check[eps[i]] = 1;
    tw += ets[i];
  }
  for (i=pos=0; i < 12; i++)
    pos += check[i];
  // to get this error flip one edge
  if (pos != 12 || tw%2 != 0) {
    msgtxt.push("There is a problem with the input, check the EDGES\n");
    return(1);
  }
  // to get this error switch colors on opposite sides for one pair of edge facelets
  if (parity(eps, 12) != parity(cps, 8)) {
    msgtxt.push("There is a problem with the input, check all corners and edges\n");
    return(1);
  }
  if (perm_to_int(cps,8)  == 0 && str_to_int(cts,7,3) == 0 &&
      perm_to_int(eps,12) == 0 && str_to_int(ets,11,2) == 0) {
    msgtxt.push("Cube already solved<br>No moves required\n");
    return(1);
  }
  return(0);
}

// TODO
//参考: https://github.com/mfeather1/3ColorCube/blob/main/rch.js
"use strict";

var CT_SYM_METHOD = 3;      // Method 2 replaces cpt_sym (14 MB) with cpt_sym2 (318 KB) and cpt_min (600 KB)
                            // Method 3 uses ct_sym (205 KB), ct_fb_ud (300 KB), ct_lr_ud (300 KB)

var ET_SYM_METHOD = 2;      // Method 2 reduces et_sym_UF from 2 MB to 4 KB
var EPT_OP_METHOD = 1;      // Method 2 reduces ept_min_op from 4 MB to 2.5 MB, uses 8 MB
                            // of temp files during initialization

var show_init_time_details = 0;

var MOVES     = 18;         // moves in face-turn metric
var E_PRM     = 34650;      // 3C edge perms
var E_TWIST   = 2048;       // edge twist (flip)
var C_PRM     = 70;         // 3C corner perms
var C_TWIST   = 2187;       // corner twist
var C_PERM    = 40320;      // 6C corner perms
var C_PRM_TW  = 153090;     // 3C corners
var MIN_CPT   = 3393;       // 3C corners reduced by symmetry
var MIN_EP    = 782;        // 3C edge perms reduced by symmetry
var E_PRMr    = 13824;      // 6C/3C edge perms
var C_PRMr    = 576;        // 6C/3C corner perms
var CUBE_SYM  = 48;         // cube symmetries
var EP_OP_ROW = 72;         // row in ep_sym with 48 unique symmetries
var OP_FR     = 1;          // sym op that moves cube Front->Right
var OP_UF     = 13;         // sym op that moves cube Up->Front
var B2_MAX    = 128;        // 2^7
var B3_MAX    = 177147;     // 3^11
var SLICE_PRM = 495;        // 3C slice permutations
var N_ET_FR   = 114;        // #rows in et_fr (uniq)
var FACELETS  = 54
var NIL       = -1;

var CFG_LIST_3C     = 4000; // max size of 3C cfg list used by chk_dup()
var EP_MULTI_MIN_OP = 2058; // EPs with multiple symmetry min ops
var N_EPT_MIN_OP    = 1290  // #rows in ept_min_op (deduplicated)
var N_EPT_MIN_OPS   = 7331; // #rows in ept_min_ops
var N_EPT_OPS_IX2   = 103;  // #rows in ept_ops_ix2

var cfg_idx = 0;

// Arrays with size less than 1 KB

var flip        = new Uint8Array([1,0]);
var cw          = new Uint8Array([1,2,0]);
var ccw         = new Uint8Array([2,0,1]);
var untwc       = new Uint8Array([0,2,1]);
var cps         = new Uint8Array(8);
var cts         = new Uint8Array(8);
var eps         = new Uint8Array(12);
var ets         = new Uint8Array(12);
var cnr         = new Uint8Array(24);
var edg         = new Uint8Array(24);
var cnr2        = new Uint8Array(24);
var edg2        = new Uint8Array(24);
var inv_op      = new Uint8Array(CUBE_SYM);
var ct_op_type  = new Uint8Array(CUBE_SYM);
var cubestr     = new Uint8Array(FACELETS);
var cp_b2       = new Uint8Array(C_PRM);
var op16e       = new Uint8Array(CUBE_SYM * 2);
var b2_cp       = new Uint8Array(B2_MAX);
var cmv         = new Uint8Array(MOVES * 8);
var emv         = new Uint8Array(MOVES * 12);
var mvlist1     = new Int8Array(3);
var mvlist2     = new Int8Array(MOVES+1);

var ctw = [];  // array of pointers to functions
var etw = [];

//                                                           Size(KB)
var cp_mov      = new Uint8Array(C_PRM * MOVES);          //     1
var min_ep      = new Uint16Array(MIN_EP);                //     2
var op_op       = new Uint8Array(CUBE_SYM*CUBE_SYM);      //     2
var slice_ep    = new Uint16Array(SLICE_PRM * 3);         //     3
var map         = new Uint8Array(CUBE_SYM * FACELETS);    //     3
var cp_sym      = new Uint8Array(C_PRM*CUBE_SYM);         //     3
var b2_slice    = new Uint16Array(4096);                  //     4
var ep_min_op   = new Uint8Array(E_PRM);                  //    34
var cp6c_cp3c   = new Uint8Array(C_PERM);                 //    40
var cp6c_cpr    = new Uint16Array(C_PERM);                //    40
var ep_min      = new Uint16Array(E_PRM);                 //    68
var ept_op_idx  = new Int16Array(E_PRM);                  //    68
var et_mov      = new Uint16Array(E_TWIST * MOVES);       //    72
var ep_slice    = new Uint16Array(E_PRM * 3);             //   102
var ep_b3       = new Uint32Array(E_PRM);                 //   135
var b3_ep       = new Uint16Array(B3_MAX);                //   173
var et_sym      = new Uint16Array(E_TWIST * CUBE_SYM);    //   192
var epr_mov     = new Uint8Array(SLICE_PRM*24*MOVES);     //   209
var ct_mov      = new Uint16Array(C_TWIST * MOVES);       //   300
var cpt_min     = new Uint16Array(C_PRM_TW * 2);          //   600
var ep_mov      = new Uint16Array(E_PRM * MOVES);         //  1218
var cp6c_mov    = new Uint16Array(C_PERM * MOVES);        //  1418
var et_sym_FR   = new Uint16Array(SLICE_PRM * E_TWIST);   //  1980

if (CT_SYM_METHOD == 1)
  var cpt_sym   = new Uint16Array(C_PRM_TW * CUBE_SYM);   // 14352
else if (CT_SYM_METHOD == 2)
  var cpt_sym2  = new Uint16Array(MIN_CPT * CUBE_SYM);    //   318
else {
  var ct_sym    = new Uint16Array(C_TWIST * CUBE_SYM);    //   205
  var ct_fb_ud  = new Uint16Array(C_PRM * C_TWIST);       //   300
  var ct_lr_ud  = new Uint16Array(C_PRM * C_TWIST);       //   300
}

if (ET_SYM_METHOD == 1)
  var et_sym_UF = new Uint16Array(SLICE_PRM * E_TWIST);   //  1980
else if (ET_SYM_METHOD == 2)
  var et_sym_UF = new Uint16Array(E_TWIST);               //     4

// Used 6% of the time 2058/34650
var ept_ops_ix1 = new Int8Array(MIN_EP);                  //     1
var ept_ops_ix2 = new Int16Array(N_EPT_OPS_IX2*E_TWIST);  //   412

if (EPT_OP_METHOD == 1)
var ept_min_op  = new Int8Array(EP_MULTI_MIN_OP*E_TWIST); //  4116
else
var ept_min_op  = new Int8Array(N_EPT_MIN_OP*E_TWIST);    //  2580

// Used rarely (.24% of the time 170928/70963200)
var ept_min_ops = new Uint16Array(N_EPT_MIN_OPS * 27);    //   387

// var ep_sym      = new Uint16Array(E_PRM * CUBE_SYM);   //  3248

// Cube Layout:
//
//          00 01 02
//          03 04 05
//          06 07 08
// 09 10 11 12 13 14 15 16 17 18 19 20
// 21 22 23 24 25 26 27 28 29 30 31 32
// 33 34 35 36 37 38 39 40 41 42 43 44
//          45 46 47
//          48 49 50
//          51 52 53

var center_idx = [4,22,25,28,31,49];

var cnr_idx = new Uint8Array
([6,12,11,47,38,39,51,44,33,2,18,17,45,35,36,8,15,14,0,9,20,53,41,42]);
// [[6,12,11],[47,38,39],[51,44,33],[2,18,17],[45,35,36],[8,15,14],[0,9,20],[53,41,42]];

var edg_idx = new Uint8Array
([24,23,26,27,30,29,32,21,7,13,46,37,52,43,1,19,3,10,5,16,50,40,48,34]);
// [[24,23],[26,27],[30,29],[32,21],[7,13],[46,37],[52,43],[1,19],[3,10],[5,16],[50,40],[48,34]];

var sym_op_FR = new Uint8Array([  // Front -> Right
  2, 5, 8, 1, 4, 7, 0, 3, 6,18,19,20, 9,10,11,12,13,14,
  15,16,17,30,31,32,21,22,23,24,25,26,27,28,29,42,43,44,
  33,34,35,36,37,38,39,40,41,51,48,45,52,49,46,53,50,47]);

var sym_op_UR = new Uint8Array([  // Up -> Right
  33,21, 9,34,22,10,35,23,11,51,48,45,36,24,12, 6, 3, 0,
  20,32,44,52,49,46,37,25,13, 7, 4, 1,19,31,43,53,50,47,
  38,26,14, 8, 5, 2,18,30,42,39,27,15,40,28,16,41,29,17]);

var reflect = new Uint8Array([
  51,52,53,48,49,50,45,46,47,33,34,35,36,37,38,39,40,41,
  42,43,44,21,22,23,24,25,26,27,28,29,30,31,32, 9,10,11,
  12,13,14,15,16,17,18,19,20, 6, 7, 8, 3, 4, 5, 0, 1, 2]);

var seq_gen = [];
var populated = [];
var logwin;
var logtxt = [];
var solution = [];
var get_etsym;
var get_ctsym;
var color;
var first_time = 1;
var gtime0;
var init_time;
var search_time;

//TODO 
// 参考 https://github.com/mfeather1/3ColorCube/blob/main/rclib.js
// Author: Michael Feather

"use strict";

function init1()
{
  var i, j, k;

  ctw[0]  = crtw;  ctw[2]  = crtw;
  ctw[3]  = cltw;  ctw[5]  = cltw;
  ctw[12] = cftw;  ctw[14] = cftw;
  ctw[15] = cbtw;  ctw[17] = cbtw;
  etw[12] = eftw;  etw[14] = eftw;
  etw[15] = ebtw;  etw[17] = ebtw;

  // assign cubie locations for cw moves

  copy(cmv, "07254163", 8, 0);  // right
  copy(cmv, "61430527", 8, 3);  // left
  copy(cmv, "51264307", 8, 6);  // up
  copy(cmv, "04732561", 8, 9);  // down
  copy(cmv, "45231067", 8, 12); // front
  copy(cmv, "01674532", 8, 15); // back

  copy(emv, "0A934567812B", 12, 0);
  copy(emv, "812B456739A0", 12, 3);
  copy(emv, "0123956847AB", 12, 6);
  copy(emv, "01234BA78956", 12, 9);
  copy(emv, "5423016789AB", 12, 12);
  copy(emv, "0167453289AB", 12, 15);

  // apply primary moves to fill in remaining moves

  for(i=0; i < 2; i++)	   // populate cmv[1,2,4,5,7,8...]
    for(j=0; j < 18; j+=3)
      for(k=0; k < 8; k++)
	cmv[(i+j+1)*8+k] = cmv[(i+j)*8+cmv[j*8+k]];

  for(i=0; i < 2; i++)
    for(j=0; j < 18; j+=3)
      for(k=0; k < 12; k++)
	emv[(i+j+1)*12+k] = emv[(i+j)*12+emv[j*12+k]];
}

function init2()
{
  /* This populates the following arrays:
     b2_cp, cp_b2
     b3_ep, ep_b3
     cp_mov, ct_mov
     ep_mov, et_mov
     b2_slice, ep_slice, slice_ep
  */

  var time0 = Date.now();
  var i, j, k;
  var s = new Int8Array(12);
  var tmp = new Int8Array(12);

  init1();

  init_conv();

  // populate tables for converting between perm & int for 3C perms

  for(i=j=0; i < B2_MAX; i++)
    if (int_to_str_lim(i, s, 7, 2, 4))
      {
	b2_cp[i] = j;
	cp_b2[j++] = i;
      }

  for(i=j=0; i < B3_MAX; i++) {
    if (int_to_str_lim(i, s, 11, 3, 4))
      {
	b3_ep[i] = j;
	ep_b3[j++] = i;
      }
  }

  for(i=0; i < C_PRM; i++)
    {
      int_to_strp(cp_b2[i], s, 7, 2);

      for(j=0; j < MOVES; j++)
	{
	  for(k=0; k < 8; k++)
	    tmp[k] = s[cmv[j*8+k]];

	  cp_mov[i*MOVES+j] = b2_cp[str_to_int(tmp,7,2)];
	}
    }

  for(i=0; i < C_PERM; i++)
    {
      int_to_perm(i, s, 8);

      for(j=0; j < 8; j++)
	tmp[j] = s[j]/4;

      cp6c_cp3c[i] = b2_cp[str_to_int(tmp,7,2)];
    }

  for(i=0; i < C_TWIST; i++)
    {
      int_to_strp(i,s,7,3);

      for(j=0; j < MOVES; j++)
	{
	  for(k=0; k < 7; k++)
	    tmp[k] = s[cmv[j*8+k]];

	  if (ctw[j])
	    ctw[j](tmp);

	  ct_mov[i*MOVES+j] = str_to_int(tmp,7,3);
	}
    }

  for(i=0; i < E_PRM; i++)
    {
      int_to_strp(ep_b3[i], s, 11, 3);

      for(j=0; j < MOVES; j++)
	{
	  for(k=0; k < 12; k++)
	    tmp[k] = s[emv[j*12+k]];

	  ep_mov[i*MOVES+j] = b3_ep[str_to_int(tmp,11,3)];
	}
    }

  for(i=0; i < E_TWIST; i++)
    {
      int_to_strp(i,s,11,2);

      for(j=0; j < MOVES; j++)
	{
	  for(k=0; k < 11; k++)
	    tmp[k] = s[emv[j*12+k]];

	  if (etw[j])
	    etw[j](tmp);

	  et_mov[i*MOVES+j] = str_to_int(tmp,11,2);
	}
    }

  populate_b2_slice();
  populate_ep_slice();
  populate_slice_ep();
  populate_cp6c_cpr();

  // populated.push("init2");

  if (show_init_time_details == 1) {
    var time1 = Date.now();
    document_write(((time1-time0)/1000).toFixed(2) + ' init2<br>');
  }
}

function populate_cp6c_cpr()
{
  var s = new Uint8Array(8);
  var t1 = new Uint8Array(8);
  var t2 = new Uint8Array(8);

  for (var i=0; i < C_PERM; i++)
    {
      int_to_perm(i, s, 8);

      for (var j=0, x1=0, x2=0; j < 8; j++)
	if (Math.floor(s[j]/4) == 0)
	  t1[x1++] = s[j];
	else
	  t2[x2++] = s[j]-4;

      cp6c_cpr[i] = perm_to_int(t1,4)*24 + perm_to_int(t2,4);
    }
  // populated.push("cp6c_cpr");
}

function memcpy(a, b, n)
{
  for (var i=0; i < n; i++)
    a[i] = b[i];
}

function populate_slice_ep()
{
  var a = new Uint8Array(12);
  var b = new Uint8Array(12);

  for (var i=0, ix=0; i < 4096; i++)
    {
      int_to_str(i, a, 12, 2);

      for (var c=0, j=0; j < 12; j++)
        if (a[j] == 1)
          c++;

      if (c == 4)
        {
          memcpy(b, a, 12);

          for (j=0; j < 12; j++)
            b[j] = b[j] ? 0 : 1;

          for (c=0, j=0; j < 12; j++)
            if (b[j] == 1 && c++ >= 4)
              b[j] = 2;

          slice_ep[ix*3] = b3_ep[str_to_int(b,11,3)];
          memcpy(b, a, 12);

          for (c=j=0; j < 12; j++)
            if (b[j] == 0 && c++ >= 4)
              b[j] = 2;

          slice_ep[ix*3+1] = b3_ep[str_to_int(b,11,3)];
          memcpy(b, a, 12);

          for (j=0; j < 12; j++)
            if (b[j])
              b[j] = 2;

          for (c=0, j=0; j < 12; j++)
            if (b[j] == 0 && c++ >= 4)
              b[j] = 1;

          slice_ep[ix*3+2] = b3_ep[str_to_int(b,11,3)];
          ix++;
        }
    }
  // populated("slice_ep");
}

function populate_b2_slice()
{
  var s = new Uint8Array(12);

  for (var i=0, k=0; i < 4096; i++)
    {
      int_to_str(i, s, 12, 2);

      for (var c=0, j=0; j < 12; j++)
	if (s[j] == 1)
	  c++;

      if (c == 4)
        b2_slice[i] = k++;
    }
}

function populate_ep_slice()
{
  var s = new Uint8Array(12);
  var t = new Uint8Array(12);

  for (var i=0; i < E_PRM; i++)
    {
      int_to_strp(ep_b3[i], s, 11, 3);

      for (var j=0; j < 3; j++)
	{
	  for (var k=0; k < 12; k++)
	    t[k] = (s[k] == j) ? 1 : 0;

	  ep_slice[i*3+j] = b2_slice[str_to_int(t, 12, 2)];
	}
    }
  // populated.push("ep_slice");
}

function copy(dst, src, n, row)
{
  for(var i=0; i < n; i++)
    dst[row*n + i] = (src[i]=='A') ? 10 : (src[i]=='B')?11:src[i];
}

function crtw(s)  // corner right twist
{
  s[1] = cw[s[1]];
  s[7] = ccw[s[7]];
  s[3] = cw[s[3]];
  s[5] = ccw[s[5]];
}

function cltw(s)  // corner left twist
{
  s[2] = cw[s[2]];
  s[4] = ccw[s[4]];
  s[0] = cw[s[0]];
  s[6] = ccw[s[6]];
}

function cftw(s)  // corner front twist
{
  s[4] = cw[s[4]];
  s[1] = ccw[s[1]];
  s[5] = cw[s[5]];
  s[0] = ccw[s[0]];
}

function cbtw(s)  // corner back twist
{
  s[7] = cw[s[7]];
  s[2] = ccw[s[2]];
  s[6] = cw[s[6]];
  s[3] = ccw[s[3]];
}

function eftw(s)  // edge front twist
{
  s[0] = flip[s[0]];
  s[5] = flip[s[5]];
  s[1] = flip[s[1]];
  s[4] = flip[s[4]];
}

function ebtw(s)  // edge back twist
{
  s[3] = flip[s[3]];
  s[6] = flip[s[6]];
  s[2] = flip[s[2]];
  s[7] = flip[s[7]];
}

function init_op16e()
{
  /* symmetry operations that maintain consistent edge twist values
     for all edge position values */

  var op_ud = new Uint8Array([0,5,6,7,8,21,22,23,24,29,30,31,32,45,46,47]);

  /* for the symmetry operations that are not consistent, make the equivalent
     from a pair of operations using one of either UF or FR and one of the 16
     consistent symmetries
  */

  // dependency("op_op", "init_op16e");

  for (var i=0; i < 2; i++)
    {
      var op1 = (i) ? OP_UF : OP_FR;

      for (var j=0; j < 16; j++)
	{
	  var op2 = op_ud[j];
	  op16e[op_op[op1*CUBE_SYM+op2]*2] = op1;
	  op16e[op_op[op1*CUBE_SYM+op2]*2+1] = op2;
	}
    }
  // populated.push("op16e");
}

function update_op16e()
{
  var op_new = new Uint8Array(CUBE_SYM);
  var op_ud = new Uint8Array([0,5,6,7,8,21,22,23,24,29,30,31,32,45,46,47]);

  /*  This updates op16e so that the 16 consistent sym ops point
      to the first 16 rows of et_sym
  */

  for (var i=j=0; i < 16; i++)
    op_new[op_ud[i]] = j++;

  for (var i=0; i < CUBE_SYM; i++)
    {
      if (op16e[i*2] == 0)
	// op16e[i].op2 = op_new[i];
	op16e[i*2+1] = op_new[i];
      else
	// op16e[i].op2 = op_new[op16e[i].op2];
	op16e[i*2+1] = op_new[op16e[i*2+1]];
    }
}

function make_cubestr()
{
  set_colors_6c(0,1,2,3,4,5);

  for  (var i=0; i < 12; i++)
    for (var j=0; j < 2; j++)
      cubestr[edg_idx[i*2+j]] = edg[eps[i]*2 + ((ets[i]+j)&1)];

  for  (i=0; i < 8; i++)
    for (j=0; j < 3; j++)
      cubestr[cnr_idx[i*3+j]] = cnr[cps[i]*3 + ((untwc[cts[i]]+j)%3)];
}

//----------------------------------------------------------------------------
// mkt
//----------------------------------------------------------------------------

function populate_cp_sym() {
  var tmpstr = new Uint8Array(FACELETS);
  assign_centers_3c();
  for (var cp=1; cp < C_PRM; cp++) {
    int_to_strp(cp_b2[cp], cps, 7, 2);
    make_cubestr_cnr(cnr2);
    cp_sym[cp*CUBE_SYM] = cp;
    for (var op=1; op < CUBE_SYM; op++) {
      sym_op(tmpstr, cubestr, op);
      cp_sym[cp*CUBE_SYM+op] = convert_cnr_3c(tmpstr)>>16;
    }
  }
  // populated.push("cp_sym");
}

function populate_ep_min() {
  var time0 = Date.now();
  var tmpstr = new Uint8Array(FACELETS);
  // dependency("inv_op", "populate_ep_min");
  assign_centers_3c();
  for (var ep=1; ep < E_PRM; ep++)
    ep_min_op[ep] = 99;
  for (var ep=1, min=1; ep < E_PRM; ep++) {
    if (ep_min[ep] != 0)
      continue;
    int_to_strp(ep_b3[ep], eps, 11, 3);
    make_cubestr_edg(edg2);
    ep_min[ep] = min;
    ep_min_op[ep] = 0;
    for (var op=1; op < CUBE_SYM; op++) {
      sym_op(tmpstr, cubestr, op);
      var epsym = convert_edg_3c(tmpstr);
      ep_min[epsym] = min;
      if (inv_op[op] < ep_min_op[epsym])
        ep_min_op[epsym] = inv_op[op];
    }
    min++;
  }
  // populated.push("ep_min");
  // populated.push("ep_min_op");
  if (show_init_time_details == 1) {
    var time1 = Date.now();
    document_write(((time1-time0)/1000).toFixed(2) + ' ep_min<br>');
  }
}
/*
function populate_ep_sym() {
  var time0 = Date.now();
  var tmpstr = new Uint8Array(FACELETS);
  var min_ix = new Uint16Array(E_PRM);  // 68 KB
  assign_centers_3c();
  for (var ep=1, mx=1; ep < E_PRM; ep++) {
    int_to_strp(ep_b3[ep], eps, 11, 3);
    make_cubestr_edg(edg2);
    var ix = ep * CUBE_SYM;
    ep_sym[ix] = ep;
    var min = ep;
    var min_op = 0;
    for (var op=1; op < CUBE_SYM; op++) {
      sym_op(tmpstr, cubestr, op);
      var epsym = convert_edg_3c(tmpstr);
      ep_sym[ix + op] = epsym;
      if (epsym < min) {
        min = epsym;
        min_op = op;
      }
    }
    if (min_ix[min] == 0)
      min_ix[min] = mx++;
    ep_min[ep] = min_ix[min];
    ep_min_op[ep] = min_op;
  }
  // populated.push("ep_sym");
  // populated.push("ep_min");
  // populated.push("ep_min_op");
  if (show_init_time_details == 1) {
    var time1 = Date.now();
    document_write(((time1-time0)/1000).toFixed(2) + ' populate_ep_sym<br>');
  }
}
*/
function populate_min_ep()
{
  // dependency("ep_min_op", "populate_min_ep");
  for (var ep=0, i=0; ep < E_PRM; ep++)
    if (ep_min_op[ep] == 0)
      min_ep[i++] = ep;
  // populated.push("min_ep");
}

function make_cubestr_edg(edg)
{
  for (var i=0; i < 12; i++)
    for (var j=0; j < 2; j++)
      cubestr[edg_idx[i*2+j]] = edg[eps[i]*2 + ((ets[i]+j)&1)];
}

function make_cubestr_cnr(cnr)
{
  for (var i=0; i < 8; i++)
    for (var j=0; j < 3; j++)
      cubestr[cnr_idx[i*3+j]] = cnr[cps[i]*3 + ((untwc[cts[i]]+j)%3)];
}

function sym_op(dst, src, op)
{
  for (var i=0; i < FACELETS; i++)
    dst[i] = src[map[op*FACELETS+i]];
}

function convert_edg_3c(s)
{
  var R = s[28];
  var U = s[4];
  var F = s[25];

  for (var i=0; i < 12; i++)
    {
      var x = s[edg_idx[i*2]];
      var y = s[edg_idx[i*2+1]];

      // eps[i]:  0=(FR,RF)  1=(UF,FU)  2=(UR,RU)

      if ((x == U) || ((x == F) && (y == R)))           // UF UR FR
	{
	  ets[i] = 0;
	  eps[i] = (x == F) ? 0 : (y == R) ? 2 : 1;
	}
      else                                              // FU RU RF
	{
	  ets[i] = 1;
	  eps[i] = (x == F) ? 1 : (y == U) ? 2 : 0;
	}
    }
  return(b3_ep[str_to_int(eps,11,3)]);
}

function convert_cnr_3c(s)
{
  var U = s[4];
  var F = s[25];

  for (var i=0; i < 8; i++)
    {
      var x = s[cnr_idx[i*3]];
      var y = s[cnr_idx[i*3+1]];
      var z = s[cnr_idx[i*3+2]];

      if (x == U)
	{
	  cts[i] = 0;	   // no twist
	  cps[i] = (y == F) ? 0 : 1;
	}
      else if (y == U)
	{
	  cts[i] = 1;	   // 1/3 clockwise twist
	  cps[i] = (z == F) ? 0 : 1;
	}
      else
	{
	  cts[i] = 2;	   // 1/3 counter-clockwise twist
	  cps[i] = (x == F) ? 0 : 1;
	}
    }

  i = b2_cp[str_to_int(cps, 7, 2)];
  var j = str_to_int(cts, 7, 3);
  return((i<<16)+ j);
}

function init_map(map, op_FR, op_UR, reflect)
{
  for (var i=0; i < 54; i++)               // map[0]
    map[i] = i;

  for (i=0; i < 54; i++)                   // map[1]
    map[54+i] = op_FR[i];

  for (i=0; i < 54; i++)                   // map[21]
    map[21*54+i] = op_UR[i];

  map_sym_op(2, 1, op_UR);    // FR1 UR1      map[2]
  map_sym_op(3, 2, op_UR);    // FR1 UR2      map[3]
  map_sym_op(4, 3, op_UR);    // FR1 UR3      map[4]
  map_sym_op(5, 1, op_FR);    // FR2
  map_sym_op(6, 5, op_UR);    // FR2 UR1
  map_sym_op(7, 6, op_UR);    // FR2 UR2
  map_sym_op(8, 7, op_UR);    // FR2 UR3
  map_sym_op(9, 5, op_FR);    // FR3
  map_sym_op(10, 9, op_UR);   // FR3 UR1
  map_sym_op(11, 10, op_UR);  // FR3 UR2
  map_sym_op(12, 11, op_UR);  // FR3 UR3
  map_sym_op2(13, 2, 9);      // UF1
  map_sym_op(14, 13, op_UR);  // UF1 UR1
  map_sym_op(15, 14, op_UR);  // UF1 UR2
  map_sym_op(16, 15, op_UR);  // UF1 UR3
  map_sym_op2(17, 7, 13);     // UF3
  map_sym_op(18, 17, op_UR);  // UF3 UR1
  map_sym_op(19, 18, op_UR);  // UF3 UR2
  map_sym_op(20, 19, op_UR);  // UF3 UR3
  map_sym_op(22, 21, op_UR);  // UR2
  map_sym_op(23, 22, op_UR);  // UR3

  // map[24]
  for(i=0; i < 54; i++)
    map[24*54 + i] = reflect[i];

  // map[25-47]
  for (i=25; i < CUBE_SYM; i++)
    map_sym_op(i, i-24, reflect);
}

function map_sym_op(dst, src, op)
{
  for (var i=0; i < FACELETS; i++)
    map[dst*54+i] = map[src*54+op[i]];
}

function map_sym_op2(dst, src, op)
{
  for (var i=0; i < FACELETS; i++)
    map[dst*54+i] = map[src*54+map[op*54+i]];
}

function populate_et_sym()
{
  var time0 = Date.now();
  var tmpstr = new Uint8Array(FACELETS);
  init_op16e();
  assign_centers_3c();
  int_to_strp(ep_b3[0], eps, 11, 3);
  for(var i=0; i < E_TWIST;  i++)
    for (var j=0; j < CUBE_SYM; j++)
      if (op16e[j*2] == 0) {
        int_to_strp(i, ets, 11, 2);
        make_cubestr_edg(edg2);
        sym_op(tmpstr, cubestr, map[j]);
        convert_edg_3c(tmpstr);
        et_sym[i*CUBE_SYM+j] = str_to_int(ets,11,2);
    }
  if (show_init_time_details == 1) {
    var time1 = Date.now();
    document_write(((time1-time0)/1000).toFixed(2) + ' populate_et_sym part1<br>');
  }
  populate_et_sym_FR();
  if (show_init_time_details == 1) {
    var time2 = Date.now();
    document_write(((time2-time1)/1000).toFixed(2) + ' populate_et_sym part2 (FR)<br>');
  }
  if (ET_SYM_METHOD == 1) {
    populate_et_sym_UF_m1();
    update_et_sym_m1();
  }
  else {
    populate_et_sym_UF_m2();
    update_et_sym_m2();
  }
  // populated.push("et_sym");
  if (show_init_time_details == 1) {
    var time3 = Date.now();
    document_write(((time3-time2)/1000).toFixed(2) + ' populate_et_sym part3 (UF)<br>');
    document_write(((time3-time0)/1000).toFixed(2) + ' populate_et_sym total<br>');
  }
}

function populate_et_sym_FR() {
  var sav = new Uint8Array(12);
  var tmpstr = new Uint8Array(FACELETS);
  assign_centers_3c();
  var etsa = new Uint8Array(E_TWIST*12)
  for (var et=0; et < E_TWIST; et++) {
    int_to_strp(et, ets, 11, 2);
    for (var i=0; i < 12; i++)
      etsa[et*12+i] = ets[i];
  }
  for (var slice=0; slice < SLICE_PRM; slice++) {
    int_to_strp(ep_b3[slice_ep[slice*3]], eps, 11, 3);
    memcpy(sav, eps, 12);
    for (var et=0; et < E_TWIST; et++) {
      memcpy(eps, sav, 12);
      // int_to_strp(et, ets, 11, 2);
      for (i=0; i < 12; i++)
        ets[i] = etsa[et*12+i];
      make_cubestr_edg(edg2);
      sym_op(tmpstr, cubestr, OP_FR);
      convert_edg_3c(tmpstr);
      et_sym_FR[slice*E_TWIST+et] = str_to_int(ets,11,2);
    }
  }
  // populated.push("et_sym_FR");
}

function populate_et_sym_UF_m1() {
  var sav = new Uint8Array(12);
  var tmpstr = new Uint8Array(FACELETS);
  assign_centers_3c();
  for (var slice=0; slice < SLICE_PRM; slice++) {
    int_to_strp(ep_b3[slice_ep[slice*3+1]], eps, 11, 3);
    memcpy(sav, eps, 12);
    for (var et=0; et < E_TWIST; et++) {
      memcpy(eps, sav, 12);
      int_to_strp(et, ets, 11, 2);
      make_cubestr_edg(edg2);
      sym_op(tmpstr, cubestr, OP_UF);
      convert_edg_3c(tmpstr);
      et_sym_UF[slice*E_TWIST+et] = str_to_int(ets,11,2);
    }
  }
  // populated.push("et_sym_UF");
}

function populate_et_sym_UF_m2() {
  // for et_sym_method 2 populate first row only
  var sav = new Uint8Array(12);
  var tmpstr = new Uint8Array(FACELETS);
  assign_centers_3c();
  int_to_strp(ep_b3[slice_ep[1]], eps, 11, 3);
  memcpy(sav, eps, 12);
  for (var et=0; et < E_TWIST; et++) {
    memcpy(eps, sav, 12);
    int_to_strp(et, ets, 11, 2);
    make_cubestr_edg(edg2);
    sym_op(tmpstr, cubestr, OP_UF);
    convert_edg_3c(tmpstr);
    et_sym_UF[et] = str_to_int(ets,11,2);
  }
  // populated.push("et_sym_UF");
}

function dependency(arr, func) {
  // functions can check dependencies here (for arrays not already populated by init2)
  if (populated.indexOf(arr) == -1) {
    document.write('ERROR: prerequisite array [' + arr + '] is not populated, ');
    document.write('caller: ' + func + '()<br>');
  }
}

function update_et_sym_m2()
{
  // This updates et_sym[] so that et_sym_UF[] is no longer needed,
  var op_lr = new Uint8Array([ 1, 2, 3, 4, 9,10,11,12,25,26,27,28,33,34,35,36]);
  var op_fb = new Uint8Array([13,14,15,16,17,18,19,20,37,38,39,40,41,42,43,44]);
  // dependency("et_sym_FR", "update_et_sym");
  // dependency("et_sym_UF", "update_et_sym");
  for (var i=0; i < 16; i++) {
    var op = op_lr[i];
    for (var j=0; j < E_TWIST; j++)
      et_sym[j*CUBE_SYM+op] = et_sym[j*CUBE_SYM+op16e[op*2+1]];
  }
  for (i=0; i < 16; i++) {
    op = op_fb[i];
    for (var j=0; j < E_TWIST; j++) {
      var et_fr = et_sym_FR[j];
      var et_uf = et_sym_UF[j];
      et_sym[et_fr*CUBE_SYM+op] = et_sym[et_uf*CUBE_SYM+op16e[op*2+1]];
    }
  }
}

function update_et_sym_m1()
{
  // This updates et_sym[] so that op16e[op].op2 can be replaced by just op in get_etsym_m1()
  var op_lr = new Uint8Array([ 1, 2, 3, 4, 9,10,11,12,25,26,27,28,33,34,35,36]);
  var op_fb = new Uint8Array([13,14,15,16,17,18,19,20,37,38,39,40,41,42,43,44]);
  for (var i=0; i < 16; i++) {
    var op = op_lr[i];
    for (var j=0; j < E_TWIST; j++)
      et_sym[j*CUBE_SYM+op] = et_sym[j*CUBE_SYM+op16e[op*2+1]];
  }
  for (i=0; i < 16; i++) {
    op = op_fb[i];
    for (j=0; j < E_TWIST; j++)
      et_sym[j*CUBE_SYM+op] = et_sym[j*CUBE_SYM+op16e[op*2+1]];
  }
}

function populate_op_op()
{
  for (var i=0; i < CUBE_SYM; i++) {
    for (var j=0; j < CUBE_SYM; j++) {
      c = op_op_init[i][j];
      n = letters.indexOf(c.toUpperCase());
      op_op[i*CUBE_SYM + j] = ((c >= 'a') ? n+26 : n);
    }
  }
  // populated.push("op_op");
}

function assign_centers_6c()
{
  cubestr[28] = 0;
  cubestr[25] = 1;
  cubestr[4]  = 2;
  cubestr[22] = 3;
  cubestr[31] = 4;
  cubestr[49] = 5;
}

function assign_centers_3c()
{
  cubestr[28] = 0;
  cubestr[25] = 1;
  cubestr[4]  = 2;
  cubestr[22] = 0;
  cubestr[31] = 1;
  cubestr[49] = 2;
}

function set_colors_3c(r, f, u)
{
  cnr2[0] = u;
  cnr2[1] = f;
  cnr2[2] = r;
  cnr2[3] = u;
  cnr2[4] = r;
  cnr2[5] = f;

  edg2[0] = f;
  edg2[1] = r;
  edg2[2] = u;
  edg2[3] = f;
  edg2[4] = u;
  edg2[5] = r;
}

function get_etsym_m1(ep, et, op)
{
  if (op16e[op*2] == 0)
    return(et_sym[et*CUBE_SYM+op]);
  else if (op16e[op*2] == OP_FR)
    return(et_sym[et_sym_FR[ep_slice[ep*3]*E_TWIST+et]*CUBE_SYM+op]);
  else
    return(et_sym[et_sym_UF[ep_slice[ep*3+1]*E_TWIST+et]*CUBE_SYM+op]);
}

function get_etsym_m2(ep, et, op)
{
  if (op16e[op*2] == 0)
    return(et_sym[et*CUBE_SYM+op]);
  else {
    var slice = (op16e[op*2]==OP_FR) ? ep_slice[ep*3] : ep_slice[ep*3+1];
    return(et_sym[et_sym_FR[slice*E_TWIST+et]*CUBE_SYM+op]);
  }
}

function get_ctsym_m1(cpt, op)
{
  return(cpt_sym[cpt*CUBE_SYM + op]);
}

function get_ctsym_m2(cpt, op)
{
  return(cpt_sym2[cpt_min[cpt*2]*CUBE_SYM + op_op[cpt_min[cpt*2+1]*CUBE_SYM+op]]);
}

function get_ctsym_m3(cpsym, ct, op)
{
  if (ct_op_type[op] == 0)
    return(ct_sym[ct*CUBE_SYM+op]);
  if (ct_op_type[op] == 1)
    return(ct_fb_ud[cpsym*C_TWIST + ct_sym[ct*CUBE_SYM+op]]);
  else
    return(ct_lr_ud[cpsym*C_TWIST + ct_sym[ct*CUBE_SYM+op]]);
}

function populate_cpt_sym() {
  var time0 = Date.now();
  var tmpstr = new Uint8Array(FACELETS);
  assign_centers_3c();
  populate_ct_op_type();
  for (var cp=0; cp < C_PRM; cp++) {
    for (var ct=0; ct < C_TWIST; ct++) {
      var cpt = cp*C_TWIST + ct;
      int_to_strp(cp_b2[cp], cps, 7, 2);
      int_to_strp(ct, cts, 7, 3);
      make_cubestr_cnr(cnr2);
      cpt_sym[cpt*CUBE_SYM] = ct;
      for (var op=1; op < CUBE_SYM; op++) {
        if (ct_op_type[op] == 0 && cp > 0)
          cpt_sym[cpt*CUBE_SYM+op] = cpt_sym[ct*CUBE_SYM+op]
        else {
          sym_op(tmpstr, cubestr, op);
          cpt_sym[cpt*CUBE_SYM+op] = convert_cnr_3c(tmpstr)&0xFFFF;
        }
      }
    }
  }
  if (show_init_time_details == 1) {
    var time1 = Date.now();
    document_write(((time1-time0)/1000).toFixed(2) + ' populate_cpt_sym<br>');
  }
}

function populate_cpt_sym2() {
  var time0 = Date.now();
  var tmpbit = new Uint8Array(C_PRM_TW);  // 150 KB
  var tmpstr = new Uint8Array(FACELETS);
  assign_centers_3c();
  for (var cp=0, ix=0; cp < C_PRM; cp++) {
    for (var ct=0; ct < C_TWIST; ct++) {
      var cpt = cp*C_TWIST + ct;
      if (tmpbit[cpt] == 1)
        continue;
      int_to_strp(cp_b2[cp], cps, 7, 2);
      int_to_strp(ct, cts, 7, 3);
      make_cubestr_cnr(cnr2);
      cpt_sym2[ix*CUBE_SYM] = ct;
      for (var op=1; op < CUBE_SYM; op++) {
        sym_op(tmpstr, cubestr, op);
        var cptsym = convert_cnr_3c(tmpstr);
        var ctsym = cptsym&0xFFFF;
        cpt_sym2[ix*CUBE_SYM+op] = ctsym;
        cptsym = (cptsym>>16)*C_TWIST + ctsym;
        tmpbit[cptsym] = 1;
      }
      ix++;
    }
  }
  // populated.push("cpt_sym2");
  if (show_init_time_details == 1) {
    var time1 = Date.now();
    document_write(((time1-time0)/1000).toFixed(2) + ' populate_cpt_sym2<br>');
  }
}

function populate_cpt_min() {
  var time0 = Date.now();
  var tmpstr = new Uint8Array(FACELETS);
  assign_centers_3c();
  for (var cp=0, min=0; cp < C_PRM; cp++) {
    for (var ct=0; ct < C_TWIST; ct++) {
      var cpt = cp*C_TWIST + ct;
      if (cpt_min[cpt*2] != 0)
        continue;
      int_to_strp(cp_b2[cp], cps, 7, 2);
      int_to_strp(ct, cts, 7, 3);
      make_cubestr_cnr(cnr2);
      cpt_min[cpt*2] = min;
      for (var op=1; op < CUBE_SYM; op++) {
        sym_op(tmpstr, cubestr, op);
        var cptsym = convert_cnr_3c(tmpstr);
        cptsym = (cptsym>>16)*C_TWIST + (cptsym&0xFFFF);
        cpt_min[cptsym*2] = min;
        cpt_min[cptsym*2+1] = op;
      }
      min++;
    }
  }
  if (show_init_time_details == 1) {
    var time1 = Date.now();
    document_write(((time1-time0)/1000).toFixed(2) + ' populate_cpt_min<br>');
  }
}

function populate_ept_op_idx()
{
  var tmp = new Uint8Array(E_PRM);  // 34 KB

  for (var i=1; i < E_PRM; i++)
    ept_op_idx[i] = NIL;

  for (var i=0; i < E_PRM; i++)
    tmp[ep_min[i]]++;

  for (var i=1, k=1, ct=1; i < E_PRM; i++)
    if (tmp[ep_min[i]] != CUBE_SYM)
      ept_op_idx[i] = k++;
}

function populate_ept_min_op()
{
  var time0 = Date.now();

  var oplist = new Uint8Array(50);
  var tmp_idx = new Int16Array(EP_MULTI_MIN_OP);  // 4 KB
  var ep_sym_tmp = new Uint16Array(CUBE_SYM);
  var tmpstr = new Uint8Array(FACELETS);

  if (EPT_OP_METHOD == 1)
    var ept_op_tmp = ept_min_op;
  else
    var ept_op_tmp = new Int8Array(EP_MULTI_MIN_OP*E_TWIST);  //  4116 KB

  // dependency("ep_min", "populate_ept_min_op");
  // dependency("et_sym", "populate_ept_min_op");
  // dependency("inv_op", "populate_ept_min_op");

  populate_ept_op_idx();

  for (var i=0; i < EP_MULTI_MIN_OP*E_TWIST; i++)
    ept_op_tmp[i] = NIL;

  for (var i=0, ix=0; i < E_PRM; i++)
    {
      if (ep_min_op[i] != 0 || ept_op_idx[i] == NIL)
	continue;

      int_to_strp(ep_b3[i], eps, 11, 3);
      make_cubestr_edg(edg2);
      ep_sym_tmp[0] = i;
      for (var op=1; op < CUBE_SYM; op++) {
        sym_op(tmpstr, cubestr, op);
        ep_sym_tmp[op] = convert_edg_3c(tmpstr);
      }

      for (var j=0; j < E_TWIST; j++)
	{
	  if (ept_op_tmp[ept_op_idx[i]*E_TWIST+j] != NIL)
	    continue;

          ept_op_tmp[ept_op_idx[i]*E_TWIST+j] = 0;
	  var min = i*E_TWIST + j;

	  for (var n=0, k=1; k < CUBE_SYM; k++)
	    {
	      var ep = ep_sym_tmp[k];
	      var et = get_etsym(i, j, k);
	      ept_op_tmp[ept_op_idx[ep]*E_TWIST+et] = inv_op[k];
	      if (ep*E_TWIST + et == min)
		oplist[n++] = k;
	    }

	  if (n)
	    {
	      ept_min_ops[ix*27] = i;
	      ept_min_ops[ix*27+1] = j;
	      ept_min_ops[ix*27+2] = n;

	      if (n < 47)
		for (k=0; k < n; k++)
		  ept_min_ops[ix*27+(k+3)] = oplist[k];
	      ix++;
	    }
	}
    }

  if (show_init_time_details == 1) {
    var time1 = Date.now();
    document_write(((time1-time0)/1000).toFixed(2) + ' populate_ept_min_op part1<br>');
  }

  if (EPT_OP_METHOD == 2) {

  // the following eliminates duplicate rows which reduces the ept_min_op
  // array from 2058 to 1290 rows (see rch.js for size difference)

  var ept_op_sort = [];  // 4116 KB (after populating)

  for (var i=0, j=0; i < EP_MULTI_MIN_OP; i++) {
    ept_op_sort[i] = new Int8Array(E_TWIST);
    substr_int8(ept_op_sort[i], ept_op_tmp, i*E_TWIST, E_TWIST);
  }

  ept_op_sort.sort(ept_op_row_compare);

  for (i=ix=1; i < EP_MULTI_MIN_OP; i++)
    if (ept_op_row_compare(ept_op_sort[i], ept_op_sort[ix-1]) != 0)
      memcpy(ept_op_sort[ix++], ept_op_sort[i], E_TWIST);

  ept_op_sort.length = ix;

  if (ept_op_sort.length != N_EPT_MIN_OP)
    document_write('Program Error in populate_ept_min_op, ept_op_sort.length != ' +
      N_EPT_MIN_OP + '<br>');

  var row = new Int8Array(E_TWIST);  // 2 KB

  for (i=0; i < EP_MULTI_MIN_OP; i++) {
    substr_int8(row, ept_op_tmp, i*E_TWIST, E_TWIST);
    tmp_idx[i] = bsearch(row, ept_op_sort);
    if (tmp_idx[i] == NIL)
      document_write('Program Error in populate_ept_min_op, row not found<br>');
  }

  for (i=0; i < E_PRM; i++)
    if (ept_op_idx[i] != NIL)
      ept_op_idx[i] = tmp_idx[ept_op_idx[i]];

  for (i=0; i < N_EPT_MIN_OP; i++)
    for (j=0; j < E_TWIST; j++)
      ept_min_op[i*E_TWIST+j] = ept_op_sort[i][j];

  }

  // populated.push('ept_min_op');
  // populated.push('ept_min_ops');

  if (show_init_time_details == 1) {
    var time2 = Date.now();
    document_write(((time2-time1)/1000).toFixed(2) + ' populate_ept_min_op part2<br>');
    document_write(((time2-time0)/1000).toFixed(2) + ' populate_ept_min_op total<br>');
  }
}

function substr_int8(sub, str, start, len) {
  for (var i=start, j=0; i < start+len; i++, j++)
    sub[j] = str[i];
}

function ssearch(row, arr) {
  for (var i=0; i < arr.length; i++) {
    for (var f=j=0; j < row.length; j++)
      if (row[j] != arr[i][j]) {
        f = 1;
        break;
      }
    if (f == 0)
      return(i);
  }
  return(-1);
}

function bsearch(row, arr) {
  var lo = 0;
  var hi = arr.length;
  for (var c=0; c <= 10; c++) {
    var mid = Math.floor((lo+hi)/2);
    if (ept_op_row_compare(row, arr[mid]) > 0)
       lo = mid;
    else if (ept_op_row_compare(row, arr[mid]) < 0)
       hi = mid;
    else
      return(mid);
  }
  return(-1);
}

function ept_op_row_compare(a, b) {
  for (var i=0; i < E_TWIST; i++) {
    if(a[i] < b[i]) return -1;
    if(a[i] > b[i]) return 1;
  }
  return(0);
}

function init_seq() {
  mvlist1[0] = 0;
  mvlist1[1] = 1;
  mvlist1[2] = NIL;
  for (var i=0; i < MOVES; i++)
    mvlist2[i] = i;
  mvlist2[i] = NIL;
  init_seq_gen(6,3);
}

function init_seq_gen(x, y) {
  for (var i=0; i < MOVES; i++) {
    seq_gen[i] = new Int8Array(MOVES);
    for (var j=0, k=0; j < Math.floor(i/x)*x; j++, k++)
      seq_gen[i][k] = j;
    for (j=Math.floor(i/y)*y+y; j < MOVES; j++, k++)
      seq_gen[i][k] = j;
    seq_gen[i][k] = NIL;
  }
}

var cfg_list = new Uint32Array(CFG_LIST_3C*3);  // 47 KB

function chk_dup_3c(ep, et, cp, ct, n)
{
  var ept = ep*E_TWIST + et;
  var cpt = cp*C_TWIST + ct;
  for (var i=0; i < cfg_idx; i++)
    if (cfg_list[i*3] == ept && cfg_list[i*3+1] == cpt && cfg_list[i*3+2] <= n)
      return(1);
  if (cfg_idx >= CFG_LIST_3C)
    document_write("ERROR: Max size exceeded in chk_dup_3c()<br>");
  cfg_list[cfg_idx*3] = ept;
  cfg_list[cfg_idx*3+1] = cpt;
  cfg_list[cfg_idx*3+2] = n;
  cfg_idx++;
  return(0);
}

function populate_ept_ops_indexes() {
  // dependency("ep_min", "populate_ept_ops_indexes");
  // dependency("ept_min_ops", "populate_ept_ops_indexes");
  for (var i=0; i < MIN_EP; i++)
    ept_ops_ix1[i] = NIL;

  for (var i=0; i < N_EPT_OPS_IX2; i++)  // 103
    for (var j=0; j < E_TWIST; j++)
      ept_ops_ix2[i*E_TWIST+j] = NIL;

  for (var i=0, ix=0; i < N_EPT_MIN_OPS; i++) {  // 7331
    var ep = ep_min[ept_min_ops[i*27]];
    if (ept_ops_ix1[ep] == NIL)
      ept_ops_ix1[ep] = ix++;

    // ept_ops_ix2[ix-1][ept_min_ops[i][1]] = i;
    ept_ops_ix2[(ix-1)*E_TWIST + ept_min_ops[i*27+1]] = i;
  }
  // populated.push("ept_ops_ix1");
  // populated.push("ept_ops_ix2");
}

function get_min_op_3c(cp, ct, op, ix) {
  var n = ept_min_ops[ix*27+2];
  var cpt = cp*C_TWIST + ct;
  if (n == 47)
    return(inv_op[cpt_min[cpt*2+1]]);
  var cpsav = cp_sym[cp*CUBE_SYM+op];
  var ctsav = (CT_SYM_METHOD == 3) ?
    get_ctsym(cpsav, ct, op) :
    get_ctsym(cpt, op);
  var cptsav = cpsav*C_TWIST + ctsav;
  var min = cptsav;
  for (var i=dif=0; i < n; i++) {
    var iop = ept_min_ops[ix*27+(i+3)];
    var cpsym = cp_sym[cpsav*CUBE_SYM+iop];
    var ctsym = (CT_SYM_METHOD == 3) ?
      get_ctsym(cpsym, ctsav, iop) :
      get_ctsym(cptsav, iop);
    var sym = cpsym*C_TWIST + ctsym;
    if (sym < min) {
      var min = sym;
      var min_op = iop;
      var dif = 1;
    }
  }
  if (dif)
    return(op_op[op*CUBE_SYM+min_op]);
  else
    return(op);
}

function populate_cp6c_mov()
{
  var time0 = Date.now();
  var s = new Uint8Array(8);
  var tmp = new Uint8Array(8);

  for (var i=0; i < C_PERM; i++)
    {
      int_to_perm(i, s, 8);

      for (var j=0; j < 8; j++)
	tmp[j] = s[j]/4;
	// tmp[j] = Math.floor(s[j]/4);

      for (j=0; j < MOVES; j++)
	{
	  for (var k=0; k < 8; k++)
	    tmp[k] = s[cmv[j*8+k]];

	  cp6c_mov[i*MOVES+j] = perm_to_int(tmp, 8);
	}
    }
  // populated.push("cp6c_mov");
  if (show_init_time_details == 1) {
    var time1 = Date.now();
    document_write(((time1-time0)/1000).toFixed(2) + ' populate_cp6c_mov<br>');
  }
}

function populate_op_tables()
{
  var time0 = Date.now();
  var mp = new Uint16Array(CUBE_SYM);
  var tmpstr = new Uint8Array(FACELETS);
  var ep_sym_tmp = [];

  // populate mp with with an ep that has 48 uniq symmetries (ep=EP_OP_ROW)
  assign_centers_3c();
  int_to_strp(ep_b3[EP_OP_ROW], eps, 11, 3);
  make_cubestr_edg(edg2);
  mp[0] = EP_OP_ROW;
  for (var op=1; op < CUBE_SYM; op++) {
    sym_op(tmpstr, cubestr, op);
    mp[op] = convert_edg_3c(tmpstr);
  }

  // populate ep_sym_tmp with a row for each of the 48 ep values in mp
  for (var i=0; i < CUBE_SYM; i++) {
    var ep = mp[i];
    ep_sym_tmp[ep] = [];
    int_to_strp(ep_b3[ep], eps, 11, 3);
    make_cubestr_edg(edg2);
    ep_sym_tmp[ep][0] = ep;
    for (var op=1; op < CUBE_SYM; op++) {
      sym_op(tmpstr, cubestr, op);
      ep_sym_tmp[ep][op] = convert_edg_3c(tmpstr);
    }
  }

  for (var i=0; i < CUBE_SYM; i++)
    for (var j=0; j < CUBE_SYM; j++)
      if (ep_sym_tmp[mp[i]][j] == mp[0])
	inv_op[i] = j;

  for (i=0; i < CUBE_SYM; i++)
    for (j=0; j < CUBE_SYM; j++)
      for (var k=0; k < CUBE_SYM; k++)
	if (mp[i] == ep_sym_tmp[mp[j]][k])
	  op_op[j*CUBE_SYM+k] = i;

  // populated.push("inv_op");
  // populated.push("op_op");
  if (show_init_time_details == 1) {
    var time1 = Date.now();
    document_write(((time1-time0)/1000).toFixed(2) + ' populate_op_tables<br>');
  }
}

function populate_epr_mov()
{
  var time0 = Date.now();
  var s = new Uint8Array([0,1,2,3,0,1,2,3,0,0,0,0]);
  var s2 = new Uint8Array(4);
  var tmp = new Uint8Array(12);
  var epr = new Uint8Array(3);
  var eps_3c = new Uint8Array(12);
  var eps_6c = new Uint8Array(12);

  for (var mv=0; mv < MOVES; mv++)
      for (var i=0; i < SLICE_PRM; i++)
	{
	  int_to_strp(ep_b3[slice_ep[i*3+2]], eps_3c, 11, 3);

	  for (var j=0; j < 24; j++)
	    {
              int_to_perm(j, s2, 4);

              for (var k=0; k < 4; k++)
                s[8+k] = s2[k];

	      mk_eps_6c(eps_6c, eps_3c, s);

	      for (var k=0, x=0; k < 12; k++)
		{
                  var n = eps_6c[emv[mv*12+k]]-8;

		  if (n >= 0)
		    tmp[x++] = n;
		}

                epr_mov[i*24*MOVES + j*MOVES + mv] = perm_to_int(tmp, 4);
	    }
	}
  // populated.push("epr_mov");
  if (show_init_time_details == 1) {
    var time1 = Date.now();
    document_write(((time1-time0)/1000).toFixed(2) + ' populate_epr_mov<br>');
  }
}

function mk_eps_6c(eps_6c, eps_3c, s)
{
  var y = 4;
  var z = 8;
  for (var i=0, x=0; i < 12; i++)
    {
      if (eps_3c[i] == 0)
	eps_6c[i] = s[x++];

      else if (eps_3c[i] == 1)
	eps_6c[i] = s[y++] + 4;

      else if (eps_3c[i] == 2)
	eps_6c[i] = s[z++] + 8;
    }
}

function ep6c_ep3c(s) {
  var tmp = new Uint8Array(12);
  for (var i=0; i < 12; i++)
    tmp[i] = s[i]/4;
  return(b3_ep[str_to_int(tmp,11,3)]);
}

function ep6c_epr(s, epr)
{
  var t0 = new Uint8Array(4);
  var t1 = new Uint8Array(4);
  var t2 = new Uint8Array(4);

  /* example:

       ep6c: 3768B9042A15
       ep3c: 011222010201
             ------------
     epr[0]: 3     0 2 1   3021 -> 19
     epr[1]:  32    0   1  3201 -> 22
     epr[2]:    031   2    0312 ->  4
 */

  for (var i=0, x0=0, x1=0, x2=0; i < 12; i++)
    if (s[i]>>2 == 0)
      t0[x0++] = s[i];
    else if (s[i]>>2 == 1)
      t1[x1++] = s[i]-4;
    else
      t2[x2++] = s[i]-8;

  epr[0] = perm_to_int(t0, 4);
  epr[1] = perm_to_int(t1, 4);
  epr[2] = perm_to_int(t2, 4);
}

function convert_edg_6c(s, eps, ets)
{
  var L = s[22];   var D = s[49];   var B = s[31];
  var R = s[28];   var U = s[4];    var F = s[25];

  set_colors_6c(R, F, U, L, B, D);

  for (var i=0; i < 12; i++)
    {
      var x = s[edg_idx[i*2]];
      var y = s[edg_idx[i*2+1]];

      if ((x == U || x == D) ||
	  ((x == F || x == B) && (y == L || y == R)))
	{
	  ets[i] = 0;
	  eps[i] = get_eps(x, y);
	}
      else
	{
	  ets[i] = 1;
	  eps[i] = get_eps(y, x);
	}
    }
}

function get_eps(a, b)
{
  for (var i=0; i < 12; i++)
    if ((edg[i*2] == a) && (edg[i*2+1] == b))
      return(i);
}

function convert_cnr_6c(s, cps, cts)
{
  var L = s[22];   var D = s[49];  var B = s[31];
  var R = s[28];   var U = s[4];   var F = s[25];

  set_colors_6c(R, F, U, L, B, D);

  for (var i=0; i < 8; i++)
    {
      var x = s[cnr_idx[i*3]];
      var y = s[cnr_idx[i*3+1]];
      var z = s[cnr_idx[i*3+2]];

      if (x == U || x == D)
	{
	  cts[i] = 0;               /* no twist */
	  cps[i] = get_cps(x,y,z);
	}
      else if (y == U || y == D)
	{
	  cts[i] = 1;	            /* 1/3 clockwise twist */
	  cps[i] = get_cps(y,z,x);
	}
      else
	{
	  cts[i] = 2;	            /* 1/3 counter-clockwise twist */
	  cps[i] = get_cps(z,x,y);
	}
    }
  return(perm_to_int(cps,8));
}

function get_cps(a, b, c)
{
  for (var i=0; i < 8; i++)
    if ((cnr[i*3] == a) && (cnr[i*3+1] == b) && (cnr[i*3+2] == c))
      return(i);
}

function set_colors_6c(r, f, u, l, b, d)
{
  cnr = [u,f,l,d,f,r,d,b,l,u,b,r,d,l,f,u,r,f,u,l,b,d,r,b];
  edg = [f,l,f,r,b,r,b,l,u,f,d,f,d,b,u,b,u,l,u,r,d,r,d,l];

  // cnr = [[u,f,l],[d,f,r],[d,b,l],[u,b,r],[d,l,f],[u,r,f],[u,l,b],[d,r,b]];
  // edg = [[f,l],[f,r],[b,r],[b,l],[u,f],[d,f],[d,b],[u,b],[u,l],[u,r],[d,r],[d,l]];
}

function parity(s, len)
{
  var tmp = [];

  for (var i = 0; i < len; i++)
    tmp[i] = s[i];

  for (var i=0, n=0; i < len; i++)
    while (tmp[i] != i)
      {
	var x = tmp[i];
	tmp[i] = tmp[x];
	tmp[x] = x;
	n++;
      }
  return(n%2);
}

function color_str(c)
{
  if      (c == "W") return "white";
  else if (c == "Y") return "yellow";
  else if (c == "R") return "red";
  else if (c == "O") return "orange";
  else if (c == "B") return "blue";
  else if (c == "G") return "green";
  else if (c == "L") return "lightgray";
}

function populate_ct_sym()
{
  var time0 = Date.now();
  var s = new Int8Array(FACELETS);
  var cts_fb = new Uint8Array(8);
  var ctsa = new Int8Array(C_TWIST*8);  // 17 KB
  // dependency("cp_sym");
  assign_centers_3c();
  populate_ct_op_type();
  for (var ct=0; ct < C_TWIST; ct++)
    ct_sym[ct*CUBE_SYM] = ct;
  int_to_strp(0, cps, 7, 2);
  for (ct=0; ct < C_TWIST; ct++) {
    int_to_strp(ct, cts, 7, 3);
    make_cubestr_cnr(cnr2);
    for (var op=1; op < CUBE_SYM; op++) {
      sym_op(s, cubestr, map[op]);
      var ix = ct*CUBE_SYM+op;
      if (ct_op_type[op] == 0)
        ct_sym[ix] = get_ct_ud(s, s[4]);   // U
      else if (ct_op_type[op] == 1)
        ct_sym[ix] = get_ct_fb(s, s[25]);  // F
      else
        ct_sym[ix] = get_ct_lr(s, s[28]);  // R
    }
  }
  for (var ct=0; ct < C_TWIST; ct++) {
    ct_fb_ud[ct] = ct;
    ct_lr_ud[ct] = ct;
  }
  /*
  for (var cp=1; cp < C_PRM; cp++) {
    int_to_strp(cp_b2[cp], cps, 7, 2);
    for (ct=0; ct < C_TWIST; ct++) {
      int_to_strp(ct, cts, 7, 3);
      make_cubestr_cnr(cnr2);
      ct_fb_ud[cp*C_TWIST+get_ct_fb(cubestr, cubestr[25])] = ct;
    }
  }
  */
  for (ct=0; ct < C_TWIST; ct++) {
    int_to_strp(ct, cts, 7, 3);
    for (var i=0; i < 8; i++)
      ctsa[ct*8+i] = cts[i];
  }
  for (var cp=1; cp < C_PRM; cp++) {
    int_to_strp(cp_b2[cp], cps, 7, 2);
    for (ct=0; ct < C_TWIST; ct++) {
      // int_to_strp(ct, cts, 7, 3);
      for (var i=0; i < 8; i++)
        cts[i] = ctsa[ct*8+i];
      for (i=0; i < 4; i++)
        cts_fb[i] = (cps[i] == 0) ? cts[i] : (cts[i]+2)%3;
      for (; i < 8; i++)
        cts_fb[i] = (cps[i] == 0) ? (cts[i]+1)%3 : cts[i];
     ct_fb_ud[cp*C_TWIST+ct] = str_to_int(cts_fb, 7, 3);
    }
  }
  // apply ct_fb_ud twice to make ct_lr_ud
  for (cp=1, ix=C_TWIST; cp < C_PRM; cp++, ix=cp*C_TWIST) {
    for (ct=0; ct < C_TWIST; ct++) {
       var ctsym = ct_fb_ud[ix+ct];
       ct_lr_ud[ix+ct] = ct_fb_ud[ix+ctsym];
    }
  }
  // populated.push('ct_sym');
  if (show_init_time_details == 1) {
    var time1 = Date.now();
    document_write(((time1-time0)/1000).toFixed(2) + ' populate_ct_sym total<br>');
  }
}

function populate_ct_op_type() {
  var op_ud = new Uint8Array([ 0, 1, 3, 5, 7, 9,11,22,24,25,27,29,31,33,35,46]);
  var op_fb = new Uint8Array([13,14,15,16,17,18,19,20,37,38,39,40,41,42,43,44]);
  var op_lr = new Uint8Array([ 2, 4, 6, 8,10,12,21,23,26,28,30,32,34,36,45,47]);
  for (var i=0; i < 16; i++) {
    ct_op_type[op_fb[i]] = 1;
    ct_op_type[op_lr[i]] = 2;
  }
}

function get_ct_ud(s, u) {
  for (var i=0; i < 8; i++)
    cts[i] = ((s[cnr_idx[i*3]]==u)?0:((s[cnr_idx[i*3+1]]==u)?1:2));
  return(str_to_int(cts, 7, 3));
}

function get_ct_fb(s, f) {
  for (var i=0; i < 4; i++)
    cts[i] = ((s[cnr_idx[i*3]]==f)?2:((s[cnr_idx[i*3+1]]==f)?0:1));
  for (; i < 8; i++)
    cts[i] = ((s[cnr_idx[i*3]]==f)?1:((s[cnr_idx[i*3+1]]==f)?2:0));
  return(str_to_int(cts, 7, 3));
}

function get_ct_lr(s, r) {
  for (var i=0; i < 4; i++)
    cts[i] = ((s[cnr_idx[i*3]]==r)?1:((s[cnr_idx[i*3+1]]==r)?2:0));
  for (; i < 8; i++)
    cts[i] = ((s[cnr_idx[i*3]]==r)?2:((s[cnr_idx[i*3+1]]==r)?0:1));
  return(str_to_int(cts, 7, 3));
}

function document_write(s) {
  // document.write(s);
  logtxt.push(s);
}

function show_log(style)
{
  if (typeof(logwin) != 'undefined')
    logwin.close();
  logwin = window.open('', 'rc_solve_log');
  logwin.document.write('<!doctype html>\n');
  logwin.document.write('<html>\n');
  logwin.document.write('<head>\n');
  logwin.document.write('<style>\n');
  logwin.document.write(' body {color:white; background-color:#38383D; margin-left:10%; margin-right:10%}\n');
  logwin.document.write(' .btn {height:28px; width:100px; border-radius:15px; background:white; padding:0px; border:none;}\n');
  logwin.document.write(' .tabdata td {text-align:right; padding:2px 10px; border-color:black}\n');
  logwin.document.write('</style>\n');
  logwin.document.write('</head>\n');
  logwin.document.write('<body >\n');
  logwin.document.write('<br>Solve Log:<br>\n');
  for (var i=0; i < logtxt.length; i++)
    logwin.document.write(logtxt[i] + '\n');
  logwin.document.write('<button class=btn onclick="window.close()">Close</button>');
  logwin.document.write('<br><br>\n');
  logwin.document.write('</body>\n');
  logwin.document.write('</html>\n');
  logwin.document.title = 'Solve Log';
  logwin.document.close();
}

function show_cube_layout(s)
{
  // document_write('<pre style=margin:0>');
  document_write('<pre>');
  document_write('    ' + s[0] + s[1] + s[2]);
  document_write('    ' + s[3] + s[4] + s[5]);
  document_write('    ' + s[6] + s[7] + s[8]);
  document_write(s[9]  + s[10] + s[11] + ' ' + s[12] + s[13] + s[14] + ' ' +
                 s[15] + s[16] + s[17] + ' ' + s[18] + s[19] + s[20]);
  document_write(s[21] + s[22] + s[23] + ' ' + s[24] + s[25] + s[26] + ' ' +
                 s[27] + s[28] + s[29] + ' ' + s[30] + s[31] + s[32]);
  document_write(s[33] + s[34] + s[35] + ' ' + s[36] + s[37] + s[38] + ' ' +
                 s[39] + s[40] + s[41] + ' ' + s[42] + s[43] + s[44]);
  document_write('    ' + s[45] + s[46] + s[47]);
  document_write('    ' + s[48] + s[49] + s[50]);
  document_write('    ' + s[51] + s[52] + s[53]);
  document_write('</pre>');
}

// ----------------------------------------------------------------------------
// convlib
// ----------------------------------------------------------------------------

var last_digit = new Uint8Array([0,0,0,0,0,0,0,0,0,1,0,0,0,2,1,0,2,1,0,3]);
var exp = new Uint32Array(75);
var fac = new Uint32Array(15);

function init_conv() {
  for (var i=2; i <= 4; i++) {
    exp[i*15+1] = i;
    for (var j=2; j <= 12; j++)
      exp[i*15+j] = exp[i*15+(j-1)]*i;
  }
  fac[2] = 2;
  for (var i=3; i <= 12; i++)
    fac[i] = i*fac[i-1];
}

function int_to_str(n, s, len, base) {
  for (var i=0, j=exp[base*15+(len-1)]; i < len; n%=j, j/=base, i++)
    s[i] = Math.floor(n/j);
}

function int_to_strp(n, s, len, base) {
  for (var i=0, j=exp[base*15+(len-1)]; i < len; n%=j, j/=base, i++)
    s[i] = Math.floor(n/j);
  for (var i=j=0; i < len; i++)
    j += s[i];
  s[len] = last_digit[base*4+(j%base)];
}

var gcta = new Uint32Array(10);

function int_to_str_lim(n, s, len, base, lim) {
  for (var i=0; i < base; i++)
    gcta[i] = 0;
  for (var i=0, j=exp[base*15+(len-1)]; i < len; n%=j, j/=base, i++) {
      s[i] = Math.floor(n/j);
      gcta[s[i]]++;
      if (gcta[s[i]] > lim)
	return(0);
    }
  for (var i=0; i < base; i++)
    if (gcta[i] < lim)
      s[len] = i;
  return(1);
}

var gtmp = new Uint8Array(15);

function int_to_perm(n, s, len) {
  for (var i=0; i < len; i++)
    gtmp[i] = i;
  len--;
  for (var i=0, j=fac[len]; i < len; n%=j, j/=(len-i), i++) {
    var k = Math.floor(n/j);
    s[i] = gtmp[k];
    for (; k < len-i; k++)
      gtmp[k] = gtmp[k+1];
  }
  s[len] = gtmp[0];
}

function str_to_int(s, len, base) {
  var n = s[0];
  for (var i=1; i < len; i++) {
    n *= base;
    n += s[i];
  }
  return(n);
}

function perm_to_int(s, len) {
  for (var q=0, i=len-2, j=1; i > 0; i--) {
    j *= (len-(i+1));
    for (var v=0, k=i+1; k < len; k++)
      if (s[i] > s[k])
        v++;
    q += (j*v);
  }
  j *= len-1;
  q += (s[0] * j);
  return q;
}

function convert_time(n) {
  var h, m, s, ms;
  m = Math.floor((n/60)%60);
  s = Math.floor(n%60);
  ms = n.substr(n.length-2, 2);
  if (m < 10) m = '0' + m;
  if (s < 10) s = '0' + s;
  if (n < 3600)
    return(m + ':' + s + '.' + ms)
  else {
    h = Math.floor(n/3600);
    if (m < 10) m = '0' + m;
    return(h  + ':' + m + ':' + s  + '.' + ms);
  }
}

