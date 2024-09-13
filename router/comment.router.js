const express = require("express");
const router = express.Router();
const commentController = require("../controller/comment.controller");
const { isAuthenticated } = require("../middleware/authMiddleware");

router.get("/details/:id", commentController.getDetailPage);
router.post("/addCommit", isAuthenticated, commentController.addComment);
router.put("/updateComment", isAuthenticated, commentController.updateComment);
router.delete("/deleteComment", isAuthenticated, commentController.deleteComment
);

module.exports = router;
