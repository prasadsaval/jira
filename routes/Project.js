const { Router } = require("express");
const {
  createProject,
//   deleteEmployee,
//   updateEmployee,
  getAllProject,
//   getEmployee,
} = require("../Controllers/Project");
const router = Router();

router.route("/getall").get(getAllProject);
router.route("/data").post(createProject);

// router
//   .route("/:id")
//   .get(getEmployee)
//   .put(updateEmployee)
//   .delete(deleteEmployee);

module.exports = router;
