import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from "../styles/header.module.css"; 

const Header = () => {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    // Set the current path on mount and when the route changes
    setCurrentPath(router.pathname);
  }, [router.pathname]);

  // Function to check if the link is active
  const isActiveLink = (path) => currentPath === path;

  return (
    <div className={styles.headerContainer}>
      <div>
        <a 
          href='/' 
          className={isActiveLink('/') ? styles.active : ''}
        >
          <Image src="/KWONGNGAI.png" width={50} height={50} alt="Logo" />
        </a>
      </div>
      <div>
        <a 
          href='/' 
          className={isActiveLink('/') ? styles.active : ''}
        >
          主页
        </a>
      </div>
      <div>
        <a 
          href='/table' 
          className={isActiveLink('/table') ? styles.active : ''}
        >
          桌位查询
        </a>
      </div>
      <div>
        <a 
          href='/schedule' 
          className={isActiveLink('/schedule') ? styles.active : ''}
        >
          节目流程
        </a>
      </div>
      <div>
        <a 
          href='/achievement' 
          className={isActiveLink('/achievement') ? styles.active : ''}
        >
          荣誉榜
        </a>
      </div>
    </div>
  );
};

export default Header;
