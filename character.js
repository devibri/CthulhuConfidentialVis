dragula([document.querySelector('#character-list'), document.querySelector('#problems-list'), document.querySelector('#edges-list')]);


window.onload = function () {
	//localStorage.clear();
	$('#character-list').empty();
	loadProblems();
	loadEdges();
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
	var problemsList = document.getElementById("problems-list");
	var characterList = document.getElementById("character-list");
  	// clear the current thing in the div
	$('#problems-list').empty();
	// iterate through the JSON list of problems and display them
	for (var i = 0; i < results.length; i++) {
		var html = generateString(results[i], "problem-card");
		//if the character has this problem, add it to the character list
		if (results[i].obtained == false) {
			problemsList.insertAdjacentHTML( 'beforeend', html);
		} else { 
			characterList.insertAdjacentHTML( 'beforeend', html);
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
	var edgesList = document.getElementById("edges-list");
	var characterList = document.getElementById("character-list");
  	// clear the current thing in the div
	$('#edges-list').empty();
	// iterate through the JSON list of problems and display them
	for (var i = 0; i < results.length; i++) {
		var html = generateString(results[i], "edge-card");
		if (results[i].obtained == false) {
			edgesList.insertAdjacentHTML( 'beforeend', html);
		} else {
			characterList.insertAdjacentHTML( 'beforeend', html);
		}
	}
}

function generateString(result, classType) {
	var string = "<div class='" + classType + "'><h1>" + result.id + "  |  <strong>" + result.name + "</strong> " + result.type + "</h1><p>" + result.description + "</p></div>"
	return string;
}