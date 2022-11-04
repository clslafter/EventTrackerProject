package com.skilldistillery.meatcost.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.meatcost.entities.MeatPurchase;
import com.skilldistillery.meatcost.repositories.MeatPurchaseRepository;

@Service
public class MeatPurchaseServiceImpl implements MeatPurchaseService {
	
	@Autowired
	private MeatPurchaseRepository purchaseRepo;

	@Override
	public List<MeatPurchase> listAllPurchases() {
		return purchaseRepo.findAll();
	}

	@Override
	public MeatPurchase showPurchase(int purchaseId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public MeatPurchase createPurchase(MeatPurchase purchase) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public MeatPurchase updatePurchase(int purchaseId, MeatPurchase purchase) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean deletePurchase(int purchaseId) {
		// TODO Auto-generated method stub
		return false;
	}

}
