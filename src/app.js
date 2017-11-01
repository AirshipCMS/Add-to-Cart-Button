(() => {
  const addToCartButton = document.getElementById('add-to-cart-button'),
        requiredProductData = ['aerostatId', 'id', 'productTitle', 'productVariationTitle', 'price'],
        requiredPlanData = ['aerostatId', 'id', 'productTitle', 'name', 'amount', 'interval'];
  let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { items: [] };
  
  if(addToCartButton) {
    addToCartButton.addEventListener('click', validateDataset);
  }

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
        amount: dataset.amount,
        interval: dataset.interval,
        interval_count: dataset.interval_count,
        trial_days: dataset.trialDays || 0
      }
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
  }
})();