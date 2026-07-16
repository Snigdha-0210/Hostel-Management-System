// ─── Helpers ──────────────────────────────────────────────────────────────────
const unsplash = (id, w = 800, h = 500) =>
  `https://picsum.photos/seed/${id}/${w}/${h}`;

const roomImg = (id) => unsplash(id, 600, 400);

// ─── Amenity catalogue ────────────────────────────────────────────────────────
export const ALL_AMENITIES = [
  'WiFi','AC','Power Backup','Parking','Attached Washroom',
  'Cupboard','Balcony','Laundry','Gym','Swimming Pool','Study Room',
  'Food/Mess','CCTV','Hot Water','Fridge',
];

// ─── Mess menu (weekly rotation, broadcast across all mess-enabled properties) ─
export const MESS_MENU = {
  Monday:    { breakfast:'Idli + Sambar + Chutney', lunch:'Dal Tadka + Rice + Sabzi + Roti', snacks:'Chai + Biscuits', dinner:'Rajma + Rice + Roti + Salad' },
  Tuesday:   { breakfast:'Poha + Chai', lunch:'Chole + Bhature + Raita', snacks:'Samosa + Chai', dinner:'Mixed Veg + Dal + Rice + Roti' },
  Wednesday: { breakfast:'Upma + Chai + Fruit', lunch:'Paneer Butter Masala + Rice + Roti', snacks:'Vada Pav', dinner:'Dal Makhani + Rice + Paratha' },
  Thursday:  { breakfast:'Aloo Paratha + Curd', lunch:'Kadhi + Rice + Sabzi + Roti', snacks:'Pakoras + Chai', dinner:'Chana Masala + Rice + Roti' },
  Friday:    { breakfast:'Bread + Butter + Boiled Egg + Chai', lunch:'Palak Paneer + Rice + Roti', snacks:'Maggi + Chai', dinner:'Matar Paneer + Rice + Roti' },
  Saturday:  { breakfast:'Puri + Aloo Sabzi', lunch:'Veg Biryani + Raita + Papad', snacks:'Chai + Cake', dinner:'Dal Fry + Mix Veg + Rice + Roti' },
  Sunday:    { breakfast:'Masala Dosa + Sambar + Chutney', lunch:'Special Rice + Soya Curry + Roti + Dessert', snacks:'Juice + Snack Plate', dinner:'Shahi Paneer + Rice + Naan + Kheer' },
};

// ─── Room templates ───────────────────────────────────────────────────────────
const makeRooms = (basePrice, hasAC, imgIds) => [
  { id: 'S', type: 'Single', sharing: 1, price: basePrice, size: '120 sq ft', capacity: 1,
    isAvailable: true, availableCount: 3,
    amenities: ['WiFi', ...(hasAC?['AC']:[]), 'Cupboard','Hot Water'],
    images: [roomImg(imgIds[0])],
  },
  { id: 'D', type: 'Double', sharing: 2, price: Math.round(basePrice*0.65), size: '160 sq ft', capacity: 2,
    isAvailable: true, availableCount: 5,
    amenities: ['WiFi', ...(hasAC?['AC']:[]), 'Cupboard','Attached Washroom','Hot Water'],
    images: [roomImg(imgIds[1])],
  },
  { id: 'T', type: 'Triple', sharing: 3, price: Math.round(basePrice*0.45), size: '200 sq ft', capacity: 3,
    isAvailable: true, availableCount: 4,
    amenities: ['WiFi','Cupboard','Hot Water'],
    images: [roomImg(imgIds[2] || imgIds[1])],
  },
];

// ─── Sample reviews ───────────────────────────────────────────────────────────
const sampleReviews = [
  { id:1, studentName:'Rahul Sharma', rating:5, date:'2025-11-10', text:'Excellent facility. Clean rooms, great mess food and very cooperative staff.', verified:true },
  { id:2, studentName:'Priya Singh', rating:4, date:'2025-12-03', text:'Good hostel overall. WiFi could be faster but everything else is top notch.', verified:true },
  { id:3, studentName:'Amit Verma', rating:4, date:'2026-01-18', text:'Nice atmosphere, clean washrooms and good food. Highly recommend.', verified:false },
  { id:4, studentName:'Neha Gupta', rating:5, date:'2026-02-05', text:'Best PG I have stayed in. Staff is very friendly and security is top class.', verified:true },
  { id:5, studentName:'Karan Mehta', rating:3, date:'2026-01-12', text:'Decent place, some maintenance issues but management resolved them quickly.', verified:true },
];

const pick = (arr, n) => arr.slice(0, n);

