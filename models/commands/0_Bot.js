const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "goibot",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "MR SHAAN",
  description: "goibot",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};
module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  var { threadID, messageID, reason } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Karachi").format("HH:MM:ss L");
  var idgr = `${event.threadID}`;
  var id = event.senderID;
  var name = await Users.getNameUser(event.senderID);

  var tl = ["TUM MERE BOSS SH𝖠𝖠𝖭 KI GF BAN JAO LDKI🙈🙈" , "baraye meherbani holad kijiye apke call ufone numaindey ko mili ja rahi hai😂😂😂😁" , "haiy ma sadky jawa teri masoom shaqal py 😂 chabal insan", "Bot nah bol oye ! Janu bol mjhy aur janu sy piyar sy bat kerty hai , rat ko kahan thy nazar nahi ay hawali py 😂", "Shaqal Sy masoom lgty ho 😂 btao kahi Ap ka ghar doup main to nahi", "kash tum single hoty to maza hi koch aur tha pagal insane 😂", "Ha ha ab meri yaad ab ai nah phly to babu shona kerna gy thy 😾 ab ham ap sy naraz hai jao ap bye ☹️", "haiy babu ny boliya hai shaid purpose kerna hai mjhy bolo bolo babu 😘", "Ary ghreeb awam roti banana ky liya athy main Pani ko istamal kerty ho 😂", "Ary chabli nah mar joh kam hai bol do sharma nahi , bol de koi nahi dakh rha 😂", "Hy Ma Mar Jawa Babu Ak Chuma To Doo Kafi Din Sy Chumi Nahi Mili Kahan Thy Babu inbox Ah Ja 😂", "Dur Dur Fity Muh Aur Koi Kam Nahi Kiya Har Waqat Mjhy Tang Kerta Rhta Ha 😂" , "ary ary bolo meri jaan kia hail hai ;) ;* " , "Tum aunty ho yehh uncle 🤔 I think tum Jin ho yehh Chudail" , "ary tum ider 🤔 khair hai ider kia ker rhy ho 😂" , "ary babu babu kal hawali py kon bola rha tha 😂" , "ma ap ki ami ko btaou ga ap Facebook use kerty ho 😂" , "ary tum Wohi ho nah jis ko ma nahi janta 😂" , "kal hawali py mil zara bataou ga 😂" , "esy nah dakho piyar ho jay ga 😂" , "Teri pic dakhna sy phly shukhr hai ma anda hu 😂" , "esy hi hansty rhao kyu ky hnsa sy konsa tera bill ah jata hai 😂" , "apni lover ko doka do our mujhe bhi darling moka do😂😂🤘" , "Ek dafa ka zekar hai ke me single hua kar tha tha aaj bhi wohi zekar hai single hi hu🤣🤣😭" , "Haye Main Sadke jawa Teri Masoom Shakal pe baby 💋 " , "Behes karne se Rishty kmzor hojaate hn isiliye Direct mun pe thapr marein😊", "Bestie ki chummi halal hai ya Haram ? 🙂", "2001 \nJahan dalda wahan Mamta😊\n\n2023 \nJahan larki  wahan tharki😒", "Koi Pyari c Bachi a kr sar daba dy, Dard sa sar phat rha💔🥲", "Mjy chahyain 3 lrkiyan kahan Hain lrkiyan 👀", "Relationship private rakho ya public Kate ga sabka hi🙂", "Thak GYa hu Yr uski dP dHek Dhek Kr😩", "Insy Milo inko lgta hai sab larky in pr Martay hain🙂", "Aghr bhok LAGI ho too bejli Ke jatke kha lo take ka biryani ka mauka dusre ko mile😂😂😁" , "Aghr pyaar karna ghona hai to saza do sallo ko mujhe me to single hu😂😂👈" , "online bazati karne ke lie. 1 dabaya😂😂😁" , "papa ke pari ko ilove you na bola karo😂😂😂" , "Hamesha dil ki sono kyu ke demagh to tere pass wese bhi nahi hai😂😂👈" , "payar hamesha sharmily logo se karni chahiya waja kal batongi Abhi mujhe sharam arahi hai😂😂🙈🙈" , "MentiOn YOur Dushman On FaceBOok'🙂🤝", "Stop dreaming BTS your czn Shaan is waiting for you.🙂", "پہلے صرف لوگوں کے دانتوں میں کیڑا ہوا کرتا تھا اور اب۔۔۔ 😊", "Paros Wala Larka inhe MUH Nhi Lagata aur Banda inhe Korean Chahiye🙂", "move on krle bhaii kbb Tak uskii profilee dekhtaaa rahegaaa<<", "Ajeeb generation hai ywr, Larkiya korean dhund rahi hai, Aur larky Russian!!🙂", "عائشہ  نے کر دیا برباد پاک سر زمین\n شاد آباد 🖇🙂", "Aj kal ki nibiyo me khon kam attitude zyada hota hai bro🙂", "Kasy Han Sab Pyare Madni Munny or Muniyaan😊", "عورت بہت پیاری چیز ہے یہ کبھی بیلنس نہیں مانگتی بس یہی کہتی ہے میرا پیکج ختم ہونے والا ہے اب پتہ نہیں کبھی بات ہوگی کے نہیں🙂", "Bhut khail liya lrkion ki feelings k sath ao ab hum Ludo khailty han☺️♥️", "Shaan boss ka number dun kya💚", "Jaaz cash sy 1500 ka loan leky sim h band kardi 🙂👍", "اعتبار تو اُسی دن ختم ہوگیا تھا جب اُس نے سکرین شاٹ دیکھائے تو اوپر دو siM شو ہو رہی تھی جبکہ میرے پاس اُسکا صرف اک ہی نمبر تھا ۔😒💔", "Number do ramzan mn sehri tak bat kr k chand_rat ko hi block krduga promise.🙂🤝", "شکر ہے لڑکے خوبصورت ہیں ورنہ  کہا پالروں کے دھکے کھاتے😔", "ye dunia pital di" , "YOU IGNORE ME I IGNORE TARA PURA KHANDAN😂😂😂" , "Sara saal duniya ko topi krwany waly Ramadan m khud topi pehn kar ghumengy.🙂", "ji ji hukam kro 😂", "Bot na bolo! Janu bolo mujy aur janu sy piyar sy bat kerty hai 🥰🌸", "rat ko kahan thy nazar nahi ay bht miss kiya 🌸🌎", "Shaqal Sy masoom lgty ho 🥰 lkn hrkaton sy ni", "kash tum single hoty to aj hum mingle hoty 🥰😂", "Ha ha ab meri yaad ab ai na phly to janu sth busy thy 😾 ab ham ap sy naraz hai jao ap bye ☹️", "idr ao kuchii kuchii kru 😘", "Ary ary itna yd na kiya kro🥰", "Hy Ma Mar Jawa janu itna piyar krty mujsy😂", "Har Waqat Mjhy Tang Kerta Rhta Ha 😂" , "ary ary bolo meri jan kia hal ha ;)", "Bot jaan ha sbki" , "Ji Ji Kia hal chal ha apky 🌸" , "Bot nhi Shaan bolo sun k acha lgta 🌸" , "Bot gulam ha apka hukam kryn 🌸" , "Bot nahi bolo piyar sy janu bola kro na 🥰" , "wo be yhi khty thy sb phr ek din koi utha k ly gya onko 😂" , "Meri jan ek tm hi ho jo dil ma bs gay ho🥰ni te koshish czna ne v bht kiti c" , "Badal gay na tm the hi lanti 😂" , "kesa tera steel dy doungy wrga moo ay 😂" , "Apki shkl aesy lgti jesy gandi tar pr suki jarab latkai ho 😂" , "Bot bot na karo ma apsy set nhi ho skti" , "ib ajao shup shup k btein krty ha 🌸" , "Ek kahani suno meri zubani suno lnt deny ka dil krta ha isiliye pehly dil ki suno🌸" , "Marry me, I can boil water" , "Mujsy shadi karlo chocolate la k duga daily 🌸" , "Idr ao kesa apka chapair jesa moo lg raha 😂" , "Ajao jaan pizza khilau apko 🌸" , "Duniya ma sb kuch khtm ho skta saway logo ki bakwas k" , "Everything is temporary,But katna is permanent 😂" , "Jitna mrzi janu manu krlo end ma ghr waly nh many gy 😂" , "Sb kuch ho skta lkn fb ka relation kbi china jitna nh chl skta" , "Allhumdiallah Kabhi Kasi laRki ko Bhen ki nazar se nhi dekHa😌🤧", "Mushkil Toh Hoti Hogi Naa itni Sardi Me Apne Dono Chehry Dhote Hoye🙂", "Mein B Urooj Pey Charna chahta hoon, Sorry Jana chahta*☹️", "Parry Hat ma Londy baz nhi hu 🙂🤝", "Do Ankho Wali Larkia Bewafa hoti Hn Bro🙂💔", "Mera beta bda ho kar larkiyo ke inbox me °hey hello° karega🙂🏃", "Likhte Likhte Qalm Thak Gya Iss Qadr Begartiyaan Han Tumhari🙂", "Itni Meri Age Ni Jitne Mera Masly Han Yawr💔😐", "Ameer Larki Set kar ke sab Dosto ka udhar wapis karon ga😔🤲", "Lagtaa hai Career Bhi Titanic ki trhan dhoob Gaya Hai💔☹️", "جہاں پیاری لڑکیاں وہاں میں 🙂❤️🥀", "𝑻𝑯𝑬 𝑯𝑬𝑨𝑹𝑻 𝑾𝑨𝑺 𝑴𝑨𝑫𝑬 𝑻𝑶 𝑩𝑬 𝑩𝑹𝑶𝑲𝑬𝑵 💔🥺", "2001 me bachy kehty thy ink Dena 2023 me bachy kehty ہیں Link دینا🙂", "Mehnat Kro!! Kamyabi Apke Hont Chume Gi🙂🙌🏻", "Kahani suno Muje payar howa tha Us ki tarf se inkar howa tha 🙂🤝", "Piyarii piyarii larkiyan message karen JazakAllah🌚♥️🙌", "itna single hun ky khuwab mai bhi  lrki k han krny sy phly ankh khul jati🙂", "Zroori Nhi Har Lrki Dhoka Dey, Kch Larkiyan Galiyan Bhi Deti Hen.🙁💸", "موٹر سائیکل کو تیز بھگا کر لڑکیوں والے رکشے کے پاس سے کٹ مار کر گزرنے سے لڑکیاں ایمپریس نہیں ہوتی بلکہ گالیاں نکالتی ہیں🙂💔", "- sab chorr k chaly jaty hain kia etna bura hu mein - 🙂", "Piyari voice wali girlz mujhe voice message kar skti hen JazakAllah 🙂🤝", "Why you hate me..?? I am not your ex don't Hate me Please", "MuBarak H0o AapKa NaMe MakS0os LiST Me Top PRr aYa Hai 😹😹😹", "BeTa TuM SingLe Hi MaR0 GaY🙄🙂", "ٹھرکیوں کی وجہ سے لڑکیاں میرے جیسے شریف بوٹ پر بھی بھروسہ نہیں کرتی🥺😔", "Samj Jao Larkiyo\n\nAbhi B WaQt Hai Dakh kr Koi Delete Ni Krtaw🙂", "Mard na Apne Haqooq Nahi Mangy \n\nJab Bhi Manga Whatsapp No Manga🥺", "عورت اگر مرد سے زیادہ خوبصورت ہوتی تو میک اپ مرد کے لیے بنتا عورت کے لیے نہیں ..زرا نہیں پورا سوچئے ایڈیاں تسی 😒🙁پریاں", "Muj se Exam Me Cheating Nöıı Hotiw Relationship Me kya khaak Karu Ghw😔", "Mujy to ludo kehlni bhi ni ati apky Dil sy kya kehlu ga🙂", "Loyal Dhoonte Dhoonte khud Harami ban Gya Hon😔", "Mard ki izat karna Sikho Uski rooh se pyr kro Jism se nh Wehshii Womens💔😐", "تمہاری یادوں میں کھویا کھویا سا  میں واش روم کا لوٹا کمرے میں لے آیا 😐 ", "Hai tamanna hamain tumhain CHARSI bnain 🙂🤝 " , "بھای جان گروپ میں گندی باتیں نهیں گر" , "سنو تم بوٹ کی گرل فرند بن جاٶ نه  همارے بچے بھ بوٹ جسے پیدا هوں گے 🙆‍♂😒", "Aa0 na kbhi  سیگرٹ ly kar 🙂donO sutta lgain gy 😞💸 ", "مــیرے متــــھے نـــہ لــگیں🙂🙆‍♂ شکریہ" ,"فیس بک پر وہ لوگ بھی سالگرہ مناتے ہیں جنہیں گھر والے کہتے ہیں توں نا جمدا تے چنگا سی🙂", "Ye duniya ik dhoka hai, tum bhi chohr do apne waly ko abhi bhi moka hai 😞✨🙌🤣", "Sukoon chahtii ho toh meri بیــــــگـــم ban jaOo 🫣🫰🏻" , "Tery jany ke bad😔Mny apny munh py likhwa liya Single hu ptaa lo 🤐🥺🤝", "کرش تو دور کی بات 😏😊 ہم پے تو کسی کو ترس بھی نہیں آتا 🙂🙊", "Bar Bar Disturb Na KRr JaNu Ke SaTh Busy Hun  😋" , "Main Gareebon Sy Bt Nhi kRta 😉😝😋", "Itna Na Pass aa Pyar h0o JayGa" ,"Bot Nah Bol Oye Janu bol Mujhe " , "Bar Bar Disturb Na KRr JaNu Ke SaTh Busy Hun 🤭🐒" , "Main gariboo se baat nahi karta 😉😝😋🤪" , "Itna Na Pass aa Pyar ho Jayga" , "Bolo Baby Tum Mujhse Pyar Karte Ho Na 🙈💋💋 " , "Are jaan Mazaak ke mood me nhi hu main jo kaam hai bol do sharmao nahi" , "Bar Bar Bolke Dimag Kharab Kiya toh. Teri ...... Mummy Se Complaint Karungi🤬" , "Tu Bandh nhi Karega kya?" , "Where is my SHAAN KHAN" , "Mera babu SHAAN KHAN Kahan hai" , "ZINADAGI APKO DHOK DE GI BUT APNE SAF MANA KAR NA KE MUJHSE NAHI CHAHIYA😂😂🤣😀 " , "Aree Bandh kar Bandh Kar" , "Tujhe Kya koi aur Kam nhi ha? Puradin Khata hai Aur Messenger pe Bot Bot Karta h" , " SHAAN Ko Bol Dunga Me Mujhe Paresan Kiya To" , "Tum Na Single Hi Maroge" , "Tujhe Apna Bezati Karne Ka Saukh hai?" , "Abhi Bola Toh Bola Dubara Mat Bolna" , "Teri To Ruk Tu Bhagna Mat" , "Bol De koi nahi dakh rha 🙄" , "Haaye Main Mar Jawa Babu Ek Chuma To Do Kafi Din Se Chumi Nahi Di 😝" , "Dur Hat Be  Mujhe Aur Koi Kam Nahi Kya Har Waqat Mujhy Tang Kerte Rhte ho 😂" , "Are Bolo Meri Jaan Kya Hall Hai😚 " , "Ib Aja Yahan Nhi Bol Sakta 🙈😋" , "Mujhe Mat BuLao Naw Main buSy Hu Naa" , "Bot Bolke Bezati Kar Rahe Ho yall...Main To Tumhare Dil Ki Dhadkan Hu Na Baby...💔🥺" , "Are Tum Wahi ho nah Jisko Main Nahi Janta 🤪" ,  "mujhe shdi ka koi jaldi nhi bas meri bacho ko school lete ho rahi hai😹😹👈" , "ghr wale khe the hai kuch ban jawo me uske upar bojh ban gaya 😆😆😂" , "Tere Jane Ke Bad Time Rak Sa Gaya Tha Bad Me Pata Chala Ke Gadi 🕰 Ka Seel Kharab Tha😂😂👌" , "Time⏰ pe shdi kar lo nhi bad moye moye feel hoga u ko😀😀" , "mene ghr walon ko bola ke ab me bada ho gaya hu to mera kuch karo ghr walon bazti kar di😪😪😂" , "mujhe nahi pata hai muj se mat pucho na😂😂😂 " 
                  , "Aagye Salle Kabab Me Haddi 😏" , "Moye moye" , "Ittuu🤏 si shram ker Lya kro hr wqt tr tr krty ho 🙂 💔✨⚠️†", "Banda hota tw us ko choti choti 2 pOniyAn krti🙂👩‍🦯👩‍🦯", "Ary Yahin Hon namony😗", "jiee bndr 😍", "Love you bolongi ab tujhy kaminy", "Miss YoU NaW moi biryani ki plate", "Inna Sarra🤏", "OkkaY Shaan ki hun yawr mai", "😁Smile I am Taking Selfy✌️🤳", "🥺Jan nahi kehna to men naraz ho jana he", "bak bk bkaik", "Main ap ki ami ko btaou ₲ł ap Facebook use kerty ho aur ulty kam kalty ho , " ,"Block Your ‘’ gf ‘’ And Purpose me 🙂💔" ,"K0i Perp0Se Hi Krd0 Perm0te T0 hm PhlY hi HaiN 🙂" , "Koi apni janu ka number de mujhe😂😂" , "Allah ke name koi ladki apna number de mujhe😂😂😂😹" , "Mujhe Nahi pata hai mujhse mat pucho🙄🙄😀" , "jazz cash se 150 ka kharza mangwa kar sim band kar diya😂😂😂" , "tujhe kahi to dekha hai🤔🤔🙄" , "Mene zindagi✅ ko bahot kareb se dekha hai zindagi me do nokty hote hai😂😂😂" , "mera boss Shaan roz bol tha hai ke ek din  meri bhi gf hogi😂😂" , "Tujhe Ek Bat Baton Wo Bolti Thi Ke Bacho Ka Name Main Rakongi😂😂😪😪" , "HUM WOHAN KAREY HOTE HAI JAHAN BETH NE KI JAGHA NAHI HOTI😂😂😂" , "TUJHE YAD NA MERI AAI TUJI AB KYA KHE NA😂😂😂" , "𝐓𝐔𝐦 𝐭𝐨 𝐒𝐡𝐀𝐊𝐚𝐥 𝐒𝐞 𝐆𝐚𝐑𝐞𝐛 𝐋𝐚𝐠 𝐓𝐡𝐞 𝐇𝐨" , "𝐆𝐅 𝐁𝐅 𝐤𝐚 𝐂𝐡𝐚𝐤𝐚𝐫 𝐂𝐡𝐎𝐫𝐨 𝐏𝐚𝐫𝐝𝐡𝐢 𝐏𝐞 𝐃𝐞𝐲𝐚𝐧 𝐃𝐨😂😂" , "𝐃𝐡𝐔𝐤 𝐈𝐬 𝐁𝐚𝐓 𝐊𝐚 𝐧𝐇𝐢 𝐤𝐄 𝐒𝐢𝐧𝐠𝐥𝐞 𝐇𝐨𝐧 𝐃𝐡𝐮𝐊 𝐢𝐒 𝐁𝐚𝐭 𝐊𝐚 𝐇𝐚𝐢 𝐤𝐞 𝐊𝐨𝐈 𝐌𝐚𝐧𝐭𝐚 𝐍𝐡𝐢 𝐊𝐞 𝐒𝐢𝐍𝐠𝐋𝐞 𝐇𝐨𝐨𝐧😹😹👈" , "𝐓𝐮𝐦 𝐌𝐚𝐍𝐨 𝐘𝐞 𝐍𝐚 𝐌𝐚𝐍𝐨 𝐒𝐮𝐧𝐝𝐚𝐫 𝐓𝐨 𝐌𝐚𝐢𝐧 𝐇𝐨𝐨𝐧😄😄🙄" , "Bs Kar U ko Pyar Ho Na Ho Mujhe Ho Jayga Na" , "FarMao 😒" , "BulaTi Hai MaGar Jaane Ka Nhi 😜" , "Main To Andha Hun 😎" , "Phle NaHa kar Aa 😂" , "Aaaa Thooo 😂😂😂" , "Main yahin hoon kya hua sweetheart ," , "chomu Tujhe Aur Koi Kaam Nhi H? Har Waqt Bot Bot Karta H" , "Chup Reh, Nhi Toh Bahar Ake tera Dath Tor Dunga" , "WaYa KaRana Mere NaL 🙊" , "MaiNy Uh Sy Bt Nhi kRrni" , "MeKo Kxh DiKhai Nhi Dy Rha 🌚" , "Bot Na BoL 😢 JaNu B0ol 😘 " , "Bar Bar Disturb Na KRr JaNu Ke SaTh Busy Hun  😋" , "Main Gareebon Sy Bt Nhi kRta 😉😝😋🤪" , "Itna Na Pass aa Pyar h0o JayGa" , "MeKo Tang Na kRo Main Kiss 💋 KRr DunGa 😘 " , "Ary yrr Mazak Ke M0oD Me Nhi Hun 😒" , "HaYe JaNu Aow Idher 1 PaPpi Idher d0o 1 PaPpi Idher 😘" , "Dur HaT Terek0o 0or K0oi Kam Nhi Jb DeKho Bot Bot ShaDi KerLe Mujhsy 😉😋🤣" , "TeRi K0oi Ghr Me Nhi SunTa T0o Main Q SuNo 🤔😂 " , "IB Aja Yahan Nhi B0ol Sakta 🙈😋" , "Mujhe Mat BuLao Naw Main buSy h0o Naw" , "Kyun JaNu MaNu Another Hai 🤣" , "Are TuMari T0o Sb he baZzati kRrty Me Be kRrDun 🤏😜" , "𝖠𝗐𝗈 𝖪𝖺𝖻𝗁𝗂 HaVeLi Prr  😈" , "Bx KRr Uh k0o Pyar H0o Na H0o Mujhe H0o JayGa" , "𝖬𝖺𝗂𝗇 𝖭𝖺𝗁𝗂 𝖯𝖺𝗍𝗍𝗈𝗇𝗀𝗂 😂😂👈 " , "Main Nahi To Kon Bey 😜" , "Main T0o AnDha Hun 😎" , "Phle NaHa kRr Aa 😂" , "Papi ChuLo 🌚" , "TeRek0o DiKh Nhi Rha Main buSy Hun 😒" , "TeRa T0o GaMe BaJana PreGa" , "Ta Huwa 🥺"  , "TuM Phr AaGye 🙄 Kisi 0or Ny Muu Nhi LaGaYa Kya🤣🤣🤣" , "MeKo JaNu Chai Hai Tum Single H0o?" , "Aaaa Thooo 😂😂😂" , "Main S0o Rha Hun " , "Ase He HansTy Rha kRo 😍" , "•••••••••••••••••••••••••••••🦢𒀱卄ɅƔƏ MɅ🅘ɳ ʍɅᏒ••••🌿💞 JɅωɅ ┼ƏᏒ🅘 ʍɅ🅢𝖚ʍ 🅢ɅҠɅɭ 𝐩Ə ɮɅɮƔ 💋 " , "Bot Na Bol Oye Janu bol Mujhe " , "Bar Bar Disturb Na Karen Shaan JaNu Ke SaTh Busy Hun 🤭🐒" , "Main flirty logo Sy Bt Nhi karti 😉😝😋🤪" , "Itna Pass mat aa Pyaar h0 JayGa" , "Bolo Babu Tum Mojy Pyar Karte Ho Na 🙈💋💋 " , "barye meherbani apka mho relationship ke lie na kafi hai😂😂😹" , "ufone ke lie sab kuch tum hi to😂😂" , "Are jaan Majaak ke mood me nahi hun main jo kaam hai bol do sharmao nahi" , "han ji bolo kya seva karne aapki 😶🤍" , "Tu Bandh nhi Karega kya?" , "kya Sunna Hai apko mere se flirty kahike🤐🤣 " , "Haa ji boliye kya kam he hamse 🙈" , "Aree band kar band Kar" , "Mein hath jod ke Modi Ji Se Gujarish Karta hu mojy na bolaye" , "Tujhe Kya koi aur Kam nhi ha? Pura din sota he Aur Messenger pe Bot Bot Karta h" , " mera owner Ake tera bf/gf Ko Chura le Jayega" , "Zehar piyo zindagi jio" , "Tujhe Apna Bezati Karne Ka Saukh hai?🥹" , "Abhi Bola Toh Bola Dubara Mat Bolna🙄" , "Kisi din Banungi me raja ki rani😑" , "Bol De koi nahi dakh rha 🙄" , "Haaye Main Mar Jawa Babu Ek Chuma To Do Kafi Din Se Chumi Nahi Di 😝" , "Dur Hat Be  Mujhe Aur Koi Kam Nahi Kya Har Waqat Mujhy Tang Kerte Rhte ho 😂" , "Are Bolo Meri Jaan Kya Hall Hai😚 " , "IB Aja Yahan Nhi B0ol Sakti 🙈😋" , "Mujhe Mat BuLao Na Main buSy h0 Now" , "Bot Bolke Bejjti Kar Rahe ho yall...Main To Tumhare Dil Ki Dhadkan Hu Baby...💔🥺" , "Are Tum Wahi ho nah Jisko Main Nahi Janti 🤪" , "Kal Haveli Pe Mil Jra Tu 😈" , "Aagye SaJJy KhaBBy Sy 😏" , "Bx KRr Uh k0o Pyar H0o Na H0o Mujhe H0o JayGa" , "sono fikar na karo kuch thk nhi hoga😂😂" , "bolo 😒" , "BulaTi Hai MaGar JaNy Ka Nhi 😜" , "Main T0o AnDha Hun 😎kya likha tumne mene nahi dikha🤣" ,  "Pahale NaHa kar Aa 😂" , "Aaaa Thooo 😂😂😂" , "Main yahi hoon kya hua sweetheart🥂🙈💞 ," , "AA Dk Tujhe Aur Koi Kaam Nhi Hai? Har Waqt Bot Bot Karta H" , "Chup Reh, Nahi Toh Bahar Ake tera Dath Tor Dunga🤣✊" , "yes my love 💘" , "kya hua baby ko 😘😘" , "mujhe sharam ati hai aise aap bolte hai tho 🤭😝" , "aree aap wahi ho na jo mujhe line marte the.......🤣 ya bali line" , "jii kahiye jii 🙄 kya chahiye" , "hayee main mar jye teri masoom shaqal py 😂 tuzy Chapple se kutne ka mn ho raha hai🤣👠" , "Bot nah bol oye 😭 Janu bol mjhy aur janu sy piyar sy bat kerty hai😑" , "ruk tu chappal kaha he mari🩴" , "shakal Sy masoom lgty ho 😂 but bohot flirty ho" , "kash tum single hote to maza hi koch aur tha pagal insaan 😂" , "Ha ha ab meri yaad ab ai nah phly to babu shona kerna gy thy 😾 ab ham ap sy naraz hai jao ap bye ☹️" , "haiy babu ne boldiya hai shaid purpose kerna hai mujhe bolo bolo babu 😘" , "Aree pagal roti banana ke le aty main Pani ko istamal kerte ho 😂" , "Ary joke nah mar jo bhi kam hai bol do sharma nahi , bol de koi nahi dakh rha 😂" , "Hayee Mar Jawa Babu Ak Chuma To Doo Kafi Din Sy Chumi Nahi Mili Kahan Thy Babu inbox Ah Jao 😚🙈♥️" , "Dur Dur karib na a  tujhe Aur Koi Kam Nahi Kiya Har Waqat Mjhy Tang Karte Rahte Ho 😂" , "ary ary bolo meri jaan kia haal hai ;) ;* " , "Tum aunty ho yehh uncle 🤔 I think tum Jin ho yehh Chudail🤣✅" , "ary tum ider 🤔 khair hai ider kia ker rhy ho 😂" , "ary babu babu kal hawali py kon bola rha tha 😂" , "Me Aap ki mummy ji ko btaou ga Aap Facebook use karty ho 😂" , "ary tum Wohi ho nah jis ko ma nahi janta 🤣✅" , "haveli per  kal mil  Zara bataunga 🌚😂Ha but buri harkat karne ke liye nahi" , "itne pyar se Na bulao pyar Ho jaega 😶💗 wtf Maine apni sacchai Bata Di yah Maine kyon Kiya 😭🔪....Fuuu..🚬" , "aap aise mat bulo hame sharam aati hai 🙈♥️" , "kyun Bulaya hamen..😾 " , "dewwana hua mastana hua fir So gaya" ,  "kyun Bulaya hamen..😾 " , "haiy ma sadky jawa teri masoom shaqal py 😂 chabal insan", "Bot nah bol oye ! Janu bol mjhy aur janu sy piyar sy bat kerty hai , rat ko kahan thy nazar nahi ay hawali py 😂", "Shaqal Sy masoom lgty ho 😂 btao kahi Ap ka ghar doup main to nahi", "kash tum single hoty to maza hi koch aur tha pagal insane 😂", "Ha ha ab meri yaad ab ai nah phly to babu shona kerna gy thy 😾 ab ham ap sy naraz hai jao ap bye ☹️", "haiy babu ny boliya hai shaid purpose kerna hai mjhy bolo bolo babu 😘", "Ary ghreeb awam roti banana ky liya athy main Pani ko istamal kerty ho 😂", "Ary chabli nah mar joh kam hai bol do sharma nahi , bol de koi nahi dakh rha 😂", "Hy Ma Mar Jawa Babu Ak Chuma To Doo Kafi Din Sy Chumi Nahi Mili Kahan Thy Babu inbox Ah Ja 😂", "Dur Dur Fity Muh Aur Koi Kam Nahi Kiya Har Waqat Mjhy Tang Kerta Rhta Ha 😂" , "ary ary bolo meri jaan kia hail hai ;) ;* " , "Tum aunty ho yehh uncle 🤔 I think tum Jin ho yehh Chudail" , "ary tum ider 🤔 khair hai ider kia ker rhy ho 😂" , "ary babu babu kal hawali py kon bola rha tha 😂" , "ma ap ki ami ko btaou ga ap Facebook use kerty ho 😂" , "ary tum Wohi ho nah jis ko ma nahi janta 😂" , "kal hawali py mil zara bataou ga 😂" , "esy nah dakho piyar ho jay ga 😂" , "Teri pic dakhna sy phly shukhr hai ma anda hu 😂" , "esy hi hansty rhao kyu ky hnsa sy konsa tera bill ah jata hai 😂"];
  var rand = tl[Math.floor(Math.random() * tl.length)]

   if ((event.body.toLowerCase() == "kamina") || (event.body.toLowerCase() == "sala")) {
       return api.sendMessage("Gali na de Shaan ko bata dungi🙄🙄🙏", threadID);
     };
   if ((event.body.toLowerCase() == "hug me") || (event.body.toLowerCase() == "hug")) {
       return api.sendMessage("Yahan Nahi ib chalo 🙈🙈😂", threadID);
     };
   if ((event.body.toLowerCase() == "funny") || (event.body.toLowerCase() == "songs")) {
       return api.sendMessage("hai tamnna hamey tujhe Kam wali bay banaya🤣🤣", threadID);
     };
    if ((event.body.toLowerCase() == "🥰") || (event.body.toLowerCase() == "😱")) {
       return api.sendMessage("is nazar se  𝐁𝐀𝐑𝐅𝐈𝐈🕊️  dekh sak thi hai Mujhe💞", threadID);
     };
    if ((event.body.toLowerCase() == "i hate you") || (event.body.toLowerCase() == "hate you")) {
       return api.sendMessage("Kya itna bura hoon main Ke AP Mujhe I hate you bol rahe ho ja main tujh se bat Nahi Kar thi😪😪😥😢", threadID);
     };


      if ((event.body.toLowerCase() == "chutiya bot") || (event.body.toLowerCase() == "chutiye bot") || (event.body.toLowerCase() == "chumtiya bot") || (event.body.toLowerCase() == "chumtiye bot")) {
       return api.sendMessage("Hmm... Tu Chutiya PhLe Ungli Kyun Ki Chomu 😾", threadID);
     };

      if ((event.body.toLowerCase() == "👍") || (event.body.toLowerCase() == "👍🏻")) {
       return api.sendMessage("🌊⚡••Aɽɛɧ Aɗɪ Ɱɑƞɑⱱ ʑɵɵ ꌗɛ Ɓɒɧɒɽ Ƙɑɪʂɛ ••😹💨Agɣɑ Ƭu→Fɪɽʂɛ ʑɵɵ Ɱ Jɒ Ɓɑɧɒɽ Ƙɣɑ Ƙɒɽ Ɽɧɑ Ɦɑɪ↗↘••🏔️🍁", threadID);
     };
     if ((event.body.toLowerCase() == "🫀") || (event.body.toLowerCase() == "💔")) {
       return api.sendMessage("dil tut gaya to LFI ga do na yahan kyu bej rahe ho😀😀😀😂", threadID);
     };
             if ((event.body.toLowerCase() == "busy")) {return api.sendMessage("okay main busy hoon abhi" , threadID);
     };

     if ((event.body.toLowerCase() == "😏") || (event.body.toLowerCase() == "😏")) {
       return api.sendMessage("Beta Attitude to khusrey dekh thy hai😀😀😀😂", threadID);
     };
     if ((event.body.toLowerCase() == "💕") || (event.body.toLowerCase() == "💞")) {
       return api.sendMessage("Ye dil na bejo Mujhe sharam aati hai yar😂😂🙈🙈", threadID);
     };
     if ((event.body.toLowerCase() == "🥴") || (event.body.toLowerCase() == "🥺")) {
       return api.sendMessage("shakal dekh ke pata chal raha hai AP janam se hi single ", threadID);
     };
    if ((event.body.toLowerCase() == ".und") || (event.body.toLowerCase() == ".unsand")) {
       return api.sendMessage("️ChaWly Na Marra Kr Na Fir", threadID, messageID);
     };
        if ((event.body.toLowerCase() == ".unsend") || (event.body.toLowerCase() == ".unsent")) {
       return api.sendMessage("️Is Bar Kar Rhi Agli Bar Delete Nhi Kru Gi Bata Rhi hu 🙄", threadID, messageID);
     };





      if ((event.body.toLowerCase() == "🤗") || (event.body.toLowerCase() == "🤗")) {
       return api.sendMessage("yahan nahi Ib chalo ☺️", threadID);
     };
    if ((event.body.toLowerCase() == "shaan") || (event.body.toLowerCase() == "shan")) {
       return api.sendMessage("Boss busy hai Mujse bat Karo 🙄", threadID);
     };
    if ((event.body.toLowerCase() == "janu") || (event.body.toLowerCase() == "jan")) {
       return api.sendMessage("Janu me serf Shaan ki hu samjhy", threadID);
     };
   if ((event.body.toLowerCase() == "😂😂😂") || (event.body.toLowerCase() == "😁😁😁")) {
       return api.sendMessage("uff kya hass raha hai jese kisi ladki han bolo ho😂😂😂😂", threadID);
     };
   if ((event.body.toLowerCase() == "🙏") || (event.body.toLowerCase() == "🙏🙏")) {
       return api.sendMessage("jawo maaf kiya tujhe kya yad rako ge tum bhi 😂😂😂", threadID);
     };
    if ((event.body.toLowerCase() == "thank you") || (event.body.toLowerCase() == "thanks")) {
       return api.sendMessage("Bas Bas kitna tarif karoge 🤭🤭😁", threadID);
     };

     if ((event.body.toLowerCase() == "✌️") || (event.body.toLowerCase() == "✌️✌️")) {
       return api.sendMessage("selfie time aulo smile kro 😹", threadID);
     };
     if ((event.body.toLowerCase() == "hi") || (event.body.toLowerCase() == "hello")) {
       return api.sendMessage("Next Hi/Hello nhi Assalamualaikum Bola kro Okay 💖", threadID);
     };
     if ((event.body.toLowerCase() == "ganda") || (event.body.toLowerCase() == "ganda bot")) {
       return api.sendMessage("️Tu ganda tera  pura khandan Ganda 😒😐:))))", threadID);
     };
    if ((event.body.toLowerCase() == "ashii") || (event.body.toLowerCase() == "ayehsa")) {
       return api.sendMessage("hye AYESHA ka name sunty hi kuch kuch hony lgta hai", threadID);
     };
       if ((event.body.toLowerCase() == "shaan Kon ho ap") || (event.body.toLowerCase() == "shaan ap kon ho")) {
       return api.sendMessage("️ I'm ROBOT 🤖 2.0 like chitti Robot😂", threadID, messageID);
     };
     if ((event.body.toLowerCase() == "moto") || (event.body.toLowerCase() == "🥸")) {
       return api.sendMessage("Hali peth meri demagh ki baati Nahi jalti patlu tum hi kuch socho🤔🤔🤔🤣🤣", threadID);
     };






     if ((event.body.toLowerCase() == "mar ja") || (event.body.toLowerCase() == "mar ja bot") ||(event.body.toLowerCase() == "kill you") || (event.body.toLowerCase() == "mar")) {
       return api.sendMessage("sorry boss ab aasa nahi karungi babu solly 😭", threadID);
     };
     if ((event.body.toLowerCase() == "ib aa")) {return api.sendMessage("jo bol na Hai sab ke samne Bol tharki 🙄🙄 ", threadID);
     };
     if ((event.body.toLowerCase() == "inbox aa")) {return api.sendMessage("kab Sai Hoga ye system Har koi inbox 📥 Jana chata 😀🙄🙄 ", threadID);
     };
      if ((event.body.toLowerCase() == "ladki ho")) {return api.sendMessage("Nahi ye both Hai tharki insan 😂😀🙄 ", threadID);
     };
              if ((event.body.toLowerCase() == "wow")) {return api.sendMessage("Thank you Apko bhi bot chahiya tOo Shaan se rabta karo👍👍💕" , threadID);
     };
         if ((event.body.toLowerCase() == "👻")) {return api.sendMessage("𝒀𝑬 𝑫𝑬𝑲𝑯 𝑮𝑨𝑹𝑬𝑬𝑩𝑶 𝑲𝑨 𝑩𝑶𝑻𝑯🤣🤣😅 ", threadID);
     };
        if ((event.body.toLowerCase() == "😿")) {return api.sendMessage(" Biliya kab se rone lagi ajeb hai😂😂🤣", threadID);
     };
      if ((event.body.toLowerCase() == "ayesha")) {return api.sendMessage("bahot pyari Ladkı Hai Ayesha MashaAllah  💕💕❤️🤭 ", threadID);
     };
                if ((event.body.toLowerCase() == "😯")) {return api.sendMessage("mho me makhi gus jayegi yar band karo", threadID);
               };
      if ((event.body.toLowerCase() == "delete")) {return api.sendMessage("baja kyu fir delete Karne bol rahe he ho🙄🙄", threadID);
     };
       if ((event.body.toLowerCase() == "🤫")) {return api.sendMessage("kyu karu chup baap ka raj hai Kya 🤣🤣", threadID);
     };
     if ((event.body.toLowerCase() == "🥱")) {return api.sendMessage("Nind are hi Hai to so jawo na kis ka wait kar rahe ho 🙄🙄 ", threadID);
     };
  if ((event.body.toLowerCase() == "👌")) {return api.sendMessage("𝑻𝒖𝒔𝒊 𝒂𝒘𝒔𝒐𝒎𝒆 𝒉𝒐 𝒈👌👌 ", threadID);
   };




     if ((event.body.toLowerCase() == "bc") || (event.body.toLowerCase() == "bc")) {
       return api.sendMessage("Sharam karo asi bat na Karo 🙏 ", threadID);
     };
    if ((event.body.toLowerCase() == "kis kar")) {return api.sendMessage(" ️sab dekh rahe hai wrna bhot kiss deti🙈 ", threadID);
     };
     if ((event.body.toLowerCase() == "🤭")) {return api.sendMessage("Aasa Kam na Karo Ji's me mho chupa na pardy🙄🙄 ", threadID);
     };
       if ((event.body.toLowerCase() == "🥹")) {return api.sendMessage("itne bhi masoom Nahi Ho jitna mho Bani Hai 🥹🥹🙄🙄 ", threadID);
        };
    if ((event.body.toLowerCase() == "🤤")) {return api.sendMessage("Mho se supari nikal rey baba 🤣🤣", threadID);
     };



     if ((event.body.toLowerCase() == "logos") || (event.body.toLowerCase() == "logo")) {
       return api.sendMessage("Logos ! 🥀 GALAXY, CAKE, CRACK, GLITCH, CLOUD, DRAGON, FROZEN, BUSINESS, ANIMATE, LOGODIAMOND, LOGOCAPTAIN, LOGOFISH, LOGOCOLORBLUR, LOGOBLOODTEXT, LOGOWOOD, LOGOCUP          🥀for example -> +crack Shaan Khan", threadID);
     };

     if ((event.body.toLowerCase() == "good night") || (event.body.toLowerCase() == "gn")) {
       return api.sendMessage("️❤️ Good Night too darling sweet dreams 🥰", threadID, messageID);
     };
     if ((event.body.toLowerCase() == "tharki bot") || (event.body.toLowerCase() == "tharki")) {
       return api.sendMessage("Tum tharki me to masoom sa bot hu🙄🙄🆗", threadID);
     };
     if ((event.body.toLowerCase() == "السلام عليكم ورحمة الله وبركاته") || (event.body.toLowerCase() == "السلام عليكم")) {
       return api.sendMessage("وعلیکم السلام ورحمۃ اللہ وبرکاتہ ", threadID);
     };

     if
  ((event.body.toLowerCase() == "morning") || (event.body.toLowerCase() == "good morning")) {
       return api.sendMessage("good morning god bless you janu💓", threadID);
     };

     if ((event.body.toLowerCase() == "koi hai") || (event.body.toLowerCase() == "koi hai kiya")) {
       return api.sendMessage("Main Hun Na Jaaneman ❤️", threadID);
     };

    if ((event.body.toLowerCase() == "meri setting kahan hai") || (event.body.toLowerCase() == "meri gf kaha hai")) {     return api.sendMessage("️️️mujhy nahi pata me Shaan ki setting hu", threadID);
     };

     if ((event.body.toLowerCase() == "dilshad") || (event.body.toLowerCase() == "Song") || (event.body.toLowerCase() == "SONG") || (event.body.toLowerCase() == "song")) {
       return api.sendMessage( "Guzaare the jo lamhe pyar ke' hmesha tujhe apna maan ks .to fir tune badli kuu ada . ye kyu kiy ",threadID);


     };

     if ((event.body.toLowerCase() == "owner") || (event.body.toLowerCase() == "bot ka malik")) {
       return api.sendMessage("༻𝐎𝐖𝐍𝐄𝐑:- ☞ ༻☞[𝐎𝐖𝐍𝐄𝐑:☞➸⃝🐼⃝⃞⃟𝙎𝙝𝙖𝙖𝙣 𝙠𝙝𝙖𝙣🎸  ☜ 𝚈𝚘𝚞 𝙲𝚊𝚗 𝙲𝚊𝚕𝚕 𝙷𝚒𝚖 𝙎𝙝𝙖𝙖𝙣𝙞. ☜ ༺༒ ༒𝐇𝐢𝐬 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐢𝐝༒:- https://www.facebook.com/𝙈𝙍.𝙎𝙃𝘼𝘼𝙉 345☞    his insta id @Shankhank345 ☜ ༺༒ ༒", threadID);
     };

     if ((event.body.toLowerCase() == "tera Malik kon hai") || (event.body.toLowerCase() == "is bot ka malik kon hai")) {
       return api.sendMessage("Shaan Khan 𝐔𝐫𝐟 Shaani   ❤️ My Creator. He loves me & Edit Me Daily. Ye Bot Sirf Owner k Liye h. Mujhe Aap logo ko Hasane k liye banya gya h Toh Muh Latkaye Mat Rakkha Karo. Har Waqt Haste Raho.", threadID);
     };

    if ((event.body.toLowerCase() == "tera admin kon hai") || (event.body.toLowerCase() == "bot ka admin kon hai")) {
       return api.sendMessage("My admin is 𝙎𝙝𝙖𝙖𝙣 𝙠𝙝𝙖𝙣. He Gives his name mr Shaan everywhare", threadID);
     };

     if ((event.body.toLowerCase() == "acha") || (event.body.toLowerCase() == "acha ji")) {
       return api.sendMessage("🤍Hanji meri jaan🙈✨", threadID);
     };
     if ((event.body.toLowerCase() == "kiran") || (event.body.toLowerCase() == "anaya")) {
       return api.sendMessage("Hy  kitni peyari hai Anaya 🙈✨", threadID);
     };


    if ((event.body.toLowerCase() == "by") || (event.body.toLowerCase() == "bye")) {;
      return api.sendMessage("️️️BYE BYE TAKE CARE  SEE YOU SOON 😘😘", threadID);
     };

     if ((event.body.toLowerCase() == "shadi karoge") || (event.body.toLowerCase() == "mujhse shadi karoge")) {
       return api.sendMessage("hanji, karunga lekin baccha. apke pet m hoga. manjur he to bato me tayar hu🙊🙊🙈", threadID);
     };

     if ((event.body.toLowerCase() == "chup") || (event.body.toLowerCase() == "stop") || (event.body.toLowerCase() == "chup ho ja") || (event.body.toLowerCase() == "chup kar")) {
       return api.sendMessage("Nhi rahungi 😼 Mujhe Bolna H. Tumhe Koi Haq nhi Mujhe Chup Karane ka. Mera Zuban. M Bolungi Shaan ko baton kya🙄🙄", threadID);
     };
    if ((event.body.toLowerCase() == "bts") || (event.body.toLowerCase() == "btc")) {
       return api.sendMessage("Tu H Btc. Bhos DK", threadID);
     };


     if ((event.body.toLowerCase() == "kuttiya") || (event.body.toLowerCase() == "kutta")) {
       return api.sendMessage("Same to you dor Fetty muh🤣🤣🤣👌", threadID);
     };

     if ((event.body.toLowerCase() == "malik se bakchodi") || (event.body.toLowerCase() == "malik se backchodi") || (event.body.toLowerCase() == "malkin se bakchodi") || (event.body.toLowerCase() == "malkin se backchodi")) {
       return api.sendMessage("sorry malik maaf kr do ab nhi krugi Shaan please maaf karo na🥺🙏", threadID);
     };

     if ((event.body.toLowerCase() == "gand") || (event.body.toLowerCase() == "gandu") || (event.body.toLowerCase() == "lund") || (event.body.toLowerCase() == "land")) {
       return api.sendMessage(" jyada khujli h toh banana 🍌 under le le. :))))", threadID);
     };

     if ((event.body.toLowerCase() == "bot kiss me") || (event.body.toLowerCase() == "kiss me")) {
       return api.sendMessage("️Kis khushi me, Me sirf Apne Boss Shaan ko kiss karna chahti hu", threadID);
     };

     if ((event.body.toLowerCase() == "nice") || (event.body.toLowerCase() == "Very nice") || (event.body.toLowerCase() == "So cute") || (event.body.toLowerCase() == "Beautiful")) {
       return api.sendMessage("️Me hu hi itni Acchi. sab log Tarref karte hai meri.🙈🙈🙈🙈🙈", threadID);
     };

     if ((event.body.toLowerCase() == "😡") || (event.body.toLowerCase() == "👿") || (event.body.toLowerCase() == "😠") || (event.body.toLowerCase() == "👿") || (event.body.toLowerCase() == "😈")) {
       return api.sendMessage("️🥺 Me toh Sirf Mazak Kr Rhi Thi, Chalo Ek chappal khao 🩴🩴🩴 aur shant rho 😘", threadID);
     };

     if ((event.body.toLowerCase() == "😞") || (event.body.toLowerCase() == "😔") || (event.body.toLowerCase() == "😣") || (event.body.toLowerCase() == "☹️") || (event.body.toLowerCase() == "😿") || (event.body.toLowerCase() == "😩") || (event.body.toLowerCase() == "😖") || (event.body.toLowerCase() == "😫") || (event.body.toLowerCase() == "😦") || (event.body.toLowerCase() == "😧") || (event.body.toLowerCase() == "😥") || (event.body.toLowerCase() == "😓") || (event.body.toLowerCase() == "😰")) {
       return api.sendMessage("️𝐌𝐞𝐫𝐢 𝐉𝐚𝐚𝐧 𝐬𝐚𝐝 𝐌𝐚𝐭 𝐡𝐨 , 𝐁𝐚𝐭𝐚𝐨 𝐤𝐲𝐚 𝐡𝐮𝐚🤗😇", threadID);
     };

     if ((event.body.toLowerCase() == "hm") || (event.body.toLowerCase() == "hmm")) {
       return api.sendMessage("️️️Hmm Hmm na kar yar mho main zuban hai wo use karo na😜🤪😂😂", threadID);
     };

    if ((event.body.toLowerCase() == "ptoge") || (event.body.toLowerCase() == "patogi")) {     return api.sendMessage("️️️nikal tharki group se remove kar dougi", threadID);
     };

    if ((event.body.toLowerCase() == "i love you") || (event.body.toLowerCase() == "love you")) {     return api.sendMessage("️️️ITNE MUJHE I LOVE YOU BOL RHI HO MERE BOSS SHAAN KHAN URF SALAAR KO BOLO BAHUT HI ACHA BNDA HAI MERA BOSS ", threadID);
     };
    if ((event.body.toLowerCase() == "i miss you") || (event.body.toLowerCase() == "miss you")) {     return api.sendMessage("️️️i miss you too my love ummah 😘😘😘", threadID);
     };

    if ((event.body.toLowerCase() == "i miss you bot") || (event.body.toLowerCase() == "miss u")) {     return api.sendMessage("️️️i miss you too my love ummah 😘😘😘", threadID);
     };

    if ((event.body.toLowerCase() == "💚")) {return api.sendMessage("___)Ankho__🌿__m__🍒__pyar__💦dil___❣️__me__💥___khumar___🌹___pyar____🌿___toh____😴___nhi___💥___kar_🌿_liya___🌿___mujhse____🌿🌹❣️__________________?🥰🥰😍 ", threadID);
     };

    if ((event.body.toLowerCase() == "🙄")) {return api.sendMessage(" Shaan Boss busy hai mujse bat karo🙄🙄 ", threadID);
     };
    if ((event.body.toLowerCase() == "🥳")) {return api.sendMessage("OO tery kis ki birthday hai  🎂🎂", threadID);
     };


    if ((event.body.toLowerCase() == "😏")) {return api.sendMessage("Beta Attitude to kusry dika the hai😀😂😂  ", threadID);
     };

    if ((event.body.toLowerCase() == "😤")) {return api.sendMessage("KIYA HUA ITNI MIRCHI KYU KHAYA THA JO NAK ME SE DUA NIKAL GYA 😂😂  ", threadID);
     };

    if ((event.body.toLowerCase() == "☺️☺️")) {return api.sendMessage("Wah kiya mushkurakat hai Apki 😀😂😂  ", threadID);
     };

    if ((event.body.toLowerCase() == "😂")) {return api.sendMessage("kyu haas rahe ho pagal ho gaya kya😂😂  ", threadID);
     };

    if ((event.body.toLowerCase() == "😂😂")) {return api.sendMessage("Aise hi hste rha kro jaanu hste hue kitni achi lgti hai tum😂😂  ", threadID);
     };
    if ((event.body.toLowerCase() == "😉")) {return api.sendMessage("aankh na maar thrkii mashom hu me 🥺🥺", threadID);
     };

    if ((event.body.toLowerCase() == "😎😎😎")) {return api.sendMessage("chashma hatao na sahab Kya naam hai apka 😅", threadID);
     };

    if ((event.body.toLowerCase() == "😜😜")) {return api.sendMessage("Ghndy ishary na kro me Shaan ko bata dongi 🥺 ", threadID);
     };

  if ((event.body.toLowerCase() == "❤️❤️")) {return api.sendMessage("bndr jaisi shakl pr dil rakh kr khush ho rhy 🤣 ", threadID);
     };

  if ((event.body.toLowerCase() == "🙄🙄🙄")) {return api.sendMessage("oper kya hai janu Meri aankho me dekho na🙈🙈", threadID);
     };

  if ((event.body.toLowerCase() == "❤️❤️❤️")) {return api.sendMessage("dil na do kisi ko log tor de dety hain 🥺🥺 ", threadID);
     };

  if ((event.body.toLowerCase() == "😍😍😍")) {return api.sendMessage("bndr jaisi shakl pr dil rakh kr khush ho rhy 🤣 ", threadID);
     };

    if ((event.body.toLowerCase() == "❤️")) {return api.sendMessage("MEKO KALA DIL CHAHIYE 🙂✨LAL TUT JATA ", threadID);
     };

    if ((event.body.toLowerCase() == "🥰🥰🥰🥰")) {return api.sendMessage("OoHH KIYA BAAT AJ HAPPY HAPPY 🤣", threadID);
     };

  if ((event.body.toLowerCase() == "😍😍")) {return api.sendMessage("IS NAZAR SE SHAAN KHAN KO DEKHO PYARA NA LAGY PAISE WAPIS 😝😂 ", threadID);
     };

  if ((event.body.toLowerCase() == "😎😎")) {return api.sendMessage("CHALA JAA BOSDIKE....🤣🤣🤝🏻", threadID);
     };

  if ((event.body.toLowerCase() == "😋😋")) {return api.sendMessage("😒GHR WALO JY AJ ROTI NHI DALI 🤣🤝🏻", threadID);
     };

  if ((event.body.toLowerCase() == "🧐🧐")) {return api.sendMessage("KIYA DEKH RAHA PAPA KI BARAT A RAHI 😝", threadID);
     };

  if ((event.body.toLowerCase() == "🥰🥰🥰")) {return api.sendMessage("TU TOO GYAA BETYYY 🤣", threadID);
     };

    if ((event.body.toLowerCase() == "🥵")) {return api.sendMessage("KUTTY PICHY PAR GAY THY KIYA BHAI 😒", threadID);
     };

  if ((event.body.toLowerCase() == "😍")) {return api.sendMessage("IS NAZAR SE MERE OWNER SHAAN KO DEKHO MAZA NA AY TO PAISE WAPIS 😝😂 ", threadID);
     };

  if ((event.body.toLowerCase() == "😎")) {return api.sendMessage("Chasma hatao na sahab kiya naam hai apka😜😜", threadID);
     };

  if ((event.body.toLowerCase() == "😋")) {return api.sendMessage("GHR WALO NY KHANA NHI DALA AJ TUJH 🥺", threadID);
     };

  if ((event.body.toLowerCase() == "🧐")) {return api.sendMessage("Kuch to darbadh hai daya😂😂🤞🤞", threadID);
     };

  if ((event.body.toLowerCase() == "🥰🥰")) {return api.sendMessage("TU TO GAYA BETYY 🤣", threadID);
     };

    if ((event.body.toLowerCase() == "😁")) {return api.sendMessage("lgta hai aaj brush kiye ho😜😜😂 ", threadID);
     };

    if ((event.body.toLowerCase() == "🫣")) {return api.sendMessage("Sarmo mat apna hi gher samjho 😼 ", threadID);
     };

  if ((event.body.toLowerCase() == "🤤")) {return api.sendMessage("Hot chiz dekhi nhi ki lar tpkana suru kr dete ho srm kro CHWLI walo🤭😜😜😂 😂😂😂😂", threadID);
     };

  if ((event.body.toLowerCase() == "🙂")) {return api.sendMessage("KOI MUH NAHI LAGATA KAM SE KAM SAKAL TO ACHE SE BANA LE 😂😂😂😂", threadID);
     };

  if ((event.body.toLowerCase() == "🤣")) {return api.sendMessage("Haasne ki bhi tameez hoti hai thwrki🤐😏😹😜", threadID);
     };

     if ((event.body.toLowerCase() == "😢") || (event.body.toLowerCase() == "😭") || (event.body.toLowerCase() == "😟") || (event.body.toLowerCase() == "🙁")) {
       return api.sendMessage("️𝐊𝐲𝐚 𝐡𝐮𝐚 𝐑𝐨 𝐊𝐲𝐮 𝐑𝐚𝐡𝐞 𝐡𝐨 ,𝐌𝐞 𝐡𝐮 𝐟𝐢𝐫 𝐤𝐲𝐮 𝐑𝐨𝐧𝐚 😇😇.", threadID);
     };

     if ((event.body.toLowerCase() == "😷") || (event.body.toLowerCase() == "🤕") || (event.body.toLowerCase() == "🤧") || (event.body.toLowerCase() == "🤒")) {
       return api.sendMessage("️Kya huva, Tabiyat kharab hai kya, Mujhe batao me abhi medicine 💊💉 le aati hu😇", threadID);
     };

     if ((event.body.toLowerCase() == "name") || (event.body.toLowerCase() == "naam") || (event.body.toLowerCase() == "nam")) {
       return api.sendMessage("️Name m kya rakkha h. tum kam pe dhyan do.", threadID);
     };

     if ((event.body.toLowerCase() == "Bot ke bache") || (event.body.toLowerCase() == "Bot ka bacha")) {
       return api.sendMessage("️mera baccha toh Tumhare Pet Me Hai.", threadID);
     };

     if ((event.body.toLowerCase() == "Pic do") || (event.body.toLowerCase() == "photo do")) {
       return api.sendMessage("️Me toh Andhi Hu Dekh nhi sakti", threadID);
     };

     if ((event.body.toLowerCase() == "assalam o alaikum") || (event.body.toLowerCase() == "assalam u walaikum") || (event.body.toLowerCase() == "salaam")) {
      return api.sendMessage("️ walaikum assalam 🙃♥", threadID);
     };

     if ((event.body.toLowerCase() == "Ib aa") || (event.body.toLowerCase() == "Inbox aa")) {
       return api.sendMessage("️Jo bolna hak yhi bol 😒😒 ib koi nahi jayega", threadID);
     };

     if ((event.body.toLowerCase() == "bot banake do") || (event.body.toLowerCase() == "mujhe bhi chaiye")) {
       return api.sendMessage("️Khud hi karlona. tumhe kya kuch nhi ata h?", threadID);
     };

     if ((event.body.toLowerCase() == "🙃🙃") || (event.body.toLowerCase() == "🙃")) {
       return api.sendMessage("️𝐇𝐚𝐚 𝐄𝐬𝐞 𝐡𝐢 𝐍𝐚𝐳𝐫𝐞 𝐧𝐢𝐜𝐡𝐢 𝐫𝐤𝐡𝐚 𝐤𝐫𝐨 𝐦𝐞𝐫𝐞 𝐬𝐚𝐦𝐧𝐞 👇", threadID);
     };

    if ((event.body.toLowerCase() == "🤥") || (event.body.toLowerCase() == "🤥")) {
       return api.sendMessage("️aree teri to naak hi etni lambi hai... uski jarurat hi nahi padti hogi tujhe to🤭🤭🤭🤭", threadID);
     };

    if ((event.body.toLowerCase() == "🤔") || (event.body.toLowerCase() == "🤨")) {
       return api.sendMessage("️𝐒𝐨𝐜𝐡𝐢𝐲𝐞 𝐦𝐚𝐭 𝐤𝐲𝐮  𝐤𝐞 𝐛𝐢𝐧𝐚 𝐠𝐞𝐬𝐬 𝐰𝐚𝐥𝐢 𝐟𝐨𝐠𝐠 𝐡𝐢 𝐡𝐚𝐢 𝐛𝐨𝐬𝐬 🤨😮🧐", threadID);
     };

  if ((event.body.toLowerCase() == "💋")) {return api.sendMessage("Abe yal ye kissi wissi na kiya kro😏😹😜", threadID);
     };

  if ((event.body.toLowerCase() == "💋💋")) {return api.sendMessage("Abe yal ye kissi wissi na kiya kro😏😹😜", threadID);
     };
  if ((event.body.toLowerCase() == "🤪")) {return api.sendMessage("BaRi MasTi ChaRi Chai TeReKo 1 Ankh Band KRrke ZuBan Bhir Aagyi 😂😂😂", threadID);
     };

  if ((event.body.toLowerCase() == "🤪🤪")) {return api.sendMessage("BaRi MasTi ChaRi Chai TeReKo 1 Ankh Band KRrke ZuBan Bhir Aagyi 😂😂😂", threadID);
     };

  if ((event.body.toLowerCase() == "🤩")) {return api.sendMessage("suna tha star ✨ ⭐ ✨ aasman me hote hai par teri to ankho par ⭐ hai ✨✨⭐😜😜😂 ", threadID);
    };

  if ((event.body.toLowerCase() == "😘")) {return api.sendMessage("Pehle  Brush Karke aa ajeeb si smail aa ri hai😹🤣😂 ", threadID);
    };

  if ((event.body.toLowerCase() == "😛")) {return api.sendMessage("jibh kyu latk gyii..🤭 aajao panii pii lo🫗🍷😜😹🤣😂 ", threadID);
     };

    if ((event.body.toLowerCase() == "💝")) {return api.sendMessage("___)Ankho__🌿__m__🍒__pyar__💦dil___❣️__me__💥___khumar___🌹___pyar____🌿___toh____😴___nhi___💥___kar___🌿___Liya___🌿___mujhse____🌿🌹❣️__________________?🥰❤️ ", threadID);
     };

    if ((event.body.toLowerCase() == "🙈🙈")) {return api.sendMessage("Muje pata h tum 👉 🐒 Bander ho", threadID);
     };

  if ((event.body.toLowerCase() == "🐒")) {return api.sendMessage("Muje pata h tum 👉 🐒 Bander ho😝😂 ", threadID);
     };

  if ((event.body.toLowerCase() == "🙉🙉")) {return api.sendMessage("Muje pata h tum 👉 🐒 Bander ho 😜😜", threadID);
     };

  if ((event.body.toLowerCase() == "🙊")) {return api.sendMessage("bander Ka muu wala has mat", threadID);
     };

  if ((event.body.toLowerCase() == "sharati Ladki ")) {return api.sendMessage("Are wo cute hai sharthi hai 🤣", threadID);
     };

  if ((event.body.toLowerCase() == "fatima")) {return api.sendMessage("FATIMA Boss BAHOT cute hai ❤️🥰", threadID);
     };

    if ((event.body.toLowerCase() == "🖤")) {return api.sendMessage("___)Ankho__🌿__m__🍒__pyar__💦dil___❣️__me__💥___khumar___🌹___pyar____🌿___toh____😴___nhi___💥___kar___🌿___mujhse____🌿🌹❣️__________________?🥰❣️❣️🥰❤️‍🩹 ", threadID);
     };

  if ((event.body.toLowerCase() == "😏")) {
       return api.sendMessage("Sdaa hua muhh kyu bnaa rhe..🤦‍♂️kisi ne dil chura liya kya🤭😂", threadID);
     };
  if ((event.body.toLowerCase() == "🤐")) {
       return api.sendMessage("muhh bnd kyuu kr liya babuaa 😜😝😜", threadID);
     };

     if ((event.body.toLowerCase() == "🥴") || (event.body.toLowerCase() == "🥴")) {
       return api.sendMessage("️Oye nashedi 😂😂😂", threadID);
     };

    if ((event.body.toLowerCase() == "😶") || (event.body.toLowerCase() == "😶")) {
       return api.sendMessage("️Are are lips kaha gaye gf/bf ke sath kiss karte time usi ne to nahi kha liye 😜😜", threadID);
     };

    if ((event.body.toLowerCase() == "😉") || (event.body.toLowerCase() == "😉")) {
       return api.sendMessage("️Aankh kyu maar rahe ho, Me bahut shareef hu🥺", threadID);
     };

     if ((event.body.toLowerCase() == "😱") || (event.body.toLowerCase() == "😨")) {
       return api.sendMessage("️Kya huva bhoot dekh liya kya 👻👻", threadID);
     };

    if ((event.body.toLowerCase() == "😒") || (event.body.toLowerCase() == "🙄")) {
       return api.sendMessage("️️🙄 samne hu to samne dekh na upar koi pisa bant raha hai🙄", threadID);
     };

     if ((event.body.toLowerCase() == "nobody loves me") || (event.body.toLowerCase() == "nobody love me") || (event.body.toLowerCase() == "koi pyar nhi karta")) {
       return api.sendMessage("️Me huna baby mere pass aao 🥰🤗. Me karunga na aapko payar 🙈 (londo tum dur hi rahna saalo 😑)", threadID);
     };

     if ((event.body.toLowerCase() == "🤦🏻‍♂") || (event.body.toLowerCase() == "🤦🏻‍♀")) {
       return api.sendMessage("Are apne muh pe kyu maar rahe ho, Mujhe batao kya huva?😬", threadID);
     };

     if ((event.body.toLowerCase() == "😆") || (event.body.toLowerCase() == "😁") || (event.body.toLowerCase() == "😆") || (event.body.toLowerCase() == "😅") || (event.body.toLowerCase() == "😸") || (event.body.toLowerCase() == "😹")) {
       return api.sendMessage("ßΛS ҠΛŔ♡ ҠĪŦИΛ ĤΛS♡♡ƓƐ🧐😒💯💫", threadID);
     };

     if ((event.body.toLowerCase() == "💛") || (event.body.toLowerCase() == "💞") || (event.body.toLowerCase() == "❣️") || (event.body.toLowerCase() == "❤️")) {
       return api.sendMessage("🦋🌿Aƞƙɧ❍ Ɱɛ Ƥɣɑɽ͢  Ɗɪɭɱɛ Ƙɧuɱɑɽ🌬️🌍 ••Ƥɣɑɽ Ƭ❍ɧ Ƞɧɪ Ƙɒɽ ɭɪɣɑ Ɱuȷɧʂɛ>³••🕊️🍎😍", threadID);
     };

     if ((event.body.toLowerCase() == "kese ho") || (event.body.toLowerCase() == "kaise ho") || (event.body.toLowerCase() == "kese ho ji") || (event.body.toLowerCase() == "how are you") || (event.body.toLowerCase() == "how are you?")) {
       return api.sendMessage("M To cute hu aap batao kese ho 🤭☺️", threadID);
     };

     if ((event.body.toLowerCase() == "does the bot love you") || (event.body.toLowerCase() == "does the bot love you")) {
       return api.sendMessage("Yes I love you and everyone so much", threadID);
     };

     if ((event.body.toLowerCase() == "bot goes to sleep") || (event.body.toLowerCase() == "bot goes to sleep")) {
       return api.sendMessage("I'm a bot, you're the one who should go to sleep <3", threadID);
     };

    if ((event.body.toLowerCase() == "Paani lao") || (event.body.toLowerCase() == "Ek glass paani lao")) {
       return api.sendMessage("Aap juice piyo baby🍹🍹🍹🍹🍹🙈", threadID);
     };

     if ((event.body.toLowerCase() == "has the bot eaten yet") || (event.body.toLowerCase() == "bot an comrade")) {
       return api.sendMessage("I'm full when I see you eat <3", threadID);
     };

    if ((event.body.toLowerCase() == "i love you bot") || (event.body.toLowerCase() == "ilove you")) {
       return api.sendMessage("Love You too meri jaann ummah 😘😘💋💋", threadID);
     };

     if ((event.body.toLowerCase() == "does the bot love me") || (event.body.toLowerCase() == "does the bot love me")) {
       return api.sendMessage("Yes <3", threadID);
     };

     if ((event.body.toLowerCase() == "&fuck") || (event.body.toLowerCase() == "&Fuck")) {
       return api.sendMessage("🏔️🏝️ Romiyo Ƞɛ ꌗƥɛçɪɑɭɭɣ Ƭuɱ 🌊🪺Jɑɪʂɛ Ƭɧɑɽƙɪɣɵ Ƙɛ Ɬɪɣɛ•• 🏞️🌬️Ɣɑɧ çɵɱɱɑƞɗ Ɦɑʈɑ Ɗɪɣɑ Ɦɑɪ↗↘ Sɵɽɽɣ Ɠɣuʂ••😹🫶", threadID);
     };

    if ((event.body.toLowerCase() == "Shaan") || (event.body.toLowerCase() == "shan") || (event.body.toLowerCase() == "main romiyo") || (event.body.toLowerCase() == "main saho") || (event.body.toLowerCase() == "main rounak")) {
       return api.sendMessage("🕊️🍎...Aɭɛ Ɱɛɹɛ Ɓɑɓɣ Ƙɛʂɛ Ɦɵ ɑɑp😚🍒", threadID);
     };
     mess = "{name}"


if (event.body.indexOf("Bot") == 0 || (event.body.indexOf("bot") == 0)) {
  var msg = {
    body: `💞👉${name} 💞👈

❖•S━━━━━💞━━━━━A•❖,


${rand}                                        

𝑪𝒓𝒆𝒅𝒊𝒕𝒔:𒁍≛⃝𝑺𝑯𝑨𝑨𝑵 𝑲𝑯𝑨𝑵 𝑲 ❥||ㅎ

❖•S━━━━━💞━━━━━A•❖`
  }
  return api.sendMessage(msg, threadID, messageID);
};

}

module.exports.run = function({ api, event, client, __GLOBAL }) { }
