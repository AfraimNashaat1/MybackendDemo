using DomainLayer.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Core.DTOs
{
     public class DepartmentDTO
    {
        public int Id { get; set; }
        public string DepartmentName { get; set; }
        //public virtual List<Employee> Employees { get; set; }
    }
}
