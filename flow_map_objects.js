function createNameLabel(text, textSize, x, y, z, size) {

    var loader = new THREE.FontLoader();
    loader.load('fonts/helvetiker_regular.typeface.json', function (font) {

        var textGeometry = new THREE.TextGeometry(text, {
            font: font,
            size: textSize,
            height: 2,
            curveSegments: 12,
            bevelThickness: .2,
            bevelSize: .2,
            bevelEnabled: true
        });

        var textMaterial = new THREE.MeshPhongMaterial(
            {
                color: "#2194ce",
                emissive: "#000000",
                specular: "#111111",
                shininess: 30,
                shading: "THREE.SmoothShading",
                fog: true
            }
        );

        var textMesh = new THREE.Mesh(textGeometry, textMaterial);
        // move it to the right, plus a buffer
        textMesh.position.set(x + size + 5, y - size + 5, z);

        scene.add(textMesh);
    });
}

function createNode(name, initialX, initialY, initialZ, initialSize) {
    var radius = initialSize/2;
    var geometry = new THREE.SphereGeometry(radius, 10, 10);
    var material = new THREE.MeshLambertMaterial();
    var sphere = new THREE.Mesh(geometry, material);

    sphere["render"] = function(x = initialX, y = initialY, z = initialZ, size = initialSize) {
        console.log("Rendering object [" + name + "] at [" + x + "," + y + "," + z + "]");
        sphere.position.set(x, y, z);
        scene.add(sphere);
        // give it a floating label
        createNameLabel(name, 6, x, y, z, size/2);
    };
    sphere["yOffset"] = initialY;

    return sphere;
}

function drawNode(model, x, y, z) {
    var nodeObject = createNode(model.name, x, y, z, 20);
    nodeObject.material.color.setHex(0xff0000);
    nodeObject["model"] = model;
    return nodeObject;
}

function onLoadModels(resolve, models, initialX, initialY, initialZ) {
    var renderedModels = [];
    for (var modelId in models) {
        if (models.hasOwnProperty(modelId)) {
            var model = models[modelId];
            renderedModels.push(drawNode(model, initialX, initialY, initialZ));
        }
    }
    resolve(renderedModels);
}

function drawTiers(resolve, reject) {
    loadTiers(function (tiers) {
        onLoadModels(resolve, tiers, 0, 0, 0);
    }, function (response) {
        reject(Error("Loading tiers failed with response: " + JSON.stringify(response)));
    })
}

var tiersPromise = new Promise(function(resolve, reject) {
    drawTiers(resolve, reject);
});

function drawApplications(resolve, reject) {
    loadApplications(function (applications) {
        onLoadModels(resolve, applications, 0, 100, 0);
    }, function (response) {
        reject(Error("Loading applications failed with response: " + JSON.stringify(response)));
    })
}

var applicationsPromise = new Promise(function(resolve, reject) {
    drawApplications(resolve, reject);
});

function drawBackends(resolve, reject) {
    loadBackends(function (backends) {
        onLoadModels(resolve, backends, 0, -100, 0);
    }, function (response) {
        reject(Error("Loading backends failed with response: " + JSON.stringify(response)));
    })
}

var backendsPromise = new Promise(function(resolve, reject) {
    drawBackends(resolve, reject);
});

function downloadMetricData(resolve, reject) {
    loadMetrics(function (metrics) {
        console.log("Loaded metrics: " + JSON.stringify(metrics));
        onLoadMetricData(resolve, metrics, 0, 0, 0);
    }, function (response) {
        reject(Error("Loading metrics failed with response: " + JSON.stringify(response)));
    })
}

var metricDataPromise = new Promise(function(resolve, reject) {
    downloadMetricData(resolve, reject);
});


var flowmapObjectsPromise = new Promise(function(resolve, reject) {
    var allObjects = [];
    var doApplications = function (resolve, reject) {
        applicationsPromise.then(function(applicationObjects) {
                console.log("In applications promise, applications loaded - total applications: " + applicationObjects.length);
                for (var i = 0; i < applicationObjects.length; i++) {
                    allObjects.push(applicationObjects[i]);
                }
                console.log("In applications promise (and now calling resolve), all objects: " + allObjects.length);
                resolve(allObjects);
            },
            function(err) {
                console.log("Failed to load applications: " + JSON.stringify(err));
                reject(err);
            });
    };

    var doBackends = function (resolve, reject) {
        backendsPromise.then(function(backendObjects) {
                console.log("In backends promise, backends loaded - total backends: " + backendObjects.length);
                for (var i = 0; i < backendObjects.length; i++) {
                    allObjects.push(backendObjects[i]);
                }
                console.log("In backends promise (and now calling resolve), all objects: " + allObjects.length);
                doApplications(resolve, reject);
            },
            function(err) {
                console.log("Failed to load backends: " + JSON.stringify(err));
                reject(err);
            });
    };

    tiersPromise.then(function(tierObjects) {
            console.log("In tiers promise, tiers loaded - total tiers: " + tierObjects.length);
            for (var i = 0; i < tierObjects.length; i++) {
                allObjects.push(tierObjects[i]);
            }
            console.log("In tiers promise, all objects: " + allObjects.length);
            doBackends(resolve, reject);
        },
        function(err) {
            console.log("Failed to load tiers: " + JSON.stringify(err));
            reject(err);
        });

    // metricDataPromise.then(function(metricObjects) {
    //         console.log("In metricData promise, metrics loaded - total metrics: " + metricObjects.length);
    //         for (var i = 0; i < metricObjects.length; i++) {
    //             allObjects.push(metricObjects[i]);
    //         }
    //         console.log("In metricData promise, all objects: " + allObjects.length);
    //         doBackends(resolve, reject);
    //     },
    //     function(err) {
    //         console.log("Failed to load metrics: " + JSON.stringify(err));
    //         reject(err);
    //     });
});

flowmapObjectsPromise.then(function(flowmapObjects) {
        console.log("All flowmap objects loaded: " + flowmapObjects.length);
        for (var i = 0; i < flowmapObjects.length; i++) {
            var obj = flowmapObjects[i];
            console.log("Flowmap object: " + obj.model.name);
        }
    },
    function(err) {
        console.log("Failed to load tiers: " + JSON.stringify(err));
    });

