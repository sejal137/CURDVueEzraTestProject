import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.css'

var apps = new Vue({
    el: '#app',
    data: {
        rows: [],
        Name:'',
        Email:'',
        Phone:''
    },
   
    methods: {
        GetEmployee: function (){
            $.ajax({
                url:"/Home/GetEmployeeData",
                type: 'GET',
                success: function (data) {
                    if (data) {
                        apps.rows = data;
                    }
                }
            });

        },

        AddEmployee: function(){
            window.open('/Home/AddPage', 'Add Employee');
        },

        SaveEmployee: function(){
            console.log(apps);
            var newEmp = {
                Email:apps.Email,
                Id: 0,
                Name: apps.Name,
                PhonNum: apps.Phone
            }
            $.ajax({
                url:"/Home/AddEmployee",
                type: 'POST',
                data: {
                    emp: newEmp
                },
                success: function (data) {
                   window.open('/Home/Index','_self');
                }
            });
            this.clearAllFields();
        },
        EditEmployee: function(row){
            console.log(apps);
            console.log(row);
            apps.Email = row.Email;
            apps.Id = row.Id;
            apps.Name = row.Name;
            apps.Phone = row.PhonNum;
            $('#EditEmployee').show();
            $('#EmployeeList').hide();
        },
        UpdateEmployee : function(){
            var newEmp = {
                Email:apps.Email,
                Id: apps.Id,
                Name: apps.Name,
                PhonNum: apps.Phone
            }
            $.ajax({
                url:"/Home/EditEmployee",
                type: 'POST',
                data: {
                    employee: newEmp
                },
                success: function (data) {
                  
                    console.log(data);
                    apps.rows = data; 
                    $('#EditEmployee').hide();
                    $('#EmployeeList').show();
                }
            });
            this.clearAllFields();  
           
        },
        DeleteEmployee: function(empId, index) {
            //apps.rows.splice(index ,1);
            $.ajax({
                url:"/Home/DeleteEmployee",
                type: 'POST',
                data: {
                    id: empId
                },
                success: function (data) {
                    console.log(data);
                    apps.rows = data;
                }
            });
        },

        clearAllFields: function(){
            apps.Email = "";
            apps.Name="";
            apps.Phone = "";
        },
        
        Cancel: function () {
            window.open('/Home/Index','_self');
        }
    },

    created : function()
    {
        this.GetEmployee(); // Here
    }
})