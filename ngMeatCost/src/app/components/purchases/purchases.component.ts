import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { windowWhen } from 'rxjs';
import { Address } from 'src/app/models/address';
import { MeatPurchase } from 'src/app/models/meat-purchase';
import { Store } from 'src/app/models/store';
import { AddressService } from 'src/app/services/address.service';
import { MeatPurchaseService } from 'src/app/services/meat-purchase.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  stores: Store[] = [];
  purchases: MeatPurchase[] = [];
  selected: null | MeatPurchase = null;
  onSale = false;
  editPurchase: null | MeatPurchase = null;
  newStore = new Store();
  showAddForm = false;
  newPurchase: MeatPurchase = new MeatPurchase;


  calcAve() {
    let count = 0;
    let sum = 0;
    let ave = 0;
    this.purchases.forEach(purchase => {
      count++;
			sum += purchase.pricePerPound;
    });
    ave = sum / count;
    return ave;
  }

  loadPurchases () {
    this.purchaseService.index().subscribe({
      next: (data) => {
        this.purchases = data;
      },
      error: (fail) => {
        console.error('PurchasesComponent.loadPuchases: error getting purchases');
        console.error(fail);
      }
    })
  }


  loadStores () {
    this.storeService.index().subscribe({
      next: (data) => {
        this.stores = data;
      },
      error: (fail) => {
        console.error('PurchasesComponent.stores: error getting stores');
        console.error(fail);
      }
    })
  }

  displayTable() {
    this.selected = null;
  }


  displayPurchase(purchase: MeatPurchase) {
    this.selected = purchase;
  }


  onSaleYorN (onSale: boolean): string  {
    return onSale ? 'Yes' : 'No';
  }



  addPurchase(purchase: MeatPurchase) {
    this.purchaseService.create(purchase).subscribe({
      next: (data) => {
        this.loadPurchases();
        this.newPurchase = new MeatPurchase();
        this.editPurchase = null;
        this.showAddForm = false;
        //window.location.reload();
        console.log(data);
        this.selected = data;

      },
      error: (fail) => {
        console.error('PurchasesComponent.addPurchase: error creating purchase');
        console.error(fail);
        this.router.navigateByUrl('purchaseNotFound');
      }

    });

  }

  addStore(store: Store) {
    this.storeService.create(store).subscribe({
      next: (data) => {
        this.loadStores();
        this.newStore = new Store();
        // this.selected = null;

      },
      error: (fail) => {
        console.error('PurchasesComponent.addStore: error creating store');
        console.error(fail);
      }

    });

  }

  newAddress = new Address();

  addAddress(address: Address) {
    this.addressService.create(address).subscribe({
      next: (data) => {
        this.loadStores();
        this.newAddress = new Address();
        // this.selected = null;

      },
      error: (fail) => {
        console.error('PurchasesComponent.addAddress: error creating address');
        console.error(fail);
      }

    });

  }


  setEditPurchase() {
    this.editPurchase = Object.assign({}, this.selected);
  }

  updatePurchase(purchase: MeatPurchase, goToDetail = true) {

    this.purchaseService.update(purchase).subscribe({
      next: (data) => {
       // if (goToDetail){
        this.selected = data;
        // } else {
        //   this.selected = null;
        // }
        this.loadPurchases();
        this.loadStores();
        this.editPurchase = null;
        console.log(data);
       // window.location.reload();

      },
      error: (fail) => {
        console.error('PurchasesComponent.updatePurchase: error updating purchase');
        console.error(fail);
      }

    });
   // console.log(todo);

  }

  deletePurchase(id: number) {
    this.purchaseService.destroy(id).subscribe({
      next: (data) => {
        this.loadPurchases();
        this.router.navigateByUrl('purchases');
        this.selected = null;


      },
      error: (fail) => {
        console.error('PurchasesComponent.: error deleting purchase');
        console.error(fail);
      }

    });

    this.purchaseService.destroy(id);
    //this.todos = this.todoService.index();
    this.loadPurchases();
  }

  constructor(private purchaseService: MeatPurchaseService, private storeService: StoreService, private addressService: AddressService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadPurchases();

    this.loadStores();

    let routeId = this.route.snapshot.paramMap.get('id');
    console.log(routeId);
    if (!this.selected && routeId) {
      let purchaseId = Number.parseInt(routeId);
      if(isNaN(purchaseId)) {
        this.router.navigateByUrl('invalidId');
      } else {
        this.purchaseService.show(purchaseId).subscribe({
          next: (data) => {
            this.selected = data;
          },
          error: (fail) => {
            console.error('PurchasesComponent.ngOnInit: purchase not found');
            this.router.navigateByUrl('purchaseNotFound');
          }
        });
      }
    }
  }

}
