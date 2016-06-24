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
    "ECommerce-Services": {
        "connections": [
            {
                "name": "APPDY-MySQL DB-DB-5.5.44-0ubuntu0.14.04.1",
                "metrics": [
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JDBC%20to%20Discovered%20backend%20call%20-%20APPDY-MySQL%20DB-DB-5.5.44-0ubuntu0.14.04.1%7CAverage%20Response%20Time%20%28ms%29&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JDBC%20to%20Discovered%20backend%20call%20-%20APPDY-MySQL%20DB-DB-5.5.44-0ubuntu0.14.04.1%7CCalls%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JDBC%20to%20Discovered%20backend%20call%20-%20APPDY-MySQL%20DB-DB-5.5.44-0ubuntu0.14.04.1%7CErrors%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JDBC%20to%20Discovered%20backend%20call%20-%20APPDY-MySQL%20DB-DB-5.5.44-0ubuntu0.14.04.1%7CNumber%20of%20bytes%20read%20from%20Socket&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JDBC%20to%20Discovered%20backend%20call%20-%20APPDY-MySQL%20DB-DB-5.5.44-0ubuntu0.14.04.1%7CNumber%20of%20bytes%20written%20to%20Socket&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JDBC%20to%20Discovered%20backend%20call%20-%20APPDY-MySQL%20DB-DB-5.5.44-0ubuntu0.14.04.1%7CSocket%20Read%20Time&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JDBC%20to%20Discovered%20backend%20call%20-%20APPDY-MySQL%20DB-DB-5.5.44-0ubuntu0.14.04.1%7CSocket%20Reads&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JDBC%20to%20Discovered%20backend%20call%20-%20APPDY-MySQL%20DB-DB-5.5.44-0ubuntu0.14.04.1%7CSocket%20Write%20Time&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JDBC%20to%20Discovered%20backend%20call%20-%20APPDY-MySQL%20DB-DB-5.5.44-0ubuntu0.14.04.1%7CSocket%20Writes&time-range-type=BEFORE_NOW&duration-in-mins=15"
                ]
            },
            {
                "name": "Inventory-Services",
                "metrics": [
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-HTTP%20to%20Inventory-Services%7CAverage%20Response%20Time%20%28ms%29&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-HTTP%20to%20Inventory-Services%7CCalls%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-HTTP%20to%20Inventory-Services%7CErrors%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-HTTP%20to%20Inventory-Services%7CNumber%20of%20bytes%20read%20from%20Socket&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-HTTP%20to%20Inventory-Services%7CNumber%20of%20bytes%20written%20to%20Socket&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-HTTP%20to%20Inventory-Services%7CSocket%20Read%20Time&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-HTTP%20to%20Inventory-Services%7CSocket%20Reads&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-HTTP%20to%20Inventory-Services%7CSocket%20Write%20Time&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-HTTP%20to%20Inventory-Services%7CSocket%20Writes&time-range-type=BEFORE_NOW&duration-in-mins=15"
                ]
            },
            {
                "name": "Active MQ-CustomerQueue",
                "metrics": [
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JMS%20to%20Discovered%20backend%20call%20-%20Active%20MQ-CustomerQueue%7CAverage%20Response%20Time%20%28ms%29&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JMS%20to%20Discovered%20backend%20call%20-%20Active%20MQ-CustomerQueue%7CCalls%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JMS%20to%20Discovered%20backend%20call%20-%20Active%20MQ-CustomerQueue%7CErrors%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JMS%20to%20Discovered%20backend%20call%20-%20Active%20MQ-CustomerQueue%7CNumber%20of%20bytes%20read%20from%20Socket&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JMS%20to%20Discovered%20backend%20call%20-%20Active%20MQ-CustomerQueue%7CNumber%20of%20bytes%20written%20to%20Socket&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JMS%20to%20Discovered%20backend%20call%20-%20Active%20MQ-CustomerQueue%7CSocket%20Read%20Time&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JMS%20to%20Discovered%20backend%20call%20-%20Active%20MQ-CustomerQueue%7CSocket%20Reads&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JMS%20to%20Discovered%20backend%20call%20-%20Active%20MQ-CustomerQueue%7CSocket%20Write%20Time&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JMS%20to%20Discovered%20backend%20call%20-%20Active%20MQ-CustomerQueue%7CSocket%20Writes&time-range-type=BEFORE_NOW&duration-in-mins=15"
                ]
            },
            {
                "name": "Active MQ-OrderQueue",
                "metrics": [
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JMS%20to%20Discovered%20backend%20call%20-%20Active%20MQ-OrderQueue%7CAverage%20Response%20Time%20%28ms%29&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JMS%20to%20Discovered%20backend%20call%20-%20Active%20MQ-OrderQueue%7CCalls%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JMS%20to%20Discovered%20backend%20call%20-%20Active%20MQ-OrderQueue%7CErrors%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JMS%20to%20Discovered%20backend%20call%20-%20Active%20MQ-OrderQueue%7CNumber%20of%20bytes%20read%20from%20Socket&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JMS%20to%20Discovered%20backend%20call%20-%20Active%20MQ-OrderQueue%7CNumber%20of%20bytes%20written%20to%20Socket&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JMS%20to%20Discovered%20backend%20call%20-%20Active%20MQ-OrderQueue%7CSocket%20Read%20Time&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JMS%20to%20Discovered%20backend%20call%20-%20Active%20MQ-OrderQueue%7CSocket%20Reads&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JMS%20to%20Discovered%20backend%20call%20-%20Active%20MQ-OrderQueue%7CSocket%20Write%20Time&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JMS%20to%20Discovered%20backend%20call%20-%20Active%20MQ-OrderQueue%7CSocket%20Writes&time-range-type=BEFORE_NOW&duration-in-mins=15"
                ]
            },
            {
                "name": "Active MQ-fulfillmentQueue",
                "metrics": [
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JMS%20to%20Discovered%20backend%20call%20-%20Active%20MQ-fulfillmentQueue%7CAverage%20Response%20Time%20%28ms%29&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JMS%20to%20Discovered%20backend%20call%20-%20Active%20MQ-fulfillmentQueue%7CCalls%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JMS%20to%20Discovered%20backend%20call%20-%20Active%20MQ-fulfillmentQueue%7CErrors%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JMS%20to%20Discovered%20backend%20call%20-%20Active%20MQ-fulfillmentQueue%7CNumber%20of%20bytes%20read%20from%20Socket&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JMS%20to%20Discovered%20backend%20call%20-%20Active%20MQ-fulfillmentQueue%7CNumber%20of%20bytes%20written%20to%20Socket&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JMS%20to%20Discovered%20backend%20call%20-%20Active%20MQ-fulfillmentQueue%7CSocket%20Read%20Time&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JMS%20to%20Discovered%20backend%20call%20-%20Active%20MQ-fulfillmentQueue%7CSocket%20Reads&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JMS%20to%20Discovered%20backend%20call%20-%20Active%20MQ-fulfillmentQueue%7CSocket%20Write%20Time&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExternal%20Calls%7CCall-JMS%20to%20Discovered%20backend%20call%20-%20Active%20MQ-fulfillmentQueue%7CSocket%20Writes&time-range-type=BEFORE_NOW&duration-in-mins=15"
                ]
            }
        ],
        "metrics": [
            "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CAverage%20Response%20Time%20%28ms%29&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CCalls%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CError%20Page%20Redirects%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CErrors%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CExceptions%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CHTTP%20Error%20Codes%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CInfrastructure%20Errors%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CNumber%20of%20bytes%20read%20from%20Socket&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CNumber%20of%20bytes%20written%20to%20Socket&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CNumber%20of%20Slow%20Calls&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CNumber%20of%20Very%20Slow%20Calls&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CSocket%20Read%20Time&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CSocket%20Reads&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CSocket%20Write%20Time&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CSocket%20Writes&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CStall%20Count&time-range-type=BEFORE_NOW&duration-in-mins=15"
        ]
    },
    "Inventory-Services": {
        "connections": [
            {
                "name": "INVENTORY-MySQL DB-DB-5.5.44-0ubuntu0.14.04.1",
                "metrics": [
                    "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CExternal%20Calls%7CCall-JDBC%20to%20Discovered%20backend%20call%20-%20INVENTORY-MySQL%20DB-DB-5.5.44-0ubuntu0.14.04.1%7CAverage%20Response%20Time%20%28ms%29&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CExternal%20Calls%7CCall-JDBC%20to%20Discovered%20backend%20call%20-%20INVENTORY-MySQL%20DB-DB-5.5.44-0ubuntu0.14.04.1%7CCalls%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CExternal%20Calls%7CCall-JDBC%20to%20Discovered%20backend%20call%20-%20INVENTORY-MySQL%20DB-DB-5.5.44-0ubuntu0.14.04.1%7CErrors%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CExternal%20Calls%7CCall-JDBC%20to%20Discovered%20backend%20call%20-%20INVENTORY-MySQL%20DB-DB-5.5.44-0ubuntu0.14.04.1%7CNumber%20of%20bytes%20read%20from%20Socket&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CExternal%20Calls%7CCall-JDBC%20to%20Discovered%20backend%20call%20-%20INVENTORY-MySQL%20DB-DB-5.5.44-0ubuntu0.14.04.1%7CNumber%20of%20bytes%20written%20to%20Socket&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CExternal%20Calls%7CCall-JDBC%20to%20Discovered%20backend%20call%20-%20INVENTORY-MySQL%20DB-DB-5.5.44-0ubuntu0.14.04.1%7CSocket%20Read%20Time&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CExternal%20Calls%7CCall-JDBC%20to%20Discovered%20backend%20call%20-%20INVENTORY-MySQL%20DB-DB-5.5.44-0ubuntu0.14.04.1%7CSocket%20Reads&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CExternal%20Calls%7CCall-JDBC%20to%20Discovered%20backend%20call%20-%20INVENTORY-MySQL%20DB-DB-5.5.44-0ubuntu0.14.04.1%7CSocket%20Write%20Time&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CExternal%20Calls%7CCall-JDBC%20to%20Discovered%20backend%20call%20-%20INVENTORY-MySQL%20DB-DB-5.5.44-0ubuntu0.14.04.1%7CSocket%20Writes&time-range-type=BEFORE_NOW&duration-in-mins=15"
                ]

            },
            {
                "name": "XE-Oracle DB-ORACLE-DB-Oracle Database 11g Express Edition Release 11.2.0.2.0 - 64bit Production",
                "metrics": [
                    "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CExternal%20Calls%7CCall-JDBC%20to%20Discovered%20backend%20call%20-%20XE-Oracle%20DB-ORACLE-DB-Oracle%20Database%2011g%20Express%20Edition%20Release%2011.2.0.2.0%20-%2064bit%20Production%7CAverage%20Response%20Time%20%28ms%29&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CExternal%20Calls%7CCall-JDBC%20to%20Discovered%20backend%20call%20-%20XE-Oracle%20DB-ORACLE-DB-Oracle%20Database%2011g%20Express%20Edition%20Release%2011.2.0.2.0%20-%2064bit%20Production%7CCalls%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CExternal%20Calls%7CCall-JDBC%20to%20Discovered%20backend%20call%20-%20XE-Oracle%20DB-ORACLE-DB-Oracle%20Database%2011g%20Express%20Edition%20Release%2011.2.0.2.0%20-%2064bit%20Production%7CErrors%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CExternal%20Calls%7CCall-JDBC%20to%20Discovered%20backend%20call%20-%20XE-Oracle%20DB-ORACLE-DB-Oracle%20Database%2011g%20Express%20Edition%20Release%2011.2.0.2.0%20-%2064bit%20Production%7CNumber%20of%20bytes%20read%20from%20Socket&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CExternal%20Calls%7CCall-JDBC%20to%20Discovered%20backend%20call%20-%20XE-Oracle%20DB-ORACLE-DB-Oracle%20Database%2011g%20Express%20Edition%20Release%2011.2.0.2.0%20-%2064bit%20Production%7CNumber%20of%20bytes%20written%20to%20Socket&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CExternal%20Calls%7CCall-JDBC%20to%20Discovered%20backend%20call%20-%20XE-Oracle%20DB-ORACLE-DB-Oracle%20Database%2011g%20Express%20Edition%20Release%2011.2.0.2.0%20-%2064bit%20Production%7CSocket%20Read%20Time&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CExternal%20Calls%7CCall-JDBC%20to%20Discovered%20backend%20call%20-%20XE-Oracle%20DB-ORACLE-DB-Oracle%20Database%2011g%20Express%20Edition%20Release%2011.2.0.2.0%20-%2064bit%20Production%7CSocket%20Reads&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CExternal%20Calls%7CCall-JDBC%20to%20Discovered%20backend%20call%20-%20XE-Oracle%20DB-ORACLE-DB-Oracle%20Database%2011g%20Express%20Edition%20Release%2011.2.0.2.0%20-%2064bit%20Production%7CSocket%20Write%20Time&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CExternal%20Calls%7CCall-JDBC%20to%20Discovered%20backend%20call%20-%20XE-Oracle%20DB-ORACLE-DB-Oracle%20Database%2011g%20Express%20Edition%20Release%2011.2.0.2.0%20-%2064bit%20Production%7CSocket%20Writes&time-range-type=BEFORE_NOW&duration-in-mins=15"
                ]
            }
        ],
        "metrics": [
            "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CAverage%20Response%20Time%20%28ms%29&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CCalls%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CError%20Page%20Redirects%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CErrors%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CExceptions%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CHTTP%20Error%20Codes%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CInfrastructure%20Errors%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CNumber%20of%20bytes%20read%20from%20Socket&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CNumber%20of%20bytes%20written%20to%20Socket&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CNumber%20of%20Slow%20Calls&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CNumber%20of%20Very%20Slow%20Calls&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CSocket%20Read%20Time&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CSocket%20Reads&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CSocket%20Write%20Time&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CSocket%20Writes&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7CInventory-Services%7CStall%20Count&time-range-type=BEFORE_NOW&duration-in-mins=15"
        ]
    },
    "Active MQ-CustomerQueue": {
        "connections": [
            {"name": "Customer-Survey-Services"}
        ],
        "metrics": [
            "metric-path=Service%20Endpoints%7CCustomer-Survey-Services%7CJMSMessageListener%3ACustomerQueue%7CAverage%20Response%20Time%20%28ms%29&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Service%20Endpoints%7CCustomer-Survey-Services%7CJMSMessageListener%3ACustomerQueue%7CCalls%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Service%20Endpoints%7CCustomer-Survey-Services%7CJMSMessageListener%3ACustomerQueue%7CErrors%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15"
        ]
    },
    "Active MQ-OrderQueue": {
        "connections": [
            {"name": "Order-Processing-Services"}
        ],
        "metrics": [
            "metric-path=Service%20Endpoints%7COrder-Processing-Services%7CMessageConsumer%3AOrderQueue%7CAverage%20Response%20Time%20%28ms%29&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Service%20Endpoints%7COrder-Processing-Services%7CMessageConsumer%3AOrderQueue%7CCalls%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Service%20Endpoints%7COrder-Processing-Services%7CMessageConsumer%3AOrderQueue%7CErrors%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15"
        ]
    },
    "Active MQ-fulfillmentQueue": {
        "connections": [{"name": "Order-Processing-Services"}
        ],
        "metrics": [
            "metric-path=Service%20Endpoints%7COrder-Processing-Services%7CFulfillmentConsumer%3AfulfillmentQueue%7CAverage%20Response%20Time%20%28ms%29&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Service%20Endpoints%7COrder-Processing-Services%7CFulfillmentConsumer%3AfulfillmentQueue%7CCalls%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Service%20Endpoints%7COrder-Processing-Services%7CFulfillmentConsumer%3AfulfillmentQueue%7CErrors%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15"
        ]
    },
    "Order-Processing-Services": {
        "connections": [
            {
                "name": "ECommerce-E2E-Fulfillment",
                "metrics": [
                    "metric-path=Overall%20Application%20Performance%7COrder-Processing-Services%7CExternal%20Calls%7CCall-HTTP%20to%20External%20Application%20-%20ECommerce-E2E-Fulfillment%7CAverage%20Response%20Time%20%28ms%29&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7COrder-Processing-Services%7CExternal%20Calls%7CCall-HTTP%20to%20External%20Application%20-%20ECommerce-E2E-Fulfillment%7CCalls%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7COrder-Processing-Services%7CExternal%20Calls%7CCall-HTTP%20to%20External%20Application%20-%20ECommerce-E2E-Fulfillment%7CErrors%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7COrder-Processing-Services%7CExternal%20Calls%7CCall-HTTP%20to%20External%20Application%20-%20ECommerce-E2E-Fulfillment%7CNumber%20of%20bytes%20read%20from%20Socket&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7COrder-Processing-Services%7CExternal%20Calls%7CCall-HTTP%20to%20External%20Application%20-%20ECommerce-E2E-Fulfillment%7CNumber%20of%20bytes%20written%20to%20Socket&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7COrder-Processing-Services%7CExternal%20Calls%7CCall-HTTP%20to%20External%20Application%20-%20ECommerce-E2E-Fulfillment%7CSocket%20Read%20Time&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7COrder-Processing-Services%7CExternal%20Calls%7CCall-HTTP%20to%20External%20Application%20-%20ECommerce-E2E-Fulfillment%7CSocket%20Reads&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7COrder-Processing-Services%7CExternal%20Calls%7CCall-HTTP%20to%20External%20Application%20-%20ECommerce-E2E-Fulfillment%7CSocket%20Write%20Time&time-range-type=BEFORE_NOW&duration-in-mins=15",
                    "metric-path=Overall%20Application%20Performance%7COrder-Processing-Services%7CExternal%20Calls%7CCall-HTTP%20to%20External%20Application%20-%20ECommerce-E2E-Fulfillment%7CSocket%20Writes&time-range-type=BEFORE_NOW&duration-in-mins=15"
                ]
            }
        ],
        "metrics": [
            "metric-path=Overall%20Application%20Performance%7COrder-Processing-Services%7CAverage%20Response%20Time%20%28ms%29&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7COrder-Processing-Services%7CCalls%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7COrder-Processing-Services%7CError%20Page%20Redirects%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7COrder-Processing-Services%7CErrors%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7COrder-Processing-Services%7CExceptions%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7COrder-Processing-Services%7CHTTP%20Error%20Codes%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7COrder-Processing-Services%7CInfrastructure%20Errors%20per%20Minute&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7COrder-Processing-Services%7CNumber%20of%20bytes%20read%20from%20Socket&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7COrder-Processing-Services%7CNumber%20of%20bytes%20written%20to%20Socket&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7COrder-Processing-Services%7CNumber%20of%20Slow%20Calls&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7COrder-Processing-Services%7CNumber%20of%20Very%20Slow%20Calls&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7COrder-Processing-Services%7CSocket%20Read%20Time&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7COrder-Processing-Services%7CSocket%20Reads&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7COrder-Processing-Services%7CSocket%20Write%20Time&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7COrder-Processing-Services%7CSocket%20Writes&time-range-type=BEFORE_NOW&duration-in-mins=15",
            "metric-path=Overall%20Application%20Performance%7COrder-Processing-Services%7CStall%20Count&time-range-type=BEFORE_NOW&duration-in-mins=15"
        ]
    }
};

