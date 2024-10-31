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
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);
  const section6Ref = useRef(null);
  const section7Ref = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const thumbnails = [
    { src: "/thumbnail1.jpeg", description: "第十二届云顶世界狮王争霸战 2016", link: "https://www.youtube.com/watch?v=QPMZQj9LnOc" },
    { src: "/thumbnail2.jpeg", description: "武林群英会", link: "" },
    { src: "/thumbnail3.jpeg", description: "香港鱷魚恤世界夜光龍醒獅大賽 2018", link: "https://www.youtube.com/watch?v=cjmRPUV_MDE" },
    { src: "/thumbnail4.jpeg", description: "2014年香港世界夜光龙•醒狮锦标赛", link: "https://www.youtube.com/watch?v=d5-sfHjchsg" },
    { src: "/thumbnail5.jpeg", description: "2014年美高梅狮王争霸-澳门国际邀请赛", link: "https://www.youtube.com/watch?v=yU8oR-WM66w" }
  ];

  const honorees = [
    "Dato Martin林顺成", "Datuk许振端医生", "Dato 林昇伦", "杨庆权BKT", 
    "Kevin Tann 陈俊杰先生", "戴钟德先生", "Seventiar A/L Anthony", 
    "食为天海鲜酒家", "香港邓肇伦师傅", "澳州Willis Koh", "澳洲荣威企业", 
    "越南老板", "高安定先生", "Heng Yup Metal S/B", "Chris"
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
    const sectionRefs = [section1Ref, section2Ref, section3Ref, section4Ref, section5Ref, section6Ref, section7Ref];

    // Observe each section
    sectionRefs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      // Unobserve each section
      sectionRefs.forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveSlide((prev) => (prev === 0 ? thumbnails.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveSlide((prev) => (prev === thumbnails.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
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

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={styles.landingContainer}>
      {/* Sections 1, 2, and 3 */}
      <div ref={section1Ref} className={`${styles.section1} section`}>
        <AnimatedBackground />
        <Image src="/KWONGNGAI.png" width={300} height={300} alt="KWONG NGAI Logo" />
        <h1>马来西亚光藝龍獅體育會<br /><span>二十二週年</span>暨籌募活動基金晚宴</h1>
      </div>
      <div ref={section2Ref} className={`${styles.section2} section`}>
        <AnimatedBackground />
        <h2>全球伙伴心相连，共同目标向前跃</h2>
        <div className={styles.mapContainer}>
          <Image src="/worldmap.png" width={400} height={300} alt="World Map" />
        </div>
        <p>我们在全球各地广泛结交朋友，
            致力于弘扬传统文化。目前，在印度尼西亚、新加坡，以及马来西亚的柔佛州都设有分会。
            这些分会不仅为当地社群带来精彩的舞狮表演，还提供培训与交流的机会，让更多人能够了解并传承舞狮艺术。
            通过跨国的分会网络，我们在世界各地推广中华传统文化，团结有志之士，共同朝着弘扬与发扬舞狮艺术的目标前进</p>
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

      {/* Sections 4, 5, 6, and Infinite Slider */}
      <div ref={section4Ref} className={`${styles.section4} section`}>
        <AnimatedBackground />
        <h1>特别鸣谢</h1>
        <h3>The Grand Ho Tram</h3>
        <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
      <iframe 
        src="https://player.vimeo.com/video/1024647507?autoplay=1&muted=1&loop=1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" 
        frameBorder="0" 
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write" 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        title="2 _MASTER_Long version (with super)"
      ></iframe>
    </div>


      </div>
      <div ref={section5Ref} className={`${styles.section5} section`}>
        <AnimatedBackground />
        <h3>JNJ Film Production</h3>
        <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
      <iframe 
        src="https://player.vimeo.com/video/1024647743?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" 
        frameBorder="0" 
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write" 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        title="2 _MASTER_Long version (with super)"
      ></iframe>
    </div>

      </div>
      <div ref={section6Ref} className={`${styles.section6} section`}>
        <AnimatedBackground />
        <h2>荣誉顾问</h2>
        <div className={styles.twoColumnContainer}>
        <div className={styles.column1}>
      <h3>永久荣誉会长:</h3>
      <p>罗诘粦先生 & 谢妙莊女士</p>
      <h3>荣誉会长:</h3>
      <p>Sevenstiar A/L Antony</p>
      <h3>荣誉顾问:</h3>
      <p>拿督林亚财局绅</p>
      <p>拿督林昇伦</p>
      <p>戴钟德先生</p>
      <p>陈俊杰先生</p>
      <p>高 再送先生</p>
      <h3>医药顾问:</h3>
      <p>拿督许振端医生</p>
      <h3>铁打顾问:</h3>
      <p>拿督梁润江博士</p>
    </div>
    <div className={styles.column2}>   
      <h3>法律顾问:</h3>
      <p>YB林立迎律师</p> 
      <h3>狮艺顾问:</h3>
      <p>许国雄师傅</p>
      <h3>海外荣誉会长:</h3>
      <p>郭木徳先生</p>
      <h3>海外荣誉顾问:</h3>
      <p>郑治勇先生</p>
      <p>程文强先生</p>
      <h3>海外龙艺顾问:</h3>
      <p>易荣源师傅</p>
      <h3>海外狮艺顾问:</h3>
      <p>邓肇伦师傅</p>
      <p>覃来长师傅</p>
      <p>李润福师傅</p>
      <p>潘敬文师傅</p>
      <p>罗振光师傅</p>
    </div>
        </div>
      </div>
      <div ref={section7Ref} className={styles.infiniteSlider}>
        <h2>鸣锣人</h2>
        <div className={styles.sliderContent}>
          {honorees.map((honoree, index) => (
            <div key={index} className={styles.sliderItem}>{honoree}</div>
          ))}
          {honorees.map((honoree, index) => (
            <div key={index} className={styles.sliderItem}>{honoree}</div>
          ))}
          {honorees.map((honoree, index) => (
            <div key={index} className={styles.sliderItem}>{honoree}</div>
          ))}
          {honorees.map((honoree, index) => (
            <div key={index} className={styles.sliderItem}>{honoree}</div>
          ))}
          {honorees.map((honoree, index) => (
            <div key={index} className={styles.sliderItem}>{honoree}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
