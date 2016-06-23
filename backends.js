var backendObjects = [];
function createBackend(name, x, y, z, size) {
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

function drawBackend(backend, x, y, z) {
    var backendObject = createBackend(backend.name, x, y, z, 20);
    backendObject.material.color.setHex(0xff0000);
    backendObjects.push(backendObject);
}

function drawBackends() {
    loadBackends(function (backends) {
        var x = 0;
        for (var backendId in backends) {
            if (backends.hasOwnProperty(backendId)) {
                var backend = backends[backendId];
                drawBackend(backend, -100 + (x*50), -100 + (x*10), x*-50);
                x++;
            }
        }
    })
}

drawBackends();