interface Request {
    id: number;
    employeeId: number;
    employeeName: string;
    employeeEmail: string;
    assetName: string;
    createdAt: Date;
}

const loadRequests = async (requests: Request[]) => {
    try {
        const requestList = document.getElementById('request-table');
        if (!requestList) return;
        requestList.innerHTML = '';
        const table = document.createElement('table');
        table.className = "table";
        const headerRow = document.createElement('tr');
        headerRow.className = "thead-dark";
        headerRow.innerHTML = `
                <th>Employee Name</th>
                <th>Email</th>
                <th>Asset Name</th>
                <th>createdAt</th>
                <th>Approve</th>
                <th>Disapprove</th>
            `;
        table.appendChild(headerRow);

        requests.forEach((request: Request) => {
            const row = document.createElement('tr');
            const date = new Date(request.createdAt);
            row.innerHTML = `
                    <td>${request.employeeName}</td>
                    <td>${request.employeeEmail}</td>
                    <td>${request.assetName}</td>
                    <td>${date.toLocaleDateString()}</td>
                    <td>
                        <button class="approve-btn" onclick="approveRequest(${request.id}, ${request.employeeId},'${request.assetName}')">Approve</button>
                    </td>
                    <td>
                        <button class="disapprove-btn" onclick="disapproveRequest(${request.id})" >Disapprove</button>
                    </td>
                `;
            table.appendChild(row);
        });

        requestList.appendChild(table);
    } catch (error) {
        console.error("Error loading requests:", error);
    }
}

const getRequests = async (): Promise<void> => {
    try {
        const getEmployeeApi = `http://localhost:8080/admin/requests`;
        const response = await fetch(getEmployeeApi, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        });
        if (!(response.status >= 200 && response.status < 300)) {
            if(response.status===404 || response.status===401 || response.status===403){
                localStorage.clear();
            }
            const errorData = await response.json();
            console.error('Error getting data:', errorData.message);
        } else {
            const data = await response.json();
            const formattedRequests = data.requests.map((req: any) => ({
                id: req.id,
                employeeId: req.employeeid,
                employeeName: req.employeename,
                employeeEmail: req.employeeemail,
                assetName: req.assetname,
                createdAt: new Date(req.createdat)
            }));
            await loadRequests(formattedRequests);
        }
    } catch (err) {
        console.error('Fetch error:', err);
    }
};

const approveRequest = async(requestId:number, employeeId:number, assetName:string)=>{
    const approveRequestAPI = `http://localhost:8080/admin/requests/${requestId}`;
    try {
        const response = await fetch(approveRequestAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({employeeId, assetName})
        })
        if (!(response.status >= 200 && response.status < 300)) {
            if(response.status===404 || response.status===401 || response.status===403){
                localStorage.clear();
            }
            const errorData = await response.json();
            console.error('Error approving request:', errorData.message);
        } else {
            const result = await response.json();
            alert(result.message);
        }
    }catch(err){
        console.log('error occurred: '+err);
    }
}

const disapproveRequest = async(requestId:number)=>{
    const disapproveRequestAPI = `http://localhost:8080/admin/requests/${requestId}`;
    try {
        const response = await fetch(disapproveRequestAPI, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        if (!(response.status >= 200 && response.status < 300)) {
            if(response.status===404 || response.status===401 || response.status===403){
                localStorage.clear();
                window.location.href='../../src/pages/login.html'
            }
            const errorData = await response.json();
            console.error('Error disapproving request:', errorData.message);
        } else {
            const result = await response.json();
            alert(result.message);
        }
    }catch(err){
        console.log('error occurred: '+err);
    }
}
document.addEventListener("DOMContentLoaded", getRequests);
