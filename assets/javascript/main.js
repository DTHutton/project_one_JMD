 //character portrait values generator
    const charObj = {
        sassyChicken: "ftqLysT45BJMagKFuk",
        dramaCat: "ZyiSGjEVsLnB0SGkgN",
        creepachu: "U2nN0ridM4lXy",
        trippingBilly: "7zF3biR7j50eQ",
        meInMiddleSchool: "YPEpEDDFs7sEU"
    };

    const charApiArray = [charObj.sassyChicken, charObj.dramaCat, charObj.creepachu, charObj.trippingBilly, charObj.meInMiddleSchool]

    const charArray = ["Sassy Chicken", "Drama Cat", "Creepachu", "Tripping Billy", "Me in Middle School"];

    const btnThingy = [0, 1, 2, 3, 4, 5];

    for (let k = 0; k < charArray.length; k++) {
        let charName = charArray[k];
        let charApi = charApiArray[k];
        let btnThing = btnThingy[k];

        let hpVal = 50;
        let attVal = 50;

        const giphyApiKey = "gAw2fynIwAANSTYnFxo7kHEYbOEsfAov";

        const giphyQuery = "https://api.giphy.com/v1/gifs/" + charApi + "?&api_key=" + giphyApiKey;

        $.ajax({
            type: "GET",
            url: giphyQuery,
            success: function (response) {

                let results = response.data;
                let stillUrl = results.images.fixed_height_still.url;
                let animateUrl = results.images.fixed_height.url;

                let charTemplate = `
            <div class="card m-1" style="width: 18rem;" data-id="${btnThing}">
                <img src="${stillUrl}" class="card-img-top portrait" data-animate="${animateUrl}" data-still="${stillUrl}" data-state="still" alt="placeholder">
                <div class="card-body">
                    <h5 class="card-title">Character Name: ${charName}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">HP: ${hpVal}</li>
                    <li class="list-group-item">Attack: ${attVal}</li>
                </ul>
                <div class="card-body">
                    <a href="#" class="card-link" id="attack" data-id="${btnThing}">Attack Button</a>
                    <a href="#" class="card-link" id="taunt" data-id="${btnThing}">Taunt Button</a>
                </div>
            </div>
            `

                $("#characterPortrait").append(charTemplate);

                //taunt button changes it from still to animated, attack button changes it back to still
                $(".portrait").on("click", function () {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                });

                $("#attack").on("click", function () {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                });

                //taunt button changes it from still to animated, attack button changes it back to still
                // $("#taunt").on("click", function () {
                //     $(".portrait").attr("src", $(".portrait").attr("data-animate"));
                //     $(".portrait").attr("data-state", "animate");
                // });

                // $("#attack").on("click", function () {
                //     $(".portrait").attr("src", $(".portrait").attr("data-still"));
                //     $(".portrait").attr("data-state", "still");
                // });
            }
        });
    }


});

//sets initial conditions
let giphyChosen = false;
let enemyChosen = false;
let currentGiphy = false;
let currentEnemy = false;

let yourAttack;
let yourHealth;
let enemyAttack;
let enemyHealth;
let enemiesLeft = 3;

//this will reset the values for the elements stats
function reset() {

    giphyChosen = false;
    enemyChosen = false;
    currentGiphy = false;
    currentEnemy = false;
    yourAttack="";
    yourHealth="";
    enemyAttack="";
    enemyHealth="";
    enemiesLeft = 3

    $("#directions").empty();
    $("#directions").text("Choose an element to battle with and prepare to face the rest of the elements");

    generateCharacters();
};

