import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { NewProductComponent } from './new-product.component';
import { ProductsService } from '../services/products/products.service'; // Adjust the path as necessary
import { FormNewEditComponent } from '../form-new-edit/form-new-edit.component'; // Adjust the path as necessary
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

describe('NewProductComponent', () => {
  let component: NewProductComponent;
  let fixture: ComponentFixture<NewProductComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', [
      'postProduct',
      'getAllProducts',
    ]);

    await TestBed.configureTestingModule({
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: ActivatedRoute, useValue: { params: of({}) } },
      ],
      imports: [CommonModule, FormNewEditComponent, NewProductComponent], // Adjust imports as necessary
    }).compileComponents();

    fixture = TestBed.createComponent(NewProductComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call postProduct and set success to true on success', () => {
    const mockProduct = {
      name: 'Test Product',
      price: 100,
      type: 'burger',
      ingredients: ['pan'],
    };

    productsService.postProduct.and.returnValue(of(mockProduct));
    productsService.getAllProducts.and.returnValue(of([]));
    component.postFormValue(mockProduct);
    expect(component.success).toBeTrue();
    expect(component.failed).toBeFalse();
    expect(productsService.getAllProducts).toHaveBeenCalled();
  });
});
