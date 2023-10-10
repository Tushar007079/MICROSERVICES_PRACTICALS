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

// Create a function to get user input for the student name to delete
function getStudentNameToDelete() {
    rl.question('Enter the name of the student to delete: ', (studentName) => {
        deleteStudentByName(studentName);
    });
}

// Function to delete a student by name and display the deleted student in a table format
function deleteStudentByName(studentName) {
    Student.findOneAndDelete({ name: studentName })
        .then((deletedStudent) => {
            if (deletedStudent) {
                console.log(`\nStudent with the name "${studentName}" deleted:`);
                displayTable([deletedStudent]);
            } else {
                console.log(`\nNo student found with the name "${studentName}".`);
            }
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

// Start by getting the name of the student to delete
getStudentNameToDelete();