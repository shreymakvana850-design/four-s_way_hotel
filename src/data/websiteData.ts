import dalBaatiImg from '../assets/images/dal_baati_churma_1785159914667.jpg';
import rajasthaniRoyalThaliImg from '../assets/images/rajasthani_royal_thali.jpg';
import pyaazKachoriImg from '../assets/images/pyaaz_kachori_1785160124174.jpg';
import mirchiVadaImg from '../assets/images/jodhpuri_mirchi_vada_1785160354742.jpg';
import govindGattaImg from '../assets/images/govind_gatta_curry_1785160616815.jpg';
import papadKiSabziImg from '../assets/images/papad_ki_sabzi_1785160831188.jpg';
import dalMakhaniImg from '../assets/images/dal_makhani_punjabi_1785161071059.jpg';
import palakPaneerImg from '../assets/images/palak_paneer_curry_1785161515586.jpg';
import rajmaChawalImg from '../assets/images/rajma_chawal_ghee_1785161765456.jpg';
import kulhadKesarLassiImg from '../assets/images/kulhad_kesar_lassi_1785162031902.jpg';
import amritsariKulchaImg from '../assets/images/amritsari_stuffed_kulcha_1785162314264.jpg';
import choleBhatureImg from '../assets/images/amritsari_chole_bhature_1785162584688.jpg';
import fastFoodBurgerImg from '../assets/images/fast_food_burger_fries_1785242516204.jpg';
import chilledDrinksImg from '../assets/images/chilled_drinks_mojito_1785242532573.jpg';
import vadaPavImg from '../assets/images/mumbai_vada_pav_1785243200015.jpg';
import meduVadaImg from '../assets/images/crispy_medu_vada_1785243341470.jpg';
import specialTeaImg from '../assets/images/special_masala_tea_1785243524793.jpg';
import nylonKhamanImg from '../assets/images/nylon_khaman_dhokla_1785243670854.jpg';
import surtiSilkKhandviImg from '../assets/images/surti_silk_khandvi_dish.jpg';
import surtiPatraImg from '../assets/images/surti_patra_snack.jpg';
import onionUttapamImg from '../assets/images/onion_uttapam.jpg';
import southIndianThaliImg from '../assets/images/south_indian_thali.jpg';
import coffeeImg from '../assets/images/artisanal_coffee_cup_1785243794633.jpg';
import icedColdCoffeeImg from '../assets/images/iced_cold_coffee_1785244102526.jpg';
import momosImg from '../assets/images/steamed_veg_momos_1785244354809.jpg';
import amritsariPaneerBhurjiImg from '../assets/images/amritsari_paneer_bhurji_1785245353120.jpg';
import sarsoSaagMakheRotiImg from '../assets/images/sarso_saag_makhe_roti_1785244704477.jpg';
import undhiyuImg from '../assets/images/surti_undhiyu_dish_1785244867315.jpg';
import mangoMastaniImg from '../assets/images/mango_mastani_shake_1785245091173.jpg';
import oreoShakeImg from '../assets/images/oreo_chocolate_shake_1785245107151.jpg';
import mintMojitoImg from '../assets/images/mint_lime_mojito_1785245119677.jpg';
import caramelFrappeImg from '../assets/images/caramel_frappuccino_1785245132621.jpg';
import roseFaloodaImg from '../assets/images/rose_falooda_drink_1785245144168.jpg';
import blueLagoonImg from '../assets/images/blue_lagoon_mocktail_1785245165579.jpg';
import strawberryShakeImg from '../assets/images/strawberry_milkshake_1785245181433.jpg';
import nutellaShakeImg from '../assets/images/nutella_hazelnut_shake_1785245194659.jpg';
import peachIcedTeaImg from '../assets/images/peach_iced_tea_1785245207846.jpg';
import paniPuriImg from '../assets/images/pani_puri_golgappe_1785245682528.jpg';
import cheeseGarlicBreadImg from '../assets/images/cheese_garlic_bread_1785245943214.jpg';
import butterMilkImg from '../assets/images/masala_butter_milk_1785246133901.jpg';
import coldrinkImg from '../assets/images/coldrink_assorted_glasses_1785246256638.jpg';
import steamedMomosPlateImg from '../assets/images/steamed_momos_plate_1785246478276.jpg';
import vegHakkaNoodlesImg from '../assets/images/veg_hakka_noodles_1785246717523.jpg';
import vegSpringRollsImg from '../assets/images/veg_spring_rolls_1785246734457.jpg';
import chilliPaneerDryImg from '../assets/images/chilli_paneer_dry_1785246750577.jpg';
import vegFriedRiceImg from '../assets/images/veg_fried_rice_1785246765724.jpg';
import honeyChilliPotatoImg from '../assets/images/honey_chilli_potato_1785246781012.jpg';
import vegManchurianGravyImg from '../assets/images/veg_manchurian_gravy.jpg';
import gujaratiThaliImg from '../assets/images/gujarati_thali_platter_1785246899977.jpg';
import chineseBhelImg from '../assets/images/chinese_bhel_crispy_1785247134761.jpg';

