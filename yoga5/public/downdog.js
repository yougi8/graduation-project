let video;
let poseNet;
let pose;
let skeleton;
let thirtysecs;
let posesArray = ['Downward Dog'];
let state = 'waiting';
var imgArray = new Array();

var poseImage;

let yoga;
let poseLabel;

var targetLabel;
var errorCounter;
var iterationCounter;
var poseCounter;
var target;

var timeLeft;
let mistake = [];
let trainer = [];

var msg = new SpeechSynthesisUtterance(); // load TTS
var voices = window.speechSynthesis.getVoices(); // load voices

function setup() {
  var canvas = createCanvas(640, 480);
  canvas.position(130, 210);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);



  poseCounter = 0;
  targetLabel = 1;// targetLabel 설정 1은 mountain 2는 tree 3은 dog ... 
  target = posesArray[poseCounter];
  //pose 이름 설정 
  document.getElementById("poseName").textContent = target;
  timeLeft = 10;
  document.getElementById("time").textContent = "00:" + timeLeft;
  errorCounter = 0;
  iterationCounter = 0;
  //image 넣어주기 

  let options = {
    inputs: 34,
    outputs: 4,
    task: 'classification',
    debug: true
  }

  yoga = ml5.neuralNetwork(options);
  const modelInfo = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin',
  };
  yoga.load(modelInfo, yogaLoaded);
  speech('준비해주세요');
}

function yogaLoaded() {
  console.log("Model ready!");
  classifyPose();
}

function classifyReady() {
  state = 'waiting'
  if (pose) {
    let nose = pose.keypoints[0].score;
    let ankleR = pose.keypoints[14].score;
    state = 'detect'
    if ((nose > 0.5) && (ankleR > 0.5)) {
      //console.log('detect');
      state = 'detect';
    } else {
      state = 'waiting';
      //console.log('waiting');
    }
  }
}

function classifyPose() {
  classifyReady();
  if (pose && (state == 'detect')) {
    let inputs = [];
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    yoga.classify(inputs, gotResult);
  } else {
    console.log("Pose not found");
    setTimeout(classifyPose, 100);
  }
}

function gotResult(error, results) {

  if (results[0].confidence > 0.70) {
    console.log("Confidence");
    //사용자의 포즈와 targetlabel 1 =mountain 이 일치하는 경우 
    if (results[0].label == "downdog") {
      console.log(targetLabel);
      iterationCounter = iterationCounter + 1;
      //반복횟수 하나씩 늘리기 

      console.log(iterationCounter)
      //10초동안 포즈 지속하면 
      if (iterationCounter == 11) {
        console.log("30!")
        iterationCounter = 0;
        //다음으로 넘어가 
        console.log('pose success');
        document.getElementById("time").textContent = "성공";
		speech('성공하셨습니다');
      }
      else {
        console.log("doin this")
        ////1초씩 줄이기 
        timeLeft = timeLeft - 1;
        //시간이 10보다 작은면 
        if (timeLeft < 10) {
          document.getElementById("time").textContent = "00:0" + timeLeft;
        } //시간이 10보다 크면  
        else {
          document.getElementById("time").textContent = "00:" + timeLeft;
        }
        savePose();
      }
    }
    else {
      //사용자의 포즈와 targetlabel =mountain이 일치하지 않은경우 
      errorCounter = errorCounter + 1;
      console.log("error");
      if (errorCounter >= 4) {
        console.log("four errors");
        iterationCounter = 0;
        timeLeft = 10;
        if (timeLeft < 10) {
          document.getElementById("time").textContent = "00:0" + timeLeft;
        } else {
          document.getElementById("time").textContent = "00:" + timeLeft;
        }
        errorCounter = 0;
        setTimeout(classifyPose, 100);
      } else {
        setTimeout(classifyPose, 100);
      }
    }
  }
  // confidence 넘지 못했을떄 
  else {
    console.log("whatwe really dont want")
    setTimeout(classifyPose, 100);
	speech('자세를 정확히 해주세요')
  }
}


function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  document.getElementById("rectangle").style.display = "none";
  console.log('poseNet ready');
}

