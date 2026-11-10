export type DayPhoto = {
  src: string;
  alt: string;
  href: string;
};

function pic(file: string, alt: string, src: string): DayPhoto {
  return {
    src,
    alt,
    href: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`,
  };
}

const sendaiJozenji = pic("Jozenji-dori 2020.jpg", "定禪寺通", "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/Jozenji-dori_2020.jpg/960px-Jozenji-dori_2020.jpg");
const sendaiAvenue = pic("Jouzenji-dori Avenue.jpg", "定禪寺通", "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/Jouzenji-dori_Avenue.jpg/960px-Jouzenji-dori_Avenue.jpg");
const sendaiHirose = pic(
  "Sendai skyline and Hirose River from Hyojogawara Bridge.jpg",
  "廣瀨川水岸（仙台大橋景色）",
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Sendai_skyline_and_Hirose_River_from_Hyojogawara_Bridge.jpg/960px-Sendai_skyline_and_Hirose_River_from_Hyojogawara_Bridge.jpg"
);
const sendaiNishi = pic("West Park (Sendai) in the cherry blossom season.jpg", "西公園", "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a5/West_Park_%28Sendai%29_in_the_cherry_blossom_season.jpg/960px-West_Park_%28Sendai%29_in_the_cherry_blossom_season.jpg");
const sendaiHitome = pic("Mount Zaō and Sakura 01.jpg", "白石川的櫻", "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f3/Mount_Za%C5%8D_and_Sakura_01.jpg/960px-Mount_Za%C5%8D_and_Sakura_01.jpg");
const sendaiAnpanman = pic(
  "Sendai Anpanman Children's Museum & Mall.JPG",
  "仙台麵包超人兒童博物館商場",
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/87/Sendai_Anpanman_Children%27s_Museum_%26_Mall.JPG/960px-Sendai_Anpanman_Children%27s_Museum_%26_Mall.JPG"
);
const sendaiTsutsuji = pic("Tsutsujigaoka Park in the cherry blossom season.jpg", "榴岡公園", "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/Tsutsujigaoka_Park_in_the_cherry_blossom_season.jpg/960px-Tsutsujigaoka_Park_in_the_cherry_blossom_season.jpg");
const sendaiAquarium = pic("Sendai Umino-Mori Aquarium.JPG", "海之杜水族館", "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e2/Sendai_Umino-Mori_Aquarium.JPG/960px-Sendai_Umino-Mori_Aquarium.JPG");
const sendaiCastle = pic(
  "Sendai statue Date Masamune.jpg",
  "仙台城跡（伊達政宗騎馬像）",
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6b/Sendai_statue_Date_Masamune.jpg/960px-Sendai_statue_Date_Masamune.jpg"
);
const sendaiMedia = pic("Sendai Mediatheque 2009.jpg", "仙台媒體中心", "https://upload.wikimedia.org/wikipedia/commons/1/14/Sendai_Mediatheque_2009.jpg");
const sendaiIchiban = pic("Vlandome Ichibancho in September 2022.jpg", "一番町", "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Vlandome_Ichibancho_in_September_2022.jpg/960px-Vlandome_Ichibancho_in_September_2022.jpg");
const sendaiKotodai = pic("Kōtōdai Park and Miyagi Prefectural Office Building - Jan 19, 2024.jpg", "勾当台公園", "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/K%C5%8Dt%C5%8Ddai_Park_and_Miyagi_Prefectural_Office_Building_-_Jan_19%2C_2024.jpg/960px-K%C5%8Dt%C5%8Ddai_Park_and_Miyagi_Prefectural_Office_Building_-_Jan_19%2C_2024.jpg");
const sendaiStation = pic("Sendai Station 20230806.jpg", "仙台站", "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/Sendai_Station_20230806.jpg/960px-Sendai_Station_20230806.jpg");

const sapporoOtaru = pic(
  "Otaru Canal 20140817.jpg",
  "小樽運河",
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a7/Otaru_Canal_20140817.jpg/960px-Otaru_Canal_20140817.jpg"
);
const sapporoOdori = pic("Odori Park (15982613668).jpg", "大通公園", "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/Odori_Park_%2815982613668%29.jpg/960px-Odori_Park_%2815982613668%29.jpg");
const sapporoSosei = pic("Sōsei River from Minami San-jo.jpg", "創成川", "https://upload.wikimedia.org/wikipedia/commons/0/00/S%C5%8Dsei_River_from_Minami_San-jo.jpg");
const sapporoShrine = pic("Hokkaido-jingū, approach 03.jpg", "北海道神宮參道", "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cb/Hokkaido-jing%C5%AB%2C_approach_03.jpg/960px-Hokkaido-jing%C5%AB%2C_approach_03.jpg");
const sapporoTorii = pic("Hokkaido-jingū, torii.jpg", "北海道神宮", "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Hokkaido-jing%C5%AB%2C_torii.jpg/960px-Hokkaido-jing%C5%AB%2C_torii.jpg");
const sapporoMoiwa = pic(
  "City nightscape of Sapporo from Mt. Moiwa 20260703b.jpg",
  "藻岩山夜景（日本新三大夜景）",
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/City_nightscape_of_Sapporo_from_Mt._Moiwa_20260703b.jpg/960px-City_nightscape_of_Sapporo_from_Mt._Moiwa_20260703b.jpg"
);
const sapporoNakajima = pic("Nakajima Park Sapporo04n4272.jpg", "中島公園", "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Nakajima_Park_Sapporo04n4272.jpg/960px-Nakajima_Park_Sapporo04n4272.jpg");
const sapporoShiroi = pic(
  "Shiroi Koibito Park 20260703k.jpg",
  "白色戀人公園",
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/Shiroi_Koibito_Park_20260703k.jpg/960px-Shiroi_Koibito_Park_20260703k.jpg"
);
const sapporoTram = pic("Sapporo Tram Type 8520 011.JPG", "札幌市電", "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/Sapporo_Tram_Type_8520_011.JPG/960px-Sapporo_Tram_Type_8520_011.JPG");
const sapporoCampus = pic("Hokkaido Univ.／北大農學部 - panoramio.jpg", "北海道大學", "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Hokkaido_Univ.%EF%BC%8F%E5%8C%97%E5%A4%A7%E8%BE%B2%E5%AD%A6%E9%83%A8_-_panoramio.jpg/960px-Hokkaido_Univ.%EF%BC%8F%E5%8C%97%E5%A4%A7%E8%BE%B2%E5%AD%A6%E9%83%A8_-_panoramio.jpg");
const sapporoTVTower = pic(
  "Sapporo TV tower-20091013-RM-162316.jpg",
  "札幌電視塔",
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Sapporo_TV_tower-20091013-RM-162316.jpg/960px-Sapporo_TV_tower-20091013-RM-162316.jpg"
);
const sapporoNijo = pic("Nijo fish Market 2014.jpg", "二條市場", "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/Nijo_fish_Market_2014.jpg/960px-Nijo_fish_Market_2014.jpg");
const sapporoStation = pic("JR Sapporo Sta03n3200.jpg", "札幌站", "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/01/JR_Sapporo_Sta03n3200.jpg/960px-JR_Sapporo_Sta03n3200.jpg");

const kanazawaChaya = pic("ひがし茶屋街 01.jpg", "東茶屋街", "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a0/%E3%81%B2%E3%81%8C%E3%81%97%E8%8C%B6%E5%B1%8B%E8%A1%97_01.jpg/960px-%E3%81%B2%E3%81%8C%E3%81%97%E8%8C%B6%E5%B1%8B%E8%A1%97_01.jpg");
const kanazawaChaya2 = pic("ひがし茶屋街 02.jpg", "東茶屋街", "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fb/%E3%81%B2%E3%81%8C%E3%81%97%E8%8C%B6%E5%B1%8B%E8%A1%97_02.jpg/960px-%E3%81%B2%E3%81%8C%E3%81%97%E8%8C%B6%E5%B1%8B%E8%A1%97_02.jpg");
const kanazawaKenroku = pic("Kenrokuen10-r.jpg", "兼六園", "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/Kenrokuen10-r.jpg/960px-Kenrokuen10-r.jpg");
const kanazawaCastle = pic("Kanazawa-M-5932.jpg", "金澤城", "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/Kanazawa-M-5932.jpg/960px-Kanazawa-M-5932.jpg");
const kanazawaSai = pic("犀川の桜橋.jpg", "犀川櫻橋", "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/%E7%8A%80%E5%B7%9D%E3%81%AE%E6%A1%9C%E6%A9%8B.jpg/960px-%E7%8A%80%E5%B7%9D%E3%81%AE%E6%A1%9C%E6%A9%8B.jpg");
const kanazawaOyama = pic(
  "Oyama Shrine, Kanazawa; June 2016 (06).jpg",
  "尾山神社神門",
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f4/Oyama_Shrine%2C_Kanazawa%3B_June_2016_%2806%29.jpg/960px-Oyama_Shrine%2C_Kanazawa%3B_June_2016_%2806%29.jpg"
);
const kanazawaMuseum = pic("21st Century Museum of Contemporary Art, Kanazawa011.jpg", "21 世紀美術館", "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b2/21st_Century_Museum_of_Contemporary_Art%2C_Kanazawa011.jpg/960px-21st_Century_Museum_of_Contemporary_Art%2C_Kanazawa011.jpg");
const kanazawaKazue = pic("主計町茶屋街004.jpg", "主計町", "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/93/%E4%B8%BB%E8%A8%88%E7%94%BA%E8%8C%B6%E5%B1%8B%E8%A1%97004.jpg/960px-%E4%B8%BB%E8%A8%88%E7%94%BA%E8%8C%B6%E5%B1%8B%E8%A1%97004.jpg");
const kanazawaOmicho = pic("Omicho-ichiba 近江町市場 A091185.JPG", "近江町市場", "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/Omicho-ichiba_%E8%BF%91%E6%B1%9F%E7%94%BA%E5%B8%82%E5%A0%B4_A091185.JPG/960px-Omicho-ichiba_%E8%BF%91%E6%B1%9F%E7%94%BA%E5%B8%82%E5%A0%B4_A091185.JPG");
const kanazawaGold = pic("Kanazawa Gold Factory.jpg", "金箔", "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/Kanazawa_Gold_Factory.jpg/960px-Kanazawa_Gold_Factory.jpg");
const kanazawaStation = pic("Kanazawa-STA Kenrokuen-entrance.jpg", "金澤站", "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fe/Kanazawa-STA_Kenrokuen-entrance.jpg/960px-Kanazawa-STA_Kenrokuen-entrance.jpg");

const matsuStation = pic("Iyotetsu Takashimaya 20260517.jpg", "松山市站", "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Iyotetsu_Takashimaya_20260517.jpg/960px-Iyotetsu_Takashimaya_20260517.jpg");
const matsuCastle = pic("Matsuyama castle(Iyo)6.JPG", "松山城", "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/Matsuyama_castle%28Iyo%296.JPG/960px-Matsuyama_castle%28Iyo%296.JPG");
const matsuKeep = pic("Keep of Iyo-Matsuyama Castle.jpg", "松山城天守", "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Keep_of_Iyo-Matsuyama_Castle.jpg/960px-Keep_of_Iyo-Matsuyama_Castle.jpg");
const matsuDogo = pic("Dōgo Onsen.jpg", "道後溫泉", "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/83/D%C5%8Dgo_Onsen.jpg/960px-D%C5%8Dgo_Onsen.jpg");
const matsuDogoNight = pic("Dogo onsen honkan long exposure.jpg", "道後溫泉本館", "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/79/Dogo_onsen_honkan_long_exposure.jpg/960px-Dogo_onsen_honkan_long_exposure.jpg");
const matsuTram = pic("IyoRailway-Otemachi.jpg", "伊予鐵電車", "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/IyoRailway-Otemachi.jpg/960px-IyoRailway-Otemachi.jpg");
const matsuGintengai = pic(
  "Matsuyama Gintengai 20240826 (1).jpg",
  "松山銀天街商店街",
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/48/Matsuyama_Gintengai_20240826_%281%29.jpg/960px-Matsuyama_Gintengai_20240826_%281%29.jpg"
);
const matsuOkaido = pic(
  "Matsuyama Okaido 2021-08 ac (1).jpg",
  "大街道商店街",
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/Matsuyama_Okaido_2021-08_ac_%281%29.jpg/960px-Matsuyama_Okaido_2021-08_ac_%281%29.jpg"
);
const matsuBansuiIndoor = pic(
  "BansuisoIndoor1.JPG",
  "萬翠莊（華麗大正洋館內景）",
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/BansuisoIndoor1.JPG/960px-BansuisoIndoor1.JPG"
);
const matsuBansui = pic(
  "Bansuiso,Matsuyama-city,Japan.jpg",
  "萬翠莊（大正法式洋館）",
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Bansuiso%2CMatsuyama-city%2CJapan.jpg/960px-Bansuiso%2CMatsuyama-city%2CJapan.jpg"
);

const kanazawaPool = pic(
  "Swimming Pool from above, 21st Century Museum of Contemporary Art.jpg",
  "21 世紀美術館《泳池》",
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/48/Swimming_Pool_from_above%2C_21st_Century_Museum_of_Contemporary_Art.jpg/960px-Swimming_Pool_from_above%2C_21st_Century_Museum_of_Contemporary_Art.jpg"
);
const matsuBaishinji = pic(
  "Baishinji-station.JPG",
  "梅津寺站與瀨戶內海岸",
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8f/Baishinji-station.JPG/960px-Baishinji-station.JPG"
);
const matsuMuseum = pic("Saka-no-ue-no-kumo Museum.jpg", "坂上之雲美術館", "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a5/Saka-no-ue-no-kumo_Museum.jpg/960px-Saka-no-ue-no-kumo_Museum.jpg");

export const dayPhotos: Record<string, DayPhoto[][]> = {
  sendai: [
    [sendaiKotodai, sendaiStation],
    [sendaiJozenji, sendaiNishi],
    [sendaiHitome],
    [sendaiTsutsuji, sendaiAnpanman],
    [sendaiHirose, sendaiIchiban],
    [sendaiMedia, sendaiCastle],
    [sendaiStation],
  ],
  sapporo: [
    [sapporoStation, sapporoOdori],
    [sapporoShrine, sapporoTorii],
    [sapporoNakajima, sapporoMoiwa],
    [sapporoOtaru, sapporoOdori],
    [sapporoShiroi, sapporoTram],
    [sapporoNijo, sapporoTVTower],
    [sapporoStation],
  ],
  kanazawa: [
    [kanazawaChaya, kanazawaChaya2],
    [kanazawaKenroku, kanazawaCastle],
    [kanazawaSai, kanazawaMuseum],
    [kanazawaCastle, kanazawaOyama],
    [kanazawaKazue, kanazawaOmicho],
    [kanazawaChaya, kanazawaGold],
    [kanazawaStation],
  ],
  matsuyama: [
    [matsuStation, matsuTram],
    [matsuCastle, matsuKeep],
    [matsuDogo, matsuDogoNight],
    [matsuBansui, matsuBansuiIndoor],
    [matsuOkaido, matsuGintengai],
    [matsuBaishinji, matsuMuseum],
    [matsuStation],
  ],
};
