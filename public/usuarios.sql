create database EduGamixDB;
CREATE TABLE usuarios (
   id INT AUTO_INCREMENT PRIMARY KEY,
   nombre VARCHAR(100) NOT NULL,
   email VARCHAR(100) UNIQUE NOT NULL,
   contrasena VARCHAR(255) NOT NULL
  );
  
  
  
   
   
   
   
   