export interface Suite {
  id: string;
  name: string;
  category: string;
  pricePerNight: number;
  capacity: string;
  size: string;
  image: string;
  description: string;
  amenities: string[];
  featured?: boolean;
}

export interface DiningVenue {
  id: string;
  name: string;
  type: string;
  timing: string;
  image: string;
  description: string;
  highlights: string[];
}

export interface WeddingVenue {
  id: string;
  name: string;
  capacity: string;
  type: string;
  image: string;
  description: string;
  features: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'Rajasthani' | 'Punjabi' | 'Gujarati' | 'South Indian' | 'Chinese' | 'Fast Food & Drinks';
  price: number;
  isVeg: boolean;
  description: string;
  image: string;
}

export interface FoodOrderItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface FoodOrder {
  id: string;
  guestName: string;
  phone: string;
  deliveryType: 'Room Delivery' | 'Table Dining' | 'Takeaway';
  roomOrTableNo: string;
  items: FoodOrderItem[];
  subtotal: number;
  gst: number;
  totalAmount: number;
  paymentMethod: 'Online Payment (UPI/Card)' | 'Cash Payment (Pay at Hotel)';
  paymentStatus: 'Paid' | 'Pending (Pay on Delivery)';
  orderStatus: 'Received' | 'Preparing' | 'Out for Delivery' | 'Delivered';
  timestamp: string;
}

export interface RoomRecord {
  id: string;
  roomNumber: string;
  suiteName: string;
  floor: string;
  status: 'Available' | 'Occupied' | 'Cleaning' | 'Reserved' | 'Maintenance';
  guestName?: string;
  guestPhone?: string;
  checkInDate?: string;
  checkOutDate?: string;
  tariffPerNight: number;
  paymentStatus?: 'Paid (Online)' | 'Pay at Desk (Cash)' | 'Pending';
}

export interface CustomerRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  bookingType: 'Room Stay' | 'Table Reservation' | 'Food Order' | 'Wedding Venue';
  details: string;
  amount: number;
  paymentMethod: 'Online Payment (UPI/Card)' | 'Cash Payment';
  paymentStatus: 'Paid' | 'Pending';
  date: string;
}

