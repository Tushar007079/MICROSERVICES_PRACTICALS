const mongoose = require('mongoose');
const Table = require('cli-table3');

mongoose.connect('mongodb://localhost:27017/student', { useNewUrlParser: true, useUnifiedTopology: true });

const Student = mongoose.model('Student', {
    name: String,
    age: Number,
    address: String,
    phoneNumber: String,
    email: String
});

// Find all students and display them in a table format
Student.find({})
    .then((students) => {
        console.log(`\nAll Students:`);
        displayTable(students);
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
        mongoose.disconnect(); // Close the database connection
    });

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