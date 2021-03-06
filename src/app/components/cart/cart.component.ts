import { Component, OnInit } from '@angular/core';
import { Order, OrderItem } from 'src/app/models/order';
import { AddOrderService } from 'src/app/services/add-order/add-order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  siderbarDisplayed = false;

  numberOfItems : number = 0;
  orderedProductList : Order | undefined;
  totalPrice: number = 0;

  constructor(
    private addOrderService: AddOrderService
  ) { }

  ngOnInit(): void {
    this.getTotalNumberOfItemsAndTotalPrice();
  }

  displaySidebar(){
    this.siderbarDisplayed = !this.siderbarDisplayed;
    this.getAllOrderedItems();
  }

  getTotalNumberOfItemsAndTotalPrice(){
    this.addOrderService.order$.subscribe(order =>{
      
      this.numberOfItems = 0;
      this.totalPrice = 0;
      
      if(order?.items.length){

        for(const item of order.items){

          this.numberOfItems += item.quantity; 

          this.totalPrice += item.quantity * item.price;
        }
      }
    })
  }

  getAllOrderedItems(){
    this.addOrderService.order$
      .subscribe(order => {
        this.orderedProductList = order;
      })
  }

}
