using DomainLayer.Core.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Core.DTOs
{
     public class EmployeeDTO
    {
        public int Id { get; set; }
        public string FullName { get; set; }

        public string MobileNumber { get; set; }
        public DateTime DateOfBirth { get; set; }

        public string Address { get; set; }

        public string Email { get; set; }

        public DepartmentDTO Department { get; set; }
        public JobDTO Job { get; set; }



        public int DepartmentId { get; set; }
        public int JobId { get; set; }
        public string Photo { get; set; }
        public int Age { get; set; }
    }
}
