import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProductEditComponent } from './product-edit.component';
import { ProductService } from '../services/product.service';

describe('ProductEditComponent', () => {
  let component: ProductEditComponent;
  let fixture: ComponentFixture<ProductEditComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductEditComponent, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        ProductService,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEditComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch product on init', () => {
    const product = { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1.png', date_release: '2022-01-01', date_revision: '2022-01-01' };
    jest.spyOn(productService, 'getProductById').mockReturnValue(of(product));

    component.ngOnInit();

    expect(component.productForm.get('id')?.value).toEqual('1');
    expect(component.productForm.get('name')?.value).toEqual('Product 1');
    expect(component.productForm.get('description')?.value).toEqual('Description 1');
    expect(component.productForm.get('logo')?.value).toEqual('logo1.png');
    expect(component.productForm.get('date_release')?.value).toEqual('2022-01-01');
    expect(component.productForm.get('date_revision')?.value).toEqual('2022-01-01');
  });
});
