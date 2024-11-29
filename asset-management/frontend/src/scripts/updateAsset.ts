async function loadAssetData(): Promise<void> {
    const assetId = localStorage.getItem('asset_id');
    if (!assetId) {
        console.error("No asset ID found in local storage.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/admin/assets/${assetId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        });

        if (response.ok) {
            const assetData = await response.json();
            const asset = assetData[0];

            console.log("Asset data:", asset);


            (document.getElementById("employee_id") as HTMLInputElement).value = asset.employee_id || '';
            (document.getElementById("name") as HTMLInputElement).value = asset.name || '';
            (document.getElementById("brand") as HTMLInputElement).value = asset.brand || '';
            (document.getElementById("description") as HTMLInputElement).value = asset.description || '';
            (document.getElementById("type") as HTMLInputElement).value = asset.type || '';
            (document.getElementById("location") as HTMLInputElement).value = asset.location || '';
        } else {
            if(response.status===404 || response.status===401 || response.status===403){
                localStorage.clear();  
                window.location.href='../../src/pages/login.html'
            }
            console.error("Failed to load asset data. Status:", response.status);
        }
    } catch (error) {
        console.error("Error fetching asset data:", error);
    }
}


window.addEventListener('DOMContentLoaded', loadAssetData);



document.getElementById('updateAssetForm')?.addEventListener('submit', async function(event: Event): Promise<void> {
    event.preventDefault();

    const employee_id = (document.getElementById("employee_id") as HTMLInputElement).value;
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const brand = (document.getElementById("brand") as HTMLInputElement).value;
    const description = (document.getElementById("description") as HTMLInputElement).value;
    const type = (document.getElementById("type") as HTMLInputElement).value;
    const location = (document.getElementById("location") as HTMLInputElement).value;

    const asset_id = localStorage.getItem('asset_id');
    console.log("assetid here",asset_id);

    const assetData = {
        asset_id: asset_id,
        employee_id: employee_id || null,
        name: name,
        brand: brand || null,
        description: description || null,
        type: type || null,
        location: location || null
    };

    try {
        const response = await fetch(`http://localhost:8080/admin/assets/${asset_id}/update`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(assetData)
        });
        localStorage.removeItem('asset_id');

        const result = await response.json();

        const messageElement = document.getElementById("message");
        if (response.ok) {
            messageElement!.innerText = "Asset updated successfully!";
            messageElement!.style.color = "green";
        } else {
            messageElement!.innerText = `Error: ${result.error}`;
            messageElement!.style.color = "red";
        }
    } catch (error) {
        console.error("Error updating asset:", error);
        document.getElementById("message")!.innerText = "Failed to update asset. Please try again.";
    }
});
