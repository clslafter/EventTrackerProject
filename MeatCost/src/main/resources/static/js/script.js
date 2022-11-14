window.addEventListener('load', function() {
	
	init();
});

function init() {
	//TODO: setup event listeners

	//In an on load event lister, call a function that executes an 
	//XMLHttpRequest to get all of your event objects.
	//load initial data
	loadMeatPurchases();

	//add event listener to add Store Button
	document.addStoreForm.addStore.addEventListener('click', buildStore);
	//add event listener to add Purchase Button
	document.addPurchaseForm.addPurchase.addEventListener('click', buildPurchase);
	//add event listener to getById button
//	document.purchaseByIdForm.getById.addEventListener('click', function(e) {
//
//		e.preventDefault();
//		console.log('Purchase by Id event Listener')
//		
//		let purchaseId = purchaseByIdForm.purchaseById.value;
//		console.log(purchaseId);
//
//		getPurchase(purchaseId);
//	});


	loadStores();


}





function loadMeatPurchases() {
	// XHR to get the list
	//GET api/purchases List of all purchases
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/purchases');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				// show data
				let purchases = JSON.parse(xhr.responseText);
				displayPurchases(purchases);
			}
			else {
				//display error
				error('Error getting purchases' + xhr.status);
			}
		}
	};
	xhr.send();
}



function error(msg) {
	let errorsDiv = document.getElementById('errorsDiv');
	errorsDiv.textContent = '';
	let h4 = document.createElement('h4');
	errorsDiv.appendChild(h4);
	h4.textContent = msg;
	h4.style.color = "red";
}

function displayPurchases(purchases) {
//	let addStoreDiv = document.getElementById('addStoreDiv');
//	addStoreDiv.style.display = 'none';
//
//	let addPurchaseDiv = document.getElementById('addPurchaseDiv');
//	addPurchaseDiv.style.display = 'none';
//
	let editPurchaseDiv = document.getElementById('editPurchaseDiv');
	editPurchaseDiv.style.display = 'none';
	
	let purchasesDiv = document.getElementById('purchasesDiv');
	purchasesDiv.style.display = 'block';
	
	
	
//	let averagesDiv = document.getElementById('averages');
//	averagesDiv.style.display = 'block';

//	let storeAddedDiv = document.getElementById('storeAddedDiv');
//	storeAddedDiv.style.display = 'none';

	

	
		

	let count = 0;
	let sum = 0;
	let ave = 0;
	//add purchases to DOM
	let tbody = document.getElementById('purchaseTableBody');
	tbody.textContent = '';

	if (purchases && Array.isArray(purchases) && purchases.length > 0) {
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

			count++;
			sum += purchase.pricePerPound;



			tr.appendChild(td);
			td = document.createElement('td');
			td.textContent = purchase.weightInPounds;
			tr.appendChild(td);
			td = document.createElement('td');
			td.textContent = purchase.onSale ? 'Yes' : 'No';
			tr.appendChild(td);
			td = document.createElement('td');
			let pdate = new Date(purchase.purchaseDate)
			td.textContent = pdate.toDateString() + " " + pdate.getHours() + ":" + String(pdate.getMinutes()).padStart(2, '0');
			tr.appendChild(td);
			td = document.createElement('td');
			td.textContent = purchase.store.name;
			tr.appendChild(td);

			tbody.appendChild(tr);
			tr.addEventListener('click', function(e) {
				console.log("cheching purchase in tr event listener: " + purchase);
				console.log(purchase);
				e.preventDefault();
				getPurchase(purchase.id);
			});

		}
		
		let average = document.getElementById('averages');
		ave = sum / count;
		let aveNum = document.getElementById('aveNum');
		if(aveNum != null) {
			average.removeChild(aveNum);
		}
		let p = document.createElement('p');
		p.id = "aveNum";
		
		p.textContent = ave;
		average.appendChild(p);
	}



}

