using AspNetCore.Reporting;
//using Microsoft.Reporting.NETCore;
using DomainLayer.Core.Interfaces;
using DomainLayer.Core.Models;
using RepositoryLayer.EF;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.IO;

namespace AddressBookAPI.Services
{

    public interface IReportService
    {
        byte[] GenerateReportAsync(string reportName, string reportType);
    }
    public class ReportService : IReportService

    {
        private readonly IBaseRepository<Employee> _baseRepository;
        private readonly ApplicationDbContext _context;

        public ReportService(IBaseRepository<Employee> baseRepository, ApplicationDbContext context)
        {
           _baseRepository = baseRepository;
            _context = context;
        }
        public byte[] GenerateReportAsync(string reportName, string reportType)
        {
            string fileDirPath = Assembly.GetExecutingAssembly().Location.Replace("bin\\Debug\\net5.0\\AddressBookAPI.dll", string.Empty);
            string rdlcFilePath = string.Format("{0}ReportFiles\\{1}.rdlc", fileDirPath, reportName);
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
            Encoding.GetEncoding("utf-8");
            string mimetype = "";
            int extension = 1;
            Dictionary<string, string> Parameters = new Dictionary<string, string>();
            //Parameters.Add("Image1", "RDLC report (Set as parameter)");
            LocalReport report = new LocalReport(rdlcFilePath);
            //List<VUEmployeeData> EmpData = new List<VUEmployeeData>();



            //var EmpData =  _baseRepository.GetAll();
            var EmpData = _context.vUEmployeeDatas.ToList();
            report.AddDataSource("dsEmps", EmpData);

            //  string reportTypee = reportType;
            //  string mimeType;
            //  string encoding;
            //  string fileNameExtension;
            //  if (reportTypee =="Excel")
            //  {
            //      fileNameExtension = "xlsx";

            //  }
            //else if (reportTypee == "Word")
            //  {
            //      fileNameExtension = "docx";

            //  }
            //else  if (reportTypee == "PDF")
            //  {
            //      fileNameExtension = "pdf";

            //  }
            //  else 
            //  {
            //      fileNameExtension = "jpg";

            //  }

            //  string[] streams;
            //  Warning[] warnings;
            //  byte[] renderedByte;
            //  renderedByte= report.Render()
          
            var result = report.Execute(GetRenderType(reportType), extension, Parameters, mimetype);
            //return File(result.MainStream, "application/pdf");
            //File
            return result.MainStream;

            //var dt = new DataTable();
            //dt = GetEmployeeList();

            //var path = $"{this._webHostEnvironment.WebRootPath}\\Reports\\Employees.rdlc";
            //Dictionary<string, string> parameters = new Dictionary<string, string>();

            //LocalReport lr = new LocalReport(path);
            //lr.AddDataSource("dsEmployee", dt);
            //var result = lr.Execute(RenderType.Pdf, extension, parameters, mimetype);
            //return File(result.MainStream, "application/pdf");


        }
        private RenderType GetRenderType(string reportType)
        {
            var renderType = RenderType.Pdf;
            switch(reportType.ToUpper())
            {
                default:
                case "PDF":
                  renderType =   RenderType.Pdf;
                    break;
                case "XLS":
                    renderType = RenderType.Excel;
                    break;
                case "WORD":
                    renderType = RenderType.Word;
                    break;


            }
            return renderType;
        }
    }
}
