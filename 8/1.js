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

// Create a function to get user input for the number of students to insert
function getNumberOfStudents() {
    rl.question('Enter the number of students you want to insert: ', (numStudentsInput) => {
        const numStudents = parseInt(numStudentsInput);
        insertStudents(numStudents);
    });
}

// Create a function to get user input for student details and insert students
function insertStudents(numStudents) {
    const studentsData = [];

    function insertStudent(index) {
        if (index < numStudents) {
            rl.question(`Enter details for Student ${index + 1}:\nName: `, (name) => {
                rl.question('Age: ', (age) => {
                    rl.question('Address: ', (address) => {
                        rl.question('Phone Number: ', (phoneNumber) => {
                            rl.question('Email: ', (email) => {
                                studentsData.push({
                                    name: name,
                                    age: parseInt(age),
                                    address: address,
                                    phoneNumber: phoneNumber,
                                    email: email
                                });

                                insertStudent(index + 1); // Insert the next student
                            });
                        });
                    });
                });
            });
        } else {
            // All students are collected, insert them into the database
            Student.insertMany(studentsData)
                .then((students) => {
                    console.log(`\nInserted ${students.length} students:`);
                    displayTable(students);

                    rl.close(); // Close the readline interface
                    mongoose.disconnect(); // Close the database connection
                })
                .catch((err) => {
                    console.error(err);
                    rl.close(); // Close the readline interface
                    mongoose.disconnect(); // Close the database connection
                });
        }
    }

    insertStudent(0); // Start inserting students
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

// Start by getting the number of students to insert
getNumberOfStudents();