mermaid.initialize({
  startOnLoad: true,
  securityLevel: 'loose',
});


var characterJSON; 
var currentCharacterName;
var graphJSON;

function reset() {
  localStorage.clear();
  loadCharacterGraph();
}

window.onload = function () {
  loadCharacterGraph();
}

function loadCharacterGraph() {
  if (localStorage.getItem("currentCharacter") === null) {
    loadCharacter("margaret_deaken");
  } else {
    loadCharacter(localStorage.getItem("currentCharacter"));
  }
  loadGraph();
}

// serve up the appropriate scene by either pulling it from local storage or fetching from the appropriate URL
var loadCharacter = function(character_name) {
  currentCharacterName = character_name.toLowerCase();
  // When pulling scene, first check to see if it is local storage. If not, pull from the .json file
  if (localStorage.getItem("characterInfo") === null) {
    var url = "https://www.devi-a.com/CthulhuConfidentialVis/data/character-info.json";
    // use AJAX to fetch the appropriate JSON data
    $.ajax({
      url: url,
      dataType: 'json',
      error: function(){
        console.log('JSON FAILED for data');
      },
      success:function(results){
        characterJSON = results; // record the results of the json query and save that to a variable
        parseCharacter(results, character_name);
      } 
    }) 
 } else {
  characterJSON = JSON.parse(localStorage.getItem("characterInfo"));
  parseCharacter(characterJSON, character_name);
}
}

// takes the scene you're trying to load and renders it 
function parseCharacter(result, name) {
  //save the scene name to local storage
  localStorage.setItem("currentCharacter", name);
  /* now go through the JSON and serve up the appropriate webpage based on that */
  var characterInfo = document.getElementById("characterInfo");
  // clear the current thing in the div
  $('#characterInfo').empty();
  // print out the title scene and type
  result.forEach(function(character) {
    if (character.id == name) {
      characterInfo.insertAdjacentHTML( 'beforeend', "<h1>" + character.name + " </h1>");
      characterInfo.insertAdjacentHTML( 'beforeend', "<p>" + character.title + " </p>");
      if (result.met) {
         characterInfo.insertAdjacentHTML( 'beforeend', "<p>Met:  <input type='checkbox' name='met' checked></p>");
      } else {
        characterInfo.insertAdjacentHTML( 'beforeend', "<p>Met:  <input type='checkbox' name='met'></p>");
      }
      if (result.known) {
         characterInfo.insertAdjacentHTML( 'beforeend', "<p>Known:  <input type='checkbox' name='known' checked></p>");
      } else {
        characterInfo.insertAdjacentHTML( 'beforeend', "<p>Known:  <input type='checkbox' name='known'></p>");
      }
      characterInfo.insertAdjacentHTML( 'beforeend', "<p>" + character.description + "</p>");
    }
  });
}

// // When you click the checkbox for a clue, have this update the result in the JSON
// $(document).on("click", "input[name='clue']", function () {
//   var checked = $(this).prop('checked');
//   var clueText = this.nextSibling.data.trim();
//   // Go through each clue and find the one that matches the checkbox, then change the data for that clue to be known/unknown
//   sceneJSON.text.forEach(function(element) {
//     if (element.clue !== undefined && clueText == element.clue[0]) {
//       element.clue[1].known = checked;
//     } 
//     // if you click on a lead to another area, update the flowchart to indicate this
//     if (element.clue !== undefined && clueText == element.clue[0] && element.clue[2] !== undefined) {
//       if (checked) {
//         var tag = currentSceneName + " --> " + element.clue[2].goes_to;
//         graphJSON.graph.forEach(function(element, index) {
//           if (element == tag) { // if checked, do a check to add that element, otherwise do a check to remove that element
//             graphJSON.graph.splice(index, 1);
//           } 
//         }); 
//         var newTag = currentSceneName + " ==> " + element.clue[2].goes_to;
//         graphJSON.graph.push(newTag);
//         // otherwise go through and remove the indication that the scene has been completed
//       } 
//       //save the current graph data then redisplay graph
//       localStorage.setItem("graphData", JSON.stringify(graphJSON));
//       loadGraph();
//     }
//   }); 
//   // after this is done, should update the JSON file
//   localStorage.setItem(currentSceneName, JSON.stringify(sceneJSON));
// });

// // When you click the checkbox for visited, have this update the graph and the JSON
// $(document).on("click", "input[name='visited']", function () {
//   // update the scene JSON to reflect that location has been visited
//   var checked = $(this).prop('checked');
//   sceneJSON.visited = checked; 
//   // after this is done, should update the JSON file
//   localStorage.setItem(currentSceneName, JSON.stringify(sceneJSON));

//   // update the graph JSON to indicate that the location has been visited 
//   if (checked) {
//     graphJSON.graph.push("class " + currentSceneName + " completed;");
//     // otherwise go through and remove the indication that the scene has been completed
//   } else {
//     var tag = "class " + currentSceneName + " completed;";
//     graphJSON.graph.forEach(function(element, index) {
//       if (element == tag) { // if checked, do a check to add that element, otherwise do a check to remove that element
//         graphJSON.graph.splice(index, 1);
//       } 
//     }); 
//   }
//   //save the current graph data then redisplay graph
//   localStorage.setItem("graphData", JSON.stringify(graphJSON));
//   loadGraph();
// });



function loadGraph() {
  // When pulling scene, first check to see if it is local storage. If not, pull from the .json file
  if (localStorage.getItem("graphData") === null) {
    var url = "https://www.devi-a.com/CthulhuConfidentialVis/data/character-graph.json";
  // use AJAX to fetch the appropriate JSON data
    $.ajax({
      url: url,
      dataType: 'json',
      error: function(){
        console.log('JSON FAILED for data');
      },
      success:function(results){
        graphJSON = results; // record the results of the json query and save that to a variable
        var graphDefinition = "";
        results.graph.forEach(function(element) {
          graphDefinition = graphDefinition + element + "\n"; 
        }); 
        parseGraph(graphDefinition);
      }
  });
  } else {
    graphJSON = JSON.parse(localStorage.getItem("graphData"));
    var graphDefinition = "";
    graphJSON.graph.forEach(function(element) {
      graphDefinition = graphDefinition + element + "\n"; 
    });
    parseGraph(graphDefinition);
  }
}

function parseGraph(graphDefinition) {
  console.log("Graph definition: " + graphDefinition);
  $('#graph').empty();
  var element = document.querySelector("#graph");

  var insertSvg = function(svgCode, bindFunctions){
    element.innerHTML = svgCode;
  };
  mermaid.mermaidAPI.render('graph', graphDefinition, insertSvg);
}

// // When you click the node, load the appropriate page
// $(document).on("click", "g[class='nodes'] g[class='node']", function () {
//   var id = $(this).attr('id');
//   var text = $(this).find('foreignObject div').html();
//   loadScene(id); 
// });


// // When you click the node, load the appropriate page
// $(document).on("click", "g[class='nodes'] g[class='node completed']", function () {
//   var id = $(this).attr('id');
//   var text = $(this).find('foreignObject div').html();
//   loadScene(id); 
// });