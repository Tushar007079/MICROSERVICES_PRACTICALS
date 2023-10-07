const fs = require('fs');
const readline = require('readline');

function renameCSV(oldFilePath, newFilePath) {
  return new Promise((resolve, reject) => {
    fs.rename(oldFilePath, newFilePath, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve('CSV file renamed successfully.');
      }
    });
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the old CSV file name: ', (oldFileName) => {
  rl.question('Enter the new CSV file name: ', (newFileName) => {
    renameCSV(oldFileName, newFileName)
      .then((message) => {
        console.log(message);
        rl.close();
      })
      .catch((error) => {
        console.error(error);
        rl.close();
      });
  });
});
