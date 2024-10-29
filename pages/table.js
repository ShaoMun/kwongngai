import React, { useState, useEffect } from 'react';

let guestList = [
    "狮总", "艺峰", "群乐", "南北龙狮总会", "周国庆先生", "李小萍", "仁哥", "威少", 
    "拿督林亚财", "李润福师傅", "台湾吕师傅", "新加坡威义", "澳洲振武馆", "新加坡腾勇",
    "Chris", "Michael-Leon Fuat Hardware", "Yit Meng ConstructionS/B", "马来西亚龙艺总会",
    "Benson", "玄艺", "良胜", "龙溪", "依约", "雪州加影忠威龙狮团", "Target Fashion",
    "Michael-Sonstar Engineering", "Michael-Ann Yak Siong Hardware", "陈世强", "彭荣光",
    "许国雄", "邓炳财", "林明国", "易荣源", "郑博元", "温健安", "印尼光艺", "BB", "Boy",
    "Ricky", "Jessie Ng", "食为天海鲜酒家", "Target Fashion-Vegetarian", "波德申龙艺龙狮协会",
    "柔佛居銮高峰龙狮体育会", "马六甲高峰龙狮体育会", "马六甲文威龙狮体育会", "Torres Family",
    "SevenB Auto S/B", "William Yaw", "Tuan Lim", "Leon", "Irene", "吉隆坡谊艺醒狮团",
    "吉隆坡仁威龙狮体育会", "甲洞国兴龙狮团", "雪兰莪八打灵公中校友会龙狮团", "Sun Ace Builder S/B",
    "高峰科技有限公司", "Lee Wai Weng Family", "Knight World RS", "马接巴鲁红新月会龙狮团",
    "耶耶亚哇洪仙大帝庙", "鳌峰宫体育会", "陈氏", "九洲", "卓越", "Mr Sew Kok Wah", "DnD",
    "JangYeou Family", "Aman Puri 逸富园", "帝华达拿督公庙", "Lilian Lee Mei Kuen",
    "马来西亚弘德龙狮总会", "巴生弘德", "十五碑弘德", "雪州士拉央弘德体育会", "Loyalzone Automobile S/B",
    "天灵宫龙狮体育会", "Weng Lee StainlessStain Engineering", "Darren Family", "Joey Family",
    "柔佛州江加蒲莱南华武术龙狮团", "柔佛古庙舞龙舞狮队", "柔佛州龙狮体育会", "柔佛巴株巴辖弘毅龙狮体育会",
    "Kevin & Julie (Allianz)", "金山殿", "1010", "黄老仙师慈孝庙", "甲洞弘德体育会", "梳邦弘德体育会",
    "新加坡艺威", "新加坡水莲宫", "吧口关圣宫", "雪隆雄威馆武术龙狮培训团", "Ms Foo", 
    "马来西亚群胜龙狮体育会", "马六甲文化", "三忠宫", "金凤山", "晏斗", "柔佛士乃文扬体育会",
    "柔佛关羽堂龙狮体育会", "槟城大山脚宏伟", "霆义龙狮团", "森美兰桂青", "居銮永安园", 
    "槟城宏冠", "加影育华", "三艺龙狮体育会", "雪州祥艺文化体育会", "吉打弘德", "鹤声",
    "冷甲弘德龙狮体育会", "安邦金英", "蒲种莲花宫", "文採", "兴阁", "南艺", "团卫", "岭南鹤艺",
    "东胜", "新洋", "灵圣宫", "庆同乐", "联善", "吉隆坡权艺", "白沙罗阮梁公圣佛庙", "制龙", 
    "世龙", "釬权", "敦辉", "龙威", "源林", "万挠玄龙体育会", "紫玄宫狮缘", "甲洞义肆", 
    "甲洞义南阁", "雪州万撓自由醒狮团", "胜威", "华体", "马六甲玄龙", "吉隆坡玄龙", "安邦玄龙",
    "雪隆炫武龙狮公会", "波德申凤山寺", "文丁军警", "北海同桥社", "振德", "安顺三民", 
    "巴生炫胜", "柔佛白鹤", "东甲", "建造行", "张仙华", "毅胜坊", "龙芯", "嘉应会馆", 
    "龙田", "UncleBen", "吉隆坡德胜龙狮团", "霹雳江沙腾艺文化艺术坊", "柔佛光艺", 
    "越南光艺", "吉隆坡光艺"
  ];

