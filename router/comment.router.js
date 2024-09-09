const express = require("express");
const router = express.Router();
const commentController = require("../controller/comment.controller");

router.get("/details/:id", commentController.getDetailPage);
router.post("/addCommit", commentController.addComment);
router.put("/updateComment", commentController.updateComment);
router.delete("/deleteComment", commentController.deleteComment);

module.exports = router;
