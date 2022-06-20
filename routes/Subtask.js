const { Router } = require("express");
const {
  createSub_Task,
  //   deleteEmployee,
  //   updateEmployee,
  getAllSub_Task,
  //   getEmployee,
} = require("../Controllers/Subtask");
const router = Router();

router.route("/getall").get(getAllSub_Task);
router.route("/data").post(createSub_Task);

// router
//   .route("/:id")
//   .get(getEmployee)
//   .put(updateEmployee)
//   .delete(deleteEmployee);

module.exports = router;
