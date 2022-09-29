import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, of, tap } from 'rxjs';
import { AddProductService } from '../services/add-product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  product = ['New Brand', 'Second Hand', 'Other']
  btn: string = 'save'
  productForm = new FormGroup<any>({})
  constructor(private productService: AddProductService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogref: MatDialogRef<DialogComponent>) { }
  ngOnInit(): void {
    this.productForm = new FormGroup({
      productName: new FormControl('',[Validators.required]),
      category: new FormControl('',[Validators.required]),
      date: new FormControl('',[Validators.required]),
      freshness: new FormControl('',[Validators.required]),
      price: new FormControl('',[Validators.required]),
      comment: new FormControl('',[Validators.required]),  
    })   
    if(this.editData) {
      this.btn = 'Update'
      this.productForm.controls['productName'].setValue(this.editData.productName)
      this.productForm.controls['category'].setValue(this.editData.category)
      this.productForm.controls['date'].setValue(this.editData.date)
      this.productForm.controls['freshness'].setValue(this.editData.freshness)
      this.productForm.controls['price'].setValue(this.editData.price)
      this.productForm.controls['comment'].setValue(this.editData.comment)

    }
  }
  public addProduct() {
    if(!this.editData){
      if(this.productForm.valid) {
        this.productService.postProcuct(this.productForm.value).pipe(
          tap(() => {
            alert('sucesfully added')
            this.productForm.reset()
            this.dialogref.close('save')
          }),
          catchError(() => {
            alert('error while adding')
            return of({})
          })
        ).subscribe()
      }
    }else{
      this.updateProduct()
    }
  }
  public updateProduct() {
    this.productService.putProduct(this.productForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('update successfully')
        this.productForm.reset()
        this.dialogref.close('update')
      },
      error: ()=> {
        alert('error while updating the record')
      }
    })
  }

}
