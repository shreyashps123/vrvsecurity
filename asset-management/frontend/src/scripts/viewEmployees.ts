interface Employee{
    employee_id: number;
    employee_name: string;
    email: string;
    date_of_joining: Date;
    location: string;
    phone_number: string;
}

const displayEmployees = (employees: Employee[]): void => {
    const employeeList = document.getElementById('employee-list');
    if (!employeeList) return;

    employeeList.innerHTML = '';
    if (employees.length > 0) {
        const table = document.createElement('table');
        table.className = "table";
        const headerRow = document.createElement('tr');
        headerRow.className = "thead-dark";
        headerRow.innerHTML = `
            <th>Employee Name</th>
            <th>Email</th>
            <th>Date of joining</th>
            <th>Location</th>
            <th>Phone number</th>
            <th>Update</th>
            <th>Delete</th>
        `;
        table.appendChild(headerRow);
        
        employees.forEach((employee) => {
            console.log(employee.employee_id);
            const row = document.createElement('tr');
            const date = new Date(employee.date_of_joining);
            row.innerHTML = `
                <td>${employee.employee_name}</td>
                <td>${employee.email}</td>
                <td>${date.toLocaleDateString()}</td>
                <td>${employee.location}</td>
                <td>${employee.phone_number}</td>
                <td><button class="btn btn-primary update-btn" data-id=${employee.employee_id}>Update</button> </td>
                <td><button class="btn btn-danger" onclick="deleteEmployee('${employee.email}')">Del</td>
            `;
            table.appendChild(row);
        });
        employeeList.appendChild(table);
        updateEmployee();
    }
};

const getEmployees = async (): Promise<void> => {
    try {
        const getEmployeeApi = `http://localhost:8080/admin/employees`;
        const response = await fetch(getEmployeeApi,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        });
        console.log(response);
        if (!(response.status >= 200 && response.status <300)) {
            if(response.status===404 || response.status===401 || response.status===403){
                localStorage.clear();
                window.location.href = '../../src/pages/login.html';
            }
            const errorData = await response.json();
            console.error('Error getting data:', errorData.message);
        } else {
            const data = await response.json();
            displayEmployees(data.employees);
        }
    } catch (err) {
        console.error('Fetch error:', err);
    }
};

const deleteEmployee = async(email:string)=>{
    const deleteEmployeeAPI = 'http://localhost:8080/admin/employees';
    try {
        const response = await fetch(deleteEmployeeAPI, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({"employeeEmail": email})
        })
        if (response.status >= 200 && response.status < 300) {

            alert("employee deleted successfully!");
            return;
        }
        else{
            const errorData = await response.json();
            console.error('Error getting data:', errorData.message);
        }
    }catch(err){
        console.error('Fetch error:', err);
    }
}

const updateEmployee = ():void => {
    document.querySelectorAll('.update-btn').forEach(button => {
        button.addEventListener('click', async function (event: Event) {
            event.preventDefault();
            const employeeId: string = (event.currentTarget as HTMLButtonElement).getAttribute('data-id') || '';
            console.log("employeeid logging test", employeeId);
            localStorage.setItem('employeeId', employeeId);
            console.log("hi shreyash, golang");
            window.location.href = '../pages/updateEmployee.html';

        });
    });

}


document.getElementById('add-employee')?.addEventListener('click',()=>{
    window.location.href = '../../src/pages/register.html';
})
document.addEventListener("DOMContentLoaded", getEmployees);