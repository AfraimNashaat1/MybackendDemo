import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';


import { creationDepartmentDTO, departmentDTO } from '../department.model';
import { DepartmentsService } from '../departments.service';



@Component({
  selector: 'app-edit-departments',
  templateUrl: './edit-departments.component.html',
  styleUrls: ['./edit-departments.component.css']
})
export class EditDepartmentsComponent implements OnInit {

  // constructor(public model:NgbActiveModal) { }
   constructor(private activatedroute:ActivatedRoute ,private deptServices:DepartmentsService
  ,private router:Router,
   ) { }

// departmentDTO:departmentDTO;
model:departmentDTO;

  ngOnInit(): void {
    debugger;
    this.activatedroute.params.subscribe(
      params =>{
        debugger;
        this.deptServices.getById(params.id).subscribe(dept => {
          debugger;
          this.model = dept;
        });
      }
    );
  }

 


  saveChanges(creationDepartmentDTO: creationDepartmentDTO){
    this.deptServices.edit(this.model.id,creationDepartmentDTO).subscribe(()=>{
     this.router.navigate(["/departments"]); 
    });

  }

}
