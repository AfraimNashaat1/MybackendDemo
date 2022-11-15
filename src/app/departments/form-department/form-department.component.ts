import { Component, EventEmitter, Inject, Input, OnInit, Optional, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstLetterUppercase } from 'src/app/validator/firstLetterUpperCase';
import { creationDepartmentDTO, departmentDTO } from '../department.model';
// import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
// import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { DepartmentsService } from '../departments.service';
import { parseWebAPIErrors } from 'src/app/utilitize/utils';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';




@Component({
  selector: 'app-form-department',
  templateUrl: './form-department.component.html',
  styleUrls: ['./form-department.component.css']
})
export class FormDepartmentComponent implements OnInit {
  //Important note: i can those of dialogRef by use @optional before it like using of MAT_DIALOG_DATA
  // private dialogRef:MatDialogRef<EditDepartmentsComponent>  , @Inject(MAT_DIALOG_DATA) public editData : creationDepartmentDTO
  // public dialog: MatDialog, public dialogRef : MatDialogRef<FormDepartmentComponent>, @Inject(MAT_DIALOG_DATA) private data: any
  // , public dialogRef: MatDialogRef<FormDepartmentComponent>
  // private alertConfig: NgbAlertConfig,
  constructor ( private formBuilder: FormBuilder, private deptservice:DepartmentsService, @Optional() @Inject(MAT_DIALOG_DATA) public editData : departmentDTO ) { }
  form: FormGroup;
  errors: string[] = [];
  alert:boolean=false;
  actionBtn:string;
  titleLabel:string;
  @Input()
  model:creationDepartmentDTO;
  @Output()
  onSaveChanges: EventEmitter<creationDepartmentDTO> = new EventEmitter<creationDepartmentDTO>();
  @Output()
  OAlert: boolean;
    ngOnInit(): void {
      this.form=this.formBuilder.group({
        departmentName:['',{
          validators:[Validators.required,Validators.minLength(3), firstLetterUppercase()]
        }]
      });
      debugger;
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
      this.titleLabel= 'تعديل قسم';
      this.actionBtn='حفظ التعديلات';
      this.form.controls['departmentName'].setValue(this.editData.departmentName);
     }
     else{
      this.actionBtn='أضافة';
      this.titleLabel= ' أضافة قسم جديد';

     }
    }
    
    addEditDepartment(){
if(!this.editData)
{
  this.deptservice.create(this.form.value).subscribe(()=>{
       this.alert=true;
    alert("تم اضافة القسم بنجاح");
    // this.alertConfig.type='success';
    // this.alertConfig.dismissible = false;
    // this.dialogRef.close('save');
    
   
    

  }, error => {
    this.errors = parseWebAPIErrors(error);
    alert(this.errors);
  });
}
else{
 this.updateDepartment();
}
      
    }
    updateDepartment(){
this.deptservice.edit(this.editData.id,this.form.value).subscribe(()=>{
  alert('تمت عملية التعديل بنجاح');
  // this.alertConfig.type='success';
  this.alert=true;
  // this.alertConfig.dismissible = false;
});
    }
    savechanges()
    {
     this.onSaveChanges.emit(this.form.value);
    }
    getErrorMessageFieldName()
    {
      const field=this.form.get('departmentName');
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
