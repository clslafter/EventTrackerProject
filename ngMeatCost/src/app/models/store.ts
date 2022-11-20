import { Address } from "./address";
import { MeatPurchase } from "./meat-purchase";

export class Store {

  id: number;
  name: string;
  purchases: MeatPurchase[];
  address?: Address;

  constructor (id: number = 0, name: string = '',
                purchases: MeatPurchase[] = [],
                address?: Address ) {
    this.id = id;
    this.name = name;
    this.purchases = purchases;
    this.address = address;
  }

}
