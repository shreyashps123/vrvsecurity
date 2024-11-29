document.getElementById('editProfileForm')?.addEventListener('submit', async function(event: Event): Promise<void> {
    event.preventDefault();

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const firstname = (document.getElementById("firstname") as HTMLInputElement).value;
    const lastname = (document.getElementById("lastname") as HTMLInputElement).value;
    const location = (document.getElementById("location") as HTMLInputElement).value;
    const phone_number = (document.getElementById("phone_number") as HTMLInputElement).value;

    const user_id = localStorage.getItem('user_id');

    const profileData = {
        email: email,
        firstname: firstname || null,
        lastname: lastname || null,
        location: location || null,
        phone_number: phone_number || null
    };

    try {
        const response = await fetch(`http://localhost:8080/employees/${user_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer '+localStorage.getItem('token')
            },
            body: JSON.stringify(profileData)
        });

        const result = await response.json();

        const messageElement = document.getElementById("message");
        if (response.ok) {
            messageElement!.innerText = "Profile updated successfully!";
            messageElement!.style.color = "green";
        } else {
            messageElement!.innerText = `Error: ${result.error}`;
            messageElement!.style.color = "red";
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        document.getElementById("message")!.innerText = "Failed to update profile. Please try again.";
    }

});



























// async function submitProfile() {
//     const email = (document.getElementById("email") as HTMLInputElement).value;
//     const firstname = (document.getElementById("firstname") as HTMLInputElement).value;
//     const lastname = (document.getElementById("lastname") as HTMLInputElement).value;
//     const location = (document.getElementById("location") as HTMLInputElement).value;
//     const phone_number = (document.getElementById("phone_number") as HTMLInputElement).value;
//
//     const user_id = localStorage.getItem('user_id');
//
//     const profileData = {
//         email: email,
//         firstname: firstname || null,
//         lastname: lastname || null,
//         location: location || null,
//         phone_number: phone_number || null
//     };
//
//     try {
//         const response = await fetch(`http://localhost:8080/employees/${user_id}`, {
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(profileData)
//         });
//
//         const result = await response.json();
//
//         const messageElement = document.getElementById("message");
//         if (response.ok) {
//             messageElement!.innerText = "Profile updated successfully!";
//             messageElement!.style.color = "green";
//         } else {
//             messageElement!.innerText = `Error: ${result.error}`;
//             messageElement!.style.color = "red";
//         }
//     } catch (error) {
//         console.error("Error updating profile:", error);
//         document.getElementById("message")!.innerText = "Failed to update profile. Please try again.";
//     }
// }