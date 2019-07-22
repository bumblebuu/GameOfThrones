const Character = {
  characters: [],
  init() {
    this.findAll();
  },
  elements: {
    gotCharactersDiv: document.querySelector('.div-got-chars'),
    nameSearchInput: document.querySelector('#name-search-input'),
    showCharacters: document.querySelector('.show-character-div'),
  },
  charactersFromJson(gotCharacters) {
    this.characters = this.organizeCharacters(JSON.parse(gotCharacters));
    // console.log(this.characters);
    this.showAll();
  },
  organizeCharacters(array) {
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (array[j].name < array[i].name) {
          const temp = [array[i], array[j]];
          array[j] = temp[0];
          array[i] = temp[1];
        }
      }
    }
    return array;
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

  findCharacter(name) {
    let found = {};
    for (let i = 0; i < this.characters.length; i += 1) {
      if (this.characters[i].name === name) {
        found = this.characters[i];
        break;
      } else {
        found = undefined;
      }
    }
    this.hasHouse(found);
  },
  hasHouse(found) {
    let toBuild = {};
    if (found === undefined) {
      toBuild = 'Character not found.';
    } else if (found.hasOwnProperty('house')) {
      toBuild = this.activateSidebar(found);
      this.enableClass(found);
    } else {
      toBuild = this.activateSidebarNoHouse(found);
      this.enableClass(found);
    }
    this.elements.showCharacters.innerHTML = toBuild;
  },
  enableClass(char) {
    // console.log(char.name);
    const people = this.elements.gotCharactersDiv.children;
    // console.log(people);
    for (let i = 0; i < people.length; i += 1) {
      if (people[i].getAttribute('name') === char.name) {
        people[i].setAttribute('data-current', 'current-character');
        // console.log(people[i].getAttribute('name'));
        this.removeClass(char);
        break;
      }
    }
  },
  removeClass(char) {
    const people = this.elements.gotCharactersDiv.children;
    for (let i = 0; i < people.length; i += 1) {
      if (people[i].getAttribute('name') !== char.name && people[i].hasAttribute('data-current')) {
        people[i].removeAttribute('data-current');
      }
    }
  },
  searchByName() {
    let char = {};
    const name = this.elements.nameSearchInput.value;
    // console.log(name);
    for (let i = 0; i < this.characters.length; i += 1) {
      if (this.characters[i].name.toLowerCase() === name.toLowerCase()) {
        char = this.characters[i];
        break;
      } else {
        char = undefined;
      }
    }
    this.hasHouse(char);
  },
  activateSidebar(char) {
    return `
    <div class="result-container">
      <img class="character-image" src="${char.picture}" alt="${char.name}">
      <div class="name-and-house">
        <h3>${char.name}</h3>
      <img src="/assets/houses/${char.house}.png" alt="${char.house}">
      </div>
    </div>
    <p>${char.bio}</p>
    `;
  },
  activateSidebarNoHouse(char) {
    return `
    <div class="result-container">
      <img class="character-image" src="${char.picture}" alt="${char.name}">
      <div class="name-and-house">
        <h3>${char.name}</h3>
      </div>
    </div>
    <p>${char.bio}</p>
    `;
  },
  createDivs(char) {
    return `
    <div class="character-div" name="${char.name}">  
        <div  class="image-div">
            <img src="${char.portrait}" alt="${char.name}" onclick="Character.findCharacter('${char.name}')">
        </div>
        <div class="name-div">
          <h4 onclick="Character.findCharacter('${char.name}')">${char.name}</h4>
        </div>
    </div>
    `;
  },
};

Character.init();
