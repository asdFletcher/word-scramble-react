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

export const fetchPost = (url = '', data = {}) => {
  // Default options are marked with *
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()) // parses JSON response into native JavaScript objects 
    .catch(err => console.error(err));
}