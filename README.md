# Daylight Donuts eCommerce Website
This website was inspired by my summer job where I made donuts overnight. Each product image was made and taken by me while I worked overnight.

I have made two versions of this website, the first version was my very first attempt at a website on my own after learning React.js and Next.js. The second version is still being worked and implements the same features and more as the first version, but with the help of typescript.

## Customer Features
### Persistent Cart
Once the customer adds their first item to the cart, a JWT is created and stored in the customer's cookies. This JWT holds the cartId of the customer's cart that the database can use to find the customer's cart,  allowing the customer to leave and come back to the website with their cart still there.
### Optimistic Cart Updates
Upon adding an item to the cart, the customer won't notice any latency while the new item is posted to the database. With the use of tanstack query, the cart will revert to a stable state if there is an error.
### Donut Box Builder
At Daylight Donuts, and many other donut companies, the customer recieves a discount when they purchase a dozen donuts, but not all donuts are eligible for this discount. By visiting the Dount Box Builder, the customer has the ability to know which donuts are eligible for the discount as well as build their own box with the donuts.
### Secure Payments
This website utilizes Stripe to handle payments. When the user completes the checkout form and submits an order, the Stripe API handles the payment intent. Once the payment intent is verified by Stripe, a webhook endpoint is setup to catch successful payments and verify the order in the database. 
## Admin Features (in progress)
### Order Sorting
The admin has the ability to sort orders by the current day, week, and month, as well as know which orders have already been printed.
### Order Printing
By utilizing a DYMO printer, the admin of the website has the ability to directly print orders from the website. 
> This feature was implemented on the first version of the website and is currently being implemented on the second version.
### Order Analytics
By viewing the analytics page, the admin can view various analytics such as: gross revenue from orders for each day of a week, average orders for each day of a week, and more.

## Website Pages
### [Menu Page](https://daylightdonuts.vercel.app/menu)
Shows the products for sale as well as allows the customer to filter for specific items.
### [Dozenable Page](https://daylightdonuts.vercel.app/menu?category=Dozenable)
Displays all of the donuts in a specifc group that can be used to complete a box for a discount and allows the customer to directly build the box to add to their cart.
![Box Builder Gif](https://media.giphy.com/media/BdET7Vn7zxylgijQBo/giphy.gif)
### [Item Page](https://daylightdonuts.vercel.app/menu/Glaze)
Shows the selected product in detail and is where the customer can modify the product (such as add frostings) and add the product to their cart.
### [Checkout Page](https://daylightdonuts.vercel.app/checkout)
Displays the customer's cart and subtotal and allows the customer to modify their cart before completing the purchase.
### Orders Page (Admin Only)
Presents the orders within a specified range and allows the owner to pick a date range within a relative time frame or an absolute time frame.
![Orders Gif](https://media.giphy.com/media/Q4O8Ac0BNxxqNGCt85/giphy.gif)
### Order Analytics (Admin Only)
Displays the amount of donuts sold or the gross revenue for each day of the week within a specified range.
![Analytics Gif](https://media.giphy.com/media/DjVcqm2FVEqQUmfeZq/giphy.gif)