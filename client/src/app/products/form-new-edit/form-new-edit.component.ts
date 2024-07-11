import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-form-new-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-new-edit.component.html',
  styleUrl: './form-new-edit.component.scss',
})
export class FormNewEditComponent implements OnChanges {
  @Input() product: any; // edición
  @Output() formSubmit = new EventEmitter<any>(); // datos del formulario
  productForm: FormGroup;
  ingredients:FormArray;
  typeOptions = ['burger', 'condiments', 'snacks', 'drinks'];

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      ingredients: this.fb.array([]),
      type: [null, [Validators.required]],
      image: [null],
      status: [null],
      discount: [null, [Validators.max(100)]],
      isPromotion: [null],
    });

    this.ingredients = this.productForm.get('ingredients') as FormArray;
  }

  ngOnChanges(){
    
  }

  ngOnInit(): void {
    if (!this.product) {
      this.addIngredient();
    }
    
    this.patchForm();
  }

  

  addIngredient(): void {
    this.ingredients.push(
      this.fb.group({
        name: ['', Validators.required],
      })
    );
  }

  removeIngredient(index: number): void {
    if (this.ingredients.controls.length === 1) return;
    this.ingredients.removeAt(index);
  }

  patchForm() {
    if (!this.product) return;
    this.productForm.patchValue(this.product);

    if (this.product.ingredients) {
      this.product.ingredients.map((e: any) =>
        this.ingredients.push(
          this.fb.group({
            name: [e, Validators.required],
          })
        )
      );
      
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;
    const formValue = structuredClone(this.productForm.value);

    formValue.ingredients = formValue.ingredients.map((i: any) => i.name);

    this.formSubmit.emit(formValue);

    if (!this.product) {
      this.productForm.reset();
      this.ingredients.clear()
    }
  }
}
