interface Asset {
    id: number;
    name: string;
    brand: string;
    type: string;
    description: string;
}

const displayMyAssets = (assets: Asset[]): void => {
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
            <th>Description</th>
        `;
        table.appendChild(headerRow);

        assets.forEach((asset) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${asset.name}</td>
                <td>${asset.brand}</td>
                <td>${asset.type}</td>
                <td>${asset.description}</td>
            `;
            table.appendChild(row);
        });

        assetsList.appendChild(table);
    }
};

const getMyAssets = async (): Promise<void> => {
    try {
        const employeeId = localStorage.getItem('user_id');
        const employeeAssetsApi = `http://localhost:8080/employees/${employeeId}/assets`;
        const response = await fetch(employeeAssetsApi,{
            method:'GET',
            headers:{
                'Authorization': 'Bearer '+localStorage.getItem('token')
            }
        });

        if (!(response.status >= 200 && response.status <300)) {
            if(response.status===404 || response.status===401 || response.status===403){
                localStorage.clear();  
                window.location.href='../../src/pages/login.html'
            }
            const errorData = await response.json();
            console.error('Error getting data:', errorData.message);
        } else {
            const data = await response.json();
            displayMyAssets(data.assets);
        }
    } catch (err) {
        console.error('Fetch error:', err);
    }
};

document.getElementById('myAssetsBtn')?.addEventListener('click',getMyAssets);

document.addEventListener("DOMContentLoaded", getMyAssets);