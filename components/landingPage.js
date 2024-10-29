import styles from '../styles/landingPage.module.css';
import AnimatedBackground from './animatedBackground';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/router';

const LandingPage = () => {
  const router = useRouter();
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const thumbnails = [
    { src: "/thumbnail1.jpeg", description: "第十二届云顶世界狮王争霸战 2016", link: "https://www.youtube.com/watch?v=QPMZQj9LnOc" },
    { src: "/thumbnail2.jpeg", description: "武林群英会", link: "" },
    { src: "/thumbnail3.jpeg", description: "香港鱷魚恤世界夜光龍醒獅大賽 2018", link: "https://www.youtube.com/watch?v=cjmRPUV_MDE" },
    { src: "/thumbnail4.jpeg", description: "2014年香港世界夜光龙•醒狮锦标赛", link: "https://www.youtube.com/watch?v=d5-sfHjchsg" },
    { src: "/thumbnail5.jpeg", description: "2014年美高梅狮王争霸-澳门国际邀请赛", link: "https://www.youtube.com/watch?v=yU8oR-WM66w" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.3 }
    );

    // Copy ref values to local variables
    const section1El = section1Ref.current;
    const section2El = section2Ref.current;
    const section3El = section3Ref.current;

    if (section1El) observer.observe(section1El);
    if (section2El) observer.observe(section2El);
    if (section3El) observer.observe(section3El);

    return () => {
      if (section1El) observer.unobserve(section1El);
      if (section2El) observer.unobserve(section2El);
      if (section3El) observer.unobserve(section3El);
    };
  }, []);

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    setActiveSlide((prev) => (prev === 0 ? thumbnails.length - 1 : prev - 1));

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    setActiveSlide((prev) => (prev === thumbnails.length - 1 ? 0 : prev + 1));

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const getVisibleImages = () => {
    const result = [];
    const length = thumbnails.length;

    for (let i = -2; i <= 2; i++) {
      let index = (activeSlide + i + length) % length;
      result.push({
        ...thumbnails[index],
        index: index,
        position: i
      });
    }
    return result;
  };

  return (
    <div className={styles.landingContainer}>
      <div ref={section1Ref} className={`${styles.section1} section`}>
        <AnimatedBackground />
        <div>
          <Image
            src="/KWONGNGAI.png"
            width={300}
            height={300}
            alt="KWONG NGAI Logo"
          />
        </div>
        <div>
          <h1>
            马来西亚光藝龍獅體育會<br /><span>二十二週年</span>暨籌募活動基金晚宴
          </h1>
        </div>
      </div>

      <div ref={section2Ref} className={`${styles.section2} section`}>
        <AnimatedBackground />
        <div>
          <h2>全球伙伴心相连，共同目标向前跃</h2>
        </div>
        <div className={styles.mapContainer}>
          <Image
            src="/worldmap.png"
            width={400}
            height={300}
            alt="World Map"
          />
        </div>
        <div>
          <p>我们在全球各地广泛结交朋友，
            致力于弘扬传统文化。目前，在印度尼西亚、新加坡，以及马来西亚的柔佛州都设有分会。
            这些分会不仅为当地社群带来精彩的舞狮表演，还提供培训与交流的机会，让更多人能够了解并传承舞狮艺术。
            通过跨国的分会网络，我们在世界各地推广中华传统文化，团结有志之士，共同朝着弘扬与发扬舞狮艺术的目标前进</p>
        </div>
      </div>

      <div ref={section3Ref} className={`${styles.section3} section`}>
        <AnimatedBackground />
        <div>
          <h2>获奖无数荣耀添，实力见证誉非凡</h2>
        </div>
        <div className={styles.sliderContainer}>
          <button
            className={`${styles.sliderButton} ${styles.prevButton}`}
            onClick={handlePrevious}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          <div className={styles.slider}>
            {getVisibleImages().map(({ src, description, link, index, position }) => (
              <div
                key={index}
                className={`${styles.imageWrapper} ${position === 0 ? styles.active : ''}`}
                style={{
                  '--position': position,
                }}
              >
                {link ? (
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    <Image src={src} width={200} height={200} alt={`Thumbnail ${index + 1}`} />
                    {position === 0 && (
                      <p className={styles.description}>{description}</p>
                    )}
                  </a>
                ) : (
                  <>
                    <Image src={src} width={200} height={200} alt={`Thumbnail ${index + 1}`} />
                    {position === 0 && (
                      <p className={styles.description}>{description}</p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          <button
            className={`${styles.sliderButton} ${styles.nextButton}`}
            onClick={handleNext}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <div>
          <p className={styles.sec3Text}>我们收获了全国乃至全世界大大小小的奖项，每一个奖项都是对我们努力的肯定，也是我们团队实力的最佳见证。
            通过一次次的比赛，我们不仅展示了精湛的舞狮技艺，也赢得了各地观众的赞誉与尊重。</p>
        </div>
        <div>
          <button
            className={styles.moreButton}
            onClick={() => router.push('/achievement')}
          >
            了解更多
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
