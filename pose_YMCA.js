let video;
let pose;
let skeleton;
let poseNet;

let brain;

let state = 'waiting';
let targetLabel;
let poseLabel = 'hi';

// function keyPressed() {
//   if (key == 's') {
//     brain.saveData();
//   } else {
//     targetLabel = key;
//     console.log(targetLabel);
//     setTimeout(function() {
//       console.log('collecting');
//       state = 'collecting';
//       setTimeout(function() {
//         console.log('not collecting');
//         state = 'waiting';
//       }, 10000);
//     }, 10000);
//   }
// }

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO)
  video.hide();
  
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  
  let options = {
    inputs: 34,
    outputs: 4,
    task: 'classification',
    debug: true 
  }
  brain = ml5.neuralNetwork(options);
  const modelInfo = {
    model: 'model_yoga/model.json',
    metadata: 'model_yoga/model_meta.json',
    weights: 'model_yoga/model.weights.bin',
  };
   brain.load(modelInfo, brainLoaded);
  // brain.loadData('ymca2.json', dataReady);
}

function dataReady() {
  brain.normalizeData();
  brain.train({epochs: 50}, finished); 
}

function brainLoaded() {
  console.log('pode classification ready!');
  // brain.save();
  classifyPose();
}

function classifyReady() {
  state = 'waiting'
  if (pose) {
    let nose = pose.keypoints[0].score;
    let ankleR = pose.keypoints[14].score;
    state = 'detect'
    if ((nose > 0.5) && (ankleR > 0.5)) {
      // console.log('detect');
      state = 'detect';
    } else {
      state = 'waiting';
      // console.log('waiting');
    }
  }
}

function classifyPose() {
  classifyReady();
  if (pose&& (state == 'detect')) {
    let inputs = [];
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    brain.classify(inputs, gotResult);
  } else {
    console.log('no pose detected');
    setTimeout(classifyPose, 100);
  }
}

function gotResult(error, results) {
  if (results[0].confidence >0.9) {
    poseLabel = results[0].label.toUpperCase();
  } else {
    poseLabel = '';
  }
  // console.log(results);
  console.log(results[0].confidence);
  console.log(results[0].label);
  classifyPose();
}

function finished() {
  console.log('model trained!');
  // brain.save();
}

function modelLoaded() {
  console.log('poseNet ready');
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
    if (state == 'collecting') {
      let inputs = [];
      for (let i = 0; i < pose.keypoints.length; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        inputs.push(x);
        inputs.push(y);
      }
      let target = [targetLabel];

      brain.addData(inputs, target);
    }
  }
}

function draw() {
  push();
  translate(video.width, 0);
  scale(-1,1);
  image(video, 0, 0);
  if (pose) {
    
//     let d = dist(pose.rightEye.x, pose.rightEye.y, pose.leftEye.x, pose.leftEye.y);
    
    // fill(255, 0, 0);
    // ellipse(pose.nose.x, pose.nose.y, d);
    
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(0,255,255);
      line(a.position.x, a.position.y,b.position.x, b.position.y); 
    }
    // for (let i = 0; i < pose.keypoints.length; i++) {
    //   let x = pose.keypoints[i].position.x;
    //   let y = pose.keypoints[i].position.y;
    //   fill(0);
    //   stroke(255);
    //   ellipse(x, y, 16, 16);
    // }
  }
  
  pop();
  
  fill(255,0,255);
  noStroke();
  textSize(30);
  textAlign(CENTER, CENTER);
  text(poseLabel, width-100, height/2);
  
  fill(255,0,255);
  noStroke();
  textSize(50);
   
  text(state, 80, 50);
}