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
    //? if one employee present in other project then project not created
    let a = await EmployeeSchema.find({
      Employee_id: { $in: Team_members },
    }).lean();
    let ps = false;
    a.map(element => {
      if (element.Project_Status == true) ps = true;
    });

    if (ps == false) {
      EmployeeSchema.updateMany(
        { Employee_id: { $in: Team_members } },
        { $set: { Project_Status: true, Project_id: Project_id } },
        async function (err, docs) {
          console.log(docs);
          if (docs.modifiedCount == Team_members.length) {
            console.log("Updated User : ", docs);
            let value = await ProjectSchema.create(data);
            res.status(201).json({ message: "succesfully  created", value });
          }
        }
      );
    } else {
      res.status(501).json({
        message:
          "Invalid Employee id or employee is already working on other project",
      });
      const e = new Error(`Data with ${data.input._id} not found.`);
      throw e;
    }
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
