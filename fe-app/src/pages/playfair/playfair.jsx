import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import style from "./playfair.module.css";

const Playfair = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Encrypt");

  return (
    <div className={style.background}>
      <h1 className={style.title}>Playfair Cipher</h1>
      <textarea
        type="text"
        placeholder="Enter text to encrypt/decrypt"
        className={style.textarea}
      />
      <div className={style.middle}>
        <div className={style.left}>
          <input type="text" placeholder="Enter key" className={style.input} />
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
      <button className={style.button}>Submit</button>
      <textarea
        type="text"
        placeholder="Result will be shown here"
        className={style.output}
        readOnly
      />
    </div>
  );
};

export default Playfair;
