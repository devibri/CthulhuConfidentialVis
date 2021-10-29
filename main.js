mermaid.initialize({
  startOnLoad: true,
  securityLevel: 'loose'
});

var sceneJSON; 

var loadScene = function(scene_name) {
  var url = "https://www.devi-a.com/CthulhuConfidentialVis/scenes/" + scene_name.toLowerCase() + ".json";

  /* this tells the page to wait until jQuery has loaded, so you can use the Ajax call */
  $(document).ready(function(){
    $.ajax({
      url: url,
      dataType: 'json',
        error: function(){
          console.log('JSON FAILED for data');
        },
      success:function(results){
        sceneJSON = results;
    /* the results is your json, you can reference the elements directly by using it here, without creating any additional variables */
        sceneInfo = document.getElementById("sceneInfo");
        $('#sceneInfo').empty();
        // print out the title scene and type
        sceneInfo.insertAdjacentHTML( 'beforeend', "<h1>" + results.title + " </h1>");
        sceneInfo.insertAdjacentHTML( 'beforeend', "<p><em>Scene Type: " + results.scene_type + " </em></p>");
        // print out and format a list of the lead outs
        sceneInfo.insertAdjacentHTML( 'beforeend', "Lead-Outs: ");
        results.lead_outs.forEach(function(element) {
          sceneInfo.insertAdjacentHTML( 'beforeend', element + " | ");
        });
        sceneInfo.insertAdjacentHTML( 'beforeend',"<hr>");
        // print out list of text in the scene
        results.text.forEach(function(element) {
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
     }) 
   }) 
}


// When you click the checkbox, have this update the result in the JSON
$(document).on("click", "input[name='clue']", function () {
  var checked = $(this).prop('checked');
  var clueText = this.nextSibling.data.trim();
  // Go through each clue and find the one that matches the checkbox, then change the data for that clue to be known/unknown
  sceneJSON.text.forEach(function(element) {
    if (element.clue !== undefined && clueText == element.clue[0]) {
      element.clue[1].known = checked;
      console.log(element.clue[1].known);
      // TODO: after this is done, should update the JSON file
    } 
  }); 
});

