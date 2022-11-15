import { Component, OnInit ,AfterViewInit, ViewChild, Output, EventEmitter, Input} from '@angular/core';

import {  departmentDTO } from '../department.model';
import { DepartmentsService } from '../departments.service';

import { EditDepartmentsComponent } from '../edit-departments/edit-departments.component';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FormDepartmentComponent } from '../form-department/form-department.component';
import { DialogRef } from '@angular/cdk/dialog';
import { outputAst } from '@angular/compiler';



@Component({
  selector: 'app-index-departments',
  templateUrl: './index-departments.component.html',
  styleUrls: ['./index-departments.component.css']
})
export class IndexDepartmentsComponent implements OnInit {
  displayedColumns: string[] = ['name','actions'];
  dataSource: MatTableDataSource<departmentDTO>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;





  // constructor( private deptservice:DepartmentsService, ) { }
   constructor( private deptservice:DepartmentsService,private dialog: MatDialog ) { }

   @Output()
   refdialog: EventEmitter<any> = new EventEmitter<any>();
@Input()
OAlert:boolean;
departments: departmentDTO[];
columnsToDisplay=['name','actions'];
  ngOnInit(): void {
   this.loadDepts();
  }


  loadDepts(){
    
    this.deptservice.getAll().subscribe(departments => {
       
      this.dataSource = new MatTableDataSource(departments) ;
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
   this.dialog.open(FormDepartmentComponent,{
      width:'30%',
      disableClose: true 
    
    }).afterClosed().subscribe(()=>{
      this.loadDepts();
   });
    
  }

edit(department:departmentDTO){
 
  this.dialog.open(EditDepartmentsComponent,{
    width:'30%',
    disableClose: true ,
    data:department
  }).afterClosed().subscribe(()=>{
    this.loadDepts();
 });
}
  delete(id: number){
    this.deptservice.delete(id).subscribe(()=>{
       this.loadDepts();
    });
  }


  

  }


