const oracledb = require('oracledb');
const fs = require('fs');

async function connectToDatabase() {
  try {
    const dbConfig = {
      user: 'admin',
      password: 'admin',
      connectString: '(DESCRIPTION =(ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521)))(CONNECT_DATA = (SERVICE_NAME = orcl)));User Id= admin ;Password=admin;', // Use the connection string here
    };

    // Establish a connection
    const connection = await oracledb.getConnection(dbConfig);

    // Your database operations here
    const sql = 'SELECT * FROM T_ANNO_CRPIMG';
    const response = await connection.execute(sql, []);
    const records = response.rows
    // Close the connection when done
    // console.log('response: ', response.rows.length);

    let cropped_img_data = {}
    // transform records
    records.map( (record) => {
        if(!cropped_img_data[record[0]]){
            cropped_img_data[record[0]] = [record]
        }else{
            cropped_img_data[record[0]].push(record)
        }
    })

    // console.log('cropped_img_data: ', cropped_img_data)
    await connection.close();

    Object.keys(cropped_img_data).map( (file_id, index) => {
        
        const file_id_records = cropped_img_data[file_id].map( (crp_img) => {
            return crp_img.slice(1,crp_img.length - 2)
        })

        file_id_records.unshift(['Image Name','DefectName','Severity','NumberOfPoints']);

        // Convert the array of arrays to CSV format
        const csvData = file_id_records.map(row => row.join(','));

        // Join the CSV rows with newline characters
        const csvContent = csvData.join('\n');

        // Write the CSV content to a file
        fs.writeFileSync(`./csv/${file_id}.csv`, csvContent);
    })
    

  } catch (err) {
    console.error(err.message);
  }
}

// Call the function to connect to the database
connectToDatabase();
