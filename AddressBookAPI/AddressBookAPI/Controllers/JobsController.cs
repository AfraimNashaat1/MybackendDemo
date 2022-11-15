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
    public class JobsController : ControllerBase
    {
        private readonly IBaseRepository<Job> _jobsRepository;
        private readonly IMapper mapper;

        public JobsController(IBaseRepository<Job> jobsRepository, IMapper mapper)
        {
            _jobsRepository = jobsRepository;
            this.mapper = mapper;
        }
        [HttpGet("{Id:int}")]
        public async Task<ActionResult<JobDTO>> Get(int Id)
        {
            var job = await _jobsRepository.GetById(Id);
            if (job == null)
            {
                return NotFound();
            }
            return mapper.Map<JobDTO>(job);
        }

        [HttpGet]
        public async Task<ActionResult<List<JobDTO>>> Get()
        {
            var jobs = await _jobsRepository.GetAll();
            return mapper.Map<List<JobDTO>>(jobs);
        }
        [HttpPost]
        public async Task<ActionResult> Post(CreationJobDTO creationJobDTO)
        {
            var job = mapper.Map<Job>(creationJobDTO);
            await _jobsRepository.Create(job);
            return NoContent();


        }


        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, CreationJobDTO  creationJobDTO)
        {
            var job = mapper.Map<Job>(creationJobDTO);
            job.Id = id;
            await _jobsRepository.Edit(job);
            return NoContent();


        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            Job job = await _jobsRepository.GetById(id);

            await _jobsRepository.Delete(job);
            return NoContent();


        }
    }
}
