# Add to Cart

## Development

### Installation

```
yarn install
```

### How to Run

run `yarn run dev`.

This will run webpack-dev-server on port `9000`.

`src/app.js` is the entry point.

### Building

run `yarn build`

this will build/minify the `src/app.js` to `dist/addToCartButton.min.js`

### Cart Item

PROPERTY                |TYPE     |NOTES                                                                       |DATA ATTRIBUTE
---|---|---|---
type                    |srting   |optional. "item" is default. set as "plan" for subscription products.  	   |data-type
---|---|---|---
aerostat_id             |int      |required.                                                              	   |data-aerostat-id
---|---|---|---
product_title           |string   |required.                                                              	   |data-product-title
---|---|---|---
product_variation_title |string   |required. for type item only                   	                           |data-product-variation-title
---|---|---|---
price                   |int      |required. for type item                     	                               |data-price
---|---|---|---
id                      |int      |required. variation id or plan id                 	                       |data-id
---|---|---|---
price[usd]              |int      |required for type item               	                                   |data-price
---|---|---|---
quantity                |int      |optional. default is 1. can't be > 1 for type plan                     	   |data-quantity
---|---|---|---
name                    |string   |required. for type plan                                                	   |data-name
---|---|---|---
amount                  |string   |required                                          	                       |data-amount
---|---|---|---
interval                |string   |required. for type plan                                                	   |data-interval
---|---|---|---
interval_count          |int      |optional. default is 0                                                 	   |data-interval-count

