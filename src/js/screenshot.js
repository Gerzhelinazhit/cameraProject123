//captureVideoButton =
screenshotButton = document.querySelector('.screenshot-button');
cubeClick = document.querySelector(".d_cube_help");
//img = document.querySelector('.image');
video = document.querySelector('video');

canvas = document.createElement('canvas');

screenshotButton.onclick = cubeClick.onclick = function() {
  childCount();
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  canvas.id = 'screenshot_img';
 // img = document.createElement('img');

  // Other browsers will fall back to image/png
  let div = document.getElementById('image-container');
  let img = document.createElement("img");
  img.className = 'image';
  div.appendChild(img);

  img.src = canvas.toDataURL('src/img');
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
}