export const FOOD_MENU_DATA: MenuItem[] = [
  // Rajasthani
  {
    id: 'raj-1',
    name: 'Rajasthani Thali',
    category: 'Rajasthani',
    price: 580,
    isVeg: true,
    description: 'Royal Authentic Rajasthani Thali featuring Dal Baati Churma, Gatte ki Sabzi, Ker Sangri, Panchmel Dal, Bajra Rota, Pyaaz Kachori, Papad, Boondi Raita & Churma Sweet.',
    image: rajasthaniRoyalThaliImg
  },
  {
    id: 'raj-2',
    name: 'Govind Gatta Curry',
    category: 'Rajasthani',
    price: 420,
    isVeg: true,
    description: 'Royal gram flour dumplings stuffed with nuts and khoya simmered in rich saffron curd gravy.',
    image: govindGattaImg
  },
  {
    id: 'raj-3',
    name: 'Gatte ki Sabzi',
    category: 'Rajasthani',
    price: 380,
    isVeg: true,
    description: 'Gram flour dumplings simmered in rich spiced yogurt and aromatic Rajasthani spices gravy.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'raj-5',
    name: 'Pyaaz Kachori & Imli Chutney',
    category: 'Rajasthani',
    price: 220,
    isVeg: true,
    description: 'Crispy deep-fried flaky pastry filled with spicy onion, fennel, and coriander mixture served with sweet & tangy chutneys.',
    image: pyaazKachoriImg
  },
  {
    id: 'raj-6',
    name: 'Jodhpuri Mirchi Vada',
    category: 'Rajasthani',
    price: 240,
    isVeg: true,
    description: 'Large green chilies stuffed with tangy potato masala, coated in gram flour batter and golden fried crisp.',
    image: mirchiVadaImg
  },
  {
    id: 'raj-7',
    name: 'Papad ki Sabzi',
    category: 'Rajasthani',
    price: 340,
    isVeg: true,
    description: 'Roasted urad dal papads cooked in a rich, creamy curd gravy tempered with mustard seeds and fresh coriander.',
    image: papadKiSabziImg
  },

  // Punjabi
  {
    id: 'pun-1',
    name: 'Paneer Butter Masala',
    category: 'Punjabi',
    price: 450,
    isVeg: true,
    description: 'Creamy tomato butter gravy mein cooked fresh paneer cubes with rich butter and kasuri methi.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'pun-2',
    name: 'sarso da sag&makhe roti',
    category: 'Punjabi',
    price: 420,
    isVeg: true,
    description: 'Punjab ki famous traditional dish - fresh mustard greens saag served with makki roti, makkhan and gud.',
    image: sarsoSaagMakheRotiImg
  },
  {
    id: 'pun-3',
    name: 'Amritsari Chole Bhature',
    category: 'Punjabi',
    price: 340,
    isVeg: true,
    description: 'Spicy chole ke saath fluffy bhature, pickles and sirka onions.',
    image: choleBhatureImg
  },
  {
    id: 'pun-4',
    name: 'Stuffed Amritsari Kulcha',
    category: 'Punjabi',
    price: 320,
    isVeg: true,
    description: 'Stuffed tandoori kulcha, spicy chole aur imli chutney ke saath.',
    image: amritsariKulchaImg
  },
  {
    id: 'pun-5',
    name: 'Dal Makhani (Overnight Slow Cooked)',
    category: 'Punjabi',
    price: 390,
    isVeg: true,
    description: 'Black urad dal aur rajma ki rich, buttery dal slow cooked overnight on charcoal.',
    image: dalMakhaniImg
  },
  {
    id: 'pun-6',
    name: 'Tandoori Paneer Tikka',
    category: 'Punjabi',
    price: 440,
    isVeg: true,
    description: 'Tandoor mein grilled marinated paneer with capsicum, onion and mint chutney.',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'pun-7',
    name: 'Shahi Paneer',
    category: 'Punjabi',
    price: 450,
    isVeg: true,
    description: 'Creamy aur rich paneer curry cooked with cashew gravy and royal spices.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'pun-8',
    name: 'Palak Paneer',
    category: 'Punjabi',
    price: 420,
    isVeg: true,
    description: 'Palak aur paneer ki healthy curry cooked in aromatic Punjabi spices.',
    image: palakPaneerImg
  },
  {
    id: 'pun-9',
    name: 'Rajma Chawal with Desi Ghee',
    category: 'Punjabi',
    price: 320,
    isVeg: true,
    description: 'Rajma curry ke saath steamed basmati rice served with fresh ghee.',
    image: rajmaChawalImg
  },
  {
    id: 'pun-10',
    name: 'Tandoori Soya Chaap',
    category: 'Punjabi',
    price: 420,
    isVeg: true,
    description: 'Yogurt aur masalon mein marinated grilled soya chaap cooked in clay tandoor.',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'pun-11',
    name: 'Amritsari Paneer Crispy Fry',
    category: 'Punjabi',
    price: 410,
    isVeg: true,
    description: 'Crispy spicy cottage cheese fry marinated in ajwain, gram flour and lemon juice.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'pun-12',
    name: 'Kadai Paneer',
    category: 'Punjabi',
    price: 430,
    isVeg: true,
    description: 'Capsicum aur paneer ki masaledar sabzi cooked with fresh kadai spices.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'pun-13',
    name: 'Punjabi Kadhi Pakora',
    category: 'Punjabi',
    price: 350,
    isVeg: true,
    description: 'Dahi ki kadhi mein crispy onion pakode tempered with mustard and dried red chillies.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'pun-14',
    name: 'Kulhad Kesar Lassi',
    category: 'Punjabi',
    price: 180,
    isVeg: true,
    description: 'Punjab ki famous thick sweet creamy yogurt drink topped with malai and saffron.',
    image: kulhadKesarLassiImg
  },

  // Gujarati
  {
    id: 'guj-1',
    name: 'Gujarati Thali',
    category: 'Gujarati',
    price: 550,
    isVeg: true,
    description: 'Traditional lavish Gujarati Thali featuring Ringan Bharta, Sev Tameta, Gujarati Sweet Dal, Kadhi, Steamed Rice, Phulka Rotli, Dhokla, Papad & Sweet.',
    image: gujaratiThaliImg
  },
  {
    id: 'guj-2',
    name: 'Patra',
    category: 'Gujarati',
    price: 260,
    isVeg: true,
    description: 'Steamed & spiced colocasia leaf rolls stuffed with tangy gram flour paste, sliced and tempered with mustard seeds, sesame & fresh coconut.',
    image: surtiPatraImg
  },
  {
    id: 'guj-3',
    name: 'Surti Undhiyu & Puri',
    category: 'Gujarati',
    price: 420,
    isVeg: true,
    description: 'Traditional Gujarati winter medley of sweet potatoes, purple yam, raw banana, and green muthiyas with fluffy puris.',
    image: undhiyuImg
  },
  {
    id: 'guj-4',
    name: 'Nylon Khaman',
    category: 'Gujarati',
    price: 220,
    isVeg: true,
    description: 'Soft & spongy steamed gram flour cakes tempered with mustard seeds, curry leaves and green chilies.',
    image: nylonKhamanImg
  },
  {
    id: 'guj-5',
    name: 'Surti Silk Khandvi',
    category: 'Gujarati',
    price: 240,
    isVeg: true,
    description: 'Silky smooth yellow rolled gram flour & buttermilk savory snack tempered with mustard seeds, coriander and fresh coconut.',
    image: surtiSilkKhandviImg
  },

  // South Indian
  {
    id: 'so-1',
    name: 'Royal Mysore Masala Dosa',
    category: 'South Indian',
    price: 280,
    isVeg: true,
    description: 'Crispy fermented rice crepe lined with spicy red chutney, stuffed with potato masala, served with 3 chutneys & sambar.',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'so-2',
    name: 'Medu Vada',
    category: 'South Indian',
    price: 220,
    isVeg: true,
    description: 'Crispy golden fried black gram fritters served with hot spicy lentil sambar and fresh coconut chutney.',
    image: meduVadaImg
  },
  {
    id: 'so-3',
    name: 'Uttapam',
    category: 'South Indian',
    price: 260,
    isVeg: true,
    description: 'Thick, fluffy South Indian fermented rice-lentil pancake topped with onions, tomatoes, green chilies and cilantro served with coconut chutneys & hot sambar.',
    image: onionUttapamImg
  },
  {
    id: 'so-4',
    name: 'Idli & Sambar',
    category: 'South Indian',
    price: 250,
    isVeg: true,
    description: 'Soft fluffy steamed rice cakes served with aromatic hot lentil sambar and fresh coconut chutney.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'so-5',
    name: 'South Indian Thali',
    category: 'South Indian',
    price: 320,
    isVeg: true,
    description: 'Authentic Grand South Indian Thali featuring Rice, Sambar, Rasam, Poriyal, Kootu, Appalam, Curd & Payasam served on a traditional platter.',
    image: southIndianThaliImg
  },

  // Chinese
  {
    id: 'ch-1',
    name: 'Veg Manchurian Gravy & Fried Rice',
    category: 'Chinese',
    price: 360,
    isVeg: true,
    description: 'Crispy vegetable dumplings cooked in soy garlic chili sauce served with wok-tossed aromatic fried rice.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ch-2',
    name: 'Schezwan Chili Garlic Noodles',
    category: 'Chinese',
    price: 320,
    isVeg: true,
    description: 'Wok-tossed noodles with shredded bell peppers, cabbage, carrot in spicy house Schezwan sauce.',
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ch-3',
    name: 'Momos',
    category: 'Chinese',
    price: 180,
    isVeg: true,
    description: 'Freshly steamed vegetable dumplings stuffed with seasoned vegetables and paneer, served with spicy red garlic dip.',
    image: steamedMomosPlateImg
  },
  {
    id: 'ch-4',
    name: 'Veg Hakka Noodles',
    category: 'Chinese',
    price: 240,
    isVeg: true,
    description: 'Wok-tossed stir-fried noodles cooked with thin julienned bell peppers, crunchy cabbage, carrots and spring onions.',
    image: vegHakkaNoodlesImg
  },
  {
    id: 'ch-5',
    name: 'Veg Spring Rolls',
    category: 'Chinese',
    price: 220,
    isVeg: true,
    description: 'Crispy golden fried wrapper stuffed with seasoned vegetables and noodles, served sliced with sweet chili sauce.',
    image: vegSpringRollsImg
  },
  {
    id: 'ch-6',
    name: 'Chilli Paneer Dry',
    category: 'Chinese',
    price: 290,
    isVeg: true,
    description: 'Crispy cottage cheese paneer cubes tossed in rich garlic soy chili sauce with bell peppers and green onions.',
    image: chilliPaneerDryImg
  },
  {
    id: 'ch-7',
    name: 'Veg Fried Rice',
    category: 'Chinese',
    price: 230,
    isVeg: true,
    description: 'Aromatic basmati rice wok-tossed with finely chopped carrots, green peas, spring onions and Chinese spices.',
    image: vegFriedRiceImg
  },
  {
    id: 'ch-8',
    name: 'Honey Chilli Potato',
    category: 'Chinese',
    price: 210,
    isVeg: true,
    description: 'Crispy potato fingers glazed with sweet honey chili garlic sauce, sesame seeds and spring onion greens.',
    image: honeyChilliPotatoImg
  },
  {
    id: 'ch-9',
    name: 'Manchurian',
    category: 'Chinese',
    price: 220,
    isVeg: true,
    description: 'Crispy vegetable Manchurian balls simmered in rich, glossy dark soya chili garlic gravy topped with fresh spring onions.',
    image: vegManchurianGravyImg
  },
  {
    id: 'ch-10',
    name: 'Chinese Bhel',
    category: 'Chinese',
    price: 190,
    isVeg: true,
    description: 'Crispy fried crunchy noodles tossed with crunchy cabbage, capsicum, spicy Schezwan sauce and spring onions.',
    image: chineseBhelImg
  },

  // Fast Food & Drinks
  {
    id: 'ff-0',
    name: 'Crispy Samosa',
    category: 'Fast Food & Drinks',
    price: 180,
    isVeg: true,
    description: 'Golden crispy pastry stuffed with spicy potatoes, green peas, and cashews served with sweet tamarind and mint chutney.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ff-1',
    name: 'Bombay Vada Pav',
    category: 'Fast Food & Drinks',
    price: 150,
    isVeg: true,
    description: 'Authentic Mumbai street food - spicy potato fritter stuffed in soft pav bun with red garlic chutney, green mint chutney & fried chili.',
    image: vadaPavImg
  },
  {
    id: 'ff-2',
    name: 'Pani Puri',
    category: 'Fast Food & Drinks',
    price: 120,
    isVeg: true,
    description: 'Crispy hollow puris filled with spicy potato chickpeas mash, fine sev and served with tangy chilled mint coriander pani.',
    image: paniPuriImg
  },
  {
    id: 'ff-3',
    name: 'Cheese Garlic Bread',
    category: 'Fast Food & Drinks',
    price: 240,
    isVeg: true,
    description: 'Oven-baked crispy baguette slices topped with garlic butter, melted mozzarella cheese, herbs and chili flakes.',
    image: cheeseGarlicBreadImg
  },
  {
    id: 'ff-4',
    name: 'Special Tea',
    category: 'Fast Food & Drinks',
    price: 60,
    isVeg: true,
    description: 'Aromatic hot Indian special masala chai brewed with cardamom, ginger, cloves, and fresh milk.',
    image: specialTeaImg
  },
  {
    id: 'ff-5',
    name: 'Coffee',
    category: 'Fast Food & Drinks',
    price: 120,
    isVeg: true,
    description: 'Aromatic fresh-brewed hot espresso cappuccino with velvety microfoam and heart latte art.',
    image: coffeeImg
  },
  {
    id: 'ff-6',
    name: 'Iced Cold Coffee with Ice Cream',
    category: 'Fast Food & Drinks',
    price: 180,
    isVeg: true,
    description: 'Creamy blended espresso coffee topped with chocolate drizzle and vanilla ice cream froth.',
    image: icedColdCoffeeImg
  },
  {
    id: 'ff-7',
    name: 'Mango Mastani Shake',
    category: 'Fast Food & Drinks',
    price: 190,
    isVeg: true,
    description: 'Rich Alphonso mango thick shake topped with mango ice cream, chopped almonds, pistachios, and cherry.',
    image: mangoMastaniImg
  },
  {
    id: 'ff-8',
    name: 'Chocolate Oreo Thickshake',
    category: 'Fast Food & Drinks',
    price: 170,
    isVeg: true,
    description: 'Rich creamy chocolate milk blended with crushed Oreo cookies, topped with whipped cream and cookie crumbs.',
    image: oreoShakeImg
  },
  {
    id: 'ff-9',
    name: 'Virgin Mint Lime Mojito',
    category: 'Fast Food & Drinks',
    price: 140,
    isVeg: true,
    description: 'Refreshing muddled fresh mint, lime slices, crushed ice, and sparkling citrus soda.',
    image: mintMojitoImg
  },
  {
    id: 'ff-10',
    name: 'Caramel Frappuccino',
    category: 'Fast Food & Drinks',
    price: 180,
    isVeg: true,
    description: 'Chilled blended espresso with ice, rich butter caramel sauce, and fluffy whipped cream topping.',
    image: caramelFrappeImg
  },
  {
    id: 'ff-11',
    name: 'Royal Rose Falooda',
    category: 'Fast Food & Drinks',
    price: 160,
    isVeg: true,
    description: 'Traditional rose syrup milk with basil seeds (sabja), vermicelli, vanilla ice cream, and nuts.',
    image: roseFaloodaImg
  },
  {
    id: 'ff-12',
    name: 'Blue Lagoon Mocktail',
    category: 'Fast Food & Drinks',
    price: 150,
    isVeg: true,
    description: 'Vibrant blue curaçao mocktail with lemon juice, ice, mint, and fizzy sparkling soda.',
    image: blueLagoonImg
  },
  {
    id: 'ff-13',
    name: 'Fresh Strawberry Milkshake',
    category: 'Fast Food & Drinks',
    price: 160,
    isVeg: true,
    description: 'Creamy strawberry thick shake made with fresh strawberry glaze and topped with whipped cream.',
    image: strawberryShakeImg
  },
  {
    id: 'ff-14',
    name: 'Butter Milk',
    category: 'Fast Food & Drinks',
    price: 90,
    isVeg: true,
    description: 'Chilled refreshing churned curd spiced drink seasoned with roasted cumin, black salt, and fresh mint.',
    image: butterMilkImg
  },
  {
    id: 'ff-15',
    name: 'Coldrink',
    category: 'Fast Food & Drinks',
    price: 60,
    isVeg: true,
    description: 'Chilled carbonated soft drinks served with ice cubes and fresh lemon slices.',
    image: coldrinkImg
  }
];