function getPurchase(purchaseId) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `api/purchases/${purchaseId}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				//show data
				let purchase = JSON.parse(xhr.responseText);
				displayPurchase(purchase);
			}
			else {
				//display error
				error('Error getting purchases: ' + xhr.status);
			}
		}
	};
	xhr.send();
}

function displayPurchase(purchase) {
	
	
	let purchasesDiv = document.getElementById('purchasesDiv');
	purchasesDiv.style.display = 'none';

	let averagesDiv = document.getElementById('averages');
	averagesDiv.style.display = 'none';
	
		let addStoreDiv = document.getElementById('addStoreDiv');
	addStoreDiv.style.display = 'block';

	let addPurchaseDiv = document.getElementById('addPurchaseDiv');
	addPurchaseDiv.style.display = 'block';
	


//	let addStoreDiv = document.getElementById('addStoreDiv');
//	addStoreDiv.style.display = 'none';
//	let addPurchaseDiv = document.getElementById('addPurchaseDiv');
//	addPurchaseDiv.style.display = 'none';
	
	

	//	console.log(purchase);


	let purchaseDiv = document.getElementById('purchaseByIdDiv');
	purchaseDiv.textContent = '';
	purchaseDiv.style.display = 'block';
	let ul = document.createElement('ul');
	let li = document.createElement('li');
	li.textContent = `Purchase Id: ${purchase.id}`;
	console.log("Diplay Purchase purchase id: " + purchase.id);
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
	li.textContent = `Price Per Pound: ${purchase.pricePerPound}`;
	ul.appendChild(li);
	li = document.createElement('li');
	li.textContent = `Weight in Pounds : ${purchase.weightInPounds}`;
	ul.appendChild(li);
	li = document.createElement('li');
	li.textContent = `On Sale? : ${purchase.onSale ? 'Yes' : 'No'}`;
	ul.appendChild(li);
	li = document.createElement('li');
	let pdate = new Date(purchase.purchaseDate);
	li.textContent = `Date of Purchase : ${pdate.toDateString() + " " + pdate.getHours() + ":" + String(pdate.getMinutes()).padStart(2, '0')}`;
	ul.appendChild(li);
	li = document.createElement('li');
	li.textContent = `Store Name: ${purchase.store.name}`;
	ul.appendChild(li);
	li = document.createElement('li');
	li.textContent = `Street Address: ${purchase.store.address.street}`;
	ul.appendChild(li);
	if (purchase.store.address.street2) {
		li = document.createElement('li');
		li.textContent = `Unit: ${purchase.store.address.street2}`;
		ul.appendChild(li);
	}
	li = document.createElement('li');
	li.textContent = `City: ${purchase.store.address.city}`;
	ul.appendChild(li);
	li = document.createElement('li');
	li.textContent = `State: ${purchase.store.address.state}`;
	ul.appendChild(li);
	li = document.createElement('li');
	li.textContent = `Zip Code: ${purchase.store.address.zip}`;
	ul.appendChild(li);
	console.log("Display Purchase: " + purchase);

	purchaseDiv.appendChild(ul);

	//Button to edit purchase.

	let editButton = document.createElement('button');
	editButton.textContent = 'Edit this Purchase';
	purchaseDiv.appendChild(editButton);
	editButton.addEventListener('click', function(e) {
		e.preventDefault();
		purchaseDiv.style.display = 'none';
//		addStoreDiv.style.disply = 'none';
//		addPurchaseDiv.style.display = 'none';
//		addStoreForm.style.display = 'none';

	let addStoreDiv = document.getElementById('addStoreDiv');
	addStoreDiv.style.display = 'none';

	let addPurchaseDiv = document.getElementById('addPurchaseDiv');
	addPurchaseDiv.style.display = 'none';

	let editPurchaseDiv = document.getElementById('editPurchaseDiv');
		editPurchaseDiv.style.display = 'block';
		
	
	

		buildEditPurchaseForm(purchase);
	});


	//Button to delete purchase.

	let deleteButton = document.createElement('button');
	deleteButton.textContent = 'Delete this Purchase';
	purchaseDiv.appendChild(deleteButton);
	deleteButton.addEventListener('click', function(e) {
		e.preventDefault();
		purchasesDiv.style.display = 'block';
		purchaseDiv.style.display = 'none';
		averagesDiv.style.display = 'block';
			loadMeatPurchases();
		deletePurchase(purchase.id);
	});


	//button to go back to display purchase list
	let backButton = document.createElement('button');
	backButton.textContent = 'Back to List';
	purchaseDiv.appendChild(backButton);
	backButton.addEventListener('click', function(e) {
		purchasesDiv.style.display = 'block';
		purchaseDiv.style.display = 'none';
		averagesDiv.style.display = 'block';
	
		loadMeatPurchases();

	})
	
}

function buildStore(e) {
	e.preventDefault();

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
				//				console.log(data);
				displayStore(data);

			}
			else {
				console.error("POST request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
				error('Error creating store: ' + xhr.status + ': ' + xhr.responseText);
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
	if (store.address.street2) {
		li = document.createElement('li');
		li.textContent = `Unit: ${store.address.street2}`;
		ul.appendChild(li);
	}
	li = document.createElement('li');
	li.textContent = `City: ${store.address.city}`;
	ul.appendChild(li);
	li = document.createElement('li');
	li.textContent = `State: ${store.address.state}`;
	ul.appendChild(li);
	li = document.createElement('li');
	li.textContent = `Zip Code: ${store.address.zip}`;
	ul.appendChild(li);


	storeAddedDiv.appendChild(ul);

	//Button to edit purchase.
	//Button to delete purchase.



	let backButton = document.createElement('button');
	backButton.textContent = 'Back to List';
	storeAddedDiv.appendChild(backButton);
	backButton.addEventListener('click', function(e) {
		purchasesDiv.style.display = 'block';
		purchaseDiv.style.display = 'none';
		averagesDiv.style.display = 'block';
	
		loadMeatPurchases();

	})

}

function loadStores() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/stores');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				//show data
				let stores = JSON.parse(xhr.responseText);
				//selects from both add and edit menu
				let storeSelects = document.getElementsByClassName('storeSelect');
				//for every select object
				for (let select of storeSelects) {
					//create the dropdown based on the list of stores
					for (let store of stores) {
						let option = document.createElement('option');
						option.textContent = store.name;
						option.value = store.id;
						select.appendChild(option);
					}
				}
			}
			else {
				//display error
				error('Error getting purchases' + xhr.status);
			}
		}
	};
	xhr.send();
}


function buildPurchase(e) {
	e.preventDefault();

	//	console.log(addPurchaseForm.onSale);
	//	console.log(addPurchaseForm.onSale.checked);

	let purchase = {
		type: addPurchaseForm.type.value,
		cut: addPurchaseForm.cut.value,
		priceInUsd: addPurchaseForm.priceInUsd.value,
		pricePerPound: addPurchaseForm.pricePerPound.value,
		weightInPounds: addPurchaseForm.weightInPounds.value,
		onSale: addPurchaseForm.onSale.checked,
		purchaseDate: addPurchaseForm.purchaseDate.value,
		store: {
			id: addPurchaseForm.store.value
		}

	};


	addNewPurchase(purchase);
}

function addNewPurchase(purchase) {

	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/purchases', true);


	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200 || xhr.status == 201) { // Ok or Created
				let data = JSON.parse(xhr.responseText);
				//				console.log(data);
				getPurchase(data.id);

			}
			else {
				console.error("POST request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
				displayError('Error creating purchase: ' + xhr.status + ': ' + xhr.responseText);
			}
		}
	};




	let userPurchaseJson = JSON.stringify(purchase);
	xhr.setRequestHeader("Content-type", "application/json");

	xhr.send(userPurchaseJson);

}

function buildEditPurchaseForm(purchase) {
	

	console.log("checking value in build edit purchase form: " + purchase.id);


	editPurchaseForm.type.value = purchase.type;
	editPurchaseForm.cut.value = purchase.cut;
	editPurchaseForm.priceInUsd.value = purchase.priceInUsd;
	editPurchaseForm.pricePerPound.value = purchase.pricePerPound;
	editPurchaseForm.weightInPounds.value = purchase.weightInPounds;
	editPurchaseForm.onSale.value = purchase.onSale;

	let pdate = new Date(purchase.purchaseDate)
	editPurchaseForm.purchaseDate.value = pdate.toISOString().substring(0, 16);
	//select the list of options from the loadStores function

	let options = document.getElementsByTagName('option');
	//for each option, if the value is the same as purchase.store.id, make is have
	//the "selected" artribute
	for (let option of options) {
		if(option.selected !== null || option.selected !== '') {
			option.selected = '';
		}
		
		if (option.value === purchase.store.id) {
			
			
			option.setAttribute('selected', true);
			option.selected = true;
		}
	}
	
	
		
		



	//button to go back to display purchase list


	// purchase should become what was taken in by the form as request body

	
	let editButton = document.getElementById('editButton');
	editButton.addEventListener('click', function(e) {
		e.preventDefault();
				
		let updatedPurchase = {
			id: purchase.id,
			type: editPurchaseForm.type.value,
			cut: editPurchaseForm.cut.value,
			priceInUsd: editPurchaseForm.priceInUsd.value,
			pricePerPound: editPurchaseForm.pricePerPound.value,
			weightInPounds: editPurchaseForm.weightInPounds.value,
			onSale: editPurchaseForm.onSale.checked,
			purchaseDate: editPurchaseForm.purchaseDate.value,
			store: {
				id: editPurchaseForm.store.value
			}

		};
		console.log("New Object built: " + updatedPurchase);

		editPurchase(purchase.id, updatedPurchase);
		
	});


	let editPurchaseDiv = document.getElementById('editPurchaseDiv');
	let editBackButton = document.getElementById('editBackButton');
	if( editBackButton !== null) {
		editPurchaseDiv.removeChild(editBackButton);
	}
	
	let backButton = document.createElement('button');
	backButton.textContent = 'Back to List';
	backButton.id = 'editBackButton';
	editPurchaseDiv.appendChild(backButton);
	backButton.addEventListener('click', function(e) {
		let purchasesDiv = document.getElementById('purchasesDiv');
//		let purchaseDiv = document.getElementById('purchaseById');
		let averagesDiv = document.getElementById('averages');
		purchasesDiv.style.display = 'block';
//		purchaseDiv.style.display = 'none';
		averagesDiv.style.display = 'block';
	
		loadMeatPurchases();

	})
}

function editPurchase(purchaseId, purchase) {


	let xhr = new XMLHttpRequest();
	xhr.open('PUT', `api/purchases/${purchaseId}`, true);


	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200 || xhr.status == 201) { // Ok or Created
				let data = JSON.parse(xhr.responseText);
				console.log("Transmitting data through XHR: " + data);
				getPurchase(purchaseId);
				

			}
			else {
				console.error("POST request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
				displayError('Error updating purchase: ' + xhr.status + ': ' + xhr.responseText);
			}
		}
	};




	let userPurchaseUpdateJson = JSON.stringify(purchase);
	xhr.setRequestHeader("Content-type", "application/json");

	xhr.send(userPurchaseUpdateJson);

}

function deletePurchase(purchaseId) {
	//api/purchases/purchaseId

	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', `api/purchases/${purchaseId}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 204) {
				//show data
				//				let data = JSON.parse(xhr.responseText);
				//				console.log(data);
				deleteSuccess('The purchase has been successfully deleted!')
				init();
			}
			else {
				//display error
				error('Error deleting purchase: ' + xhr.status);
			}
		}
	};
	xhr.send();
}

function deleteSuccess(msg) {
	let deleteDiv = document.getElementById('deleteDiv');
	deleteDiv.textContent = '';
	let h4 = document.createElement('h4');
	deleteDiv.appendChild(h4);
	h4.textContent = msg;
}

