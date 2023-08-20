
# Daylight Donuts eCommerce Website

*Inspired by my job of making donuts overnight.*

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
  - [User Features](#user-features)
    - [Adding Items to Cart](#adding-items-to-cart)
    - [Donut Box Builder](#donut-box-builder-discount)
    - [Checkout with PayPal or Stripe](#checkout-with-paypal-or-stripe)
    - [Account Creation and Order History](#account-creation-and-order-history)
  - [Admin Features](#admin-features)
	  - [Order Viewing and Printing](#order-viewing-and-printing)
    - [Sales Analytics](#sales-analytics)
    - [Menu Management](#menu-management)
- [Website Pages](#website-pages)
	- [Home](#home)
	- [Menu](#menu)
	- [Menu Item](#menu-item)
	- [Donut Box Builder](#donut-box-builder)
	- [Checkout](#checkout)
	- [Account](#account)
	- [Orders](#orders)
	- [Admin Analytics](#admin-analytics)
	- [Admin Menu Modification](#admin-menu-modification)

## Project Overview

Inspired by my job of making donuts overnight the past two summers, the Daylight Donuts eCommerce Website is a tribute to those memories. Each product image features a donut that has been hand-made by me during those overnight shifts, infusing the website with even more of a personal touch.

This project has seen three versions since the summer of 2022. The first version marked the beginning of my journey into web development, where I took my freshly acquired skills in React.js and Next.js and embarked on creating my first-ever website. The first version was created using JavaScript with Next.js and using MongoDB as the database component.

The second version builds upon the foundation of the first version. It refines and enhances the features that were initially introduced while embracing the power of TypeScript and using PostgreSQL for the database instead of MongoDB.

The third version, a work in progress, includes more admin features and also utilizes PostgreSQL functions and stored procedures for data retrieval and modification. It also involves a deeper focus on code modularity for better code maintainability and reuse.

## Features

### User Features

#### Adding Items to Cart

Upon adding the first item to the cart, a JWT is created and stored in the user's cookies. This JWT holds the user's cartId,  allowing their cart to persist and be retrieved if they decide to leave and come back to the website.

When adding items to the cart, the client cart state optimistically updates while the cart updates are sent to the server to be updated in the database. If an error does occur, the client cart state will roll back to the last known stable state so the user does not continue with incorrect data. Cart updates are batched to optimize the user experience and server performance. When a user adds items to their cart within a specific interval, the updates are sent to the server once a timer expires. This approach prevents the server from being inundated with rapid-fire update requests, ensuring a smoother and more controlled interaction. From the user's perspective, cart updates occur seamlessly and instantaneously. 
> See: [Menu Page](#menu)

---

#### "Donut Box Builder" Discount

At Daylight Donuts, and many other donut companies, the customer receives a discount when they purchase a dozen donuts, but not all donuts are eligible for this discount. By visiting the Dount Box Builder, the customer has the ability to know which donuts are eligible for the discount as well as build their own box with the donuts.
>See: [Donut Box Builder](#donut-box-builder)

---

#### Checkout with PayPal or Stripe

Users have the option of paying with either PayPal or Stripe, allowing them to choose whichever option is most convenient while knowing their payment will be secure. When the user completes the checkout form and submits an order, the Stripe/PayPal API handles the payment. Once the payment is verified by Stripe/PayPal, a webhook endpoint is set up to catch successful payments, verify the sender of the webhook request, and verify the order in the database. 

>See: [Checkout](#checkout)

#### Account Creation and Order History

Users have the option of creating an account by signing up with Google which offers benefits such as viewing order history and faster checkout by having the ability to save checkout details. This also enables future features such as reward points for users.

>See: [Account](#account)

---

### Admin Features

#### Order Viewing and Printing

The admin has the ability to view orders and sort them by the current day, week, and month. By utilizing a DYMO printer, the admin also has the ability to directly print orders from the website. 
>See: [Orders](#orders)

---

#### Sales Analytics

With the analytics page, the admin can view various analytics about the orders they have received by utilizing the filters provided. These filters can help provide very specific data that the admin can leverage for informed decision-making and insights into customer preferences.
>See: [Admin Analytics](#admin-analytics)

---

#### Menu Management


There are seven main components to the menu:
1. Items
> The items that the user can purchase.
2. Item Categories
>The categories that are used to filter items (e.g. donuts, savory, featured, etc...).
3. Item Subcategories
>The subcategories that are used to filter items within a category (e.g. the raised, cake, and specialty subcategories within the 'donuts' category).
4. Item Groupings
>The items that can be grouped together to gain a discount (Donut Box Builder). *The admin has the ability to create as many groupings as they want and determine the number of items needed and the discount offered for each grouping.
5. Item Extras
>The extras that can be applied to an item (e.g. chocolate, maple, or vanilla frosting for a glazed donut).
6. Extra Categories
>The categories that are used to label extras (e.g. frosting, topping, size, etc...).
7. Extra Groups
>The groups of specific extras used to easily update/apply extras to an item (e.g. the 'Generic Frosting' group that consists of chocolate and maple can be applied to the glazed and chocolate donut instead of applying each individual extra to each item).

Each of these components encompasses a variety of details that can be modified, a capability that the admin has through the dedicated admin dashboard.
>See: [Admin Menu Modification](#admin-menu-modification)

## Website Pages

### Home
<div>
<img 
src="https://res.cloudinary.com/dwg1i9w2u/image/upload/v1691982803/HomePage_bsj5jq.png" alt="Menu Page" width="50%" display="inline"/> 
<img src="https://res.cloudinary.com/dwg1i9w2u/image/upload/v1691983295/HomePage2_znxqxt.png" alt="Menu Page" width="50%" display="inline"/> 
</div>

---

### Menu

<img src="https://res.cloudinary.com/dwg1i9w2u/image/upload/v1691983884/Menu_bmn3nf.png" alt="Menu Page" width="50%"/>

---

### Menu Item


|  |  | 
|:-------:|:-------:| 
|<img src="https://res.cloudinary.com/dwg1i9w2u/image/upload/v1691983884/Item_q2sjgh.png" alt="Menu Item Page"/>|<img src="https://res.cloudinary.com/dwg1i9w2u/image/upload/v1692485064/Adding_Items_To_Cart_ayquwx.gif" alt="Adding Items to cart"/>

---

### Donut Box Builder


| Dozenable Menu Tab | Creating a Box of Donuts | 
|:-------:|:-------:| 
| <img src="https://res.cloudinary.com/dwg1i9w2u/image/upload/v1691983884/Dozenable_o1lr6s.png" alt="Dozenable Menu Tab"/> | <img src="https://media.giphy.com/media/BdET7Vn7zxylgijQBo/giphy.gif" alt="Creating a box of donuts"/>

---

### Checkout

<img src="https://res.cloudinary.com/dwg1i9w2u/image/upload/v1692037868/Checkout_gvjkn0.gif" alt="Checkout Process" width="50%"/>

---

### Account

#### Account Creation

<img src="https://res.cloudinary.com/dwg1i9w2u/image/upload/v1692485063/Creating_Account_j8jt4e.gif" alt="Creating an account" width="50%"/>

#### Order History

<img src="https://res.cloudinary.com/dwg1i9w2u/image/upload/v1692485063/Account_Order_ga97dy.gif" alt="Viewing order from account page" width="50%"/>

---

### Orders

<img src="https://res.cloudinary.com/dwg1i9w2u/image/upload/v1692486347/Orders_tkwtau.png" alt="Order Page" width="50%"/>

https://user-images.githubusercontent.com/107196545/217406560-07112f40-6c56-4291-bc28-8a6b682934cf.MP4

---

### Admin Analytics

<img src="https://res.cloudinary.com/dwg1i9w2u/image/upload/v1692485068/Analytics_krxjmw.gif" alt="Admin Analytics Page" width="50%"/>

---

### Admin Menu Modification

#### Item Creation

<img src="https://res.cloudinary.com/dwg1i9w2u/image/upload/v1692040996/Item_Creation_yde7iw.gif" alt="Creating a new item" width="50%"/>

---

#### Item Modification

<img src="https://res.cloudinary.com/dwg1i9w2u/image/upload/v1692040998/Modify_Item_vay5b0.gif" alt="Modifying created item" width="50%"/>

---

#### Interacting With Created Item

<img src="https://res.cloudinary.com/dwg1i9w2u/image/upload/v1692040996/Adding_Item_i2hlwj.gif" alt="Interacting with created item" width="50%"/>
