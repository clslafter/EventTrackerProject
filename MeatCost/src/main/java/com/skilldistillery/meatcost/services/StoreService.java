package com.skilldistillery.meatcost.services;

import java.util.List;

import com.skilldistillery.meatcost.entities.Store;

public interface StoreService {
	List<Store> listAllStores();
	Store showStore(int storeId);
	Store createStore(Store store);
	Store updateStore(int storeId, Store store);
	boolean deleteStore(int storeId);
	
	List<Store> getByCityOrState(String keyword);
	
	List<Store> getByStreet(String street);

}
