captureVideoButton =
screenshotButton = document.querySelector('.screenshot-button');
img = document.querySelector('.image');
video = document.querySelector('video');

canvas = document.createElement('canvas');

screenshotButton.onclick = video.onclick = function() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  // Other browsers will fall back to image/png
  img.src = canvas.toDataURL('src/img');
};

function handleSuccess(stream) {
  screenshotButton.disabled = false;
  video.srcObject = stream;
}
