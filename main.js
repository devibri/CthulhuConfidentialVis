/* I put your JSON into an external file, loaded from github */
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
      sceneInfo.insertAdjacentHTML( 'beforeend', "<h1>" + results.title + " </h1>");
      sceneInfo.insertAdjacentHTML( 'beforeend', "<p><em>Scene Type: " + results.scene_type + " </em></p>");
      sceneInfo.insertAdjacentHTML( 'beforeend', "Lead-Outs: ");
      results.lead_outs.forEach(function(element) {
        sceneInfo.insertAdjacentHTML( 'beforeend', element + " | ");
      });
      sceneInfo.insertAdjacentHTML( 'beforeend',"<hr>");
      results.text.forEach(function(element) {
        sceneInfo.insertAdjacentHTML( 'beforeend', "<p>" + element + " </p>");
      }); // end of forEach
    }  // end of success fn
   }) // end of Ajax call
 }) // end of $(document).ready() function