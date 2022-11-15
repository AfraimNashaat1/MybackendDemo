using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Core.DTOs
{
     public class EmployeeCreationDTO
    {
        public string FullName { get; set; }
        
        public string MobileNumber { get; set; }
        public DateTime DateOfBirth { get; set; }

        public string Address { get; set; }
        
        public string Email { get; set; }
        public IFormFile Photo { get; set; }
        public int Age { get; set; }
        public int DepartmentId { get; set; }
        public int JobId { get; set; }

        

    }
}
