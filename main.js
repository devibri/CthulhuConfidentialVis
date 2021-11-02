mermaid.initialize({
  startOnLoad: true,
  securityLevel: 'loose',
});


var sceneJSON; 
var currentSceneName;
var graphJSON;

// on start / refresh, clear local vars and load the starting scene
document.addEventListener("DOMContentLoaded", function() {
  localStorage.clear();
  loadScene("scene_dame");
  loadGraph();
});

// serve up the appropriate scene by either pulling it from local storage or fetching from the appropriate URL
var loadScene = function(scene_name) {
  currentSceneName = scene_name.toLowerCase();
  // When pulling scene, first check to see if it is local storage. If not, pull from the .json file
  if (localStorage.getItem(currentSceneName) === null) {
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
  var sceneInfo = document.getElementById("sceneInfo");
  // clear the current thing in the div
  $('#sceneInfo').empty();
  // print out the title scene and type
  sceneInfo.insertAdjacentHTML( 'beforeend', "<h1>" + result.title + " </h1>");
  if (result.visited) {
     sceneInfo.insertAdjacentHTML( 'beforeend', "Completed:  <input type='checkbox' name='visited' checked>");
  } else {
    sceneInfo.insertAdjacentHTML( 'beforeend', "Completed:  <input type='checkbox' name='visited'>");
  }
  sceneInfo.insertAdjacentHTML( 'beforeend', "<p><em>Scene Type: " + result.scene_type + " </em></p>");
  if (result.lead_ins != null) {
    sceneInfo.insertAdjacentHTML( 'beforeend', "Lead-Ins: ");
    result.lead_ins.forEach(function(element) {
      sceneInfo.insertAdjacentHTML( 'beforeend', " | " + element);
    });
  }
  sceneInfo.insertAdjacentHTML( 'beforeend',"<br>");
  // print out and format a list of the lead outs
  if (result.lead_outs != null) {
    sceneInfo.insertAdjacentHTML( 'beforeend', "Lead-Outs: ");
    result.lead_outs.forEach(function(element) {
      sceneInfo.insertAdjacentHTML( 'beforeend', " | " + element);
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

// When you click the checkbox for a clue, have this update the result in the JSON
$(document).on("click", "input[name='clue']", function () {
  var checked = $(this).prop('checked');
  var clueText = this.nextSibling.data.trim();
  // Go through each clue and find the one that matches the checkbox, then change the data for that clue to be known/unknown
  sceneJSON.text.forEach(function(element) {
    if (element.clue !== undefined && clueText == element.clue[0]) {
      element.clue[1].known = checked;
    } 
    // if you click on a lead to another area, update the flowchart to indicate this
    if (element.clue !== undefined && clueText == element.clue[0] && element.clue[2] !== undefined) {
      if (checked) {
        var tag = currentSceneName + " --> " + element.clue[2].goes_to;
        graphJSON.graph.forEach(function(element, index) {
          if (element == tag) { // if checked, do a check to add that element, otherwise do a check to remove that element
            graphJSON.graph.splice(index, 1);
          } 
        }); 
        var newTag = currentSceneName + " ==> " + element.clue[2].goes_to;
        graphJSON.graph.push(newTag);
        // otherwise go through and remove the indication that the scene has been completed
      } 
      //save the current graph data then redisplay graph
      localStorage.setItem("graphData", JSON.stringify(graphJSON));
      loadGraph();
    }
  }); 
  // after this is done, should update the JSON file
  localStorage.setItem(currentSceneName, JSON.stringify(sceneJSON));
});

// When you click the checkbox for visited, have this update the graph and the JSON
$(document).on("click", "input[name='visited']", function () {
  // update the scene JSON to reflect that location has been visited
  var checked = $(this).prop('checked');
  sceneJSON.visited = checked; 
  // after this is done, should update the JSON file
  localStorage.setItem(currentSceneName, JSON.stringify(sceneJSON));

  // update the graph JSON to indicate that the location has been visited 
  if (checked) {
    graphJSON.graph.push("class " + currentSceneName + " completed;");
    // otherwise go through and remove the indication that the scene has been completed
  } else {
    var tag = "class " + currentSceneName + " completed;";
    graphJSON.graph.forEach(function(element, index) {
      if (element == tag) { // if checked, do a check to add that element, otherwise do a check to remove that element
        graphJSON.graph.splice(index, 1);
      } 
    }); 
  }
  //save the current graph data then redisplay graph
  localStorage.setItem("graphData", JSON.stringify(graphJSON));
  loadGraph();
});



function loadGraph() {
  // When pulling scene, first check to see if it is local storage. If not, pull from the .json file
  if (localStorage.getItem("graphData") === null) {
    var url = "https://www.devi-a.com/CthulhuConfidentialVis/scenes/graph.json";
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
  $('#graphInfo').empty();
  var element = document.querySelector("#graphInfo");

  var insertSvg = function(svgCode, bindFunctions){
    element.innerHTML = svgCode;
  };
  mermaid.mermaidAPI.render('graphInfo', graphDefinition, insertSvg);
}

// When you click the node, load the appropriate page
$(document).on("click", "g[class='nodes'] g[class='node']", function () {
  var id = $(this).attr('id');
  var text = $(this).find('foreignObject div').html();
  loadScene(id); 
});


// When you click the node, load the appropriate page
$(document).on("click", "g[class='nodes'] g[class='node completed']", function () {
  var id = $(this).attr('id');
  var text = $(this).find('foreignObject div').html();
  loadScene(id); 
});

