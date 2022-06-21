const ProjectSchema = require("../model/Project");
const TaskSchema = require("../model/Task");
const EmployeeSchema = require("../model/Employees");

exports.getAllTask = async (req, res) => {
  try {
    let data = await taskSchema.find({});
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

exports.createTask = async (req, res) => {
  try {
    console.log(req.body);
    let {
      Task_name,
      Task_id,
      Project_id,
      Task_members,
      Sub_Tasks,
      Task_Status,
    } = req.body;
    let data = {
      Task_name,
      Task_id,
      Project_id,
      Task_members,
      Sub_Tasks,
      Task_Status,
    };
    let { Task_Name } = await ProjectSchema.findOne({ Project_id });
    EmployeeSchema.findOneAndUpdate(
      {
        $and: [{ Employee_id: Task_members }, { Task_id: { $exists: false } }],
      },
      { $set: { Task_id: Task_id } }
    )
      .then(() => console.log("first"))
      .catch(err => console.log(err));
    await ProjectSchema.findOneAndUpdate(
      { Project_id },
      { Task_Name: [...Task_Name, Task_name] }
    );
    let value = await TaskSchema.create(data);
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
