import { Component, EventEmitter, Inject, Input, OnInit, Optional, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throwIfEmpty } from 'rxjs';
import { departmentDTO } from 'src/app/departments/department.model';
import { DepartmentsService } from 'src/app/departments/departments.service';
import { jobDTO } from 'src/app/jobs/job.model';
import { JobsService } from 'src/app/jobs/jobs.service';
import { parseWebAPIErrors } from 'src/app/utilitize/utils';
import { firstLetterUppercase } from 'src/app/validator/firstLetterUpperCase';
import { employeeCreationDTO, employeeDTO } from '../employee.model';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.css']
})
export class FormEmployeeComponent implements OnInit {
  titleLabel:string='بيانات الموظف';
  actionBtn:string='حفظ';
  constructor(private formBuilder: FormBuilder, private depservice:DepartmentsService, private jobservice:JobsService, private empservice:EmployeesService, @Optional() @Inject(MAT_DIALOG_DATA) public editData : employeeDTO, @Optional() @Inject(MAT_DIALOG_DATA) public editData1 : employeeCreationDTO) { }
 form:FormGroup;
 deptsList:departmentDTO[];
 jobsList:jobDTO[];
 alert:boolean=false;
 Photo:string;
 errors: string[] = [];
 @Input()
 model:employeeDTO;
 @Output()
  onSaveChanges: EventEmitter<employeeCreationDTO> = new EventEmitter<employeeCreationDTO>();
  ngOnInit(): void {
this.depservice.getAll().subscribe(depts=>{
  debugger;
this.deptsList=depts;
 });
 this.jobservice.getAll().subscribe(jobs=>{
  this.jobsList=jobs;
 });
  this.form=this.formBuilder.group({
    FullName:['',{
      validators:[Validators.required, Validators.minLength(3),firstLetterUppercase()]
    }

    ],
    MobileNumber:['',{
      validators:[Validators.required,Validators.minLength(11),Validators.maxLength(11)]
    }],


    Address:['',{
    validators:[Validators.required]
    }],

    Email:['',{
      validators:[Validators.email,Validators.required]
    }],
    DateOfBirth:'',
    Photo:'',
    Age:'',
   DepartmentId:'',
    JobId:''

  });
  if(this.model !== undefined)
  {
    this.form.patchValue(this.model);
  }
  if(this.editData){
    debugger;
    this.titleLabel= 'تعديل بيانات موظف';
    this.actionBtn='حفظ التعديلات';
    // this.form.setValue(this.editData);
    this.form.controls['FullName'].setValue(this.editData.fullName);
    this.form.controls['MobileNumber'].setValue(this.editData.mobileNumber);
    this.form.controls['Address'].setValue(this.editData.address);
    this.form.controls['Email'].setValue(this.editData.email);
    this.form.controls['Age'].setValue(this.editData.age);
    this.form.controls['DateOfBirth'].setValue(this.editData.dateOfBirth);
    
    // this.form.controls['Photo'].setValue(this.editData.photo);
    this.form.controls['DepartmentId'].setValue(this.editData.departmentId);
    this.form.controls['JobId'].setValue(this.editData.jobId);
    this.Photo=this.editData.photo;


   }
   else{
    this.actionBtn='أضافة';
    this.titleLabel= ' أضافة موظف جديد';

   }
  }
  addEditEmployee(){
    debugger;
if(!this.editData){
this.empservice.create(this.form.value).subscribe(()=>{
  this.alert=true;
  alert("تم اضافة الموظف بنجاح");
},
error=>{

  this.errors=parseWebAPIErrors(error);
  alert(this.errors);

});

}
else
{
  debugger;
  this.updateEmp();
}

  }


  updateEmp(){
    debugger;
    this.empservice.edit(this.editData.id,this.form.value).subscribe(()=>{
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
    debugger;
    const fieldFN=this.form.get('FullName');
    

    if(fieldFN.hasError('required') ){
           return 'the name field is required';
      }
    if(fieldFN.hasError('minlength')){
           return 'The Min Length of Full Name Field  Is 3';
      }
    if(fieldFN.hasError('firstLetterUppercase')){
           return fieldFN.getError('firstLetterUppercase').message;
      }


 


          return '';
  }

  getErrorMessageMobileNumber(){
    const fieldMN=this.form.get('MobileNumber');
    if(fieldMN.hasError('required')){
      return 'the Mobile Number field is required';
 }
    if(fieldMN.hasError('minlength')){
      return ' The Min Length Of Mobile Number Field Is 11 digits ';
 }
 if(fieldMN.hasError('maxlength')){
  return ' The Max Length Of Mobile Number Field Is 11 digits ';
}

  }
  getErrorMessageEmail(){
    const fieldE=this.form.get('Email');
    if(fieldE.hasError('required')){
      return 'the Email field is required';
 }
    if(fieldE.hasError('email')){
      return ' The Email Must be "Example@ServerMailName.com" ';
      
    }


  }

  getErrorMessageAddress(){
    
    const fieldA=this.form.get('Address');
    if(fieldA.hasError('required')){
      return 'the Address field is required';
 }

  }




  onSelectedImage(image)
  {
    debugger;
    this.form.get('Photo').setValue(image);
  }

}
