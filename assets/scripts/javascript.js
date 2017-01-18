$(document).ready(function() {
	console.log("Ready!");

	// $("#search-form").ajaxForm({url: '/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=Albert+Einstein', type: 'post'})
	var apiURL = "http://en.wikipedia.org/w/api.php?action=query&format=json&prop=info%7Cextracts&generator=search&exsentences=1&exlimit=10&exintro=1&explaintext=1&exsectionformat=plain&gsrsearch=";
	var searchURL = "";
	var json;


	function createSearchResults(searchQuery) {
		var keys = [];

		for (var key in searchQuery) {
			keys.push(key);
		}
		
		for (var i = 0; i < keys.length; i++) {
			
			var title = searchQuery[keys[i]].title;
			console.log(title);
			var pageId = searchQuery[keys[i]].pageid;
			console.log(pageId);
			var extract = searchQuery[keys[i]].extract;
			console.log(extract);

			$("#search-results").append('<div class="row list-group-item"><div class="col-xs-12">' + '<h4 class="list-group-item-heading">' + title + '</h4>' + '<p class="list-group-item-text">' + extract + '</p>' + '</div></div>');

		};



	};

	
	$("#submit-btn").click(function() {
		searchURL = $("#search-input").val().replace(/\s/, "+");
		console.log(searchURL);
		
		$.ajax({
		  type: "GET",
		  url: apiURL + searchURL,
		  dataType: 'jsonp',
		  success: function(data) {
		    json = data.query.pages;
		    console.log(data.query);
		    createSearchResults(json);
		  }
		});



	});

	$("#search-form").submit(function(e) {
    e.preventDefault();
	});



});