import { useState } from "react";
import style from "./rsa.module.css";
import BackButton from "../../components/BackButton";
import { generateRSAKeys, encryptRSA, decryptRSA } from "../../services/rsaService";

const RSA = () => {
  // Trạng thái cho Dropdown
  const [openOutputFormat, setOpenOutputFormat] = useState(false);
  const [valueOutputFormat, setValueOutputFormat] = useState("Hexadecimal");
  const [openEnDe, setOpenEnDe] = useState(false);
  const [valueEnDe, setValueEnDe] = useState("Encrypt");

  // Trạng thái cho Form Inputs
  const [p, setP] = useState("");
  const [q, setQ] = useState("");
  const [n, setN] = useState("");
  const [eKey, setEKey] = useState("");
  const [dKey, setDKey] = useState("");
  
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  // Hàm gọi API tạo Key
  const handleGenerateKeys = async () => {
    if (!p || !q) {
      alert("Vui lòng nhập số nguyên tố P và Q!");
      return;
    }

    try {
      const data = await generateRSAKeys(p, q);

      setN(data.n);
      setEKey(data.e);
      setDKey(data.d);
    } catch (error) {
      console.error(error);
      alert("Không thể kết nối Backend!");
    }
  };

  // Hàm gọi API Mã hóa / Giải mã
  const handleSubmit = async () => {
  if (!inputText || !n) {
    alert("Vui lòng nhập văn bản và tạo Key!");
    return;
  }

  try {
    const isEncrypt = valueEnDe === "Encrypt";

    let data;

    if (isEncrypt) {
      data = await encryptRSA({
        text: inputText,
        e: eKey,
        n: n,
        output_format: valueOutputFormat,
      });
    } else {
      data = await decryptRSA({
        text: inputText,
        d: dKey,
        n: n,
        input_format: valueOutputFormat,
      });
    }

    setOutputText(data.result);
  } catch (error) {
    console.error(error);
    alert("Lỗi khi gọi API!");
  }
};

  return (
    <div className={style.background}>
      <BackButton />
      <h1 className={style.title}>RSA Cipher</h1>
      
      {/* SECTION 1: GENERATE KEY */}
      <div className={style.section}>
        <h2 className={style.sectionTitle}>1. Generate Key</h2>

        <div className={style.cover}>
          <div className={style.left}>
            <input
              type="number"
              placeholder="Enter prime p (e.g. 61)"
              className={style.input}
              value={p}
              onChange={(e) => setP(e.target.value)}
            />
          </div>

          <div className={style.middle}>
            <input
              type="number"
              placeholder="Enter prime q (e.g. 53)"
              className={style.input}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <div className={style.right}>
            <button className={style.button} onClick={handleGenerateKeys}>
              Generate RSA Keys
            </button>
          </div>
        </div>

        <div className={style.cover}>
          <div className={style.left}>
            <input type="number" placeholder="N" className={style.input} value={n} readOnly />
          </div>
          <div className={style.middle}>
            <input type="number" placeholder="E" className={style.input} value={eKey} readOnly />
          </div>
          <div className={style.right}>
            <input type="number" placeholder="D" className={style.input} value={dKey} readOnly />
          </div>
        </div>
      </div>

      {/* SECTION 2: ENCRYPT / DECRYPT */}
      <div className={style.section}>
        <h2 className={style.sectionTitle}>2. Encrypt/Decrypt</h2>
        
        <div className={style.cover}>
          {/* Dropdown 1: Format */}
          <div className={style.left}>
            <div className={style.dropdown}>
              <div
                className={style.selected}
                onClick={() => setOpenOutputFormat(!openOutputFormat)}
              >
                {valueOutputFormat}
              </div>

              {openOutputFormat && (
                <div className={style.menu}>
                  {["Hexadecimal", "Decimal", "Both"].map((fmt) => (
                    <div
                      key={fmt}
                      onClick={() => {
                        setValueOutputFormat(fmt);
                        setOpenOutputFormat(false);
                      }}
                    >
                      {fmt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Dropdown 2: Encrypt/Decrypt */}
          <div className={style.middle}>
            <div className={style.dropdown}>
              <div
                className={style.selected}
                onClick={() => setOpenEnDe(!openEnDe)}
              >
                {valueEnDe}
              </div>

              {openEnDe && (
                <div className={style.menu}>
                  {["Encrypt", "Decrypt"].map((action) => (
                    <div
                      key={action}
                      onClick={() => {
                        setValueEnDe(action);
                        setOpenEnDe(false);
                      }}
                    >
                      {action}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={style.right}>
            <button className={style.button} onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>

        <div className={style.cover}>
          <div className={style.left}>
            <textarea
              type="text"
              placeholder="Enter text to encrypt/decrypt"
              className={style.textarea}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
          <div className={style.right}>
            <textarea
              type="text"
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

export default RSA;