//captureVideoButton =
screenshotButton = document.querySelector('.screenshot-button');
cubeClick = document.querySelector(".d_cube_help");
//img = document.querySelector('.image');
video = document.querySelector('video');

canvas = document.createElement('canvas');
screenshotButton.textContent = "Take screenshot";

screenshotButton.onclick = cubeClick.onclick = function() {
  var counter = childCount();
  canvas.width = window.innerWidth;
  canvas.height = window.innerWidth;
  //  resize_canvas.getContext('2d').drawImage(orig_src, 0, 0, width, height);
  var y_offset = (window.innerHeight-0.9*window.innerWidth)/2;
  var x_offset = 0.2*window.innerWidth;
  console.log("wid: ",window.innerWidth,", 09H: ",0.9*window.innerHeight,", x offset: ",x_offset,", y offset: ",y_offset);
  canvas.getContext('2d').drawImage(video, x_offset, y_offset, 0.9*window.innerWidth,0.9*window.innerWidth);
  canvas.id = 'screenshot_img';

  // Other browsers will fall back to image/png
  let div = document.getElementById('container');
  let img = document.createElement("img");
  img.className = 'image';
  div.appendChild(img);


  img.src = canvas.toDataURL('src/img');
  //getCameraParameters();
  animate();

};

function handleSuccess(stream) {
  screenshotButton.disabled = false;
  video.srcObject = stream;
}

function childCount(){
  // let count = document.getElementById('image-container').childElementCount;
  // return count;
  if(document.getElementById('image-container').childElementCount > 5){
    document.getElementById('image-container').removeChild(document.getElementsByTagName('img')[6]);
  }
  return document.getElementById('image-container').childElementCount;
}

