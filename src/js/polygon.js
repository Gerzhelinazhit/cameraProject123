container = document.querySelector(".video_container");

//var n = input.getTexParameter(); // get text from input, n == amount of planes
var n = 8;
var rotation_angle = 360/n;
var max_margin = 4; // think about it!!!
var i = 0;

function init(){
  camera = new THREE.PerspectiveCamera( 150, window.innerWidth / window.innerHeight, 1.7, 1000 );
  console.log("3d camera fov is",camera.fov);
  console.log("3d camera position z", camera.position.z);
  controls = new THREE.DeviceOrientationControls( camera );

  camera.position.z = 0;
  camera.position.y = 0;
  camera.position.x = 0;
  scene = new THREE.Scene();
  var material2 = new THREE.MeshBasicMaterial( { color: 0x0000ff} );


  function writeFigure(rotation_angle, max_margin) {
    figure = new THREE.Geometry();
    var x1,y1,y2,z1;
    y1 = max_margin*Math.tan(rotation_angle/2);
    y2 = y1*(-1);
    z1 = max_margin*Math.cos(rotation_angle/2);
    x1 = max_margin*Math.sin(rotation_angle/2);
    var bett = rotation_angle/2;

    while (i < n){
      z1 = writePlane(x1,y1,y2,z1,bett,i);
      x1 = Math.sqrt(max_margin**2 - z1**2);
      i = i+1;
    }

  }

  function writePlane(x,y,y2,z,bett,i){
    figure.vertices.push(new THREE.Vector3(x,y,z));
    figure.vertices.push(new THREE.Vector3(x,y2,z));

    var z2 = z*Math.cos((i+1)*rotation_angle+bett)/Math.cos(i*rotation_angle+bett);
    var x2 = Math.sqrt(max_margin**2 - z2**2);

    figure.vertices.push(new THREE.Vector3(x2,y,z2));
    figure.vertices.push(new THREE.Vector3(x2,y2,z2));
    line = new THREE.Line( figure, material2 );

    scene.add(line);
    return z2;
  }

  renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.domElement.className = 'n_polygon';
  container.appendChild( renderer.domElement );
  window.addEventListener( 'resize', onWindowResize, false );
}



function animate() {

  window.requestAnimationFrame( animate );
  controls.update();
  renderer.render( scene, camera );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );

}
