package com.skilldistillery.meatcost.controllers;



import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@GetMapping("purchases/{id}")
	public MeatPurchase getPurchase (@PathVariable int id, HttpServletResponse res) {
		MeatPurchase purchase = purchaseSvc.showPurchase(id);
		if(purchase == null) {
			res.setStatus(404);
		}
		
		return purchase;
	}
	
	@PostMapping("purchases")
	public MeatPurchase createNewPurchase (@RequestBody MeatPurchase purchase, HttpServletResponse res, HttpServletRequest req) {
		try {
			purchaseSvc.createPurchase(purchase);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(purchase.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return purchase;
	}
	
	@PutMapping ("purchases/{id}")
	public MeatPurchase updatePurchase (@PathVariable int id, @RequestBody MeatPurchase purchase, HttpServletResponse res) {
		try {
			purchase = purchaseSvc.updatePurchase(id, purchase);
			if (purchase == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {

			e.printStackTrace();
			res.setStatus(404);
			purchase = null;
		}		
		return purchase;
	}
	
	@DeleteMapping ("purchases/{id}")
	public void deletePurchase (@PathVariable int id, HttpServletResponse res) {
		
		try {
			if (purchaseSvc.deletePurchase(id)) {
				res.setStatus(204);
			} else {
				res.setStatus(404);
			}
		} catch (Exception e) {
			
			e.printStackTrace();
			res.setStatus(400);
		}
		
	}
	
	@GetMapping("stores/{id}/purchases")
	public List<MeatPurchase> listPurchasesByStoreId (@PathVariable int id, HttpServletResponse res) {
		List<MeatPurchase> purchases = purchaseSvc.getByStoreId(id);
		
		return purchases;
	}

	@GetMapping("stores/search/{name}/purchases")
	public List<MeatPurchase> listPurchasesByStoreName (@PathVariable String name, HttpServletResponse res) {
		List<MeatPurchase> purchases = purchaseSvc.getByStoreName("%" + name + "%");
		
		return purchases;
	}
	
	@GetMapping("purchases/search/{keyword}")
	public List<MeatPurchase> listPurchasesByKeyword (@PathVariable String keyword, HttpServletResponse res) {
		List<MeatPurchase> purchases = purchaseSvc.getByTypeOrCut("%" + keyword + "%");
		
		return purchases;
	}
	
	@GetMapping("purchases/search/price/{low}/{high}")
	public List<MeatPurchase> listByPricesBetween (@PathVariable double low, @PathVariable double high, HttpServletResponse res) {
		List<MeatPurchase> purchases = purchaseSvc.listByPricePerPoundBetween(low, high);
		
		return purchases;
	}
}
