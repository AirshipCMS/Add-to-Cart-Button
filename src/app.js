(() => {
  const addToCartButton = document.querySelectorAll('button[data-aerostat-id'),
        cartCounter = document.getElementById("nav-cart-counter"),
        requiredProductData = ['aerostatId', 'id', 'productTitle', 'productVariationTitle', 'price'],
        requiredPlanData = ['aerostatId', 'id', 'productTitle', 'name', 'price', 'interval'];
  let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { items: [] };
  
  Array.prototype.slice.call(addToCartButton).forEach((el) => el.onclick = validateDataset);

  function validateDataset() {
    let isValid = true,
        invalidKey;
    let requiredData = this.dataset.type === 'plan' ? requiredPlanData : requiredProductData;
    for(var value of requiredData) {
      if(this.dataset[value] === null || this.dataset[value] === undefined || this.dataset[value] === "") {
        isValid = false;
        invalidKey = value;
        break;
      }
    }
    if(isValid) {
      addToCart(this.dataset);
    } else {
      throw new Error(`${invalidKey} is required`);
    }
  }

  function addToCart(dataset) {
    let hasNoShipments;
    if(dataset.hasNoShipments) hasNoShipments = JSON.parse(dataset.hasNoShipments);

    let cartItem = {
      aerostat_id: dataset.aerostatId,
      id: dataset.id,
      product_title: dataset.productTitle,
      product_variation_title: dataset.productVariationTitle,
      quantity: dataset.quantity || 1,
      price: {
        usd: dataset.price
      },
      type: dataset.type || 'item',
      product_plan: { //this is just for front end cart and will be omitted on checkout
        name: dataset.name,
        interval: dataset.interval,
        interval_count: dataset.interval_count,
        trial_days: dataset.trialDays || 0
      },
      has_no_shipments: hasNoShipments || false
    }

    if(cart.items.length > 0) {
      let existingCartItems = cart.items.filter((item) => item.id === cartItem.id && cartItem.type !== 'plan');
      if(existingCartItems.length > 0) {
        existingCartItems.forEach((item) => item.quantity++);
      } else {
        cart.items.push(cartItem);
      }
    } else {
      cart.items.push(cartItem);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    if(cartCounter) {
      updateCartCount(dataset);
    }
  }
})();