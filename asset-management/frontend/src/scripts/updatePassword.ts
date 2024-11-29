document.getElementById("update-password-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const oldPassword = (document.getElementById("oldPassword") as HTMLInputElement).value;
    const newPassword = (document.getElementById("newPassword") as HTMLInputElement).value;
    const retypedPassword = (document.getElementById("retypedPassword") as HTMLInputElement).value;

    if (newPassword !== retypedPassword) {
        console.log("New password and retyped password do not match.");
        return;
    }

    const body = {
        oldPassword: oldPassword,
        newPassword: newPassword,
        retypedPassword: retypedPassword
    };

    try {
        const employeeId = localStorage.getItem('user_id');
        const apiEndpoint = `http://localhost:8080/user/employees/${employeeId}`;

        const response = await fetch(apiEndpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer '+localStorage.getItem('token')
            },
            body: JSON.stringify(body)
        });

        if (response.status >= 200 && response.status <300) {
            const responseData = await response.json();
            console.log(responseData.message);
        } else {
            if(response.status===404 || response.status===401 || response.status===403){
                localStorage.clear();  
                window.location.href='../../src/pages/login.html'
            }
            const responseData = await response.json();
            console.log(`Error updating password: ${responseData.message}`);
        }
    } catch (error) {
        console.error("Error during password update:", error);
        alert("An error occurred while updating the password. Please try again.");
    }
});

document.getElementById('back-button')?.addEventListener('click',()=>{
    const role = localStorage.getItem('role');
    if(role === 'employee') {
        window.location.href = '../../src/pages/employeeDashboard.html'
    }
    if(role==='admin'){
        window.location.href = '../../src/pages/adminDashboard.html'
    }
})
