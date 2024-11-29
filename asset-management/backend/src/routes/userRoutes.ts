import express from 'express'

const router = express.Router();
import authLogin from "../controllers/loginController";
import {registerEmployee} from "../controllers/adminController";
import {authenticateToken} from "../middleware/verifyJWT";
import {authorizeRole} from "../middleware/authorizeRole";
import {Router} from "express";
import {updatePassword} from "../controllers/updatePasswordController";
import {getProfile} from "../controllers/getProfileController";
import {getAvailableAssets} from "../controllers/employeeController";

router.get('/assets/available',authenticateToken, getAvailableAssets);
router.get('/employees/:employeeId',authenticateToken,getProfile);
router.put('/employees/:employeeId', authenticateToken, updatePassword);
router.post('/login', authLogin);
router.post('/register', registerEmployee);

export default router;