// ─── Staff templates ──────────────────────────────────────────────────────────
const makeStaff = (ownerName, wardenName, phone) => [
  { role:'Owner', name:ownerName, phone, available:'9 AM – 6 PM' },
  { role:'Warden', name:wardenName, phone:`+91 ${98000+Math.floor(Math.random()*99999)}`, available:'24/7' },
  { role:'Security', name:'Ramesh Kumar', phone:'+91 9512345678', available:'24/7' },
  { role:'Mess Manager', name:'Suresh Yadav', phone:'+91 9612345678', available:'6 AM – 10 PM' },
];

// ─── Property factory ─────────────────────────────────────────────────────────
let _id = 1;
const prop = ({name,type,gender,city,address,lat,lng,coverImg,amenities,rules,rating,reviewCount,staff,hasMess,basePrice,hasAC,roomImgIds}) => ({
  id: _id++,
  name, type, gender, city, address,
  location: { lat, lng },
  coverImage: unsplash(coverImg),
  images: [unsplash(coverImg), unsplash(roomImgIds[0],800,500)],
  amenities,
  rules,
  rating,
  reviewCount,
  reviews: pick(sampleReviews, Math.floor(Math.random()*3)+2),
  staff: staff || makeStaff('Rajesh Gupta','Meena Devi','+91 9812345678'),
  hasMess,
  messMenu: hasMess ? MESS_MENU : null,
  rooms: makeRooms(basePrice, hasAC, roomImgIds),
});

