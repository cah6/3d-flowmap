var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 150;
camera.lookAt(0, 0, 0);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// LIGHT
var light = new THREE.PointLight(0xffffff);
light.position.set(0,0,1000);
scene.add(light);

var clock = new THREE.Clock();

createNode("Node1", -10, 30, 0);
createNode("Node2", -10, 0, 0);
createNode("Node3", -10, -30, 0);

var camControls = new THREE.FirstPersonControls(camera);
camControls.lookSpeed = 0.08;
camControls.movementSpeed = 60;
camControls.noFly = true;
camControls.lookVertical = true;
camControls.constrainVertical = true;
camControls.verticalMin = 1.0;
camControls.verticalMax = 2.0;
camControls.lon = -150;
camControls.lat = 120;

function render() {
    requestAnimationFrame( render );
    var delta = clock.getDelta();
    camControls.update(delta);
    renderer.render( scene, camera );
}

function createNode(name, x, y, z) {
    var cubeSize = 20;
    var geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    var material = new THREE.MeshNormalMaterial();
    var cube = new THREE.Mesh( geometry, material );
    cube.position.set(x, y, z);
    scene.add( cube );


    // give it a floating label
    var loader = new THREE.FontLoader();
    loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

        var textGeometry = new THREE.TextGeometry( name, {

            font: font,

            size: 10,
            height: 5,
            curveSegments: 12,

            bevelThickness: 1,
            bevelSize: 1,
            bevelEnabled: true

        });

        var textMaterial = new THREE.MeshPhongMaterial(
            { color: 0xdddddd, specular: 0xffffff }
        );

        var text = new THREE.Mesh( textGeometry, textMaterial );
        text.position.set(x + cubeSize/2 + 5, y - cubeSize/2 + 5, z)

        scene.add( text );

    });

    //return cube;
}

render();