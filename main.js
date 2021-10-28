/* I put your JSON into an external file, loaded from github */
var url = "https://www.devi-a.com/CthulhuConfidentialVis/people.json";

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
  
      var cartItemsList = document.getElementById("sceneInfo");

      results.basket.productList.forEach(function(element) {
      cartItemsList.insertAdjacentHTML( 'beforeend',"<li>" + element.product.name + " : " + element.price+ " </li>");
      }); // end of forEach
    }  // end of success fn
   }) // end of Ajax call
 }) // end of $(document).ready() function