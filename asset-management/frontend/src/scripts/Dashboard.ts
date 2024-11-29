const checkLogin = () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
        window.location.href = '../../src/pages/login.html';
    }
};

const logout = () => {
    localStorage.removeItem("user_id");
    window.location.href = '../../src/pages/login.html';
};

document.getElementById('logOut')?.addEventListener('click',()=>{
    logout();
})
document.addEventListener('DOMContentLoaded',checkLogin)
