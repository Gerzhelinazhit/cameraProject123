captureVideoButton =
screenshotButton = document.querySelector('.screenshot-button');
//img = document.querySelector('.image');
video = document.querySelector('video');

canvas = document.createElement('canvas');

screenshotButton.onclick = video.onclick = function() {
  canvas.width = window.innerWidth;//video.videoWidth;
  canvas.height = window.innerHeight;//video.videoHeight;
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
