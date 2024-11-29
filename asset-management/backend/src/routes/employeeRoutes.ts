import express from 'express';
import {
    getAssetsByEmployeeId,
    requestAsset,
    getAvailableAssets,
    updateProfile,
    getMyRequests,getEmployeeAssetHistory
} from "../controllers/employeeController";
import {authenticateToken} from "../middleware/verifyJWT";
import {authorizeRole} from "../middleware/authorizeRole";
const router = express.Router();
router.get('/:employeeId/assets',authenticateToken,authorizeRole(['employee']), getAssetsByEmployeeId);
router.post('/requests', authenticateToken,authorizeRole(['employee']), requestAsset);
router.patch('/:employee_id', authenticateToken,authorizeRole(['employee']), updateProfile);
router.get('/:employeeId/requests', authenticateToken,authorizeRole(['employee']), getMyRequests);
router.get('/history/employees/:employeeId', authenticateToken,authorizeRole(['employee']), getEmployeeAssetHistory);
export default router;