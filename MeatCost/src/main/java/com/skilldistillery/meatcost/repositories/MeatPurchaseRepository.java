package com.skilldistillery.meatcost.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.meatcost.entities.MeatPurchase;

public interface MeatPurchaseRepository extends JpaRepository<MeatPurchase, Integer> {

	List<MeatPurchase> findByStoreId(int storeId);

	List<MeatPurchase> findByStore_NameLike(String name);
	
	List<MeatPurchase> findByTypeLikeOrCutLike(String keyword1, String keyword2);

	List<MeatPurchase> findByPricePerPoundBetweenOrderByPricePerPoundAsc(Double low, Double high);
	
	
}
