const express = require("express");
const productController = require("../controller/productController");

const router = express.Router();

router.post("/", productController.save);
router.get("/", productController.showAll);
router.delete("/:tag", productController.deleteByTag);
router.delete("/:id", productController.deleteById);
router.put("/:id", productController.update);
// router.get("/:owner", productController.findByOwner);
// router.get("/:tag", productController.getByTag);
// router.get("/:id", productController.getById);

module.exports = router;