const generate100Rooms = (): RoomRecord[] => {
  const roomsList: RoomRecord[] = [];
  const occupiedNumbers = [101, 105, 112, 118, 201, 208, 214, 219, 303, 310, 317, 402, 409, 415, 504, 511, 518];
  const cleaningNumbers = [104, 202, 305, 410, 508];
  const reservedNumbers = [301, 405];
  const maintenanceNumbers = [119, 520];

  const guests = [
    { name: 'Maharaval Digvijay Singh', phone: '+91 98980 11223' },
    { name: 'Rohan & Sanya Kapadia', phone: '+91 99090 44556' },
    { name: 'Vikramaditya Singhania', phone: '+91 98765 43210' },
    { name: 'Priya & Rahul Sharma', phone: '+91 97234 56789' },
    { name: 'Ananya & Karan Patel', phone: '+91 98234 11223' },
    { name: 'Dr. Sameer Roy', phone: '+91 98111 88990' },
    { name: 'Sunil & Kavita Mehra', phone: '+91 99887 76655' },
    { name: 'Harshvardhan Rana', phone: '+91 97654 32109' },
  ];

  for (let floor = 1; floor <= 5; floor++) {
    for (let r = 1; r <= 20; r++) {
      const roomNum = floor * 100 + r;
      const numStr = roomNum.toString();
      let suiteName = 'Ranivas Deluxe Suite';
      let tariff = 12000;

      if (floor === 1) {
        if (r <= 8) { suiteName = 'Maharaja Suite'; tariff = 28000; }
        else { suiteName = 'Maharani Suite'; tariff = 22000; }
      } else if (floor === 2) {
        if (r <= 8) { suiteName = 'Maharani Suite'; tariff = 22000; }
        else { suiteName = 'Suryavanshi Suite'; tariff = 18000; }
      } else if (floor === 3) {
        if (r <= 10) { suiteName = 'Suryavanshi Suite'; tariff = 18000; }
        else { suiteName = 'Rajvanshi Suite'; tariff = 15000; }
      } else if (floor === 4) {
        if (r <= 10) { suiteName = 'Rajvanshi Suite'; tariff = 15000; }
        else { suiteName = 'Peacock Suite'; tariff = 13500; }
      } else {
        suiteName = 'Ranivas Deluxe Suite'; tariff = 12000;
      }

      let status: RoomRecord['status'] = 'Available';
      let guestName: string | undefined = undefined;
      let guestPhone: string | undefined = undefined;
      let paymentStatus: RoomRecord['paymentStatus'] = undefined;

      if (occupiedNumbers.includes(roomNum)) {
        status = 'Occupied';
        const g = guests[roomNum % guests.length];
        guestName = g.name;
        guestPhone = g.phone;
        paymentStatus = 'Paid (Online)';
      } else if (cleaningNumbers.includes(roomNum)) {
        status = 'Cleaning';
      } else if (reservedNumbers.includes(roomNum)) {
        status = 'Reserved';
        guestName = 'VIP Guest';
        paymentStatus = 'Paid (Online)';
      } else if (maintenanceNumbers.includes(roomNum)) {
        status = 'Maintenance';
      }

      roomsList.push({
        id: numStr,
        roomNumber: numStr,
        suiteName,
        floor: `${floor}${floor === 1 ? 'st' : floor === 2 ? 'nd' : floor === 3 ? 'rd' : 'th'} Floor`,
        status,
        guestName,
        guestPhone,
        tariffPerNight: tariff,
        paymentStatus,
        checkInDate: status === 'Occupied' ? '2026-08-01' : undefined,
        checkOutDate: status === 'Occupied' ? '2026-08-04' : undefined,
      });
    }
  }
  return roomsList;
};

