//label_need = document.querySelector('.device_orientation');
var alph, bet, gam;
window.addEventListener('deviceorientation', function(event) {
  //console.log(event.alpha + ' : ' + event.beta + ' : ' + event.gamma);
  //label_need.textContent = event.alpha + ' : ' + event.beta + ' : ' + event.gamma;
});

function getAlpha() {
  alph = window.addEventListener('deviceorientation', function(event) {
   return event.alpha;
  });
  return alph;
}

//label_need.textContent = "aaaaaaaaaaaa"+getAlpha();
