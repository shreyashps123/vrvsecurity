import {Request,Response,NextFunction} from "express";


interface User {
    role: string;

}


interface AuthenticatedRequest extends Request {
    user?: User;
}

export const authorizeRole = (roles:string[]):((req: AuthenticatedRequest, res: Response, next: NextFunction)=>void)=> {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!req.user || !req.user.role) {
            res.status(403).send('Access denied. No role found.');
            return;
        }
        const userRole = req.user.role;
        if (!roles.includes(userRole)) {
            res.status(403).send('Access denied. You do not have the required role.');
            return;
        }
        next();
    };
};

