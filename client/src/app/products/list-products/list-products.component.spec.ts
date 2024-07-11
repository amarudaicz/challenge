import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ListProductsComponent } from './list-products.component';
import { ProductsService } from '../services/products/products.service'; // Adjust the path as necessary
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DetailProductComponent } from '../detail-product/detail-product.component'; // Adjust the path as necessary
import { RouterLink } from '@angular/router';

describe('ListProductsComponent', () => {
  let component: ListProductsComponent;
  let fixture: ComponentFixture<ListProductsComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', [
      'deleteProduct',
      'getAllProducts',
      'allProducts$',
    ]);

    await TestBed.configureTestingModule({
      providers: [{ provide: ProductsService, useValue: productsServiceSpy }],
      imports: [
        CommonModule,
        HttpClientModule,
        DetailProductComponent,
        RouterLink,
        ListProductsComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListProductsComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;
    productsService.allProducts$ = of([]); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should set productDetail when showDetailsProduct is called', () => {
    const mockProduct = { name: 'Test Product' };
    component.showDetailsProduct(mockProduct);
    expect(component.productDetail).toEqual(mockProduct);
  });

  it('should clear productDetail when closeDetails is called', () => {
    component.productDetail = { name: 'Test Product' };
    component.closeDetails({});
    expect(component.productDetail).toBeUndefined();
  });

  it('should call deleteProduct and getAllProducts on deleteProduct', (done: DoneFn) => {
    const mockId = '123';
    productsService.deleteProduct.and.returnValue(of(mockId));
    productsService.getAllProducts.and.returnValue(of([]));
    component.deleteProduct(mockId);
    expect(productsService.deleteProduct).toHaveBeenCalledWith(mockId);
    expect(productsService.getAllProducts).toHaveBeenCalled();
    done();
  });

});
