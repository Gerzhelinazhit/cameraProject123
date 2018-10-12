var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
container = document.querySelector("#container");
container.appendChild(renderer.domElement);

// create the shape
var geometry = new THREE.BoxGeometry(3,2,3);

//create a material color or image texture
var material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, opacity:10, wireframe: true});
var cube = new THREE.Mesh(geometry,material);
scene.add(cube);

camera.position.z = 3;

// logic
var update = function () {
  //cube.rotation.x += 0.01;
  cube.rotation.y += 0.005;

};
//draw scene
var render = function () {
  renderer.render(scene, camera);
};
//run loop (update, render, repeat)
var GameLoop = function () {
  requestAnimationFrame( GameLoop );

  update();
  render();
};

GameLoop();



