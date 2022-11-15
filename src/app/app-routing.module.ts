import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule,  } from '@angular/router';

import { IndexDepartmentsComponent } from './departments/index-departments/index-departments.component';
import { FormDepartmentComponent } from './departments/form-department/form-department.component';
import { CreateDepartmentComponent } from './departments/create-department/create-department.component';
import { TestComponent } from './departments/test/test.component';
import { IndexJobsComponent } from './jobs/index-jobs/index-jobs.component';
import { FormEmployeeComponent } from './employees/form-employee/form-employee.component';
import { IndexEmployeeComponent } from './employees/index-employee/index-employee.component';
import { EditDepartmentsComponent } from './departments/edit-departments/edit-departments.component';
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';

const routes: Routes = [
  {path:'departments',component: IndexDepartmentsComponent},
  {path:'jobs', component: IndexJobsComponent},
  {path:'employees', component: IndexEmployeeComponent},
  {path:'employees/edit/:id', component: EditEmployeeComponent},

  {path:'empformsss', component: FormDepartmentComponent}


 
 
  // { path: '**', component: TestDepartmentComponent }


  
];

@NgModule({
  declarations: [],
  imports: [
    // CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
