package com.skilldistillery.meatcost.services;

import java.util.List;

import com.skilldistillery.meatcost.entities.Address;

public interface AddressService {
	List<Address> listAllAddresses();
	Address showAddress(int addressId);
	Address createAddress(Address address);
	Address updateAddress(int addressId, Address address);
	boolean deleteAddress(int addressId);

}
