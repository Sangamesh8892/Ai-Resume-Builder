import express from "express"
import protect from "../middlewares/authMiddleware.js";
import { analyzeResumeSaved, enhanceJobDescription, enhanceProfessionalSummery, uploadResume } from "../controllers/aiController.js";

const aiRouter=express.Router();


aiRouter.post('/enhance-pro-sum',protect,enhanceProfessionalSummery);
aiRouter.post('/enhance-job-desc',protect,enhanceJobDescription);
aiRouter.post('/upload-resume',protect,uploadResume);
aiRouter.post('/analyze-resume',protect,analyzeResumeSaved);


export default aiRouter;
