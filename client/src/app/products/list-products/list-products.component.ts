import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, Observable, Subscription, throwError } from 'rxjs';
import { ProductsService } from '../services/products/products.service';
import { DetailProductComponent } from '../detail-product/detail-product.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule, DetailProductComponent ,RouterLink ],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})

export class ListProductsComponent implements OnInit, OnDestroy {
  
  constructor(private productService:ProductsService ){
    this.allProducts$ = this.productService.allProducts$
  }

  allProducts$:Observable<any[]|undefined>

  productDetail:any

  ngOnInit(): void {
    this.productService.getAllProducts({}).subscribe()
  }

  showDetailsProduct(product:any){
    this.productDetail = product
  }

  closeDetails(event:any){
    this.productDetail = undefined
  }

  deleteProduct(id:string){
      this.productService.deleteProduct(id).pipe(
        catchError(err=>{

          return throwError(()=>'ocurrió un error')
        })
      ).subscribe(res=>{
        this.productService.getAllProducts({}).subscribe()
      })
  }


  ngOnDestroy(){

  }






}
