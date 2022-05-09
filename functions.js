window.addEventListener('load', init);

const levels = {
  easy: 15,
  medium: 10,
  hard: 5
}
let level = levels.medium;
let time = level;
let score=0;
let highscore=0;
let isPlaying;

const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highscoreDisplay = document.querySelector('#highscore');
const bioDisplay = document.querySelector('#bio');
const pictureDisplay = document.querySelector('#picture');

const players = [
'Kareem Abdul-Jabber',
'Ray Allen',
'Giannis Antetokounmpo',
'Carmelo Anthony',
'Nate Archibald',
'Paul Arizin',
'Charles Barkley',
'Rick Barry',
'Elgin Baylor',
'Dave Bing',
'Larry Bird',
'Kobe Bryant',
'Wilt Chamberlain',
'Bob Cousy',
'Dave Cowens',
'Billy Cunningham',
'Stephen Curry',
'Anthony Davis',
'Dave DeBusschere',
'Clyde Drexler',
'Tim Duncan',
'Kevin Durant',
'Julius Erving',
'Patrick Ewing',
'Walt Frazier',
'Kevin Garnett',
'George Gervin',
'Hal Greer',
'James Harden',
'John Havlicek',
'Elvin Hayes',
'Allen Iverson',
'LeBron James',
'Magic Johnson',
'Sam Jones',
'Michael Jordan',
'Jason Kidd',
'Kawhi Leonard',
'Damian Lillard',
'Jerry Lucas',
'Karl Malone',
'Moses Malone',
'Pete Maravich',
'Bob McAdoo',
'Kevin McHale',
'George Mikan',
'Reggie Miller',
'Earl Monroe',
'Steve Nash',
'Dirk Nowitski',
'Hakeem Olajuwon',
'Shaq',
'Robert Parish',
'Chris Paul',
'Gary Payton',
'Bob Petitt',
'Paul Pierce',
'Scottie Pippen',
'Willis Reed',
'Oscar Robertson',
'David Robinson',
'Dennis Rodman',
'Bill Russell',
'Dolph Schayes',
'Bill Sharman',
'John Stockton',
'Isiah Thomas',
'Nate Thurmond',
'Wes Unseld',
'Dwyane Wade',
'Bill Walton',
'Jerry West',
'Russell Westbrook',
'Lenny Wilkens',
'Dominique Wilkins',
'James Worthy'
];

