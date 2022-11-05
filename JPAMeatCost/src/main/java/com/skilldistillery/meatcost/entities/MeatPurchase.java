package com.skilldistillery.meatcost.entities;

import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="meat_purchase")
public class MeatPurchase {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="meat_type")
	private String type;

	@Column(name="meat_cut")
	private String cut;

	@Column(name="price_in_usdollars")
	private Double priceInUsd;

	@Column(name="price_per_pound")
	private Double pricePerPound;

	@Column(name="weight_in_pounds")
	private Double weightInPounds;

	@Column(name="on_sale")
	private Boolean onSale;

	@Column(name="purchase_date")
	private LocalDateTime purchaseDate;

	@Column(name="create_date")
	@CreationTimestamp
	private LocalDateTime createDate;
	
	@ManyToOne
	@JsonIgnoreProperties({"purchases"})
	@JoinColumn(name="store_id")
	private Store store;

	
//	methods
	
	public MeatPurchase() {
		super();
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getType() {
		return type;
	}


	public void setType(String type) {
		this.type = type;
	}


	public String getCut() {
		return cut;
	}


	public void setCut(String cut) {
		this.cut = cut;
	}


	public Double getPriceInUsd() {
		return priceInUsd;
	}


	public void setPriceInUsd(Double priceInUsd) {
		this.priceInUsd = priceInUsd;
	}


	public Double getPricePerPound() {
		return pricePerPound;
	}


	public void setPricePerPound(Double pricePerPound) {
		this.pricePerPound = pricePerPound;
	}


	public Double getWeightInPounds() {
		return weightInPounds;
	}


	public void setWeightInPounds(Double weightInPounds) {
		this.weightInPounds = weightInPounds;
	}


	public Boolean isOnSale() {
		return onSale;
	}


	public void setOnSale(Boolean onSale) {
		this.onSale = onSale;
	}


	public LocalDateTime getPurchaseDate() {
		return purchaseDate;
	}


	public void setPurchaseDate(LocalDateTime purchaseDate) {
		this.purchaseDate = purchaseDate;
	}


	public LocalDateTime getCreateDate() {
		return createDate;
	}


	public void setCreateDate(LocalDateTime createDate) {
		this.createDate = createDate;
	}


	public Store getStore() {
		return store;
	}


	public void setStore(Store store) {
		this.store = store;
	}


	@Override
	public int hashCode() {
		return Objects.hash(id);
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MeatPurchase other = (MeatPurchase) obj;
		return id == other.id;
	}


	@Override
	public String toString() {
		return "MeatPurchase [id=" + id + ", type=" + type + ", cut=" + cut + ", priceInUsd=" + priceInUsd
				+ ", pricePerPound=" + pricePerPound + ", weightInPounds=" + weightInPounds + ", onSale=" + onSale
				+ ", purchaseDate=" + purchaseDate + ", createDate=" + createDate + "]";
	}
	

}
