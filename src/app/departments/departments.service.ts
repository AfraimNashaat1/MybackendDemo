import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { creationDepartmentDTO, departmentDTO } from './department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(private http:HttpClient) {

  }
  private apiURL= environment.apiURL+'/departments';
 getAll():Observable<departmentDTO[]>{
    return this.http.get<departmentDTO[]>(this.apiURL);

 }
 getById(id: number):Observable<departmentDTO>{
   return this.http.get<departmentDTO>(`${this.apiURL}/${id}`);
 }
create( derpartment: creationDepartmentDTO){
 return this.http.post(this.apiURL, derpartment);
}
edit(Id:number,  derpartment: creationDepartmentDTO){
 return this.http.put(`${this.apiURL}/${Id}`, derpartment);
}
delete(id: number){
 return this.http.delete(`${this.apiURL}/${id}`);
}
}