const bio = [
  'Kareem Abdul-Jabber may be the most decorated player of all time. 6 MVPs, most of all time; 19 All Star appearances, most of all time. 38000+ career points, you get the picture? 2 FMVPs, 15 All-NBA appearances, 11 All-defense appearances, 4 blocks titles, 2 scoring titles, 1 rebounding title. "The Captain" was viewed as the near consensus GOAT before Michael Jordan arrived, of course he belongs on the NBA 75.',
  'Ray Allen was the greatest 3 point shooter before Stephen Curry. 10 All Star appearances, 2 All-NBA teams, and while he does have a championship being the lethal sharpshooter for the Celtics Big 3 in 2008 alongside Kevin Garnett and Paul Pierce, his 2001 Milwakee Bucks were 1 game away from the NBA finals, and probably had the best chance out of any Eastern Conference team to dethrone the Shaq-Kobe Lakers, which gets him a spot in the NBA 75.',
  'A new addition to the NBA 75, Giannis "The Greek Freek" Antetokounmpo is one of the few players on the NBA 75 still playing, but he has already cemented his legacy with his freakish athleticism and elite defense. After earning 2 MVPs and a DPOY, along with a spectacular Finals run that earned him his first championship and FMVP, Giannis has his place in history already written, even as he keeps on writing it.',
  'Carmelo Anthony',
  'Nate Archibald',
  'Paul Arizin',
  'Charles Barkley',
  'Rick Barry',
  'Elgin Baylor',
  'Dave Bing',
  'Larry Bird',
  'Kobe Bryant',
  'Wilt Chamberlain',
  'Bob Cousy',
  'Dave Cowens',
  'Billy Cunningham',
  'Stephen Curry',
  'Anthony Davis',
  'Dave DeBusschere',
  'Clyde Drexler',
  'Tim Duncan',
  'Kevin Durant',
  'Julius Erving',
  'Patrick Ewing',
  'Walt Frazier',
  'Kevin Garnett',
  'George Gervin',
  'Hal Greer',
  'James Harden',
  'John Havlicek',
  'Elvin Hayes',
  'Allen Iverson',
  'LeBron James',
  'Magic Johnson',
  'Sam Jones',
  'Michael Jordan',
  'Jason Kidd',
  'A new player for the NBA 75, Kawhi "The Klaw" Leonard is a 2-way superstar who brings value to any team he is on. Even though he has not retired yet, what he lacks in longevity he more than makes up for in volume. 2 Finals MVPs on 2 different teams; 2 DPOYs, and being one of only 2 perimeter players (Sidney Moncrief) to win it multiple times; his best season saw him score over 25 points per game. Whatever you want him to do, he can, proving why he is on this elite list.',
  'Damian Lillard',
  'Jerry Lucas',
  'Karl Malone',
  'Moses Malone',
  'Pete Maravich',
  'Bob McAdoo',
  'Kevin McHale',
  'George Mikan',
  'Reggie Miller',
  'Earl Monroe',
  'Steve Nash',
  'Dirk Nowitski',
  'Hakeem "The African Dream" Olajuwon was drafted before Michael Jordan and no one gives the Rockets crap for it. One of the great 2 way players, he has the highest career ppg average out of anyone who has won multiple DPOY awards. Only player to win MVP, DPOY, and FMVP all in the same season. However, his true brilliance shines in the playoffs, where he dominated all his great comtemperaries like David Robinson, Patrick Ewing, and Shaq to have an unquestionable position in the NBA 75',
  'Shaq',
  'Robert Parish',
  'Chris Paul',
  'Gary Payton',
  'Bob Petitt',
  'Paul Pierce',
  'Scottie Pippen is the greatest 2nd option in league history. Michael Jordan may be the conseneus GOAT, but he has never won a playoff series without Pippen. One often forgetten part of Bulls history is the 93-94 season, their first year without Jordan, they were still a 55 win team, finished 3rd in their conference, Pippen was 3rd in MVP voting, and were 1 game away from the Eastern Conference Finals. That is more than enough to make the NBA 75. ',
  'Willis Reed',
  'Oscar Robertson',
  'David Robinson',
  'Dennis Rodman may be the greatest rebounder in NBA history. He has 7 consecutive rebounding titles, which is an NBA record that may never be broken. After the departure of Horace Grant left a hole in the forward position in Chicago, Rodman helped the Bulls secure a 2nd three-peat, and was arguably the best player during the 1996 NBA finals series against the SuperSonics, which cements his place in the NBA 75.',
  'Bill Russell',
  'Dolph Schayes',
  'Bill Sharman',
  'John Stockton',
  'Isiah Thomas',
  'Nate Thurmond',
  'Wes Unseld',
  'Dwyane Wade',
  'Bill Walton',
  'Jerry West',
  'A new addition for the NBA 75, Russell Westbrook, for a 5 year period, averaged a 26/10/10 statline. Not only did Westbrook average a triple double for a season, a feat that had not been accomplished since the 70s, he did it 4 times. He has a MVP, he has 2 scoring titles, 3 time assist leader, 9 time All-Star, and 9 time All-NBA, including 2 first teams. Despite his recent "Westbrick" label, the accomplishments speak for themselves, including NBA 75.',
  'Lenny Wilkens',
  'Dominique Wilkins',
  'James Worthy'
]

