// flow data between them
function createDataflow(fromObject, toObject) {
    console.log(fromObject);
    console.log(toObject);
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

    // make particle system
    var pos2 = toObject.getWorldPosition();
    var pos1 = fromObject.getWorldPosition();

    var flowDirection = new THREE.Vector3(pos2.x - pos1.x, pos2.y - pos1.y, pos2.z - pos1.z);
    var distance = flowDirection.length() / 10;
    flowDirection.normalize();
    flowDirection.multiplyScalar(2);

    var options = {
        position: pos1,
        positionRandomness: .3,
        velocity: flowDirection,
        velocityRandomness: 0,
        //color: 0xaa88ff,
        color: 0xffffb3,
        colorRandomness: .2,
        turbulence: .3,
        lifetime: distance,
        size: 4,
        sizeRandomness: 1
    };

    return options;
}
