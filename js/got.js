let characters;

function storeCharacters(jsonContent) {
  characters = JSON.parse(jsonContent);
  console.log(characters);
  showCharacters(characters);
}

function getJSON(url, callback) {
  const request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      callback(request.responseText);
    }
  };
  request.open('GET', url, true);
  request.send();
}

getJSON('/json/got.json', storeCharacters);

function showCharacters(){
let char = [];

for (let i = 0; i < characters.length; i += 1){
  if (characters[i].)
}
}