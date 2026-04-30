# TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN
## KHOA MẠNG MÁY TÍNH VÀ TRUYỀN THÔNG DỮ LIỆU
---
# ĐỒ ÁN MÔN HỌC: AN TOÀN MẠNG MÁY TÍNH (NT101)
### ĐỀ TÀI: XÂY DỰNG ỨNG DỤNG MÔ PHỎNG THUẬT TOÁN MẬT MÃ (PLAYFAIR & RSA)

## Thông tin môn học và nhóm thực hiện
- **Môn học:** An toàn mạng máy tính
- **Mã lớp:** NT101.Q21
- **Giảng viên hướng dẫn:** Tô Nguyễn Nhật Quang
- **Nhóm:** Nhóm 3

| STT | Họ và Tên | MSSV | Vai trò chính |
|-----|-----------|------|---------------|
| 1   | Trần Lê Uyên Thy | 23521564 | Nhóm trưởng, Phát triển Frontend & UI |
| 2   | Lê Trung Kiên | 23520797 | Phát triển Backend (Thuật toán RSA) |
| 3   | Nguyễn Quang Thế Anh | 24520115 | Phát triển Backend (Thuật toán Playfair) |

---

## Mục tiêu đồ án
Đồ án được thực hiện nhằm giải quyết các mục tiêu chính sau:
1. **Nghiên cứu lý thuyết**: Tìm hiểu sâu về cơ chế hoạt động của mật mã đối xứng (Playfair) và mật mã bất đối xứng (RSA).
2. **Triển khai thực tiễn**: Xây dựng hệ thống phần mềm có khả năng mã hóa và giải mã dữ liệu chính xác theo các chuẩn toán học.
3. **Trực quan hóa**: Tạo giao diện người dùng thân thiện để minh họa các bước biến đổi dữ liệu, giúp sinh viên và người nghiên cứu dễ dàng tiếp cận kiến thức.

---

## Phân tích kỹ thuật các thuật toán

### 1. Mật mã Playfair (Symmetric Key)
Playfair là một kỹ thuật mã hóa thay thế đa chữ cái, sử dụng ma trận ký tự 5x5.
- **Cơ chế**: Thuật toán nhóm văn bản thành từng cặp ký tự (digraphs). Nếu hai ký tự giống nhau hoặc văn bản lẻ, hệ thống tự động chèn ký tự đệm (`X`/`Y`). Các quy tắc về hàng, cột và hình chữ nhật được áp dụng nghiêm ngặt để đảm bảo tính duy nhất của bản mã.
- **Tính học thuật**: Giúp hiểu về khái niệm "Confusion" (làm nhiễu) trong mật mã học cổ điển thông qua việc thay đổi mối liên hệ giữa bản rõ và bản mã.

### 2. Thuật toán RSA (Asymmetric Key)
RSA đại diện cho mật mã học hiện đại, dựa trên bài toán phân tích thừa số nguyên tố.
- **Quy trình triển khai**:
    - **Khởi tạo**: Chọn $p, q$ là các số nguyên tố lớn. Tính $n = p \times q$ và $\phi(n) = (p-1)(q-1)$.
    - **Khóa công khai (e)**: Chọn $e$ sao cho $1 < e < \phi(n)$ và $gcd(e, \phi(n)) = 1$.
    - **Khóa bí mật (d)**: Tìm $d$ là nghịch đảo modulo của $e$ theo $\phi(n)$.
- **Đặc điểm**: Cho phép truyền thông tin bảo mật mà không cần chia sẻ trước khóa bí mật, giải quyết bài toán phân phối khóa trong an toàn mạng.

---

## Công nghệ sử dụng

Dự án sử dụng các công nghệ sau:
- **Backend**: **FastAPI (Python)** - Xây dựng các API xử lý thuật toán mã hóa.
- **Frontend**: **React.js (Vite)** - Xây dựng giao diện tương tác người dùng.
- **Styling**: **Tailwind CSS** - Thiết kế và trình bày giao diện.

---

## Cấu trúc dự án

```text
.
├── be-app/              # Xử lý logic và API Backend
│   ├── main.py          # Cấu hình server và endpoints
│   ├── routers/         # Điều hướng yêu cầu cho RSA và Playfair
│   ├── services/        # Thư viện core xử lý mã hóa
│   └── requirements.txt # Thư viện Python cần thiết
├── fe-app/              # Giao diện người dùng (React)
│   ├── src/             # Source code React (Components, Pages, Services, Router)
│   ├── index.html       # Entry point
│   ├── .env             # Cấu hình môi trường (cần tạo thủ công)
│   └── package.json     # Quản lý dependencies
└── README.md            # Báo cáo hướng dẫn dự án
```

---

## Hướng dẫn cài đặt và chạy dự án

### Yêu cầu hệ thống
Trước khi cài đặt, hãy đảm bảo máy tính đã cài đặt các công cụ sau:
- **Python** (v3.11): [Tải tại đây](https://www.python.org/downloads/)
- **Node.js** (v18.0 trở lên): [Tải tại đây](https://nodejs.org/)
- **Git**: [Tải tại đây](https://git-scm.com/downloads)

### 1. Chuẩn bị
```bash
git clone https://github.com/NT101-Q21/NT101.Q21_Project.git
cd NT101.Q21_Project
```

### 2. Khởi chạy Backend
```bash
cd be-app
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Khởi chạy Frontend
```bash
cd fe-app
```
*   Tạo file `.env` tại thư mục `fe-app/` với nội dung:
    ```text
    VITE_API_URL=http://localhost:8000
    ```
*   Cài đặt và khởi chạy:
```bash
npm install
npm run dev
```

---

## Địa chỉ truy cập ứng dụng

Sau khi khởi chạy thành công cả Backend và Frontend, truy cập dự án tại các địa chỉ sau:

- **Giao diện người dùng (Frontend)**: [http://localhost:5173](http://localhost:5173)
- **Hệ thống API (Backend)**: [http://localhost:8000](http://localhost:8000)
- **Tài liệu API (Swagger UI)**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## Kết luận và Hướng phát triển
Đồ án đã hoàn thành các yêu cầu cơ bản của môn học An toàn mạng máy tính. Nhóm dự kiến sẽ tích hợp thêm các thuật toán băm (MD5, SHA) và giao thức SSL/TLS đơn giản để mở rộng phạm vi nghiên cứu trong các giai đoạn tiếp theo.

---
*Dự án được thực hiện bởi Nhóm sinh viên lớp NT101.Q21 - Khoa Mạng máy tính và Truyền thông dữ liệu.*