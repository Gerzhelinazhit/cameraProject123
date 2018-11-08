container = document.querySelector(".video_container");
init(0);
animate();

var camera, scene, renderer, figure;



function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function init(counter){
  console.log("init 3d-figure");
  var n = 8;
  var rotation_angle = 360/n;
  var max_margin = 4; // think about it!!!
  var i = 0;

  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1.5 , 100 );
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

    var x1,y1,y2,z1;
    x1 = max_margin*Math.sin(toRadians(bett));
    y1 = max_margin*Math.sin(toRadians(bett));
    y2 = y1*(-1);
    z1 = max_margin*Math.cos(toRadians(bett));

    while (i < 8){
      writePlane(y1,y2,bett,i);
      i = i+1;
   }
  }

  function writePlane(y,y2,bett,i){

    var z = max_margin*Math.cos(toRadians((i)*rotation_angle+bett));
    var x = max_margin*Math.sin(toRadians((i)*rotation_angle+bett));

    figure.vertices.push(new THREE.Vector3(x,y,z));
    figure.vertices.push(new THREE.Vector3(x,y2,z));

    var z2 = max_margin*Math.cos(toRadians((i+1)*rotation_angle+bett));
    var x2 = max_margin*Math.sin(toRadians((i+1)*rotation_angle+bett));

    figure.vertices.push(new THREE.Vector3(x2,y2,z2));
    figure.vertices.push(new THREE.Vector3(x2,y,z2));
    figure.vertices.push(new THREE.Vector3(x,y,z));
    figure.vertices.push(new THREE.Vector3(x2,y,z2));
    line = new THREE.Line( figure, material2 );

    scene.add(line);
  }

  if (counter !== 0) {
    console.log("counter: ",counter);
    var myTexture = document.querySelector(".image");
    var texture = new THREE.TextureLoader().load(myTexture);
    var material = new THREE.MeshBasicMaterial({map: texture});
      // material = new THREE.MeshPhongMaterial({color: 0xCC0000});
    var z = max_margin*Math.cos(toRadians((counter-1)*rotation_angle+rotation_angle/2));
    var x = max_margin*Math.sin(toRadians((counter-1)*rotation_angle+rotation_angle/2));
    var z2 = max_margin*Math.cos(toRadians((counter)*rotation_angle+rotation_angle/2));
    var x2 = max_margin*Math.sin(toRadians((counter)*rotation_angle+rotation_angle/2));
    var geometry = new THREE.PlaneGeometry((x2-x), (z2-z));
    var mesh = new THREE.Mesh(geometry, material);
    //pointLight = new THREE.PointLight(0xFFFFFF);
    scene.add(mesh);
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
  var counter = childCount();
  if (counter !=0){
    init(counter)
  }

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );

}
