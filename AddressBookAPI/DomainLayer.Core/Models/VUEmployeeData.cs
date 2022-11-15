using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Core.Models
{
   public class VUEmployeeData
    {
        public int Id { get; set; }
        public string FullName { get; set; }
       
        public string MobileNumber { get; set; }
        public DateTime DateOfBirth { get; set; }

        public String Address { get; set; }
        
        public string Email { get; set; }
       
        public int Age { get; set; }
        public string DepartmentName { get; set; }
        public string JobTitle { get; set; }
    }
}
