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
        turbulence: 0.05,
        lifetime: distance,         // also the length of line between nodes
        size: 7,
        sizeRandomness: 2
    };

    return options;
}

var ConnectionMap = {
    "ECommerce-Services": [
        "APPDY-MySQL DB-DB-5.5.44-0ubuntu0.14.04.1",
        "Inventory-Services",
        "Active MQ-CustomerQueue",
        "Active MQ-OrderQueue",
        "Active MQ-fulfillmentQueue"
    ],
    "Inventory-Services": [
        "INVENTORY-MySQL DB-DB-5.5.44-0ubuntu0.14.04.1",
        "XE-Oracle DB-ORACLE-DB-Oracle Database 11g Express Edition Release 11.2.0.2.0 - 64bit Production"
    ],
    "Active MQ-CustomerQueue": [
        "Customer-Survey-Services"
    ],
    "Active MQ-OrderQueue": [
        "Order-Processing-Services"
    ],
    "Active MQ-fulfillmentQueue": [
        "Order-Processing-Services"
    ],
    "Order-Processing-Services": [
        "ECommerce-E2E-Fullfillment"
    ]
};

flowmapObjectsPromise.then(function(flowmapObjects) {
        function findObject(parent, flowmapObjects) {
            for (var i = 0; i < flowmapObjects.length; i++) {
                var obj = flowmapObjects[i];
                if (obj.hasOwnProperty("model")) {
                    if (obj.model.name === parent) {
                        return obj;
                    }
                }
            }
            return null;
        }

        for (var parent in ConnectionMap) {
            if (ConnectionMap.hasOwnProperty(parent)) {
                console.log("connecting and rendering: " + parent);
                var parentObj = findObject(parent, flowmapObjects);
                if (parentObj != null) {
                    console.log("found parent object: " + parentObj.model.name);
                    for (var childKey in ConnectionMap[parent]) {
                        if (ConnectionMap[parent].hasOwnProperty(childKey)) {
                            var child = ConnectionMap[parent][childKey];
                            console.log("connecting to: " + child);
                            var childObj = findObject(child, flowmapObjects);
                            if (childObj != null) {
                                childObj.render();
                                parentObj.render();
                                particleOptions.push(createDataflow(parentObj.getWorldPosition(), childObj.getWorldPosition()));
                            }
                        }
                    }
                }
            }
        }
    },
    function(err) {
        console.log("Failed promise: " + JSON.stringify(err));
    });
