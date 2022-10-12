import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog'
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  blogForm !: FormGroup;
  actionBtn : string = "Save";

  constructor(private formBuilder : FormBuilder, 
    private api : ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.blogForm = this.formBuilder.group({ 
      Id : ['',Validators.required],
      Tittle : ['',Validators.required],
      Content : ['', Validators.required],
      date : ['', Validators.required]

    })
    if(this.editData){
      this.actionBtn = "update";
      this.blogForm.controls['Id'].setValue(this.editData.Id);
      this.blogForm.controls['Tittle'].setValue(this.editData.Tittle);
      this.blogForm.controls['Content'].setValue(this.editData.Content);
      this.blogForm.controls['date'].setValue(this.editData.date);

    }
  }
  addBlog(){
    if(!this.editData){
    if(this.blogForm.valid){
     this.api.postBlog(this.blogForm.value)
     .subscribe({
      next:(res)=>{
       alert("Blog added successfully") 
       //For making reset the form
       this.blogForm.reset();
       this.dialogRef.close('save');
      },
       error:()=>{
       alert("error while adding the blog")
      }

})
    }
  }else{
    this.updateBlog()
  }
}
updateBlog(){
  this.api.putBlog(this.blogForm.value, this.editData.id)
  .subscribe({
    next:(res)=>{
      alert("Blog updated Successfully");
      this.blogForm.reset();
      this.dialogRef.close('update');
    },
    error:()=>{
      alert("Error while updating the record");
    }
  })
}

  }







