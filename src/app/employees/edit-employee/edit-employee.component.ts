import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { employeeCreationDTO, employeeDTO } from '../employee.model';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

    // constructor(public model:NgbActiveModal) { }
    constructor(private activatedroute:ActivatedRoute ,private empsServices:EmployeesService
      ,private router:Router,
       ) { }
    
    // departmentDTO:departmentDTO;
  
    model:employeeDTO;
    model1:employeeCreationDTO;
    
      ngOnInit(): void {
        debugger;
        this.activatedroute.params.subscribe(
          params =>{
            debugger;
            this.empsServices.getById(params.id).subscribe(emp => {
              this.model = emp;
            }
              // debugger;
              // this.model = emp;
           );
          }
        );
      }
    
     
    
    
      saveChanges(employeeCreationDTO: employeeCreationDTO){
        this.empsServices.edit(this.model.id,employeeCreationDTO).subscribe(()=>{
         this.router.navigate(["/employees"]); 
        });
    
      }

}
