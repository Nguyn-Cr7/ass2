# FUNewsManagementSystem - Assignment 02

Hệ thống quản lý tin tức (FUNewsManagementSystem) được xây dựng với Spring Boot 3 và ReactJS.

## Công nghệ sử dụng
- **Backend:** Java 21, Spring Boot 3.3.5, Spring Data JPA, Hibernate, MS SQL Server
- **Frontend:** React, Vite, Axios, React Router DOM
- **Database:** MS SQL Server (`FUNewsManagementSBA301`)

## Cấu trúc dự án
- `backend/`: Mã nguồn Spring Boot RESTful API (Port 8080)
- `frontend/`: Mã nguồn ReactJS (Vite - Port 5173)
- `database/`: Script SQL khởi tạo cơ sở dữ liệu và dữ liệu mẫu

## Hướng dẫn cài đặt & khởi chạy
1. **Database:** Chạy script `database/Assignment02_FUNewsManagementSBA301.sql` trong SQL Server Management Studio (SSMS).
2. **Backend:** Cấu hình tài khoản sa / password trong `backend/src/main/resources/application.properties`, sau đó chạy:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
3. **Frontend:** Cài đặt dependencies và khởi chạy:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
