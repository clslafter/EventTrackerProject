import { Store } from "./store";

export class Address {

  id: number | undefined;
  street: string;
  street2: string;
  city: string;
  state: string;
  zip: number;
  store?: Store;

constructor(id: number = 0, street: string = '', street2: string = '',
            city: string = '', state: string = '', zip: number = 0,
            store?: Store ) {

    this.id = id;
    this.street = street;
    this.street2 = street2;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.store = store;
            }

}
