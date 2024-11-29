document.getElementById('addAssetForm')?.addEventListener('submit', async function(event: Event) {
    event.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const brand = (document.getElementById('brand') as HTMLInputElement).value;
    const type = (document.getElementById('type') as HTMLInputElement).value;
    const location = (document.getElementById('location') as HTMLInputElement).value;
    const description = (document.getElementById('description') as HTMLInputElement).value;

    try {
        const response = await fetch('http://localhost:8080/admin/assets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token')
            },
            body: JSON.stringify({ name, brand, type, location, description })
        });

        const result = await response.json();

        if (response.status >=200 && response.status<300) {
            if(response.status===404 || response.status===401 || response.status===403){
                localStorage.clear();  
                window.location.href='../../src/pages/login.html'
            }
            alert('Asset added successfully!');
            (document.getElementById('addAssetForm') as HTMLFormElement).reset();
        } else {
            alert(result.message || 'Failed to add asset');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding the asset.');
    }
});

document.getElementById('close')?.addEventListener('click',()=>{
    window.location.href = '../../src/pages/adminAssets.html';
})