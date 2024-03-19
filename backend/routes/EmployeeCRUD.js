/*
    Employee: By HETTIARACHCHI S.R
*/

const router = require("express").Router();
let Employee = require("../models/employee_schema.js");


                                                //create
http://localhost:8070/employee/employee-register

router.route("/employee-register").post((req,res)=>{

    const Emp_Name = req.body.Emp_Name;
    const Emp_Age = Number(req.body.Emp_Age);
    const Emp_Gender = req.body.Emp_Gender;
    const Emp_Username = req.body.Emp_Username;
    const Emp_Password = req.body.Emp_Password;

    const newEmployee = new Employee({
        Emp_Name,
        Emp_Age,
        Emp_Gender,
        Emp_Username,
        Emp_Password,
      
    })

    newEmployee.save().then(()=>{
        res.json("Employee Added")
    }).catch((err)=>{
        console.log(err);
    })
})

//LOgin

http://localhost:8070/employee/employee-login
router.route("/employee-login").post((req, res) => {
    const { Emp_Username, Emp_Password } = req.body;

    Employee.findOne({ Emp_Username })
        .then((employee) => {
            if (!employee) {
                return res.status(404).json({ message: "Username not found" });
            }

            if (employee.Emp_Password === Emp_Password) {
                //employee.lastLogin = new Date();
                //employee.save();

                res.json("Successfully logged in");
            } else {
                res.status(401).json({ message: "Invalid password" });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Server error login" });
        });
});

//get all obj data
http://localhost:8070/employee/
router.route("/employee-getallempdata").get((req,res)=>{

    Employee.find().then((employee)=>{    //check the obj name for errors
        res.json(employee)
    }).catch((err)=>{
        console.log(err);
    })

})

//Update Profile
http://localhost:8070/employee/employee-update/:employeeid
router.route("/employee-update/:employeeid").put(async(req,res)=>{

    let userId = req.params.employeeid;
    const{Emp_Name,Emp_Age,Emp_Gender,Emp_Username,Emp_Password} = req.body; 

    const updateEmployee ={
        Emp_Name,
        Emp_Age,
        Emp_Gender,
        Emp_Username,
        Emp_Password

     
    }

    //check the obj name for errors
    await Employee.findByIdAndUpdate(userId,updateEmployee)
    .then((update)=>{
         res.status(200).send({status: "User updated",update})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error in updating data",error:err.message});
    })
})

//delete
router.route("/employee-delete/:employeeId").delete(async (req,res)=>{

    let userId = req.params.employeeId;

    await Employee.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status:"user deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete user",eror: err.message});
    })
})


//profile
router.route("/employee-profile/:id").get((req, res) => {
    const employeeId = req.params.id;
  
    // Find employee by ID
    Employee.findById(employeeId)
      .then((employee) => {
        if (!employee) {
          return res.status(404).json({ message: "Employee not found" });
        }
        res.json(employee);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
      });
  });
 
module.exports = router;





/*   
 //LOgin
 router.route("/login").post((req, res) => {
    const { Emp_Username, Emp_Password } = req.body;

    Employee.findOne({ Emp_Username })
        .then((employee) => {
            if (!employee) {
                return res.status(404).json({ message: "Username not found" });
            }

            if (employee.Emp_Password === Emp_Password) {
                //employee.lastLogin = new Date();
                //employee.save();

                res.json("Successfully logged in");
            } else {
                res.status(401).json({ message: "Invalid password" });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Server error login" });
        });
});

//profile
router.route("/profile/:id").get((req, res) => {
    const employeeId = req.params.id;
  
    // Find employee by ID
    Employee.findById(employeeId)
      .then((employee) => {
        if (!employee) {
          return res.status(404).json({ message: "Employee not found" });
        }
        res.json(employee);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
      });
  });


//Update Profile

router.route("/update/:employeeid").put(async(req,res)=>{

    let userId = req.params.employeeid;
    const{Emp_Name,Emp_Age,Emp_Gender} = req.body; 

    const updateEmployee ={
        Emp_Name,
        Emp_Age,
        Emp_Gender

     
    }

    //check the obj name for errors
    const update = await Employee.findByIdAndUpdate(userId,updateEmployee).then(()=>{
         res.status(200).send({status: "User updated", user: update})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error in updating data",error:err.message});
    })
})

//delete
router.route("/delete/:employeeId").delete(async (req,res)=>{

    let userId = req.params.employeeId;

    await Employee.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status:"user deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete user",eror: err.message});
    })
})
*/


  /*Emp_CNumber,
        Emp_Username,
        Emp_Password,
        Emp_Email,
        Emp_Level,
        Emp_Type,
        Emp_Address, */


 /*Emp_CNumber,
        Emp_Username,
        Emp_Password,
        Emp_Email,
        Emp_Level,
        Emp_Type,
        Emp_Address, */


  /*const Emp_CNumber = Number(req.body.Emp_CNumber);
    const Emp_Username = req.body.Emp_Username;
    const Emp_Email = req.body.Emp_Email;
    const Emp_Level = req.body.Emp_Level;
    const Emp_Type = req.body.Emp_Type;
    const Emp_Address = req.body.Emp_Address;
    const Emp_Password = req.body.Emp_Password;*/



/*
router.route("/profile").get((req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;
    Employee.findById(userId)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        });
});

//view
http://localhost:8070/employee
router.route("/").get((req,res)=>{

    employee.find().then((employee)=>{    //check the obj name for errors
        res.json(employee)
    }).catch((err)=>{
        console.log(err);
    })

})
*/




/*
//get data of one employee
router.route("/get/:employeeId").get(async(req,res)=>{
    let userId = req.params.employeeId;
    await Employee.findById(userId).then((user)=>{
        if (user) {
            res.status(200).send({status: "user fetched", user: user});
        } else {
            res.status(404).send({status: "User not found"});
        }
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with fetching data", error: err.message});
    })
})
*/