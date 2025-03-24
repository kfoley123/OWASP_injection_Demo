const express = require('express');
const sqlite3 = require('sqlite3').verbose();  
const app = express();
const port = 3000;


// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files (e.g., CSS)
app.use(express.static('public'));

// Create a new SQLite database connection
const db = new sqlite3.Database('./contactForm.db');

// Create the table if it doesn't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT
  )`);
});

// Home route to serve the contact form
app.get('/', (req, res) => {
  res.render('index');  // Render the index.ejs template
});

// Handle form submission and save data to the database
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  // Validate form fields
  if (!name || !email || !message) {
    return res.send('All fields are required!');
  }

  // Dangerous SQL query with direct string concatenation (this is vulnerable to injection)
  const sql = `INSERT INTO messages (name, email, message) VALUES ('${name}', '${email}', '${message}')`;
  console.log("SQL query: ", sql); // Log the SQL query for debugging
  // Run the SQL query directly
  db.run(sql, function (err) {
    if (err) {
      console.error(err.message);
      return res.send('Error saving your message.');
    }
    // Respond with a confirmation message and the saved data
    return res.send(`
      Thank you for your message, ${name}! We will get back to you at ${email} soon. 
      <br><br>
      Your message: ${message}
    `);
  });

  // // Insert the form data into the SQLite database (this is parameterized and protected from injection)
  // db.run(
  //   `INSERT INTO messages (name, email, message) VALUES (?, ?, ?)`,
  //   [name, email, message],
  //   function (err) {
  //     if (err) {
  //       console.error(err.message);
  //       return res.send('Error saving your message.');
  //     }
  //     // Respond with a confirmation message and the saved data
  //     return res.send(`
  //       Thank you for your message, ${name}! We will get back to you at ${email} soon. 
  //       <br><br>
  //       Your message: ${message}
  //     `);
  //   }
  // );
});

// Start the server
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
