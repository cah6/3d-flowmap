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
}

function drawBackends(resolve, reject) {
    loadBackends(function (backends) {
        var backendObjects = [];
        var x = 0;
        for (var backendId in backends) {
            if (backends.hasOwnProperty(backendId)) {
                var backend = backends[backendId];
                backendObjects.push(drawBackend(backend, -100 + (x*50), -100 + (x*10), x*-50));
                x++;
            }
        }
        resolve(backendObjects);
    }, function (response) {
        reject(Error("Loading tiers failed with response: " + JSON.stringify(response)));
    })
}

var backendsPromise = new Promise(function(resolve, reject) {
    drawBackends(resolve, reject);
});

backendsPromise.then(function(backendObjects) {
        console.log("Backends loaded - total backends: " + backendObjects.length);
    },
    function(err) {
        console.log("Failed to load backends: " + JSON.stringify(err));
    });
