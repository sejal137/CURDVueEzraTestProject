using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Ajax;
using VueMVC.Model;

namespace VueMVC.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Message from Controller";
            return View();
        }

        ///Fetching list of employee
        public ActionResult GetEmployeeData()
        {
            try
            {
                var ListEmp = (Session["ObjEmployee"] as List<Employee>) ?? new List<Employee>();
                if (ListEmp.Count == 0)
                {
                    List<Employee> emp = new List<Employee>();
                    Employee emp1 = new Employee
                    {
                        Id = 1,
                        Name = "John Smith",
                        Email = "John.Smith@ezra.com",
                        PhonNum = "416-99999999"
                    };

                    Employee emp2 = new Employee
                    {
                        Id = 2,
                        Name = "Jane Doe",
                        Email = "jane.doe@ezra.com",
                        PhonNum = "905-1111111"

                    };

                    Employee emp3 = new Employee
                    {
                        Id = 3,
                        Name = "John Doe",
                        Email = "john.doe@ezra.com",
                        PhonNum = "416-5555555"

                    };

                    emp.Add(emp1);
                    emp.Add(emp2);
                    emp.Add(emp3);
                    Session["ObjEmployee"] = ListEmp = emp;
                }

                return Json(ListEmp, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                return Json("Some error occur.");
            }
        }

        ///Adding new employee in cache memory/session
        [HttpPost]
        public ActionResult AddEmployee(Employee emp)
        {
            try
            {
                int maxId = 1;
                var ListEmp = (Session["ObjEmployee"] as List<Employee>) ?? new List<Employee>();
                if (ListEmp.Count > 0)
                {
                    maxId = Convert.ToInt32(ListEmp.OrderByDescending(x => x.Id).Take(1).Skip(0).First().Id) + 1;
                }
                emp.Id = maxId;
                ListEmp.Add(emp);
                Session["ObjEmployee"] = ListEmp;
                return Json("Employee Addedd successfully.");

            }
            catch (Exception ex)
            {

                return Json("Some error occur.");
            }
        }

        ///Deleting selected employee from cache memory/session
        public ActionResult DeleteEmployee(int id)
        {
            try
            {
                var ListEmp = (Session["ObjEmployee"] as List<Employee>) ?? new List<Employee>();
                Employee emp = ListEmp.Where(x => x.Id == id).FirstOrDefault();
                if (emp != null)
                    ListEmp.Remove(emp);
                Session["ObjEmployee"] = ListEmp;
                return Json(ListEmp, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                return Json("Some error occur", JsonRequestBehavior.AllowGet);
            }
        }

        ///Updating selected employee in cache memory/session
        [HttpPost]
        public ActionResult EditEmployee(Employee employee)
        {
            try
            {
                var ListEmp = (Session["ObjEmployee"] as List<Employee>) ?? new List<Employee>();
                Employee emp = ListEmp.Where(x => x.Id == employee.Id).FirstOrDefault();
                emp.Name = employee.Name;
                emp.Email = employee.Email;
                emp.PhonNum = employee.PhonNum;
                Session["ObjEmployee"] = ListEmp;
                return Json(ListEmp, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                return Json("Some error occur", JsonRequestBehavior.AllowGet);
            }
        }
    }
}