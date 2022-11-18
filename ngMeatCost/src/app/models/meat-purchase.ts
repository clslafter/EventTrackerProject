import { Store } from "./store";

export class MeatPurchase {

  id: number;
  type: string;
  cut: string;
  priceInUsd: number;
  pricePerPound: number;
  weightInPounds: number;
  onSale: boolean;
  purchaseDate: string;
  createDate: string;
  store: Store;

constructor (id: number = 0, type: string = '',
             cut: string, priceInUsd: number = 0,
             pricePerPound: number = 0, weightInPounds: number = 0,
             onSale: boolean = false, purchaseDate: string = '',
             createDate: string = '', store: Store = new Store() ) {
this.id = id;
this.type = type;
this.cut = cut;
this.priceInUsd = priceInUsd;
this.pricePerPound = pricePerPound;
this.weightInPounds = weightInPounds;
this.onSale = onSale;
this.purchaseDate = purchaseDate;
this.createDate = createDate;
this.store = store;
}

}
