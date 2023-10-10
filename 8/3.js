const mongoose = require('mongoose');
const readline = require('readline');
const Table = require('cli-table3');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

mongoose.connect('mongodb://localhost:27017/student', { useNewUrlParser: true, useUnifiedTopology: true });

const Student = mongoose.model('Student', {
    name: String,
    age: Number,
    address: String,
    phoneNumber: String,
    email: String
});

// Create a function to get user input for filtering students by age
function getAgeFilter() {
    rl.question('Enter the minimum age to filter students: ', (minAgeInput) => {
        const minAge = parseInt(minAgeInput);
        filterStudentsByAge(minAge);
    });
}

// Function to filter students by age and display them in a table format
function filterStudentsByAge(minAge) {
    Student.find({ age: { $gt: minAge } })
        .then((filteredStudents) => {
            console.log(`\nStudents older than ${minAge} years:`);
            displayTable(filteredStudents);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            rl.close(); // Close the readline interface
            mongoose.disconnect(); // Close the database connection
        });
}

// Function to display data in a table format
function displayTable(data) {
    const table = new Table({
        head: ['Name', 'Age', 'Address', 'Phone Number', 'Email'],
        colWidths: [20, 6, 30, 15, 30],
    });

    data.forEach((item) => {
        table.push([item.name, item.age, item.address, item.phoneNumber, item.email]);
    });

    console.log(table.toString());
}

// Start by getting the minimum age to filter students
getAgeFilter();