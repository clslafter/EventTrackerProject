package com.skilldistillery.meatcost.services;

import java.util.List;

import com.skilldistillery.meatcost.entities.MeatPurchase;

public interface MeatPurchaseService {
	List<MeatPurchase> listAllPurchases();
	MeatPurchase showPurchase(int purchaseId);
	MeatPurchase createPurchase(MeatPurchase purchase);
	MeatPurchase updatePurchase(int purchaseId, MeatPurchase purchase);
	boolean deletePurchase(int purchaseId);
	
	List<MeatPurchase> getByStoreId(int storeId);
	List<MeatPurchase> getByStoreName(String name);
	List<MeatPurchase> getByTypeOrCut(String keyword);
	List<MeatPurchase> listByPricePerPoundBetween(double low, double high);
	

}
