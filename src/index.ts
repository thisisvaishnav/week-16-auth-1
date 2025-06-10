// write a to create a users table in your database.

import { Client } from "pg";

const client = new Client({
    connectionString: "postgresql://neondb_owner:npg_L2mXjpEG9wUq@ep-divine-mud-a1bx6dzt-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
})

// Function to create users table
const createUsersTable = async (): Promise<void> => {
    try {
        const result = await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("Users table created successfully");
    } catch (error) {
        console.error("Error creating users table:", error);
    }
}

// Function to insert data into a table
const insertDataIntoTable = async (): Promise<void> => {
    try {
        const insertQuery = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING`;
        const values = ["John Doe", "john.doe@example.com", "password"];
        const result = await client.query(insertQuery, values);
        console.log("Data inserted successfully");
    } catch (error) {
        console.error("Error inserting data:", error);
    }
}

// Function to select data from a table
const selectDataFromTable = async (): Promise<void> => {
    try {
        const result = await client.query(`
            SELECT id, name, email, created_at, updated_at FROM users
        `);
        console.log("Selected data:", result.rows);
    } catch (error) {
        console.error("Error selecting data:", error);
    }
}

// Main function to execute all operations
const main = async (): Promise<void> => {
    try {
        await client.connect();
        console.log("Connected to Neon database successfully");
        
        await createUsersTable();
        await insertDataIntoTable();
        await selectDataFromTable();
        
    } catch (error) {
        console.error("Database operation failed:", error);
    } finally {
        await client.end();
        console.log("Database connection closed");
    }
}
// async function to fetch user data from the database given an email
 async function getuser(email: string) {
    const client = new Client({
        connectionString: "postgresql://neondb_owner:npg_L2mXjpEG9wUq@ep-divine-mud-a1bx6dzt-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
    })
    try {
        await client.connect();
        const query = 'SELECT * FROM users WHERE email = $1  ';
        const values = [email];
        const result = await client.query(query, values);

        if( result.rows.length > 0){
            console.log('User found:' , result.rows[0]);
            return result.rows[0];

        }else{ 
            console.log(' No user is found with the given email');
            return null;
        }
    }catch(error){
        console.error('Error fetching user data:', error);
        return null;
    }finally{
        await client.end();
        console.log('Database connection closed');
    }
    

}

getuser('hohn.doe@example.com').catch(console.error);

