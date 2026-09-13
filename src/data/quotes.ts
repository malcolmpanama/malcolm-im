export interface Quote {
  text: string;
  author?: string;
}

export const quotes: Quote[] = [
  { text: "Discipline equals freedom.", author: "Jocko Willink" },
  { text: "You become what you repeat.", author: "James Clear" },
  { text: "The obstacle is the way.", author: "Marcus Aurelius" },
  { text: "Show me how you spend your time, and I'll show you what you value." },
  {
    text: "You don't rise to the level of your goals. You fall to the level of your systems.",
    author: "James Clear",
  },
  {
    text: "The soul becomes dyed with the color of its thoughts.",
    author: "Marcus Aurelius",
  },
  {
    text: "Routine, in an intelligent man, is a sign of ambition.",
    author: "W.H. Auden",
  },
  {
    text: "Be regular and orderly in your life so you may be violent and original in your work.",
    author: "Flaubert",
  },
  {
    text: "You will never change your life until you change something you do daily.",
    author: "John C. Maxwell",
  },
  { text: "If you want to go fast, go alone. If you want to go far, go together." },
];
