package com.skilldistillery.meatcost.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.meatcost.entities.Store;
import com.skilldistillery.meatcost.services.StoreService;

@RestController
@RequestMapping("api")
public class StoreController {
	
	@Autowired
	private StoreService storeSvc;
	
	@GetMapping("stores")
	public List<Store> listStores () {
		return storeSvc.listAllStores();
	}

}
