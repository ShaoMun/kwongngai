'use client'

import React, { useEffect, useRef, useState } from 'react';
import Trophy from './trophy';
import styles from "../styles/achievement.module.css";
import Image from 'next/image';

const Achievement = () => {
  const [achievementsData, setAchievementsData] = useState(null);
  const containerRef = useRef(null);
  const [showTopButton, setShowTopButton] = useState(false);
  const lastVisible = useRef(null);

  // Dynamically load the JSON data on the client side
  useEffect(() => {
    const loadAchievements = async () => {
      const data = await import('../public/achievements.json');
      setAchievementsData(data.default.achievements);
    };
    loadAchievements();
  }, []);

  useEffect(() => {
    if (!achievementsData) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (lastVisible.current && lastVisible.current !== entry.target) {
                lastVisible.current.classList.remove(styles.visible);
              }
              entry.target.classList.add(styles.visible);
              lastVisible.current = entry.target;
          }
        });
      },
      { threshold: 0.5 }
    );

    const elements = containerRef.current.querySelectorAll(`.${styles.leftCol}, .${styles.rightCol}`);
    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, [achievementsData]);

  // Handle scroll to toggle "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!achievementsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container} ref={containerRef}>
      {/* Trophy Component */}
      <Trophy />
        <div className={styles.achievementTitle}>馬來西亞光藝龍獅體育會<br/><span>荣誉榜</span></div>
      {/* Achievement List */}
      <div className={styles.achievementsList}>
        {achievementsData.map((achievement, index) => (
          <div
            key={achievement.year}
            className={`${index % 2 === 0 ? styles.leftCol : styles.rightCol} ${styles.hidden}`}
          >
            <h1>{achievement.year}</h1>
            <ul>
              {achievement.achievements.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Back to Top Button */}
      {showTopButton && (
        <button className={styles.topButton} onClick={scrollToTop}>
          <Image
          src={'/arrow-up.png'}
          width={33}
          height={29}
          alt='arrow-top'
          />
        </button>
      )}
    </div>
  );
};

export default Achievement;