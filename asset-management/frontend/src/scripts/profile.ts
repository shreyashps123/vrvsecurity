interface Profile {
    firstname: string;
    lastname: string;
    email: string;
    phone_number: number;
    date_of_joining: string;
    location: string;
}

async function loadProfile(): Promise<void> {
    try {
        const employeeId = localStorage.getItem('user_id');
        const response = await fetch(`http://localhost:8080/user/employees/${employeeId}`,{
            method:'GET',
            headers:{
                'Authorization': 'Bearer '+localStorage.getItem('token')
            }
        });

        const data = await response.json();

        const profile: Profile = data.profile[0];
        (document.getElementById('firstname') as HTMLElement).textContent = profile.firstname;
        (document.getElementById('lastname') as HTMLElement).textContent = profile.lastname;
        (document.getElementById('email') as HTMLElement).textContent = profile.email;
        (document.getElementById('phoneNo') as HTMLElement).textContent = profile.phone_number.toString();
        (document.getElementById('location') as HTMLElement).textContent = profile.location;
        console.log((profile.date_of_joining));
        const date = new Date(profile.date_of_joining);
        (document.getElementById('doj') as HTMLElement).textContent = date.toLocaleDateString();
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

document.getElementById('back-btn')?.addEventListener('click',()=>{
    const role = localStorage.getItem('role');
    if(role==='employee')
        window.location.href = '../../src/pages/employeeDashboard.html';
    if(role === 'admin'){
        window.location.href = '../../src/pages/adminDashboard.html';
    }
})

document.getElementById('edit-btn')?.addEventListener('click',()=>{
    window.location.href = '../../src/pages/editProfile.html';
})

document.getElementById('update-psw-btn')?.addEventListener('click',()=>{
    window.location.href = '../../src/pages/updatePassword.html'
})
window.onload = loadProfile;
