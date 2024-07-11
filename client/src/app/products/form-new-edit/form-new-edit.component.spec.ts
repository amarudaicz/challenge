import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormNewEditComponent } from './form-new-edit.component';
import { CommonModule } from '@angular/common';

describe('FormNewEditComponent', () => {
  let component: FormNewEditComponent;
  let fixture: ComponentFixture<FormNewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule,FormNewEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormNewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with one ingredient', () => {
    expect(component.ingredients.length).toBe(1);
    expect(component.ingredients.at(0).get('name')?.value).toBe('');
  });

  it('should add an ingredient', () => {
    component.addIngredient();
    expect(component.ingredients.length).toBe(2);
  });

  it('should remove an ingredient', () => {
    component.addIngredient();
    component.removeIngredient(1);
    expect(component.ingredients.length).toBe(1);
  });

  it('should not remove the last ingredient', () => {
    component.removeIngredient(0);
    expect(component.ingredients.length).toBe(1);
  });

  it('should patch the form when a product is provided', () => {
    const mockProduct = {
      name: 'Test Product',
      price: 100,
      type: 'Test Type',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      image: 'test-image.jpg',
      status: true,
      discount: 10,
      isPromotion: true
    };

    component.product = mockProduct;
    component.ingredients.clear()
    component.patchForm();

    expect(component.productForm.value.name).toBe(mockProduct.name);
    expect(component.productForm.value.price).toBe(mockProduct.price);
    expect(component.productForm.value.type).toBe(mockProduct.type);
    expect(component.productForm.value.image).toBe(mockProduct.image);
    expect(component.productForm.value.status).toBe(mockProduct.status);
    expect(component.productForm.value.discount).toBe(mockProduct.discount);
    expect(component.productForm.value.isPromotion).toBe(mockProduct.isPromotion);

    expect(component.ingredients.length).toBe(mockProduct.ingredients.length);
    expect(component.ingredients.at(0).value.name).toBe(mockProduct.ingredients[0]);
    expect(component.ingredients.at(1).value.name).toBe(mockProduct.ingredients[1]);
  });

  it('should emit formSubmit event with form value on submit', () => {
    spyOn(component.formSubmit, 'emit');
    component.productForm.setValue({
      name: 'Test Product',
      price: 100,
      type: 'Test Type',
      ingredients: [{ name: 'Ingredient 1' }],
      image: 'test-image.jpg',
      status: 'Available',
      discount: 10,
      isPromotion: true
    });

    component.onSubmit();

    expect(component.formSubmit.emit).toHaveBeenCalledWith({
      name: 'Test Product',
      price: 100,
      type: 'Test Type',
      ingredients: ['Ingredient 1'],
      image: 'test-image.jpg',
      status: 'Available',
      discount: 10,
      isPromotion: true
    });
  });

  it('should reset form after submit if no product is provided', () => {
    spyOn(component.productForm, 'reset');
    component.product = null;

    component.productForm.setValue({
      name: 'Test Product',
      price: 100,
      type: 'Test Type',
      ingredients: [{ name: 'Ingredient 1' }],
      image: 'test-image.jpg',
      status: 'Available',
      discount: 10,
      isPromotion: true
    });

    component.onSubmit();

    expect(component.productForm.reset).toHaveBeenCalled();
  });

  it('should not reset form after submit if product is provided', () => {
    spyOn(component.productForm, 'reset');
    component.product = {
      name: 'Test Product',
      price: 100,
      type: 'Test Type',
      ingredients: ['Ingredient 1'],
      image: 'test-image.jpg',
      status: 'Available',
      discount: 10,
      isPromotion: true
    };

    component.productForm.setValue({
      name: 'Test Product',
      price: 100,
      type: 'Test Type',
      ingredients: [{ name: 'Ingredient 1' }],
      image: 'test-image.jpg',
      status: 'Available',
      discount: 10,
      isPromotion: true
    });

    component.onSubmit();

    expect(component.productForm.reset).not.toHaveBeenCalled();
  });

  it('should not submit if the form is invalid', () => {
    spyOn(component.formSubmit, 'emit');

    component.productForm.setValue({
      name: '',
      price: -1,
      type: '',
      ingredients: [{ name: '' }],
      image: '',
      status: '',
      discount: 101,
      isPromotion: false
    });

    component.onSubmit();

    expect(component.formSubmit.emit).not.toHaveBeenCalled();
  });
});