const pic = [
'https://cdn.nba.com/manage/2019/03/kareem-abdul-jabbar-iso-1981.jpg',
'https://images2.minutemediacdn.com/image/fetch/w_2000,h_2000,c_fit/https%3A%2F%2Fallucanheat.com%2Fwp-content%2Fuploads%2Fgetty-images%2F2017%2F07%2F450526156.jpeg',
'https://e0.365dm.com/21/07/768x432/skysports-nba-milwaukee-bucks_5453778.jpg?20210721061600',
'https://www.denverpost.com/wp-content/uploads/2017/02/carmelo-anthony1.jpg',
'https://cdn.vox-cdn.com/thumbor/PBW2biGQTs8CN0vVTXNzWxq5A94=/0x0:2430x3600/1200x800/filters:focal(920x760:1308x1148)/cdn.vox-cdn.com/uploads/chorus_image/image/67059548/478993340.jpg.0.jpg',
'https://cdn.vox-cdn.com/thumbor/2Lm3uaE1NSp8OynvFP5SBENHZJA=/0x204:908x715/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/48796939/Paul_Arizin.0.0.png',
'https://cdn.nba.com/manage/2021/09/charlesbarkley-1568x882.jpg',
'https://imasportsphile.com/wp-content/uploads/2018/10/Rick-Barry-1.jpg',
'https://www.opencourt-basketball.com/wp-content/uploads/2021/03/elgin-baylior-scaled.jpg',
'https://cdn.nba.com/manage/2017/08/Dave20Bing20pregame20warmup.jpg',
'https://cdn.vox-cdn.com/thumbor/MwWnTnawJSmYYWrEeWm0cZbpU7E=/0x867:2048x2232/1200x800/filters:focal(0x867:2048x2232)/cdn.vox-cdn.com/uploads/chorus_image/image/45169916/1386004.0.jpg',
'https://www.billboard.com/wp-content/uploads/media/kobe-bryant-1999-lakers-billboard-650.jpg?w=650',
'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2021%2F09%2F23%2FWilt-Chamberlain.jpg',
'https://cdn.nba.com/manage/2020/10/Bob20Cousy20dribbles20iso-scaled-e1623071791520.jpg',
'https://www.si.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTczOTk1ODk4MDU1OTU5ODU5/cowens0716.jpg',
'http://images.thepostgame.com/assets/public/GettyImages-Billy-Cunningham88024630-BP.jpg',
'https://ftw.usatoday.com/wp-content/uploads/sites/90/2018/05/gty_960665210.jpg?w=1000&h=600&crop=1',
'https://imageio.forbes.com/specials-images/imageserve/620fa530f78380625918b0a0/0x0.jpg?format=jpg&width=1200&fit=bounds',
'https://nypost.com/wp-content/uploads/sites/2/2021/12/dave-debusschere.jpg?quality=80&strip=all&w=744',
'https://www.google.com/url?sa=i&url=https%3A%2F%2Fripcityproject.com%2F2020%2F05%2F03%2Fportland-trail-blazers-jordan-drexler%2F&psig=AOvVaw3WqRwtfKYyyQTGQ9VMuLsX&ust=1648159621610000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLiGtJqf3fYCFQAAAAAdAAAAABAT',
'https://cdn.vox-cdn.com/thumbor/XDMfzthYfwW5YY8NOx6giPMu5WQ=/0x0:594x368/1200x800/filters:focal(246x33:340x127)/cdn.vox-cdn.com/uploads/chorus_image/image/69241110/duncan.0.jpg',
'https://nypost.com/wp-content/uploads/sites/2/2021/06/Kevin-Durant-4.jpg?quality=80&strip=all',
'https://netswire.usatoday.com/wp-content/uploads/sites/9/2020/03/usatsi_11837666.jpg?w=1000&h=600&crop=1',
'https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2022%2F0124%2Fr965491_1296x729_16%2D9.jpg&w=570&h=321&format=jpg',
'https://nypost.com/wp-content/uploads/sites/2/2021/12/walt_frazier_knicks_1.jpg?quality=80&strip=all',
'https://cdn.vox-cdn.com/thumbor/16rdxNZAe9h6t1TGLz6CT1m52iE=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23008903/1216163912.jpg',
'https://cdn.vox-cdn.com/thumbor/5uMph3S3_GunE3TSU_JMqDDlNaA=/0x0:2398x3600/1200x800/filters:focal(747x861:1129x1243)/cdn.vox-cdn.com/uploads/chorus_image/image/56092479/GettyImages_473165532.0.0.jpg',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrxFHHfHUa0RGvYbSuoKtUZijdWYjpOhaamw&usqp=CAU', 
'https://img.bleacherreport.net/img/slides/photos/004/425/864/e36ddd6de1c8602778404fa3e792196c_crop_exact.jpg?w=2975&h=2048&q=85',
'https://www.gannett-cdn.com/presto/2019/04/26/USAT/84b38c76-c2a5-4020-b329-f1f925333063-2019-04-25_John_Havlicek.JPG?crop=1811,1305,x797,y0',
'https://images2.minutemediacdn.com/image/fetch/c_fill,g_auto,f_auto,h_2142,w_3200/http%3A%2F%2Fhoopshabit.com%2Fwp-content%2Fuploads%2Fgetty-images%2F2018%2F08%2F515426282.jpeg',
'https://media.gq.com/photos/61e98944c0759352f85928d3/master/pass/GettyImages-121661985.jpg',
'https://cdn.vox-cdn.com/thumbor/950u5a9ddtXpV_1zQAg-NbxVFZc=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/11435183/963168162.jpg.jpg',
'https://s22928.pcdn.co/wp-content/uploads/2018/05/Magic-Johnson-4.jpg',
'https://cdn.vox-cdn.com/thumbor/vwGbdjmS-9wlFcP4776gGWRspTY=/0x0:2400x2975/1200x800/filters:focal(915x757:1299x1141)/cdn.vox-cdn.com/uploads/chorus_image/image/70334174/628293728.0.jpg',
'https://img.bleacherreport.net/img/images/photos/003/875/045/f747eca6d77ef4822de3a4c98bb4324e_crop_north.jpg?1593954134&w=3072&h=2048',
'https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2018%2F0904%2Fr43196_2_1296x729_16%2D9.jpg',
'https://i.insider.com/5c2e9b52bd7730593a4e5fe4?width=1136&format=jpeg',
'https://cdn.nba.com/manage/2022/01/GettyImages-1361875018-scaled-e1642029052834.jpg',
'https://e00-marca.uecdn.es/imagenes/2013/08/13/baloncesto/nba/noticia/1376395183_extras_ladillos_1_0.jpg',
'https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.cleveland.com/home/cleve-media/width2048/img/cavs_impact/photo/malone-c134fda8caa0af44.jpg',
'https://media.gq.com/photos/55f7333e2de2e54e38605818/16:9/w_2560%2Cc_limit/moses-malone-sixers.jpg',
'https://cdn.vox-cdn.com/thumbor/Vle91QrmKzDEpPzHSXxibK0t38Y=/13x140:2398x3600/1200x800/filters:focal(1002x659:1384x1041)/cdn.vox-cdn.com/uploads/chorus_image/image/52591783/86461663.0.jpeg',
'https://images2.minutemediacdn.com/image/fetch/c_fill,g_auto,f_auto,h_389,w_590/http%3A%2F%2Fhoopshabit.com%2Fwp-content%2Fuploads%2Fgetty-images%2F2017%2F08%2F87852305-new-york-knicks-vs-boston-celtics.jpg-850x560.jpg',
'https://celticswire.usatoday.com/wp-content/uploads/sites/39/2019/12/kevin-mchale-boston-celtics-1986.jpg?w=1000&h=600&crop=1',
'https://cdn-qa.nba.com/manage/2022/01/George-Mikan3A-scaled-e1643599936180.jpg',
'https://firstsportz.com/wp-content/uploads/2021/10/Reggie-Miller-1200x900.jpg',
'https://www.ipzusa.com/wp-content/uploads/2018/04/Earl-Monroe.jpg',
'https://cdn.vox-cdn.com/thumbor/SEyPwlAyVZy62pmarwy1h89yLt8=/0x4:600x404/1200x800/filters:focal(0x4:600x404)/cdn.vox-cdn.com/photo_images/1347393/23-Oct-10_103931147CP031_Golden_State.jpg',
'https://www.nj.com/resizer/3LmzwBjzrKqg7r7F3DDtXOrPa4w=/1280x0/smart/advancelocal-adapter-image-uploads.s3.amazonaws.com/image.nj.com/home/njo-media/width2048/img/nets_impact/photo/dirkjpg-61918d3d903fc78b.jpg',
'https://cdn.vox-cdn.com/thumbor/ZsyfOGA3HtnVV4c-b8ITLIL-HEk=/0x0:1998x3000/1400x933/filters:focal(1039x907:1357x1225):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/69865615/88629375.0.jpg',
'https://i.ytimg.com/vi/nsEroR5nv6Y/hqdefault.jpg',
'https://i0.wp.com/www.fifteenminuteswith.com/wp-content/uploads/2020/01/robert-parish2.jpeg?resize=630%2C538&ssl=1',
'https://www.nydailynews.com/resizer/n2jlJjD0xzcm-XHoH0hM3jjshmw=/1200x0/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/I67CBOXABRCIMGF3WCROS4QJEI.jpg',
'https://img.bleacherreport.net/img/images/photos/001/727/525/1719449_crop_north.jpg?1338589866&w=3072&h=2048',
'https://images.squarespace-cdn.com/content/v1/59b8670b2aeba5bcafe00bc9/1606956963694-5BDWKGEZAU2GH2TXOP68/bob+Pettit.jpeg?format=1000w',
'https://cdn.vox-cdn.com/thumbor/iMzAMMhsVfpTcmiW7EHra6PgoVc=/0x0:4510x3006/1200x800/filters:focal(2375x228:3095x948)/cdn.vox-cdn.com/uploads/chorus_image/image/58356955/169837869.jpg.0.jpg',
'https://a.espncdn.com/photo/2020/0514/r698595_1296x729_16-9.jpg',
'https://cdn.nba.com/manage/2021/08/willis-reed-1970-all-star-game-mvp.jpg',
'https://img.bleacherreport.net/img/images/photos/001/582/242/1ablog-oscarrobertsonx-large_original_crop_north.jpg?1329938671&w=3072&h=2048',
'https://cdn.vox-cdn.com/thumbor/TOfvKmKdTKbHgVseiAC2iFJatLk=/0x0:2446x3598/1200x800/filters:focal(933x359:1323x749)/cdn.vox-cdn.com/uploads/chorus_image/image/70520051/936528076.0.jpg',
'https://www.chicagotribune.com/resizer/MHUETWU2pNiaerMTtMgC3HWJdDg=/1200x0/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/ZUHZQUBGLFEARILASQZPLP7KLU.jpg',
'https://vault.si.com/.image/t_share/MTY5MTAwNTI1NDcwNTU3NjU5/bill-russell-getty2jpg.jpg',
'https://a3.espncdn.com/combiner/i?img=%2Fphoto%2F2015%2F1210%2Fr34807_1296x729_16%2D9.jpg',
'https://celticswire.usatoday.com/wp-content/uploads/sites/39/2021/05/Bill-Sharman-Celtics-011855.jpg',
'https://static.independent.co.uk/2022/01/24/13/newFile-3.jpg?quality=75&width=982&height=726&auto=webp',  
'https://assets-cms.thescore.com/uploads/image/file/329283/w640xh480_GettyImages-967231548.jpg?ts=1570501721',
'https://cdn.vox-cdn.com/thumbor/N22_iDTKnSMzhji0oX1Ri8-Qgqg=/0x3:160x110/1400x1050/filters:focal(0x3:160x110):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/50134427/Nate.0.0.jpg',
'https://nypost.com/wp-content/uploads/sites/2/2020/06/wes-unseld-dead-74.jpg?quality=80&strip=all',
'https://heatnation.com/wp-content/uploads/2019/12/USATSI_12551301-e1577484075868.jpg',
'https://cdn.vox-cdn.com/thumbor/w_i8Bih9718mtzwFjgj3wT2OIJ0=/0x517:2430x3600/1400x933/filters:focal(1105x804:1493x1192):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/66899544/482235542.jpg.0.jpg',
'https://mk0thesportsdro9ou9v.kinstacdn.com/wp-content/uploads/2019/04/Jerry-West-pp.jpg',
'https://www.si.com/.image/t_share/MTgwMjA1NjM1MzIzODMxNjQw/westbrook-russell.jpg',
'https://www.usab.com/-/media/004ec52d66a94e49a61ed8dd5d8044cc.jpg?as=1&iar=1&sc_lang=en&hash=A0F16666072CA293831061D638D2CBCD',
'https://www.nydailynews.com/resizer/riwn2gRT8vgpcXbJmKqZTSlrimE=/415x309/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/QZDXSRNVP4LHZST73JJWMN3M5A.jpg',
'https://images2.minutemediacdn.com/image/fetch/w_2000,h_2000,c_fit/https%3A%2F%2Flakeshowlife.com%2Fwp-content%2Fuploads%2Fgetty-images%2F2018%2F08%2F1301565618.jpeg',
]

