import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../services/product.service";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: "app-product-edit",
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.scss"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule]
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  productId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      id: [{ value: "", disabled: true }, [Validators.required, Validators.pattern("^[a-zA-Z0-9]+$")]],
      name: ["", Validators.required],
      description: ["", Validators.required],
      logo: ["", Validators.required],
      date_release: ["", Validators.required],
      date_revision: [""],
    });
  }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    console.log('Product ID:', this.productId);
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe(
        product => {
          console.log('Product:', product);
          this.productForm.patchValue(product);
        },
        error => {
          console.error('Error fetching product:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.productForm.valid && this.productId) {
      console.log('Submitting form:', this.productForm.getRawValue());
      this.productService.updateProduct(this.productId, this.productForm.getRawValue()).subscribe(
        response => {
          console.log('Producto actualizado:', response);
          this.router.navigate(['/']);
        },
        error => {
          console.error('Error updating product:', error);
        }
      );
    } else {
      console.log('Form is invalid:', this.productForm);
    }
  }

  onReset(): void {
    this.productForm.reset();
  }
}
