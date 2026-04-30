import { useState } from "react";
import style from "./playfair.module.css";
import BackButton from "../../components/BackButton";
import {
  encryptPlayfair,
  decryptPlayfair,
} from "../../services/playfairService";

const Playfair = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Encrypt");

  // 1. Thêm các State để lưu trữ dữ liệu người dùng nhập
  const [inputText, setInputText] = useState("");
  const [keyInput, setKeyInput] = useState("");
  const [outputText, setOutputText] = useState("");

  // 2. Hàm xử lý gửi dữ liệu xuống Backend
  const handleSubmit = async () => {
    if (!inputText || !keyInput) {
      alert("Vui lòng nhập đầy đủ văn bản và khóa (key)!");
      return;
    }

    try {
      const isEncrypt = value === "Encrypt";

      let data;

      if (isEncrypt) {
        data = await encryptPlayfair({
          text: inputText,
          key: keyInput,
        });
      } else {
        data = await decryptPlayfair({
          text: inputText,
          key: keyInput,
        });
      }

      setOutputText(data.result);
    } catch (error) {
      console.error(error);
      alert("Không thể kết nối Backend!");
    }
  };

  return (
    <div className={style.background}>
      <BackButton />
      <h1 className={style.title}>Playfair Cipher</h1>

      {/* Input */}
      <div className={style.section}>
        <h2 className={style.sectionTitle}>1. Input</h2>

        <div className={style.cover}>
          <div className={style.left}>
            {/* Ô nhập input text */}
            <textarea
              placeholder="Enter text to encrypt/decrypt"
              className={style.textarea}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
        </div>

        <div className={style.cover}>
          <div className={style.left}>
            {/* Ô nhập input key */}
            <input
              type="text"
              placeholder="Enter key"
              className={style.input}
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
            />
          </div>

          <div className={style.right}>
            {/* Ô chọn Encrypt/Decrypt */}
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

        <div className={style.cover}>
          <div className={style.left}></div>
          <div className={style.right}>
            <button className={style.button} onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Output*/}
      <div className={style.section}>
        <h2 className={style.sectionTitle}>2. Result</h2>

        <div className={style.cover}>
          <div className={style.left}>
            <textarea
              placeholder="Result will be shown here"
              className={style.textarea}
              value={outputText}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playfair;
