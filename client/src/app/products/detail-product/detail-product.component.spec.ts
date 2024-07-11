import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailProductComponent } from './detail-product.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('DetailProductComponent', () => {
  let component: DetailProductComponent;
  let fixture: ComponentFixture<DetailProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, DetailProductComponent],
      providers: [{ provide: ActivatedRoute, useValue: { params: of({}) } }],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailProductComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product details', () => {
    const mockProduct = {
      name: 'Test Product',
      image: 'test-image.jpg',
      price: 100,
      type: 'Test Type',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      isPromotion: true,
      discount: 10,
      status: true,
    };

    component.product = mockProduct;
    expect(component.product).toEqual(mockProduct);
    fixture.detectChanges();
  });

  it('should emit closeDetails event when close button is clicked', () => {
    spyOn(component.closeDetails, 'emit');
    const closeButton = fixture.debugElement.query(
      By.css('button')
    ).nativeElement;
    closeButton.click();
    expect(component.closeDetails.emit).toHaveBeenCalledWith(true);
  });
});
