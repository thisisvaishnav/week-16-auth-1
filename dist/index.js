"use strict";
// write a to create a users table in your database.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: "postgresql://neondb_owner:npg_L2mXjpEG9wUq@ep-divine-mud-a1bx6dzt-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
});
// Function to create users table
const createUsersTable = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield client.query(`
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
    }
    catch (error) {
        console.error("Error creating users table:", error);
    }
});
// Function to insert data into a table
const insertDataIntoTable = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const insertQuery = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING`;
        const values = ["John Doe", "john.doe@example.com", "password"];
        const result = yield client.query(insertQuery, values);
        console.log("Data inserted successfully");
    }
    catch (error) {
        console.error("Error inserting data:", error);
    }
});
// Function to select data from a table
const selectDataFromTable = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield client.query(`
            SELECT id, name, email, created_at, updated_at FROM users
        `);
        console.log("Selected data:", result.rows);
    }
    catch (error) {
        console.error("Error selecting data:", error);
    }
});
// Main function to execute all operations
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log("Connected to Neon database successfully");
        yield createUsersTable();
        yield insertDataIntoTable();
        yield selectDataFromTable();
    }
    catch (error) {
        console.error("Database operation failed:", error);
    }
    finally {
        yield client.end();
        console.log("Database connection closed");
    }
});
// Execute the main function
main();
