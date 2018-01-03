# Add to Cart Button

## Development

### Installation

```
yarn install
```

### How to Run

run `yarn start`.

This will run webpack-dev-server on port `9000`.

`src/airship-add-to-cart-button.js` is the entry point.

### Building

run `yarn build`

this will build/minify the `src/app.js` to `dist/airship-add-to-cart-button.min.js`


### Usage

In your airship project, add `airship-add-to-cart-button.min.js` to `compartments/assets/scripts/`.

Include this script to the pages that needs an Add to Cart Button(s).

Add the required data attributes to your button element.

```
<button
    data-aerostat-id="1"
    data-id="4"
    data-product-title="Sticker"
    data-product-variation-title="Pink"
    data-price="500"
>
    Add to Cart
</button>
```

### Cart Item

PROPERTY                |TYPE     |NOTES                                                                       |DATA ATTRIBUTE
---|---|---|---
type                    |srting   |optional. "item" is default. set as "plan" for subscription products.  	   |data-type
---|---|---|---
aerostat_id             |int      |required.                                                              	   |data-aerostat-id
---|---|---|---
product_title           |string   |required.                                                              	   |data-product-title
---|---|---|---
product_variation_title |string   |required for type item only                   	                           |data-product-variation-title
---|---|---|---
id                      |int      |required. variation id or plan id                 	                       |data-id
---|---|---|---
price[usd]              |int      |required             	                                                   |data-price
---|---|---|---
quantity                |int      |optional. default is 1. can't be > 1 for type plan                     	   |data-quantity
---|---|---|---
name                    |string   |required. for type plan                                                	   |data-name
---|---|---|---
interval                |string   |required. for type plan                                                	   |data-interval
---|---|---|---
interval_count          |int      |optional. default is 0                                                 	   |data-interval-count


#### Misc Data

If you'd like to add additional data to your cart item, you can do so by adding a misc data attribute.
Add `data-misc-data-` followed by the name of your misc data property:

```
<button
    data-misc-data-custom-label="I'm a custom label"
    data-misc-data-sticker-type="die cut"
>
    Add to Cart
</button>
```

The example above would add `misc_data` to your cart with the properties `custom_label` and `sticker_type`:

```
{
	custom_label: "I'm a custom label",
	sticker_type: "die cut"
}
```

Any amount of items may be added to `misc_data`.