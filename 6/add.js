const fs = require('fs');
const csv = require('csv-parser');
const readline = require('readline');

function addToCSV(filePath, newData) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        results.push(newData);
        const ws = fs.createWriteStream(filePath);
        ws.write('Item,Price\n'); // Assuming CSV format: "Item,Price"
        results.forEach((row) => {
          ws.write(`${row.Item},${row.Price}\n`);
        });
        ws.end();
        resolve('Data added to CSV successfully.');
      })
      .on('error', (error) => reject(error));
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the Item: ', (item) => {
  rl.question('Enter the Price: ', (price) => {
    const newData = { Item: item, Price: parseFloat(price) };
    addToCSV('shop_items.csv', newData)
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