container = document.querySelector(".video_container");
init();
animate();

var camera, scene, renderer, figure;
//var n = input.getTexParameter(); // get text from input, n == amount of planes

function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function init(){

  var n = 8;
  var rotation_angle = 360/n;
  var max_margin = 4; // think about it!!!
  var i = 0;
  camera = new THREE.PerspectiveCamera( rotation_angle, window.innerWidth / window.innerHeight, 3, 1000 );
  console.log("3d camera fov is",camera.fov);
  console.log("3d camera position z", camera.position.z);
  controls = new THREE.DeviceOrientationControls( camera );

  camera.position.z = 0;
  camera.position.y = 0;
  camera.position.x = 0;
  scene = new THREE.Scene();
  var material2 = new THREE.MeshBasicMaterial( { color: 0x0000ff} );

  writeFigure(rotation_angle,max_margin);
  function writeFigure(rotation_angle, max_margin) {
    figure = new THREE.Geometry();
    var bett = rotation_angle/2;
    console.log("bett=",bett,", angle=",rotation_angle,", margin=",max_margin);

    var x1,y1,y2,z1;
    y1 = max_margin*Math.sin(toRadians(bett));
    y2 = y1*(-1);
    z1 = max_margin*Math.cos(toRadians(bett));
    x1 = max_margin*Math.sin(toRadians(bett));
    console.log("x1: ",x1," ,y1",y1," ,y2",y2,", z1: ",z1);


    while (i < 8){
      z1 = writePlane(x1,y1,y2,z1,bett,i);
      console.log("z1=",z1);
      x1 = Math.sqrt(max_margin**2 - z1**2);
      i = i+1;
   }
  }

  function writePlane(x,y,y2,z,bett,i){
    console.log("plane",i);
    console.log("A1:",x,":",y,":",z);
    console.log("A2:",x,":",y2,":",z);

    figure.vertices.push(new THREE.Vector3(x,y,z));
    figure.vertices.push(new THREE.Vector3(x,y2,z));

    var z2 = z*Math.cos(toRadians((i+1)*rotation_angle+bett))/Math.cos(toRadians(i*rotation_angle+bett));
    var x2;
    console.log("angle=",(i+1)*rotation_angle+bett);
    if (((i+1)*rotation_angle+bett >= 180) && ((i+1)*rotation_angle+bett <= 360)){
      x2 = Math.sqrt(max_margin**2 - z2**2)*(-1);
    }
    else {
      x2 = Math.sqrt(max_margin**2 - z2**2);
    }

    //console.log("A3:",x2,":",y2,":",z2);
    //console.log("A1:",x2,":",y,":",z2);

    figure.vertices.push(new THREE.Vector3(x2,y2,z2));
    figure.vertices.push(new THREE.Vector3(x2,y,z2));
    figure.vertices.push(new THREE.Vector3(x,y,z));
    figure.vertices.push(new THREE.Vector3(x2,y,z2));
    line = new THREE.Line( figure, material2 );

    scene.add(line);
    console.log(z2);
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
