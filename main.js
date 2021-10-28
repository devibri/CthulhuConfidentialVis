var url = "https://www.devi-a.com/CthulhuConfidentialVis/scenes/scene_dame.json";

/* this tells the page to wait until jQuery has loaded, so you can use the Ajax call */

$(document).ready(function(){
  $.ajax({
    url: url,
    dataType: 'json',
      error: function(){
        console.log('JSON FAILED for data');
      },
    success:function(results){
  /* the results is your json, you can reference the elements directly by using it here, without creating any additional variables */
  
      var sceneInfo = document.getElementById("sceneInfo");
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
            sceneInfo.insertAdjacentHTML( 'beforeend', "<p class='hangingindent'><input type='checkbox' checked>  " + element.clue[0] + "</p>");
          } else {
             sceneInfo.insertAdjacentHTML( 'beforeend', "<p class='hangingindent'><input type='checkbox'> " + element.clue[0] + "</p>");
          }
        } else {
          sceneInfo.insertAdjacentHTML( 'beforeend', "<p>" + element + " </p>");
        }
        
        
      }); 
    } 
   }) 
 }) 