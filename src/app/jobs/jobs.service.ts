import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { creationJobDTO, jobDTO } from './job.model';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http:HttpClient) {

  }
  private apiURL= environment.apiURL+'/jobs';
 getAll():Observable<jobDTO[]>{
    return this.http.get<jobDTO[]>(this.apiURL);

 }
 getById(id: number):Observable<jobDTO>{
   return this.http.get<jobDTO>(`${this.apiURL}/${id}`);
 }
create( job: creationJobDTO){
 return this.http.post(this.apiURL, job);
}
edit(Id:number,  job: creationJobDTO){
 return this.http.put(`${this.apiURL}/${Id}`, job);
}
delete(id: number){
 return this.http.delete(`${this.apiURL}/${id}`);
}
}
