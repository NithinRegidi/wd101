document.addEventListener('DOMContentLoaded', function() {
    // Load saved data when page loads
    loadSavedData();
    
    // Form submission handler
    document.getElementById('registrationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate date of birth
        const dobInput = document.getElementById('dob');
        const dobError = document.getElementById('dobError');
        const dob = new Date(dobInput.value);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        
        if (age < 18 || age > 55) {
            dobError.textContent = 'Age must be between 18 and 55 years';
            return;
        } else {
            dobError.textContent = '';
        }
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const acceptTerms = document.getElementById('acceptTerms').checked;
        
        // Create user object
        const user = {
            name,
            email,
            password,
            dob: dobInput.value,
            acceptTerms
        };
        
        // Save to localStorage
        saveUserData(user);
        
        // Update table
        updateUserTable(user);
        
        // Reset form
        this.reset();
    });
    
    // Function to save user data to localStorage
    function saveUserData(user) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Function to load saved data from localStorage
    function loadSavedData() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.forEach(user => updateUserTable(user));
    }
    
    // Function to update the user table
    function updateUserTable(user) {
        const tableBody = document.querySelector('#userTable tbody');
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.dob}</td>
            <td>${user.acceptTerms}</td>
        `;
        
        tableBody.appendChild(row);
    }
});