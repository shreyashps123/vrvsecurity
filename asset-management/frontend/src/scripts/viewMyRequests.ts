interface Request {
    id: number;
    assetName: string;
    status: string;
    createdAt:Date;
}

const loadRequests = async (requests: Request[]) => {
    try {
        const requestList = document.getElementById('my-request-table');
        if (!requestList) return;
        requestList.innerHTML = '';
        const table = document.createElement('table');
        table.className = "table";
        const headerRow = document.createElement('tr');
        headerRow.className = "thead-dark";
        headerRow.innerHTML = `
                <th>Asset Name</th>
                <th>status</th>
                <th>create at</th>
                
            `;
        table.appendChild(headerRow);

        requests.forEach((request: Request) => {
            const row = document.createElement('tr');
            const date = new Date(request.createdAt);
            row.innerHTML = `
                    <td>${request.assetName}</td>
                    <td>${request.status}</td>
                    <td>${date.toLocaleDateString()}</td>
                `;
            table.appendChild(row);
        });

        requestList.appendChild(table);
    } catch (error) {
        console.error("Error loading requests:", error);
    }
}

const getMyRequests = async (): Promise<void> => {
    try {
        const employeeId = localStorage.getItem('user_id');
        const getEmployeeRequestsApi = `http://localhost:8080/employees/${employeeId}/requests`;
        const response = await fetch(getEmployeeRequestsApi, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token')
            },
        });
        if (!(response.status >= 200 && response.status < 300)) {
            if(response.status===404 || response.status===401 || response.status===403){
                localStorage.clear();  
                window.location.href='../../src/pages/login.html'
            }
            const errorData = await response.json();
            console.error('Error getting data:', errorData.message);
        } else {
            const data = await response.json();
            const formattedRequests = data.requests.map((req: any) => ({
                id: req.id,
                assetName: req.name,
                status: req.status,
                createdAt: new Date(req.createdat)
            }));
            await loadRequests(formattedRequests);
        }
    } catch (err) {
        console.error('Fetch error:', err);
    }
};

document.addEventListener("DOMContentLoaded", getMyRequests);