function generateCharacters() {
    for (i = 0; i<elements.length; i++) {
        let template = `
            <div class="col-3">
                <img src="${elements[i].image}" class="img-thumbnail"
                alt="${elements[i].name}" title="${elements[i].name}"
                data-attack-power="${elements[i].attack}" 
                data-counter-power="${elements[i].counter}" 
                data-health-power="${elements[i].health}"
                data-background="${elements[i].background}">
            </div>
        `
        $("#character-display").append(template);
    }

    $(".img-thumbnail").on("click", function(){
        if (elementChosen === false && enemyChosen === false) {
            elementChosen = true;
            currentElement = true;
            yourAttack = $(this).attr("data-attack-power");
            yourHealth = Math.floor(Math.random() * (400 - 250 + 1)) + 250;
            console.log(yourAttack, yourHealth);
            $("#chosen-character").append($(this));
            $("#chosen-character").append("<p  id='your-health'>Health Power: " + yourHealth
             + "</p><p id='your-attack'>Attack Power: " + yourAttack + "</p>");
             $("#directions").text("Choose your first oppponent");
             
        }
        else if (elementChosen === true && enemyChosen === false){
            enemyChosen = true;
            currentEnemy = true;
            enemyAttack = $(this).attr("data-attack-power");
            enemyHealth = $(this).attr("data-health-power");
            console.log(enemyAttack, enemyHealth);
            $("#chosen-enemy").append($(this));
            $("#chosen-enemy").append("<p id='enemy-health'>Health Power: " + enemyHealth
            + "</p><p id='their-attack'>Attack Power: " + enemyAttack + "</p>");
            $("#directions").text("Its time to fight!");
            $("#character-display").hide();
            let background = $(this).attr("data-background");
            $("#battleground").css("background-image", "url(" + background + ")");
            
            gamePlay();
        }
    })

};



generateCharacters();

function gamePlay() {
    if (enemiesLeft > 0 && enemyHealth > 0 && yourHealth > 0 ) {
        let fightButtons = `
            <button type="button" class="btn btn-primary" id="attack-button">Attack</button>
            `
        $("#game-buttons").append(fightButtons);

        $("#attack-button").on("click", function() {
            $("#directions").text("Destroy them")
            
                enemyHealth = enemyHealth - yourAttack;
                console.log(enemyHealth);
                $("#enemy-health").text("Enemy Health: " + enemyHealth);
                yourHealth = yourHealth - enemyAttack;
                $("#your-health").text("Your Health: " + yourHealth);
            
            if (enemyHealth <= 0 && yourHealth > 0 && enemiesLeft > 0) {
                enemiesLeft--;
                console.log("enemies left: " + enemiesLeft);
                $("#your-health").text("Your Health: " + yourHealth);
                $("#character-display").show();
                $("#chosen-enemy").empty();
                $("#game-buttons").empty();
                enemyChosen = false;
                currentEnemy= false;
                nextRound();
            }


        });
    }

};

function nextRound() {
    if(enemiesLeft === 0 && yourHealth > 0 ) {
        win();
    }
    else if(enemiesLeft > 0 && yourHealth <= 0) {
        lose();
    }
    else {

    
    $("#directions").text("Choose your next oppponent");
    $(".img-thumbnail").on("click", function() {
        if (elementChosen === true && enemyChosen === false){
            enemyChosen = true;
            currentEnemy = true;
            enemyAttack = $(this).attr("data-attack-power");
            enemyHealth = $(this).attr("data-health-power");
            console.log(enemyAttack, enemyHealth);
            $("#chosen-enemy").append($(this));
            $("#chosen-enemy").append("<p id='enemy-health'>Health Power: " + enemyHealth
            + "</p><p id='their-attack'>Attack Power: " + enemyAttack + "</p>");
            $("#directions").text("Its time to fight!");
            $("#character-display").hide();
            
            gamePlay();
        }
    });
}
}
function win() {
    $("#directions").text("You Win!");
    $("#chosen-character").empty();

    let resetButton = `
    <br>
    <button type="button" class="btn btn-primary" id="reset-button">Play Again</button>
    `
    $("#directions").append(resetButton);
    $("#reset-button").on("click", function() {
        reset();
    });
}

function lose() {
    $("#directions").text("You Lose!");

    let resetButton = `
    <button type="button" class="btn btn-primary" id="reset-button">Play Again</button>
    `
    $("#reset-button").on("click", function() {
        reset();
    });
}