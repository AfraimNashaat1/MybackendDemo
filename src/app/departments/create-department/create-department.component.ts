import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseWebAPIErrors } from 'src/app/utilitize/utils';
import { creationDepartmentDTO } from '../department.model';
import { DepartmentsService } from '../departments.service';


@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class CreateDepartmentComponent implements OnInit {

  errors: string[] = [];
  // constructor(private router:Router ,private departmentservice: departmentService){}
  constructor( private router:Router , private deptservice:DepartmentsService ){}
  ngOnInit(): void {
    
  }
  savechanges(creationDepartmentDTO: creationDepartmentDTO)
  {
    this.deptservice.create(creationDepartmentDTO).subscribe(()=>{
      this.router.navigate(['/departments']);

    }, error => this.errors = parseWebAPIErrors(error));
    
    //console.log(genreCreationDTO);
 
 
  }

}
