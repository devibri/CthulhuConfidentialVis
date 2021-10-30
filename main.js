mermaid.initialize({
  startOnLoad: true,
  securityLevel: 'loose'
});

var sceneJSON; 

document.addEventListener("DOMContentLoaded", function() {
  localStorage.clear();
  loadScene("scene_dame");
});

var loadScene = function(scene_name) {
  // When pulling scene, first check to see if it is local storage. If not, pull from the .json file
  if (localStorage.getItem(scene_name.toLowerCase()) === null) {
    console.log("Couldn't find scene " + scene_name + " in local storage");
    var url = "https://www.devi-a.com/CthulhuConfidentialVis/scenes/" + scene_name.toLowerCase() + ".json";
    /* this tells the page to wait until jQuery has loaded, so you can use the Ajax call */
  //$(document).ready(function(){
    $.ajax({
      url: url,
      dataType: 'json',
        error: function(){
          console.log('JSON FAILED for data');
        },
      success:function(results){
        console.log(results);
        sceneJSON = results; // record the results of the json query and save that to a variable
        console.log("setting sceneJSON to: " + sceneJSON);
        parseScene(results);
      } 
     }) 
   //}) 
  } else {
    sceneJSON = JSON.parse(localStorage.getItem('scene_dame'));
    parseScene(sceneJSON);
  }
}

function parseScene(result) {
  console.log("SceneJSON is: " + result);
  /* now go through the JSON and serve up the appropriate webpage based on that */
        sceneInfo = document.getElementById("sceneInfo");
        $('#sceneInfo').empty();
        // print out the title scene and type
        sceneInfo.insertAdjacentHTML( 'beforeend', "<h1>" + result.title + " </h1>");
        sceneInfo.insertAdjacentHTML( 'beforeend', "<p><em>Scene Type: " + sceneJSON.scene_type + " </em></p>");
        // print out and format a list of the lead outs
        sceneInfo.insertAdjacentHTML( 'beforeend', "Lead-Outs: ");
        result.lead_outs.forEach(function(element) {
          console.log(element);
          sceneInfo.insertAdjacentHTML( 'beforeend', element + " | ");
        });
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
  localStorage.setItem('scene_dame', JSON.stringify(sceneJSON));
});

//in clicking link to another scene, load in that scene
jQuery( 'div.link a' )
    .click(function() {
        go_to_scene( this.href );
        return false;
    });

// play the funky music white boy
function go_to_scene( url )
{
    alert( url );
    loadScene(url);
}