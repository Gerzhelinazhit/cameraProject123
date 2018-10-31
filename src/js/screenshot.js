//captureVideoButton =
screenshotButton = document.querySelector('.screenshot-button');
//img = document.querySelector('.image');
video = document.querySelector('video');

canvas = document.createElement('canvas');

var timeout;
var lastTap = 0;

$('element').on('touchend click',function(e){
  var currentTime = new Date().getTime();
  var tapLength = currentTime - lastTap;

  e.preventDefault();
  clearTimeout(timeout);

  if(tapLength < 500 && tapLength > 0){

    //Double Tap/Click
    childCount();
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

  }else{

    //Single Tap/Click

    timeout = setTimeout(function(){
      //Single Tap/Click code here

      clearTimeout(timeout);
    }, 500);
  }
  lastTap = currentTime;
});

// screenshotButton.onclick = video.onclick = function() {
//   childCount();
//   canvas.width = window.innerWidth;//video.videoWidth;
//   canvas.height = window.innerHeight;//video.videoHeight;
//   canvas.getContext('2d').drawImage(video, 0, 0);
//   canvas.id = 'screenshot_img';
//  // img = document.createElement('img');
//
//   // Other browsers will fall back to image/png
//   let div = document.getElementById('image-container');
//   let img = document.createElement("img");
//   img.className = 'image';
//   div.appendChild(img);
//
//   img.src = canvas.toDataURL('src/img');
// };

function handleSuccess(stream) {
  screenshotButton.disabled = false;
  video.srcObject = stream;
}

function childCount(){
  // let count = document.getElementById('image-container').childElementCount;
  // return count;
  if(document.getElementById('image-container').childElementCount > 5){
    document.getElementById('image-container').removeChild(document.getElementsByTagName('img')[0]);
  }
}
