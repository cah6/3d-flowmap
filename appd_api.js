var DEFAULT_APP = "ECommerce-E2E";

function appdApplicationApiCall(endPoint, onSuccess, onFailure, applicationName = DEFAULT_APP) {
	appdBaseApiCall(applicationName + "/" + endPoint, onSuccess, onFailure);
}

function appdBaseApiCall(endPoint, onSuccess, onFailure) {
	var url = "http://127.0.0.1:3000/controller/rest/applications";
	if (endPoint) {
		url += "/" + endPoint;
	}
	if (url.indexOf("?") >= 0) {
		url += "&output=json"
	} else {
		url += "?output=json"
	}

	$.ajax
	  ({
		type: "GET",
		url: url,
		success: function (response) {
			console.log("response: " + JSON.stringify(response));
			onSuccess(response);
		},
		failure: function (response) {
			console.log("Failed to load controller request: " + JSON.stringify(response));
			if (onFailure != null) {
				onFailure(response);
			}
		}
	});
}

function loadApplications(onSuccess, onFailure) {
	appdBaseApiCall(null, onSuccess, onFailure)
}

function loadBizTxn(onSuccess, onFailure, applicationName = DEFAULT_APP) {
	appdApplicationApiCall("business-transactions", onSuccess, onFailure, applicationName)
}

function loadTiers(onSuccess, onFailure, applicationName = DEFAULT_APP) {
	appdApplicationApiCall("tiers", onSuccess, onFailure, applicationName)
}

function loadBackends(onSuccess, onFailure, applicationName = DEFAULT_APP) {
	appdApplicationApiCall("backends", onSuccess, onFailure, applicationName)
}

function loadNodes(onSuccess, onFailure, applicationName = DEFAULT_APP) {
	appdApplicationApiCall("nodes", onSuccess, onFailure, applicationName)
}

function loadNodeInfo(nodeName, onSuccess, onFailure, applicationName = DEFAULT_APP) {
	appdApplicationApiCall("nodes/" + nodeName, onSuccess, onFailure, applicationName)
}

function loadNodesInTier(tierName, onSuccess, onFailure, applicationName = DEFAULT_APP) {
	appdApplicationApiCall("tiers/" + tierName + "/nodes", onSuccess, onFailure, applicationName)
}

function loadTierInfo(tierName, onSuccess, onFailure, applicationName = DEFAULT_APP) {
	appdApplicationApiCall("tiers/" + tierName, onSuccess, onFailure, applicationName)
}

function loadMetricHierarchy(onSuccess, onFailure, applicationName = DEFAULT_APP) {
	appdApplicationApiCall("metrics", onSuccess, onFailure, applicationName)
}

/*
http://ec2-54-213-152-245.us-west-2.compute.amazonaws.com:8090
/controller/rest/applications/ECommerce-E2E/metric-data?
metric-path=Overall%20Application%20Performance%7CECommerce-Services%7CIndividual%20Nodes%7CECommerce-E2E_WEB1%7CCalls%20per%20Minute &
time-range-type=BEFORE_NOW &
duration-in-mins=240

See: https://docs.appdynamics.com/display/PRO42/Metric+and+Snapshot+API#MetricandSnapshotAPI-usingtimeranges
*/
function loadMetricData(metricPath, timeRangeType, durationInMins, startTime, endTime, onSuccess, onFailure, applicationName = DEFAULT_APP) {
	var metricDataParams = metricPath + "&" + timeRangeType;
	if (durationInMins != null) {
		metricDataParams +=  "&" + durationInMins
	}
	if (startTime != null) {
		metricDataParams +=  "&" + startTime
	}
	if (endTime != null) {
		metricDataParams +=  "&" + endTime
	}
	appdApplicationApiCall("metric-data?" + encodeURI(metricDataParams), onSuccess, onFailure, applicationName)
}


