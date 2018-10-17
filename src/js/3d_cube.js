// size of cube window
var window_width = window.innerWidth;
var window_height = window.innerHeight;//* camera height/camera width

init();
animate();
//update();

var camera, scene, renderer, cube;

function init() {
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
  //camera.position.z = 250;
    console.log("3d camera fov is",camera.fov);
  controls = new THREE.DeviceOrientationControls( camera );
  scene = new THREE.Scene();
  container = document.querySelector("#container");

// create the shape
  var geometry = new THREE.BoxGeometry(3,2,3); // cube size, amount in 3 dim

//create a material color or image texture
  var material = new THREE.MeshBasicMaterial({color: 0x00FFFF, opacity:10, wireframe: true});
  cube = new THREE.Mesh(geometry,material);
  scene.add(cube);

  var geometry = new THREE.SphereBufferGeometry( 500, 60, 40 );
  // invert the geometry on the x-axis so that all of the faces point inward
  geometry.scale( - 1, 1, 1 );

 var material = new THREE.MeshBasicMaterial( {
    map: new THREE.TextureLoader().load( '' )
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

/*
// logic
function update() {
  window.addEventListener('deviceorientation', function(e) {
    var alphaRotation = e.alpha ? e.alpha * (Math.PI / 600) : 0;
    cube.rotation.x = alphaRotation;
    var betaRotation = e.beta ? e.beta * (Math.PI / 600) : 0;
    cube.rotation.z = betaRotation;
    var gammaRotation = e.gamma ? e.gamma * (Math.PI / 600) : 0;
    cube.rotation.y = gammaRotation;

  });
};
*/

function animate() {

  window.requestAnimationFrame( animate );
  controls.update();
  //var distance_z = parseInt(toString(window_height/2 / Math.tan(camera.fov/2)));
  //camera.position.z = distance_z;
  renderer.render( scene, camera );

}

function onWindowResize() {

  camera.aspect = window_width / window_height;
  camera.updateProjectionMatrix();
  renderer.setSize( window_width, window_height );

}




