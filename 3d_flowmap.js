var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 150;
camera.lookAt(0, 0, 0);

var particleOptions = [];

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// add light behind camera
var light1 = new THREE.PointLight(0xffffff);
light1.position.set(0, 0, 1000);
scene.add(light1);

// and way in front
var light2 = new THREE.PointLight(0xffffff);
light2.position.set(0, 0, -1000);
scene.add(light2);

var clock = new THREE.Clock();

// make particle system that will handle them all
var tick = 0;
var particleSystem = new THREE.GPUParticleSystem({
    maxParticles: 250000
});
scene.add(particleSystem);

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

var controls;

var objects = [];

var raycaster;

var blocker = document.getElementById('blocker');
var instructions = document.getElementById('instructions');

var havePointerLock = 'pointerLockElement' in document || 'webkitPointerLockElement' in document;

if (havePointerLock) {
    console.log("Obtained pointer lock");
    var element = document.body;

    var pointerlockchange = function (event) {
        console.log("pointerlockchange");
        if (document.pointerLockElement === element || document.webkitPointerLockElement === element) {
            controlsEnabled = true;
            controls.enabled = true;

            blocker.style.display = 'none';

            console.log("Enabled pointer controls");
        } else {
            controls.enabled = false;

            blocker.style.display = '-webkit-box';
            blocker.style.display = '-moz-box';
            blocker.style.display = 'box';

            instructions.style.display = '';
        }
    };

    var pointerlockerror = function (event) {
        instructions.style.display = '';
    };

    // Hook pointer lock state change events
    document.addEventListener('pointerlockchange', pointerlockchange, false);
    document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

    document.addEventListener('pointerlockerror', pointerlockerror, false);
    document.addEventListener('webkitpointerlockerror', pointerlockerror, false);

    instructions.addEventListener('click', function (event) {
        instructions.style.display = 'none';

        // Ask the browser to lock the pointer
        element.requestPointerLock = element.requestPointerLock || element.webkitRequestPointerLock;

        element.requestPointerLock();
    }, false);
} else {
    instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
}

var moveLeft = false;
var moveRight = false;
var moveForward = false;
var moveBackward = false;
var controlsEnabled = false;
var prevTime = performance.now();
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
    controls = new THREE.PointerLockControls(camera);
    scene.add(controls.getObject());

    var onKeyDown = function (event) {
        switch (event.keyCode) {
            case 38: // up
            case 87: // w
                moveForward = true;
                break;

            case 37: // left
            case 65: // a
                moveLeft = true;
                break;

            case 40: // down
            case 83: // s
                moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                moveRight = true;
                break;
        }
    };

    var onKeyUp = function (event) {
        switch (event.keyCode) {
            case 38: // up
            case 87: // w
                moveForward = false;
                break;

            case 37: // left
            case 65: // a
                moveLeft = false;
                break;

            case 40: // down
            case 83: // s
                moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                moveRight = false;
                break;
        }
    };

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);

    raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(render);
    if (controlsEnabled) {
        raycaster.ray.origin.copy(controls.getObject().position);
        raycaster.ray.origin.y -= 10;

        var intersections = raycaster.intersectObjects(objects);

        var isOnObject = intersections.length > 0;

        var time = performance.now();
        var delta = ( time - prevTime ) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= velocity.y * 10.0 * delta;

        if (moveForward) velocity.z -= 400.0 * delta;
        if (moveBackward) velocity.z += 400.0 * delta;

        if (moveLeft) velocity.x -= 400.0 * delta;
        if (moveRight) velocity.x += 400.0 * delta;

        if (isOnObject === true) {
            velocity.y = Math.max(0, velocity.y);
        }

        controls.getObject().translateX(velocity.x * delta);
        controls.getObject().translateY(velocity.y * delta);
        controls.getObject().translateZ(velocity.z * delta);

        if (controls.getObject().position.y < 10) {
            velocity.y = 0;
            controls.getObject().position.y = 10;
        }

        prevTime = time;
    }

    renderer.render(scene, camera);
}

function createDataflow(fromPos, toPos) {
    var material = new THREE.LineBasicMaterial({
        color: 0xd9d9d9
    });

    var geometry = new THREE.Geometry();
    geometry.vertices.push(fromPos, toPos);

    var line = new THREE.Line(geometry, material);
    // uncomment for debugging
    // scene.add(line);

    // make particle system
    var flowDirection = new THREE.Vector3(toPos.x - fromPos.x, toPos.y - fromPos.y, toPos.z - fromPos.z);
    console.log(flowDirection);
    var distance = flowDirection.length();
    flowDirection.normalize();

    var options = {
        position: fromPos,
        positionRandomness: 2,
        velocity: flowDirection,    // also direction of line between nodes
        velocityRandomness: 0.05,
        color: 0xaa88ff,
        //color: 0xffffb3,
        colorRandomness: 0.2,
        turbulence: 0.2,
        lifetime: distance,         // also the length of line between nodes
        size: 7,
        sizeRandomness: 2
    };

    return options;
}

$.getScript('connectObjects.js');
$.getScript('tiers.js');
$.getScript('backends.js');

render();

