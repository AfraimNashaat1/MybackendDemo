using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Core.Models
{
     public class Employee
    {
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string FullName { get; set; }
        [MaxLength(11)]
        [MinLength(11)]
        public string MobileNumber { get; set; }
        public DateTime DateOfBirth { get; set; }

        public String Address { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string Photo { get; set; }
        public int Age { get; set; }
        public int DepartmentId { get; set; }
        public virtual Department Department { get; set; }
        public int JobId { get; set; }
        public virtual Job Job { get; set; }
    }
}
