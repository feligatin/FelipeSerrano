import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../services/product.service';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent, RouterTestingModule, HttpClientTestingModule], // Import the standalone component
      providers: [ProductService]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
  });

  it('should fetch products on init', () => {
    const products = [{ id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1.png', date_release: '2022-01-01', date_revision: '2022-01-01' }];
    jest.spyOn(productService, 'getProducts').mockReturnValue(of({ data: products }));

    component.ngOnInit();

    expect(component.products).toEqual(products);
    expect(component.filteredProducts).toEqual(products);
  });
});
