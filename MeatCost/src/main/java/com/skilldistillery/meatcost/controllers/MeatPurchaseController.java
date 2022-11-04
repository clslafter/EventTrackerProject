package com.skilldistillery.meatcost.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.meatcost.entities.MeatPurchase;
import com.skilldistillery.meatcost.services.MeatPurchaseService;

@RestController
@RequestMapping("api")
public class MeatPurchaseController {

	@Autowired
	private MeatPurchaseService purchaseSvc;
	
	@GetMapping("purchases")
	public List<MeatPurchase> listPurchases () {
		return purchaseSvc.listAllPurchases();
	}
}
