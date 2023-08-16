const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Import the path module to work with file paths

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Sample data for universities or industries
let employees = [
  { id: 1, name: 'John Doe', role: 'Professor', department: 'Computer Science' },
  { id: 2, name: 'Jane Smith', role: 'Engineer', department: 'Mechanical Engineering' },
];

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to get all employees
app.get('/employees', (req, res) => {
  res.json(employees);
});

// Route to get an employee by ID
app.get('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find((emp) => emp.id === id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
});

// Route to add a new employee
app.post('/employees', (req, res) => {
  const { id, name, role, department } = req.body;
  if (!id || !name || !role || !department) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  const newEmployee = { id, name, role, department };
  employees.push(newEmployee);
  console.log("New employee added:", newEmployee);
  res.status(201).json(newEmployee);
});

// Route to update an existing employee by ID

// Route to update an existing employee by ID
app.put('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, role, department } = req.body;
  const employeeIndex = employees.findIndex((emp) => emp.id === id);

  if (employeeIndex !== -1) {
    // Employee with the provided ID exists, update the data
    employees[employeeIndex].name = name || employees[employeeIndex].name;
    employees[employeeIndex].role = role || employees[employeeIndex].role;
    employees[employeeIndex].department = department || employees[employeeIndex].department;
    console.log("Employee updated:", employees[employeeIndex]);
    res.json(employees[employeeIndex]);
  } else {
    // Employee with the provided ID doesn't exist, create a new employee
    const newEmployee = { id, name, role, department };
    employees.push(newEmployee);
    console.log("New employee added:", newEmployee);
    res.status(201).json(newEmployee);
  } 
});

// Route to delete an employee by NAME
app.delete('/employees/:name', (req, res) => {
  const name = req.params.name;
  employees = employees.filter((emp) => emp.name !== name);
  res.json({ message: 'Employee deleted successfully' });
});

// Serve the index.html file for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
