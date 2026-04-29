import { useState } from "react";
import style from "./playfair.module.css";

const Playfair = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Encrypt");

  // 1. Thêm các State để lưu trữ dữ liệu người dùng nhập
  const [inputText, setInputText] = useState("");
  const [keyInput, setKeyInput] = useState("");
  const [outputText, setOutputText] = useState("");

  // 2. Hàm xử lý gửi dữ liệu xuống Backend
  const handleSubmit = async () => {
    // Kiểm tra xem người dùng đã nhập đủ chưa
    if (!inputText || !keyInput) {
      alert("Vui lòng nhập đầy đủ văn bản và khóa (key)!");
      return;
    }

    try {
      // Dựa vào Dropdown để quyết định gọi API mã hóa hay giải mã
      const endpoint = value === "Encrypt" ? "/encrypt" : "/decrypt";
      
      const response = await fetch(`http://localhost:8000/api/playfair${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Gửi dữ liệu theo đúng chuẩn Pydantic Model bên Backend
        body: JSON.stringify({ 
          text: inputText, 
          key: keyInput 
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        // In kết quả ra ô output
        setOutputText(data.result);
      } else {
        alert("Lỗi từ Backend: " + data.detail);
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Không thể kết nối đến Backend. Đảm bảo Backend đang chạy!");
    }
  };

  return (
    <div className={style.background}>
      <h1 className={style.title}>Playfair Cipher</h1>
      
      {/* Ô nhập Text (Đã gắn state) */}
      <textarea
        type="text"
        placeholder="Enter text to encrypt/decrypt"
        className={style.textarea}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      
      <div className={style.middle}>
        <div className={style.left}>
          {/* Ô nhập Key (Đã gắn state) */}
          <input 
            type="text" 
            placeholder="Enter key" 
            className={style.input} 
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
          />
        </div>
        
        <div className={style.right}>
          <div className={style.dropdown}>
            <div className={style.selected} onClick={() => setOpen(!open)}>
              {value}
            </div>

            {open && (
              <div className={style.menu}>
                <div
                  onClick={() => {
                    setValue("Encrypt");
                    setOpen(false);
                  }}
                >
                  Encrypt
                </div>
                <div
                  onClick={() => {
                    setValue("Decrypt");
                    setOpen(false);
                  }}
                >
                  Decrypt
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Nút Submit (Đã gắn hàm handleSubmit) */}
      <button className={style.button} onClick={handleSubmit}>
        Submit
      </button>
      
      {/* Ô hiển thị kết quả (Đã gắn state outputText) */}
      <textarea
        type="text"
        placeholder="Result will be shown here"
        className={style.output}
        value={outputText}
        readOnly
      />
    </div>
  );
};

export default Playfair;