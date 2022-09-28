import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, of, tap } from 'rxjs';
import { AddProductService } from '../services/add-product.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  product = ['New Brand', 'Second Hand', 'Other']
  productForm = new FormGroup<any>({})
  constructor(private productService: AddProductService, private dialogref: MatDialogRef<DialogComponent>) { }
  ngOnInit(): void {
    this.productForm = new FormGroup({
      productName: new FormControl('',[Validators.required]),
      category: new FormControl('',[Validators.required]),
      date: new FormControl('',[Validators.required]),
      freshness: new FormControl('',[Validators.required]),
      price: new FormControl('',[Validators.required]),
      comment: new FormControl('',[Validators.required]),  
    })   
  }
  public addProduct() {
    if(this.productForm.valid) {
      this.productService.postProcuct(this.productForm.value).pipe(
        tap(() => {
          alert('sucesfully added')
          this.productForm.reset()
          this.dialogref.close()
        }),
        catchError(() => {
          alert('error while adding')
          return of({})
        })
      ).subscribe()
    }
  }

}
