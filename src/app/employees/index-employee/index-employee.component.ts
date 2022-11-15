import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { employeeDTO } from '../employee.model';
import { EmployeesService } from '../employees.service';
import { FormEmployeeComponent } from '../form-employee/form-employee.component';

@Component({
  selector: 'app-index-employee',
  templateUrl: './index-employee.component.html',
  styleUrls: ['./index-employee.component.css']
})
export class IndexEmployeeComponent implements OnInit {
  displayedColumns: string[] = ['fullname','address','email','photo','job','department','mobilenumber','dateofbirth','age','actions'];
  dataSource: MatTableDataSource<employeeDTO>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private empsservice : EmployeesService ,private dialog: MatDialog) { }
  @Output()
  refdialog: EventEmitter<any> = new EventEmitter<any>();
  selected='';
@Input()
OAlert:boolean;
employees: employeeDTO[];
// columnsToDisplay=['name','actions'];
  ngOnInit(): void {
    debugger;
    this.loadEmps();
    
  }
  loadEmps(){
    debugger;
    this.empsservice.getAll().subscribe(employees => {
    debugger;
    this.employees=employees; 
      this.dataSource = new MatTableDataSource(employees) ;
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    } , 
    error => {
      alert("error  while fitching the record !!");
    }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  openDialog() {
   this.dialog.open(FormEmployeeComponent,{
      width:'30%',
      disableClose: true 
    
    }).afterClosed().subscribe(()=>{
      this.loadEmps();
   });
    
  }
print(reportType:string)
{
  
}
edit(employee:employeeDTO){
 
  this.dialog.open(EditEmployeeComponent,{
    width:'30%',
    disableClose: true ,
    data:employee
  }).afterClosed().subscribe(()=>{
    this.loadEmps();
 });
}
  delete(id: number){
    this.empsservice.delete(id).subscribe(()=>{
       this.loadEmps();
    });
  }
}
