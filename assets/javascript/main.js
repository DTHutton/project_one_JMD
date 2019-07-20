
let characters = [];
//this fills our characters array so we have 10 characters
function generateCharacters() {

    for(let i = 0; i<10; i++) {
        characters.push( {
            name: "Character" + i,
            hp: 50,
            attack: 5
        });
    }
    console.log(characters);
}
   


function generateCharacterButtons() {
    
    for(let j = 0; j < 10; j++) {
        let createCharacters = `
        <h1>${characters[j]}</h1>
        `
        $("").append(createCharacters);
    }
    
}
generateCharacters();
generateCharacterButtons();








