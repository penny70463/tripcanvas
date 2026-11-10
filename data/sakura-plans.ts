export type MapStop = {
  name: string;
  lat: number;
  lng: number;
};

export type HopMode = "walk" | "subway" | "jr" | "tram" | "bus" | "taxi" | "shinkansen" | "ropeway" | "flight";

export type RouteStep = {
  label: string;
  lat?: number;
  lng?: number;
  part?: "side";
  hop?: {
    mode: HopMode;
    text: string;
    /** 電車沿這些站走，不含這段兩端。走路、計程車由路網算。 */
    via?: [number, number][];
    /** 城外的段不畫進總圖，避免市區被縮成一個點。 */
    onMap?: boolean;
  };
};

export type PlanDay = {
  title: string;
  /** 當天出發或抵達時間 */
  depart: string;
  /** 核心賞櫻亮點標籤 */
  highlight?: string;
  /** 預估景點門票/體驗費用說明 */
  admission?: string;
  body: string;
  steps: RouteStep[];
  onMap: boolean;
  mapNote?: string;
};

export type FlightLeg = {
  way: "去" | "回";
  /** yes 這頁用的班，maybe 可以換，no 不排 */
  pick: "yes" | "maybe" | "no";
  airline: string;
  code?: string;
  from: string;
  depart: string;
  to: string;
  arrive: string;
  duration: string;
  note?: string;
};

export type PlanDate = {
  id: string;
  label: string;
  detail: string;
  dayLabels: string[];
};

export type SakuraPlan = {
  id: string;
  city: string;
  fit: string;
  lodgingPoint: MapStop;
  dates: PlanDate[];
  conditions: string[];
  flights: FlightLeg[];
  intro: string;
  days: PlanDay[];
  stay: {
    name: string;
    facts: string[];
    caution: string;
    link?: { href: string; label: string };
  };
  budget: {
    note: string;
    rows: { item: string; amount: string; detail: string }[];
    total: string;
    each: string;
  };
};

export const routeColors = ["#0284c7", "#0f766e", "#c2410c", "#6d28d9", "#be123c", "#4338ca", "#3f6212"];

const budgetNote = "匯率以 ¥100 = NT$22 估算。下表每一格是規劃價，六人合計為各項相加的結果，不含購物、保險、超重行李。高鐵先按六人全票計算。機票開賣後，只需更換機票那一格。";

const sendaiHome: MapStop = { name: "住宿（広瀬通・勾当台步行圈）", lat: 38.2638, lng: 140.876 };
const sapporoHome: MapStop = { name: "住宿（薄野・南二條）", lat: 43.0563, lng: 141.3516 };
const kanazawaHome: MapStop = { name: "住宿（松之間・東山）", lat: 36.5717, lng: 136.6684 };
const matsuyamaHome: MapStop = { name: "住宿（松山市站步行圈）", lat: 33.8366, lng: 132.7658 };

