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
    "Yaa Asantewaa", "Osei Tutu", "Okomfo Anokye", "Mansa Musa", "Sundiata Keita", "Nelson Mandela", "Haile Selassie", "Patrice Lumumba", "Thomas Sankara", "Julius Nyerere", "Jomo Kenyatta", "Marcus Garvey", "W.E.B. Du Bois", "Shaka Zulu", "Queen Nzinga", "Cleopatra", "Samori Touré", "Dr. J.B. Danquah", "Kwegyir Aggrey", "Jerry Rawlings", "Ama Ata Aidoo", "Wole Soyinka", "Chinua Achebe", "Miriam Makeba", "Wangari Maathai", "Desmond Tutu", "Ellen Johnson Sirleaf", "The Queen Mother", "A paramount chief", "An Okyeame (linguist)", "The Big Six",
    // the world: general knowledge, history and recent times
    "Barack Obama", "Michelle Obama", "Joe Biden", "Donald Trump", "Kamala Harris", "Queen Elizabeth II", "King Charles III", "Princess Diana", "Prince Harry", "Meghan Markle", "Vladimir Putin", "Angela Merkel", "Emmanuel Macron", "Martin Luther King Jr.", "Rosa Parks", "Abraham Lincoln", "Mahatma Gandhi", "Napoleon", "Albert Einstein", "Isaac Newton", "Leonardo da Vinci", "William Shakespeare", "Steve Jobs", "Bill Gates", "Elon Musk", "Jeff Bezos", "Mark Zuckerberg", "Pope Francis", "Mother Teresa", "Muhammad Ali", "Pelé", "Maradona", "Neil Armstrong", "Christopher Columbus", "Santa Claus", "The Tooth Fairy", "A doctor", "A nurse", "A pilot", "A police officer", "A DJ", "A pastor", "A taxi driver", "A news anchor", "A comedian",
    // general trivia
    "An astronaut", "A detective", "A firefighter", "A chef", "A magician", "A superhero", "A pirate", "A ninja", "A clown", "A referee", "A boxer", "A bride", "A groom", "A grandmother", "A barber", "A mechanic", "A lawyer", "A judge", "A soldier", "A spy", "A zookeeper", "A fisherman", "A farmer", "A teacher", "A tour guide", "A bodyguard", "A photographer", "A fashion model", "A president", "A king", "A queen", "A cowboy", "A vampire", "A ghost", "A robot", "A mermaid", "A genie", "A giant", "A baby", "A toddler",
    // general knowledge trivia
    "Zeus", "Medusa", "Hercules", "Romeo and Juliet", "Robin Hood", "Dracula", "Frankenstein", "Alice in Wonderland", "Pinocchio", "Peter Pan", "Superman", "Wonder Woman", "Thomas Edison", "Alexander Graham Bell", "Marie Curie", "Galileo", "Charles Darwin", "Stephen Hawking", "Nikola Tesla", "Pablo Picasso", "Mozart", "Beethoven", "Vincent van Gogh", "Michelangelo", "Charles Dickens", "Maya Angelou", "Dr. Seuss", "The Pied Piper", "Santa's elves", "Father Time", "Sherlock's Dr. Watson", "Count Dracula",
    // harder words: each has a short clue on the card (see ART_HINT)
    "Sommelier", "Cartographer", "Archaeologist", "Meteorologist", "Auctioneer", "Ventriloquist", "Cobbler", "Blacksmith", "Midwife", "Taxidermist", "Locksmith", "Chauffeur", "Paparazzi", "Ibn Battuta", "Hannibal", "Genghis Khan", "Julius Caesar", "Joan of Arc", "Florence Nightingale", "Alexander the Great", "Tutankhamun", "Amelia Earhart"
  ],
  Object: [
    // everyday Ghana
    "Kente cloth", "A trotro", "Pure water sachet", "Charcoal stove", "Mosquito coil", "Chewing stick", "Calabash", "Mortar and pestle", "Talking drum", "The Golden Stool", "Flip flops", "Plastic chair", "Tin of Milo", "Maggi cube", "Shito jar", "Ankara fabric", "Gele headwrap", "Ghana Must Go bag", "Padlock", "Wheelbarrow", "Generator", "Power bank", "Phone charger", "Standing fan", "Ironing board", "Bucket and sponge", "Cooking pot", "Hair braiding comb", "Umbrella", "Bible", "Prayer mat", "Rosary beads",
    // food
    "Jollof rice", "Waakye", "Kenkey", "Fufu", "Banku", "Kelewele", "Red red", "Hausa koko", "Fried yam", "Plantain chips", "Sobolo", "Gari", "Tatale", "Kebab", "Shawarma", "Meat pie", "Bofrot", "Tuo zaafi",
    // pop culture and tech
    "A lightsaber", "The Infinity Gauntlet", "An Oscar statue", "A golden ticket", "Popcorn bucket", "3D glasses", "A TV remote", "A selfie stick", "AirPods", "A ring light", "A PlayStation controller", "A boombox", "A microphone", "A vinyl record", "A cinema ticket", "A DVD", "A gaming headset", "A smart watch",
    // Social Studies and African history
    "A ballot box", "A voter ID card", "A cedi note", "A passport", "A chief's umbrella", "A linguist staff", "A gold nugget", "Gold weights", "Cowrie shells", "A fontomfrom drum", "A ceremonial sword", "A chief's stool", "Adinkra stamp", "The Ghana flag", "A gold coin", "Cocoa beans", "A treaty", "A world map", "A globe", "A census form",
    // the world: general knowledge, history and recent times
    "A thermometer", "A stethoscope", "A vaccine needle", "A face mask", "A Nobel Prize", "A passport stamp", "A crown", "A throne", "A time capsule", "A telescope", "A rocket", "A satellite", "A compass", "A trophy", "A medal", "A gold medal", "A flag", "A map", "A suitcase", "A boarding pass",
    // general trivia
    "A mirror", "A candle", "A ladder", "A pair of scissors", "A bicycle", "A helicopter", "A skateboard", "A hammer", "A camera", "A calculator", "A microscope", "A backpack", "A wristwatch", "Sunglasses", "A toaster", "A refrigerator", "A blender", "A vacuum cleaner", "A washing machine", "A pillow", "A needle and thread", "A lighter", "A matchbox", "A Coca-Cola bottle", "A KFC bucket", "Nike sneakers", "An iPhone", "A Barbie doll", "A LEGO brick", "A Rubik's cube", "A Monopoly board", "A football", "Boxing gloves", "A basketball hoop", "A tennis racket", "A chessboard", "A deck of cards", "A pair of dice", "A guitar", "A piano", "A violin", "A saxophone", "A trumpet", "A drum kit", "A flute", "A kettle", "A mop", "A broom", "A bunch of keys", "An alarm clock", "A traffic light", "A parachute", "A hot air balloon", "A submarine", "An aeroplane", "A bulldozer", "A fire engine", "An ambulance",
    // general knowledge trivia
    "The Mona Lisa", "The telephone", "The light bulb", "The printing press", "The wheel", "A periscope", "The periodic table", "The Rosetta Stone", "The Olympic torch", "Excalibur", "Pandora's box", "The Trojan horse", "Aladdin's lamp", "A magic carpet", "A crystal ball", "A treasure map", "A message in a bottle", "A pocket watch", "A typewriter", "A film reel", "A hourglass", "A sundial", "An abacus", "A quill pen",
    // harder words: each has a short clue on the card (see ART_HINT)
    "A sextant", "A metronome", "A kaleidoscope", "A thimble", "A colander", "A whisk", "An anvil", "A tripod", "An easel", "A boomerang", "A didgeridoo", "An accordion", "A harp", "Bagpipes", "A kora", "A djembe", "A balafon", "A shekere", "A gong", "A lantern"
  ],
  Action: [
    "Dancing azonto", "Doing the shaku shaku", "Dancing amapiano", "Hailing a trotro", "Haggling at Makola market", "Shouting \"Chale!\"", "Pounding fufu", "Washing clothes by hand", "Sweeping the compound", "Fanning yourself in the heat", "Starting a generator", "Lighting a candle during dumsor", "Cheering a Black Stars goal", "Praying loudly", "Arguing about jollof", "Winning an argument", "Tying a headwrap", "Braiding hair", "Eating with your hands", "Licking your fingers",
    "Sending a voice note", "Leaving someone on read", "Scrolling TikTok", "Posting a story", "Taking a selfie", "Going live on Instagram", "Binge-watching a series", "Crying at a movie", "Screaming at a horror film", "Slapping in slow motion like in Nollywood", "Fainting dramatically", "Pretending to be asleep", "Karaoke", "Rapping", "Freestyling", "Playing air guitar", "Doing the floss", "Twerking", "Doing the Zanku", "Shaking someone's hand", "Giving a wedding toast", "Cutting a cake", "Blowing out candles", "Popping a bottle", "Skipping rope", "Playing ampe", "Playing football", "Running late", "Getting caught lying", "Parallel parking", "Waiting in a queue", "Swimming", "Yawning", "Sneezing", "Snoring",
    // Social Studies and African history
    "Casting a ballot", "Pouring libation", "Swearing in a president", "Hoisting a flag", "Singing the national anthem", "Marching on Independence Day", "Gold panning", "Harvesting cocoa", "Greeting a chief", "Signing a treaty", "Declaring independence", "Reciting the national pledge", "Counting votes", "Addressing parliament", "Giving a speech to a crowd", "Fishing with a net", "Drumming for the chief", "Paying taxes", "Filling a census form",
    // the world: general knowledge, history and recent times
    "Washing your hands for 20 seconds", "Wearing a face mask", "Joining a Zoom call", "Muting yourself on a call", "Clapping for health workers", "Queueing for a vaccine", "Delivering a speech", "Cutting a ribbon", "Shaking hands with a president", "Waving from a balcony", "Landing on the moon", "Climbing Mount Everest", "Crossing the finish line", "Winning a gold medal", "Lifting a trophy", "Boarding a plane", "Going through airport security", "Taking a flight", "Exploring a new city", "Taking a group photo",
    // general trivia
    "Juggling", "Skateboarding", "Surfing", "Rock climbing", "Playing chess", "Playing the guitar", "Playing the drums", "Riding a bike", "Painting a wall", "Planting a tree", "Catching a ball", "Throwing a javelin", "Doing push-ups", "Doing yoga", "Meditating", "Brushing your hair", "Scoring a goal", "Taking a penalty", "A slam dunk", "Boxing", "A karate chop", "Dancing ballet", "Dancing salsa", "Walking a dog", "Feeding a baby", "Changing a tyre", "Jumping in a puddle", "Building a snowman", "Flying a kite", "Making a sandwich", "Frying an egg", "Opening a bottle", "Tying shoelaces", "Writing a letter", "Reading a book", "Whistling", "Laughing out loud", "Giggling", "Winking", "Hiccuping",
    // general knowledge trivia
    "Flipping a coin", "Solving a puzzle", "Answering a quiz question", "Buzzing in first", "Phoning a friend", "Launching a rocket", "Crossing the equator", "Discovering fire", "Winning a quiz", "Looking through a telescope", "Doing an experiment", "Mixing chemicals", "Conducting an orchestra", "Painting a masterpiece", "Sculpting a statue", "Writing a novel", "Giving a TED talk", "Solving a Rubik's cube", "Reading a map", "Finding treasure"
  ],
  World: [
    // Ghana
    "Accra", "Kumasi", "Cape Coast Castle", "Elmina", "Labadi Beach", "Makola Market", "Osu", "Kakum canopy walk", "Lake Volta", "Mole National Park", "Wli Waterfalls", "Aburi Botanical Gardens", "Black Star Square", "Kotoka Airport", "Tema", "Takoradi", "Tamale", "Cape Three Points", "Independence Day", "The Black Stars", "The Accra Mall", "Jubilee House",
    // West Africa and Africa
    "Lagos", "Abuja", "Lomé", "Abidjan", "Dakar", "Timbuktu", "The Sahara", "The Nile", "Cairo", "Cape Town", "Nairobi", "Kilimanjaro", "Victoria Falls", "Madagascar", "Wakanda", "Zamunda", "AFCON", "The Pyramids",
    // world and pop culture
    "London", "New York", "Atlanta", "Los Angeles", "Paris", "Dubai", "Hollywood", "Hogwarts", "Gotham City", "Narnia", "The Met Gala", "The Grammys", "The Oscars", "Brazil", "Jamaica", "Mecca", "The Eiffel Tower", "Disneyland", "The White House", "Times Square",
    // Social Studies and African history
    "The Gold Coast", "The Ashanti Kingdom", "The Mali Empire", "The Songhai Empire", "The Ghana Empire", "Great Zimbabwe", "The Kingdom of Kush", "Ancient Egypt", "Benin City", "Axum", "Carthage", "Dahomey", "Robben Island", "Soweto", "Akosombo Dam", "Tema Harbour", "The Parliament House", "Independence Arch", "Kwame Nkrumah Mausoleum", "The Door of No Return", "Assin Manso", "Pikworo Slave Camp", "Larabanga Mosque", "The Sahel", "The Niger River", "Lake Chad", "The Congo River", "Sierra Leone", "Liberia", "Ethiopia", "Zimbabwe", "South Africa",
    // the world: general knowledge, history and recent times
    "The Statue of Liberty", "Big Ben", "The Taj Mahal", "The Colosseum", "The Great Wall of China", "The Burj Khalifa", "The Sydney Opera House", "Mount Rushmore", "Machu Picchu", "Christ the Redeemer", "The Leaning Tower of Pisa", "Buckingham Palace", "Tower Bridge", "The Golden Gate Bridge", "The Empire State Building", "Stonehenge", "Petra", "Angkor Wat", "Mount Fuji", "The Grand Canyon", "The Louvre", "The Vatican", "Red Square", "The Hollywood sign", "Las Vegas", "Rome", "Madrid", "Amsterdam", "Berlin", "Istanbul", "Beijing", "Shanghai", "Mumbai", "Rio de Janeiro", "Sydney", "Toronto", "Johannesburg", "Marrakech", "Zanzibar", "Kigali", "Addis Ababa", "Mombasa", "Moscow", "Washington D.C.", "Texas", "Antarctica", "The North Pole", "The Amazon rainforest", "The Great Barrier Reef", "Mount Everest", "The Atlantic Ocean", "The Pacific Ocean", "The Alps", "The Arctic", "Wall Street", "Silicon Valley", "The United Nations building", "Heathrow Airport",
    // general trivia
    "Japan", "India", "Egypt", "Italy", "Mexico", "Canada", "Australia", "China", "Russia", "Spain", "Germany", "France", "Argentina", "Kenya", "Morocco", "South Korea", "Turkey", "Saudi Arabia", "The Netherlands", "Ireland", "Scotland", "Switzerland", "Cuba", "Haiti", "Trinidad and Tobago", "A hospital", "A library", "A stadium", "A museum", "A zoo", "A cinema", "A supermarket", "A police station", "A church", "A mosque", "A petrol station", "A bus station", "A barber shop", "A hair salon", "A bakery",
    // general knowledge trivia
    "The equator", "The Prime Meridian", "The Bermuda Triangle", "Atlantis", "Mount Olympus", "The Silk Road", "Pompeii", "The Panama Canal", "The Suez Canal", "The Great Rift Valley", "The Mediterranean Sea", "The Caribbean", "The Himalayas", "The Andes", "Tokyo", "Canberra", "Ottawa", "The seven continents", "The seven wonders of the world", "The International Space Station", "NASA", "The Roman Empire", "The Ottoman Empire", "The Vikings", "The Wild West", "Ancient Greece", "Ancient Rome", "The Aztecs", "The Maya",
    // harder words: each has a short clue on the card (see ART_HINT)
    "The Atlas Mountains", "The Serengeti", "The Kalahari", "The Namib Desert", "The Okavango Delta", "Lalibela", "Gorée Island", "Mount Kenya"
  ],
  Nature: [
    "Cocoa pod", "A mango tree", "A baobab tree", "Harmattan", "The rainy season", "A palm tree", "A coconut", "A pineapple", "Cassava", "A yam", "A plantain", "Pepper", "Moringa", "Shea butter tree", "Sugarcane", "A kola nut",
    "An elephant", "A lion", "A hippo", "A crocodile", "A leopard", "A giraffe", "A zebra", "A gorilla", "A monkey", "A chameleon", "A parrot", "A vulture", "An owl", "A bat colony", "A snake", "A cobra", "A tortoise", "A sea turtle", "A crab", "A cow", "A goat", "A rooster", "A mosquito", "A butterfly", "A bee", "An ant colony", "A spider", "A frog",
    "Lightning", "Thunder", "A rainbow", "A flood", "A volcano", "An eclipse", "A waterfall", "The savannah", "A lagoon", "A rainforest",
    // Social Studies and African history
    "Gold", "Cocoa", "Crude oil", "Bauxite", "Timber", "Diamonds", "Manganese", "Salt", "A mineral", "A natural resource", "Drought", "Deforestation", "Climate change", "Galamsey (illegal mining)",
    // the world: general knowledge, history and recent times
    "Niagara Falls", "A hurricane", "A tornado", "Melting ice caps", "A desert", "An iceberg", "The Dead Sea", "The Milky Way", "A solar eclipse", "The northern lights", "A glacier", "A coral reef",
    // general trivia
    "A penguin", "A dolphin", "A whale", "A shark", "An octopus", "A kangaroo", "A panda", "A polar bear", "A koala", "A camel", "An eagle", "A flamingo", "A peacock", "A squirrel", "A wolf", "A fox", "A rhino", "A cheetah", "A jellyfish", "A seahorse", "A dinosaur", "A T-Rex", "A rose", "A sunflower", "A cactus", "Bamboo", "A mushroom", "A rice field", "A beehive", "A spider web", "A bird's nest", "A cave", "A river", "A mountain", "An island", "A beach", "A forest", "A volcano eruption",
    // general knowledge trivia
    "The solar system", "Mars", "Jupiter", "Saturn", "The Moon", "The Sun", "A comet", "A meteor shower", "The Big Dipper", "The tides", "Metamorphosis", "Hibernation", "Migration", "Camouflage", "The dodo", "A woolly mammoth", "A food chain", "An ecosystem", "Photosynthesis in a leaf", "A magnet", "An earthquake", "Erosion",
    // harder words: each has a short clue on the card (see ART_HINT)
    "An aardvark", "A pangolin", "An okapi", "A manatee", "A narwhal", "A platypus", "A mandrill", "A meerkat", "A wildebeest", "A warthog", "A hyena"
  ],
  Random: [
    "Dumsor", "Jollof wars", "Ghana Must Go", "Group chat", "Voice note", "Plot twist", "Spoiler alert", "Season finale", "Cliffhanger", "Red carpet", "Netflix and chill", "Binge-watching", "Mobile money", "Free SHS", "Trotro mate", "ECG bill", "Borla", "Small chops", "Chop bar", "Sunday service", "Church choir", "Wedding", "Funeral", "Outdooring", "Birthday party", "Surprise party", "Sleepover",
    "Afrobeats", "Highlife", "Hiplife", "Amapiano", "Gospel", "Drill", "Nollywood", "Kumawood", "Ghollywood", "Open mic", "Karaoke night", "Dance floor", "Battle rap", "Music video", "Album release", "Sold-out concert", "Viral video", "A meme", "Fake news", "TikTok trend", "Hot take", "Cancel culture", "Clout", "Influencer", "Going viral", "Plan B", "Bad Wi-Fi", "Low battery", "Network problem", "Surprise ending", "Sequel", "Post-credit scene", "Behind the scenes", "Blooper reel", "Standing ovation", "Encore",
    // Social Studies and African history
    "Colonialism", "Independence", "The slave trade", "Apartheid", "Pan-Africanism", "The Scramble for Africa", "The Berlin Conference", "The Constitution", "Democracy", "Parliament", "General elections", "The Electoral Commission", "Voting", "Citizenship", "Human rights", "Chieftaincy", "Traditional council", "The census", "Taxes", "Republic Day", "ECOWAS", "The African Union", "The Cedi", "The national anthem", "The national pledge", "The Coat of Arms", "Adinkra symbols", "Gye Nyame", "Sankofa", "Ubuntu", "The Black Star", "One party state", "A coup", "Pan-African Congress", "Cocoa farming", "Population growth", "Rural-urban migration", "Unemployment", "Child labour", "Gender equality", "The Commonwealth", "The United Nations", "Trade union", "The 1957 Independence Declaration", "Barter trade", "Cowrie shells as money",
    // the world: general knowledge, history and recent times
    "COVID-19", "Lockdown", "Quarantine", "A curfew", "Social distancing", "A pandemic", "The Ebola outbreak", "Face masks", "Hand sanitiser", "A vaccine", "Working from home", "A Zoom call", "Panic buying", "Toilet paper shortage", "The moon landing", "The Titanic", "Y2K", "Brexit", "Obama's inauguration", "The fall of the Berlin Wall", "Mandela walking free", "The 2008 financial crisis", "The Cold War", "World War II", "The Renaissance", "The Industrial Revolution", "The Civil Rights Movement", "\"I have a dream\"", "\"Yes we can\"", "Global warming", "The invention of the internet", "Artificial intelligence", "ChatGPT", "Bitcoin", "Black Friday", "Valentine's Day", "New Year's Eve", "The Olympic Games", "The World Cup final", "The Super Bowl", "Wimbledon", "Live Aid", "A royal wedding", "The Queen's funeral", "The Nobel Prize", "Google", "WhatsApp", "Instagram", "YouTube", "Spotify", "Uber", "Emoji", "Wi-Fi", "Selfie culture", "The first iPhone", "Social media", "Cryptocurrency", "Electric cars", "Space travel",
    // general trivia
    "Gravity", "A black hole", "DNA", "An atom", "Electricity", "Pizza", "A burger", "Ice cream", "Chocolate", "Coffee", "Tea", "Spaghetti", "Sushi", "Fried chicken", "A hot dog", "Coca-Cola", "Nike", "Adidas", "Apple", "Samsung", "Amazon", "McDonald's", "KFC", "Pepsi", "Toyota", "Mercedes-Benz", "Ferrari", "Lamborghini", "Netflix", "Disney", "Gucci", "Louis Vuitton", "Rolex", "Monopoly", "Chess", "Ludo", "Oware", "Sudoku", "Jenga", "Hide and seek", "Musical chairs", "Truth or dare", "Football", "Basketball", "The marathon", "Formula 1", "Tennis", "Rugby", "April Fools' Day", "Friday the 13th", "A leap year", "A time zone", "Rush hour", "Jet lag", "Déjà vu", "An optical illusion", "A photobomb", "Autocorrect", "A typo", "A traffic jam", "A power cut", "A flat tyre", "A bad haircut", "A first date", "A job interview", "A blind date", "A reunion", "A group photo", "A surprise gift",
    // general knowledge trivia
    "The Big Bang", "The theory of evolution", "Newton's apple", "Pi", "The speed of light", "Photosynthesis", "The water cycle", "The Wright brothers' first flight", "The discovery of penicillin", "The first computer", "The Great Fire of London", "The Black Death", "The French Revolution", "The American Revolution", "The Magna Carta", "A Shakespeare play", "A fairy tale", "A nursery rhyme", "A bedtime story", "A riddle", "A quiz show", "Who Wants to Be a Millionaire", "A pub quiz", "A crossword puzzle", "A tongue twister", "A proverb", "A fun fact", "A world record", "Guinness World Records", "The four seasons", "The twelve months", "The zodiac", "A horoscope", "Time travel", "The Loch Ness Monster", "Bigfoot", "The Bermuda Triangle mystery", "A UFO", "An alien", "A conspiracy theory", "Murphy's Law", "A paradox", "Nobel Prize winner",
    // harder words: each has a short clue on the card (see ART_HINT)
    "An algorithm", "A podcast", "Procrastination", "Nostalgia", "Irony", "Sarcasm", "Karma", "Gossip", "Small talk", "A rumour", "Nepotism", "Bribery", "Inflation", "A recession", "A budget", "The stock market", "A mortgage", "A hashtag"
  ]
};
// A small picture shown with a word on the card (the describer sees it; it helps when the name alone is hard).
window.ART_EMOJI = {
  "A face mask": "😷", "A thermometer": "🌡️", "A vaccine needle": "💉", "A telescope": "🔭", "A rocket": "🚀", "A crown": "👑", "A trophy": "🏆", "A gold medal": "🥇", "A compass": "🧭", "A suitcase": "🧳", "The Statue of Liberty": "🗽", "The Taj Mahal": "🕌", "Mount Fuji": "🗻", "Mount Everest": "🏔️", "A hurricane": "🌀", "A tornado": "🌪️", "A desert": "🏜️", "An iceberg": "🧊", "The Milky Way": "🌌", "The northern lights": "🌌", "A pandemic": "🦠", "COVID-19": "🦠", "A vaccine": "💉", "A ballot box": "🗳️", "A passport": "🛂", "A cedi note": "💵", "A world map": "🗺️", "A globe": "🌍", "Gold": "🥇", "Casting a ballot": "🗳️", "Hoisting a flag": "🚩", "A mirror": "🪞", "A candle": "🕯️", "A ladder": "🪜", "A pair of scissors": "✂️", "A bicycle": "🚲", "A helicopter": "🚁", "A hammer": "🔨", "A camera": "📷", "A microscope": "🔬", "A backpack": "🎒", "Sunglasses": "🕶️", "A guitar": "🎸", "A piano": "🎹", "A violin": "🎻", "A saxophone": "🎷", "A trumpet": "🎺", "A drum kit": "🥁", "A football": "⚽", "Boxing gloves": "🥊", "A basketball hoop": "🏀", "A chessboard": "♟️", "A deck of cards": "🃏", "A pair of dice": "🎲", "An aeroplane": "✈️", "A fire engine": "🚒", "An ambulance": "🚑", "A hot air balloon": "🎈", "A parachute": "🪂", "A traffic light": "🚦", "A penguin": "🐧", "A dolphin": "🐬", "A whale": "🐳", "A shark": "🦈", "An octopus": "🐙", "A kangaroo": "🦘", "A panda": "🐼", "A koala": "🐨", "A camel": "🐪", "An eagle": "🦅", "A flamingo": "🦩", "A peacock": "🦚", "A squirrel": "🐿️", "A wolf": "🐺", "A fox": "🦊", "A rhino": "🦏", "A cheetah": "🐆", "A dinosaur": "🦕", "A T-Rex": "🦖", "A rose": "🌹", "A sunflower": "🌻", "A cactus": "🌵", "A mushroom": "🍄", "A volcano eruption": "🌋", "Pizza": "🍕", "A burger": "🍔", "Ice cream": "🍦", "Chocolate": "🍫", "Coffee": "☕", "Tea": "🍵", "Spaghetti": "🍝", "Sushi": "🍣", "Fried chicken": "🍗", "A hot dog": "🌭", "Swimming": "🏊", "Football": "⚽", "Basketball": "🏀", "Tennis": "🎾", "Rugby": "🏉", "Boxing": "🥊", "Gravity": "🍎", "DNA": "🧬", "An atom": "⚛️", "Electricity": "⚡", "Doing yoga": "🧘", "Surfing": "🏄", "Juggling": "🤹", "Rock climbing": "🧗", "Flying a kite": "🪁", "An astronaut": "🧑‍🚀", "A firefighter": "🧑‍🚒", "A chef": "👨‍🍳", "A magician": "🧙", "A pirate": "🏴‍☠️", "A ninja": "🥷", "A clown": "🤡", "A vampire": "🧛", "A ghost": "👻", "A robot": "🤖", "A mermaid": "🧜", "A genie": "🧞", "A baby": "👶", "A bride": "👰", "A king": "🤴", "A queen": "👸", "A cowboy": "🤠", "The Mona Lisa": "🖼️", "The telephone": "☎️", "The light bulb": "💡", "The printing press": "🖨️", "A crystal ball": "🔮", "A treasure map": "🗺️", "A hourglass": "⌛", "Mars": "🪐", "Jupiter": "🪐", "Saturn": "🪐", "The Moon": "🌙", "The Sun": "☀️", "A comet": "☄️", "The solar system": "🪐", "A UFO": "🛸", "An alien": "👽", "Zeus": "⚡", "Dracula": "🧛", "Count Dracula": "🧛", "Superman": "🦸", "Wonder Woman": "🦸‍♀️", "Photosynthesis": "🌿", "A magnet": "🧲", "An earthquake": "🌍", "Pi": "🥧", "A quiz show": "❓", "A riddle": "❓", "Flipping a coin": "🪙", "Launching a rocket": "🚀", "Solving a puzzle": "🧩", "Time travel": "⏳",
  "An elephant": "🐘", "A lion": "🦁", "A hippo": "🦛", "A crocodile": "🐊", "A leopard": "🐆", "A giraffe": "🦒", "A zebra": "🦓", "A gorilla": "🦍", "A monkey": "🐒", "A chameleon": "🦎", "A parrot": "🦜", "A vulture": "🦅", "An owl": "🦉", "A bat colony": "🦇", "A snake": "🐍", "A cobra": "🐍", "A tortoise": "🐢", "A sea turtle": "🐢", "A crab": "🦀", "A cow": "🐄", "A goat": "🐐", "A rooster": "🐓", "A mosquito": "🦟", "A butterfly": "🦋", "A bee": "🐝", "An ant colony": "🐜", "A spider": "🕷️", "A frog": "🐸",
  "A mango tree": "🥭", "A palm tree": "🌴", "A coconut": "🥥", "A pineapple": "🍍", "A plantain": "🍌", "A rainbow": "🌈", "Lightning": "⚡", "A volcano": "🌋", "An eclipse": "🌑", "Popcorn bucket": "🍿", "An Oscar statue": "🏆", "A microphone": "🎤", "A vinyl record": "💿", "Umbrella": "☂️", "Padlock": "🔒", "A TV remote": "📺", "A boombox": "📻", "A smart watch": "⌚", "Meat pie": "🥧", "Kebab": "🍢", "Shawarma": "🌯", "Prayer mat": "🙏", "Bible": "📖", "A selfie stick": "🤳", "A cinema ticket": "🎫", "A DVD": "💿", "A PlayStation controller": "🎮", "Wedding": "💍", "Birthday party": "🎂", "Funeral": "🕯️", "Music video": "🎬", "Standing ovation": "👏", "Red carpet": "🎬"
};
// Photos: put a file in assets/articulate/ and map the word to it, for example:
//   "Burna Boy": "assets/articulate/burna-boy.jpg"
// Only use photos you have the right to use. They show above the word on the card.
window.ART_IMG = {};
// A short clue shown under the word on the card, so the describer can explain things they do not know well.
window.ART_HINT = {
  "Mansa Musa": "Very rich king of Mali who travelled to Mecca carrying huge amounts of gold",
  "Yaa Asantewaa": "Asante queen mother who led a war against the British in 1900",
  "Sundiata Keita": "Founder of the Mali Empire",
  "Thomas Sankara": "Burkina Faso's young revolutionary president, called Africa's Che Guevara",
  "Patrice Lumumba": "First prime minister of the independent Congo",
  "Haile Selassie": "The last emperor of Ethiopia",
  "Julius Nyerere": "First president of Tanzania",
  "Jomo Kenyatta": "First president of Kenya",
  "Marcus Garvey": "Jamaican leader who started a Back to Africa movement",
  "W.E.B. Du Bois": "American scholar and civil rights leader who spent his last years in Ghana",
  "Shaka Zulu": "Warrior king who built the Zulu kingdom",
  "Queen Nzinga": "Angolan ruler who fought the Portuguese",
  "Samori Touré": "West African leader who resisted French rule",
  "Osei Tutu": "Founder of the Asante kingdom",
  "Okomfo Anokye": "Priest said to have called a sacred seat down from the sky for the Asante",
  "Dr. J.B. Danquah": "Gold Coast politician and scholar, one of the Big Six",
  "The Big Six": "The six leaders arrested after the 1948 riots in the Gold Coast",
  "Wangari Maathai": "Kenyan Nobel winner who got millions of trees planted",
  "Miriam Makeba": "South African singer nicknamed Mama Africa",
  "Ama Ata Aidoo": "Ghanaian writer who wrote Anowa",
  "Wole Soyinka": "Nigerian writer, first African to win the Nobel Prize in Literature",
  "Chinua Achebe": "Nigerian author of Things Fall Apart",
  "Kwegyir Aggrey": "Educator at Achimota who said to teach a woman is to teach a whole nation",
  "Cleopatra": "Last queen of ancient Egypt",
  "Napoleon": "Short French emperor who lost at Waterloo",
  "Mother Teresa": "Nun who cared for the poor in Kolkata",
  "Neil Armstrong": "First person to walk on the moon",
  "Christopher Columbus": "Italian sailor who crossed the Atlantic in 1492",
  "Nikola Tesla": "Inventor whose name is on a famous electric car company",
  "Marie Curie": "Scientist who discovered radioactive elements and won two Nobel Prizes",
  "Galileo": "Italian scientist who looked at the planets through a telescope",
  "Charles Darwin": "Scientist who wrote about evolution and natural selection",
  "Stephen Hawking": "Physicist in a wheelchair who explained black holes",
  "Medusa": "Greek monster with snakes for hair",
  "Hercules": "Greek hero with superhuman strength and twelve labours",
  "Zeus": "King of the Greek gods who throws lightning",
  "Robin Hood": "Outlaw who steals from the rich to give to the poor",
  "Dracula": "Vampire count from Transylvania",
  "Frankenstein": "Monster built from body parts in a famous novel",
  "Sommelier": "A wine expert who works in a restaurant",
  "Cartographer": "Someone who draws maps",
  "Archaeologist": "Digs up old things to learn about the past",
  "Meteorologist": "Predicts the weather",
  "Auctioneer": "Talks very fast to sell things to the highest bidder",
  "Ventriloquist": "Talks without moving their lips, usually with a puppet",
  "Cobbler": "Mends shoes",
  "Blacksmith": "Shapes hot metal with a hammer",
  "Midwife": "Helps women give birth",
  "Taxidermist": "Stuffs dead animals so they look alive",
  "Locksmith": "Opens locks and cuts keys",
  "Chauffeur": "A driver hired for someone important",
  "Paparazzi": "Photographers who chase celebrities",
  "Ibn Battuta": "Moroccan traveller who wrote about his journeys across Africa and Asia in the 1300s",
  "Hannibal": "Carthaginian general who crossed the Alps with elephants",
  "Genghis Khan": "Mongol ruler who built a huge empire",
  "Julius Caesar": "Roman leader stabbed by his friends in the senate",
  "Joan of Arc": "French teenage girl who led an army",
  "Florence Nightingale": "The lady with the lamp, a famous nurse",
  "Alexander the Great": "Macedonian king who conquered a huge empire by age thirty",
  "Tutankhamun": "Boy pharaoh buried with a golden mask",
  "Amelia Earhart": "Female pilot who vanished over the Pacific",
  "Great Zimbabwe": "Ruins of a huge stone city in southern Africa",
  "Axum": "Ancient Ethiopian kingdom with tall stone pillars",
  "Carthage": "Ancient city in what is now Tunisia that fought Rome",
  "Dahomey": "Old kingdom in today's Benin, famous for its women warriors",
  "Timbuktu": "Mali city known for its old libraries and as a very faraway place",
  "The Door of No Return": "Gateway at the old slave forts where captives left Africa",
  "Assin Manso": "Ghana town where captives had their last bath before the coast",
  "Pikworo Slave Camp": "Old holding camp for captives in northern Ghana",
  "Larabanga Mosque": "Ghana's oldest place of Muslim worship, built of mud",
  "The Sahel": "The dry belt just below the Sahara",
  "Lake Chad": "A shrinking lake shared by four countries",
  "Soweto": "Township near Johannesburg known for the 1976 student uprising",
  "Robben Island": "Where Mandela spent most of his years in prison",
  "Pompeii": "Roman town buried by a volcano",
  "The Silk Road": "Ancient trade routes between China and Europe",
  "Atlantis": "Legendary island said to have sunk into the sea",
  "Machu Picchu": "Inca city high in the Andes mountains",
  "Petra": "Ancient city carved into pink rock in Jordan",
  "Angkor Wat": "Huge temple complex in Cambodia",
  "Stonehenge": "Circle of giant standing stones in England",
  "Mount Olympus": "Mountain home of the Greek gods",
  "The Suez Canal": "Waterway through Egypt linking two seas",
  "The Panama Canal": "Waterway that joins the Atlantic and Pacific",
  "The Bermuda Triangle": "Part of the ocean where ships and planes are said to vanish",
  "The Prime Meridian": "The line of zero degrees longitude through Greenwich",
  "The equator": "Imaginary line around the middle of the Earth",
  "The Atlas Mountains": "Mountain range in Morocco",
  "The Serengeti": "Big Tanzanian plain famous for its wildebeest migration",
  "The Kalahari": "Dry sandy region in southern Africa",
  "The Namib Desert": "Dry coastal land in Namibia, one of the oldest in the world",
  "The Okavango Delta": "Botswana wetland where a river spreads out in the desert",
  "Lalibela": "Ethiopian town of churches carved down into rock",
  "Gorée Island": "Small place off Dakar with an old house where captives were held",
  "Mount Kenya": "Snow-capped East African mountain right on the equator",
  "Akosombo Dam": "Dam on the Volta that makes much of Ghana's power",
  "Kwame Nkrumah Mausoleum": "Memorial park in Accra where Ghana's first president is buried",
  "The Rosetta Stone": "Carved slab that helped people read ancient Egyptian writing",
  "Excalibur": "King Arthur's sword",
  "Pandora's box": "A Greek myth box that let all the troubles out into the world",
  "The Trojan horse": "Hollow wooden gift used to sneak soldiers into a city",
  "Aladdin's lamp": "Rub it and a genie appears",
  "An abacus": "Frame with beads used for counting",
  "A sundial": "Tells the time using a shadow",
  "A hourglass": "Sand trickles through it to measure time",
  "A periscope": "Tube with mirrors for seeing over the top of something, used on submarines",
  "A quill pen": "Old writing pen made from a feather",
  "Gold weights": "Little brass figures the Akan used to weigh gold dust",
  "A linguist staff": "Decorated stick carried by a chief's spokesman",
  "Cowrie shells": "Small white sea snail casings once used as money",
  "A fontomfrom drum": "Big drum played at the Asante court",
  "Adinkra stamp": "Carved block for printing symbols onto cloth",
  "The Golden Stool": "Sacred seat said to hold the soul of the Asante people",
  "A sextant": "Old tool sailors used to find their position from the sun and stars",
  "A metronome": "Ticking device that keeps musicians in time",
  "A kaleidoscope": "Tube you turn to see changing coloured patterns",
  "A thimble": "Small cap that protects your finger when sewing",
  "A colander": "Bowl with holes for draining pasta",
  "A whisk": "Wire kitchen tool for beating eggs",
  "An anvil": "Heavy iron block a blacksmith hammers metal on",
  "A tripod": "Three-legged stand for a camera",
  "An easel": "Stand that holds a painting while the artist works",
  "A boomerang": "Curved stick that comes back when thrown",
  "A didgeridoo": "Long wooden Australian instrument you blow into",
  "An accordion": "Instrument you squeeze and stretch, with keys and buttons",
  "A harp": "Big triangular instrument with many strings",
  "Bagpipes": "Scottish instrument with a bag under the arm",
  "A kora": "West African instrument with 21 strings and a big gourd body",
  "A djembe": "West African hand drum shaped like a goblet",
  "A balafon": "West African wooden xylophone",
  "A shekere": "Gourd covered with a net of beads that you shake",
  "A gong": "Big hanging metal disc you hit",
  "A lantern": "Portable light with a glass or paper case",
  "Harmattan": "Dry dusty wind from the Sahara that blows over Ghana in the dry season",
  "Metamorphosis": "A caterpillar turning into a butterfly",
  "Hibernation": "Animals sleeping through the winter",
  "Migration": "Animals travelling long distances with the seasons",
  "Camouflage": "Blending in with your surroundings",
  "Erosion": "Soil or rock slowly worn away by water or wind",
  "A glacier": "A huge slow river of ice",
  "The northern lights": "Green and purple glow in the sky near the Arctic",
  "A woolly mammoth": "Extinct hairy ice age relative of the elephant",
  "The dodo": "Extinct flightless bird from Mauritius",
  "Deforestation": "Cutting down huge areas of forest",
  "Bauxite": "The rock aluminium is made from",
  "Manganese": "A metal used to make steel",
  "A baobab tree": "Huge tree with a fat trunk, called the upside-down tree",
  "Cocoa pod": "The fruit that chocolate comes from",
  "Galamsey (illegal mining)": "Small-scale gold digging done without a licence in Ghana",
  "An aardvark": "African animal with a long snout that eats termites",
  "A pangolin": "Scaly animal that rolls into a ball",
  "An okapi": "Forest animal with a giraffe's neck and zebra stripes on its legs",
  "A manatee": "Gentle sea cow",
  "A narwhal": "Whale with a long tusk, the unicorn of the sea",
  "A platypus": "Egg-laying animal with a duck's bill",
  "A mandrill": "Large monkey with a colourful blue and red face",
  "A meerkat": "Small desert animal that stands up on its back legs, like Timon",
  "A wildebeest": "Antelope that migrates in huge herds",
  "A warthog": "Wild pig with tusks, like Pumbaa",
  "A hyena": "Spotted animal known for its laugh",
  "Pi": "3.14 and many more digits: the number you use for circles",
  "Photosynthesis": "How plants make food from sunlight",
  "The Big Bang": "The explosion said to have started the universe",
  "The Magna Carta": "Old English document that limited the king's power",
  "Brexit": "Britain leaving the European Union",
  "Apartheid": "South Africa's system of separating people by race",
  "Pan-Africanism": "The idea that Africans around the world should unite",
  "Sankofa": "Akan idea: go back and fetch it, learn from the past",
  "Gye Nyame": "Adinkra symbol meaning except God",
  "Ubuntu": "I am because we are",
  "The Berlin Conference": "The meeting where European powers carved up Africa on paper",
  "The Scramble for Africa": "European countries racing to claim African land",
  "A coup": "The army seizing power from the government",
  "The Cold War": "Tension between the USA and the Soviet Union with no direct fighting",
  "Y2K": "The fear that computers would crash when the year 2000 began",
  "A paradox": "A statement that seems to contradict itself",
  "Murphy's Law": "Anything that can go wrong will go wrong",
  "Déjà vu": "The feeling that you have already lived this moment",
  "Autocorrect": "Phone feature that changes the word you typed",
  "Cryptocurrency": "Digital money that no bank controls",
  "Newton's apple": "Fruit said to have inspired the idea of gravity",
  "Colonialism": "One country taking over and ruling another",
  "Pan-African Congress": "Meetings where leaders from across the Black world planned for freedom",
  "Chieftaincy": "The system of traditional rulers like chiefs and queen mothers",
  "The census": "The count of everybody who lives in a country",
  "An algorithm": "Step-by-step instructions a computer follows",
  "A podcast": "Spoken show you download and listen to",
  "Procrastination": "Putting off what you should be doing now",
  "Nostalgia": "Missing the past fondly",
  "Irony": "When the opposite of what you expect happens",
  "Sarcasm": "Saying the opposite of what you mean to mock someone",
  "Karma": "What goes around comes around",
  "Gossip": "Talking about other people's business",
  "Small talk": "Light chat about nothing important, like the weather",
  "A rumour": "A story going round that may not be true",
  "Nepotism": "Giving jobs to your own family",
  "Bribery": "Paying someone secretly to get your way",
  "Inflation": "Prices going up over time",
  "A recession": "A time when the economy shrinks and jobs are lost",
  "A budget": "A plan for how to spend your money",
  "The stock market": "Where people buy and sell shares in companies",
  "A mortgage": "A loan to buy a house",
  "A hashtag": "The # symbol that groups posts on social media",
  "The slave trade": "The buying and selling of people across the Atlantic",
  "Democracy": "Government by the people through voting",
  "The Constitution": "The document that sets out how a country is run",
  "Pouring libation": "Tipping a drink on the ground to honour ancestors",
  "Swearing in a president": "A leader taking the oath of office",
  "Gold panning": "Washing river sand in a pan to find flakes of gold",
  "Conducting an orchestra": "Waving a baton to lead the musicians"
};
