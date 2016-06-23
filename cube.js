var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshNormalMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

//var textMaterial = new THREE.MeshPhongMaterial({ color: 0xdddddd });
//var textGeom = new THREE.TextGeometry( 'Node1', {
//    font: "helvetiker" // Must be lowercase!
//});
//var textMesh = new THREE.Mesh( textGeom, textMaterial );
//scene.add( textMesh );

camera.position.z = 5;

function render() {
    requestAnimationFrame( render );
    cube.rotation.x += 0.05;
    cube.rotation.y += 0.05;
    renderer.render( scene, camera );
}

render();