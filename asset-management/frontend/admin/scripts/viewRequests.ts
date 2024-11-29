interface Request {
    id: number;
    asset_name: string;
    brand: string;
    type: string;
    employee_id: number;
    employee_name: string;
}

async function fetchRequests(): Promise<void> {
    try {
        const response = await fetch("http://localhost:8080/requests", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const requests: Request[] = await response.json();

        const tableBody = document.getElementById('requestTable')?.getElementsByTagName('tbody')[0];

        if (tableBody) {
            tableBody.innerHTML = '';

            requests.forEach((request: Request) => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${request.asset_name}</td>
                    <td>${request.brand}</td>
                    <td>${request.type}</td>
                    <td>${request.employee_id}</td>
                    <td>${request.employee_name}</td>
                    <td>
                        <button class="action-btn exp-btn" onclick="viewRequest(${request.request_id})">Exp</button>
                        <button class="action-btn approve-btn" onclick="approveRequest(${request.request_id})">Appr</button>
                        <button class="action-btn disapprove-btn" onclick="disapproveRequest(${request.request_id})">Disapp</button>
                    </td>
                `;

                tableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Error fetching requests:', error);
    }
}

async function updateRequestStatus(req_id: number, state: string): Promise<void> {
    try {
        const response = await fetch(`http://localhost:8080/requests/${req_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({ state,req_id }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        alert(`Request ${state} successfully!`);
        window.onload = fetchRequests;
    } catch (error) {
        console.error('Error updating request status:', error);
        alert('Failed to update request status.');
    }
}

function approveRequest(req_id: number): void {
    updateRequestStatus(req_id, 'approved');
}

function disapproveRequest(req_id: number): void {
    updateRequestStatus(req_id, 'disapproved');
}


window.onload = fetchRequests;
