export interface PickItem {
  name: string;
  note?: string;
}

export const books: PickItem[] = [
  { name: "Brave New World", note: "Aldous Huxley" },
  { name: "The Burnout Society", note: "Byung-Chul Han" },
  { name: "A Tale of Two Cities", note: "Charles Dickens" },
  { name: "Fahrenheit 451", note: "Ray Bradbury" },
  { name: "A Short History of Decay", note: "E.M. Cioran" },
  { name: "The Trouble with Being Born", note: "Emil Cioran" },
  { name: "On the Heights of Despair", note: "Emil Cioran" },
  { name: "El hombre mediocre", note: "José Ingenieros" },
  { name: "La tregua", note: "Mario Benedetti" },
  { name: "Crime and Punishment", note: "Fyodor Dostoevsky" },
  { name: "Notes from Underground", note: "Fyodor Dostoevsky" },
  { name: "Nature", note: "Ralph Waldo Emerson" },
  { name: "Self-Reliance", note: "Ralph Waldo Emerson" },
  { name: "Writing Down the Bones", note: "Natalie Goldberg" },
  { name: "Steal Like an Artist", note: "Austin Kleon" },
  { name: "Meditations", note: "Marcus Aurelius" },
  { name: "The Road Less Traveled", note: "M. Scott Peck" },
  { name: "The Path: What Chinese Philosophers Can Teach Us", note: "Michael Puett" },
  { name: "Letters from a Stoic [Annotated]", note: "Seneca" },
  { name: "El Túnel", note: "Ernesto Sábato" },
  { name: "The Picture of Dorian Gray", note: "Oscar Wilde" },
  { name: "The Importance of Being Earnest", note: "Oscar Wilde" },
  { name: "The Soul of Man Under Socialism", note: "Oscar Wilde" },
  { name: "Discipline Equals Freedom", note: "Jocko Willink" },
  { name: "The War of Art", note: "Steven Pressfield" },
];

export const games: PickItem[] = [
  { name: "The Last of Us Part I", note: "peak storytelling" },
  { name: "The Last of Us Part II", note: "emotionally ruthless" },
  { name: "Red Dead Redemption 1 & 2", note: "lonely masterpieces" },
  { name: "Ghost of Tsushima", note: "visual poetry in motion" },
  { name: "Bloodborne", note: "intense and unforgettable" },
  { name: "Spelunky", note: "endless surprises in every run" },
  { name: "Enter the Gungeon", note: "bullet hell brilliance" },
  { name: "Dead Cells", note: "fast, fluid, and addictive" },
  { name: "The War of Mine", note: "survival with emotional weight" },
  { name: "Detroit: Become Human", note: "choices that hit hard" },
  { name: "Stray", note: "short, strange, beautiful" },
  { name: "Dave the Diver", note: "chill and addictive" },
  { name: "Portal 1", note: "clever, tight, timeless" },
  { name: "Braid", note: "time-bending and deep" },
  { name: "Little Big Planet", note: "creative chaos" },
  { name: "Castle Crashers", note: "hilarious co-op fun" },
];

export interface Playlist {
  name: string;
  url: string;
}

export const playlists: Playlist[] = [
  {
    name: "If Silence Could Sing",
    url: "https://open.spotify.com/playlist/6loFPU5OucHQhwhv52Uwiq?si=e617685e711f4210",
  },
  {
    name: "Echoes of 2099",
    url: "https://open.spotify.com/playlist/32R8XCRlGmH4aYlIKFV7LM?si=b169bc5e0f2e47a6",
  },
];

export interface Decade {
  /** URL segment under /picks/movies/ */
  slug: string;
  /** Label used in headings and nav */
  label: string;
  films: PickItem[];
}

