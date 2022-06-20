-- Database \ Table Definition
-- Delete DB if exists
DROP DATABASE IF EXISTS employees_db;

-- Create DB
CREATE DATABASE employees_db;

-- Select DB to use
USE employees_db;


-- Create Departments Table
CREATE TABLE departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) UNIQUE NOT NULL
);

-- Create Roles Table
CREATE TABLE roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_title VARCHAR(30) UNIQUE NOT NULL,
    role_salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    INDEX dep_ind (department_id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE CASCADE
    );

-- Create Employees Table
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    INDEX role_ind (role_id),
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE,
    manager_id INT,
    INDEX man_ind (manager_id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE
    SET
        NULL
    );

