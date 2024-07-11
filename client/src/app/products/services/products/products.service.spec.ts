import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductsService } from './products.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService, HttpClient],
    });

    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all products', (done: DoneFn) => {
    const mockProducts = [
      { _id: 1, name: 'Product 1' },
      { _id: 2, name: 'Product 2' },
    ];

    service.getAllProducts({}).subscribe((products: any[]) => {
      expect(products).toEqual(mockProducts);
      done();
    });

    httpMock
      .expectOne({
        method: 'GET',
        url: `${service.baseUrl}/products`,
      })
      .flush(mockProducts);

    service.allProducts$.subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });
  });

  it('should get one single product by id', (done: DoneFn) => {
    const mockProduct = {
      _id: '60d21b4667d0d8992e610c85',
      name: 'Hamburguesa',
      price: 100,
      ingredients: ['pan'],
    };

    service.getProduct(mockProduct._id).subscribe((product) => {
      expect(product).toEqual(mockProduct);
      done();
    });

    const req = httpMock.expectOne({
      method: 'GET',
      url: `${service.baseUrl}/products/${mockProduct._id}`,
    });
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should post a new product', (done: DoneFn) => {
    const newProduct = {
      name: 'new product',
      type: 'burger',
      price: 1000,
      ingredients: ['one ingredient'],
    };

    httpMock.verify();

    service.postProduct(newProduct).subscribe((response) => {
      expect(response).toEqual(newProduct);
      done();
    });

    const req = httpMock.expectOne({
      method: 'POST',
      url: `${service.baseUrl}/products`,
    });

    expect(req.request.method).toBe('POST');
    req.flush(newProduct);

  });


  it('should update an existing product', (done: DoneFn) => {

    const mockProduct = { _id: '60d21b4667d0d8992e610c85', name: 'Hamburguesa', price: 100, ingredients: ['pan'] };

    httpMock.verify();
    
    service.putProduct(mockProduct).subscribe(response => {
      expect(response).toEqual(mockProduct);
      done();
    });
    
    const req = httpMock.expectOne({
      url:`${service.baseUrl}/products`,
      method:'PUT'
    });
    expect(req.request.method).toBe('PUT');
    req.flush(mockProduct);

  });

 
  it('should delete a product by ID', (done: DoneFn) => {
    const id = '60d21b4667d0d8992e610c85';

    httpMock.verify();
    
    service.deleteProduct(id).subscribe(response => {
      expect(response).toEqual(id);
      done();
    });

    const req = httpMock.expectOne({
      url:`${service.baseUrl}/products/${id}`,
      method:'DELETE'
    });
    expect(req.request.method).toBe('DELETE');
    req.flush(id);


  });
 
});
