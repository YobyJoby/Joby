const menu = [
  {
    id: 1,
    name: 'Bubble Coffee',
    subMenu: [
      { id: 101, name: 'Iced', price: 5.89, image: '/Yoby - Menu - bubble coffee 1.png' },
      { id: 102, name: 'Iced Decaf', price: 5.89, image: '/Yoby - Menu - bubble coffee 2.png' },
      { id: 103, name: 'Warm', price: 4.89, image: '/Yoby - Menu - bubble coffee 3.png' },
      { id: 104, name: 'Warm Decaf', price: 4.89, image: '/Yoby - Menu - bubble coffee 4.png' },
    ],
    modifiers: [
      { name: 'Medium', price: 0 },
      { name: 'Large', price: 0.85 }
    ],
    image: '/Yoby - Menu - bubble coffee ICON.png',
  },
  {
    id: 2,
    name: 'Bubble Tea',
    subMenu: [
      { id: 201, name: 'Brown Sugar Milk Bubble Tea', price: 7.00, image: '/Yoby - Menu - Bubble Tea 1.png' },
      { id: 202, name: 'Smooth Taro Milk Bubble Tea', price: 7.00, image: '/Yoby - Menu - Bubble Tea 2.png' },
      { id: 203, name: 'Winter Melon Milk Bubble Tea', price: 6.50, image: '/Yoby - Menu - Bubble Tea 3.png' },
      { id: 204, name: 'Jasmine Milk Bubble Tea', price: 6.50, image: '/Yoby - Menu - Bubble Tea 4.png' },
      { id: 205, name: 'Grapefruit Fruit Bubble Tea', price: 7.00, image: '/Yoby - Menu - Bubble Tea 5.png' },
      { id: 206, name: 'Mango Fruit Bubble Tea', price: 7.00, image: '/Yoby - Menu - Bubble Tea 6.png' },
      { id: 207, name: 'Orange Fruit Bubble Tea', price: 7.00, image: '/Yoby - Menu - Bubble Tea 7.png' },
      { id: 208, name: 'Peach Fruit Bubble Tea', price: 7.00, image: '/Yoby - Menu - Bubble Tea 8.png' },
      { id: 209, name: 'Grape Fruit Bubble Tea', price: 7.00, image: '/Yoby - Menu - Bubble Tea 9.png' },
      { id: 210, name: 'Passion Fruit Bubble Tea', price: 7.00, image: '/Yoby - Menu - Bubble Tea 10.png' },
    ],
    modifiers: [
      { name: 'Medium', price: 0 },
      { name: 'Large', price: 1.00 }
    ],
    secondModifiers: [
      { name: 'Add Protein', price: 1.50 },
      { name: 'Add Collagen', price: 1.50 },
      { name: 'Add Creatine', price: 1.50 },
    ],
    image: '/Yoby - Menu - Bubble Tea ICON.png',
  },
  {
    id: 3,
    name: 'Smoothies',
    subMenu: [
      {
        id: 301,
        name: 'Strawberry Blossom',
        price: 6.48,
        effect: 'Antioxidant, Vitamin C, Bright Skin',
        ingredients: 'Strawberry, Banana, Pineapple',
        image: '/Yoby - Menu - Smoothie 1.png',
      },
      {
        id: 302,
        name: 'Nutty Date Delight',
        price: 6.48,
        effect: 'Mind focus, Muscle building & recovery',
        ingredients: 'Banana, Peanut Butter, Pineapple, Cocoa, dates',
        image: '/Yoby - Menu - Smoothie 2.png',
      },
      {
        id: 303,
        name: "Hailey's Glamour Shimmer",
        price: 7.48,
        effect: 'Antioxidant, Vitamin C, Bright Skin, Hair, and Nails',
        ingredients: 'Strawberry, Pineapple, Avacado, Coconut',
        image: '/Yoby - Menu - Smoothie 3.png',
      },
      {
        id: 304,
        name: 'Mango Banana Island',
        price: 6.48,
        effect: 'Vitamin C, Skin Regeneration, Energy',
        ingredients: 'Mango, Banana, Pineapple, Coconut milk',
        image: '/Yoby - Menu - Smoothie 4.png',
      },
      {
        id: 305,
        name: 'Blueberry Energetic Shower',
        price: 6.48,
        effect: 'Antioxidant, Anti-Aging, Stress Relief',
        ingredients: 'Blueberries, Bananas, Pineapples',
        image: '/Yoby - Menu - Smoothie 5.png',
      },
      {
        id: 306,
        name: 'Zesty Green Detox',
        price: 6.99,
        effect: 'Detoxification, Inflammation Relief',
        ingredients: 'Avocado, Spinach, Cabbage, Broccoli',
        image: '/Yoby - Menu - Smoothie 6.png',
      },
      {
        id: 307,
        name: 'Blood Power Detox',
        price: 6.99,
        effect: 'Blood purification, Fat Burning, Blood Vessel Health',
        ingredients: 'Beet, Apple, Carrot, Coconut Water',
        image: '/Yoby - Menu - Smoothie 7.png',
      },
    ],
    modifiers: [
      { name: 'Medium', price: 0 },
      { name: 'Large', price: 1.00 }
    ],
    secondModifiers: [
      { name: 'Add Protein', price: 1.50 },
      { name: 'Add Collagen', price: 1.50 },
      { name: 'Add Creatine', price: 1.50 },
    ],
    image: '/Yoby - Menu - Smoothie ICON.png',
  },
  {
    id: 4,
    name: 'Iced Drinks',
    subMenu: [
      { id: 401, name: 'Iced Tea', price: 4.50, image: '/Yoby - Menu - iced drinks 1.png' },
      { id: 402, name: 'Iced Coffee', price: 4.50, image: '/Yoby - Menu - iced drinks 2.png' },
      { id: 403, name: 'Lemon Slushy', price: 4.50, image: '/Yoby - Menu - iced drinks 3.png' },
      { id: 404, name: 'Berry Slushy', price: 4.50, image: '/Yoby - Menu - iced drinks 4.png' },
    ],
    modifiers: [
      { name: 'Medium', price: 0 },
      { name: 'Large', price: 1.00 }
    ],
    image: '/Yoby - Menu - iced drinks ICON.png',
  },
  {
    id: 5,
    name: 'Beverages',
    subMenu: [
      { id: 501, name: 'Water', price: 2.99, image: '/Yoby - Menu - beverages 1.png' },
      { id: 502, name: 'Gatorade', price: 3.99, image: '/Yoby - Menu - beverages 2.png' },
      { id: 503, name: 'Red Bull', price: 4.50, image: '/Yoby - Menu - beverages 3.png' },
      { id: 504, name: 'Monster', price: 4.50, image: '/Yoby - Menu - beverages 1.png' },
    ],
    modifiers: [],
    image: '/Yoby - Menu - beverages ICON.png',
  },
  {
    id: 6,
    name: 'Wraps',
    subMenu: [
      { id: 601, name: 'Garden Chicken', price: 8.00, image: '/Yoby - Menu - wraps 1.png' },
      { id: 602, name: 'Signature Korean', price: 8.00, image: '/Yoby - Menu - wraps 2.png' },
      { id: 603, name: 'Greek', price: 8.00, image: '/Yoby - Menu - wraps 1.png' },
    ],
    modifiers: [
      { name: 'No, thanks', price: 0 },
      { name: 'Extra Cheese', price: 1.00 },
      { name: 'Extra Chicken Breast', price: 2.50 },
    ],
    image: '/Yoby - Menu - wraps ICON.png',
  },
  {
    id: 7,
    name: 'Rolls',
    subMenu: [
      { id: 701, name: 'Tuna Kimbap', price: 9.00, image: '/Yoby - Menu - rolls 1.png' },
      { id: 702, name: 'California Roll', price: 9.00, image: '/Yoby - Menu - rolls 2.png' },
    ],
    modifiers: [],
    image: '/Yoby - Menu - rolls ICON.png',
  },
  {
    id: 8,
    name: 'Delicious Bites',
    subMenu: [
      {
        id: 801,
        name: 'Prosciutto Egg Cheese Croissant',
        price: 8.00,
        image: '/Yoby - Menu - Delicious Snacks 1.png',
        modifiers: [
          { name: 'Prosciutto', price: 0 },
          { name: 'Capicola', price: 1.00 },
          { name: 'Mortadella', price: 1.00 },
        ],
      },
      {
        id: 802,
        name: 'Greek Granola Yogurt Bowl',
        price: 7.00,
        image: '/Yoby - Menu - Delicious Snacks 2.png',
        modifiers: [
          { name: 'Blueberry', price: 0, image: '/YJ - Greek Yogurt Pic - Blueberry.png' },
          { name: 'Strawberry', price: 0, image: '/YJ - Greek Yogurt Pic Strawberry.png' },
        ],
      },
      { id: 803, name: 'Big Salad', price: 9.00, image: '/Yoby - Menu - Delicious Snacks 3.png' },
      { id: 804, name: 'Big Chicken Salad Bowl', price: 9.00, image: '/Yoby - Menu - Delicious Snacks 4.png' },
      { id: 805, name: 'Sausage Scrambled Egg Box', price: 8.00, image: '/Yoby - Menu - Delicious Snacks 5.png' },
    ],
    modifiers: [],
    image: '/Yoby - Menu - Delicious Snacks ICON.png',
  },
];

export default menu;
