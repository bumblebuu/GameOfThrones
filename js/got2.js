const Character = {
  characters: [],
  init() {
    this.findAll();
  },
  elements: {
    gotCharactersDiv: document.querySelector('.div-got-chars'),
  },
  charactersFromJson(gotCharacters) {
    this.characters = JSON.parse(gotCharacters);
    // console.log(this.characters);
    this.showAll();
  },
  showAll() {
    let divs = '';
    for (let i = 0; i < this.characters.length; i += 1) {
      if (this.characters[i].hasOwnProperty('dead') === false) {
        divs += this.createDivs(this.characters[i]);
      }
    }
    // console.log(divs);
    this.elements.gotCharactersDiv.innerHTML += divs;
  },
  findAll() {
    const request = new XMLHttpRequest();
    request.onload = () => {
      this.charactersFromJson(request.responseText);
    };
    request.open('GET', '/json/got.json');
    request.send();
  },
  createDivs(char) {
    return `
    <div class="character-div">  
        <div  class="image-div">
            <img src="${char.portrait}" alt="${char.name}">
        </div>
        <div class="name-div">
            <h4>${char.name}</h4>
        </div>
    </div>
    `;
  },
};

Character.init();