export const sakuraPlans: SakuraPlan[] = [
  {
    id: "sendai",
    city: "仙台",
    fit: "花期、人潮與交通三方面最平衡。",
    lodgingPoint: sendaiHome,
    dates: [
      {
        id: "apr13",
        label: "4/13（二）– 4/19（一）",
        detail: "需請 5 個工作天（4/13、14、15、16、19），期間沒有國定假日。前一天 4/12（一）上班，後一天 4/20（二）上班。滿開約 4/13，這七天落在最佳區間裡。",
        dayLabels: ["4/13（二）", "4/14（三）", "4/15（四）", "4/16（五）", "4/17（六）", "4/18（日）", "4/19（一）"],
      },
    ],
    conditions: [
      "台中沒有直飛，4/12 晚上要先北上，住台北車站或桃園機場附近，六人至少訂兩間房。",
      "日本假日附註：4/13–4/19 沒有日本國定假日。",
      "機場到仙台站搭機場線，約 17–25 分。一目千本櫻在仙台南邊，只在週四上午搭 JR 前往（約 40 分），中午前回住宿。",
    ],
    flights: [
      { way: "去", pick: "yes", airline: "長榮", code: "BR118", from: "桃園", depart: "10:15", to: "仙台", arrive: "14:25", duration: "3 小時 10 分", note: "台中出發當天高鐵趕不上，4/12 晚上要先北上。" },
      { way: "回", pick: "yes", airline: "長榮", from: "仙台", depart: "16:15", to: "桃園", arrive: "19:30", duration: "4 小時 15 分", note: "約 19:30 抵達桃園，入境後搭高鐵回台中，4/20 上班。" },
      { way: "去", pick: "maybe", airline: "星宇", code: "JX862", from: "桃園", depart: "11:50", to: "仙台", arrive: "16:00", duration: "3 小時 10 分", note: "去回程不必搭同一家航空，這班可搭配長榮 16:15 的回程。一樣要前一晚北上。" },
      { way: "回", pick: "no", airline: "星宇", code: "JX863", from: "仙台", depart: "17:25", to: "桃園", arrive: "20:35", duration: "4 小時 10 分", note: "約 20:35 抵達，六人容易趕不上高鐵末班車。" },
    ],
    intro:
      "每天上午出門賞花，在主要景點附近午餐，約 14:30–15:00 回住宿午睡；午睡後約 16:00 的副行程是小景點或購物，可以不去。賞櫻地點是定禪寺通、西公園與榴岡公園，仙台市區搭地鐵移動。4 月中旬白天約 8–16°C，長輩和小孩要帶外套。",
    days: [
      {
        title: "Check-in 入住，附近散步休息",
        depart: "14:25 抵達仙台機場",
        body: "下午抵達後 Check-in 入住、吃飯；有體力的話，再到附近的勾当台公園散步。副行程（生鮮水果採買）：放好行李後約 16:30，步行 5 分到「仙台三越地下超市」採買第一晚的宮城在地鮮奶、青森蘋果、當季草莓與熟食小點心，把住處冰箱填滿！",
        onMap: true,
        steps: [
          { label: "仙台機場", lat: 38.1397, lng: 140.9169 },
          { label: "仙台站", lat: 38.2601, lng: 140.8824, hop: { mode: "jr", text: "機場線 25 分", onMap: false } },
          { label: "住宿", lat: sendaiHome.lat, lng: sendaiHome.lng, hop: { mode: "subway", text: "地鐵 4 分，再走路 3 分", via: [[38.2636, 140.8757]] } },
          { label: "勾当台公園", lat: 38.2685, lng: 140.8725, hop: { mode: "walk", text: "走路 8 分" } },
          { label: "住宿", lat: sendaiHome.lat, lng: sendaiHome.lng, hop: { mode: "walk", text: "走路 8 分" } },
          { label: "仙台三越地下超市採買", lat: 38.2657, lng: 140.8710, part: "side", hop: { mode: "walk", text: "步行 5 分採買生鮮水果" } },
          { label: "住宿", lat: sendaiHome.lat, lng: sendaiHome.lng, hop: { mode: "walk", text: "步行 5 分回住宿" } },
        ],
      },
      {
        title: "定禪寺通和西公園",
        depart: "出發 09:00",
        highlight: "🌸 市區賞櫻：西公園（仙台最古老櫻花名所）",
        admission: "景點免費",
        body: "上午主行程：定禪寺通，再走到西公園。在定禪寺通或西公園附近午餐，約 14:30 回住宿午睡。副行程（老字號百貨）：午睡後約 16:00 出門至東北老牌「藤崎百貨（Fujisaki）」地下街與一番町拱廊街，採買精緻和洋菓子、生鮮熟食，平坦遮雨好走，長輩可自由參加。",
        onMap: true,
        steps: [
          { label: "住宿", lat: sendaiHome.lat, lng: sendaiHome.lng },
          { label: "定禪寺通", lat: 38.2657, lng: 140.8722, hop: { mode: "walk", text: "走路 8 分" } },
          { label: "西公園", lat: 38.2624, lng: 140.8648, hop: { mode: "walk", text: "走路 15 分" } },
          {
            label: "住宿",
            lat: sendaiHome.lat,
            lng: sendaiHome.lng,
            hop: { mode: "walk", text: "沿定禪寺通林蔭道漫步 15 分返回住宿（或搭地鐵）" },
          },
          { label: "藤崎百貨 ＆ 一番町商圈", lat: 38.2604, lng: 140.8718, part: "side", hop: { mode: "walk", text: "步行 8 分逛街採買" } },
          { label: "住宿", lat: sendaiHome.lat, lng: sendaiHome.lng, hop: { mode: "walk", text: "步行 8 分回住宿" } },
        ],
      },
      {
        title: "白石川堤一目千本櫻，雪山殘雪與櫻花隧道",
        depart: "出發 08:30",
        highlight: "🌸 核心賞櫻：白石川堤一目千本櫻（賞櫻百選・殘雪連峰）",
        admission: "景點免費（JR 車資已計入交通費）",
        body: "上午主行程：搭 JR 到大河原，只看大河原到船岡這一段的櫻。午餐在大河原或船岡站附近，約 13:00 搭 JR 返回，約 14:30 回到住宿午睡。副行程（東北伴手禮大本營）：午睡後約 16:30 步行或搭地鐵至「仙台站 S-PAL 本館／東館伴手禮街」，集中選購菓匠三全萩之月、喜久水庵毛豆大福與牛舌伴手禮，全程室內無風雨。",
        onMap: false,
        mapNote: "櫻在仙台南邊，JR 單程 40 分。總圖只畫住宿到仙台站，出城那段不畫。",
        steps: [
          { label: "住宿", lat: sendaiHome.lat, lng: sendaiHome.lng },
          { label: "仙台站", lat: 38.2601, lng: 140.8824, hop: { mode: "subway", text: "走路 4 分，地鐵 4 分", via: [[38.2636, 140.8757]] } },
          { label: "大河原—船岡的櫻", lat: 38.053, lng: 140.732, hop: { mode: "jr", text: "JR 40 分", onMap: false } },
          { label: "仙台站", lat: 38.2601, lng: 140.8824, hop: { mode: "jr", text: "JR 40 分", onMap: false } },
          { label: "住宿", lat: sendaiHome.lat, lng: sendaiHome.lng, hop: { mode: "subway", text: "地鐵 4 分，再走路 3 分", via: [[38.2636, 140.8757]] } },
          { label: "仙台站 S-PAL 伴手禮館", lat: 38.2601, lng: 140.8824, part: "side", hop: { mode: "subway", text: "地鐵 4 分或步行 10 分" } },
          { label: "住宿", lat: sendaiHome.lat, lng: sendaiHome.lng, hop: { mode: "subway", text: "地鐵 4 分回住宿" } },
        ],
      },
      {
        title: "榴岡公園",
        depart: "出發 09:00",
        highlight: "🌸 市區賞櫻：榴岡公園（枝垂櫻名所）",
        admission: "公園免費",
        body: "上午主行程：自住宿搭地鐵至仙台站（或搭乘計程車 5 分），沿宮城野通林蔭大道直行至榴岡公園欣賞名物枝垂櫻花海。在公園或仙台站周邊午餐，約 14:30 回住宿午睡。副行程（全天候藥妝雜貨）：午睡後約 16:00 至 CLIS ROAD 全天候遮雨拱廊，採買松本清與 Sundrug 免稅藥妝、生活雜貨與 3COINS，長輩幼兒同行推車極平坦。",
        onMap: true,
        steps: [
          { label: "住宿", lat: sendaiHome.lat, lng: sendaiHome.lng },
          { label: "仙台站（東口）", lat: 38.2601, lng: 140.8845, hop: { mode: "walk", text: "沿廣瀨通漫步約 10 分至車站（或計程車 5 分）" } },
          { label: "榴岡公園", lat: 38.2603, lng: 140.8969, hop: { mode: "walk", text: "出東口沿宮城野通直行步行 10 分", via: [[38.2602, 140.8905]] } },
          { label: "仙台站（東口）", lat: 38.2601, lng: 140.8845, hop: { mode: "walk", text: "宮城野通步行 10 分返回車站周邊午餐", via: [[38.2602, 140.8905]] } },
          { label: "住宿", lat: sendaiHome.lat, lng: sendaiHome.lng, hop: { mode: "walk", text: "步行 10 分返回住宿午睡（或計程車 5 分）" } },
          { label: "CLIS ROAD 遮雨拱廊 ＆ 免稅藥妝", lat: 38.2608, lng: 140.8755, part: "side", hop: { mode: "walk", text: "步行 8 分逛全天候拱廊" } },
          { label: "住宿", lat: sendaiHome.lat, lng: sendaiHome.lng, hop: { mode: "walk", text: "步行 8 分回住宿" } },
        ],
      },
      {
        title: "廣瀨川青葉水岸散策，一番町採買",
        depart: "出發 09:00",
        highlight: "🌊 仙台代表自然景觀：廣瀨川水岸綠地・大橋遠眺與河畔野餐",
        admission: "河畔水岸散步免費",
        body: "上午主行程：避開週六熱門賞櫻公園的人潮，前往仙台母親之河「廣瀨川」大橋河畔。欣賞清澈溪流、奇岩綠意與水岸櫻花，視野開闊安靜，全平路好走。中午在河畔旁或大町周邊景觀餐廳午餐，約 14:30 回住宿午睡。副行程（日系文創流行）：午睡後約 16:00 前往仙台站西口「PARCO 1 & 2」，逛日系服飾、生活雜貨及 Pokemon Center，步調輕鬆。",
        onMap: true,
        steps: [
          { label: "住宿", lat: sendaiHome.lat, lng: sendaiHome.lng },
          {
            label: "廣瀨川水岸（仙台大橋）",
            lat: 38.2589,
            lng: 140.8617,
            hop: { mode: "walk", text: "青葉通林蔭漫步 15 分（或搭計程車 5 分）" },
          },
          {
            label: "住宿",
            lat: sendaiHome.lat,
            lng: sendaiHome.lng,
            hop: { mode: "walk", text: "步行 15 分回住宿午睡（或搭計程車 5 分）" },
          },
          { label: "PARCO 百貨 ＆ 無印良品", lat: 38.2607, lng: 140.8835, part: "side", hop: { mode: "walk", text: "步行 10 分逛文創商場" } },
          { label: "住宿", lat: sendaiHome.lat, lng: sendaiHome.lng, hop: { mode: "walk", text: "步行 10 分回住宿" } },
        ],
      },
      {
        title: "定禪寺通伊東豊雄建築 或 仙台城跡古蹟賞櫻",
        depart: "出發 08:30",
        highlight: "🏛️ 雙方案可選：定禪寺通文藝建築巡禮 或 仙台城跡俯瞰市景櫻花",
        admission: "媒體中心免費；仙台城跡戶外免費（青葉城資料館若入館成人 ¥700，觀光巴士單程 ¥260 / 一日券 ¥630）",
        body: "週日主行程提供兩組備選彈性調整：【選項 A（極輕鬆）：步行至定禪寺通「仙台媒體中心」欣賞伊東豊雄經典透光建築，在一樓咖啡廳或頂層透明圖書館歇腳看街景】；【選項 B（名勝風景）：搭乘盧葡兒仙台觀光巴士或計程車約 12 分直達「仙台城跡（青葉城）」，看伊達政宗青銅騎馬像俯瞰仙台市容與山櫻】。中午在附近午餐，約 14:30 回住宿午睡。副行程（免稅補貨裝箱）：午睡後約 16:00 前往 24H 驚安殿堂唐吉訶德或 Bic Camera，集中採買日本零食、保養品與伴手禮，打包行李無壓力。",
        onMap: true,
        steps: [
          { label: "住宿", lat: sendaiHome.lat, lng: sendaiHome.lng },
          { label: "仙台媒體中心（或仙台城跡）", lat: 38.2654, lng: 140.8657, hop: { mode: "walk", text: "步行 12 分（若去仙台城搭車 12 分）" } },
          { label: "住宿", lat: sendaiHome.lat, lng: sendaiHome.lng, hop: { mode: "walk", text: "走路 12 分回住宿" } },
          { label: "驚安殿堂唐吉訶德（仙台站西口）", lat: 38.2599, lng: 140.8797, part: "side", hop: { mode: "walk", text: "步行 8 分採買免稅商品" } },
          { label: "住宿", lat: sendaiHome.lat, lng: sendaiHome.lng, hop: { mode: "walk", text: "步行 8 分回住宿" } },
        ],
      },
      {
        title: "買伴手禮，搭長榮回桃園",
        depart: "出發 09:00",
        body: "上午在一番町買伴手禮，附近午餐後，約 12:30 走到仙台站，搭機場線前往機場。這天沒有午睡和副行程。約 19:30 抵達桃園，當晚搭高鐵回台中，4/20 上班。",
        onMap: true,
        mapNote: "總圖畫到仙台站。機場線 25 分不畫進來。",
        steps: [
          { label: "住宿", lat: sendaiHome.lat, lng: sendaiHome.lng },
          { label: "一番町", lat: 38.2594, lng: 140.8716, hop: { mode: "walk", text: "走路 10 分" } },
          { label: "仙台站", lat: 38.2601, lng: 140.8824, hop: { mode: "walk", text: "走路 12 分" } },
          { label: "仙台機場", lat: 38.1397, lng: 140.9169, hop: { mode: "jr", text: "機場線 25 分", onMap: false } },
          { label: "桃園", hop: { mode: "flight", text: "長榮 16:15 起飛" } },
        ],
      },
    ],
    stay: {
      name: "広瀬通或勾当台公園步行 10 分鐘內的整戶 2LDK",
      facts: [
        "一天只住一組。定員至少 6。至少兩間可關門的寢室。要有廚房和洗衣機。",
        "地點鎖定地鐵南北線「広瀬通」或「勾当台公園」。定禪寺通和一番町都在能回住宿午睡的距離內。",
        "不要訂機場線沿線或仙台站以東港區的房子。雖然去機場方便，但每天回來午睡都要多轉一趟車。",
        "預算以每晚 ¥35,000、6 晚 NT$46,200 估算。賞櫻週先訂可免費取消的方案；訂到的實價若不同，只需修改住宿這一格。",
      ],
      caution: "仙台市中心很少有明確標示可住六人的兩房飯店，請用上面的條件篩選。兩間相鄰的飯店房間不算一戶。總圖上的住宿點是這個步行圈的代表位置，不是某一間已經訂下的房子。",
    },
    budget: {
      note: budgetNote,
      rows: [
        { item: "來回機票", amount: "NT$108,000", detail: "一人 NT$18,000 × 6。" },
        { item: "前一晚北上", amount: "NT$16,400", detail: "高鐵六人全票來回 NT$8,400，台北兩房一晚 NT$8,000。" },
        { item: "住宿 6 晚", amount: "NT$46,200", detail: "¥35,000 × 6 晚。" },
        { item: "吃飯", amount: "NT$19,800", detail: "一人一天 ¥2,500 × 6 人 × 6 天。早餐用廚房。" },
        { item: "市區交通", amount: "NT$6,600", detail: "機場線來回、地鐵，加上週四那趟 JR。" },
      ],
      total: "六人 NT$197,000",
      each: "每人 NT$32,833",
    },
  },
  {
    id: "sapporo",
    city: "札幌",
    fit: "花期最晚，外國遊客最少，但機票和住宿最貴，天氣也最冷。",
    lodgingPoint: sapporoHome,
    dates: [
      {
        id: "may6",
        label: "5/6（四）– 5/12（三）",
        detail: "需請 5 個工作天（5/6、7、10、11、12），期間沒有國定假日。前一天 5/5（三）台灣上班，後一天 5/13（四）上班。平均滿開約 5/6。日本黃金週到 5/5 結束，5/6 出發可避開連假高峰。",
        dayLabels: ["5/6（四）", "5/7（五）", "5/8（六）", "5/9（日）", "5/10（一）", "5/11（二）", "5/12（三）"],
      },
    ],
    conditions: [
      "台中直飛札幌目前只開賣到 2027/3/27，官網 4 月沒有這條航線。賞花在 5 月，所以這組改從桃園出發，5/5 晚上先北上。",
      "2026 年札幌花期比平均早了約 13 天。若 2027 年 2 月預報滿開落在 4 月下旬，這組日期只會看到葉櫻，整段行程就要提前，而且要避開 4/29–5/5 的連假。",
      "日本假日附註：黃金週到 5/5 結束，5/6–5/12 沒有日本國定假日，但黃金週剛結束，回程航班可能較滿。",
      "新千歲到札幌站搭 JR 快速 Airport 約 37 分；週日前往小樽搭 JR 快速約 32 分。圓山公園搭地鐵東西線前往。",
    ],
    flights: [
      { way: "去", pick: "yes", airline: "星宇", code: "JX850", from: "桃園", depart: "09:20", to: "新千歲", arrive: "14:05", duration: "3 小時 45 分", note: "09:20 起飛，台中當天高鐵趕不上。" },
      { way: "回", pick: "yes", airline: "星宇", from: "新千歲", depart: "15:20", to: "桃園", arrive: "19:05", duration: "4 小時 45 分", note: "約 19:00 抵達桃園，當晚搭高鐵回台中。" },
    ],
    intro:
      "每天上午出門賞花，在主要景點附近午餐，約 14:30–15:00 回住宿午睡；午睡後約 16:00 的副行程可以不去。圓山公園和北海道神宮是主要賞櫻點。週六漫步中島公園水畔；週日搭 JR 快速衝小樽運河與海鮮壽司，午後回房午睡；週一走白色戀人童話莊園與市電。不排太累的遠程健行。5 月上旬白天約 8–16°C，早晚更低，六人都要帶外套。",
    days: [
      {
        title: "Check-in 入住，吃完飯就休息",
        depart: "14:05 抵達新千歲機場",
        body: "下午抵達札幌辦理 Check-in 入住、吃飯；有體力的話，再走到大通。副行程（生鮮大採買）：放好行李後約 16:30，步行 3 分鐘至薄野新地標「COCONO SUSUKINO 地下超市」或狸小路，採買北海道十勝鮮奶、十勝生乳酪、當季草莓與夕張哈密瓜果凍，把住處冰箱填滿！",
        onMap: true,
        mapNote: "新千歲在札幌東南邊，JR 37 分。總圖從札幌站畫起。",
        steps: [
          { label: "新千歲機場", lat: 42.7752, lng: 141.6923 },
          { label: "札幌站", lat: 43.0687, lng: 141.3508, hop: { mode: "jr", text: "JR 快速 Airport 37 分", onMap: false } },
          { label: "住宿", lat: sapporoHome.lat, lng: sapporoHome.lng, hop: { mode: "subway", text: "地鐵 6 分，再走路 3 分", via: [[43.0553, 141.3535]] } },
          { label: "大通", lat: 43.0596, lng: 141.3544, hop: { mode: "walk", text: "走路 8 分", via: [[43.0596, 141.3516]] } },
          { label: "住宿", lat: sapporoHome.lat, lng: sapporoHome.lng, hop: { mode: "walk", text: "走路 8 分", via: [[43.0563, 141.3544]] } },
          { label: "COCONO SUSUKINO 地下生鮮超市", lat: 43.0554, lng: 141.3536, part: "side", hop: { mode: "walk", text: "步行 3 分採買鮮奶水果" } },
          { label: "住宿", lat: sapporoHome.lat, lng: sapporoHome.lng, hop: { mode: "walk", text: "步行 3 分回住宿" } },
        ],
      },
      {
        title: "圓山公園與北海道神宮",
        depart: "出發 09:00",
        highlight: "🌸 核心賞櫻：圓山公園・北海道神宮（櫻梅同開奇景）",
        admission: "景點免費",
        body: "上午主行程：圓山公園和北海道神宮。在圓山公園附近午餐，約 14:30 回住宿午睡。副行程（全天候地下商場）：午睡後約 16:00 出門走進大通地下街（Pole Town / Aurora Town）與丸井今井百貨地下街，採買北海道名物甜點（六花亭、北菓樓、柳月三方六），全程遮雨避風，推車極舒適。",
        onMap: true,
        steps: [
          { label: "住宿", lat: sapporoHome.lat, lng: sapporoHome.lng },
          {
            label: "圓山公園",
            lat: 43.0543,
            lng: 141.3078,
            hop: { mode: "subway", text: "地鐵 14 分，再走路 8 分", via: [[43.0592, 141.3515], [43.0558, 141.3203]] },
          },
          {
            label: "住宿",
            lat: sapporoHome.lat,
            lng: sapporoHome.lng,
            hop: { mode: "subway", text: "走路 8 分，地鐵 14 分", via: [[43.0558, 141.3203], [43.0592, 141.3515]] },
          },
          { label: "大通地下街 ＆ 丸井今井甜點街", lat: 43.0596, lng: 141.3544, part: "side", hop: { mode: "walk", text: "步行 8 分逛地下商場", via: [[43.0596, 141.3516]] } },
          { label: "住宿", lat: sapporoHome.lat, lng: sapporoHome.lng, hop: { mode: "walk", text: "步行 8 分回住宿", via: [[43.0563, 141.3544]] } },
        ],
      },
      {
        title: "中島公園水畔賞櫻，傍晚藻岩山夜景",
        depart: "出發 09:00",
        highlight: "🌸 市區賞櫻：中島公園（水畔櫻花倒影）",
        admission: "公園免費",
        body: "上午主行程：中島公園漫步賞櫻，避開圓山的人潮。在公園附近午餐，約 14:30 回住宿午睡。副行程（彈性二選一）：【選項 A（逛街採買・步行 3 分）】：午睡後至狸小路 3-4 丁目「MEGA 唐吉訶德」24H 旗艦店採買全家零食、長輩保養藥妝與幼兒雜貨；【選項 B（夜景名勝）】：約 16:30 搭乘市電轉接駁車至「藻岩山纜車」，欣賞日本新三大夜景璀璨全景（長輩幼兒若不想出門可留在房內休息）。",
        onMap: true,
        steps: [
          { label: "住宿", lat: sapporoHome.lat, lng: sapporoHome.lng },
          { label: "中島公園", lat: 43.0443, lng: 141.3524, hop: { mode: "subway", text: "地鐵 6 分，再走路 4 分", via: [[43.0446, 141.3527]] } },
          { label: "住宿", lat: sapporoHome.lat, lng: sapporoHome.lng, hop: { mode: "subway", text: "走路 4 分，地鐵 6 分", via: [[43.0446, 141.3527]] } },
          { label: "狸小路 3–4 丁目 MEGA 唐吉訶德", lat: 43.0573, lng: 141.3533, part: "side", hop: { mode: "walk", text: "步行 3 分採買免稅零食藥妝" } },
          { label: "住宿", lat: sapporoHome.lat, lng: sapporoHome.lng, hop: { mode: "walk", text: "步行 3 分回住宿" } },
        ],
      },
      {
        title: "小樽運河與堺町通街景",
        depart: "出發 08:30",
        highlight: "⚓ 浪漫港都名勝：小樽運河・歷史紅磚倉庫街",
        admission: "景點免費；JR 快速 Airport 札幌⇄小樽單程約 ¥750（每人來回約 ¥1,500）",
        body: "上午主行程：搭 JR 快速 Airport（約 32–35 分）直達小樽。漫步小樽運河、欣賞石造倉庫群與堺町通商店街（北一硝子、LeTAO、音樂盒堂）。在小樽運河旁或三角市場品嚐壽司海鮮午餐。約 13:00 搭 JR 返回，約 14:00–14:30 回到住宿午睡。副行程（免稅藥妝母嬰採買）：上午已在小樽買足甜點，午睡後約 16:30 下樓至狸小路 5 丁目「札幌藥妝 Satsudora」旗艦店，集中採買母嬰用品、酵素洗顏與各類長輩藥品，買完 3 分鐘拎回房間放。",
        onMap: false,
        mapNote: "小樽在札幌西北方海濱，搭乘 JR 快速單程約 32–35 分鐘。為避免地圖比例尺過大縮小市區細節，出城路段不納入市區總圖。",
        steps: [
          { label: "住宿", lat: sapporoHome.lat, lng: sapporoHome.lng },
          { label: "札幌站", lat: 43.0687, lng: 141.3508, hop: { mode: "subway", text: "地鐵 8 分", via: [[43.0592, 141.3515]] } },
          { label: "小樽站", lat: 43.1977, lng: 140.9937, hop: { mode: "jr", text: "JR 快速 Airport 32 分", onMap: false } },
          { label: "小樽運河", lat: 43.1994, lng: 141.0028, hop: { mode: "walk", text: "出站沿中央通平路步行 8 分" } },
          { label: "堺町通商圈", lat: 43.1932, lng: 141.0081, hop: { mode: "walk", text: "步行 8 分（LeTAO・北一硝子）" } },
          { label: "小樽站", lat: 43.1977, lng: 140.9937, hop: { mode: "walk", text: "步行 12 分返回車站" } },
          { label: "札幌站", lat: 43.0687, lng: 141.3508, hop: { mode: "jr", text: "JR 快速 Airport 32 分", onMap: false } },
          { label: "住宿", lat: sapporoHome.lat, lng: sapporoHome.lng, hop: { mode: "subway", text: "地鐵 8 分返回薄野", via: [[43.0592, 141.3515]] } },
          { label: "狸小路 5 丁目 札幌藥妝旗艦店", lat: 43.0571, lng: 141.3518, part: "side", hop: { mode: "walk", text: "步行 3 分採買免稅藥妝" } },
          { label: "住宿", lat: sapporoHome.lat, lng: sapporoHome.lng, hop: { mode: "walk", text: "步行 3 分回住宿" } },
        ],
      },
      {
        title: "白色戀人觀光工廠城堡莊園",
        depart: "出發 09:00",
        highlight: "🏰 歐風童話名勝：白色戀人公園・英式庭園與甜點工廠",
        admission: "戶外歐風庭園免費；室內收費展區（生產線參觀）成人 ¥800、4歲–國中生 ¥400、3歲以下免費",
        body: "上午主行程：搭地鐵東西線直達「宮之澤站」，步行約 7 分至白色戀人公園。欣賞童話般的英式紅磚城堡、機械鐘塔表演與玫瑰花園，可在室內參觀餅乾生產線或在咖啡廳品嚐冰淇淋與甜點。全區無障礙平路、室內座位多，長輩與幼兒極度輕鬆。中午在園區餐廳或宮之澤站周邊午餐，約 14:30 回住宿午睡。副行程（流行服飾家電）：午睡後約 16:00 搭地鐵 2 站至札幌站大丸百貨（Daimaru）與 Stellar Place 逛日系服飾、生活質感雜貨與 Yodobashi 電器，或在薄野搭市電兜風看街景。",
        onMap: true,
        steps: [
          { label: "住宿", lat: sapporoHome.lat, lng: sapporoHome.lng },
          {
            label: "白色戀人公園",
            lat: 43.0888,
            lng: 141.2715,
            hop: { mode: "subway", text: "地鐵東西線 20 分，平路步行 7 分", via: [[43.0592, 141.3515], [43.0838, 141.2778]] },
          },
          {
            label: "住宿",
            lat: sapporoHome.lat,
            lng: sapporoHome.lng,
            hop: { mode: "subway", text: "平路步行 7 分，地鐵 20 分", via: [[43.0838, 141.2778], [43.0592, 141.3515]] },
          },
          { label: "札幌站 Daimaru 大丸百貨 ＆ 電器街", lat: 43.0687, lng: 141.3508, part: "side", hop: { mode: "subway", text: "地鐵 8 分" } },
          { label: "住宿", lat: sapporoHome.lat, lng: sapporoHome.lng, hop: { mode: "subway", text: "地鐵 8 分" } },
        ],
      },
      {
        title: "二條市場海鮮 ＆ 札幌地標散策（電視塔・時計台・狸小路）",
        depart: "出發 09:00",
        highlight: "🗼 市中心地標散策：二條市場海鮮丼・札幌電視塔・時計台・狸小路商圈",
        admission: "景點戶外參觀免費；電視塔展望台若登頂成人 ¥1,000；時計台館內參觀 ¥200",
        body: "【09:00 出發】自住宿步行僅 5 分鐘抵達二條市場，避開正午人潮，品嚐新鮮海鮮丼、採買頂級昆布干貝與現切哈密瓜。【10:00–11:30】沿創成川公園平緩步道漫步，抵達札幌電視塔與大通公園花壇，順遊百年木造歷史地標「札幌市時計台」拍經典紀念照，接著逛進全天候巨型拱廊「狸小路商店街」採買北海道必買土產與藥妝。【11:30–12:30】在狸小路或薄野享用午餐與咖啡甜點。【14:00】準時回薄野住宿充飽電午睡！副行程（最後大採購）：午睡後約 16:00 可至札幌站前商圈逛百貨公司或 Ario 札幌（阿卡將本鋪），把所有行李箱裝滿，可以不去。",
        onMap: true,
        steps: [
          { label: "住宿", lat: sapporoHome.lat, lng: sapporoHome.lng },
          { label: "二條市場", lat: 43.0638, lng: 141.3542, hop: { mode: "walk", text: "平路步行 5 分（享用海鮮丼與哈密瓜）" } },
          { label: "創成川公園", lat: 43.0615, lng: 141.3558, hop: { mode: "walk", text: "步行 2 分沿水岸散步" } },
          { label: "札幌電視塔", lat: 43.0611, lng: 141.3564, hop: { mode: "walk", text: "步行 3 分（經典地標留影）" } },
          { label: "札幌市時計台", lat: 43.0626, lng: 141.3534, hop: { mode: "walk", text: "步行 4 分（百年木造鐘樓）" } },
          { label: "狸小路商店街", lat: 43.0573, lng: 141.3533, hop: { mode: "walk", text: "步行 5 分走進遮雨拱廊採買" } },
          { label: "住宿", lat: sapporoHome.lat, lng: sapporoHome.lng, hop: { mode: "walk", text: "步行 4 分輕鬆回房午睡" } },
          { label: "札幌站前商圈 ＆ 伴手禮最後補齊", lat: 43.0687, lng: 141.3508, part: "side", hop: { mode: "subway", text: "地鐵 8 分" } },
          { label: "住宿", lat: sapporoHome.lat, lng: sapporoHome.lng, hop: { mode: "subway", text: "地鐵 8 分" } },
        ],
      },
      {
        title: "搭 JR 到新千歲，飛回桃園",
        depart: "出發 09:00",
        body: "上午在札幌站補買伴手禮，在站內或附近午餐，約 12:30 搭 JR 前往新千歲機場。這天沒有午睡和副行程。約 15:20 起飛，19:05 抵達桃園，當晚搭高鐵回台中，5/13 上班。",
        onMap: true,
        mapNote: "總圖畫到札幌站。新千歲在圖外，JR 37 分。",
        steps: [
          { label: "住宿", lat: sapporoHome.lat, lng: sapporoHome.lng },
          { label: "札幌站", lat: 43.0687, lng: 141.3508, hop: { mode: "subway", text: "地鐵 8 分", via: [[43.0592, 141.3515]] } },
          { label: "新千歲機場", lat: 42.7752, lng: 141.6923, hop: { mode: "jr", text: "JR 快速 Airport 37 分", onMap: false } },
          { label: "桃園", hop: { mode: "flight", text: "星宇 15:20 起飛" } },
        ],
      },
    ],
    stay: {
      name: "東急 Vacations 札幌 2LDK 和洋室",
      facts: [
        "整戶式公寓，約 70㎡，2LDK，定員 6。洋室床、和室棉被、客廳沙發床可以拆開睡。有廚房和洗衣機。",
        "在中央區南二條、薄野站步行圈。到圓山公園轉一次地鐵東西線，午睡回得來。",
        "官網預設以 2 人搜尋，常見價格約 ¥31,700，那是兩人價。人數改成 6 之後，日曆上顯示的價格才是這趟的實價。預算先按每晚 ¥55,000、6 晚 NT$72,600 估算。",
        "下訂時請確認是「一戶 2LDK、定員 6」，而不是宿舍房或兩間分開的酒店房。",
      ],
      caution: "70㎡ 住六人夠用，但不寬敞。若有 90㎡ 以上、距地鐵站步行 10 分鐘內的兩寢室整戶，優先選大的。總圖的住宿點標在薄野。",
    },
    budget: {
      note: budgetNote,
      rows: [
        { item: "來回機票", amount: "NT$132,000", detail: "一人 NT$22,000 × 6。四案裡航程最長。" },
        { item: "前一晚北上", amount: "NT$16,400", detail: "高鐵六人全票來回 NT$8,400，台北兩房一晚 NT$8,000。" },
        { item: "住宿 6 晚", amount: "NT$72,600", detail: "¥55,000 × 6 晚。這是 6 人的規劃價，不是 2 人起價。" },
        { item: "吃飯", amount: "NT$23,500", detail: "一人一天 ¥3,000 × 6 人 × 6 天，再扣掉用廚房做的早餐。" },
        { item: "市區與小樽交通", amount: "NT$9,500", detail: "新千歲機場線來回約 ¥13,800、小樽來回快速電車約 ¥9,000，其餘為市區地鐵與市電。" },
      ],
      total: "六人 NT$254,000",
      each: "每人 NT$42,333",
    },
  },
  {
    id: "kanazawa",
    city: "金澤",
    fit: "櫻花名氣最大。兼六園週末仍然擁擠，要靠早上入園避開人潮。",
    lodgingPoint: kanazawaHome,
    dates: [
      {
        id: "apr8",
        label: "4/8（四）– 4/14（三）",
        detail: "需請 5 個工作天（4/8、9、12、13、14），期間沒有國定假日。前一天 4/7（三）上班，後一天 4/15（四）上班。對齊平均滿開日；若當年花開得早，後段會看到葉櫻。因為 3/29 與 4/4–4/6 是國定假日，4 月上旬沒有符合條件的更早日期，所以只留這一組。",
        dayLabels: ["4/8（四）", "4/9（五）", "4/10（六）", "4/11（日）", "4/12（一）", "4/13（二）", "4/14（三）"],
      },
    ],
    conditions: [
      "台中沒有直飛小松。這組日期是週四去、週三回，前一晚先北上就趕得上 11:50 的班機。",
      "日本假日附註：4/8–4/14 沒有日本國定假日。",
      "機場到金澤：先搭巴士約 12 分到小松站，再轉新幹線約 12 分。不排直達金澤站、需 40–55 分的利木津巴士。",
    ],
    flights: [
      { way: "去", pick: "yes", airline: "虎航", code: "IT252", from: "桃園", depart: "11:50", to: "小松", arrive: "15:35", duration: "2 小時 50 分", note: "週四、週日有班。" },
      { way: "去", pick: "no", airline: "長榮", code: "BR158", from: "桃園", depart: "06:35", to: "小松", arrive: "10:25", duration: "2 小時 50 分", note: "每天有班，但六人要凌晨到桃園。" },
      { way: "回", pick: "yes", airline: "長榮", code: "BR157", from: "小松", depart: "11:45", to: "桃園", arrive: "14:25", duration: "3 小時 40 分", note: "週三虎航沒有回程班機。約 14:25 抵達桃園，當晚搭高鐵回台中。" },
    ],
    intro:
      "每天上午出門賞花，在主要景點附近午餐，約 14:30–15:00 回町家午睡；午睡後約 16:00 的副行程可以不去。週五進兼六園，週六走犀川櫻橋，週日探訪金澤城石川門櫻花與尾山神社。4 月上旬約 8–17°C。",
    days: [
      {
        title: "町家 Check-in，金澤站或東山採買生鮮水果",
        depart: "15:35 抵達小松機場",
        admission: "景點免費；晚餐與超市採買自理",
        body: "下午約 17:30 抵達金澤，辦理町家 Check-in 放行李。此時東茶屋街觀光店舖已打烊（正式逛街留待週二上午），第一天主軸放在「吃晚餐 ＆ 採買接下來的早餐食材與水果」。【採買有兩個絕佳方式】：方式 A 在金澤站出站時順道至站內大型生鮮超市「Asty 金澤超市」採買鮮奶、麵包、雞蛋與日本草莓蜜柑，再搭計程車回町家；方式 B 抵達町家放好行李後，步行 6–8 分至東山周邊的在地生鮮超市或超商採買。採買完回町家客廳輕鬆用餐休息，為隔天兼六園賞櫻儲備體力。",
        onMap: true,
        mapNote: "小松機場在金澤西南邊。總圖從金澤站畫起。進站是巴士 12 分加新幹線 12 分。",
        steps: [
          { label: "小松機場", lat: 36.3946, lng: 136.4066 },
          { label: "小松站", lat: 36.4022, lng: 136.4524, hop: { mode: "bus", text: "巴士 12 分", onMap: false } },
          { label: "金澤站生鮮超市採買", lat: 36.5781, lng: 136.6481, hop: { mode: "shinkansen", text: "新幹線 12 分（站內超市可先買水果鮮奶）", onMap: false } },
          { label: "住宿", lat: kanazawaHome.lat, lng: kanazawaHome.lng, hop: { mode: "taxi", text: "計程車 10 分 Check-in" } },
          { label: "東山靜謐巷弄散策", lat: 36.5726, lng: 136.6668, hop: { mode: "walk", text: "步行 6 分感受傍晚町家老街氣氛" } },
          { label: "住宿", lat: kanazawaHome.lat, lng: kanazawaHome.lng, hop: { mode: "walk", text: "步行 6 分回町家享用水果休息" } },
        ],
      },
      {
        title: "早上進兼六園與金澤城",
        depart: "出發 08:30",
        highlight: "🌸 核心賞櫻：兼六園・金澤城公園（日本三大名園・賞櫻百選）",
        admission: "兼六園門票：成人 ¥320、6–17歲 ¥100、65歲以上出示護照免費（若逢櫻花祭開園期可能免費入園）；金澤城公園免費",
        body: "上午主行程：8:30 出發，約 8:50 進兼六園，再走到金澤城公園。園內不能野餐，要坐下吃東西請到城公園。午餐在兼六園或金澤城公園附近，約 14:30 前回町家午睡。副行程（和菓子老舖與工藝選物）：午睡後約 16:00 可步行 6 分至東山周邊九谷燒選物店，或搭計程車 6 分至香林坊「大和百貨（Daiwa）」地下街，採買金澤頂級和菓子名店（森八、村上）與時令水果，長輩可自由參加。",
        onMap: true,
        steps: [
          { label: "住宿", lat: kanazawaHome.lat, lng: kanazawaHome.lng },
          { label: "兼六園", lat: 36.5622, lng: 136.6627, hop: { mode: "taxi", text: "計程車 8 分" } },
          { label: "金澤城公園", lat: 36.5644, lng: 136.6598, hop: { mode: "walk", text: "走路 8 分" } },
          { label: "住宿", lat: kanazawaHome.lat, lng: kanazawaHome.lng, hop: { mode: "taxi", text: "計程車 8 分" } },
          { label: "東山九谷燒選物 ＆ 和菓子採買", lat: 36.5726, lng: 136.6668, part: "side", hop: { mode: "walk", text: "步行 6 分逛特色工藝甜點店" } },
          { label: "住宿", lat: kanazawaHome.lat, lng: kanazawaHome.lng, hop: { mode: "walk", text: "步行 6 分回町家" } },
        ],
      },
      {
        title: "犀川櫻橋河岸散策，下午 21 世紀美術館",
        depart: "出發 09:00",
        highlight: "🌸 水岸賞櫻與現代藝術：犀川櫻橋・21世紀美術館著名泳池",
        admission: "犀川河岸免費；21 世紀美術館戶外公園與免費展區無須門票（地下看阿根廷著名《泳池》特展約 ¥1,200/人，可事先官網預約）",
        body: "【上午主行程・水岸賞櫻】：造訪金澤市民最愛的在地賞櫻名所「犀川櫻橋」，避開兼六園的觀光人潮，飽覽沿著開闊河岸綿延數公里的吉野櫻花海，遠眺白山連峰殘雪。中午在鄰近典雅的「西茶屋街」或香林坊享用午餐，約 14:30 回町家午睡。（貼心提示：單程步行 25 分對長輩小孩負擔較大，強烈建議分搭兩台計程車約 8 分鐘直達，車資僅約 ¥1,000）。【午睡後副行程・現代藝術與柿木畠雜貨街】：約 16:00 前往兼六園旁的「21 世紀美術館」，純白正圓形全透明玻璃建築極具穿透感，戶外開闊草坪設有彩色玻璃互動裝置藝術，適合長輩小孩散步拍照；館內更有一樓免費俯瞰名聞遐邇的阿根廷藝術家錯覺名作《泳池》（The Swimming Pool），看水底人影奇景，順遊旁邊綠樹成蔭的「柿木畠文創特色街」逛日式質感雜貨與喫茶店。",
        onMap: true,
        steps: [
          { label: "住宿", lat: kanazawaHome.lat, lng: kanazawaHome.lng },
          { label: "犀川櫻橋", lat: 36.5559, lng: 136.6492, hop: { mode: "taxi", text: "計程車 8 分（長輩幼兒免走 25 分）" } },
          { label: "住宿", lat: kanazawaHome.lat, lng: kanazawaHome.lng, hop: { mode: "taxi", text: "計程車 8 分" } },
          { label: "21 世紀美術館 ＆ 柿木畠雜貨街", lat: 36.5609, lng: 136.6583, part: "side", hop: { mode: "taxi", text: "計程車 8 分" } },
          { label: "住宿", lat: kanazawaHome.lat, lng: kanazawaHome.lng, hop: { mode: "taxi", text: "計程車 8 分" } },
        ],
      },
      {
        title: "金澤城石川門櫻花 與 尾山神社彩繪玻璃神門",
        depart: "出發 08:30",
        highlight: "🏯 城堡名勝賞櫻：金澤城公園・石川門櫻花隧道與尾山神社",
        admission: "金澤城公園免費；尾山神社境內免費",
        body: "避開週末兼六園收費排隊人潮，改至一橋之隔的「金澤城公園」欣賞著名的石川門白壁櫻花隧道，接著沿玉泉院丸庭園散步至罕見的日西合璧建築「尾山神社」，欣賞頂部鑲嵌荷蘭彩色玻璃的神門與池泉迴遊庭園。中午在香林坊或尾山神社周邊午餐，約 14:30 回町家午睡。副行程（金箔美妝與蛋糕伴手禮）：午睡後約 16:00 在東茶屋街悠閒漫步，選購「箔一」金箔保養面膜、吸油面紙以及「烏雞庵」金箔蜂蜜蛋糕，包裝精美極適合作為伴手禮。",
        onMap: true,
        steps: [
          { label: "住宿", lat: kanazawaHome.lat, lng: kanazawaHome.lng },
          { label: "金澤城石川門", lat: 36.5644, lng: 136.6598, hop: { mode: "taxi", text: "計程車 8 分" } },
          { label: "尾山神社", lat: 36.5663, lng: 136.6552, hop: { mode: "walk", text: "園區步道步行 10 分" } },
          { label: "住宿", lat: kanazawaHome.lat, lng: kanazawaHome.lng, hop: { mode: "taxi", text: "計程車 8 分" } },
          { label: "東茶屋街金箔選物（箔一・烏雞庵）", lat: 36.5726, lng: 136.6668, part: "side", hop: { mode: "walk", text: "走路 6 分" } },
          { label: "住宿", lat: kanazawaHome.lat, lng: kanazawaHome.lng, hop: { mode: "walk", text: "走路 6 分" } },
        ],
      },
      {
        title: "週一早上的主計町",
        depart: "出發 08:30",
        body: "上午主行程：約 9:00 到浅野川大橋、主計町、梅之橋。在主計町或東茶屋街附近午餐，約 14:30 回住宿午睡。副行程（當季水果與海鮮乾貨）：午睡後約 16:00 漫步或搭車至「近江町市場」，採買當季日本草莓、麝香葡萄乾、加賀野菜與能登產烤海苔，多數店家 17:00 前後打烊，採買完帶回町家大快朵頤，長輩小孩可以自由參加。",
        onMap: true,
        steps: [
          { label: "住宿", lat: kanazawaHome.lat, lng: kanazawaHome.lng },
          { label: "主計町", lat: 36.5724, lng: 136.6658, hop: { mode: "walk", text: "走路 6 分" } },
          { label: "住宿", lat: kanazawaHome.lat, lng: kanazawaHome.lng, hop: { mode: "walk", text: "走路 6 分" } },
          { label: "近江町市場（生鮮水果乾貨採買）", lat: 36.5713, lng: 136.6567, part: "side", hop: { mode: "walk", text: "走路 15 分" } },
          { label: "住宿", lat: kanazawaHome.lat, lng: kanazawaHome.lng, hop: { mode: "walk", text: "走路 15 分" } },
        ],
      },
      {
        title: "東茶屋街老街漫步，下午金箔工藝手作體驗",
        depart: "出發 09:00",
        highlight: "✨ 傳統工藝名勝：東茶屋街江戶町家・金箔手作體驗",
        body: "上午主行程：在東茶屋街江戶木造老屋與格子窗小巷漫步拍照，在茶屋街老舖或周邊享用午餐，約 14:30 回町家午睡。副行程（金箔體驗 ＆ 金澤百番街北陸大採購）：午睡後約 16:00 前往金箔工藝館體驗親手貼金箔手作；接著前往金澤站內的「金澤百番街（Anto & Rinto）」，這是全北陸最大伴手禮商場，所有石川縣名產、藥妝、伴手禮一應俱全，室內全天候遮雨，一次買齊所有行李箱戰利品！",
        onMap: true,
        steps: [
          { label: "住宿", lat: kanazawaHome.lat, lng: kanazawaHome.lng },
          { label: "東茶屋街", lat: 36.5726, lng: 136.6668, hop: { mode: "walk", text: "走路 6 分" } },
          { label: "住宿", lat: kanazawaHome.lat, lng: kanazawaHome.lng, hop: { mode: "walk", text: "走路 6 分" } },
          { label: "金箔工藝體驗", lat: 36.5702, lng: 136.666, part: "side", hop: { mode: "taxi", text: "計程車 8 分" } },
          { label: "金澤百番街伴手禮大採買", lat: 36.5781, lng: 136.6481, part: "side", hop: { mode: "taxi", text: "計程車 6 分前往金澤站內商場" } },
          { label: "住宿", lat: kanazawaHome.lat, lng: kanazawaHome.lng, hop: { mode: "taxi", text: "計程車 10 分回町家打包" } },
        ],
      },
      {
        title: "搭長榮 11:45 回桃園",
        depart: "出發 07:30",
        body: "前一天先買好和菓子，這天一早出發，搭兩台計程車到金澤站。這天沒有午睡和副行程。約 14:25 抵達桃園，再搭高鐵回台中，隔天上班。",
        onMap: true,
        mapNote: "總圖畫到金澤站。出站是新幹線 12 分加巴士 12 分，不畫進來。",
        steps: [
          { label: "住宿", lat: kanazawaHome.lat, lng: kanazawaHome.lng },
          { label: "金澤站", lat: 36.5781, lng: 136.6481, hop: { mode: "taxi", text: "計程車 10 分" } },
          { label: "小松站", lat: 36.4022, lng: 136.4524, hop: { mode: "shinkansen", text: "新幹線 12 分", onMap: false } },
          { label: "小松機場", lat: 36.3946, lng: 136.4066, hop: { mode: "bus", text: "巴士 12 分", onMap: false } },
          { label: "桃園", hop: { mode: "flight", text: "長榮 11:45 起飛" } },
        ],
      },
    ],
    stay: {
      name: "町家 Residence Inn 金澤 松之間",
      facts: [
        "一日一組的整棟町家。官網：82.8㎡、寢室 2 間（洋室國王床、和室棉被）、客廳沙發床、定員 6、廁所 2、浴室 1、廚房、洗衣烘乾。",
        "地址是金澤市東山 3-20-9。東茶屋街步行約 6 分，主計町和近江町市場在步行圈。",
        "5 歲以下不占床的幼兒可不計入人數；若幼兒需要自己的寢具，官網按成人計價。",
        "長輩睡有床的洋室，和室給年輕人。浴室只有一間，早上要排順序。",
      ],
      caution: "官網寫最多 6 人，但金澤觀光協會的介紹頁寫最多 5 人。下訂時請在官網日曆把人數與晚數都設為 6，能顯示價格才算可訂。預算先按每晚 ¥55,000 估算，取得 6 人 6 晚的實際價格後，只需修改住宿這一格。兼六園離住宿有一段距離，來回請步行或搭短程計程車。",
      link: {
        href: "https://www.kanazawa-machiya-inn.com/jp/accommodations/matsunoma/",
        label: "松之間官網",
      },
    },
    budget: {
      note: budgetNote,
      rows: [
        { item: "來回機票", amount: "NT$96,000", detail: "一人 NT$16,000 × 6。去程虎航、回程長榮。" },
        { item: "前一晚北上", amount: "NT$16,400", detail: "高鐵六人全票來回 NT$8,400，台北兩房一晚 NT$8,000。" },
        { item: "住宿 6 晚", amount: "NT$72,600", detail: "¥55,000 × 6 晚。官網 6 人日曆出來後替換。" },
        { item: "吃飯", amount: "NT$19,800", detail: "一人一天 ¥2,500 × 6 人 × 6 天。早餐用廚房。" },
        { item: "市區交通", amount: "NT$6,200", detail: "小松新幹線六人來回約 ¥17,000，加幾趟 10 分計程車。" },
        { item: "金箔", amount: "NT$4,000", detail: "六人，一人約 ¥3,000，已含在金箔體驗那天的行程中。" },
      ],
      total: "六人 NT$215,000",
      each: "每人 NT$35,833",
    },
  },
  {
    id: "matsuyama",
    city: "松山",
    fit: "觀光人潮最少、步調最悠閒慢活，但航班時刻尚未確定，去程也最早起飛。",
    lodgingPoint: matsuyamaHome,
    dates: [
      {
        id: "mar18",
        label: "3/18（四）– 3/24（三）",
        detail: "需請 5 個工作天（3/18、19、22、23、24），期間沒有台灣國定假日。前一天 3/17（三）上班，後一天 3/25（四）上班。花期偏早：四國染井吉野平均 3/24 前後開花，這組多半是初開到三分、五分。",
        dayLabels: ["3/18（四）", "3/19（五）", "3/20（六）", "3/21（日）", "3/22（一）", "3/23（二）", "3/24（三）"],
      },
      {
        id: "apr8",
        label: "4/8（四）– 4/14（三）",
        detail: "需請 5 個工作天（4/8、9、12、13、14），期間沒有台灣國定假日。前一天 4/7（三）上班，後一天 4/15（四）上班。花期偏晚：平均滿開約 3/31–4/1，這組多半是落花到葉櫻，城上可能剩花吹雪。2 月看預報，兩組擇一；3/29 和 4/4–4/6 是國定假日，兩組之間沒有符合條件的日期。",
        dayLabels: ["4/8（四）", "4/9（五）", "4/10（六）", "4/11（日）", "4/12（一）", "4/13（二）", "4/14（三）"],
      },
    ],
    conditions: [
      "台中沒有直飛，需從桃園搭長榮飛松山，且並非每天都有班。目前公布的是週三、週四、週日，兩組日期都是週四去、週三回，剛好對上。",
      "這組星期目前只對到 2026 年冬季班表，2027 年 4 月的夏季班表尚未公布。若週四或週三的班次被取消，這組日期就不成立，所以不要先付不能退的住宿費。",
      "松山機場到松山市站的機場巴士約 15 分，之後搭伊予鐵電車。",
      "日本假日附註：3/18–3/24 這組遇到春分之日（3/21 日）與補休（3/22 一），景點和電車較擠；4/8–4/14 這組沒有日本假日。",
    ],
    flights: [
      { way: "去", pick: "yes", airline: "長榮", code: "BR110", from: "桃園", depart: "06:50", to: "松山", arrive: "11:25", duration: "3 小時 30 分", note: "這是賞櫻季看到的時刻。前一晚一定要住桃園，台中當天趕不上。" },
      { way: "回", pick: "yes", airline: "長榮", code: "BR109", from: "松山", depart: "11:25", to: "桃園", arrive: "未公布", duration: "約 3 小時 30 分", note: "查到的資料不一致：有來源寫 11:05 起飛、12:55 抵達，且只飛週三、週日。2027 夏季班表尚未公布，請以長榮官網為準，先不要當成確定時間。" },
    ],
    intro:
      "第一天搭清晨班機，中午抵達後吃飯、睡覺，不看城。之後每天上午出門賞花，在主要景點附近午餐，約 14:30–15:00 回住宿午睡；午睡後約 16:00 的副行程可以不去。賞花地點在松山城和道後，兩處都有電車可達。週六走道後溫泉；週日造訪法式萬翠莊與城山山麓；週一漫步大街道商圈與伴手禮採買。4 月上旬比札幌暖和，仍要帶薄外套。",
    days: [
      {
        title: "中午抵達，吃飯休息",
        depart: "11:25 抵達松山機場",
        body: "中午抵達市區，辦理 Check-in 入住、吃飯休息。因為凌晨出發，這天不排遠景點。副行程（生鮮水果採買）：午睡後約 16:30，步行 3 分鐘至「伊予鐵高島屋地下生鮮超市」，採買愛媛在地極品蜜柑（紅麥當娜、甘平柑汁）、四國在地牛乳、時令水果與熟食點心，填滿住處冰箱！還可帶小孩搭乘高島屋頂樓的透明大摩天輪。",
        onMap: true,
        mapNote: "機場巴士到松山市站 15 分，不畫進總圖。總圖只畫松山市站到住宿。",
        steps: [
          { label: "松山機場", lat: 33.8272, lng: 132.6998 },
          { label: "松山市站", lat: 33.8401, lng: 132.7657, hop: { mode: "bus", text: "巴士 15 分", onMap: false } },
          { label: "住宿", lat: matsuyamaHome.lat, lng: matsuyamaHome.lng, hop: { mode: "walk", text: "走路 5 分" } },
          { label: "伊予鐵高島屋地下生鮮採買", lat: 33.8401, lng: 132.7657, part: "side", hop: { mode: "walk", text: "步行 3 分採買水果鮮奶" } },
          { label: "住宿", lat: matsuyamaHome.lat, lng: matsuyamaHome.lng, hop: { mode: "walk", text: "步行 3 分回住宿" } },
        ],
      },
      {
        title: "松山城，纜車上山",
        depart: "出發 09:00",
        highlight: "🌸 核心賞櫻：松山城（現存十二天守・櫻花百選山城）",
        admission: "登山纜車來回票：大人 ¥520、小學生 ¥270；松山城天守閣門票：大人 ¥520、小學生 ¥160",
        body: "上午主行程：看城山的櫻花，搭纜車上山，不走階梯。在大街道或城山下附近午餐，約 14:30 回住宿午睡。副行程（平民化生活商圈）：午睡後約 16:00 步行至「銀天街遮雨拱廊」，逛松本清與 Sundrug 免稅藥妝店、百圓店與童裝，平坦好走，長輩小孩皆可輕鬆散步，可以不去。",
        onMap: true,
        steps: [
          { label: "住宿", lat: matsuyamaHome.lat, lng: matsuyamaHome.lng },
          { label: "纜車站", lat: 33.8439, lng: 132.7704, hop: { mode: "tram", text: "電車 6 分" } },
          { label: "松山城", lat: 33.8457, lng: 132.7659, hop: { mode: "ropeway", text: "纜車 5 分" } },
          { label: "纜車站", lat: 33.8439, lng: 132.7704, hop: { mode: "ropeway", text: "纜車 5 分" } },
          { label: "住宿", lat: matsuyamaHome.lat, lng: matsuyamaHome.lng, hop: { mode: "tram", text: "電車 6 分" } },
          { label: "銀天街商圈採買（藥妝・生活雜貨）", lat: 33.8385, lng: 132.7678, part: "side", hop: { mode: "walk", text: "步行 6 分逛遮雨拱廊" } },
          { label: "住宿", lat: matsuyamaHome.lat, lng: matsuyamaHome.lng, hop: { mode: "walk", text: "步行 6 分回住宿" } },
        ],
      },
      {
        title: "週六早上的道後溫泉與道後公園",
        depart: "出發 09:00",
        highlight: "🌸 溫泉名勝賞櫻：道後公園湯築城跡",
        admission: "道後公園免費；道後溫泉本館入浴（若泡湯）：神之湯大人 ¥700、兒童 ¥350",
        body: "上午主行程：在道後溫泉本館周邊賞櫻、逛街，在道後商店街品嚐少爺糰子、採買特色毛巾，約 14:30 回住宿午睡。副行程（唐吉訶德免稅採買）：午睡後約 16:30 步行或搭電車至「唐吉訶德松山店」或銀天街藥妝店，採買長輩貼布藥妝、日本零食與家庭常備品，買完直接拎回房，長輩幼童可自由留在房內休息。",
        onMap: true,
        steps: [
          { label: "住宿", lat: matsuyamaHome.lat, lng: matsuyamaHome.lng },
          { label: "道後溫泉", lat: 33.852, lng: 132.7864, hop: { mode: "tram", text: "電車 15 分", via: [[33.846, 132.778]] } },
          { label: "住宿", lat: matsuyamaHome.lat, lng: matsuyamaHome.lng, hop: { mode: "tram", text: "電車 15 分", via: [[33.846, 132.778]] } },
          { label: "唐吉訶德 ＆ 銀天街藥妝採買", lat: 33.8385, lng: 132.7678, part: "side", hop: { mode: "walk", text: "步行 6 分逛街採買" } },
          { label: "住宿", lat: matsuyamaHome.lat, lng: matsuyamaHome.lng, hop: { mode: "walk", text: "步行 6 分回住宿" } },
        ],
      },
      {
        title: "大正法式浪漫洋館「萬翠莊」與城山綠意",
        depart: "出發 09:00",
        highlight: "🏛️ 國家重要文化財：萬翠莊法式宮殿洋樓・城山山麓櫻花散策",
        admission: "萬翠莊常設展門票：大人 ¥300、高中生以下免費；花園庭院免費",
        body: "避開週日松山城纜車排隊人潮，改訪座落於城山南麓綠意林間的法國新文藝復興風格宮殿「萬翠莊」。欣賞大正時期華麗水晶吊燈、彩繪玻璃窗與石階庭園，環境清幽典雅且平坦好走。中午在大街道商圈或城山下享用愛媛鯛魚飯午餐，約 14:30 回住宿午睡。（備註：若松山城正值全盛滿開且體力充沛，亦可由萬翠莊旁步道或搭纜車順訪）。副行程（頂級今治毛巾與柑橘伴手禮）：午睡後約 16:00 前往大街道「愛媛特產館」與今治毛巾專櫃，選購日本第一的極致吸水今治毛巾、天然蜜柑果醬與柑橘手工皂，自用送禮兩相宜。",
        onMap: true,
        steps: [
          { label: "住宿", lat: matsuyamaHome.lat, lng: matsuyamaHome.lng },
          { label: "大街道站", lat: 33.8406, lng: 132.7706, hop: { mode: "tram", text: "電車 6 分" } },
          { label: "萬翠莊", lat: 33.8415, lng: 132.7681, hop: { mode: "walk", text: "出站林蔭步道步行 5 分" } },
          { label: "大街道站", lat: 33.8406, lng: 132.7706, hop: { mode: "walk", text: "步行 5 分" } },
          { label: "住宿", lat: matsuyamaHome.lat, lng: matsuyamaHome.lng, hop: { mode: "tram", text: "電車 6 分" } },
          { label: "大街道愛媛特產館 ＆ 今治毛巾", lat: 33.8406, lng: 132.7706, part: "side", hop: { mode: "tram", text: "電車 6 分" } },
          { label: "住宿", lat: matsuyamaHome.lat, lng: matsuyamaHome.lng, hop: { mode: "tram", text: "電車 6 分" } },
        ],
      },
      {
        title: "大街道圓頂拱廊商店街・愛媛物產巡禮",
        depart: "出發 09:30",
        highlight: "🛍️ 市區全天候拱廊商圈：大街道・伊予柑特產與伴手禮採買",
        admission: "街區自由散步免費",
        body: "週一許多展館公休，排全天候遮雨拱廊商圈「大街道」最無負擔。街道寬敞平坦，聚集愛媛蜜柑專門店（如 10 Factory 柑橘汁品嚐）、少爺糰子老舖及各類土產藥妝店。長輩逛街走累了隨處有喫茶店可坐，幼兒推車無障礙。中午在拱廊商圈享用在地名物「鍋燒烏龍麵」，約 14:30 回住宿午睡。副行程（高島屋專櫃與母嬰用品）：午睡後步行 3 分鐘逛「伊予鐵高島屋百貨」，包含日系專櫃服飾、無印良品與母嬰專區，地下街更有松山代表銘菓老舖。",
        onMap: true,
        steps: [
          { label: "住宿", lat: matsuyamaHome.lat, lng: matsuyamaHome.lng },
          { label: "大街道拱廊商圈", lat: 33.8406, lng: 132.7706, hop: { mode: "tram", text: "電車 5 分" } },
          { label: "住宿", lat: matsuyamaHome.lat, lng: matsuyamaHome.lng, hop: { mode: "tram", text: "電車 5 分" } },
          { label: "伊予鐵高島屋百貨 ＆ 無印良品", lat: 33.8401, lng: 132.7657, part: "side", hop: { mode: "walk", text: "走路 3 分" } },
          { label: "住宿", lat: matsuyamaHome.lat, lng: matsuyamaHome.lng, hop: { mode: "walk", text: "走路 3 分" } },
        ],
      },
      {
        title: "梅津寺海岸瀨戶內海景 或 安藤忠雄坂上之雲美術館",
        depart: "出發 09:00",
        highlight: "🌊 雙方案彈性任選：經典海景月台散步 或 安藤忠雄幾何清水模建築",
        admission: "梅津寺海岸免費（伊予鐵高濱線單程 ¥360）；美術館常設展門票：一般 ¥400、65歲以上 ¥200、幼兒免費",
        body: "週二主行程提供老少皆宜的雙方案彈性選擇：【選項 A（極度推薦・浪漫海濱）】：自松山市站搭乘伊予鐵高濱線（約 18 分）直達臨海第一排的「梅津寺站」（日劇《東京愛情故事》完結篇手帕月台）。出站就是平坦的沙灘海岸，吹瀨戶內海海風、遠眺離島渡輪，旁邊有三津濱燒在地小吃，步調無比放鬆；【選項 B（近郊文藝）】：不想搭車者可留在市區步行造訪安藤忠雄設計的「坂上之雲美術館」，欣賞大師招牌清水模幾何斜坡建築與透光玻璃挑高。中午在附近午餐，約 14:30 回住宿午睡。副行程（市站地下街最後打包大採購）：午睡後約 16:30 至松山市站地下街「まつちか TOWN」與高島屋銘菓館，集中採買愛媛伴手禮、蜜柑甜點與免稅品，把行李箱徹底裝滿！",
        onMap: true,
        mapNote: "梅津寺在松山西北海岸，伊予鐵高濱線 18 分。為避免地圖比例尺過大縮小市區細節，出城海邊路段不納入市區總圖。",
        steps: [
          { label: "住宿", lat: matsuyamaHome.lat, lng: matsuyamaHome.lng },
          { label: "松山市站", lat: 33.8401, lng: 132.7657, hop: { mode: "walk", text: "步行 5 分到松山市站" } },
          { label: "梅津寺站・海岸", lat: 33.8829, lng: 132.7094, hop: { mode: "tram", text: "伊予鐵高濱線直達 18 分（出站即是海灘）", onMap: false } },
          { label: "松山市站", lat: 33.8401, lng: 132.7657, hop: { mode: "tram", text: "電車 18 分返回松山市站", onMap: false } },
          { label: "住宿", lat: matsuyamaHome.lat, lng: matsuyamaHome.lng, hop: { mode: "walk", text: "步行 5 分回住宿午睡" } },
          { label: "松山市站地下街伴手禮大採買", lat: 33.8401, lng: 132.7657, part: "side", hop: { mode: "walk", text: "步行 3 分地下街採買免稅伴手禮" } },
          { label: "住宿", lat: matsuyamaHome.lat, lng: matsuyamaHome.lng, hop: { mode: "walk", text: "步行 3 分回住宿打包" } },
        ],
      },
      {
        title: "巴士回機場",
        depart: "出發 07:30",
        body: "前一天先買好伴手禮，這天一早到松山市站搭機場巴士。這天沒有午睡和副行程。冬季班表的回程是中午前後起飛，下午抵達桃園後搭高鐵回台中，隔天上班。夏季班表公布後再核對起飛時間。",
        onMap: true,
        mapNote: "總圖畫到松山市站。機場巴士 15 分不畫進來。",
        steps: [
          { label: "住宿", lat: matsuyamaHome.lat, lng: matsuyamaHome.lng },
          { label: "松山市站", lat: 33.8401, lng: 132.7657, hop: { mode: "walk", text: "走路 5 分" } },
          { label: "松山機場", lat: 33.8272, lng: 132.6998, hop: { mode: "bus", text: "巴士 15 分", onMap: false } },
          { label: "桃園", hop: { mode: "flight", text: "長榮回程，冬季班表為中午前後起飛" } },
        ],
      },
    ],
    stay: {
      name: "松山市站或道後電車站步行圈的整戶",
      facts: [
        "硬條件：整戶、定員至少 6、兩間可關門的寢室、廚房、洗衣機、伊予鐵車站步行 10 分內。",
        "市站步行約 5 分有一間約 50㎡、兩寢室、定員 6 的公寓。房間數符合，但面積對兩位長輩加幼兒來說偏緊；同站若有 70㎡ 以上的兩寢室，優先選大的。",
        "道後「ぎょくすい」是一棟古民家，道後溫泉本館步行約 5 分，最多約 10 人，空間足夠。請先確認有兩間可關門的寢室，而不是一間大廣間加夾層。",
        "預算以每晚 ¥30,000、6 晚 NT$39,600 估算。請先確認所選日期能否連住 6 晚，以及可否免費取消。",
      ],
      caution: "總圖把住宿標在市站附近。若最後訂在道後，每天的電車方向會反過來，但松山城和道後仍都在電車可達的範圍。住宿若在海邊，或需開車 20 分鐘以上，這個方案就不適用。50㎡ 的公寓只在找不到更大的兩寢室時才考慮。",
    },
    budget: {
      note: budgetNote,
      rows: [
        { item: "來回機票", amount: "NT$108,000", detail: "一人 NT$18,000 × 6。班次少，開賣後用實價換這一格。" },
        { item: "前一晚北上", amount: "NT$18,400", detail: "高鐵六人全票來回 NT$8,400。06:50 的班要住桃園機場附近，兩房 NT$10,000。" },
        { item: "住宿 6 晚", amount: "NT$39,600", detail: "¥30,000 × 6 晚。" },
        { item: "吃飯", amount: "NT$15,800", detail: "一人一天 ¥2,000 × 6 人 × 6 天。早餐用廚房。" },
        { item: "交通與美術館", amount: "NT$4,200", detail: "機場巴士、電車，加坂上之雲美術館六人門票。" },
      ],
      total: "六人 NT$186,000",
      each: "每人 NT$31,000",
    },
  },
];
