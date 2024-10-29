import React from 'react';
import Image from 'next/image';
import styles from "../styles/header.module.css"; // Importing as a CSS module

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div>
        <a href='/'><Image src="/KWONGNGAI.png" width={50} height={50} alt="Logo" /></a>
      </div>
      <div>
        <a href='/'>主页</a>
      </div>
      <div href='/table'>
        <a>桌位查询</a>
      </div>
      <div href=''>
        <a>节目流程</a>
      </div>
      <div>
        <a href='/achievement'>荣誉榜</a>
      </div>        
    </div>
  );
};

export default Header;
