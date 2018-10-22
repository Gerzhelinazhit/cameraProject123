var hex_height = 3*Math.sqrt(3)/2*1.1;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight, 1, 1500 );
camera.position.set( 0, 0, 0 );
controls = new THREE.DeviceOrientationControls( camera );
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
var container = document.querySelector(".video_container");
container.appendChild( renderer.domElement );
renderer.domElement.className = "hex_help";

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

var line = new THREE.Line ( hexahedron, material );

scene.add(line);

//camera.position.z = 10;

var animate = function () {
  requestAnimationFrame( animate );
  //controls.update();

  //line.rotation.x += 0.005;
  renderer.render( scene, camera );
};

animate();
