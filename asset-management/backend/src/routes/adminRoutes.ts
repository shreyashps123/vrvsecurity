// const express = require('express');
import express from 'express'
import {authorizeRole} from '../middleware/authorizeRole'
import {
    getAllAssets,
    registerEmployee,
    addAssets,
    disposeAsset,
    deleteEmployee,
    unassignAsset,
    getAllEmployees, assignAsset, getRequests, approveRequest, disapproveRequest,updateAsset,updateEmployee, getEmployeeById,getAssetById,getAssetHistory
} from '../controllers/adminController';


import {authenticateToken} from "../middleware/verifyJWT";
import {getAssetHistoryQuery} from "../models/adminModel";
const router = express.Router();
router.get('/assets',authenticateToken,authorizeRole(['admin']), getAllAssets);
router.post('/assets',authenticateToken,authorizeRole(['admin']), addAssets);
router.post('/register',authenticateToken,authorizeRole(['admin']), registerEmployee);
router.delete('/assets/:assetName',authenticateToken,authorizeRole(['admin']), disposeAsset);
router.get('/employees',authenticateToken,authorizeRole(['admin']),getAllEmployees);
router.delete('/employees',authenticateToken,authorizeRole(['admin']), deleteEmployee);
router.patch('/assets/:asset_id',authenticateToken,authorizeRole(['admin']), unassignAsset);
router.patch('/assets',authenticateToken,authorizeRole(['admin']),assignAsset);
router.get('/requests',authenticateToken,authorizeRole(['admin']), getRequests);
router.post('/requests/:requestId',authenticateToken,authorizeRole(['admin']),approveRequest);
router.delete('/requests/:requestId',authenticateToken,authorizeRole(['admin']),disapproveRequest);
router.patch('/assets/:asset_id/update',authenticateToken,authorizeRole(['admin']), updateAsset);
router.patch('/employees/:employeeId', authenticateToken,authorizeRole(['admin']), updateEmployee);
router.get('/employees/:employeeId', authenticateToken,authorizeRole(['admin']), getEmployeeById);
router.get('/assets/:assetId', authenticateToken,authorizeRole(['admin']), getAssetById);
router.get('/history/assets/:assetId', authenticateToken, authorizeRole(['admin']), getAssetHistory);

export default router;