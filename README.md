# EventTrackerProject

## Overview

This is a web based application that allows the user to track the price of meat over time through purchases made.

## Description
On the back end there is the ability to
  * Retrieve a list of purchases, which will include the store and its address   
  * Retrieve a purchase using its id in the database=
  * Create a new purchase which will be persisted in the database
  * Update a purchase to be saved in the database
  * Delete a purchase from the database
  * Retrieve a list of purchases by the type of meat or the cut of meat
  * Retrieve a list of purchases by the store id in the database
  * Retrieve a list of purchases by the store name
  * Retrieve a list of purchases by a given price range
  * Retrieve the list of stores in the database, which will include purchases made at that store and the address
  * Retrieve a store by its id in the database
  * Create a store which will be persisted in the database
  * Update a store to be saved in the database
  * Delete a store from the database
  * Retrieve a list of stores by city or state
  * Retrieve a list of stores by street name
  * Retrieve the list of addresses
  * Retrieve an address by its id in the database
  * Create a new address which will be persisted in the database
  * Update an address to be saved in the database
  * Delete an address from the database

From the front end, the user can 
 * view a list of all the purchase
 * select a purchase from the list to view its details, including the store name and address
 * edit a purchase
 * add a purchase
 * add a store
 * delete a store
 * view the average cost of meat per pound from all the purchases


## Technologies Used
  * Java
  * MySQL
  * MySQL Workbench
  * Atom
  * REST API
  * Unix Terminal
  * Spring
  * Spring Boot
  * JPA
  * Spring Tools Suite
  * Chrome
  * git/gitHub


##Lessons Learned
  * For similar methods, like find store by city and find store by street, it is necessary to make the mapping different enough for the program to be able to discern, or it becomes ambiguous mapping
  * JsonIgnoreProperties is useful for being able to list other entities as part of the search entity without causing a stack overflow

I was particularly proud of having figured out the dates format to display dates in a readable form, and also the toISOString with a substring to send dates from Javascript to the HTML form to prepopulate a form value as a datetime-local type.

The front end part of this project resulted in lots of time spent solving issues that turned out to be minor fixes.
One issue that took me several hours on the edit part of the project was a result of saving the values from the form too soon, so the new purchase creation from the form only needed to be moved down a few lines into the click event.

There were other issues, almost all related to click events where displays would get repeated with each click, and I'd have to figure out where to delete or nullify an element before the next click. I think there are probably more issues with clicks that I have not caught because I spent so much time on a few issues, leaving me very little time to test the functionality of every piece of the project.

There was another challenge with hiding elements and making them reappear that wasn't working for hours. It perplexed me, and a classmate reminded me of the cmd+shift+r for a hard reset. Once I remembered that, everything was working.

Another very stressing issue was that when I deployed the project to EC2, the purchase list was not loading, and neither was the store list. I would not have figured this out if it weren't for an instructor answering a fellow classmate's question about the leading slash. That solved the issue.

There is one final issue which I could not solve. I'm sure it has to do with a click event, but cannot figure out where to nullify and what exactly to nullify. The issue stems when editing a purchase, going back to the purchase list, and clicking a new purchase to edit. In this sequence of events, the xhr method pulls in the new and all previous purchases and edits them all to the new information. I have tried various console.logs to figure out where the problem is, and a classmate also attempted to help. I think I've localized the issue to something involving the click event on the table row that's in the loop to create the purchase list. I noticed that on the second click, two objects are passed into the xhr get, and each click after that adds another object without the previous object being dropped. While I think I've figured out where the issue is, I haven't figured out how to remove the previous objects from being passed through.
-- Update: with help from an instructor, I was able to solve this issue. It was a matter of stacking click event listeners. The solution was to take the form submit button event listener out of the function that is called by a previous event listener.

If I could have figured out this issue and had more time, I would have added more get requests based on the back-end functionality and the ability to delete a store. I would have also created a new method in the repository to get purchases by a date range to figure the averages by a specific date range. Lastly, I would have spent more time on the workflow and appearance of the project.

##How to Download and Run
  Go to:
  [http://34.199.44.84:8080/MeatCost](http://34.199.44.84:8080/MeatCost/)



  | CRUD Op. | HTTP Verb | URI                  | Request Body | Response Body |
|----------|-----------|----------------------|--------------|---------------|
| Read     | GET       | `/api/purchases`     |              | List of all meat purchases |
| Read     | GET       | `/api/purchases/{id}`|              | Representation of one purchase by id|
| Create   | POST      | `/api/purchases`     | JSON for new purchase | JSON of created purchase |
| Update   | PUT       | `/api/purchases/{id}`| JSON to update purchase| JSON of updated purchase |
| Delete   | DELETE    | `/api/purchases/{id}`  |              |                |
| Read     | GET       | `/api/stores/{id}/purchases`|              | List of purchases by store id |
| Read     | GET       | `/api/stores/search/{name}/purchases`|              | List of purchases by store name|
| Read     | GET       | `/api/purchases/search/{keyword}`|              | List of purchases by meat type or cut|
| Read     | GET       | `/api/purchases/search/price/{low}/{high}`|       | List of purchases by price range in ascending order|
| Read     | GET       | `/api/stores`     |              | List of all stores |
| Read     | GET       | `/api/stores/{id}`|              | Representation of one store by id |
| Create   | POST      | `/api/stores`     | JSON for new store | JSON of created store|
| Update   | PUT       | `/api/stores/{id}`| JSON to update store | JSON of updated store |
| Delete   | DELETE    | `/api/stores/{id}`  |              |                |
| Read     | GET       | `/api/stores/search/{keyword}`|              | List of stores by city or state |
| Read     | GET       | `/api/stores/search/street/{street}`|              | List of purchases by street name|
| Read     | GET       | `/api/addresses`     |              | List of all addresses |
| Read     | GET       | `/api/addresses/{id}`|              | Representation of one address by id |
| Create   | POST      | `/api/addresses`     | JSON for new address | JSON of created address|
| Update   | PUT       | `/api/addresses/{id}`| JSON to update address| JSON of updated address|
| Delete   | DELETE    | `/api/addresses/{id}`  |              |                |
