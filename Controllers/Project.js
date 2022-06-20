const ProjectSchema = require("../model/Project");
const EmployeeSchema = require("../model/Employees");

// const { authSchema } = require("../middlewares/validation_schema.js");

exports.getAllProject = async (req, res) => {
  try {
    let data = await ProjectSchema.find({});
    res.status(200).json({ message: "featched data SucessFully", data });
  } catch (error) {
    res.status(501).json({ message: "Server Error" });
  }
};

//! get the  data
// exports.getEmployee = async (req, res) => {
//   try {
//     let data = await ProjectSchema.findOne({ _id: req.params.id });
//     res.status(200).json({ message: "fetched data Sucessfully", data });
//   } catch (error) {
//     res.status(501).json({ message: "SERVER ERROR" });
//   }
// };

//! created the Employee data

exports.createProject = async (req, res) => {
  try {
    console.log(req.body);
    let { Project_name, Project_id, Project_status, Team_members } = req.body;
    let data = {
      Project_name,
      Project_id,
      Project_status,
      Team_members,
    };
    let value = await ProjectSchema.create(data);
    let emp = await EmployeeSchema.find({}).lean();
    // let newEmp = emp.map(v => {
    //   if (Team_members.includes(v.Employee_id)) {
    //     v.Project_Status = true;
    //     v.Project_Name = Project_name;
    //   }
    //   return v;
    // });
    EmployeeSchema.updateMany(
      { $match: { Project_Status: false } },
      { Employee_id: { $in: Team_members } },
      { $set: { Project_Status: true, Project_Name: Project_name } }
    )
      .then(() => {
        console.log("success");
      })
      .catch(error => console.log(error));

    res.status(201).json({ message: "succesfully  created", value });
  } catch (err) {
    console.log(err);

    res.status(501).json({ message: "SERVER ERROR" });
  }
};

//! deleted the data
// exports.deleteEmployee = async (req, res) => {
//   try {
//     await EmployeeSchema.findByIdAndDelete(req.params.id);
//     res.status(201).json({ message: "successfully  Deleted" });
//   } catch (error) {
//     res.status(501).json({ message: "SERVER ERROR" });
//   }
// };

//! update the
// exports.updateEmployee = async (req, res) => {
//   try {
//     let {
//       name,
//       Employee_id,
//       Employee_email,
//       Project_Status,
//       Project_Name,
//       Task_Name,
//     } = req.body;
//     let data = await EmployeeSchema.findByIdAndUpdate(
//       { _id: req.params.id },
//       {
//         name,
//         Employee_id,
//         Employee_email,
//         Project_Status,
//         Project_Name,
//         Task_Name,
//       },
//       { new: true }
//     );
//     await data.save();
//     res.status(201).json({ message: "Sucessfully  Updated", data });
//   } catch (error) {
//     res.status(501).json({ message: "server Error" });
//   }
// };
