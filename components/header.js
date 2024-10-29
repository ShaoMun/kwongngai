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

  // Function to handle routing
  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <div className={styles.headerContainer}>
      <div onClick={() => navigateTo('/')} className={isActiveLink('/') ? styles.active : ''}>
        <Image src="/KWONGNGAI.png" width={50} height={50} alt="Logo" />
      </div>
      <div onClick={() => navigateTo('/')} className={isActiveLink('/') ? styles.active : ''}>
        主页
      </div>
      <div onClick={() => navigateTo('/table')} className={isActiveLink('/table') ? styles.active : ''}>
        桌位查询
      </div>
      <div onClick={() => navigateTo('/schedule')} className={isActiveLink('/schedule') ? styles.active : ''}>
        节目流程
      </div>
      <div onClick={() => navigateTo('/achievement')} className={isActiveLink('/achievement') ? styles.active : ''}>
        荣誉榜
      </div>
    </div>
  );
};

export default Header;
