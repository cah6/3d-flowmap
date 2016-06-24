var tierObjects = [];
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

function drawTier(tier, x, y, z) {
    var tierObject = createTier(tier.name, x, y, z, 20);
    tierObject.material.color.setHex(0xff0000);
    tierObjects.push(tierObject);
}

function drawTiers(resolve, reject) {
    loadTiers(function (tiers) {
        var x = 0;
        for (var tierId in tiers) {
            if (tiers.hasOwnProperty(tierId)) {
                var tier = tiers[tierId];
                drawTier(tier, -100 + (x*50), x*10, x*-50);
                x++;
            }
        }
        resolve();
    }, function (response) {
        reject(Error("Loading tiers failed with response: " + JSON.stringify(response)));
    })
}

var tierPromise = new Promise(function(resolve, reject) {
    drawTiers(resolve, reject);
});

tierPromise.then(function(results) {
    console.log("Tiers loaded");
},
function(err) {
    console.log("Failed to load tiers: " + JSON.stringify(err));
});
