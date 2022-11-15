using AutoMapper;
using DomainLayer.Core.DTOs;
using DomainLayer.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AddressBookAPI.Helpers
{
    public class AutoMapperProfiles:Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Department, DepartmentDTO>();
            CreateMap<CreationDepartmentDTO, Department>();


            CreateMap<Job, JobDTO>();
            CreateMap<CreationJobDTO, Job>();

            CreateMap<EmployeeCreationDTO, Employee>().ForMember(x=>x.Photo, options=>options.Ignore());
            CreateMap<Employee, EmployeeDTO>() ;


        }
    }
}
