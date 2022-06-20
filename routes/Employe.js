const { Router } = require("express");
const {
  createEmployee,
  deleteEmployee,
  updateEmployee,
  getAllEmployee,
  getEmployee,
} = require("../Controllers/Employee");
const router = Router();

router.route("/getall").get(getAllEmployee);
router.route("/data").post(createEmployee);

router
  .route("/:id")
  .get(getEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

module.exports = router;
