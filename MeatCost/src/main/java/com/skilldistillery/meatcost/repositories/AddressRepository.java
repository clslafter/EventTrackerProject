package com.skilldistillery.meatcost.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.meatcost.entities.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {

}
