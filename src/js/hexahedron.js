var hex_height = 3*Math.sqrt(3)/2*1.2;

init();
animate();

var camera, scene, renderer, line, controls;

function init() {
  camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight, 1, 1500 );
  camera.position.z = 10;

 // controls = new THREE.DeviceOrientationControls(camera);
  scene = new THREE.Scene();
  var container = document.querySelector(".video_container");

  var material = new THREE.MeshBasicMaterial( { color: 0x0000ff} );

  hexahedron = new THREE.Geometry();
  hexahedron.vertices.push(new THREE.Vector3(-1.5,-1.5,hex_height));
  hexahedron.vertices.push(new THREE.Vector3(-1.5,1.5,hex_height));
  hexahedron.vertices.push(new THREE.Vector3(1.5,1.5,hex_height));
  hexahedron.vertices.push(new THREE.Vector3(1.5,-1.5,hex_height));
  hexahedron.vertices.push(new THREE.Vector3(-1.5,-1.5,hex_height)); //main plane (then rotation right)

  hexahedron.vertices.push(new THREE.Vector3(1.5,-1.5,hex_height));
  hexahedron.vertices.push(new THREE.Vector3(1.5,1.5,hex_height));
  hexahedron.vertices.push(new THREE.Vector3(3,1.5,0));
  hexahedron.vertices.push(new THREE.Vector3(3,-1.5,0));
  hexahedron.vertices.push(new THREE.Vector3(1.5,-1.5,hex_height)); // plane 2

  hexahedron.vertices.push(new THREE.Vector3(3,-1.5,0));
  hexahedron.vertices.push(new THREE.Vector3(3,1.5,0));
  hexahedron.vertices.push(new THREE.Vector3(1.5,1.5,-hex_height));
  hexahedron.vertices.push(new THREE.Vector3(1.5,-1.5,-hex_height));
  hexahedron.vertices.push(new THREE.Vector3(3,-1.5,0)); //plane 3

  hexahedron.vertices.push(new THREE.Vector3(1.5,-1.5,-hex_height));
  hexahedron.vertices.push(new THREE.Vector3(1.5,1.5,-hex_height));
  hexahedron.vertices.push(new THREE.Vector3(-1.5,1.5,-hex_height));
  hexahedron.vertices.push(new THREE.Vector3(-1.5,-1.5,-hex_height));
  hexahedron.vertices.push(new THREE.Vector3(1.5,-1.5,-hex_height)); //plane 4

  hexahedron.vertices.push(new THREE.Vector3(-1.5,-1.5,-hex_height));
  hexahedron.vertices.push(new THREE.Vector3(-1.5,1.5,-hex_height));
  hexahedron.vertices.push(new THREE.Vector3(-3,1.5,0));
  hexahedron.vertices.push(new THREE.Vector3(-3,-1.5,0));
  hexahedron.vertices.push(new THREE.Vector3(-1.5,-1.5,-hex_height)); // plane 5

  hexahedron.vertices.push(new THREE.Vector3(-3,-1.5,0));
  hexahedron.vertices.push(new THREE.Vector3(-3,1.5,0));
  hexahedron.vertices.push(new THREE.Vector3(-1.5,1.5,hex_height));
  hexahedron.vertices.push(new THREE.Vector3(-1.5,-1.5,hex_height));
  hexahedron.vertices.push(new THREE.Vector3(-3,-1.5,0));

  line = new THREE.Line ( hexahedron, material );

  scene.add(line);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.domElement.className = "hex_help";
  container.appendChild( renderer.domElement );
  window.addEventListener( 'resize', onWindowResize, false );
}


function animate() {
  requestAnimationFrame( animate );
  //controls.update();

  renderer.render( scene, camera );
}


function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );

}
