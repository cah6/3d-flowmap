var container = document.createElement( 'div' );
document.body.appendChild( container );

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 150;

var particleOptions = [];

var clock = new THREE.Clock();

var camControls = new THREE.FlyControls(camera);
camControls.movementSpeed = 60;
camControls.domElement = container;
camControls.rollSpeed = Math.PI / 6;
camControls.autoForward = false;
camControls.dragToLook = true;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

container.appendChild( renderer.domElement );
// add light behind camera
var light1 = new THREE.PointLight(0xffffff);
light1.position.set(0, 0, 1000);

scene.add(light1);
// and way in front
var light2 = new THREE.PointLight(0xffffff);
light2.position.set(0, 0, -1000);

scene.add(light2);

// make particle system that will handle them all
var tick = 0;
var particleSystem = new THREE.GPUParticleSystem({
    maxParticles: 250000
});
scene.add(particleSystem);

var objects = [];

var velocity = new THREE.Vector3();

function render() {
    var delta = clock.getDelta();
    tick += delta;
    if (tick < 0) tick = 0;

    camControls.update(delta);

    for (var i = 0; i < particleOptions.length; i++) {
        updateParticles(particleOptions[i], delta, 6000);
    }

    particleSystem.update(tick);

    init();
    animate();
}

function updateParticles(options, delta, callsPerMin) {
    for (var numSpawned = 0; numSpawned < callsPerMin * delta; numSpawned++) {
        // do some manipulation to spawn particles over the length of the beam
        var optionsCopy = {};
        for (var i in options) {
            optionsCopy[i] = options[i];
        }

        optionsCopy.position = options.position.clone();
        var scaledDirection = options.velocity.clone();
        scaledDirection.multiplyScalar(Math.random() * options.lifetime / 2);
        optionsCopy.position.add(scaledDirection);
        optionsCopy.lifetime = 0.5;
        optionsCopy.velocity.setLength(2);
        particleSystem.spawnParticle(optionsCopy);
    }
}

function createNameLabel(text, textSize, x, y, z, size) {

    var loader = new THREE.FontLoader();
    loader.load('fonts/helvetiker_regular.typeface.json', function (font) {

        var textGeometry = new THREE.TextGeometry(text, {
            font: font,
            size: textSize,
            height: 5,
            curveSegments: 12,
            bevelThickness: .4,
            bevelSize: .4,
            bevelEnabled: true
        });

        var textMaterial = new THREE.MeshPhongMaterial(
            {color: 0xdddddd, specular: 0xffffff}
        );

        var textMesh = new THREE.Mesh(textGeometry, textMaterial);
        // move it to the right, plus a buffer
        textMesh.position.set(x + size + 5, y - size + 5, z);

        scene.add(textMesh);
    });
}

function init() {
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
}

$.getScript('appd_api.js');
$.getScript('tiers.js');
$.getScript('backends.js');
$.getScript('connectObjects.js');

render();

