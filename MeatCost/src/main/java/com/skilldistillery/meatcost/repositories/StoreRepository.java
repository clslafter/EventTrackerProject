package com.skilldistillery.meatcost.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.meatcost.entities.Store;

public interface StoreRepository extends JpaRepository<Store, Integer> {

}
