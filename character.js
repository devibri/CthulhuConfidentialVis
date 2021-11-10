dragula([document.querySelector('#list3'), document.querySelector('#list'), document.querySelector('#list2')]);


window.onload = function () {
	localStorage.clear();
  loadProblems();
}

function loadProblems() {
	var url = "https://www.devi-a.com/CthulhuConfidentialVis/data/problems.json";
    // use AJAX to fetch the appropriate JSON data
    $.ajax({
      url: url,
      dataType: 'json',
      error: function(){
        console.log('JSON FAILED for data');
      },
      success:function(results){
        parseProblems(results);
      } 
    }) 
}

function parseProblems(results) {
	var problemsList1 = document.getElementById("problems1");
	var problemsList2 = document.getElementById("problems2");
  	// clear the current thing in the div
	$('#problems1').empty();
	$('#problems2').empty();
	// iterate through the JSON list of problems and display them
	for (var i = 0; i < results.length; i++) {
		console.log(results[i])
		// if (results[i].obtained == false) {
			console.log(results[i].obtained);
			if (i % 2 == 0) {
				console.log(results[i].obtained);
				problemsList1.insertAdjacentHTML( 'beforeend', "<div class='card'><h1>" + results[i].id + " </h1><p>" + results[i].name + " (<em>" + results[i].type + "</em>)</p><p>" + results[i].description + results[i].obtained + "</p></div>");
			} else {
				problemsList2.insertAdjacentHTML( 'beforeend', "<div class='card'><h1>" + results[i].id + " </h1><p>" + results[i].name + " (<em>" + results[i].type + "</em>)</p><p>" + results[i].description + "</p></div>");
			}
		}
	// }
}