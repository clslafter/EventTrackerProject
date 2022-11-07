# EventTrackerProject

## Overview

This is a web based application that allows the user to track the price of meat over time through purchases made.

## Description
The user can
  * Retrieve a list of purchases, which will include the store and its address
    http://localhost:8086/api/purchases
  * Retrieve a purchase using its id in the database
    http://localhost:8086/api/purchases/id
  * Create a new purchase which will be persisted in the database
    http://localhost:8086/api/purchases
  * Update a purchase to be saved in the database
    http://localhost:8086/api/purchases/id
  * Delete a purchase from the database
    http://localhost:8086/api/purchases/id
  * Retrieve a list of purchases by the type of meat or the cut of meat
  http://localhost:8086/api/purchases/search/{keyword}
  * Retrieve a list of purchases by the store id in the database
    http://localhost:8086/api/stores/id/purchases
  * Retrieve a list of purchases by the store name
    http://localhost:8086/api/stores/search/name/purchases
  * Retrieve a list of purchases by a given price range
    http://localhost:8086/api/purchases/search/price/low/high
  * Retrieve the list of stores in the database, which will include purchases made at that store and the address
    http://localhost:8086/api/stores
  * Retrieve a store by its id in the database
    http://localhost:8086/api/stores/id
  * Create a store which will be persisted in the database
    http://localhost:8086/api/stores
  * Update a store to be saved in the database
    http://localhost:8086/api/stores/id
  * Delete a store from the database
    http://localhost:8086/api/stores/id
  * Retrieve a list of stores by city or state
    http://localhost:8086/api/stores/search/keyword
  * Retrieve a list of stores by street name
    http://localhost:8086/api/stores/search/street/streetName
  * Retrieve the list of addresses
    http://localhost:8086/api/addresses
  * Retrieve an address by its id in the database
    http://localhost:8086/api/addresses/id
  * Create a new address which will be persisted in the database
    http://localhost:8086/api/addresses
  * Update an address to be saved in the database
    http://localhost:8086/api/addresses/id
  * Delete an address from the database
    http://localhost:8086/api/addresses/id


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

##How to Download and Run
  Once the application is deployed, go to:
  http://34.199.44.84:8080/MeatCost



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
