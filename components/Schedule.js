import React from 'react';
import styles from '../styles/schedule.module.css';

const Schedule = () => {
  const schedule = [
    { time: '7.00pm', description: '嘉宾入席' },
    { time: '7.30pm', description: '奏国歌' },
    { time: '7.40pm', description: '花式擂鼓表演 (马来西亚)' },
    { time: '8.00pm', description: '马来西亚全国龙狮总会会长-拿督林顺成致开幕词' },
    { time: '8.10pm', description: '马来西亚光艺龙狮体育会创办人兼团长-陈其文师傅致词' },
    { time: '8.20pm', description: '双狮高桩表演 (马来西亚)' },
    {time: '8.40pm',description: '鸣锣仪式' },
    { time: '9.00pm', description: '竞技龙表演 (越南)' },
    { time: '9.15pm', description: '颁发荣誉人纪念品' },
    { time: '9.35pm', description: '花式擂鼓表演 (越南)' },
    { time: '9.50pm', description: '夜光龙表演 (柔佛)' },
    { time: '10.00pm', description: '夜光狮高桩表演 (马来西亚 + 越南)' },
    { time: '10.15pm', description: '颁发纪念品给出席队伍' },
  ];

  return (
    <div className={styles.container}>

      <div className={styles.tableContainer}>
        {/* Table Header */}
        <div className={styles.header}>
          <span>时间</span>
          <span>活动内容</span>
        </div>

        {/* Table Rows */}
        {schedule.map((item, index) => (
          <div key={index} className={styles.row}>
            <span className={styles.time}>{item.time}</span>
            <span className={styles.description}>{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
