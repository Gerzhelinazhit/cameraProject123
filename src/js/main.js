'use strict';

const videoElement = document.querySelector('video');
const videoSelect = document.querySelector('select#videoSource');
const selectors = [ videoSelect];
const regex1 = /(back)/g;
const regex = /(Back)/g;
var counter = 0;

function gotDevices(deviceInfos) {
  // Handles being called several times to update labels. Preserve values.
  const values = selectors.map(select => select.value);
  selectors.forEach(select => {
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
  });
  for (let i = 0; i !== deviceInfos.length; ++i) {
    const deviceInfo = deviceInfos[i];
    const option = document.createElement('option');
    option.value = deviceInfo.deviceId;
      if (deviceInfo.kind === 'videoinput' && regex.test(deviceInfo.label)|| regex1.test(deviceInfo.label)) {
      // console.log(option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`);
        option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
        if (counter == 1) {
          videoSelect.appendChild(option);
        }
        else {
          counter+=1;
          if (counter > 1){
            break;
          }
        }


    } // else {
      // console.log('Some other kind of source/device: ', deviceInfo);
    //}
  }
  selectors.forEach((select, selectorIndex) => {
    if (Array.prototype.slice.call(select.childNodes).some(n => n.value === values[selectorIndex])) {
      select.value = values[selectorIndex];
    }
  });
}
console.log(navigator.mediaDevices.enumerateDevices());
navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);




function gotStream(stream) {
  window.stream = stream; // make stream available to console
  videoElement.srcObject = stream;
  // Refresh button list in case labels have become available
  return navigator.mediaDevices.enumerateDevices();
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

function start() {
  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }
  const videoSource = videoSelect.value;
  console.log(videoSelect.value);
  const constraints = {
    video: {deviceId: videoSource ? {exact: videoSource} : undefined}
  };
  navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);
}

videoSelect.onchange = start;

start();
