-- create database eshop;
use eshop;

drop table if exists admin;
drop table if exists contains;
drop table if exists manage;
drop table if exists order_discount;
drop table if exists orders;
drop table if exists store_in_basket;
drop table if exists customer;
drop table if exists product;
drop table if exists seasonal_coupon;
drop table if exists special_event;
drop table if exists shipping_coupon;
drop table if exists order_coupon;
drop table if exists coupon;
drop table if exists seller;
drop table if exists order1;
drop table if exists users;


create table users (
user_id int primary key,
name varchar(30) not null,
email varchar(30) not null unique, 
password varchar(30) not null,
address varchar(30) not null,
profile_picture blob
);

create table admin (
user_id int primary key
);

create table customer (
user_id int primary key
);

create table seller (
user_id int primary key, 
store_name varchar(30) not null,
store_address varchar(30) not null,
phone_no varchar(30) not null,
store_email varchar(30) not null
);


create table coupon(
code int not null AUTO_INCREMENT primary key,
s_uid int not null,
description text,
start_time timestamp not null,
coupon_type varchar(20) not null,
end_time timestamp not null,
Constraint FK_s_uid FOREIGN KEY (s_uid) REFERENCES seller(user_id) 
								ON DELETE CASCADE ON UPDATE CASCADE 
);

create table special_event (
code int primary key, 
percentage dec(4,2) not null
);


create table product (
product_id int not null AUTO_INCREMENT primary key,
code int,
s_uid int not null,
stock_quantity int not null,
price int not null,
name varchar(50) not null,
picture blob,
available boolean not null DEFAULT true,
description text not null,
Constraint FK_s_uid1 FOREIGN KEY (s_uid) REFERENCES seller(user_id) 
								ON DELETE CASCADE ON UPDATE CASCADE, 
Constraint FK_code FOREIGN KEY (code) REFERENCES special_event(code)
								ON DELETE CASCADE ON UPDATE CASCADE
);

create table store_in_basket ( 
c_uid int not null,
product_id int not null, 
quantity int not null,
Primary key(c_uid, product_id),
Constraint FK_product_id FOREIGN KEY (product_id) REFERENCES product(product_id) 
								ON DELETE CASCADE ON UPDATE CASCADE,
Constraint FK_c_uid FOREIGN KEY (c_uid) REFERENCES customer(user_id) 
								ON DELETE CASCADE ON UPDATE CASCADE
);


create table orders(
order_id int primary key,
c_uid int not null,
time timestamp not null,
Constraint FK_c_uid1 FOREIGN KEY (c_uid) REFERENCES customer(user_id) 
								ON DELETE CASCADE ON UPDATE CASCADE
);

create table contains(
order_id int not null, 
product_id int not null, 
quantity int not null,
Price_per_piece int not null,
Primary key(order_id, product_id),
Constraint FK_order_id FOREIGN KEY (order_id) REFERENCES orders(order_id) 
								ON DELETE CASCADE ON UPDATE CASCADE,
Constraint FK_product_id1 FOREIGN KEY (product_id) REFERENCES product(product_id)
								ON DELETE CASCADE ON UPDATE CASCADE
);

create table manage(
order_id int not null, 
status varchar(10) not null, 
s_uid int not null,
Primary key (order_id, s_uid),
Constraint FK_s_uid2 FOREIGN KEY (s_uid) REFERENCES seller(user_id) 
								ON DELETE CASCADE ON UPDATE CASCADE,
Constraint FK_order_id1 FOREIGN KEY (order_id) REFERENCES orders(order_id) 
								ON DELETE CASCADE ON UPDATE CASCADE
);

create table seasonal_coupon(
code int primary key, 
percentage dec(4,2) not null 

);

create table shipping_coupon (
code int primary key,
threshold int not null
);

create table order_coupon(
code int primary key,
Constraint FK_code4 FOREIGN KEY (code) REFERENCES coupon(code)
								ON DELETE CASCADE ON UPDATE CASCADE
);

