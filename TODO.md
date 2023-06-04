# TODOs and API Endpoints to be implemented for the backend

## API Endpoints

## General

- [ ] Split code into services (handling db access and sql queries for
  products, users, etc.) and controllers (route handlers in /src/api)
- [ ] Upload images & store them in db
- [ ] Retrieve images from db & serve them at appropriate path

## Products

- [ ] Product listing
  - [ ] Calculate reduced price & include it in response
  - [ ] Handle Images
- [ ] Product search by keyword
  - [ ] Reduced price & images
- [ ] Get products of seller
  - New endpoint (GET /sellers/:seller_id/products)
- [ ] Get single product by id
  - [ ] Reduced price & images
- [ ] Add Product
  - [ ] Create new endpoint (POST /products)
  - [ ] Correct response (201 CREATED /products/new_id)
  - [ ] Handle images
  - [ ] Input validation
- [ ] Update Product
  - [ ] Create new endpoint (PUT /products/:id)
  - [ ] Correct response
  - [ ] Input validation
- [ ] Delete Product
  - [ ] Include as "hide product"/available in update product

## Users

- [ ] Register User
  - [ ] Create new endpoint (POST /users)
  - [ ] Correct response (CREATED)
  - [ ] Input validation
  - [ ] Handle Images
  - [ ] Handle Seller VS Customer
- [ ] Update User
  - [ ] Create new endpoint (PUT /users/:id)
  - [ ] Input validation
  - [ ] Correct response
  - [ ] Handle Seller VS Customer
- [x] User Login

## Basket

- [ ] Get Basket
  - [ ] Handle Images
  - [ ] Include reduced price
- [x] Update Basket

## Order Management

- [ ] Place an Order
  - [ ] Create new endpoint (POST /orders) ? maybe other path
  - [ ] Correct response (CREATED /orders/new_id)
  - [ ] Check if purchase can be made (enough quantity?)
  - [ ] Update quantity
  - [ ] Empty Basket
  - [ ] Set default order status
  - [ ] Apply coupons
- [ ] Manage an Order
  - [ ] Create new endpoint (PUT /orders/:order_id)
  - [ ] Decide order statuses (e.g. OPEN, DELIVERED, idk)
  - [ ] Delivery confirmation from consumer???
  - [ ] Restrict order of order statuses (e.g. can't go back to OPEN if
    delivery already confirmed)
- [ ] Get orders
  - [ ] New endpoint (GET /sellers/:seller_id/orders ?? or better path)
    to get orders as a seller
  - [ ] New endpoint (GET /users/:user_id/orders ?? or better path
    (maybe /customers/:customer_id/orders)) to get orders as a customer

## Coupons

- [ ] Add coupon
  - [ ] New endpoint(s) (POST /sellers/:seller_id/coupons ? Or maybe
    different paths for different coupon types)
  - [ ] Input validation
  - [ ] Correct response
  - [ ] Generate sensible coupon code?? Maybe not just numeric id??
    Specify coupon code??
- [ ] Get coupons
  - [ ] New endpoint (GET /sellers/:seller_id/coupons)
- [ ] Update coupon
  - [ ] New endpoint (PUT /sellers/:seller_id/coupons/:coupon_id)
  - [ ] Input validation

## Admin

What does our admin even do?

- [ ] List all users
- [ ] Delete/deactivate user

## Notes

- The structure of the API endpoints is just a suggestion, if you have
  better ideas for structuring then change it
- Make sure to separate your functionality into services and controllers
- Try to stick to the guidelines for HTTP request methods
  <https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods>
