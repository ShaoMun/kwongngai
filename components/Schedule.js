import React from 'react';

const Schedule = () => {
  const schedule = [
    { time: '7.00pm', description: '嘉宾入席' },
    { time: '7.30pm', description: '凓国歌' },
    { time: '7.40pm', description: '鼓艺表演 (马来西亚)' },
    { time: '8.00pm', description: '本会律师顾问-YB林立迎律师致开幕词' },
    { time: '8.20pm', description: '双狮高桩表演 (马来西亚)(越南)' },
    { time: '8.40pm', description: '鸣锣人' },
    { time: '9.00pm', description: '竞技龙表演 (越南)' },
    { time: '9.15pm', description: '颁发荣誉人纪念品' },
    { time: '9.35pm', description: '击鼓表演 (越南)' },
    { time: '9.50pm', description: '夜光龙表演 (柔佛)' },
    { time: '10.00pm', description: '夜光狮高桩表演 (马来西亚)' },
    { time: '10.15pm', description: '颁发纪念品给出席队伍' },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 mb-8 animate-fadeIn">
        马来西亚光艺龙狮体育会22周年筹募晚宴
      </h1>

      <div className="w-full max-w-md bg-white bg-opacity-80 rounded-lg shadow-lg p-4">
        {schedule.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 border-b border-gray-200 last:border-none space-x-6 animate-slideIn"
          >
            <span className="text-red-600 font-bold">{item.time}</span>
            <span className="text-gray-700 flex-grow">{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;