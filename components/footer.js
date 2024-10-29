import React from 'react';
import Image from 'next/image';
import styles from "../styles/footer.module.css"; 

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
        <div className={styles.col1}>
            <div>
            <a href='https://www.instagram.com/kwong_ngai_malaysia'>
            <Image 
            src="/instagram.png" 
            width={30} 
            height={30} 
            alt="instagram" />
            </a>
            </div>
            <div>
            <a href='https://www.facebook.com/Kwongngailiondance/'>
                <Image 
                src="/facebook.png" 
                width={30} 
                height={30} 
                alt="facebook" />
                </a>
            </div>
            <div>
            <a href='mailto:clmt.tan@yahoo.com'>
                <Image 
                src="/email.png" 
                width={40} 
                height={40} 
                alt="email" />
                </a>
            </div>   
        </div>  
        <div className={styles.col2}>
            Copyright © 2024 @I_Innovators0
        </div>   
    </div>
  );
};

export default Footer;