function draw() {
  push();
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);

  if (pose) {
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(6);
      stroke(0, 255, 0);
      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }

    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];


      // ellipse(x, y, 16, 16);
      //mistake 부분 색깔 변경 
      if (mistake.includes(i)) {
        stroke(255, 0, 0);
        strokeWeight(6);
        line(a.position.x, a.position.y, b.position.x, b.position.y);
      }
    }
  }
  pop();
  fill(255, 204, 0);
  noStroke();
  textSize(60);
  textAlign(CENTER, CENTER);
  text(state, width * 0.85, height * 0.1);
}


function trainerAngle() {
  trainer[0] = 206.13196714453747
  trainer[1] = 166.91806861098257
  trainer[2] = 170.07907847537416
  trainer[3] = 157.6324762332499
  trainer[4] = 258.93926741308826
  trainer[5] = 99.37904960012457
  trainer[6] = 94.30994991634033
  trainer[7] = 282.91197864778536
}

function savePose() {
  input = [];
  console.log(pose);
  for (let i = 0; i < pose.keypoints.length; i++) {
    let x = pose.keypoints[i].position.x;
    let y = pose.keypoints[i].position.y;
    input.push(x);
    input.push(y);
  }
  calcAngle();
}

function calcAngle() {
  angle = [];
  // 0:왼쪽 무릎 각도 구하기        왼쪽 발목 x  - 왼쪽 무릎x  왼쪽발목 y - 왼쪽 무릎 y                     왼쪽 힙 x -왼쪽 무릎 x     왼쪽 힙 y - 왼쪽 무릎 y
  angle[0] = (Math.abs((Math.atan2(input[31] - input[27], input[30] - input[26])) + Math.abs(Math.atan2(input[23] - input[27], input[22] - input[26])))) * (180 / Math.PI);
  // 1:오른쪽 무릎 각도 구하기        오른쪽 발목 x  - 오른쪽 무릎x  오른쪽발목 y - 오른쪽 무릎 y        오른쪽 힙 x -오른쪽 무릎 x     오른쪽 힙 y - 오른쪽 무릎 y
  angle[1] = 360 - (Math.abs((Math.atan2(input[33] - input[29], input[32] - input[28])) + Math.abs(Math.atan2(input[25] - input[29], input[24] - input[28])))) * (180 / Math.PI);
  //2:왼쪽 힙 각도 구하기           왼쪽 무릎 x - 왼쪽 힙 x , 왼쪽 무릎y - 왼쪽 힙 y                 왼쪽 어꺠 x -왼쪽 힙 x        왼쪽 어꺠 y - 왼쪽 힙 y 
  angle[2] = (Math.abs(Math.atan2(input[27] - input[23], input[26] - input[22])) + Math.abs(Math.atan2(input[11] - input[23], input[10] - input[22]))) * (180 / Math.PI);
  //3:오른쪽 힙 각도 구하기           오른쪽 무릎 x - 오른쪽 힙 x , 오른쪽 무릎y - 오른쪽 힙 y                 오른쪽 어꺠 x -오른쪽 힙 x        오른쪽 어꺠 y - 오른쪽 힙 y 
  angle[3] = 360 - (Math.abs(Math.atan2(input[29] - input[25], input[28] - input[24])) + Math.abs(Math.atan2(input[13] - input[25], input[12] - input[24]))) * (180 / Math.PI);
  //4:왼쪽 팔꿈치 각도 구하기     왼쪽 손목 x -왼쪽 팔꿈치 x , 왼쪽 손목 y - 왼쪽 팔꿈치 y                 왼쪽 어깨 x- 왼쪽 팔꿈치 x    왼쪽 어깨 y- 왼쪽 팔꿈치 y
  angle[4] = (Math.abs(Math.atan2(input[19] - input[15], input[18] - input[14])) + Math.abs(Math.atan2(input[11] - input[15], input[10] - input[14]))) * (180 / Math.PI);
  //5:오른쪽 팔꿈치 각도 구하기     오른쪽 손목 x -오른쪽 팔꿈치 x , 오른쪽 손목 y - 오른쪽 팔꿈치 y                 오른쪽 어깨 x- 오른쪽 팔꿈치 x    오른쪽 어깨 y- 오른 쪽 팔꿈치 y
  angle[5] = 360 - (Math.abs(Math.atan2(input[21] - input[17], input[20] - input[16])) + Math.abs(Math.atan2(input[13] - input[17], input[12] - input[16]))) * (180 / Math.PI);
  //6:왼쪽 겨드랑이 각도 구하기       왼쪽 힙 x - 왼쪽 어깨 x  왼쪽 힙 y -왼쪽 어꺠 y        왼쪽 팔꿈치 x- 왼쪽 어꺠 x               왼쪽 팔꿈치 y- 왼쪽 어꺠 y  
  angle[6] = (Math.abs(Math.atan2(input[23] - input[11], input[22] - input[10])) + Math.abs(Math.atan2(input[15] - input[11], input[14] - input[10]))) * (180 / Math.PI);
  //7:오른쪽 겨드랑이 각도 구하기       오른쪽 힙 x - 오른쪽 어깨 x  오른쪽 힙 y -오른쪽 어꺠 y        오른쪽 팔꿈치 x- 오른쪽 어꺠 x               오른쪽 팔꿈치 y- 오른쪽 어꺠 y  
  angle[7] = 360 - (Math.abs(Math.atan2(input[17] - input[13], input[16] - input[12])) + Math.abs(Math.atan2(input[25] - input[13], input[24] - input[12]))) * (180 / Math.PI);
  cmpAngle();
}

