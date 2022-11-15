using AddressBookAPI.Services;
using AutoMapper;
using DomainLayer.Core.DTOs;
using DomainLayer.Core.Interfaces;
using DomainLayer.Core.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;

namespace AddressBookAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IBaseRepository<Employee> _employeesRepository;
        private readonly IMapper mapper;
        private readonly IReportService _reportService;
        private string container = "Employees";


        public EmployeesController(IBaseRepository<Employee> employeesRepository, IMapper mapper, IReportService reportService)
        {
            _employeesRepository = employeesRepository;
            this.mapper = mapper;
            _reportService = reportService;
        }

        [HttpGet("{Id:int}")]
        public async Task<ActionResult<EmployeeDTO>> Get(int Id)
        {
            var employee = await _employeesRepository.GetById(Id);
            if (employee == null)
            {
                return NotFound();
            }
            return mapper.Map<EmployeeDTO>(employee);
        }

        [HttpGet]
        public async Task<ActionResult<List<EmployeeDTO>>> Get()
         {
            var employees = await _employeesRepository.GetAll();

            return mapper.Map<List<EmployeeDTO>>(employees);
        }
        [HttpPost]
        public async Task<ActionResult> Post([FromForm] EmployeeCreationDTO  employeeCreationDTO)
        {
            var employee = mapper.Map<Employee>(employeeCreationDTO);
            if (employeeCreationDTO.Photo != null)
            {
                employee.Photo = await _employeesRepository.SaveFile(container, employeeCreationDTO.Photo);
                
            }
            await _employeesRepository.Create(employee);
            
            return NoContent();


        }


        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id,[FromForm] EmployeeCreationDTO  employeeCreationDTO)
        {
            var employee = await _employeesRepository.GetById(id);
            if (employee == null)
            {
                return NotFound();
            }
            employee = mapper.Map(employeeCreationDTO,employee);
            employee.Id = id;
            if (employeeCreationDTO.Photo != null)
            {
                employee.Photo = await _employeesRepository.EditFile(container, employee.Photo,employeeCreationDTO.Photo);

            }
            await _employeesRepository.Edit(employee);
            return NoContent();


        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            Employee  employee = await _employeesRepository.GetById(id);

            await _employeesRepository.Delete(employee);
            await _employeesRepository.DeleteFile(employee.Photo, container);

            return NoContent();


        }
        [HttpGet("{reportName}/{reportType}")]
        public ActionResult Get(string reportName, string reportType)
        {
            var reportFileByteString = _reportService.GenerateReportAsync(reportName, reportType);
            return File(reportFileByteString, MediaTypeNames.Application.Octet, getReportName(reportName, reportType));
            //return File(result.MainStream, "application/pdf");

        }

        private string getReportName(string reportName, string reportType)
        {
            var outputFileName = reportName + ".pdf";
            switch (reportType.ToUpper())
            {
                default:
                case "PDF":
                    outputFileName = reportName + ".pdf";
                    break;
                case "XLS":
                    outputFileName = reportName + ".xls";
                    break;
                case "WORD":
                    outputFileName = reportName + ".doc"; ;
                    break;


            }
            return outputFileName;
        }
    }
}
