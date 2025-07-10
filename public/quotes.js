const quotes = [
    "Discipline equals freedom. – Jocko Willink",
    "You become what you repeat. – James Clear",
    "The obstacle is the way. – Marcus Aurelius",
    "Show me how you spend your time, and I’ll show you what you value.",
    "You don’t rise to the level of your goals. You fall to the level of your systems. – James Clear",
    "The soul becomes dyed with the color of its thoughts. – Marcus Aurelius",
    "Routine, in an intelligent man, is a sign of ambition. – W.H. Auden",
    "Be regular and orderly in your life so you may be violent and original in your work. – Flaubert",
    "You will never change your life until you change something you do daily. – John C. Maxwell",
    "If you want to go fast, go alone. If you want to go far, go together."
  ];
  
  function newQuote() {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById("quote").innerText = random;
  }
  
  window.newQuote = newQuote;
  