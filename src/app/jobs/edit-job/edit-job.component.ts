import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { creationJobDTO, jobDTO } from '../job.model';
import { JobsService } from '../jobs.service';



@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {

  constructor(private activatedroute:ActivatedRoute ,private jobservice:JobsService
    ,private router:Router ) { }


     model:jobDTO;

  ngOnInit(): void {
    debugger;
    this.activatedroute.params.subscribe(
      params =>{
        debugger;
        this.jobservice.getById(params.id).subscribe(jobs => {
          debugger;
          this.model = jobs;
        });
      }
    );
  }

 


  saveChanges(creationJobDTO: creationJobDTO){
    this.jobservice.edit(this.model.id,creationJobDTO).subscribe(()=>{
     this.router.navigate(["/jobs"]); 
    });

  }

 

}
