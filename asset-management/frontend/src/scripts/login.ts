document.getElementById('loginForm')?.addEventListener('submit', async function(event: Event): Promise<void> {
    event.preventDefault();

    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    console.log(email, password);

    try {

        const response = await fetch('http://localhost:8080/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ username: email, password: password })
        });

        const res: { token: string; user_id: string; email: string; role: string; message?: string } = await response.json();

        if (response.ok) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('user_id', res.user_id);
            localStorage.setItem('email', res.email);
            localStorage.setItem('role',res.role);
            console.log(res.role);

            if (res.role === 'admin') {
                window.location.href = "../../src/pages/adminDashboard.html";
            } else {
                window.location.href = "../../src/pages/employeeDashboard.html";
            }
        } else {
            alert(res.message || 'Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});