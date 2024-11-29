async function loadEmployeeData(): Promise<void> {
    const employeeId = localStorage.getItem('employeeId');
    console.log("employee id before calling api to fill", employeeId);
    if (!employeeId) {
        console.error("No employee ID found in local storage.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/admin/employees/${employeeId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        });

        if (response.ok) {
            const employeeData = await response.json();
            const employee = employeeData[0];
            console.log("Employee data:", employee);
            (document.getElementById("email") as HTMLInputElement).value = employee.email || '';
            (document.getElementById("firstname") as HTMLInputElement).value = employee.firstname || '';
            (document.getElementById("lastname") as HTMLInputElement).value = employee.lastname || '';
            (document.getElementById("location") as HTMLInputElement).value = employee.location || '';
        } else {
            if(response.status===404){
                localStorage.clear();
            }
            console.error("Failed to load employee data. Status:", response.status);
        }
    } catch (error) {
        console.error("Error fetching employee data:", error);
    }
}

window.onload= function (){
    loadEmployeeData();
}





document.getElementById('updateEmployeeForm')?.addEventListener('submit', async function(event: Event): Promise<void> {
    event.preventDefault();

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const firstname = (document.getElementById("firstname") as HTMLInputElement).value;
    const lastname = (document.getElementById("lastname") as HTMLInputElement).value;
    const location = (document.getElementById("location") as HTMLInputElement).value;

    const employeeId = localStorage.getItem('employeeId');
    console.log("employee_id here", employeeId);

    const employeeData = {
        employeeId: employeeId,
        email: email || null,
        firstname: firstname || null,
        lastname: lastname || null,
        location: location || null
    };

    try {
        const response = await fetch(`http://localhost:8080/admin/employees/${employeeId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(employeeData)
        });
        localStorage.removeItem('employeeId');

        const result = await response.json();

        const messageElement = document.getElementById("message");
        if (response.ok) {
            messageElement!.innerText = "Employee updated successfully!";
            messageElement!.style.color = "green";
        } else {
            messageElement!.innerText = `Error: ${result.error}`;
            messageElement!.style.color = "red";
        }
    } catch (error) {
        console.error("Error updating employee:", error);
        document.getElementById("message")!.innerText = "Failed to update employee. Please try again.";
    }
});

document.getElementById('back-button')?.addEventListener('click',()=>{
    window.location.href = '../../src/pages/viewEmployees.html';
})