// Initial seat assignments - you can modify this data directly
const initialSeatAssignments = {
    "VIP 1" : [],
    "VIP 2" : [],
    "3": ["狮总","艺峰","群乐","南北龙狮总会"],
    "4": ["周国庆先生"],
    "5": ["李小萍","仁哥","威少","拿督林亚财"],
    "6": ["李润福师傅","台湾吕师傅","新加坡威义"],
    "7": ["澳洲振武馆","新加坡腾勇","Chris"],
    "8": ["Michael-Leon Fuat Hardware"],
    "9": ["TargetFashion-Yit Meng ConstructionS/B","Target Fashion"],
    "10": ["马来西亚龙艺总会","Benson"],
    "11": ["玄艺","良胜","龙溪","依约"],
    "12": ["雪州加影忠威龙狮团"],
    "13": ["Target Fashion"],
    "14": ["Target Fashion"],
    "15": ["Michael-Sonstar Engineering"],
    "16": ["Michael-Ann Yak Siong Hardware"],
    "17": ["陈世强", "彭荣光", "许国雄", "邓炳财", "林明国", "易荣源", "郑博元", "温健安"],
    "18": ["印尼光艺","BB"],
    "19": ["Boy","Ricky","Jessie Ng"],
    "20": ["Jessie Ng"],
    "21": ["食为天海鲜酒家"],
    "22": ["食为天海鲜酒家"],
    "23": ["Target Fashion-Vegetarian"],
    "24": ["Target Fashion-Vegetarian"],
    "25": ["波德申龙艺龙狮协会"],
    "26": ["柔佛居銮高峰龙狮体育会"],
    "27": ["马六甲高峰龙狮体育会"],
    "28": ["马六甲高峰龙狮体育会"],
    "29": ["Torres Family"],
    "30": ["SevenB Auto S/B"],
    "31": ["William Yaw"],
    "32": ["Tuan Lim", "Leon", "Irene"],
    "33": ["吉隆坡谊艺醒狮团"],
    "34": ["吉隆坡仁威龙狮体育会"],
    "35": ["甲洞国兴龙狮团"],
    "36": ["雪兰莪八打灵公中校友会龙狮团"],
    "37": ["Sun Ace Builder S/B"],
    "38": ["高峰科技有限公司"],
    "39": ["Lee Wai Weng Family"],
    "40": ["Knight World RS"],
    "41": ["马接巴鲁红新月会龙狮团"],
    "42": ["耶耶亚哇洪仙大帝庙","鳌峰宫体育会"],
    "43": ["陈氏","九洲","卓越"],
    "44": ["Mr Sew Kok Wah", "DnD"],
    "45": ["JangYeou Family"],
    "46": ["Aman Puri 逸富园"],
    "47": ["帝华达拿督公庙"],
    "48": ["Lilian Lee Mei Kuen"],
    "49": ["马来西亚弘德龙狮总会"],
    "50": ["巴生弘德","十五碑弘德"],
    "51": ["雪州士拉央弘德体育会"],
    "52": ["Loyalzone Automobile S/B"],
    "53": ["天灵宫龙狮体育会"],
    "54": ["Weng Lee StainlessStain Engineering"],
    "55": ["Darren Family"],
    "56": ["Joey Family"],
    "57": ["柔佛州江加蒲莱南华武术龙狮团"],
    "58": ["柔佛古庙舞龙舞狮队"],
    "59": ["柔佛州龙狮体育会"],
    "60": ["柔佛巴株巴辖弘毅龙狮体育会"],
    "61": ["Kevin & Julie (Allianz)"],
    "62": ["金山殿"],
    "63": ["1010", "黄老仙师慈孝庙"],
    "64": ["天灵宫龙狮体育会"],
    "65": ["甲洞弘德体育会"],
    "66": ["梳邦弘德体育会"],
    "67": ["新加坡艺威", "新加坡水莲宫", "吧口关圣宫"],
    "68": ["雪隆雄威馆武术龙狮培训团"],
    "69": ["Ms Foo"],
    "70": ["马来西亚群胜龙狮体育会"],
    "71": ["马六甲文化", "三忠宫", "金凤山", "晏斗"],
    "72": ["柔佛士乃文扬体育会"],
    "73": ["柔佛关羽堂龙狮体育会"],
    "74": ["槟城大山脚宏伟", "霆义龙狮团"],
    "75": ["森美兰桂青", "居銮永安园"],
    "76": ["槟城宏冠", "加影育华"],
    "77": ["三艺龙狮体育会"],
    "78": ["雪州祥艺文化体育会"],
    "79": ["吉打弘德", "鹤声"],
    "80": ["冷甲弘德龙狮体育会"],
    "81": ["安邦金英", "蒲种莲花宫"],
    "82": ["雪州祥艺文化体育会"],
    "83": ["文採", "兴阁", "南艺", "团卫", "岭南鹤艺"],
    "84": ["东胜", "新洋", "灵圣宫", "庆同乐", "联善"],
    "85": ["吉隆坡权艺", "白沙罗阮梁公圣佛庙"],
    "86": ["制龙", "世龙", "釬权", "敦辉", "龙威", "源林"],
    "87": ["万挠玄龙体育会"],
    "88": ["紫玄宫狮缘"],
    "89": ["甲洞义肆", "甲洞义南阁"],
    "90": ["雪州万撓自由醒狮团"],
    "91": ["胜威", "华体", "马六甲玄龙", "吉隆坡玄龙", "安邦玄龙"],
    "92": ["雪隆炫武龙狮公会"],
    "93": ["波德申凤山寺", "文丁军警"],
    "94": ["北海同桥社", "振德", "安顺三民", "巴生炫胜"],
    "95": ["柔佛白鹤", "东甲", "建造行", "张仙华"],
    "96": ["毅胜坊", "龙芯", "嘉应会馆", "龙田", "UncleBen"],
    "97": ["吉隆坡德胜龙狮团"],
    "98": ["霹雳江沙腾艺文化艺术坊"],
    "99": ["柔佛光艺"],
    "100": ["柔佛光艺"],
    "R1": ["越南光艺","吉隆坡光艺"],
    "R2": ["吉隆坡光艺","越南光艺"],
  };