function cmpAngle() {
  let cmp;
  let pass = true;
  mistake = [];
  trainerAngle();
  console.log("cmp angle")
  $('.mistake-list').text("");
  for (let i = 0; i < 8; i++) {
    //사용자의 각도 와 트레이너 각도의 차이 
    cmp = angle[i] - trainer[i];
    //각도가 30 이상 차이나면 표시 
    if (Math.abs(cmp) > 30) {
      console.log(trainer[i]);
      console.log(angle[i]);
      console.log(cmp);
      pass = false;
      switch (i) {
        case 0:
          $('.mistake-list').append("왼쪽 무릎 ", abs(int(cmp)), "° ");
          mistake.push(13);
          break;
        case 1:
          $('.mistake-list').append("오른쪽 무릎 ", abs(int(cmp)), "° ");
          mistake.push(14);
          break;
        case 2:
          $('.mistake-list').append("왼쪽 상체와 하체 ", abs(int(cmp)), "° ");
          mistake.push(11);
          break;
        case 3:
          $('.mistake-list').append("오른쪽 상체와 하체 ", abs(int(cmp)), "° ");
          mistake.push(12);
          break;
        case 4:
          $('.mistake-list').append("왼쪽 팔꿈치 ", abs(int(cmp)), "° ");
          mistake.push(7);
          break;
        case 5:
          $('.mistake-list').append("오른쪽 팔꿈치 ", abs(int(cmp)), "° ");
          mistake.push(8);
          break;
        case 6:
          $('.mistake-list').append("왼쪽 팔과 상체 ", abs(int(cmp)), "° ");
          mistake.push(5);
          break;
        case 7:
          $('.mistake-list').append("오른쪽 팔과 상체 ", abs(int(cmp)), "° ");
          mistake.push(6);
          break;
      }
      if (cmp > 0) {
        $('.mistake-list').append("더 구부리세요.<br>");
      } else {
        $('.mistake-list').append("더 펴세요.<br>");
      }
    }
  }

  if (pass) {
    // 5초간 유지하세요
    console.log("1초씩 증가 -1");
    //   iterationCounter=iterationCounter+1
    //   timeLeft=timeLeft-1
    setTimeout(classifyPose, 1000);

  } else {
    //   // 3초 후 다시 측정합니다.
    //   console.log("3s start");
    //   setTimeout(savePose, 3000);
    //   timer(3);
    // }
    console.log("1초씩 증가 -2");
    setTimeout(classifyPose, 1000);
  }
}

function speech(txt){
	if(!window.speechSynthesis){
		alert("browser does not support TTS.");
		return;
	}
	
	var lang = 'ko-KR';
	window.speechSynthesis.cancel() // 현재 읽고있다면 초기화
	
	msg.voice = voices[3];
	msg.volume = 1;
	msg.rate = 1;
	msg.pitch = 2;
	msg.lang = lang;
	msg.text = txt
	window.speechSynthesis.speak(msg);
}