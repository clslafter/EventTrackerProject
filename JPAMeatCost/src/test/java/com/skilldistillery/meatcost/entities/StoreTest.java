package com.skilldistillery.meatcost.entities;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class StoreTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Store store;

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
		store = em.find(Store.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		store = null;
	}


	@Test
	void test_Store_entity_mapping() {
		assertNotNull(store);
		assertEquals("Wal-Mart Neighborhood Market", store.getName());
	}

	
	@Test
	void test_Store_purchases_mapping() {
		assertNotNull(store);
		assertTrue(store.getPurchases().size() > 0);
		
	}
	
	@Test
	void test_Store_address_mapping() {
		assertNotNull(store);
		assertEquals("637 Robert Blvd", store.getAddress().getStreet());
		
	}
}
