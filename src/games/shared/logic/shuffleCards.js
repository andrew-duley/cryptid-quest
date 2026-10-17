// Function that performs a Fisher Yates shuffle and then returns the shuffled deck
export function shuffleCards(array) {
  // Make a shallow copy (new array, same element references)
  const deck = array.slice();

  // Shuffle the copy in place
  let i = deck.length;

  while (i > 0) {
    const j = Math.floor(Math.random() * i);
    i --;
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
 
  // Return the shuffled copy
  return deck
}