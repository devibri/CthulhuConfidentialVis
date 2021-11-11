dragula([document.querySelector('#list3'), document.querySelector('#list'), document.querySelector('#list2')]);


window.onload = function () {
	//localStorage.clear();
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
	var problemsList = document.getElementById("list");
  	// clear the current thing in the div
	$('#list').empty();
	// iterate through the JSON list of problems and display them
	for (var i = 0; i < results.length; i++) {
		if (results[i].obtained == false) {
			var html = generateString(results[i]);
			problemsList.insertAdjacentHTML( 'beforeend', html);
		}
	}
}

function loadEdges() {
	var url = "https://www.devi-a.com/CthulhuConfidentialVis/data/edges.json";
    // use AJAX to fetch the appropriate JSON data
    $.ajax({
      url: url,
      dataType: 'json',
      error: function(){
        console.log('JSON FAILED for data');
      },
      success:function(results){
        parseEdges(results);
      } 
    }) 
}

function parseEdges(results) {
	var edgesList = document.getElementById("list2");
  	// clear the current thing in the div
	$('#list2').empty();
	// iterate through the JSON list of problems and display them
	for (var i = 0; i < results.length; i++) {
		if (results[i].obtained == false) {
			var html = generateString(results[i]);
			edgesList.insertAdjacentHTML( 'beforeend', html);
		}
	}
}

function generateString(result) {
	var string = "<div class='card'><h1>" + result.id + " </h1><p>" + result.name + " " + result.type + "</p><p>" + result.description + "</p></div>"
	return string;
}