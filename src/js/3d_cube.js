// size of cube window
var window_width = window.innerWidth;
var window_height = window.innerHeight;//* camera height/camera width


init();
animate();
//update();

var camera, scene, renderer, cube;

function init() {
  camera = new THREE.PerspectiveCamera( 95, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 0;
    console.log("3d camera fov is",camera.fov);
    console.log("3d camera position z", camera.position.z);
  controls = new THREE.DeviceOrientationControls( camera );
  scene = new THREE.Scene();
  container = document.querySelector("#container");

// create the shape
 var geometry = new THREE.BoxBufferGeometry(2,2,2,2,2,2); // cube size, amount in 3 dim
  //geometry.scale( - 1, 1, 1 );
 //create a material color or image texture
 var material = new THREE.MeshBasicMaterial({color: 0x00FFFF, wireframe: true});
 cube = new THREE.Mesh(geometry,material);
 scene.add(cube);

  //var geometry = new THREE.SphereBufferGeometry( 500, 60, 40 );
  // invert the geometry on the x-axis so that all of the faces point inward
  //geometry.scale( - 1, 1, 1 );
 // var material = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true } );
 // var mesh = new THREE.Mesh( geometry, material );
 // scene.add( mesh );


  renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window_width, window_height );
  renderer.domElement.className = 'd_cube_help';
  container.appendChild( renderer.domElement );
  window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {

  window.requestAnimationFrame( animate );
  controls.update();
  //var distance_z = parseInt(toString(window_height/2 / Math.tan(camera.fov/2)));

  renderer.render( scene, camera );

}

function onWindowResize() {

  camera.aspect = window_width / window_height;
  camera.updateProjectionMatrix();
  renderer.setSize( window_width, window_height );

}




