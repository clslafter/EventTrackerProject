package com.skilldistillery.meatcost.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.skilldistillery.meatcost.entities.Store;
import com.skilldistillery.meatcost.repositories.AddressRepository;
import com.skilldistillery.meatcost.repositories.StoreRepository;

public class StoreServiceImpl implements StoreService {
	
	@Autowired
	private StoreRepository storeRepo;
	
	@Autowired
	private AddressRepository addressRepo;

	@Override
	public List<Store> listAllStores() {
		return storeRepo.findAll();
	}

	@Override
	public Store showStore(int storeId) {
		Optional<Store> op = storeRepo.findById(storeId);
		Store store = null;
		
		if (op.isPresent()) {
			store = op.get();
		}
		return store;
	}

	@Override
	public Store createStore(Store store) {
		
		return storeRepo.saveAndFlush(store);
	}

	@Override
	public Store updateStore(int storeId, Store store) {
		Store managed = showStore(storeId);
		managed.setName(store.getName());
		managed.setAddress(store.getAddress());
		managed.setPuchases(store.getPurchases());
		return storeRepo.save(managed);
	}

	@Override
	public boolean deleteStore(int storeId) {
		storeRepo.deleteById(storeId);
		return (!storeRepo.existsById(storeId));
	}

	@Override
	public List<Store> getByCityOrState(String keyword) {
		
		return storeRepo.findByAddressCityLikeOrAddressStateLike(keyword, keyword);
	}

	@Override
	public List<Store> getByStreet(String street) {
		
		return storeRepo.findByAddressStreetLike(street);
	}

}
