import { Router } from "express";
import { ReviewController } from "../controllers/review.controller";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { UseRequestDto, UseResponseDto } from "../middleware";
import { CreateReviewDto } from "@/application/dtos/review/review.dtos";
import { UserRole } from "@/application/dtos/user/user.dtos";

const router = Router();
const reviewController = new ReviewController();

// Public routes
router.get(
  "/",
  UseRequestDto(CreateReviewDto),
  UseResponseDto(CreateReviewDto),
  reviewController.listReviews
);
router.get("/search", reviewController.searchReviews);
router.get("/album/:albumId", reviewController.getAlbumReviews);
router.get("/user/:userId", reviewController.getUserReviews);
router.get("/:id", reviewController.getReview);

// Protected routes (require authentication)
router.use(authenticate);

// User routes
router.post("/", reviewController.createReview);
router.post("/:id/like", reviewController.toggleLike);
router.post("/:id/comments", reviewController.addComment);

// Protected routes (require ownership or admin role)
router.put(
  "/:id",
  authorize([UserRole.ADMIN, UserRole.REVIEWER]),
  reviewController.updateReview
);
router.delete(
  "/:id",
  authorize([UserRole.ADMIN, UserRole.REVIEWER]),
  reviewController.deleteReview
);

// Admin only routes
router.get("/admin/pending", authorize([UserRole.ADMIN]), (req, res, next) => {
  req.query.verified = "false";
  reviewController.listReviews(req, res, next);
});

export default router;
