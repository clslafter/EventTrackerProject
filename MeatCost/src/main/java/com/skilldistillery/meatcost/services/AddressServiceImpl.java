package com.skilldistillery.meatcost.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.meatcost.entities.Address;
import com.skilldistillery.meatcost.repositories.AddressRepository;

@Service
public class AddressServiceImpl implements AddressService {
	
	@Autowired
	private AddressRepository addressRepo;

	@Override
	public List<Address> listAllAddresses() {
		return addressRepo.findAll();
	}

	@Override
	public Address showAddress(int addressId) {
		Optional<Address> op = addressRepo.findById(addressId);
		Address address = null;
		
		if (op.isPresent()) {
			address = op.get();
		}
		return address;
	}

	@Override
	public Address createAddress(Address address) {
		
		return addressRepo.saveAndFlush(address);
	}

	@Override
	public Address updateAddress(int addressId, Address address) {
		Address managed = showAddress(addressId);
		managed.setStreet(address.getStreet());
		managed.setStreet2(address.getStreet2());
		managed.setCity(address.getCity());
		managed.setState(address.getState());
		managed.setZip(address.getZip());
		managed.setStore(address.getStore());
		return addressRepo.save(managed);
	}

	@Override
	public boolean deleteAddress(int addressId) {
		addressRepo.deleteById(addressId);
		return (!addressRepo.existsById(addressId));
	}

}
