$(function(){

	$.ajax
	  ({
	    type: "GET",
	    url: "http://127.0.0.1:3000/controller/rest/applications/ECommerce-E2E/nodes?output=json",
	    success: function (response) {
	    	console.log("response: " + JSON.stringify(response)); 
	    },
	    failure: function (response) {
	    	console.log("Failed to load controller request: " + JSON.stringify(response))
	    }
	});

});