export const INITIAL_ROOMS_DATA: RoomRecord[] = generate100Rooms();

export const SUITES_DATA: Suite[] = [
  {
    id: 'maharaja-suite',
    name: 'Maharaja Suite',
    category: 'Royal Presidential Suite',
    pricePerNight: 28000,
    capacity: '2 Adults + 2 Children',
    size: '1,200 sq.ft.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    description: 'The pinnacle of royal opulence. Features authentic Rajasthani-Kathiawadi silver-embossed furniture, private Jharokha balcony with 360-degree hill views, king-sized poster bed, and dedicated royal butler.',
    amenities: ['Private Jharokha Balcony', 'Dedicated Royal Butler', 'Jacuzzi with View', 'Free Airport Pickup', 'Kama Ayurveda Toiletries', 'Heritage Breakfast'],
    featured: true
  },
  {
    id: 'maharani-suite',
    name: 'Maharani Suite',
    category: 'Heritage Luxury Suite',
    pricePerNight: 22000,
    capacity: '2 Adults',
    size: '950 sq.ft.',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    description: 'Decorated with traditional stained glass windows, plush silk upholstery, hand-painted ceiling motifs, and a serene inner courtyard view.',
    amenities: ['Stained Glass Jharokha', 'Butler Service', 'Heritage Bath Tubs', 'Welcome Sparkling Drink', 'Kama Ayurveda Kit', 'Complimentary High Tea'],
    featured: true
  },
  {
    id: 'suryavanshi-suite',
    name: 'Suryavanshi Suite',
    category: 'Panoramic Sun Suite',
    pricePerNight: 18000,
    capacity: '2 Adults + 1 Child',
    size: '750 sq.ft.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    description: 'Positioned at the highest elevation of the palace hill top, capturing breathtaking sunrises over the Rajkot landscape.',
    amenities: ['Sunrise Deck', 'Custom Teakwood Furniture', 'Express Check-In', 'High-speed Wi-Fi', 'Luxury Linens'],
    featured: true
  },
  {
    id: 'rajvanshi-suite',
    name: 'Rajvanshi Suite',
    category: 'Executive Heritage Suite',
    pricePerNight: 15000,
    capacity: '2 Adults',
    size: '650 sq.ft.',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
    description: 'Charming stone-wall aesthetics seamlessly combined with high-tech modern guest comforts and antique brass fixtures.',
    amenities: ['Stone Archway Views', 'Work Desk & Sitting Area', 'Tea/Coffee Sommelier', 'Daily Fruit Basket'],
    featured: false
  },
  {
    id: 'peacock-suite',
    name: 'Peacock Suite',
    category: 'Garden View Suite',
    pricePerNight: 13500,
    capacity: '2 Adults',
    size: '580 sq.ft.',
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
    description: 'Overlooking the lush Suryavanshi Lawns where wild peacocks roam at dawn, creating a magical retreat.',
    amenities: ['Garden View Patio', 'Teak Canopy Bed', 'Organic Amenities', 'Heritage Tea Bar'],
    featured: false
  },
  {
    id: 'ranivas-suite',
    name: 'Ranivas Deluxe Suite',
    category: 'Heritage Courtyard Suite',
    pricePerNight: 12000,
    capacity: '2 Adults',
    size: '500 sq.ft.',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
    description: 'Located in the historic Ranivas wing, showcasing intricate jali screens and authentic brass lamps.',
    amenities: ['Courtyard Access', 'Rain Shower', 'Heritage Decor', 'Direct Butler Intercom'],
    featured: false
  }
];

