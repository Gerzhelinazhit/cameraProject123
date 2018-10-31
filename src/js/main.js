'use strict';

const videoElement = document.querySelector('video');
const videoSelect = document.querySelector('select#videoSource');
const selectors = [ videoSelect];

function gotDevices(deviceInfos) {
  // Handles being called several times to update labels. Preserve values.
  const values = selectors.map(select => select.value);

  // delete existing selectors
  selectors.forEach(select => {
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
  });

  for (let i = 0; i !== deviceInfos.length; ++i) {
    const deviceInfo = deviceInfos[i];
    const option = document.createElement('option');
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === 'videoinput'){// && deviceInfo.label.match('back'))             {//&& (regex.test(deviceInfo.label)|| regex1.test(deviceInfo.label))) {
      console.log(option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`);
        option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
        videoSelect.appendChild(option);
    }
  }



  //!!!!!!!!!!!!!!!!!!     here is problem !!!!!!!!!!!!!!!!!!
  selectors.forEach((select, selectorIndex) => {
    if (Array.prototype.slice.call(select.childNodes).some(n => n.value === values[selectorIndex])) {
      select.value = values[selectorIndex];
    }
  });
  // Try to select second element from choose-list as default.
  //Bad idea!!!!!
  //if (videoSelect.children[1]) {
  //  videoSelect.children[1].selected = true;
  //}
}

console.log("mediaDevices values before start function", navigator.mediaDevices.enumerateDevices());
navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

function gotStream(stream) {
  window.stream = stream; // make stream available to console
  videoElement.srcObject = stream;
  console.log("mediaDevices values in gotStream function", navigator.mediaDevices.enumerateDevices());
  // Refresh button list in case labels have become available
  return navigator.mediaDevices.enumerateDevices();
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

function start() {
  // stop performing videoStream
  if (window.stream) {
    console.log("window stream tracks: ",window.stream.getTracks());
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }
  const videoSource = videoSelect.value;
  console.log("videoSelect val0: ",videoSelect.value);

  // here we choose devices with videoSourse
  const constraints = {
    video: { deviceId: videoSource ? {exact: videoSource} : undefined}
  };

  navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError); //i think before gotStream we should choose one

}

start();


