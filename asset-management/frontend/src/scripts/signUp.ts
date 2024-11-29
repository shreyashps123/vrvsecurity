document.getElementById('register-form')?.addEventListener('submit', async (event) => {
    console.log('in frontend')
    event.preventDefault();
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const firstName = (document.getElementById('firstname') as HTMLInputElement).value;
    const lastName = (document.getElementById('lastname') as HTMLInputElement).value;
    const phoneNo = (document.getElementById('phone') as HTMLInputElement).value;
    const password = (document.getElementById('psw') as HTMLInputElement).value;
    const role = (document.getElementById('role') as HTMLInputElement).value;
    const location = (document.getElementById('location') as HTMLInputElement).value;
    const dateOfJoining = (document.getElementById('doj') as HTMLInputElement).value;
    const registerApi = 'http://localhost:8080/user/register';
    const response = await fetch(registerApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                email, firstName, lastName, phoneNo, password, role, location, dateOfJoining
            }
        )
    })
    if(response.status === 201){
        console.log('registered!');
    }
    else{
        if(response.status===404){
            localStorage.clear();
        }
        console.log('failed!')
    }
})

document.getElementById('close-btn')?.addEventListener('click',()=>{
    window.location.href = '../../src/pages/login.html';
})