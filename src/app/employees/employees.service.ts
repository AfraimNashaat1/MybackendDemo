import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { departmentDTO } from '../departments/department.model';
import { formatDateFormData } from '../utilitize/utils';
import { employeeCreationDTO, employeeDTO } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http:HttpClient) {

  }
  private apiURL= environment.apiURL+'/employees';
 getAll():Observable<employeeDTO[]>{
  debugger;
    return this.http.get<employeeDTO[]>(this.apiURL);
   
   
 }
 ;
 getById(id: number):Observable<employeeDTO>{
  debugger
   return this.http.get<employeeDTO>(`${this.apiURL}/${id}`);
 }

 getReport(reportType: string, reportName:string):Observable<any>{
  debugger
   return this.http.get<any>(`${this.apiURL}/${reportName}/${reportType}`);
 }
create( employee: employeeCreationDTO){
  debugger;

const formData=this.BuildFormData(employee);
 return this.http.post(this.apiURL, formData);
}
edit(id: number,  employee: employeeCreationDTO){
  debugger;
  const formData=this.BuildFormData(employee);
 return this.http.put(`${this.apiURL}/${id}`, formData);
}

private BuildFormData(employee:employeeCreationDTO): FormData{
const formData=new FormData();
formData.append('FullName',employee.FullName);
formData.append('MobileNumber',employee.MobileNumber);
formData.append('Address',employee.Address);
formData.append('DateOfBirth', formatDateFormData(employee.DateOfBirth));
formData.append('Age',String(employee.Age));
formData.append('Email',employee.Email);
formData.append('DepartmentId',String(employee.DepartmentId));
formData.append('JobId',String(employee.JobId));

if(employee.Photo)
{
  formData.append('Photo',employee.Photo);

}

return formData;

}

delete(id: number){
 return this.http.delete(`${this.apiURL}/${id}`);
}
}
