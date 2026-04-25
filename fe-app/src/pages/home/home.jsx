import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import style from "./home.module.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={style.background}>
      <div className={style.header}>
        <h1 className={style.title}>ENCRYPT ALGORITHMS</h1>
      </div>

      <div className={style.content}>
        <div className={style.left}>
          <h3 className={style.subtitle}>Explore the World of Encryption</h3>
          <p className={style.desc}>
            Welcome to our encryption algorithm website! This is a project of
            our group 04 from class NT101.Q21
          </p>
          <p className={style.desc}>Our members:</p>
          <p className={style.desc}>23521564 - Trần Lê Uyên Thy</p>
          <p className={style.desc}>23520797 - Lê Trung Kiên</p>
          <p className={style.desc}>24521xxx - Nguyễn Quang Thế Anh</p>
        </div>

        <div className={style.right}>
          <div className={style.glassBox}>
            <h3 className={style.boxTitle}>Choose Algorithm</h3>

            <button className={style.btn} onClick={() => navigate("/playfair")}>
              Playfair Cipher
            </button>

            <button className={style.btn} onClick={() => navigate("/rsa")}>
              RSA Encryption
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
