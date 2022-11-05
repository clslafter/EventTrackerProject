package com.skilldistillery.meatcost.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.meatcost.entities.MeatPurchase;
import com.skilldistillery.meatcost.repositories.MeatPurchaseRepository;
import com.skilldistillery.meatcost.repositories.StoreRepository;

@Service
public class MeatPurchaseServiceImpl implements MeatPurchaseService {
	
	@Autowired
	private MeatPurchaseRepository purchaseRepo;
	
	@Autowired
	private StoreRepository storeRepo;

	@Override
	public List<MeatPurchase> listAllPurchases() {
		return purchaseRepo.findAll();
	}

	@Override
	public MeatPurchase showPurchase(int purchaseId) {
		Optional<MeatPurchase> op = purchaseRepo.findById(purchaseId);
		MeatPurchase purchase = null;
		
		if (op.isPresent()) {
			purchase = op.get();
		}
		return purchase;
	}

	@Override
	public MeatPurchase createPurchase(MeatPurchase purchase) {
		
		return purchaseRepo.saveAndFlush(purchase);
	}

	@Override
	public MeatPurchase updatePurchase(int purchaseId, MeatPurchase purchase) {
		MeatPurchase managed = showPurchase(purchaseId);
		managed.setCut(purchase.getCut());
		managed.setOnSale(purchase.isOnSale());
		managed.setPriceInUsd(purchase.getPriceInUsd());
		managed.setPricePerPound(purchase.getPricePerPound());
		managed.setPurchaseDate(purchase.getPurchaseDate());
		managed.setStore(purchase.getStore());
		managed.setType(purchase.getType());
		managed.setWeightInPounds(purchase.getWeightInPounds());
		
		return purchaseRepo.save(managed);
	}

	@Override
	public boolean deletePurchase(int purchaseId) {
		purchaseRepo.deleteById(purchaseId);
		return (!purchaseRepo.existsById(purchaseId));
	}

	@Override
	public List<MeatPurchase> getByStoreId(int storeId) {
		if(!storeRepo.existsById(storeId)) {
			return null;
		}
		
		return purchaseRepo.findByStoreId(storeId);
	}

	@Override
	public List<MeatPurchase> getByStoreName(String name) {
		
		return purchaseRepo.findByStore_NameLike(name);
	}

	@Override
	public List<MeatPurchase> getByTypeOrCut(String keyword) {
		
		return purchaseRepo.findByTypeLikeOrCutLike(keyword, keyword);
	}

	@Override
	public List<MeatPurchase> listByPricePerPoundBetween(double low, double high) {
		
		return purchaseRepo.findByPricePerPoundBetweenOrderByPricePerPoundAsc(low, high);
	}
	
	

}