export const DINING_DATA: DiningVenue[] = [
  {
    id: 'deep-mahal',
    name: 'Deep Mahal',
    type: 'Royal Kathiyawadi & Indian Fine Dining',
    timing: '7:00 AM – 11:00 PM',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    description: 'Adorned with glowing oil lamps and brass chandeliers. Serves authentic royal Kathiyawadi Thali, Ringan Bharta with Sev Tameta, Bajra Rota with Ghee & Organic Jaggery.',
    highlights: ['Royal Kathiyawadi Thali', 'Live Shehnai Music', 'Handcrafted Clayware', 'Chef Special Mughlai Dishes']
  },
  {
    id: 'sheesh-mahal',
    name: 'Sheesh Mahal',
    type: 'Glass Mirror Palace Dining',
    timing: '12:30 PM – 11:00 PM',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Decorated with thousands of intricate Belgian mirror mosaics reflecting warm candlelight for an enchanting fine dining experience.',
    highlights: ['Belgian Mirror Mosaics', 'Candlelight Private Dining', 'Continental & Pan-Asian Delicacies', 'Royal Mocktail Bar']
  },
  {
    id: 'jal-mahal',
    name: 'Jal Mahal Terrace & Poolside',
    type: 'Open-Air Hilltop Lounge & Barbecue',
    timing: '6:00 PM – 11:30 PM',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    description: 'Enjoy hilltop starlight breeze and gourmet sizzlers alongside the royal pool overlooking Rajkot skyline.',
    highlights: ['Open-air Hilltop Sunset View', 'Live Tandoor & Grill', 'Custom Cocktails & Shisha', 'Private Cabanas']
  }
];

