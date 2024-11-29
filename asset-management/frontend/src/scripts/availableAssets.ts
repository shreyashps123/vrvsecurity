interface Asset {
    id: number;
    name: string;
    brand: string;
    type: string;
}

const displayAssets = (assets: Asset[]): void => {
    const assetsList = document.getElementById('assets');
    if (!assetsList) return;

    assetsList.innerHTML = '';
    if (assets.length > 0) {
        const table = document.createElement('table');
        table.className = "table";

        const headerRow = document.createElement('tr');
        headerRow.className = "thead-dark";
        headerRow.innerHTML = `
            <th>Name</th>
            <th>Brand</th>
            <th>Type</th>
            <th>Request</th>
        `;
        table.appendChild(headerRow);

        assets.forEach((asset) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${asset.name}</td>
                <td>${asset.brand}</td>
                <td>${asset.type}</td>
                <td><button onclick="requestAsset('${asset.name}')">Request</button></td>
            `;
            table.appendChild(row);
        });
        assetsList.appendChild(table);
    }
}

const getAvailableAssets = async (): Promise<void> => {
    try {
        // const employeeId = localStorage.getItem('user_id');
        const availableAssetsApi = `http://localhost:8080/user/assets/available`;
        const response = await fetch(availableAssetsApi, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer '+localStorage.getItem('token')
            },
        });

        if (!(response.status >= 200 && response.status <300)) {
            if(response.status===404 || response.status===401 || response.status===403){
                localStorage.clear();  
                window.location.href='../../src/pages/login.html'
            }
            const errorData = await response.json();
            console.log('Error getting available assets:', errorData.message);
        } else {
            const data = await response.json();
            displayAssets(data.assets);
        }
    } catch (err) {
        console.error('Fetch error:', err);
    }
}

const requestAsset = async (assetName: string): Promise<void> => {
    try {
        const employeeId = localStorage.getItem('user_id');
        const response = await fetch('http://localhost:8080/employees/requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token')
            },
            body: JSON.stringify({
                employeeId,
                assetName
            })
        });

        if (response.status >= 200 && response.status <300) {
            alert(`Asset "${assetName}" requested successfully.`);
        } else {
            const errorData = await response.json();
            console.log('Error requesting asset:', errorData.message);
        }
    } catch (err) {
        console.error('Request error:', err);
    }
}

document.getElementById('availableAssetsBtn')?.addEventListener('click',getAvailableAssets);

