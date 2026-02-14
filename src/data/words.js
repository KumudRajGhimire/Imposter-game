export const categories = {
  "Food": [
    "Pizza", "Sushi", "Burger", "Pasta", "Croissant",
    "Pancake", "Ice Cream", "Ramen", "Biriyani",
    "Momos", "Butter Chicken", "Maggi", "Shawarma",
    "Chai", "Pani Puri", "Protein Shake", "Red Velvet Cake"
  ],

  "Animals": [
    "Elephant", "Giraffe", "Penguin", "Octopus",
    "Kangaroo", "Panda", "Sloth", "Hedgehog",
    "Dolphin", "Cheetah", "Raccoon", "Snake",
    "Golden Retriever", "Black Cat"
  ],

  "Places": [
    "Paris", "Tokyo", "London", "New York",
    "Beach", "Mountain", "Space", "Desert",
    "Forest", "Underwater", "Dubai",
    "Maldives", "Goa", "College Hostel",
    "Club", "Gym"
  ],

  "Objects": [
    "Smartphone", "Umbrella", "Backpack", "Telescope",
    "Bicycle", "Clock", "Camera", "Guitar",
    "Flashlight", "Compass", "AirPods",
    "Gaming PC", "iPhone", "MacBook",
    "Ring Light", "Sneakers"
  ],

  "Tech": [
    "Docker", "Flask", "Github", "VS Code",
    "Postman", "React", "Python",
    "ChatGPT", "Blockchain", "AI",
    "Crypto", "Startup", "Hackathon",
    "Metaverse", "Dark Web"
  ],

  "Celeb": [
    "Elon Musk", "Cristiano Ronaldo", "Lionel Messi",
    "MrBeast", "Taylor Swift", "Virat Kohli",
    "Dolly Chaiwala", "Narendra Modi",
    "Kim Kardashian", "Andrew Tate"
  ],

  "Company": [
    "Anthropic", "OpenAI", "Google", "McDonalds",
    "Apple", "Microsoft", "Amazon", "Netflix",
    "Twitter", "Tesla", "Meta",
    "Zomato", "Swiggy", "Byju’s"
  ],

  "Marvel": [
    "Iron Man",
    "Captain America",
    "Thor",
    "Hulk",
    "Black Widow",
    "Hawkeye",
    "Spider-Man",
    "Doctor Strange",
    "Black Panther",
    "Scarlet Witch",
    "Vision",
    "Loki",
    "Thanos",
    "Deadpool",
    "Wolverine",
    "Venom",
    "Ant-Man",
    "Captain Marvel",
    "Nick Fury",
    "Gamora",
    "Star-Lord",
    "Rocket",
    "Groot",
    "Winter Soldier",
    "Shang-Chi",
    "Moon Knight",
    "Daredevil",
    "Green Goblin",
    "Ultron",
    "Infinity Stones",
    "Mjolnir",
    "Vibranium",
    "Avengers",
    "X-Men",
    "Wakanda"
  ]
};

export const getRandomWord = (selectedCategories = []) => {
  const catKeys = selectedCategories.length > 0
    ? selectedCategories
    : Object.keys(categories);

  const randomCat = catKeys[Math.floor(Math.random() * catKeys.length)];
  const words = categories[randomCat];
  return {
    category: randomCat,
    word: words[Math.floor(Math.random() * words.length)]
  };
};
