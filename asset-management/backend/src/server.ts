import express from 'express';
import http from "http";
import cors from "cors";
import employeeRoutes from "./routes/employeeRoutes";
import adminRoutes from "./routes/adminRoutes";
import userRoutes from "./routes/userRoutes";
const app = express();

const PORT = 8080;

app.use(cors());
app.use(express.json());

// app.use('/assets',availableAssetsRoutes)
app.use('/employees',employeeRoutes)
app.use('/admin', adminRoutes);
app.use('/user',userRoutes);

http.createServer(app).listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
});