import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
 
import { ColDef, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../Core/Services/Products-Service/products-service';

// Register all standard AG Grid community features
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-products',
  imports: [CommonModule,FormsModule,AgGridAngular],
  templateUrl: './products.html',
  styleUrl: './products.css',
  encapsulation:ViewEncapsulation.None
})
export class Products implements OnInit {
@ViewChild('agGrid') agGrid!: AgGridAngular;
  columnDefs: ColDef[] = [
    { field: 'name', headerName: 'Product Name', flex: 2, sortable: true, filter: true },
    { 
      field: 'price', 
      headerName: 'Price', 
      flex: 1, 
      sortable: true, 
      filter: 'agNumberColumnFilter',
      valueFormatter: params => params.value ? `$${parseFloat(params.value).toFixed(2)}` : '$0.00'
    },
    { field: 'sales', headerName: 'Sales', flex: 1, sortable: true, filter: 'agNumberColumnFilter' },
    { 
      field: 'status', 
      headerName: 'Status', 
      flex: 1, 
      sortable: true, 
      filter: true,
      cellStyle: params => {
        if (params.value === 'Active') return { color: '#10B981', fontWeight: '600' };
        if (params.value === 'Inactive') return { color: '#EF4444', fontWeight: '600' };
        if (params.value === 'Draft') return { color: '#F59E0B', fontWeight: '600' };
        return null;
      }
    },
    { 
      headerName: 'Action', 
      flex: 1, 
      sortable: false, 
      filter: false,
      cellRenderer: (params: any) => {
        const button = document.createElement('button');
        button.innerHTML = 'Edit';
        button.className = 'btn btn-sm text-white';
        button.style.cssText = 'background: linear-gradient(90deg, #6366f1, #8b5cf6); border: none; border-radius: 8px; padding: 4px 16px; font-weight: 500; cursor: pointer; transition: all 0.2s;';
        
        button.addEventListener('click', (e) => {
          e.stopPropagation();
          this.editProduct(params.data);
        });
        return button;
      }
    }
  ];

  rowData: any[] = [];

  showModal = false;

  newProduct = {
    title: '',
    price: '',
    fileUrl: ''
  };


  onSearch(event: any) {
  const value = event.target.value;
  this.agGrid.api.setGridOption('quickFilterText', value);
}
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

loadProducts() {
  this.productService.getProducts().subscribe({
    next: (res: any) => {
      this.rowData = res;
    },
    error: () => {
      console.log('API failed, loading mock data...');
      this.rowData = this.generateRandomProducts(15);
    }
  });
}

  generateRandomProducts(count: number = 10) {
  const names = ['Laptop', 'Phone', 'Headphones', 'Camera', 'Shoes', 'Watch'];
  const statuses = ['Active', 'Inactive', 'Out of Stock'];

  return Array.from({ length: count }, (_, i) => ({
    name: names[Math.floor(Math.random() * names.length)] + ' ' + (i + 1),
    price: (Math.random() * 1000 + 50).toFixed(2),
    sales: Math.floor(Math.random() * 500),
    status: statuses[Math.floor(Math.random() * statuses.length)]
  }));
}

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  createProduct() {
    const payload = {
      name: this.newProduct.title,
      price: this.newProduct.price,
      fileUrl: this.newProduct.fileUrl,
      sales: 0,
      status: 'Active'
    };

    this.productService.createProduct(payload).subscribe(() => {
      this.loadProducts();
      this.closeModal();
      this.newProduct = { title: '', price: '', fileUrl: '' };
    });
  }

  editProduct(product: any) {
    console.log('Edit clicked for product:', product);
    // Add your logic to edit the product here (e.g., populate form and open modal)
  }
}