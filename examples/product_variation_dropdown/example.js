// this example demonstrates how to update #add-to-cart-button dataset with a select element
(function () {
  var selector = document.getElementById('variation_select'); //select element
  var addToCartButton = document.getElementById('airship-add-to-cart-button');

  // whenever an option is selected, set variation data on addToCartButton
  function setSelectData( index ){
    var dataset = selector.children[ ( index || 0 ) ].dataset;
    for(key in dataset) {
      addToCartButton.dataset[ key ] = dataset[ key ];
    }
  }

  selector.addEventListener('change', function(event){
    return setSelectData(this.selectedIndex);
  });

  addToCartButton.addEventListener('click', function(event) {
    addToCartButton.children[0].innerHTML = 'Added to Cart!';
    setTimeout(function() {
      addToCartButton.children[0].innerHTML = 'Add to Cart';
    },3000);
  });
}());