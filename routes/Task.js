const { Router } = require("express");
const {
  createTask,
  //   deleteEmployee,
  //   updateEmployee,
  getAllTask,
  //   getEmployee,
} = require("../Controllers/Task");
const router = Router();

router.route("/getall").get(getAllTask);
router.route("/data").post(createTask);

// router
//   .route("/:id")
//   .get(getEmployee)
//   .put(updateEmployee)
//   .delete(deleteEmployee);

module.exports = router;
