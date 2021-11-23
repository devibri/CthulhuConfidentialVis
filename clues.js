function reset() {
  localStorage.clear();
  loadSceneGraph();
}

window.onload = function () {
  loadClues();
}

// serve up the appropriate scene by either pulling it from local storage or fetching from the appropriate URL
var loadClues = function() {
  // When pulling scene, first check to see if it is local storage. If not, pull from the .json file
  var allScenes = ["scene_dame", "scene_typewriter"];
  for (var i = 0; i < allScenes.length; i++) {
    if (localStorage.getItem(allScenes[i]) === null) {
      var url = "https://www.devi-a.com/CthulhuConfidentialVis/scenes/" + allScenes[i] + ".json";
      // use AJAX to fetch the appropriate JSON data
      $.ajax({
        url: url,
        dataType: 'json',
        error: function(){
          console.log('JSON FAILED for data');
        },
        success:function(results){
          parseClues(results);
        } 
      }) 
   } else {
    parseClues(JSON.parse(localStorage.getItem(allScenes[i])));
  }
 }
}

// takes the scene you're trying to load and renders it 
function parseClues(result) {
  var cluesInfo = document.getElementById("cluesInfo");
  cluesInfo.insertAdjacentHTML( 'beforeend', "<h1>" + result.title + " </h1>");

  cluesInfo.insertAdjacentHTML( 'beforeend',"<hr>");
  // print out list of text in the scene
  result.text.forEach(function(element) {
  if (element.clue !== undefined) {
    // print out each individual clue and format with checkbox
    // check if checkbox should be checked or not 
    if (element.clue[1].known == true) {
      cluesInfo.insertAdjacentHTML( 'beforeend', "<p class='hangingindent'><input type='checkbox' name='clue' checked>  " + element.clue[0] + "</p>");
    } else {
      cluesInfo.insertAdjacentHTML( 'beforeend', "<p class='hangingindent'><input type='checkbox' name='clue'> " + element.clue[0] + "</p>");
    }
  }
});
}


// When you click the checkbox for a clue, have this update the result in the JSON
$(document).on("click", "input[name='clue']", function () {
  var clue = this;
  //gets the title of the scene the clue is from
  console.log(clue.parentNode.parentNode.querySelector('h1').textContent);
  // var checked = $(this).prop('checked');
  // var clueText = this.nextSibling.data.trim();
  // // Go through each clue and find the one that matches the checkbox, then change the data for that clue to be known/unknown
  // sceneJSON.text.forEach(function(element) {
  //   if (element.clue !== undefined && clueText == element.clue[0]) {
  //     element.clue[1].known = checked;
  //   } 
  //   // if you click on a lead to another area, update the flowchart to indicate this
  //   if (element.clue !== undefined && clueText == element.clue[0] && element.clue[2] !== undefined) {
  //     if (checked) {
  //       var tag = currentSceneName + " --> " + element.clue[2].goes_to;
  //       graphJSON.graph.forEach(function(element, index) {
  //         if (element == tag) { // if checked, do a check to add that element, otherwise do a check to remove that element
  //           graphJSON.graph.splice(index, 1);
  //         } 
  //       }); 
  //       var newTag = currentSceneName + " ==> " + element.clue[2].goes_to;
  //       graphJSON.graph.push(newTag);
  //       // otherwise go through and remove the indication that the scene has been completed
  //     } 
  //     //save the current graph data then redisplay graph
  //     localStorage.setItem("graphData", JSON.stringify(graphJSON));
  //     loadGraph();
  //   }
  // }); 
  // // after this is done, should update the JSON file
  // localStorage.setItem(currentSceneName, JSON.stringify(sceneJSON));
});
