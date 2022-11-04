package com.skilldistillery.meatcost.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
public class Store {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String name;
	
	@OneToMany(mappedBy="store")
	@JsonIgnoreProperties({"store"})
	private List<MeatPurchase> purchases;
	
	@OneToOne
	@JoinColumn(name="address_id")
	private Address address;
	
//	methods
	
	public Store() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	
	
	public List<MeatPurchase> getPurchases() {
		return purchases;
	}

	public void setPuchases(List<MeatPurchase> purchases) {
		this.purchases = purchases;
	}
	
	public void addPurchase(MeatPurchase purchase) {
		if (purchases == null)
			purchases = new ArrayList<>();
		if (!purchases.contains(purchase)) {
			purchases.add(purchase);
			if (purchase.getStore() != null) {
				purchase.getStore().getPurchases().add(purchase);
			}
			purchase.setStore(this);
		}
	}

	public void removePurchase(MeatPurchase purchase) {
		if (purchases != null) {
			purchases.remove(purchase);
			purchase.setStore(null);
		}
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Store other = (Store) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Store [id=" + id + ", name=" + name + "]";
	}
	
	
}
