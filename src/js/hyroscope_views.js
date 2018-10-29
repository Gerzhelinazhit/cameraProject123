var horizontal_hyroscope = document.querySelector('.horizontal_hyroscope');
var vertical_hyroscope = document.querySelector('.vertical_hyroscope');

var canvas = document.createElement('canvas');
var context = canvas.getContext("2d");
var image = new Image();
image.src = "http://localhost/tile.png";
image.onload = function(){
  context.drawImage(image, canvas.width, canvas.height);
};
horizontal_hyroscope.appendChild(canvas);
