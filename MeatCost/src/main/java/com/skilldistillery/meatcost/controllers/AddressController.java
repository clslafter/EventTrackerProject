package com.skilldistillery.meatcost.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.meatcost.entities.Address;
import com.skilldistillery.meatcost.services.AddressService;

@RestController
@RequestMapping("api")
public class AddressController {
	
	@Autowired
	private AddressService addressSvc;
	
	@GetMapping("addresses")
	public List<Address> listAddresses () {
		return addressSvc.listAllAddresses();
	}

}
