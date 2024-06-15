import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router) {
    this.productForm = this.fb.group({
      id: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      name: ['', Validators.required],
      description: ['', Validators.required],
      logo: ['', Validators.required],
      date_release: ['', Validators.required],
      date_revision: ['']
    });
  }

  ngOnInit() {}

  onSubmit(): void {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value).subscribe(
        response => {
          this.productForm.reset();
          this.router.navigate(['/']); 
        },
        error => {
          console.error('Error al añadir producto:', error);
          if (error.error && error.error.errors) {
            alert(`Validation errors: ${JSON.stringify(error.error.errors)}`);
          }
        }
      );
    }
  }

  onReset(): void {
    this.productForm.reset();
  }
}
