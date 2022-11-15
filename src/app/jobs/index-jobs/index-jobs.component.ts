import { Component, OnInit ,AfterViewInit, ViewChild, Output, EventEmitter} from '@angular/core';

// import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
// import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DialogRef } from '@angular/cdk/dialog';
import { outputAst } from '@angular/compiler';
import { jobDTO } from '../job.model';
import { JobsService } from '../jobs.service';
import { FormJobComponent } from '../form-job/form-job.component';
import { EditJobComponent } from '../edit-job/edit-job.component';


@Component({
  selector: 'app-index-jobs',
  templateUrl: './index-jobs.component.html',
  styleUrls: ['./index-jobs.component.css']
})
export class IndexJobsComponent implements OnInit {

  displayedColumns: string[] = ['name','actions'];
  dataSource: MatTableDataSource<jobDTO>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

alert:boolean =false;

  constructor( private jobservice:JobsService,private dialog: MatDialog ) { }

  jobs: jobDTO[];
  columnsToDisplay=['name','actions'];
    ngOnInit(): void {
     this.loadJobs();
    }
  
  
    loadJobs(){
      
      this.jobservice.getAll().subscribe(jobs => {
         
        this.dataSource = new MatTableDataSource(jobs) ;
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
     this.dialog.open(FormJobComponent,{
        width:'30%',
        disableClose: true 
      
      }).afterClosed().subscribe(()=>{
        this.loadJobs();
     });
      
    }
  
  edit(job:jobDTO){
   
    this.dialog.open(EditJobComponent,{
      width:'30%',
      disableClose: true ,
      data:job
    }).afterClosed().subscribe(()=>{
      this.loadJobs();
   });
  }
    delete(id: number){
      this.jobservice.delete(id).subscribe(()=>{
         this.loadJobs();
      });
    }

}
