(() => {
  const addToCartButton = document.querySelectorAll('button[data-aerostat-id'),
        cartCounter = document.getElementsByClassName("airship-nav-cart-counter"),
        requiredProductData = ['aerostatId', 'id', 'productTitle', 'productVariationTitle', 'price'],
        requiredPlanData = ['aerostatId', 'id', 'productTitle', 'name', 'price', 'interval'];
  
  Array.prototype.slice.call(addToCartButton).forEach((el) => el.onclick = validateDataset);

  function validateDataset() {
    let isValid = true,
        invalidKey;
    let requiredData = this.dataset.type === 'plan' ? requiredPlanData : requiredProductData;
    for (const [key, value] of Object.entries(requiredData)) {
      if(value === null || value === undefined || value === "") {
        isValid = false;
        invalidKey = key;
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
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { items: [] };
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
      product_plan: {
        name: dataset.name,
        interval: dataset.interval,
        interval_count: dataset.intervalCount,
        trial_period_days: dataset.trialDays || 0
      },
      has_no_shipments: hasNoShipments || false
    }

    let misc_data = {};

    for (const [key, value] of Object.entries(dataset)) {
      if(key.includes('miscData')) {
        let keyWithoutMiscData = key.split('miscData')[1];
        let formattedKey = keyWithoutMiscData.charAt(0).toLowerCase() + keyWithoutMiscData.slice(1).replace(/([A-Z])/g, '_$1').trim().toLowerCase();
        misc_data[formattedKey] = value;
      }
    }

    if(Object.keys(misc_data).length > 0) {
      cartItem['misc_data'] = misc_data;
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
      window.updateCartCount(dataset);
    }
  }
})();