create table order_discount(
oc_code int not null,
order_id int not null, 
Primary Key (oc_code, order_id),
Constraint FK_order_id2 FOREIGN KEY (order_id) REFERENCES orders(order_id) 
								ON DELETE CASCADE ON UPDATE CASCADE,
Constraint FK_oc_code FOREIGN KEY (oc_code) REFERENCES coupon(code) 
								ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert sample data into user table
INSERT INTO users (user_id, name, email, password, address, profile_picture) VALUES
(1, 'John Doe', 'john.doe@example.com', 'password123', '123 Main St', NULL),
(2, 'Jane Smith', 'jane.smith@example.com', 'password456', '456 Main St', NULL),
(3, 'Alice Brown', 'alice.brown@example.com', 'password789', '789 Main St', NULL),
(4, 'Bob Johnson', 'bob.johnson@example.com', 'password321', '321 Main St', NULL),
(5, 'Charlie White', 'charlie.white@example.com', 'password654', '654 Main St', NULL),
(6, 'David Green', 'david.green@example.com', 'password987', '987 Main St', NULL),
(7, 'Emma Black', 'emma.black@example.com', 'password159', '159 Main St', NULL),
(8, 'Frank Gray', 'frank.gray@example.com', 'password357', '357 Main St', NULL),
(9, 'Grace Blue', 'grace.blue@example.com', 'password753', '753 Main St', NULL),
(10, 'Henry Red', 'henry.red@example.com', 'password951', '951 Main St', NULL);

-- Insert sample data into admin table
INSERT INTO admin (user_id) VALUES (1), (2);

-- Insert sample data into customer table
INSERT INTO customer (user_id) VALUES (3), (4), (5), (6), (7);

-- Insert sample data into seller table
INSERT INTO seller (user_id, store_name, store_address, phone_no, store_email) VALUES
(8, 'Store A', '100 Market St', '555-1111', 'storea@example.com'),
(9, 'Store B', '200 Market St', '555-2222', 'storeb@example.com'),
(10, 'Store C', '300 Market St', '555-3333', 'storec@example.com');

-- Insert sample data into coupon table
INSERT INTO coupon (code, s_uid, description, start_time, coupon_type, end_time) VALUES
(101, 8, '10% off Store A', '2023-01-01 00:00:00', 'seasonal', '2023-02-28 23:59:59'),
(102, 9, '5% off Store B', '2023-01-01 00:00:00', 'special_event', '2023-01-31 23:59:59'),
(103, 10, 'Free shipping on orders over $50', '2023-01-01 00:00:00', 'shipping', '2023-03-31 23:59:59'),
(104, 8, '15% off Store A', '2023-02-01 00:00:00', 'special_event', '2023-02-14 23:59:59'),
(105, 9, '20% off Store B', '2023-03-01 00:00:00', 'seasonal', '2023-03-31 23:59:59');

-- Insert sample data into special_event table
INSERT INTO special_event (code, percentage) VALUES
(102, 5.00),
(104, 15.00);

-- Insert sample data into product table
INSERT INTO product (product_id, code, s_uid, stock_quantity, price, name, picture, available, description) VALUES
(1001, NULL, 8, 10, 1000, 'Product A1', NULL, true, 'Product A1 description'),
(1002, 104, 8, 15, 1500, 'Product A2', NULL, true, 'Product A2 description'),
(1003, NULL, 8, 20, 2000, 'Product A3', NULL, true, 'Product A3 description'),
(1004, NULL, 9, 30, 3000, 'Product B1', NULL, true, 'Product B1 description'),
(1005, 102, 9, 25, 2500, 'Product B2', NULL, true, 'Product B2 description'),
(1006, NULL, 9, 40, 4000, 'Product B3', NULL, true, 'Product B3 description'),
(1007, NULL, 10, 50, 5000, 'Product C1', NULL, true, 'Product C1 description'),
(1008, NULL, 10, 45, 4500, 'Product C2', NULL, true, 'Product C2 description'),
(1009, NULL, 10, 55, 5500, 'Product C3', NULL, true, 'Product C3 description');

-- Insert sample data intostore_in_basket table
INSERT INTO store_in_basket (c_uid, product_id, quantity) VALUES
(3, 1001, 1),
(3, 1005, 2),
(4, 1002, 1),
(5, 1006, 3),
(5, 1009, 1),
(6, 1007, 2),
(7, 1003, 1),
(7, 1004, 1),
(7, 1008, 1);

-- Insert sample data into orders table
INSERT INTO orders (order_id, c_uid, time) VALUES
(2001, 3, '2023-01-10 10:00:00'),
(2002, 4, '2023-01-15 14:30:00'),
(2003, 5, '2023-01-20 09:45:00'),
(2004, 6, '2023-01-25 16:15:00'),
(2005, 7, '2023-01-30 11:30:00');

-- Insert sample data into contains table
INSERT INTO contains (order_id, product_id, quantity, price_per_piece) VALUES
(2001, 1001, 1, 1000),
(2001, 1005, 2, 2500),
(2002, 1002, 1, 1500),
(2003, 1006, 3, 4000),
(2003, 1009, 1, 5500),
(2004, 1007, 2, 5000),
(2005, 1003, 1, 2000),
(2005, 1004, 1, 3000),
(2005, 1008, 1, 4500);

-- Insert sample data into manage table
INSERT INTO manage (order_id, status, s_uid) VALUES
(2001, 'shipped', 8),
(2001, 'shipped', 9),
(2002, 'shipped', 8),
(2003, 'shipped', 9),
(2003, 'shipped', 10),
(2004, 'shipped', 10),
(2005, 'shipped', 8),
(2005, 'shipped', 9),
(2005, 'shipped', 10);

-- Insert sample data into seasonal_coupon table
INSERT INTO seasonal_coupon (code, percentage) VALUES
(101, 10.00),
(105, 20.00);

-- Insert sample data into shipping_coupon table
INSERT INTO shipping_coupon (code, threshold) VALUES
(103, 50);

-- Insert sample data into order_coupon table
INSERT INTO order_coupon (code) VALUES
(101),
(103),
(105);

-- Insert sample data into order_discount table
INSERT INTO order_discount (oc_code, order_id) VALUES
(101, 2001),
(103, 2003),
(105, 2005);
