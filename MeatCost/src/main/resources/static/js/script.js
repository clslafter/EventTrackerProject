window.addEventListener('load', function(){
	console.log('script.js loaded');
	init();
});

function init() {
	//TODO: setup event listeners
	
	//In an on load event lister, call a function that executes an 
	//XMLHttpRequest to get all of your event objects.
	loadMeatPurchases();
	
	//TODO:load initial data
	//TODO: add event listerner to add Store Button
	document.addStoreForm.addStore.addEventListener('click', buildStore);
	
	
}





function loadMeatPurchases() {
	//TODO: XHR to get the list
	//TODO GET api/purchases List of all purchases
 	let xhr = new XMLHttpRequest();
	xhr.open('GET', '/api/purchases');
	xhr.onreadystatechange = function(){
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				//TODO: show data
				let purchases = JSON.parse(xhr.responseText);
				displayPurchases(purchases);
			}
			else {
				//TODO: display error
				error('Error getting purchases' + xhr.status);
			}
		}
	};
	xhr.send();
}


function error (msg) {
	let errorsDiv = document.getElementById('errorsDiv');
	errorsDiv.textContent = '';
	let h4 = document.createElement('h4');
	h4.textContent = msg;
}

function displayPurchases(purchases){
	//TODO: add purchases to DOM
	let tbody = document.getElementById('purchaseTableBody');
	tbody.textContent = '';
	
	if(purchases && Array.isArray(purchases) && purchases.length > 0 ) {
		for (let purchase of purchases) {
			let tr = document.createElement('tr');
			let td = document.createElement('td');
			td.textContent = purchase.id;
			tr.appendChild(td);
			td = document.createElement('td');
			td.textContent = purchase.type;
			tr.appendChild(td);
			td = document.createElement('td');
			td.textContent = purchase.cut;
			tr.appendChild(td);
			td = document.createElement('td');
			td.textContent = purchase.priceInUsd;
			tr.appendChild(td);
			td = document.createElement('td');
			td.textContent = purchase.pricePerPound;
			tr.appendChild(td);
			td = document.createElement('td');
			td.textContent = purchase.weightInPounds;
			tr.appendChild(td);
			td = document.createElement('td');
			td.textContent = purchase.onSale ? 'Yes' : 'No';
			tr.appendChild(td);
			td = document.createElement('td');
			let pdate = new Date(purchase.purchaseDate)
			td.textContent = pdate.toDateString();
			tr.appendChild(td);
			td = document.createElement('td');
			td.textContent = purchase.store.name;
			tr.appendChild(td);
			
			tbody.appendChild(tr);
			tr.addEventListener('click',function(e){
			getPurchase(purchase.id);
	});
			
		}
	} 
	//TODO: Button to add a purchase
	
	
}

function getPurchase(purchaseId) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `/api/purchases/${purchaseId}`);
	xhr.onreadystatechange = function(){
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				//TODO: show data
				let purchase = JSON.parse(xhr.responseText);
				displayPurchase(purchase);
			}
			else {
				//TODO: display error
				error('Error getting purchases' + xhr.status);
			}
		}
	};
	xhr.send();
}

function displayPurchase (purchase) {
	let purchasesDiv = document.getElementById('purchasesDiv');
	purchasesDiv.style.display = 'none';
	
	
	let purchaseDiv = document.getElementById('purchaseByIdDiv');
	purchaseDiv.textContent = '';
	purchaseDiv.style.display = 'block';
	let ul = document.createElement('ul');
	let li = document.createElement('li');
	li.textContent = `Purchase Id: ${purchase.id}`;
	ul.appendChild(li);
	li = document.createElement('li');
	li.textContent = `Type of Meat: ${purchase.type}`;
	ul.appendChild(li);
	li = document.createElement('li');
	li.textContent = `Cut of Meat: ${purchase.cut}`;
	ul.appendChild(li);
	li = document.createElement('li');
	li.textContent = `Total Price: ${purchase.priceInUsd}`;
	ul.appendChild(li);
	li = document.createElement('li');
	//TODO: Fill out the rest of the information here
	li.textContent = `Street Address: ${purchase.store.address.street}`;
	ul.appendChild(li);
	
	purchaseDiv.appendChild(ul);
	
	//Button to edit purchase.
	//Button to delete purchase.
	
	
	
	let backButton = document.createElement('button');
	backButton.textContent = 'Back to List';
	purchaseDiv.appendChild(backButton);
	backButton.addEventListener('click', function(e) {
		purchasesDiv.style.display = 'block';
		purchaseDiv.style.display = 'none';
		
	})
	
}

function buildStore(e) {
	e.preventDefault();
//	let inputs = [];
	
//	for (let child of e.target.parentElement.children) {
//			if (child.tagName === 'INPUT' || child.tagName === 'SELECT') {
//				console.log(child.value);
//				inputs.push(child.value);
//			}
//		}

		let store = {
			name: addStoreForm.name.value,
			address: {
				street: addStoreForm.street.value,
				street2: addStoreForm.street2.value,
				city: addStoreForm.city.value,
				state: addStoreForm.state.value,
				zip: addStoreForm.zip.value,
				
			}
		};


		addNewStore(store);
}

function addNewStore(store) {

	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/stores', true);


	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200 || xhr.status == 201) { // Ok or Created
				let data = JSON.parse(xhr.responseText);
				console.log(data);
				displayStore(data);

			}
			else {
				console.error("POST request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
				displayError('Error creating store: ' + xhr.status + ': ' + xhr.responseText);
			}
		}
	};


	

	let userStoreJson = JSON.stringify(store);
	xhr.setRequestHeader("Content-type", "application/json");

	xhr.send(userStoreJson);

}

function displayStore(store) {
	let purchasesDiv = document.getElementById('purchasesDiv');
	purchasesDiv.style.display = 'none';
	
	let addStoreDiv = document.getElementById('addStoreDiv');
	addStoreDiv.style.display = 'none';
	
	
	let storeAddedDiv = document.getElementById('storeAddedDiv');
	storeAddedDiv.textContent = '';
	storeAddedDiv.style.display = 'block';
	
	let h3 = document.createElement('h3');
	h3.textContent = 'Store Successfully Added!';
	storeAddedDiv.appendChild(h3);
	
	let ul = document.createElement('ul');
	let li = document.createElement('li');
	li.textContent = `Store Id: ${store.id}`;
	ul.appendChild(li);
	li = document.createElement('li');
	li.textContent = `Store Name: ${store.name}`;
	ul.appendChild(li);
	li = document.createElement('li');
	li.textContent = `Street Address: ${store.address.street}`;
	ul.appendChild(li);
	li = document.createElement('li');
	li.textContent = `Unit: ${store.address.street2}`;
	ul.appendChild(li);
	li = document.createElement('li');
	li.textContent = `City: ${store.address.city}`;
	ul.appendChild(li);
	li = document.createElement('li');
	li.textContent = `State: ${store.address.state}`;
	ul.appendChild(li);
	li = document.createElement('li');
	li.textContent = `Zip Code: ${store.address.zip}`;
	ul.appendChild(li);
	//TODO: Fill out the rest of the information here
	
	storeAddedDiv.appendChild(ul);
	
	//Button to edit purchase.
	//Button to delete purchase.
	
	
	
	let backButton = document.createElement('button');
	backButton.textContent = 'Back to List';
	storeAddedDiv.appendChild(backButton);
	backButton.addEventListener('click', function(e) {
		purchasesDiv.style.display = 'block';
		storeAddedDiv.style.display = 'none';
		addStoreDiv.style.display = 'block';
		
	})
	
}