flowmapObjectsPromise.then(function (flowmapObjects) {
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

        var rendered = [];
        var containsObject = function (obj, list) {
            var i;
            for (i = 0; i < list.length; i++) {
                if (list[i] === obj) {
                    return true;
                }
            }

            return false;
        };

        var p = 0;
        var c = 0;
        var x = -100;
        var y = 0;
        var z = -50;
        for (var parent in ConnectionMap) {
            if (ConnectionMap.hasOwnProperty(parent)) {
                x += 100;
                console.log("connecting and rendering: " + parent);
                var parentObj = findObject(parent, flowmapObjects);
                if (parentObj != null) {
                    console.log("found parent object: " + parentObj.model.name);
                    for (var childKey in ConnectionMap[parent].connections) {
                        if (ConnectionMap[parent].connections.hasOwnProperty(childKey)) {
                            var child = ConnectionMap[parent].connections[childKey];
                            console.log("connecting to: " + child.name);
                            var childObj = findObject(child.name, flowmapObjects);
                            if (childObj != null) {
                                if (!containsObject(childObj, rendered)) {
                                    childObj.render(x + (20 * c), (y + childObj.yOffset) + (20 * c), z - (50 * c));
                                    rendered.push(childObj);
                                    c++;
                                }
                                if (!containsObject(parentObj, rendered)) {
                                    parentObj.render(x + (20 * p), (y + parentObj.yOffset) + (20 * c), z - (50 * p));
                                    rendered.push(parentObj);
                                    p++;
                                }
                                particleOptions.push(createDataflow(parentObj.getWorldPosition(), childObj.getWorldPosition()));
                            }
                        }
                    }
                }
            }
        }
    },
    function (err) {
        console.log("Failed promise: " + JSON.stringify(err));
    });