export const WEDDING_VENUES_DATA: WeddingVenue[] = [
  {
    id: 'suryavanshi-lawns',
    name: 'Suryavanshi Lawns',
    capacity: '1,200 Guests',
    type: 'Grand Outdoor Lawn',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    description: 'Sprawling 40,000 sq.ft. manicured royal lawns framed by illuminated palace facade, ideal for fairytale royal weddings and grand baraat entries.',
    features: ['Vintage Elephant & Horse Baraat Space', 'Custom Marigold & Lotus Mandap', 'Helipad Access', 'Separate Dining Pavilions']
  },
  {
    id: 'darbar-hall',
    name: 'Darbar Hall',
    capacity: '300 Guests',
    type: 'Indoor Royal Ballroom',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    description: 'High-ceilinged hall with crystal chandeliers, antique weapons display, and carved wooden thrones for Sangeet, engagement & corporate summits.',
    features: ['Acoustically Treated Sound', 'Built-in Stage & LED Walls', 'Royal Velvet Lounge', 'Valet Parking']
  },
  {
    id: 'heritage-courtyard',
    name: 'Heritage Courtyard',
    capacity: '250 Guests',
    type: 'Open Courtyard',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
    description: 'Intimate open-air stone courtyard surrounded by 450-year-old arches for Mehendi, Haldi ceremonies & sunset cocktails.',
    features: ['Central Fountain Backdrop', 'Folk Dancer Stage', 'Fairy Light Canopy', 'Traditional Seating']
  }
];