// ─── 10 Boys Hostels ──────────────────────────────────────────────────────────
const boysHostels = [
  prop({ name:'Sunrise Boys Hostel', type:'HOSTEL', gender:'BOYS', city:'Mumbai', address:'14 Andheri East, Mumbai',
    lat:19.1136, lng:72.8697, coverImg:'1555854512-e0e58c0d7863',
    amenities:['WiFi','Power Backup','Parking','Gym','Study Room','CCTV','Hot Water'],
    rules:'No smoking. Curfew 11 PM. No alcohol.', rating:4.5, reviewCount:128, hasMess:true,
    basePrice:8500, hasAC:false, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Green Valley Boys Hostel', type:'HOSTEL', gender:'BOYS', city:'Pune', address:'22 Kothrud, Pune',
    lat:18.5074, lng:73.8077, coverImg:'1555854512-e0e58c0d7863',
    amenities:['WiFi','AC','Power Backup','Swimming Pool','Gym','Laundry','CCTV'],
    rules:'No smoking. Curfew midnight.', rating:4.3, reviewCount:95, hasMess:true,
    basePrice:9500, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Blue Ridge Hostel', type:'HOSTEL', gender:'BOYS', city:'Bangalore', address:'5 Koramangala, Bangalore',
    lat:12.9352, lng:77.6245, coverImg:'1486325212980-4e64cfea522e',
    amenities:['WiFi','AC','Power Backup','Gym','Study Room','Hot Water','Laundry'],
    rules:'No alcohol. Curfew 10:30 PM.', rating:4.6, reviewCount:210, hasMess:true,
    basePrice:11000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Capital Boys Hostel', type:'HOSTEL', gender:'BOYS', city:'Delhi', address:'7 Lajpat Nagar, Delhi',
    lat:28.5677, lng:77.2431, coverImg:'1519452575417-ac9b547d3296',
    amenities:['WiFi','Power Backup','Parking','CCTV','Laundry','Study Room'],
    rules:'No smoking. Curfew 11 PM. Guests not allowed.', rating:4.1, reviewCount:75, hasMess:true,
    basePrice:7500, hasAC:false, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Elite Boys Hostel', type:'HOSTEL', gender:'BOYS', city:'Chennai', address:'18 T Nagar, Chennai',
    lat:13.0418, lng:80.2341, coverImg:'1486325212980-4e64cfea522e',
    amenities:['WiFi','AC','Power Backup','Gym','Swimming Pool','CCTV','Hot Water'],
    rules:'No non-veg on premises. Curfew 10 PM.', rating:4.7, reviewCount:180, hasMess:true,
    basePrice:10000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Metro Boys Residence', type:'HOSTEL', gender:'BOYS', city:'Hyderabad', address:'33 Banjara Hills, Hyderabad',
    lat:17.4156, lng:78.4347, coverImg:'1519452575417-ac9b547d3296',
    amenities:['WiFi','AC','Parking','Gym','Laundry','Balcony','CCTV'],
    rules:'No alcohol. Curfew 11:30 PM.', rating:4.4, reviewCount:143, hasMess:false,
    basePrice:9000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Heritage Boys Hostel', type:'HOSTEL', gender:'BOYS', city:'Jaipur', address:'9 MI Road, Jaipur',
    lat:26.9124, lng:75.7873, coverImg:'1555854512-e0e58c0d7863',
    amenities:['WiFi','Power Backup','Parking','Study Room','CCTV','Hot Water'],
    rules:'No smoking or alcohol. Curfew 10 PM.', rating:4.0, reviewCount:60, hasMess:true,
    basePrice:6500, hasAC:false, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Galaxy Boys Hostel', type:'HOSTEL', gender:'BOYS', city:'Ahmedabad', address:'12 SG Highway, Ahmedabad',
    lat:23.0225, lng:72.5714, coverImg:'1486325212980-4e64cfea522e',
    amenities:['WiFi','AC','Power Backup','Parking','Gym','Laundry','Swimming Pool'],
    rules:'Strict no-alcohol policy. Curfew midnight.', rating:4.5, reviewCount:112, hasMess:true,
    basePrice:8000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Shanti Boys Hostel', type:'HOSTEL', gender:'BOYS', city:'Kolkata', address:'6 Salt Lake, Kolkata',
    lat:22.5726, lng:88.3639, coverImg:'1519452575417-ac9b547d3296',
    amenities:['WiFi','Power Backup','Study Room','Laundry','CCTV','Hot Water'],
    rules:'No loud music after 10 PM. Curfew 11 PM.', rating:3.9, reviewCount:55, hasMess:true,
    basePrice:6000, hasAC:false, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Prestige Boys Hostel', type:'HOSTEL', gender:'BOYS', city:'Surat', address:'45 Ring Road, Surat',
    lat:21.1702, lng:72.8311, coverImg:'1555854512-e0e58c0d7863',
    amenities:['WiFi','AC','Power Backup','Parking','Gym','CCTV','Hot Water'],
    rules:'No smoking. Curfew 11 PM.', rating:4.2, reviewCount:88, hasMess:true,
    basePrice:7800, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),
];

// ─── 10 Girls Hostels ─────────────────────────────────────────────────────────
const girlsHostels = [
  prop({ name:'Lotus Girls Hostel', type:'HOSTEL', gender:'GIRLS', city:'Mumbai', address:'8 Juhu, Mumbai',
    lat:19.1075, lng:72.8263, coverImg:'1614267861476-0d129972a0f7',
    amenities:['WiFi','AC','Power Backup','Laundry','CCTV','Hot Water','Study Room'],
    rules:'No male visitors. Strict curfew 9 PM.', rating:4.8, reviewCount:200, hasMess:true,
    basePrice:10000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Orchid Girls Hostel', type:'HOSTEL', gender:'GIRLS', city:'Pune', address:'11 FC Road, Pune',
    lat:18.5204, lng:73.8567, coverImg:'1560448204-603b3fc33ddc',
    amenities:['WiFi','Power Backup','Laundry','CCTV','Study Room','Balcony'],
    rules:'No male visitors. Curfew 9:30 PM.', rating:4.4, reviewCount:135, hasMess:true,
    basePrice:8500, hasAC:false, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Jasmine Girls Hostel', type:'HOSTEL', gender:'GIRLS', city:'Bangalore', address:'20 Indiranagar, Bangalore',
    lat:12.9784, lng:77.6408, coverImg:'1614267861476-0d129972a0f7',
    amenities:['WiFi','AC','Power Backup','Gym','Laundry','CCTV','Hot Water','Swimming Pool'],
    rules:'No male visitors. Curfew 10 PM.', rating:4.6, reviewCount:175, hasMess:true,
    basePrice:12000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Pearl Girls Hostel', type:'HOSTEL', gender:'GIRLS', city:'Delhi', address:'3 Vasant Kunj, Delhi',
    lat:28.5245, lng:77.1590, coverImg:'1560448204-603b3fc33ddc',
    amenities:['WiFi','Power Backup','Parking','CCTV','Laundry','Hot Water'],
    rules:'No male visitors. Curfew 9 PM.', rating:4.2, reviewCount:95, hasMess:true,
    basePrice:9000, hasAC:false, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Rose Girls Hostel', type:'HOSTEL', gender:'GIRLS', city:'Chennai', address:'25 Adyar, Chennai',
    lat:13.0012, lng:80.2565, coverImg:'1614267861476-0d129972a0f7',
    amenities:['WiFi','AC','Power Backup','Gym','CCTV','Study Room','Hot Water'],
    rules:'No male visitors. Curfew 9 PM.', rating:4.5, reviewCount:160, hasMess:true,
    basePrice:11000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Tulip Girls Hostel', type:'HOSTEL', gender:'GIRLS', city:'Hyderabad', address:'14 Jubilee Hills, Hyderabad',
    lat:17.4317, lng:78.4119, coverImg:'1560448204-603b3fc33ddc',
    amenities:['WiFi','AC','Laundry','CCTV','Balcony','Hot Water'],
    rules:'No male visitors. Curfew 10 PM.', rating:4.1, reviewCount:80, hasMess:false,
    basePrice:9500, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Sunflower Girls Hostel', type:'HOSTEL', gender:'GIRLS', city:'Jaipur', address:'7 C-Scheme, Jaipur',
    lat:26.9011, lng:75.8016, coverImg:'1614267861476-0d129972a0f7',
    amenities:['WiFi','Power Backup','Laundry','CCTV','Study Room','Hot Water'],
    rules:'Strict curfew 8:30 PM.', rating:4.3, reviewCount:70, hasMess:true,
    basePrice:7000, hasAC:false, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Daisy Girls Hostel', type:'HOSTEL', gender:'GIRLS', city:'Ahmedabad', address:'21 Navrangpura, Ahmedabad',
    lat:23.0300, lng:72.5600, coverImg:'1560448204-603b3fc33ddc',
    amenities:['WiFi','AC','Power Backup','Gym','Laundry','CCTV','Hot Water'],
    rules:'No male visitors. Curfew 10 PM.', rating:4.7, reviewCount:140, hasMess:true,
    basePrice:9000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Hibiscus Girls Hostel', type:'HOSTEL', gender:'GIRLS', city:'Kolkata', address:'5 New Town, Kolkata',
    lat:22.6175, lng:88.4473, coverImg:'1614267861476-0d129972a0f7',
    amenities:['WiFi','Power Backup','Laundry','Study Room','CCTV'],
    rules:'Curfew 9 PM. No male visitors.', rating:4.0, reviewCount:65, hasMess:true,
    basePrice:6500, hasAC:false, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Magnolia Girls Hostel', type:'HOSTEL', gender:'GIRLS', city:'Surat', address:'31 Vesu, Surat',
    lat:21.1489, lng:72.8021, coverImg:'1560448204-603b3fc33ddc',
    amenities:['WiFi','AC','Power Backup','Laundry','CCTV','Balcony','Hot Water'],
    rules:'No male visitors. Curfew 9:30 PM.', rating:4.4, reviewCount:95, hasMess:true,
    basePrice:8200, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),
];

// ─── 10 Boys PGs ──────────────────────────────────────────────────────────────
const boysPGs = [
  prop({ name:'Comfort Boys PG', type:'PG', gender:'BOYS', city:'Bangalore', address:'40 HSR Layout, Bangalore',
    lat:12.9116, lng:77.6389, coverImg:'1545324418-cc1a3fa12c98',
    amenities:['WiFi','AC','Power Backup','Laundry','CCTV','Hot Water','Food/Mess'],
    rules:'No guests after 10 PM. No alcohol.', rating:4.3, reviewCount:88, hasMess:true,
    basePrice:9500, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Urban Boys PG', type:'PG', gender:'BOYS', city:'Mumbai', address:'2 Bandra West, Mumbai',
    lat:19.0596, lng:72.8295, coverImg:'1449158743915-9167b84f5a1c',
    amenities:['WiFi','AC','Power Backup','Parking','CCTV','Hot Water'],
    rules:'No alcohol. Curfew 11 PM.', rating:4.2, reviewCount:72, hasMess:false,
    basePrice:12000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Scholar Boys PG', type:'PG', gender:'BOYS', city:'Pune', address:'16 Hadapsar, Pune',
    lat:18.5089, lng:73.9260, coverImg:'1545324418-cc1a3fa12c98',
    amenities:['WiFi','Power Backup','Study Room','Laundry','CCTV'],
    rules:'No smoking. Study hours 7–9 PM mandatory.', rating:4.1, reviewCount:60, hasMess:true,
    basePrice:7800, hasAC:false, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Prime Boys PG', type:'PG', gender:'BOYS', city:'Delhi', address:'19 Dwarka Sector 10, Delhi',
    lat:28.5921, lng:77.0460, coverImg:'1449158743915-9167b84f5a1c',
    amenities:['WiFi','AC','Power Backup','Parking','Gym','CCTV','Hot Water'],
    rules:'No alcohol. Curfew 11 PM.', rating:4.4, reviewCount:105, hasMess:true,
    basePrice:9000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Techie Boys PG', type:'PG', gender:'BOYS', city:'Hyderabad', address:'8 HITEC City, Hyderabad',
    lat:17.4474, lng:78.3762, coverImg:'1545324418-cc1a3fa12c98',
    amenities:['WiFi','AC','Power Backup','Laundry','CCTV','Gym'],
    rules:'No guests after 9 PM.', rating:4.5, reviewCount:130, hasMess:false,
    basePrice:10500, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Classic Boys PG', type:'PG', gender:'BOYS', city:'Chennai', address:'7 Anna Nagar, Chennai',
    lat:13.0850, lng:80.2101, coverImg:'1449158743915-9167b84f5a1c',
    amenities:['WiFi','Power Backup','Laundry','CCTV','Hot Water','Food/Mess'],
    rules:'No smoking. Curfew 10:30 PM.', rating:4.0, reviewCount:55, hasMess:true,
    basePrice:8000, hasAC:false, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Zenith Boys PG', type:'PG', gender:'BOYS', city:'Jaipur', address:'14 Vaishali Nagar, Jaipur',
    lat:26.9211, lng:75.7317, coverImg:'1545324418-cc1a3fa12c98',
    amenities:['WiFi','Power Backup','Parking','Laundry','CCTV'],
    rules:'No alcohol. Curfew 10 PM.', rating:3.9, reviewCount:45, hasMess:true,
    basePrice:6000, hasAC:false, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Apex Boys PG', type:'PG', gender:'BOYS', city:'Ahmedabad', address:'55 Satellite, Ahmedabad',
    lat:23.0143, lng:72.5121, coverImg:'1449158743915-9167b84f5a1c',
    amenities:['WiFi','AC','Power Backup','Gym','Laundry','CCTV'],
    rules:'No guests after 10 PM.', rating:4.2, reviewCount:82, hasMess:false,
    basePrice:8500, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Sigma Boys PG', type:'PG', gender:'BOYS', city:'Kolkata', address:'19 Behala, Kolkata',
    lat:22.4987, lng:88.3122, coverImg:'1545324418-cc1a3fa12c98',
    amenities:['WiFi','Power Backup','Laundry','CCTV','Hot Water'],
    rules:'Curfew 11 PM. No smoking.', rating:3.8, reviewCount:40, hasMess:true,
    basePrice:5800, hasAC:false, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Royal Boys PG', type:'PG', gender:'BOYS', city:'Surat', address:'10 Adajan, Surat',
    lat:21.1959, lng:72.7945, coverImg:'1449158743915-9167b84f5a1c',
    amenities:['WiFi','AC','Power Backup','Parking','CCTV','Hot Water'],
    rules:'No alcohol. Curfew 11 PM.', rating:4.1, reviewCount:68, hasMess:true,
    basePrice:7500, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),
];

// ─── 10 Girls PGs ─────────────────────────────────────────────────────────────
const girlsPGs = [
  prop({ name:'Serenity Girls PG', type:'PG', gender:'GIRLS', city:'Bangalore', address:'25 Whitefield, Bangalore',
    lat:12.9698, lng:77.7500, coverImg:'1560472354-b33ff0ad4a3d',
    amenities:['WiFi','AC','Power Backup','Laundry','CCTV','Hot Water','Gym','Food/Mess'],
    rules:'No male visitors. Curfew 9 PM.', rating:4.7, reviewCount:165, hasMess:true,
    basePrice:11000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Harmony Girls PG', type:'PG', gender:'GIRLS', city:'Mumbai', address:'6 Vile Parle, Mumbai',
    lat:19.0990, lng:72.8367, coverImg:'1522708323590-d8be8d4b8688',
    amenities:['WiFi','AC','Laundry','CCTV','Balcony','Hot Water'],
    rules:'No male visitors. Curfew 9:30 PM.', rating:4.4, reviewCount:102, hasMess:true,
    basePrice:13000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Bliss Girls PG', type:'PG', gender:'GIRLS', city:'Pune', address:'30 Wakad, Pune',
    lat:18.5986, lng:73.7613, coverImg:'1560472354-b33ff0ad4a3d',
    amenities:['WiFi','Power Backup','Laundry','CCTV','Study Room'],
    rules:'No male visitors. Curfew 9 PM.', rating:4.2, reviewCount:78, hasMess:true,
    basePrice:9000, hasAC:false, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Tranquil Girls PG', type:'PG', gender:'GIRLS', city:'Delhi', address:'9 Rajouri Garden, Delhi',
    lat:28.6466, lng:77.1196, coverImg:'1522708323590-d8be8d4b8688',
    amenities:['WiFi','AC','Power Backup','Gym','Laundry','CCTV','Hot Water'],
    rules:'No male visitors. Curfew 9 PM.', rating:4.5, reviewCount:120, hasMess:false,
    basePrice:11000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Shimmer Girls PG', type:'PG', gender:'GIRLS', city:'Hyderabad', address:'3 Ameerpet, Hyderabad',
    lat:17.4373, lng:78.4488, coverImg:'1560472354-b33ff0ad4a3d',
    amenities:['WiFi','AC','Laundry','CCTV','Hot Water','Food/Mess'],
    rules:'No male visitors. Curfew 9:30 PM.', rating:4.3, reviewCount:90, hasMess:true,
    basePrice:9500, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Glow Girls PG', type:'PG', gender:'GIRLS', city:'Chennai', address:'11 Nungambakkam, Chennai',
    lat:13.0569, lng:80.2425, coverImg:'1522708323590-d8be8d4b8688',
    amenities:['WiFi','Power Backup','Laundry','CCTV','Study Room','Hot Water'],
    rules:'No male visitors. Curfew 9 PM.', rating:4.1, reviewCount:65, hasMess:true,
    basePrice:9200, hasAC:false, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Peach Girls PG', type:'PG', gender:'GIRLS', city:'Jaipur', address:'22 Mansarovar, Jaipur',
    lat:26.8476, lng:75.7767, coverImg:'1560472354-b33ff0ad4a3d',
    amenities:['WiFi','Power Backup','Laundry','CCTV'],
    rules:'Strict curfew 8:30 PM.', rating:3.9, reviewCount:42, hasMess:true,
    basePrice:6800, hasAC:false, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Crystal Girls PG', type:'PG', gender:'GIRLS', city:'Ahmedabad', address:'15 Prahladnagar, Ahmedabad',
    lat:23.0088, lng:72.5050, coverImg:'1522708323590-d8be8d4b8688',
    amenities:['WiFi','AC','Power Backup','Gym','Laundry','CCTV','Hot Water'],
    rules:'No male visitors. Curfew 10 PM.', rating:4.6, reviewCount:115, hasMess:true,
    basePrice:9800, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Amber Girls PG', type:'PG', gender:'GIRLS', city:'Kolkata', address:'8 Ballygunge, Kolkata',
    lat:22.5271, lng:88.3675, coverImg:'1560472354-b33ff0ad4a3d',
    amenities:['WiFi','Power Backup','Laundry','CCTV','Balcony'],
    rules:'Curfew 9 PM. No male visitors.', rating:4.0, reviewCount:55, hasMess:false,
    basePrice:7000, hasAC:false, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Velvet Girls PG', type:'PG', gender:'GIRLS', city:'Surat', address:'36 Ghod Dod Road, Surat',
    lat:21.1767, lng:72.8148, coverImg:'1522708323590-d8be8d4b8688',
    amenities:['WiFi','AC','Power Backup','Laundry','CCTV','Hot Water'],
    rules:'No male visitors. Curfew 9:30 PM.', rating:4.3, reviewCount:79, hasMess:true,
    basePrice:8500, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),
];

// ─── 20 Apartments ────────────────────────────────────────────────────────────
const apartments = [
  prop({ name:'Skyline Apartments', type:'APARTMENT', gender:'ANY', city:'Mumbai', address:'100 Worli, Mumbai',
    lat:19.0096, lng:72.8179, coverImg:'1545324418-cc1a3fa12c98',
    amenities:['WiFi','AC','Power Backup','Parking','Gym','Swimming Pool','CCTV','Balcony'],
    rules:'No pet policy. No smoking inside flat.', rating:4.6, reviewCount:220, hasMess:false,
    basePrice:22000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Lakeside Residency', type:'APARTMENT', gender:'ANY', city:'Bangalore', address:'15 Bellandur, Bangalore',
    lat:12.9259, lng:77.6762, coverImg:'1449158743915-9167b84f5a1c',
    amenities:['WiFi','AC','Power Backup','Parking','Gym','CCTV','Balcony','Laundry'],
    rules:'Family-friendly complex.', rating:4.4, reviewCount:180, hasMess:false,
    basePrice:20000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Horizon Flats', type:'APARTMENT', gender:'ANY', city:'Pune', address:'7 Baner, Pune',
    lat:18.5590, lng:73.7868, coverImg:'1560472354-b33ff0ad4a3d',
    amenities:['WiFi','AC','Power Backup','Parking','Gym','Swimming Pool','CCTV'],
    rules:'No pets. Quiet hours 11 PM.', rating:4.5, reviewCount:145, hasMess:false,
    basePrice:19000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Central Park Apartments', type:'APARTMENT', gender:'ANY', city:'Delhi', address:'44 Saket, Delhi',
    lat:28.5265, lng:77.2159, coverImg:'1522708323590-d8be8d4b8688',
    amenities:['WiFi','AC','Power Backup','Parking','Gym','CCTV','Balcony'],
    rules:'No loud music after 10 PM.', rating:4.3, reviewCount:165, hasMess:false,
    basePrice:25000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Greenwood Residency', type:'APARTMENT', gender:'ANY', city:'Hyderabad', address:'22 Gachibowli, Hyderabad',
    lat:17.4449, lng:78.3498, coverImg:'1545324418-cc1a3fa12c98',
    amenities:['WiFi','AC','Power Backup','Parking','Gym','Swimming Pool','CCTV','Fridge'],
    rules:'Family complex. No commercial activity.', rating:4.7, reviewCount:195, hasMess:false,
    basePrice:21000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Sunrise Towers', type:'APARTMENT', gender:'ANY', city:'Chennai', address:'50 OMR, Chennai',
    lat:12.8949, lng:80.2235, coverImg:'1449158743915-9167b84f5a1c',
    amenities:['WiFi','AC','Power Backup','Parking','CCTV','Balcony','Laundry'],
    rules:'No smoking. Pets allowed with deposit.', rating:4.2, reviewCount:130, hasMess:false,
    basePrice:18000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Pink City Homes', type:'APARTMENT', gender:'ANY', city:'Jaipur', address:'9 Tonk Road, Jaipur',
    lat:26.8631, lng:75.8119, coverImg:'1560472354-b33ff0ad4a3d',
    amenities:['WiFi','AC','Power Backup','Parking','CCTV','Balcony'],
    rules:'Family friendly. No smoking.', rating:4.1, reviewCount:88, hasMess:false,
    basePrice:14000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Sabarmati Heights', type:'APARTMENT', gender:'ANY', city:'Ahmedabad', address:'30 Prahlad Nagar, Ahmedabad',
    lat:23.0129, lng:72.5069, coverImg:'1522708323590-d8be8d4b8688',
    amenities:['WiFi','AC','Power Backup','Parking','Gym','Swimming Pool','CCTV'],
    rules:'No smoking or alcohol on premises.', rating:4.4, reviewCount:112, hasMess:false,
    basePrice:16000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Victoria Grand', type:'APARTMENT', gender:'ANY', city:'Kolkata', address:'4 Alipore, Kolkata',
    lat:22.5310, lng:88.3356, coverImg:'1545324418-cc1a3fa12c98',
    amenities:['WiFi','AC','Power Backup','Parking','CCTV','Balcony'],
    rules:'Heritage building. No structural changes.', rating:4.0, reviewCount:75, hasMess:false,
    basePrice:17000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Diamond Residency', type:'APARTMENT', gender:'ANY', city:'Surat', address:'12 Pal, Surat',
    lat:21.1620, lng:72.8031, coverImg:'1449158743915-9167b84f5a1c',
    amenities:['WiFi','AC','Power Backup','Parking','Gym','CCTV','Balcony'],
    rules:'No smoking. Pets allowed.', rating:4.2, reviewCount:95, hasMess:false,
    basePrice:14500, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Maple Suites', type:'APARTMENT', gender:'ANY', city:'Nagpur', address:'8 Dharampeth, Nagpur',
    lat:21.1458, lng:79.0882, coverImg:'1560472354-b33ff0ad4a3d',
    amenities:['WiFi','AC','Power Backup','Parking','CCTV','Laundry'],
    rules:'Quiet hours 10 PM. No smoking.', rating:4.1, reviewCount:67, hasMess:false,
    basePrice:12000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Coastal Breeze Apts', type:'APARTMENT', gender:'ANY', city:'Kochi', address:'5 Marine Drive, Kochi',
    lat:9.9312, lng:76.2673, coverImg:'1522708323590-d8be8d4b8688',
    amenities:['WiFi','AC','Power Backup','Parking','Gym','Swimming Pool','Balcony','CCTV'],
    rules:'Sea-facing. No smoking indoors.', rating:4.8, reviewCount:240, hasMess:false,
    basePrice:19500, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Indus Apartments', type:'APARTMENT', gender:'ANY', city:'Chandigarh', address:'17 Sector 35, Chandigarh',
    lat:30.7333, lng:76.7794, coverImg:'1545324418-cc1a3fa12c98',
    amenities:['WiFi','AC','Power Backup','Parking','Gym','CCTV','Balcony'],
    rules:'Planned colony rules apply.', rating:4.3, reviewCount:100, hasMess:false,
    basePrice:15000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Cyber Heights', type:'APARTMENT', gender:'ANY', city:'Hyderabad', address:'10 Nanakramguda, Hyderabad',
    lat:17.4167, lng:78.3678, coverImg:'1449158743915-9167b84f5a1c',
    amenities:['WiFi','AC','Power Backup','Parking','Gym','Swimming Pool','CCTV','Fridge'],
    rules:'Tech-park adjacent. No smoking.', rating:4.6, reviewCount:185, hasMess:false,
    basePrice:24000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Olive Residences', type:'APARTMENT', gender:'ANY', city:'Bangalore', address:'42 JP Nagar, Bangalore',
    lat:12.9082, lng:77.5921, coverImg:'1560472354-b33ff0ad4a3d',
    amenities:['WiFi','AC','Power Backup','Parking','Gym','CCTV','Balcony','Laundry'],
    rules:'No pets. No smoking.', rating:4.4, reviewCount:155, hasMess:false,
    basePrice:20500, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Metro Suites', type:'APARTMENT', gender:'ANY', city:'Delhi', address:'6 Noida Sector 18, Delhi',
    lat:28.5700, lng:77.3211, coverImg:'1522708323590-d8be8d4b8688',
    amenities:['WiFi','AC','Power Backup','Parking','Gym','CCTV'],
    rules:'Commercial area. No loud music.', rating:4.2, reviewCount:110, hasMess:false,
    basePrice:22500, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Platinum Towers', type:'APARTMENT', gender:'ANY', city:'Mumbai', address:'77 Powai, Mumbai',
    lat:19.1176, lng:72.9060, coverImg:'1545324418-cc1a3fa12c98',
    amenities:['WiFi','AC','Power Backup','Parking','Gym','Swimming Pool','CCTV','Balcony','Fridge'],
    rules:'Gated community. No smoking.', rating:4.7, reviewCount:260, hasMess:false,
    basePrice:28000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Riverside Flats', type:'APARTMENT', gender:'ANY', city:'Pune', address:'33 Koregaon Park, Pune',
    lat:18.5362, lng:73.8927, coverImg:'1449158743915-9167b84f5a1c',
    amenities:['WiFi','AC','Power Backup','Parking','Gym','Balcony','CCTV','Laundry'],
    rules:'Premium locality. No commercial use.', rating:4.5, reviewCount:178, hasMess:false,
    basePrice:23000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'The Estate', type:'APARTMENT', gender:'ANY', city:'Chennai', address:'11 Besant Nagar, Chennai',
    lat:13.0002, lng:80.2656, coverImg:'1560472354-b33ff0ad4a3d',
    amenities:['WiFi','AC','Power Backup','Parking','Swimming Pool','CCTV','Balcony'],
    rules:'Beach proximity. No smoking.', rating:4.4, reviewCount:135, hasMess:false,
    basePrice:20000, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),

  prop({ name:'Lotus Grand Apartments', type:'APARTMENT', gender:'ANY', city:'Kolkata', address:'29 Rajarhat, Kolkata',
    lat:22.6197, lng:88.4562, coverImg:'1522708323590-d8be8d4b8688',
    amenities:['WiFi','AC','Power Backup','Parking','Gym','CCTV','Balcony','Laundry'],
    rules:'Modern township. Family only.', rating:4.3, reviewCount:142, hasMess:false,
    basePrice:17500, hasAC:true, roomImgIds:['1631049441893-f4e8f6aa2f72','1586023492125-27272f10e729','1595526051245-4506e0005bd0'] }),
];

// ─── Combined export ──────────────────────────────────────────────────────────
export const ALL_PROPERTIES = [
  ...boysHostels, ...girlsHostels, ...boysPGs, ...girlsPGs, ...apartments
];

// ─── Smart search synonyms ────────────────────────────────────────────────────
export const SYNONYMS = {
  pool: 'Swimming Pool', 'swimming pool': 'Swimming Pool',
  mess: 'Food/Mess', food: 'Food/Mess', canteen: 'Food/Mess',
  hostel: 'HOSTEL', pg: 'PG', accommodation: 'HOSTEL',
  flat: 'APARTMENT', apartment: 'APARTMENT',
  ac: 'AC', 'air conditioning': 'AC',
  wifi: 'WiFi', internet: 'WiFi',
  gym: 'Gym', fitness: 'Gym',
  park: 'Parking', parking: 'Parking',
  laundry: 'Laundry', washing: 'Laundry',
  study: 'Study Room', library: 'Study Room',
};

// Smart search function
export const smartSearch = (properties, query) => {
  if (!query.trim()) return properties;
  const q = query.toLowerCase();

  // Resolve synonyms
  let resolved = q;
  Object.keys(SYNONYMS).forEach(key => {
    if (q.includes(key)) resolved += ' ' + SYNONYMS[key].toLowerCase();
  });

  return properties.filter(p => {
    const haystack = [
      p.name, p.city, p.address, p.type, p.gender,
      ...p.amenities,
      p.rules,
    ].join(' ').toLowerCase();
    return resolved.split(' ').some(word => word.length > 2 && haystack.includes(word));
  });
};

export const CITIES = [...new Set(ALL_PROPERTIES.map(p => p.city))].sort();
