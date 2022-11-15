import { Component, EventEmitter, Inject, Input, OnInit, Optional, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstLetterUppercase } from 'src/app/validator/firstLetterUpperCase';
import { parseWebAPIErrors } from 'src/app/utilitize/utils';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { creationJobDTO, jobDTO } from '../job.model';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-form-job',
  templateUrl: './form-job.component.html',
  styleUrls: ['./form-job.component.css']
})
export class FormJobComponent implements OnInit {

  constructor (private formBuilder: FormBuilder, private jobservice:JobsService, @Optional() @Inject(MAT_DIALOG_DATA) public editData : jobDTO ) { }
  form: FormGroup;
  errors: string[] = [];
  actionBtn:string;
  titleLabel:string;
  @Input()
  model:creationJobDTO;
  @Output()
  onSaveChanges: EventEmitter<creationJobDTO> = new EventEmitter<creationJobDTO>();

    ngOnInit(): void {
      this.form=this.formBuilder.group({
        jobTitle:['',{
          validators:[Validators.required,Validators.minLength(3), firstLetterUppercase()]
        }]
      });
      if(this.model !== undefined)
      {
        this.form.patchValue(this.model);
      }
      // if(this.editData)
      // {
      //   this.form.controls['departmentName'].setValue(this.editData.departmentName);
      // }
     if(this.editData){
      debugger;
      this.titleLabel= 'تعديل وظيفة';
      this.actionBtn='حفظ التعديلات';
      this.form.controls['jobTitle'].setValue(this.editData.jobTitle);
     }
     else{
      this.actionBtn='أضافة';
      this.titleLabel= ' أضافة وظيفة جديد';

     }
    }
    
    addEditJob(){
if(!this.editData)
{
  this.jobservice.create(this.form.value).subscribe(()=>{
       
    alert("تم اضافة القسم بنجاح");
    // this.dialogRef.close('save');
    
   
    

  }, error => {
    this.errors = parseWebAPIErrors(error);
    alert(this.errors);
  });
}
else{
 this.updateJob();
}
      
    }
    updateJob(){
this.jobservice.edit(this.editData.id,this.form.value).subscribe(()=>{
  alert('تمت عملية التعديل بنجاح');
});
    }
    savechanges()
    {
     this.onSaveChanges.emit(this.form.value);
    }
    getErrorMessageFieldName()
    {
      const field=this.form.get('jobTitle');
      if(field.hasError('required')){
            return 'the name field is required';
      }
      if(field.hasError('minlength')){
        return 'the min length of name field  is 3';
  
  }
  if(field.hasError('firstLetterUppercase')){
    return field.getError('firstLetterUppercase').message;
  }
      return '';
 

}
}