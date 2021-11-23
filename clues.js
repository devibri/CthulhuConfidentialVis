var cluesJSON; 
var currentSceneName;
var graphJSON;

// // on start / refresh, clear local vars and load the starting scene
// document.addEventListener("DOMContentLoaded", function() {

//localStorage.clear();
//   // loadScene("scene_dame");
//   loadGraph();
// });
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
  // //save the scene name to local storage
  // localStorage.setItem("scene", currentSceneName);
  // /* now go through the JSON and serve up the appropriate webpage based on that */
  // var sceneInfo = document.getElementById("sceneInfo");
  // // clear the current thing in the div
  // $('#sceneInfo').empty();
  // // print out the title scene and type
  // sceneInfo.insertAdjacentHTML( 'beforeend', "<h1>" + result.title + " </h1>");
  // if (result.visited) {
  //    sceneInfo.insertAdjacentHTML( 'beforeend', "Completed:  <input type='checkbox' name='visited' checked>");
  // } else {
  //   sceneInfo.insertAdjacentHTML( 'beforeend', "Completed:  <input type='checkbox' name='visited'>");
  // }
  // sceneInfo.insertAdjacentHTML( 'beforeend', "<p><em>Scene Type: " + result.scene_type + " </em></p>");
  // if (result.lead_ins != null) {
  //   sceneInfo.insertAdjacentHTML( 'beforeend', "Lead-Ins: ");
  //   result.lead_ins.forEach(function(element) {
  //     sceneInfo.insertAdjacentHTML( 'beforeend', element + "    ");
  //   });
  // }
  // sceneInfo.insertAdjacentHTML( 'beforeend',"<br>");
  // // print out and format a list of the lead outs
  // if (result.lead_outs != null) {
  //   sceneInfo.insertAdjacentHTML( 'beforeend', "Lead-Outs: ");
  //   result.lead_outs.forEach(function(element) {
  //     sceneInfo.insertAdjacentHTML( 'beforeend', element + "    ");
  //   });
  // }
 
  // sceneInfo.insertAdjacentHTML( 'beforeend',"<hr>");
  // // print out list of text in the scene
  // result.text.forEach(function(element) {
  // if (element.clue !== undefined) {
  //   // print out each individual clue and format with checkbox
  //   // check if checkbox should be checked or not 
  //   if (element.clue[1].known == true) {
  //     sceneInfo.insertAdjacentHTML( 'beforeend', "<p class='hangingindent'><input type='checkbox' name='clue' checked>  " + element.clue[0] + "</p>");
  //   } else {
  //     sceneInfo.insertAdjacentHTML( 'beforeend', "<p class='hangingindent'><input type='checkbox' name='clue'> " + element.clue[0] + "</p>");
  //   }
  // } else if (element.challenge !== undefined) {
  //   var challengeHTML = "<div class='challenge'>";
  //   challengeHTML = challengeHTML + "<p><strong> " + element.challenge[0] + "</strong> " + "(<em>" + element.challenge[1].type + "</em>)</p>";
  //   // challengeHTML = challengeHTML + "<p><em>" + element.challenge[1].type + "</em></p>";
  //   challengeHTML = challengeHTML + "<p class='hangingindent'>" + element.challenge[2].advance + "</p>";
  //   challengeHTML = challengeHTML + "<p class='hangingindent'>" + element.challenge[3].hold + "</p>";
  //   challengeHTML = challengeHTML + "<p class='hangingindent'>" + element.challenge[4].setback + "</p>";
  //   if (element.challenge[5] !== undefined) {
  //     challengeHTML = challengeHTML + "<p>" + element.challenge[5].extra_problem + "</p>";
  //   }
  //   challengeHTML = challengeHTML + "</div>";
  //   sceneInfo.insertAdjacentHTML( 'beforeend', challengeHTML);
  
  // } else {
  //   sceneInfo.insertAdjacentHTML( 'beforeend', "<p>" + element + " </p>");
  // }
  // }); 
