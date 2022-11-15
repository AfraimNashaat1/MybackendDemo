using AutoMapper;
using DomainLayer.Core.DTOs;
using DomainLayer.Core.Interfaces;
using DomainLayer.Core.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AddressBookAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly IBaseRepository<Department> _deparmentsRepository;
        private readonly IMapper mapper;

        public DepartmentsController(IBaseRepository<Department> deparrmentsRepository, IMapper mapper)
        {
            _deparmentsRepository = deparrmentsRepository;
            this.mapper = mapper;
        }
        [HttpGet("{Id:int}")]
        public async Task<ActionResult<DepartmentDTO>> Get(int Id)
        {
            var department =   await _deparmentsRepository.GetById(Id);
            if (department==null)
            {
                return NotFound();
            }
            return mapper.Map<DepartmentDTO>(department);
        }

        [HttpGet]
        public async Task<ActionResult<List<DepartmentDTO>>> Get()
        {
            var departments = await _deparmentsRepository.GetAll();
            return mapper.Map<List<DepartmentDTO>>(departments);
        }
        [HttpPost]
        public async Task<ActionResult> Post(CreationDepartmentDTO CreationDepartmentDTO)
        {
            var department = mapper.Map<Department>(CreationDepartmentDTO);
            await _deparmentsRepository.Create(department);
            return NoContent();
            

        }


        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id,CreationDepartmentDTO CreationDepartmentDTO)
        {   
            var department = mapper.Map<Department>(CreationDepartmentDTO);
            department.Id = id;
            await _deparmentsRepository.Edit(department);
            return NoContent();


        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            Department department = await _deparmentsRepository.GetById(id);
            
            await _deparmentsRepository.Delete(department);
            return NoContent();


        }
    }
}
