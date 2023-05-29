const express = require('express');
const app = express();
const port = 8080;
app.use(express.json());

app.use(express.static('public'));

app.post('/check-password', (req, res) => {
  const password = req.body.password;
  const strength = checkPasswordStrength(password);

  res.json({ strength });
});

function checkPasswordStrength(password) {
  if (password.length < 6) {
    return 'Weak';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Medium';
  }
  if (!/[a-z]/.test(password)) {
    return 'Medium';
  }

  if (!/[0-9]/.test(password)) {
    return 'Medium';
  }

  if (!/[!@#$%^&*]/.test(password)) {
    return 'Medium';
  }

  return 'Strong';
}

// Start the server
app.listen(port, () => {
  console.log(`Calculator app listening at http://localhost:${port}`);
});

module.exports = app;


