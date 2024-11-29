export interface PendingAssetsRequest{
    id:number;
    employee_id: number;
    employeeName: string;
    employeeEmail:string;
    assetName:string;
    createdAt: string;
}

export interface EmployeeRequest{
    id: number;
    name: string;
    status: string;
    createdAt: string;
}