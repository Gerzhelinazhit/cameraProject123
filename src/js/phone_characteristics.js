label_need = document.querySelector('.device_orientation');

window.addEventListener('deviceorientation', function(event) {
  //console.log(event.alpha + ' : ' + event.beta + ' : ' + event.gamma);
  label_need.textContent = event.alpha + ' : ' + event.beta + ' : ' + event.gamma;
});
