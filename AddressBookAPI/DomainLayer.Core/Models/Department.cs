using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Core.Models
{
   public class Department
    {
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string DepartmentName { get; set; }
        public virtual List<Employee> Employees { get; set; }
    }
}
