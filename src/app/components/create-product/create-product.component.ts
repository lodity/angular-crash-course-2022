import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
})
export class CreateProductComponent {
  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  constructor(
    private productService: ProductsService,
    private modalService: ModalService
  ) {}

  get title() {
    return this.form.controls.title as FormControl;
  }

  submit() {
    console.log(this.form.value);
    this.productService
      .create({
        title: this.form.value.title as string,
        price: 13.5,
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic',
        rating: {
          rate: 42,
          count: 1,
        },
      })
      .subscribe(() => {
        this.modalService.close();
      });
  }
}
