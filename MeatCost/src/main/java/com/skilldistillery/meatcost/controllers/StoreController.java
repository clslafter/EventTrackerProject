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

	
	@GetMapping("stores/{id}")
	public Store getStore (@PathVariable int id, HttpServletResponse res) {
		Store store = storeSvc.showStore(id);
		if(store == null) {
			res.setStatus(404);
		}
		
		return store;
	}
	
	@PostMapping("stores")
	public Store createNewStore (@RequestBody Store store, HttpServletResponse res, HttpServletRequest req) {
		try {
			storeSvc.createStore(store);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(store.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return store;
	}
	
	@PutMapping ("stores/{id}")
	public Store updateStore (@PathVariable int id, @RequestBody Store store, HttpServletResponse res) {
		try {
			store = storeSvc.updateStore(id, store);
			if (store == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {

			e.printStackTrace();
			res.setStatus(404);
			store = null;
		}		
		return store;
	}
	
	@DeleteMapping ("stores/{id}")
	public void deleteStore (@PathVariable int id, HttpServletResponse res) {
		
		try {
			if (storeSvc.deleteStore(id)) {
				res.setStatus(204);
			} else {
				res.setStatus(404);
			}
		} catch (Exception e) {
			
			e.printStackTrace();
			res.setStatus(400);
		}
		
	}
	
	@GetMapping("stores/search/{keyword}")
	public List<Store> listStoresByCityOrState (@PathVariable String keyword, HttpServletResponse res) {
		List<Store> stores = storeSvc.getByCityOrState("%" + keyword + "%");
		
		return stores;
	}

	@GetMapping("stores/search/street/{street}")
	public List<Store> listStoresByStreet (@PathVariable String street, HttpServletResponse res) {
		List<Store> stores = storeSvc.getByStreet("%" + street + "%");
		
		return stores;
	}

}