export const EXPERIENCES_DATA = [
  {
    title: 'Vintage Car Procession',
    icon: 'Car',
    description: 'Arrive in regal style with our fleet of restored 1930s Rolls Royce and Vintage Chevrolet palace cars.'
  },
  {
    title: 'Sunset Shehnai & Folk Music',
    icon: 'Music',
    description: 'Immerse yourself in soul-stirring Kathiyawadi folk songs and flute melodies every evening on the terrace.'
  },
  {
    title: 'Royal Swimming Pool & Spa',
    icon: 'Waves',
    description: 'Relax in our temperature-controlled infinity pool carved into hill rock with Kama Ayurveda therapies.'
  },
  {
    title: '450-Year Palace Guided Walk',
    icon: 'Compass',
    description: 'Discover hidden secret passages, ancient armory, and royal artifacts guided by palace historians.'
  }
];

export const TESTIMONIALS_DATA = [
  {
    quote: "Staying at Four's Way Hotel felt like living in a timeless royal fairy tale. The Maharaja Suite view and the Kathiyawadi Thali at Deep Mahal were beyond world class!",
    author: "Raghuvendra & Harshita Rathore",
    location: "Mumbai, Maharashtra",
    rating: 5
  },
  {
    quote: "We hosted our daughter's destination wedding at Suryavanshi Lawns. The royal hospitality, illuminated palace backdrop, and butler service exceeded every dream.",
    author: "Dr. K. P. Jadeja",
    location: "Ahmedabad, Gujarat",
    rating: 5
  },
  {
    quote: "An oasis of tranquility near Rajkot. Sitting in the Sheesh Mahal surrounded by mirror art while enjoying candlelit dining is an experience my family will cherish forever.",
    author: "Ananya & Vikram Shah",
    location: "Delhi, India",
    rating: 5
  }
];
