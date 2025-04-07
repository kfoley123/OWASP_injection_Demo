# OWASP Top 10 - Injection Demo (Node.js + SQLite)

This project is a simple web application built with Express.js and SQLite that demonstrates **SQL Injection**, one of the OWASP Top 10 most critical web application security risks.

It features two versions of a form submission handler:
- A **vulnerable version** that uses raw SQL queries to demo an unsafe setup.
- A **secure version** that uses parameterized queries to demo a safe setup.

You can easily switch between them in the code to see how parameterized queries protect against injection attacks.

## 🧠 Purpose

This project was created as a quick and clear educational tool to:
- Show how SQL Injection works using user input.
- Demonstrate how parameterized queries prevent injection vulnerabilities.
- Demo the saftey nets that are in place in 2025 which prevent successful attacks.

## 🚀 How It Works

### 1. The Contact Form

Users can submit their:
- Name
- Email
- Message

Form submissions are handled by the `/submit` route and stored in an SQLite database.

### 2. Vulnerable SQL Query (Injection Possible)

The following code is **vulnerable to SQL injection** because it directly includes user input in the SQL query string:

```js
const sql = `INSERT INTO messages (name, email, message) VALUES ('${name}', '${email}', '${message}')`;
db.run(sql, function (err) { ... });
```

Try submitting an input like:
```
anything'); DROP TABLE messages; --
```
to see the destructive power of injection.

### 3. Safe SQL Query (Parameterized)

Comment out the vulnerable block and **uncomment** the parameterized query version:

```js
db.run(
  `INSERT INTO messages (name, email, message) VALUES (?, ?, ?)`,
  [name, email, message],
  function (err) { ... }
);
```

This version uses placeholders (`?`) and binds the user input, preventing injection.

## 🛠️ Setup & Run

### Prerequisites
- Node.js and npm installed

### Install dependencies
```bash
npm install
```

### Run the server
```bash
node app.js
```

Open your browser and go to:  
[http://localhost:3000](http://localhost:3000)

## 🧪 Testing Injection

To test injection vulnerabilities:
1. Use the default vulnerable code block.
2. Submit the following in the **message** field:
   ```
   test'); DROP TABLE messages; --
   ```
3. If the app is vulnerable, the user input will be treated as code and hit the database, however SQLite3 does not allow multiple SQL statements in a single query by default, so it will still block the attack. No flashy table deletion in this demo, but you will get a sqlite error, which shows you that it was trying to run SQL commands against the database. 

## 📁 Project Structure

```
├── app.js            # Main Express server
├── contactForm.db    # SQLite database file
├── views/
│   └── index.ejs     # Contact form view
├── public/           # Static assets (CSS, etc.)
└── README.md         # This file
```

## 🔐 Learn More

- [OWASP Top 10: Injection](https://owasp.org/www-project-top-ten/2017/A1_2017-Injection)
- [Node.js SQLite3](https://github.com/TryGhost/node-sqlite3/wiki/API)


