package com.skilldistillery.meatcost.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.meatcost.entities.Address;
import com.skilldistillery.meatcost.services.AddressService;

@CrossOrigin({"*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class AddressController {
	
	@Autowired
	private AddressService addressSvc;
	
	@GetMapping("addresses")
	public List<Address> listAddresses () {
		return addressSvc.listAllAddresses();
	}
	
	@GetMapping("addresses/{id}")
	public Address getAddress (@PathVariable int id, HttpServletResponse res) {
		Address address = addressSvc.showAddress(id);
		if(address == null) {
			res.setStatus(404);
		}
		
		return address;
	}
	
	@PostMapping("addresses")
	public Address createNewAddress (@RequestBody Address address, HttpServletResponse res, HttpServletRequest req) {
		try {
			addressSvc.createAddress(address);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(address.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return address;
	}
	
	@PutMapping ("addresses/{id}")
	public Address updateAddress (@PathVariable int id, @RequestBody Address address, HttpServletResponse res) {
		try {
			address = addressSvc.updateAddress(id, address);
			if (address == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {

			e.printStackTrace();
			res.setStatus(404);
			address = null;
		}		
		return address;
	}
	
	@DeleteMapping ("addresses/{id}")
	public void deleteAddress (@PathVariable int id, HttpServletResponse res) {
		
		try {
			if (addressSvc.deleteAddress(id)) {
				res.setStatus(204);
			} else {
				res.setStatus(404);
			}
		} catch (Exception e) {
			
			e.printStackTrace();
			res.setStatus(400);
		}
		
	}
	

}
