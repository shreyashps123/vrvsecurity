interface Asset {
    id: number;
    assigned_to: string;
    name: string;
    brand: string;
    type: string;
    description:string;
    location: string;
    status: string;
    created_at: string;
    from_date: string;
    to_date: string;
}

async function loadAssets(): Promise<void> {
    try {
        const assetId= localStorage.getItem("asset_id");
        const response = await fetch(`http://localhost:8080/admin/history/assets/${assetId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        });
        if (!(response.status >= 200 && response.status < 300)) {
            console.log('failed to get asset history');
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
                <th>Assigned To</th>
                <th>Created At</th>
                <th>From</th>
                <th>Till</th>
            `;
            table.appendChild(headerRow);
            assets.forEach((asset:Asset )=> {
                const row = document.createElement("tr");

                //console.log("2  "+deleteDisabled);
                const date = new Date(asset.created_at);
                row.classList.add("asset-row");
                row.innerHTML = `
            <td>${asset.name}</td>
            <td>${asset.brand}</td>
            <td>${asset.assigned_to ?? ' '}</td>
            <td>${date.toLocaleDateString()}</td>
            <td>${new Date(asset.from_date).toLocaleDateString()}</td>
            <td>${new Date(asset.to_date).toLocaleDateString()}</td>
        `;
                table.appendChild(row);

            });

            assetsList.appendChild(table);
        }

    } catch (error) {
        console.error("Error fetching assets:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadAssets);