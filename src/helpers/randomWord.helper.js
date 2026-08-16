//<--- RANDOM WORD GENERATOR FOR THE INPUT FIELD --->

function getRandomWord() {
  const words = [' mario', 'unicorn', 'luigi', 'penguin'];
  return words[Math.floor(Math.random() * words.length)];
}

//<--- EXPORT FUNCTIONS --->
export { getRandomWord };
