CREATE DATABASE clothing_store;

USE clothing_store;

CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone_no VARCHAR(20) NOT NULL,
    order_id INT
);