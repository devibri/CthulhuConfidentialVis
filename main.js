mermaid.initialize({
  startOnLoad: true,
  securityLevel: 'loose',
});

var sceneJSON; 
var currentSceneName;

// on start / refresh, clear local vars and load the starting scene
document.addEventListener("DOMContentLoaded", function() {
  localStorage.clear();
  loadScene("scene_dame");
  renderGraph();
});

// serve up the appropriate scene by either pulling it from local storage or fetching from the appropriate URL
var loadScene = function(scene_name) {
  console.log(scene_name);
  currentSceneName = scene_name.toLowerCase();
  // When pulling scene, first check to see if it is local storage. If not, pull from the .json file
  if (localStorage.getItem(currentSceneName) === null) {
    console.log("Couldn't find scene " + currentSceneName + " in local storage");
    var url = "https://www.devi-a.com/CthulhuConfidentialVis/scenes/" + currentSceneName + ".json";
    // use AJAX to fetch the appropriate JSON data
    $.ajax({
      url: url,
      dataType: 'json',
      error: function(){
        console.log('JSON FAILED for data');
      },
      success:function(results){
        sceneJSON = results; // record the results of the json query and save that to a variable
        parseScene(results);
      } 
    }) 
 } else {
  sceneJSON = JSON.parse(localStorage.getItem(currentSceneName));
  parseScene(sceneJSON);
}
}

// takes the scene you're trying to load and renders it 
function parseScene(result) {
  /* now go through the JSON and serve up the appropriate webpage based on that */
  var sceneInfo = parent.document.getElementById("sceneInfo");
  console.log("Sceneinfo is " + sceneInfo);
  // clear the current thing in the div
  $('#sceneInfo').empty();
  // print out the title scene and type
  sceneInfo.insertAdjacentHTML( 'beforeend', "<h1>" + result.title + " </h1>");
  sceneInfo.insertAdjacentHTML( 'beforeend', "<p><em>Scene Type: " + result.scene_type + " </em></p>");
  if (result.lead_ins != null) {
    sceneInfo.insertAdjacentHTML( 'beforeend', "Lead-Ins: ");
    result.lead_ins.forEach(function(element) {
      sceneInfo.insertAdjacentHTML( 'beforeend', element + " | ");
    });
  }
  // print out and format a list of the lead outs
  if (result.lead_outs != null) {
    sceneInfo.insertAdjacentHTML( 'beforeend', "Lead-Outs: ");
    result.lead_outs.forEach(function(element) {
      sceneInfo.insertAdjacentHTML( 'beforeend', element + " | ");
    });
  }
 
  sceneInfo.insertAdjacentHTML( 'beforeend',"<hr>");
  // print out list of text in the scene
  result.text.forEach(function(element) {
  if (element.clue !== undefined) {
    // print out each individual clue and format with checkbox
    // check if checkbox should be checked or not 
    if (element.clue[1].known == true) {
      sceneInfo.insertAdjacentHTML( 'beforeend', "<p class='hangingindent'><input type='checkbox' name='clue' checked>  " + element.clue[0] + "</p>");
    } else {
      sceneInfo.insertAdjacentHTML( 'beforeend', "<p class='hangingindent'><input type='checkbox' name='clue'> " + element.clue[0] + "</p>");
    }
  } else {
    sceneInfo.insertAdjacentHTML( 'beforeend', "<p>" + element + " </p>");
  }
  }); 
}

// When you click the checkbox, have this update the result in the JSON
$(document).on("click", "input[name='clue']", function () {
  var checked = $(this).prop('checked');
  var clueText = this.nextSibling.data.trim();
  // Go through each clue and find the one that matches the checkbox, then change the data for that clue to be known/unknown
  sceneJSON.text.forEach(function(element) {
    if (element.clue !== undefined && clueText == element.clue[0]) {
      element.clue[1].known = checked;
    } 
  }); 
  // TODO: after this is done, should update the JSON file
  localStorage.setItem(currentSceneName, JSON.stringify(sceneJSON));
});

function renderGraph() {
  // Example of using the API
  var element = document.querySelector("#graphInfo");

  var insertSvg = function(svgCode, bindFunctions){
    element.innerHTML = svgCode;
  };
 //var graphDefinition = 'graph TB\na-->b';
  var graphDefinition = "graph TB\nScene_Dame[A Dame Comes Into Your Office]\nScene_Typewriter[Typewriter Alley]\nScene_Order[The Order of Argent Light]\nScene_Girl[The Girl with Death in her Eyes]\nScene_Franz[Franz's Spiel]\nScene_Guest[The Guest House]\nScene_Into[Into the Hypno-Dimensional]\nScene_Revisiting[Revisiting Margaret]\nScene_Alegria[The Alegria]\nScene_Bumping[Bumping into Roscoe]\nScene_Money[The Money Man]\nScene_Squeeze[The Squeeze Artist]\nScene_Top[Top of the System]\nScene_New[New Blood]\nScene_Mickey[Mickey Knows a Guy]\nScene_Bugsy[Bugsy's Weird Rock]\nScene_Missing[The Missing Ex-Cop]\nScene_Hole[The Hole]\nScene_Dame --> Scene_Typewriter\nScene_Dame --> Scene_Order\nScene_Dame --> Scene_Girl\nScene_Franz --> Scene_Guest\nScene_Typewriter --> Scene_Franz\nScene_Typewriter --> Scene_Order\nScene_Typewriter --> Scene_Alegria\nScene_Order --> Scene_Typewriter\nScene_Order --> Scene_Revisiting\nScene_Order --> Scene_Girl\nScene_Girl --> Scene_Bumping\nScene_Guest --> Scene_Money\nScene_Guest --> Scene_Into\nScene_Into --> Scene_Revisiting\nScene_Revisiting --> Scene_Bumping\nScene_Revisiting --> Scene_Alegria\nScene_Alegria --> Scene_Squeeze\nScene_Alegria --> Scene_Money\nScene_Alegria --> Scene_Top\nScene_Bumping --> Scene_Alegria\nScene_Money --> Scene_Squeeze\nScene_Money --> Scene_Guest\nScene_Squeeze --> Scene_Top\nScene_Squeeze --> Scene_Mickey\nScene_Top --> Scene_Missing\nScene_Top --> Scene_New\nScene_New --> Scene_Mickey\nScene_New --> Scene_Bugsy\nScene_Bugsy --> Scene_Mickey\nScene_Bugsy --> Scene_Hole\nScene_Missing --> Scene_Hole\nScene_Mickey --> Scene_Hole\nclick Scene_Dame loadScene\nclick Scene_Typewriter loadScene";
  var graph = mermaid.mermaidAPI.render('graphInfo', graphDefinition, insertSvg);
}