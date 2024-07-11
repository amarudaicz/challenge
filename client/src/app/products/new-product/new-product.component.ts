import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormNewEditComponent } from '../form-new-edit/form-new-edit.component';
import { ProductsService } from '../services/products/products.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [CommonModule, RouterLink, FormNewEditComponent],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss',
})
export class NewProductComponent {
  constructor(private productsService: ProductsService) {}

  success: boolean = false;
  failed: boolean = false;

  postFormValue(newProduct: any) {
    this.productsService
      .postProduct(newProduct)
      .pipe(
        catchError((err) => {
          this.failed = true;
          return throwError(() => 'ocurrió un error');
        })
      )
      .subscribe((res: any) => {
        this.success = true;
        this.productsService.getAllProducts({}).subscribe()
      });
  }
}
