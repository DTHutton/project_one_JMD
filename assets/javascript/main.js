$(document).ready(function () {


    let characters = [];
    //this fills our characters array so we have 10 characters
    function generateCharacters() {

        for (let i = 0; i < 10; i++) {
            characters.push({
                name: "Character" + i,
                hp: 50,
                attack: 5
            });
        }
        console.log(characters);
    }



    function generateCharacterButtons() {

        for (let j = 0; j < 10; j++) {
            let createCharacters = `
        <h1>${characters[j]}</h1>
        `
            $("").append(createCharacters);
        }

    }
    generateCharacters();
    generateCharacterButtons();


    //character portrait api through giphy

    // let charArray = [""];

    let gifID = "ftqLysT45BJMagKFuk";

    let hpVal = 50;
    let attVal = 50;


    const giphyApiKey = "gAw2fynIwAANSTYnFxo7kHEYbOEsfAov";

    let giphyQuery = "https://api.giphy.com/v1/gifs/" + gifID + "?&api_key=" + giphyApiKey;

    $.ajax({
        type: "GET",
        url: giphyQuery,
        success: function (response) {
            let results = response.data;

            let stillUrl = results.images.fixed_height_still.url;
            let animateUrl = results.images.fixed_height.url;

            let charTemplate = `
            <div class="card" style="width: 18rem;">
                <img src="${stillUrl}" class="card-img-top portrait" data-animate="${animateUrl}" data-still="${stillUrl}" data-state="still" alt="placeholder">
                <div class="card-body">
                    <h5 class="card-title">Character Name</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">HP: ${hpVal}</li>
                    <li class="list-group-item">Attack: ${attVal}</li>
                </ul>
                <div class="card-body">
                    <a href="#" class="card-link" id="attack">Attack Button</a>
                    <a href="#" class="card-link" id="taunt">Taunt Button</a>
                </div>
            </div>
            `
            console.log(charTemplate);
            $("#characterPortrait").append(charTemplate);

            //taunt button changes it from still to animated, attack button changes it back to still
            $("#taunt").on("click", function () {
                $(".portrait").attr("src", $(".portrait").attr("data-animate"));
                $(".portrait").attr("data-state", "animate");
            });

            $("#attack").on("click", function () {
                $(".portrait").attr("src", $(".portrait").attr("data-still"));
                $(".portrait").attr("data-state", "still");
            });
        }
    });
});