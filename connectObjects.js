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

tierPromise.then(function(tierObjects) {
        particleOptions.push(createDataflow(tierObjects[0].getWorldPosition(), tierObjects[1].getWorldPosition()));
        particleOptions.push(createDataflow(tierObjects[3].getWorldPosition(), tierObjects[2].getWorldPosition()));
    },
    function(err) {
        console.log("Failed promise: " + JSON.stringify(err));
    });