const Seatings = () => {
  const [seatAssignments, setSeatAssignments] = useState(initialSeatAssignments);
  const [selectedGuest, setSelectedGuest] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGuests, setFilteredGuests] = useState(guestList);

  // Filter guests based on search term
  useEffect(() => {
    const filtered = guestList.filter(guest =>
      guest.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGuests(filtered);
  }, [searchTerm]);

  // Function to get guests for a specific seat
  const getGuestsForSeat = (seatNumber) => {
    return seatAssignments[seatNumber] || [];
  };

  // Function to check if seat should be highlighted
  const shouldHighlightSeat = (seatNumber) => {
    const guests = getGuestsForSeat(seatNumber);
    return guests.includes(selectedGuest);
  };

  const VIPSeat = ({ label }) => (
    <div className={`col-span-2 row-span-2 w-16 h-16 sm:w-24 sm:h-24 rounded-xl border-2 
      ${shouldHighlightSeat(label) 
        ? 'border-green-500 bg-green-100' 
        : 'border-yellow-400 bg-yellow-50'} 
      flex items-center justify-center text-base sm:text-lg font-bold relative`}>
      {label}
    </div>
  );

  const Seat = ({ number }) => (
    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 
      ${shouldHighlightSeat(number)
        ? 'border-green-500 bg-green-100'
        : 'border-gray-300'} 
      flex items-center justify-center text-xs sm:text-sm cursor-pointer hover:bg-blue-100 transition-colors relative`}>
      {number}
    </div>
  );

  return (
    <div className="max-w-full sm:max-w-4xl mx-auto p-4 sm:p-8">
      {/* Search Section */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            className="w-full p-2 border-2 border-gray-300 rounded-md mb-2"
            placeholder="Search guest..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto">
              {filteredGuests.map((guest, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedGuest(guest);
                    setSearchTerm('');
                  }}
                >
                  {guest}
                </div>
              ))}
            </div>
          )}
        </div>
        {selectedGuest && (
          <div className="text-sm text-gray-600">
            Selected guest: {selectedGuest}
            <button
              className="ml-2 px-2 py-1 text-xs bg-gray-200 rounded-md hover:bg-gray-300"
              onClick={() => setSelectedGuest('')}
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Stage */}
      <div className="w-full text-center mb-4 sm:mb-8">
        <div className="border-2 border-gray-300 p-2 sm:p-4 text-base sm:text-lg font-bold bg-gray-50">
          STAGE
        </div>
      </div>

      <div className="flex justify-between gap-2 sm:gap-4">
        {/* Left Section */}
        <div>
          {/* Top rows with VIP */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-4">
            <Seat number={3} />
            <Seat number={4} />
            <VIPSeat label="VIP 1" />
            <Seat number={9} />
            <Seat number={10} />
          </div>
          
          {/* Regular rows */}
          <div className="space-y-2 sm:space-y-4">
            <div className="flex gap-2 sm:gap-4"><Seat number={11} /><Seat number={12} /><Seat number={13} /><Seat number={14} /></div>
            <div className="flex gap-2 sm:gap-4"><Seat number={26} /><Seat number={25} /><Seat number={24} /><Seat number={23} /></div>
            <div className="flex gap-2 sm:gap-4"><Seat number={27} /><Seat number={28} /><Seat number={29} /><Seat number={30} /></div>
            <div className="flex gap-2 sm:gap-4"><Seat number={42} /><Seat number={41} /><Seat number={40} /><Seat number={39} /></div>
            <div className="flex gap-2 sm:gap-4"><Seat number={43} /><Seat number={44} /><Seat number={45} /><Seat number={46} /></div>
            <div className="flex gap-2 sm:gap-4"><Seat number={58} /><Seat number={57} /><Seat number={56} /><Seat number={55} /></div>
            <div className="flex gap-2 sm:gap-4"><Seat number={59} /><Seat number={60} /><Seat number={61} /><Seat number={62} /></div>
            <div className="flex gap-2 sm:gap-4"><Seat number={72} /><Seat number={71} /><Seat number={70} /><Seat number={69} /></div>
            <div className="flex gap-2 sm:gap-4"><Seat number={73} /><Seat number={74} /><Seat number={75} /><Seat number={76} /></div>
            <div className="flex gap-2 sm:gap-4"><Seat number={92} /><Seat number={91} /><Seat number={85} /><Seat number={84} /></div>
          </div>
        </div>

        {/* Right Section */}
        <div>
          {/* Top rows with VIP */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-4">
            <VIPSeat label="VIP 2" />
            <Seat number={5} />
            <Seat number={6} />
            <Seat number={7} />
            <Seat number={8} />
          </div>

          {/* Regular rows */}
          <div className="space-y-2 sm:space-y-4">
            <div className="flex gap-2 sm:gap-4"><Seat number={15} /><Seat number={16} /><Seat number={17} /><Seat number={18} /></div>
            <div className="flex gap-2 sm:gap-4"><Seat number={22} /><Seat number={21} /><Seat number={20} /><Seat number={19} /></div>
            <div className="flex gap-2 sm:gap-4"><Seat number={31} /><Seat number={32} /><Seat number={33} /><Seat number={34} /></div>
            <div className="flex gap-2 sm:gap-4"><Seat number={38} /><Seat number={37} /><Seat number={36} /><Seat number={35} /></div>
            <div className="flex gap-2 sm:gap-4"><Seat number={47} /><Seat number={48} /><Seat number={49} /><Seat number={50} /></div>
            <div className="flex gap-2 sm:gap-4"><Seat number={54} /><Seat number={53} /><Seat number={52} /><Seat number={51} /></div>
            <div className="flex gap-2 sm:gap-4"><Seat number={63} /><Seat number={64} /><Seat number={65} /></div>
            <div className="flex gap-2 sm:gap-4"><Seat number={68} /><Seat number={67} /><Seat number={66} /></div>
            <div className="flex gap-2 sm:gap-4"><Seat number={77} /><Seat number={78} /><Seat number={79} /></div>
            <div className="flex gap-2 sm:gap-4"><Seat number={83} /><Seat number={82} /><Seat number={81} /></div>
            <div className="flex gap-2 sm:gap-4"><Seat number={86} /><Seat number={87} /><Seat number={80} /></div>

          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8">
        <div className="flex justify-center gap-2 sm:gap-4 mb-4">
          {[95, 94, 93, 90, 89, 88].map(num => (
            <Seat key={num} number={num} />
          ))}
        </div>
        <div className="flex justify-center gap-2 sm:gap-4 mb-4">
          {[96, 97, 98, 99].map(num => (
            <Seat key={num} number={num} />
          ))}
        </div>
        <div className="flex justify-center gap-2 sm:gap-4">
          {[100, 101, 102, 103].map(num => (
            <Seat key={num} number={num} />
          ))}
        </div>
        
        {/* Reserve Seats */}
        <div className="flex justify-center gap-2 sm:gap-4 mt-4">
          <Seat number="R1" />
          <Seat number="R2" />
        </div>
      </div>
    </div>
  );
};

export default Seatings;