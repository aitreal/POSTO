document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');

    loginButton.addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple authentication check
        if (username === "admin" && password === "password") {
            alert("Login successful!");
            window.location.href = '/app.html'; // Navigate to the main page after login
        } else {
            alert("Invalid credentials!");
        }
    });

    signupButton.addEventListener('click', function() {
        window.location.href = '/signup.html'; // Navigate to the signup page
    });
});