import { Component, OnInit } from '@angular/core';
import { MeatPurchase } from 'src/app/models/meat-purchase';
import { MeatPurchaseService } from 'src/app/services/meat-purchase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

purchases: MeatPurchase[] = [];

  constructor(private purchaseService: MeatPurchaseService) { }

  ngOnInit(): void {
    this.loadPurchases();
  }

  loadPurchases() {
    this.purchaseService.index().subscribe({
      next: (purchases) => {
        console.log(purchases);
        this.purchases = purchases;
      },
      error: (fail) => {
        console.error('HomeComponent.loadPurchases: error getting purchases');
        console.error(fail);
      }
    });

  }


}
