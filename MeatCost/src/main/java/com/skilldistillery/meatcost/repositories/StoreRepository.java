package com.skilldistillery.meatcost.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.meatcost.entities.Store;

public interface StoreRepository extends JpaRepository<Store, Integer> {

	List<Store> findByAddressCityLikeOrAddressStateLike(String keyword1, String keyword2);

	List<Store> findByAddressStreetLike(String keyword);
}
