// Word lists for the describing game. One array per category, any length. Edit freely.
// Picked so a Ghana / West Africa crowd can describe them: people and things most of the room already knows.
// Optional pictures: add a file to assets/articulate/ and map the exact word to it in ART_IMG below.
window.ART_WORDS = {
  Person: [
    // Ghana: music
    "Sarkodie", "Shatta Wale", "Stonebwoy", "Black Sherif", "King Promise", "Gyakie", "Kuami Eugene", "Medikal", "Efya", "Kwesi Arthur", "Samini", "Amaarae", "Fameye", "Kidi", "Camidoh", "Joey B", "Sister Deborah",
    // Ghana: screen, sport, public life
    "Kwame Nkrumah", "Kofi Annan", "John Mahama", "Nana Akufo-Addo", "Jackie Appiah", "Nana Ama McBrown", "John Dumelo", "Lil Win", "Funny Face", "Akrobeto", "Yvonne Nelson", "Van Vicker", "Majid Michel", "Delay", "Nana Aba Anamoah",
    "Asamoah Gyan", "Abedi Pele", "Michael Essien", "Thomas Partey", "Mohammed Kudus", "Azumah Nelson",
    // West Africa
    "Burna Boy", "Wizkid", "Davido", "Tems", "Asake", "Rema", "Ayra Starr", "Fela Kuti", "Tiwa Savage", "Fireboy DML", "Omah Lay", "Funke Akindele", "Genevieve Nnaji", "Mercy Johnson", "Youssou N'Dour", "Didier Drogba", "Samuel Eto'o",
    // global music
    "Beyoncé", "Rihanna", "Drake", "Kendrick Lamar", "Taylor Swift", "Cardi B", "Travis Scott", "Michael Jackson", "Bob Marley", "Chris Brown", "Nicki Minaj", "Bruno Mars", "Ed Sheeran", "Adele", "Rick Ross", "Lil Wayne", "Jay-Z",
    // film and TV
    "Idris Elba", "Lupita Nyong'o", "Chadwick Boseman", "Denzel Washington", "Will Smith", "Zendaya", "Tom Holland", "Timothée Chalamet", "Michael B. Jordan", "Viola Davis", "Angela Bassett", "Kevin Hart", "Tyler Perry", "Steve Harvey", "Oprah Winfrey", "Dwayne Johnson", "Margot Robbie",
    // characters
    "Black Panther", "Shuri", "Spider-Man", "Batman", "The Joker", "Thanos", "Iron Man", "Deadpool", "Simba", "Elsa", "Moana", "Shrek", "Jack Sparrow", "Harry Potter", "Mr Bean", "Anansi the spider", "Okoye",
    // sport
    "Lionel Messi", "Cristiano Ronaldo", "Usain Bolt", "Serena Williams", "LeBron James", "Mike Tyson", "Anthony Joshua",
    // Social Studies and African history
    "Yaa Asantewaa", "Osei Tutu", "Okomfo Anokye", "Mansa Musa", "Sundiata Keita", "Nelson Mandela", "Haile Selassie", "Patrice Lumumba", "Thomas Sankara", "Julius Nyerere", "Jomo Kenyatta", "Marcus Garvey", "W.E.B. Du Bois", "Shaka Zulu", "Queen Nzinga", "Cleopatra", "Samori Touré", "Dr. J.B. Danquah", "Kwegyir Aggrey", "Jerry Rawlings", "Ama Ata Aidoo", "Wole Soyinka", "Chinua Achebe", "Miriam Makeba", "Wangari Maathai", "Desmond Tutu", "Ellen Johnson Sirleaf", "The Queen Mother", "A paramount chief", "An Okyeame (linguist)", "The Big Six"
  ],
  Object: [
    // everyday Ghana
    "Kente cloth", "A trotro", "Pure water sachet", "Charcoal stove", "Mosquito coil", "Chewing stick", "Calabash", "Mortar and pestle", "Talking drum", "The Golden Stool", "Flip flops", "Plastic chair", "Tin of Milo", "Maggi cube", "Shito jar", "Ankara fabric", "Gele headwrap", "Ghana Must Go bag", "Padlock", "Wheelbarrow", "Generator", "Power bank", "Phone charger", "Standing fan", "Ironing board", "Bucket and sponge", "Cooking pot", "Hair braiding comb", "Umbrella", "Bible", "Prayer mat", "Rosary beads",
    // food
    "Jollof rice", "Waakye", "Kenkey", "Fufu", "Banku", "Kelewele", "Red red", "Hausa koko", "Fried yam", "Plantain chips", "Sobolo", "Gari", "Tatale", "Kebab", "Shawarma", "Meat pie", "Bofrot", "Tuo zaafi",
    // pop culture and tech
    "A lightsaber", "The Infinity Gauntlet", "An Oscar statue", "A golden ticket", "Popcorn bucket", "3D glasses", "A TV remote", "A selfie stick", "AirPods", "A ring light", "A PlayStation controller", "A boombox", "A microphone", "A vinyl record", "A cinema ticket", "A DVD", "A gaming headset", "A smart watch",
    // Social Studies and African history
    "A ballot box", "A voter ID card", "A cedi note", "A passport", "A chief's umbrella", "A linguist staff", "A gold nugget", "Gold weights", "Cowrie shells", "A fontomfrom drum", "A ceremonial sword", "A chief's stool", "Adinkra stamp", "The Ghana flag", "A gold coin", "Cocoa beans", "A treaty", "A world map", "A globe", "A census form"
  ],
  Action: [
    "Dancing azonto", "Doing the shaku shaku", "Dancing amapiano", "Hailing a trotro", "Haggling at Makola market", "Shouting \"Chale!\"", "Pounding fufu", "Washing clothes by hand", "Sweeping the compound", "Fanning yourself in the heat", "Starting a generator", "Lighting a candle during dumsor", "Cheering a Black Stars goal", "Praying loudly", "Arguing about jollof", "Winning an argument", "Tying a headwrap", "Braiding hair", "Eating with your hands", "Licking your fingers",
    "Sending a voice note", "Leaving someone on read", "Scrolling TikTok", "Posting a story", "Taking a selfie", "Going live on Instagram", "Binge-watching a series", "Crying at a movie", "Screaming at a horror film", "Slapping in slow motion like in Nollywood", "Fainting dramatically", "Pretending to be asleep", "Karaoke", "Rapping", "Freestyling", "Playing air guitar", "Doing the floss", "Twerking", "Doing the Zanku", "Shaking someone's hand", "Giving a wedding toast", "Cutting a cake", "Blowing out candles", "Popping a bottle", "Skipping rope", "Playing ampe", "Playing football", "Running late", "Getting caught lying", "Parallel parking", "Waiting in a queue", "Swimming", "Yawning", "Sneezing", "Snoring",
    // Social Studies and African history
    "Casting a ballot", "Pouring libation", "Swearing in a president", "Hoisting a flag", "Singing the national anthem", "Marching on Independence Day", "Gold panning", "Harvesting cocoa", "Greeting a chief", "Signing a treaty", "Declaring independence", "Reciting the national pledge", "Counting votes", "Addressing parliament", "Giving a speech to a crowd", "Fishing with a net", "Drumming for the chief", "Paying taxes", "Filling a census form"
  ],
  World: [
    // Ghana
    "Accra", "Kumasi", "Cape Coast Castle", "Elmina", "Labadi Beach", "Makola Market", "Osu", "Kakum canopy walk", "Lake Volta", "Mole National Park", "Wli Waterfalls", "Aburi Botanical Gardens", "Black Star Square", "Kotoka Airport", "Tema", "Takoradi", "Tamale", "Cape Three Points", "Independence Day", "The Black Stars", "The Accra Mall", "Jubilee House",
    // West Africa and Africa
    "Lagos", "Abuja", "Lomé", "Abidjan", "Dakar", "Timbuktu", "The Sahara", "The Nile", "Cairo", "Cape Town", "Nairobi", "Kilimanjaro", "Victoria Falls", "Madagascar", "Wakanda", "Zamunda", "AFCON", "The Pyramids",
    // world and pop culture
    "London", "New York", "Atlanta", "Los Angeles", "Paris", "Dubai", "Hollywood", "Hogwarts", "Gotham City", "Narnia", "The Met Gala", "The Grammys", "The Oscars", "Brazil", "Jamaica", "Mecca", "The Eiffel Tower", "Disneyland", "The White House", "Times Square",
    // Social Studies and African history
    "The Gold Coast", "The Ashanti Kingdom", "The Mali Empire", "The Songhai Empire", "The Ghana Empire", "Great Zimbabwe", "The Kingdom of Kush", "Ancient Egypt", "Benin City", "Axum", "Carthage", "Dahomey", "Robben Island", "Soweto", "Akosombo Dam", "Tema Harbour", "The Parliament House", "Independence Arch", "Kwame Nkrumah Mausoleum", "The Door of No Return", "Assin Manso", "Pikworo Slave Camp", "Larabanga Mosque", "The Sahel", "The Niger River", "Lake Chad", "The Congo River", "Sierra Leone", "Liberia", "Ethiopia", "Zimbabwe", "South Africa"
  ],
  Nature: [
    "Cocoa pod", "A mango tree", "A baobab tree", "Harmattan", "The rainy season", "A palm tree", "A coconut", "A pineapple", "Cassava", "A yam", "A plantain", "Pepper", "Moringa", "Shea butter tree", "Sugarcane", "A kola nut",
    "An elephant", "A lion", "A hippo", "A crocodile", "A leopard", "A giraffe", "A zebra", "A gorilla", "A monkey", "A chameleon", "A parrot", "A vulture", "An owl", "A bat colony", "A snake", "A cobra", "A tortoise", "A sea turtle", "A crab", "A cow", "A goat", "A rooster", "A mosquito", "A butterfly", "A bee", "An ant colony", "A spider", "A frog",
    "Lightning", "Thunder", "A rainbow", "A flood", "A volcano", "An eclipse", "A waterfall", "The savannah", "A lagoon", "A rainforest",
    // Social Studies and African history
    "Gold", "Cocoa", "Crude oil", "Bauxite", "Timber", "Diamonds", "Manganese", "Salt", "A mineral", "A natural resource", "Drought", "Deforestation", "Climate change", "Galamsey (illegal mining)"
  ],
  Random: [
    "Dumsor", "Jollof wars", "Ghana Must Go", "Group chat", "Voice note", "Plot twist", "Spoiler alert", "Season finale", "Cliffhanger", "Red carpet", "Netflix and chill", "Binge-watching", "Mobile money", "Free SHS", "Trotro mate", "ECG bill", "Borla", "Small chops", "Chop bar", "Sunday service", "Church choir", "Wedding", "Funeral", "Outdooring", "Birthday party", "Surprise party", "Sleepover",
    "Afrobeats", "Highlife", "Hiplife", "Amapiano", "Gospel", "Drill", "Nollywood", "Kumawood", "Ghollywood", "Open mic", "Karaoke night", "Dance floor", "Battle rap", "Music video", "Album release", "Sold-out concert", "Viral video", "A meme", "Fake news", "TikTok trend", "Hot take", "Cancel culture", "Clout", "Influencer", "Going viral", "Plan B", "Bad Wi-Fi", "Low battery", "Network problem", "Surprise ending", "Sequel", "Post-credit scene", "Behind the scenes", "Blooper reel", "Standing ovation", "Encore",
    // Social Studies and African history
    "Colonialism", "Independence", "The slave trade", "Apartheid", "Pan-Africanism", "The Scramble for Africa", "The Berlin Conference", "The Constitution", "Democracy", "Parliament", "General elections", "The Electoral Commission", "Voting", "Citizenship", "Human rights", "Chieftaincy", "Traditional council", "The census", "Taxes", "Republic Day", "ECOWAS", "The African Union", "The Cedi", "The national anthem", "The national pledge", "The Coat of Arms", "Adinkra symbols", "Gye Nyame", "Sankofa", "Ubuntu", "The Black Star", "One party state", "A coup", "Pan-African Congress", "Cocoa farming", "Population growth", "Rural-urban migration", "Unemployment", "Child labour", "Gender equality", "The Commonwealth", "The United Nations", "Trade union", "The 1957 Independence Declaration", "Barter trade", "Cowrie shells as money"
  ]
};
// A small picture shown with a word on the card (the describer sees it; it helps when the name alone is hard).
window.ART_EMOJI = {
  "An elephant": "🐘", "A lion": "🦁", "A hippo": "🦛", "A crocodile": "🐊", "A leopard": "🐆", "A giraffe": "🦒", "A zebra": "🦓", "A gorilla": "🦍", "A monkey": "🐒", "A chameleon": "🦎", "A parrot": "🦜", "A vulture": "🦅", "An owl": "🦉", "A bat colony": "🦇", "A snake": "🐍", "A cobra": "🐍", "A tortoise": "🐢", "A sea turtle": "🐢", "A crab": "🦀", "A cow": "🐄", "A goat": "🐐", "A rooster": "🐓", "A mosquito": "🦟", "A butterfly": "🦋", "A bee": "🐝", "An ant colony": "🐜", "A spider": "🕷️", "A frog": "🐸",
  "A mango tree": "🥭", "A palm tree": "🌴", "A coconut": "🥥", "A pineapple": "🍍", "A plantain": "🍌", "A rainbow": "🌈", "Lightning": "⚡", "A volcano": "🌋", "An eclipse": "🌑", "Popcorn bucket": "🍿", "An Oscar statue": "🏆", "A microphone": "🎤", "A vinyl record": "💿", "Umbrella": "☂️", "Padlock": "🔒", "A TV remote": "📺", "A boombox": "📻", "A smart watch": "⌚", "Meat pie": "🥧", "Kebab": "🍢", "Shawarma": "🌯", "Prayer mat": "🙏", "Bible": "📖", "A selfie stick": "🤳", "A cinema ticket": "🎫", "A DVD": "💿", "A PlayStation controller": "🎮", "Wedding": "💍", "Birthday party": "🎂", "Funeral": "🕯️", "Music video": "🎬", "Standing ovation": "👏", "Red carpet": "🎬"
};
// Photos: put a file in assets/articulate/ and map the word to it, for example:
//   "Burna Boy": "assets/articulate/burna-boy.jpg"
// Only use photos you have the right to use. They show above the word on the card.
window.ART_IMG = {};
