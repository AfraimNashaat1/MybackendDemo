import { departmentDTO } from "../departments/department.model";
import { jobDTO } from "../jobs/job.model";

export interface employeeCreationDTO{
    FullName:string;
    MobileNumber: string;
    DateOfBirth: Date;
    Address: string;
    Email:string;
    Age:number;
    DepartmentId:number;
    JobId:number;
    Photo: string;
    // Department:departmentDTO;
    // Job:jobDTO;
    }
    export interface employeeDTO{
        id:number;
        fullName:string;
       mobileNumber: string;
        dateOfBirth: Date;
        address: string;
        email:string;
        age:number;
        department:departmentDTO;
        // departmentName:string;
        // jobTitle:string;
        departmentId:number;
        jobId:number;
        job:jobDTO;
        photo: string;
     
       
        }