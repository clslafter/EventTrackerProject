package com.skilldistillery.meatcost.services;

import java.util.List;

import com.skilldistillery.meatcost.entities.MeatPurchase;

public interface MeatPurchaseService {
	List<MeatPurchase> listAllPurchases();
	MeatPurchase showPurchase(int purchaseId);
	MeatPurchase createPurchase(MeatPurchase purchase);
	MeatPurchase updatePurchase(int purchaseId, MeatPurchase purchase);
	boolean deletePurchase(int purchaseId);
	

}
