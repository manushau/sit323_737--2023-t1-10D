const express = require('express');
const app = express();

// Parse JSON bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Password strength checking route
app.post('/check-password', (req, res) => {
  const password = req.body.password;
  const strength = checkPasswordStrength(password);

  res.json({ strength });
});

// Helper function to check password strength
function checkPasswordStrength(password) {
  // Check password length
  if (password.length < 6) {
    return 'Weak';
  }

  // Check if password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return 'Medium';
  }

  // Check if password contains at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return 'Medium';
  }

  // Check if password contains at least one digit
  if (!/[0-9]/.test(password)) {
    return 'Medium';
  }

  // Check if password contains at least one symbol
  if (!/[!@#$%^&*]/.test(password)) {
    return 'Medium';
  }

  // All criteria met, password is strong
  return 'Strong';
}

// Start the server
app.listen(8080, () => {
  console.log('Server started on port 3000');
});

module.exports = app;


