import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer/cutomer';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
customers:Customer[]=[];
  constructor(private CustomerService:CustomerService) { }

  ngOnInit(): void {
    this.getCustomer();
  }
getCustomer(){
  this.CustomerService.getCustomers().subscribe(response=>{this.customers=response.data})
}
}
