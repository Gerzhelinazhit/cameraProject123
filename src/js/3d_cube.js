// size of cube window
var window_width = window.innerWidth;
var window_height = window.innerHeight;//* camera height/camera width

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,window_width/window_height, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
renderer.setSize(window_width,window_height);
var controls;

container = document.querySelector("#container");
renderer.domElement.className = 'd_cube';

// create the shape
var geometry = new THREE.BoxGeometry(3,2,3);

//create a material color or image texture
var material = new THREE.MeshBasicMaterial({color: 0x00FFFF, opacity:10, wireframe: true});
var cube = new THREE.Mesh(geometry,material);
scene.add(cube);

// logic
var update = function () {

  cube.rotation.y += 0.003;

};

window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize() {
  camera.aspect = window_width / window_height;
  camera.updateProjectionMatrix();
  renderer.setSize( window_width, window_height );
}

//draw scene
var render = function () {
  renderer.render(scene, camera);
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window_width, window_height );
};

//run loop (update, render, repeat)
var GameLoop = function () {
  requestAnimationFrame( GameLoop );
  update();
  render();
};

function init() {
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );

  var geometry = new THREE.SphereBufferGeometry( 500, 60, 40 );
  // invert the geometry on the x-axis so that all of the faces point inward
  geometry.scale( - 1, 1, 1 );

  var material = new THREE.MeshBasicMaterial( {
    map: new THREE.TextureLoader().load( 'textures/2294472375_24a3b8ef46_o.jpg' )
  } );

  var mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  var helperGeometry = new THREE.BoxBufferGeometry( 100, 100, 100, 4, 4, 4 );
  var texture = THREE.TextureLoader('.image');
  helperMaterial = new THREE.MeshBasicMaterial({map: texture});
  var helper = new THREE.Mesh( helperGeometry, helperMaterial );
  scene.add( helper );

  renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window_width, window_height );
  renderer.domElement.className = 'd_cube_help';
  container.appendChild( renderer.domElement );
  window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {

  window.requestAnimationFrame( animate );
  //controls.update();
  renderer.render( scene, camera );

}

function onWindowResize() {

  camera.aspect = window_width / window_height;
  camera.updateProjectionMatrix();
  renderer.setSize( window_width, window_height );

}
GameLoop();

init();
animate();



