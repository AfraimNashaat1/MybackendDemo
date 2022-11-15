import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHeaderComponent } from './adminTemplete/main-header/main-header.component';
import { MainSidebarComponent } from './adminTemplete/main-sidebar/main-sidebar.component';
import { ContentWrapperComponent } from './adminTemplete/content-wrapper/content-wrapper.component';
import { ControlSidebarComponent } from './adminTemplete/control-sidebar/control-sidebar.component';
import { MainFooterComponent } from './adminTemplete/main-footer/main-footer.component';
import { IndexDepartmentsComponent } from './departments/index-departments/index-departments.component';
import { FormDepartmentComponent } from './departments/form-department/form-department.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {  ReactiveFormsModule } from '@angular/forms';
import { DisplayErrorsComponent } from './utilitize/display-errors/display-errors.component';
import { CreateDepartmentComponent } from './departments/create-department/create-department.component';
import { MatTableModule } from '@angular/material/table' 
import { GenericListComponent } from './utilitize/generic-list/generic-list.component';
import{SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2'
import {HttpClientModule} from '@angular/common/http'
import {MatPaginatorModule} from '@angular/material/paginator';

import { EditDepartmentsComponent } from './departments/edit-departments/edit-departments.component';
import { TestComponent } from './departments/test/test.component';
import { TestttComponent } from './departments/testtt/testtt.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import { InputImgComponent } from './utilitize/input-img/input-img.component';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { CreateJobComponent } from './jobs/create-job/create-job.component';
import { IndexJobsComponent } from './jobs/index-jobs/index-jobs.component';
import { FormJobComponent } from './jobs/form-job/form-job.component';
import { EditJobComponent } from './jobs/edit-job/edit-job.component';
import { FormEmployeeComponent } from './employees/form-employee/form-employee.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import { IndexEmployeeComponent } from './employees/index-employee/index-employee.component';
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    MainSidebarComponent,
    ContentWrapperComponent,
    ControlSidebarComponent,
    MainFooterComponent,
    IndexDepartmentsComponent,
    FormDepartmentComponent,
    DisplayErrorsComponent,
    CreateDepartmentComponent,
    GenericListComponent,
    EditDepartmentsComponent,
    TestComponent,
    TestttComponent,
    CreateJobComponent,
    IndexJobsComponent,
    FormJobComponent,
    EditJobComponent,
    FormEmployeeComponent,
    InputImgComponent,
    IndexEmployeeComponent,
    EditEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    SweetAlert2Module.forRoot(),
    HttpClientModule,
    MatSortModule, 

    // NgbModule
 
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
