import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, TableModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  products$: Observable<any> | undefined;
  isSidePanel: boolean = false;
  categoryObj: CategoryObject = new CategoryObject();
  isApiCallInProgress: boolean = false;

  constructor(
    private productSrv: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllCategory();
  }

  // Fetch all categories
  getAllCategory(): void {
    this.products$ = this.productSrv.getCategory().pipe(
      map((response: any) => {
        return response.data.slice(0, 18);})
    );
  }

  // Save a new category
  saveCategory(): void {
    if (this.isApiCallInProgress) return;

    this.isApiCallInProgress = true;
    this.productSrv.createCategory(this.categoryObj).subscribe({
      next: (res: any) => {
        this.isApiCallInProgress = false;
        if (res.result) {
          this.toastr.success('Category Created Successfully');
          this.resetForm();
          this.getAllCategory();
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (err: any) => {
        this.isApiCallInProgress = false;
        this.toastr.error('Failed to create category');
      }
    });
  }

  // Delete a category
  onDelete(categoryId: number): void {
    const isDeleteConfirmed = confirm('Are you sure you want to delete this category?');
    if (isDeleteConfirmed) {
      this.productSrv.deleteCategory(categoryId).subscribe({
        next: (res: any) => {
          if (res.result) {
            this.toastr.success('Category Deleted Successfully');
            this.getAllCategory();
          } else {
            this.toastr.error(res.message);
          }
        },
        error: () => {
          this.toastr.error('Failed to delete category');
        }
      });
    }
  }

  // Update a category
  updateCategory() {
    if (!this.isApiCallInProgress) {
      this.isApiCallInProgress = true;
      this.productSrv.createCategory(this.categoryObj).subscribe((res: any) => {
        if (res.result) {
          this.isApiCallInProgress = false;
          this.toastr.success('Category Updated Successfully');
          this.resetForm();
          this.getAllCategory();
        } else {
          this.isApiCallInProgress = false;
          this.toastr.error(res.message);
        }
      }, (err: any) => {
        this.isApiCallInProgress = false;
        this.toastr.error(err.message);
      })
    }
  }

  // Edit a category
  onEdit(category: any): void {
    this.categoryObj = { ...category };
    this.isSidePanel = true;
  }

  // Reset form and close side panel
  resetForm(): void {
    this.categoryObj = new CategoryObject();
    this.isSidePanel = false;
  }
}

// Category object model
export class CategoryObject {
  categoryId: number;
  categoryName: string;
  parentCategoryId: number;

  constructor() {
    this.categoryId = 0;
    this.categoryName = '';
    this.parentCategoryId = 0;
  }
}