function init() {
  seconds.innerHTML = level;
  showWord(players);
  wordInput.addEventListener('input', startMatch);
  setInterval(countdown, 1000);
  setInterval(checkStatus, 50);
}

function showWord(players) {
  let randIndex = Math.floor(Math.random() * players.length);
  currentWord.innerHTML = players[randIndex];
  showBio(randIndex);
  showPic(randIndex);
}

function showBio(randIndex) {
  bioDisplay.innerHTML = bio[randIndex];
}

function showPic(randIndex) {
  pictureDisplay.src = pic[randIndex];
}

function startMatch() {
  if(matchWords()) {
    isPlaying = true;
    time=level + 1;
    showWord(players);
    wordInput.value = '';
    score++;
  }
  if(score == -1){
    scoreDisplay.innerHTML = '0';
  } else {
    scoreDisplay.innerHTML = score;
  }
  highScore(score);
}

function matchWords() {
  if(wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!';
    return true;
  }
  else {
    message.innerHTML = '';
    return false;
  }
}

function countdown() {
  if(time>0){
    time--;
  }else if(time === 0){
    isPlaying = false;
  }
  timeDisplay.innerHTML = time;
}

function checkStatus() {
  if(!isPlaying && time == 0) {
    message.innerHTML = 'Game Over!';
    bioDisplay.innerHTML = "This box will highlight why each player is so great and (James) Worthy of being recognized as some of the greatest basketball players of all time";
    score = -1;
  }
}
function highScore(score) {
  if(score>highscore) {
    highscore = score;
    highscoreDisplay.innerHTML = highscore;
  }
}
