var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 150;
camera.lookAt(0, 0, 0);

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

// create a few nodes
// var tier1 = createTier("Node1", -50, 30, 0, 20);
// tier1.material.color.setHex(0xff0000);
// var tier2 = createTier("Node2", -10, 0, 0, 20);
// tier2.material.color.setHex(0x00ff00);
// var tier3 = createTier("Node3", -10, -30, 0, 20);
// tier3.material.color.setHex(0xffd633);
function drawTier(tier, x, y, z) {
    var tierObject = createTier(tier.name, x, y, z, 20);
    tierObject.material.color.setHex(0xff0000);
}

function drawTiers() {
    loadTiers(function (tiers) {
        var x = 0;
        for (var tierId in tiers) {
            if (tiers.hasOwnProperty(tierId)) {
                var tier = tiers[tierId];
                console.log("tier: " + JSON.stringify(tier));
                drawTier(tier, -100 + (x*50), x*10, x*-50);
                x++;
            }
        }
    })
}
drawTiers();

// flow data between them
// var particleData = createDataflow(tier1, tier2, 300);

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
    var element = document.body;

    var pointerlockchange = function (event) {
        if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
            controlsEnabled = true;
            controls.enabled = true;

            blocker.style.display = 'none';
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

var canJump = false;
var moveLeft = false;
var moveRight = false;
var moveForward = false;
var moveBackward = false;
var controlsEnabled = false;
var prevTime = performance.now();
var velocity = new THREE.Vector3();

function render() {
    // var delta = clock.getDelta();
    // camControls.update(delta);
    //updateParticles(particleData);
    init();
    animate();
}

function updateParticles(pData) {
    var pGeometry = pData[0];
    var pSystem = pData[1];

    // add some rotation to the system
    pSystem.rotation.y += 0.01;

    var pCount = pGeometry.vertices.length;
    while (pCount--) {

        // get the particle
        var particle = pGeometry.vertices[pCount];

        // check if we need to reset
        if (particle.position.y < -200) {
            particle.position.y = 200;
            particle.velocity.y = 0;
        }

        // update the velocity with
        // a splat of randomniz
        particle.velocity.y -= Math.random() * .1;

        // and the position
        particle.position.addSelf(
            particle.velocity);
    }

    // flag to the particle system
    // that we've changed its vertices.
    pSystem.geometry.__dirtyVertices = true;
}

function createTier(name, x, y, z, size) {
    var radius = size/2;
    var geometry = new THREE.SphereGeometry(radius, 10, 10);
    var material = new THREE.MeshLambertMaterial();
    var sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(x, y, z);
    scene.add(sphere);

    // give it a floating label
    createNameLabel(name, 6, x, y, z, size/2);

    return sphere;
}

function createDataflow(fromObject, toObject, callsPerMin) {
    var material = new THREE.LineBasicMaterial({
        color: 0xd9d9d9
    });

    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        fromObject.getWorldPosition(),
        toObject.getWorldPosition()
    );

    var line = new THREE.Line(geometry, material);
    scene.add(line);

    // create the particle variables
    var particleGeometry = new THREE.Geometry();
    // create the particle variables
    var pMaterial = new THREE.ParticleBasicMaterial({
        color: 0xFFFFFF,
        size: 3,
        map: THREE.ImageUtils.loadTexture(
            "images/particle.png"
        ),
        blending: THREE.AdditiveBlending,
        transparent: true
    });

    // now create the individual particleGeometry
    for (var p = 0; p < callsPerMin; p++) {

        // create a particle with random
        // position values, -250 -> 250
        var pX = Math.random() * 50 - 25,
            pY = Math.random() * 50 - 25,
            pZ = 0,
            particle = new THREE.Vector3(pX, pY, pZ);

        // add it to the geometry
        particleGeometry.vertices.push(particle);
    }

    // create the particle system
    var particleSystem = new THREE.Points(
        particleGeometry,
        pMaterial);
    particleSystem.softParticles = true;

    // add it to the scene
    scene.add(particleSystem);

    return [particleGeometry, particleSystem];
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

            case 32: // space
                if (canJump === true) velocity.y += 350;
                canJump = false;
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

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        if (moveForward) velocity.z -= 400.0 * delta;
        if (moveBackward) velocity.z += 400.0 * delta;

        if (moveLeft) velocity.x -= 400.0 * delta;
        if (moveRight) velocity.x += 400.0 * delta;

        if (isOnObject === true) {
            velocity.y = Math.max(0, velocity.y);

            canJump = true;
        }

        controls.getObject().translateX(velocity.x * delta);
        controls.getObject().translateY(velocity.y * delta);
        controls.getObject().translateZ(velocity.z * delta);

        if (controls.getObject().position.y < 10) {
            velocity.y = 0;
            controls.getObject().position.y = 10;

            canJump = true;
        }

        prevTime = time;
    }

    renderer.render(scene, camera);
}

render();

