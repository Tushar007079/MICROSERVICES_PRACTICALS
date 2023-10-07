const fs = require('fs');
const csv = require('csv-parser');
const readline = require('readline');

// Function to delete data from a CSV file
function deleteFromCSV(filePath, itemNameToDelete) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        if (data.Item !== itemNameToDelete) {
          results.push(data);
        }
      })
      .on('end', () => {
        const ws = fs.createWriteStream(filePath);
        ws.write('Item,Price\n'); // Assuming CSV format: "Item,Price"
        results.forEach((row) => {
          ws.write(`${row.Item},${row.Price}\n`);
        });
        ws.end();
        resolve('Data deleted from CSV successfully.');
      })
      .on('error', (error) => reject(error));
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the CSV file name: ', (fileName) => {
  rl.question('Enter the Item to delete: ', (itemName) => {
    deleteFromCSV(fileName, itemName)
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
