package com.skilldistillery.meatcost.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.meatcost.entities.MeatPurchase;

public interface MeatPurchaseRepository extends JpaRepository<MeatPurchase, Integer> {

}
