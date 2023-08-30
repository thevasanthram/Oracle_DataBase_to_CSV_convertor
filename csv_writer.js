const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Sample data (array of objects)
const data = [
  { Name: 'John', Age: 30, City: 'New York' },
  { Name: 'Alice', Age: 25, City: 'Los Angeles' },
  { Name: 'Bob', Age: 35, City: 'San Francisco' },
];

// Create a CSV writer
const csvWriter = createCsvWriter({
  path: 'output.csv', // Output file path
  header: [
    { id: 'Name', title: 'Name' },
    { id: 'Age', title: 'Age' },
    { id: 'City', title: 'City' },
  ],
});

// Write the data to the CSV file
csvWriter.writeRecords(data)
  .then(() => {
    console.log('CSV file created successfully');
  })
  .catch((error) => {
    console.error('Error:', error);
  });
