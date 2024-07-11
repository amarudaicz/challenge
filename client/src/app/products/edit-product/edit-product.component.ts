import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../services/products/products.service';
import { catchError, throwError } from 'rxjs';
import { FormNewEditComponent } from '../form-new-edit/form-new-edit.component';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [RouterLink, FormNewEditComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
})
export class EditProductComponent implements OnInit {
  id: string | any;
  product: any;

  success: boolean = false;
  failed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.productsService
      .getProduct(this.id)
      .subscribe((product) => (this.product = product));
  }

  putFormValue(product: any) {
    this.productsService
      .putProduct({...product, _id:this.id})
      .pipe(
        catchError((err) => {
          this.failed = true
          return throwError(() => 'ocurrió un error');
        })
      )
      .subscribe((res) => {
        this.success = true
        this.productsService.getAllProducts({}).subscribe()
      });
  }

 
}
