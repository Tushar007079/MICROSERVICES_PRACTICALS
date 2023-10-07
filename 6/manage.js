const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mainMenu() {
    console.log('Main Menu:');
    console.log('1. Add Student');
    console.log('2. View Students');
    console.log('3. Delete Student');
    console.log('4. Exit');
    rl.question('Enter your choice: ', choice => {
        switch (choice) {
            case '1':
                addStudent();
                break;
            case '2':
                viewStudents();
                break;
            case '3':
                deleteStudent();
                break;
            case '4':
                rl.close();
                break;
            default:
                console.log('Invalid choice. Try again.');
                mainMenu();
                break;
        }
    });
}

function addStudent() {
    // Get student details from the user
    rl.question('Enter student name: ', name => {
        rl.question('Enter Quiz Marks: ', quiz => {
            rl.question('Enter Mid-term Marks: ', midterm => {
                rl.question('Enter Assignment Marks: ', assignment => {
                    rl.question('Enter Final Exam Marks: ', finalExam => {
                        const totalMarks =
                            parseFloat(quiz) +
                            parseFloat(midterm) +
                            parseFloat(assignment) +
                            parseFloat(finalExam);
                        const studentData = `${name},${quiz},${midterm},${assignment},${finalExam},${totalMarks}\n`;
                        fs.appendFile('grade_sheet.csv', studentData, 'utf8', err => {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log('Student added successfully!');
                                mainMenu();
                            }
                        });
                    });
                });
            });
        });
    });
}

function viewStudents() {
    fs.readFile('grade_sheet.csv', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Student Grade Sheet:');
            console.log(data);
        }
        mainMenu();
    });
}

function deleteStudent() {
    rl.question('Enter the name of the student to delete: ', nameToDelete => {
        fs.readFile('grade_sheet.csv', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                mainMenu();
            } else {
                // Split the CSV data into an array of lines
                const lines = data.split('\n');

                // Find the index of the student to delete
                const indexToDelete = lines.findIndex(line => {
                    const studentData = line.split(',');
                    return studentData[0] === nameToDelete;
                });

                if (indexToDelete !== -1) {
                    // Remove the student's data from the array
                    lines.splice(indexToDelete, 1);

                    // Join the remaining lines back into CSV format
                    const updatedData = lines.join('\n');

                    // Write the updated data back to the CSV file
                    fs.writeFile('grade_sheet.csv', updatedData, 'utf8', err => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log(`Student "${nameToDelete}" deleted successfully.`);
                        }
                        mainMenu();
                    });
                } else {
                    console.log(`Student "${nameToDelete}" not found.`);
                    mainMenu();
                }
            }
        });
    });
}

// Start the application
mainMenu();