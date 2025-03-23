const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files (e.g., CSS)
app.use(express.static('public'));

// Home route to serve the contact form
app.get('/', (req, res) => {
  res.render('index');  // Render the index.ejs template
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  // You can add validation or logging here
  if (!name || !email || !message) {
    return res.send('All fields are required!');
  }

  // Simulate an "injection" vulnerability here if needed
  if (message.includes('<script>')) {
    return res.send('Message contains malicious content!');
  }

  // Respond with the submitted data for now
  return res.send(`
    Thank you for your message, ${name}! We will get back to you at ${email} soon. 
    <br><br>
    Your message: ${message}
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
