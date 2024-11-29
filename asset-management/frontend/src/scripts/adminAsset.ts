interface Asset {
    id: number;
    assigned_to: string;
    name: string;
    brand: string;
    type: string;
    description:string;
    location: string;
    status: string;
    created_at: Date;
}


async function loadAssets(): Promise<void> {
    try {
        const response = await fetch("http://localhost:8080/admin/assets", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        });
        if (!(response.status >= 200 && response.status < 300)) {
            console.log('failed to get assets');
            return;
        }
        const assets = await response.json();
        const assetsList = document.getElementById('table-assets');
        if (!assetsList) return;

        assetsList.innerHTML = '';
        if (assets.length > 0) {
            console.log("hello");
            const table = document.createElement('table');
            table.className = "table";

            const headerRow = document.createElement('tr');
            headerRow.className = "thead-dark";
            headerRow.innerHTML = `
                <th>Name</th>
                <th>Brand</th>
                <th>Type</th>
                <th>Location</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Unassign</th>
                <th>Update</th>
                <th>Delete</th>
                <th>History</th>
            `;
            table.appendChild(headerRow);
            assets.forEach((asset:Asset )=> {
                const row = document.createElement("tr");
                const disable = asset.status.toLowerCase() === "unassigned" ? "disabled" : "";
                const deleteDisabled = asset.status.toLowerCase() === "unassigned" ? "" : "disabled";

                //console.log("2  "+deleteDisabled);
                const date = new Date(asset.created_at);
                row.classList.add("asset-row");
                row.innerHTML = `
            <td>${asset.name}</td>
            <td>${asset.brand}</td>
            <td>${asset.type}</td>
            <td>${asset.location}</td>
            <td>${asset.assigned_to ?? ' '}</td>
            <td>${asset.status}</td>
            <td>${date.toLocaleDateString()}</td>
            <td><button class="btn unassign-btn" data-id=${asset.id} data-employee-id="${asset.employee_id}" data-lastupdated="${asset.last_updated}" ${disable}>Unassign</button></td>
            <td><button class="btn btn-success update-btn" data-id=${asset.id}>Update</td>
            <td><button class="btn btn-danger del-btn" data-id=${asset.name} ${deleteDisabled}>Del</button></td>
            <td><button class="btn btn-primary history-btn" data-id=${asset.id}>History</button> </td>
        `;
                table.appendChild(row);

            });

            assetsList.appendChild(table);
            populateAssets();
        }

    } catch (error) {
        console.error("Error fetching assets:", error);
    }
}


const populateAssets = (): void =>{
    document.querySelectorAll('.unassign-btn').forEach(button => {
        button.addEventListener('click', async function (event: Event) {
            event.preventDefault();
            const asset_id = (event.currentTarget as HTMLButtonElement).getAttribute('data-id');
            const employee_id= (event.currentTarget as HTMLButtonElement).getAttribute('data-employee-id');
            const last_updated = (event.currentTarget as HTMLButtonElement).getAttribute('data-lastupdated');
            if (!asset_id) {
                console.log('Provide asset id');
                return;
            }
            try {
                console.log("Sending request with:", { asset_id, employee_id, last_updated });
                const response = await fetch(`http://localhost:8080/admin/assets/${asset_id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify({employee_id,last_updated})
                    

                });

                const result = await response.json();

                if (response.status >= 200 && response.status < 300) {
                    alert('Asset unassigned successfully!');

                } else {
                    alert(result.message || 'Failed to unassign');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while unassigning the asset.');
            }
        });
    });

    document.querySelectorAll('.update-btn').forEach(button => {
        button.addEventListener('click', async function (event: Event){
            event.preventDefault();
            const asset_id:string=(event.currentTarget as HTMLButtonElement).getAttribute('data-id') || '';
            localStorage.setItem('asset_id', asset_id);
            window.location.href = '../pages/updateAsset.html';

        });
    });


    document.querySelectorAll('.history-btn').forEach(button => {
        button.addEventListener('click', async function (event: Event){
            event.preventDefault();
            const asset_id:string=(event.currentTarget as HTMLButtonElement).getAttribute('data-id') || '';
            localStorage.setItem('asset_id', asset_id);
            window.location.href = '../pages/assetHistory.html';

        });
    });

    document.querySelectorAll('.del-btn').forEach(button => {
        button.addEventListener('click', async function (event: Event) {
            event.preventDefault();
            const assetName = (event.currentTarget as HTMLButtonElement).getAttribute('data-id');
            try {
                const response = await fetch(`http://localhost:8080/admin/assets/${assetName}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify({assetName})
                });

                const result = await response.json();

                if (response.status >= 200 && response.status < 300) {
                    alert('Asset disposed successfully!');

                } else {
                    alert(result.message || 'Failed to dispose');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while disposing the asset.');
            }
        });
    });
}

const displayAvailableAssets = (assets: Asset[]): void => {
    const assetsList = document.getElementById('table-assets');
    if (!assetsList) return;

    assetsList.innerHTML = '';
    if (assets.length > 0) {
        const table = document.createElement('table');
        table.className = "table";

        const headerRow = document.createElement('tr');
        headerRow.className = "thead-dark";
        headerRow.innerHTML = `
            <th>Name</th>
            <th>email</th>
            <th>Assign</th>
        `;
        table.appendChild(headerRow);
        assets.forEach((asset) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${asset.name}</td>
                <td><input type="email" placeholder="Enter email" id="email-${asset.name}" /></td>
                <td><button class="assign-btn" asset-name="${asset.name}">Assign</button></td>
            `;
            table.appendChild(row);
        });
        assetsList.appendChild(table);
        document.querySelectorAll('.assign-btn').forEach(button => {
            button.addEventListener('click', async (event) => {
                const assetName = (event.currentTarget as HTMLButtonElement).getAttribute('asset-name');
                if (assetName) {
                    await assignAsset(assetName);
                }
            });
        });
    }
}

const getAvailableAssets = async (): Promise<void> => {
    try {
        const availableAssetsApi = 'http://localhost:8080/user/assets/available';
        const response = await fetch(availableAssetsApi,{
            method:'GET',
            headers:{
                'Authorization': 'Bearer '+localStorage.getItem('token')
            }
        });

        if (!(response.status >= 200 && response.status < 300)) {
            if(response.status===404 || response.status===401 || response.status===403){
                localStorage.clear();  
                window.location.href='../../src/pages/login.html'
            }
            const errorData = await response.json();
            console.log('Error getting available assets:', errorData.message);
        } else {
            const data = await response.json();
            displayAvailableAssets(data.assets);
        }
    } catch (err) {
        console.error('Fetch error:', err);
    }
}

const assignAsset = async (assetName: string): Promise<void> => {
    const email = (document.getElementById(`email-${assetName}`) as HTMLInputElement).value;

    if (!email) {
        console.log("Please enter an email");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/admin/assets", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({assetName, email})
        });

        if (response.status >= 200 && response.status < 300) {
            alert(`Asset ${assetName} assigned successfully!`);
        } else {
            const errorData = await response.json();
            console.log('Failed to assign asset: ' + errorData.message);
        }
    } catch (error) {
        console.error('Error assigning asset:', error);
        alert('An error occurred while assigning the asset.');
    }
}

document.getElementById('assign-asset')?.addEventListener('click', async () => {
    await getAvailableAssets();
})

document.getElementById('addAsset')?.addEventListener('click', () => {
    window.location.href = '../../src/pages/addAsset.html';
})
document.getElementById('all')?.addEventListener('click', async () => {
    await loadAssets();
});
document.addEventListener("DOMContentLoaded", loadAssets);
