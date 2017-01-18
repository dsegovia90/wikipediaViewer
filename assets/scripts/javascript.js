$(document).ready(function() {
	console.log("Ready!");

	var apiURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info%7Cextracts&generator=search&exsentences=1&exlimit=10&exintro=1&explaintext=1&exsectionformat=plain&gsrsearch=";
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

			$("#search-results").append('<a href="https://en.wikipedia.org/?curid=' + pageId + '" class="list-group-item" target="_blank">' + '<h4 class="list-group-item-heading">' + title + '</h4>' + '<p class="list-group-item-text">' + extract + '</p>' + '</a>');
			$("#search-results").addClass('fadeInLeft');
			$('#search-results').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {

			$("#search-results").removeClass('fadeInLeft');

			});

		};



	};

	
	$("#submit-btn").click(function() {
		searchURL = $("#search-input").val().replace(/\s/, "+");
		

		$("#search-results").addClass('animated fadeOutRight');

		$('#search-results').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {

			$("#search-results").removeClass('fadeOutRight');
			$("#search-results").html("");

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




	});

	$("#search-form").submit(function(e) {
    e.preventDefault();
	});








});