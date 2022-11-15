using DomainLayer.Core.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.EF.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        protected ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public BaseRepository(ApplicationDbContext context,IWebHostEnvironment env, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _env = env;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<T> Create(T entity)
        {
           _context.Set<T>().Add(entity);
           await _context.SaveChangesAsync();
            return entity;
        }

       

        public async Task<IEnumerable<T>> GetAll()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<T> GetById(int id)
        {
            return  await _context.Set<T>().FindAsync(id);
            
        }

        public async Task Delete(T entity)
        {
            
            _context.Remove(entity);
            await _context.SaveChangesAsync();
            
        }

        public async Task Edit(T entity)
        {
             
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            
            
        }
        public Task DeleteFile(string fileRoute, string containerName)
        {
            if (string.IsNullOrEmpty(fileRoute))
            {
                return Task.CompletedTask;

            }
            var filename = Path.GetFileName(fileRoute);
            var fileDirectory = Path.Combine(_env.WebRootPath, containerName, filename);
            if (File.Exists(fileDirectory))
            {
                File.Delete(fileDirectory);
            }
            return Task.CompletedTask;
        }

        public async Task<string> EditFile(string containerName, string fileRoute, IFormFile file)
        {
            await DeleteFile(fileRoute, containerName);
            return await SaveFile(containerName, file);
        }

        public async Task<string> SaveFile(string containerName, IFormFile file)
        {
            var extension = Path.GetExtension(file.FileName);
            var fileName = $"{Guid.NewGuid()}{extension}";
            string folder = Path.Combine(_env.WebRootPath, containerName);
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);


            }

            string route = Path.Combine(folder, fileName);
            using (var ms = new MemoryStream())
            {
                
                await file.CopyToAsync(ms);
                 
                var content = ms.ToArray();
                await File.WriteAllBytesAsync(route, content);
                

            }


            var url = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}";
            var routeForDB = Path.Combine(url, containerName, fileName).Replace("\\", "/");
            return routeForDB;
        }

    }
}
