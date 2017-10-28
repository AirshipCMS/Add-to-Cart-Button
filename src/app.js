(() => {
  const addToCartButton = document.getElementById('add-to-cart-button');
  let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { items: [] };
  
  if(addToCartButton) {
    addToCartButton.addEventListener('click', addToCart);
  }

  function validateDataset(cartItem) {
    let isValid = true,
        invalidKey;
    for(const [key, value] of Object.entries(cartItem)) {
      if(value === null || value === undefined) {
        isValid = false;
        invalidKey = key;
        break;
      }
    }
    return { isValid, invalidKey };
  }

  function addToCart() {

    let cartItem = {
      aerostat_id: this.dataset.aerostatId,
      id: this.dataset.id,
      product_title: this.dataset.productTitle,
      product_variation_title: this.dataset.productVariationTitle,
      quantity: this.dataset.quantity || 1,
      price: {
        usd: this.dataset.price
      },
      type: this.dataset.type || 'item',
      product_plan: {
        name: this.dataset.planName,
        amount: this.dataset.planAmount,
        interval: this.dataset.interval,
        interval_count: this.dataset.planIntervalCount,
        trial_days: this.dataset.planTrialDays
      }
    }

    let { isValid, invalidKey } = validateDataset(cartItem);


    if(isValid) {
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
    } else {
      throw new Error(`${invalidKey} is required`);
    }
  }
})();