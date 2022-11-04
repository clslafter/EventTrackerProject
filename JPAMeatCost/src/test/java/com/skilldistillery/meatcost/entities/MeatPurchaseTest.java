package com.skilldistillery.meatcost.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class MeatPurchaseTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private MeatPurchase purchase;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPAMeatCost");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		purchase = em.find(MeatPurchase.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		purchase = null;
	}

	@Test
	void test_MeatPurchase_entity_mapping() {
		assertNotNull(purchase);
		assertEquals("chicken", purchase.getType());
		
		MeatPurchase purch2 = em.find(MeatPurchase.class, 5);
		assertNotNull(purch2);
		assertFalse(purch2.isOnSale());
		
		assertEquals(15.07, purchase.getPriceInUsd());
		
		assertEquals(2022, purchase.getPurchaseDate().getYear());
		
		assertEquals(2022, purchase.getCreateDate().getYear());
		
	}
	@Test
	void test_MeatPurchase_store_mapping() {
		assertNotNull(purchase);
		assertEquals("Wal-Mart Neighborhood Market", purchase.getStore().getName());
		
	}

}
