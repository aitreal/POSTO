document.addEventListener('DOMContentLoaded', function() {
    const signupButton = document.getElementById('signup-button');
    const loginButton = document.getElementById('login-button');

    signupButton.addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Passwords do not match validation
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Signup successful logic (could be saving the data, etc.)
        alert("Signup successful!");

        // Redirect to login page
        window.location.href = '\login.html'; // Adjust the URL as per your routing
    });

    loginButton.addEventListener('click', function() {
        // Redirect to login page
        window.location.href = '/login.html'; // Adjust the URL as per your routing
    });
});