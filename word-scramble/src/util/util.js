export const shuffle = (arr) => {
  let temp = [];
  
  while (arr.length > 0) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    temp.push(arr[randomIndex]);
    arr.splice(randomIndex, 1);
  }

  for (let i = 0; i < temp.length; i++) {
    arr.push(temp[i]);
  }
  return arr;
}

export const scrambleWord = (currentWord, idealWord) => {
  let letterArray = Array.from(currentWord);
  shuffle(letterArray);
  let scrambledWord = letterArray.join(''); //turn into string for comparison
  while (scrambledWord === currentWord || scrambledWord === idealWord) {
    shuffle(letterArray); // reshuffle
    scrambledWord = letterArray.join('');
  }
  return scrambledWord;
}