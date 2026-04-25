import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import style from "./rsa.module.css";
const RSA = () => {
  const navigate = useNavigate();
  const [openOutputFormat, setOpenOutputFormat] = useState(false);
  const [valueOutputFormat, setValueOutputFormat] = useState("Hexadecimal");
  const [openEnDe, setOpenEnDe] = useState(false);
  const [valueEnDe, setValueEnDe] = useState("Encrypt");
  return (
    <div className={style.background}>
      <h1 className={style.title}>RSA Cipher</h1>
      <div className={style.section}>
        <h2 className={style.sectionTitle}>1. Generate Key</h2>

        <div className={style.cover}>
          <div className={style.left}>
            <input
              type="number"
              placeholder="Enter prime p"
              className={style.input}
            />
          </div>

          <div className={style.middle}>
            <input
              type="number"
              placeholder="Enter prime q"
              className={style.input}
            />
          </div>

          <div className={style.right}>
            <button className={style.button}>Generate RSA Keys</button>
          </div>
        </div>

        <div className={style.cover}>
          <div className={style.left}>
            <input type="number" placeholder="N" className={style.input} />
          </div>

          <div className={style.middle}>
            <input type="number" placeholder="E" className={style.input} />
          </div>

          <div className={style.right}>
            <input type="number" placeholder="D" className={style.input} />
          </div>
        </div>
      </div>
      <div className={style.section}>
        <h2 className={style.sectionTitle}>2. Encrypt/Decrypt</h2>
        <div className={style.cover}>
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
                  <div
                    onClick={() => {
                      setValueOutputFormat("Hexadecimal");
                      setOpen(false);
                    }}
                  >
                    Hexadecimal
                  </div>
                  <div
                    onClick={() => {
                      setValueOutputFormat("Decimal");
                      setOpen(false);
                    }}
                  >
                    Decimal
                  </div>
                  <div
                    onClick={() => {
                      setValueOutputFormat("Both");
                      setOpen(false);
                    }}
                  >
                    Both
                  </div>
                </div>
              )}
            </div>
          </div>
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
                  <div
                    onClick={() => {
                      setValueEnDe("Encrypt");
                      setOpen(false);
                    }}
                  >
                    Encrypt
                  </div>
                  <div
                    onClick={() => {
                      setValueEnDe("Decrypt");
                      setOpen(false);
                    }}
                  >
                    Decrypt
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={style.right}>
            <button className={style.button}>Submit</button>
          </div>
        </div>
        <div className={style.cover}>
          <div className={style.left}>
            <textarea
              type="text"
              placeholder="Enter text to encrypt/decrypt"
              className={style.textarea}
            />
          </div>
          <div className={style.right}>
            <textarea
              type="text"
              placeholder="Result will be shown here"
              className={style.textarea}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSA;
