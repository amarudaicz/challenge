import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductComponent } from './edit-product.component';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products/products.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormNewEditComponent } from '../form-new-edit/form-new-edit.component';

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;
  let service:any

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProductComponent, HttpClientModule, FormNewEditComponent ],
      providers: [
        ProductsService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '60d21b4667d0d8992e610c85' }),  
            snapshot: {
              paramMap: {
                get: (key: string) => '60d21b4667d0d8992e610c85'
              }
            }
          }
        }
      ]
    })
    .compileComponents();
    
    service = TestBed.inject(ProductsService)
    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;

    spyOn(service, 'getProduct').and.returnValue(of({ id: component.id, name: 'Test Product', ingredients:['pan'] }));
    spyOn(service, 'putProduct').and.returnValue(of({ id: component.id, name: 'Test Product', ingredients:['pan'] }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exist ID product', ()=>{
    expect(component.id).toBeTruthy()
  })

  it('should update one product' , () => {
    component.putFormValue({_id:component.id, name:'new name'})
    expect(component.success).toBe(true)
  })

  it('should get product on ngOnInit' , () => {
    component.ngOnInit()
    fixture.detectChanges();
    
    const testProduct = { id: component.id, name: 'Test Product', ingredients:['pan'] }
    expect(component.product).toEqual(testProduct);
  })


});