export const decades: Decade[] = [
  {
    slug: "2020s",
    label: "2020s",
    films: [
      { name: "28 Years Later", note: "2025" },
      { name: "Sinners", note: "2025" },
      { name: "The Platform 2", note: "2024" },
      { name: "Civil War", note: "2024" },
      { name: "They Cloned Tyrone", note: "2023" },
      { name: "Talk to Me", note: "2023" },
      { name: "Spider-Man: Across the Spider-Verse", note: "2023" },
      { name: "Anatomy of a Fall", note: "2023" },
      { name: "Top Gun: Maverick", note: "2022" },
      { name: "The Menu", note: "2022" },
      { name: "The Batman", note: "2022" },
      { name: "Everything Everywhere All at Once", note: "2022" },
      { name: "DUNE", note: "2021" },
      { name: "The Harder They Fall", note: "2021" },
      { name: "Don't Look Up", note: "2021" },
      { name: "Tenet", note: "2020" },
    ],
  },
  {
    slug: "2010s",
    label: "2010s",
    films: [
      { name: "The Platform", note: "2019" },
      { name: "Parasite", note: "2019" },
      { name: "Midsommar", note: "2019" },
      { name: "Marriage Story", note: "2019" },
      { name: "Joker", note: "2019" },
      { name: "Apostle", note: "2018" },
      { name: "Suspiria", note: "2018" },
      { name: "Hereditary", note: "2018" },
      { name: "Burning", note: "2018" },
      { name: "A Prayer Before Dawn", note: "2018" },
      { name: "Wind River", note: "2017" },
      { name: "Uncut Gems", note: "2017" },
      { name: "Good Time", note: "2017" },
      { name: "Fracture", note: "2017" },
      { name: "The Handmaiden", note: "2016" },
      { name: "The Witch", note: "2016" },
      { name: "Split", note: "2016" },
      { name: "Hell or High Water", note: "2016" },
      { name: "The Revenant", note: "2015" },
      { name: "The Invisible Guest", note: "2015" },
      { name: "The Invitation", note: "2015" },
      { name: "Sicario", note: "2015" },
      { name: "Mad Max: Fury Road", note: "2015" },
      { name: "Ex Machina", note: "2015" },
      { name: "Nightcrawler", note: "2014" },
      { name: "Snowpiercer", note: "2013" },
      { name: "Enemy", note: "2013" },
      { name: "Drive", note: "2011" },
      { name: "Inception", note: "2010" },
    ],
  },
  {
    slug: "2000s",
    label: "2000s",
    films: [
      { name: "Let the Right One In", note: "2008" },
      { name: "There Will Be Blood", note: "2007" },
      { name: "The Mist", note: "2007" },
      { name: "The Departed", note: "2006" },
      { name: "The Prestige", note: "2006" },
      { name: "Children of Men", note: "2006" },
      { name: "V for Vendetta", note: "2005" },
      { name: "Kingdom of Heaven", note: "2005" },
      { name: "Eternal Sunshine of the Spotless Mind", note: "2004" },
      { name: "Oldboy", note: "2003" },
      { name: "City of God", note: "2002" },
      { name: "Baby Boy", note: "2001" },
    ],
  },
  {
    slug: "90s",
    label: "1990s",
    films: [
      { name: "Saving Private Ryan", note: "1998" },
      { name: "The Truman Show", note: "1998" },
      { name: "Lock, Stock and Two Smoking Barrels", note: "1998" },
      { name: "American History X", note: "1998" },
      { name: "From Dusk Till Dawn", note: "1996" },
      { name: "La Haine", note: "1995" },
      { name: "Heat", note: "1995" },
      { name: "12 Monkeys", note: "1995" },
      { name: "Léon: The Professional", note: "1994" },
    ],
  },
  {
    slug: "80s",
    label: "1980s",
    films: [
      { name: "Grave of the Fireflies", note: "1988" },
      { name: "Akira", note: "1988" },
      { name: "Full Metal Jacket", note: "1987" },
      { name: "The Untouchables", note: "1987" },
      { name: "Fright Night", note: "1985" },
      { name: "Come and See", note: "1985" },
      { name: "Back to the Future", note: "1985" },
      { name: "Beverly Hills Cop", note: "1984" },
      { name: "The Thing", note: "1982" },
      { name: "Airplane!", note: "1980" },
    ],
  },
  {
    slug: "70s",
    label: "1970s",
    films: [
      { name: "Eraserhead", note: "1977" },
      { name: "A Clockwork Orange", note: "1971" },
    ],
  },
];
