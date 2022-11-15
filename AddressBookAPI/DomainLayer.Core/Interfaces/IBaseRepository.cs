using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Core.Interfaces
{
    public interface IBaseRepository<T> where T : class
    {
        Task<T> GetById(int id);
        Task<IEnumerable<T>> GetAll();
         Task<T> Create(T entity);
         Task Edit(T entity);
        Task Delete(T entity);
        Task DeleteFile(string fileRoute, string containerName);
        Task<string> SaveFile(string containerName, IFormFile file);
        Task<string> EditFile(string containerName, string fileRoute, IFormFile file);





    }
}
