import React from 'react';
import Image from 'next/image';
import styles from "../styles/footer.module.css"; 
import Link from 'next/link';

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.col1}>
        <div>
          <Link href='https://www.instagram.com/kwong_ngai_malaysia' passHref>
            <Image 
              src="/instagram.png" 
              width={30} 
              height={30} 
              alt="instagram" 
            />
          </Link>
        </div>
        
        <div>
          <Link href='https://www.facebook.com/Kwongngailiondance/' passHref>
            <Image 
              src="/facebook.png" 
              width={30} 
              height={30} 
              alt="facebook" 
            />
          </Link>
        </div>
        
        <div>
          <Link href='mailto:clmt.tan@yahoo.com' passHref>
            <Image 
              src="/email.png" 
              width={40} 
              height={40} 
              alt="email" 
            />
          </Link>
        </div>
      </div>
      
      <div className={styles.col2}>
        Copyright © 2024 @I_Innovators0
      </div>
    </div>
  );
};

export default Footer;
