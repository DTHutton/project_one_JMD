 $(document).ready(function () {
 //character portrait values generator
    // const charObj = {
    //     sassyChicken: "ftqLysT45BJMagKFuk",
    //     dramaCat: "ZyiSGjEVsLnB0SGkgN",
    //     creepachu: "U2nN0ridM4lXy",
    //     trippingBilly: "7zF3biR7j50eQ",
    //     meInMiddleSchool: "YPEpEDDFs7sEU"
    // };

    //const charApiArray = [charObj.sassyChicken, charObj.dramaCat, charObj.creepachu, charObj.trippingBilly, charObj.meInMiddleSchool]

    //const charArray = ["Sassy Chicken", "Drama Cat", "Creepachu", "Tripping Billy", "Me in Middle School"];

    //const btnThingy = [0, 1, 2, 3, 4, 5];
    let sassyChicken = {name: "Sassy Chicken", health: 90, attack: 15, image: "ftqLysT45BJMagKFuk"};
    let dramaCat = {name: "Drama Cat", health: 100, attack: 10, image: "ZyiSGjEVsLnB0SGkgN"};
    let creepachu = {name: "Creepachu", health: 110, attack: 15, image: "U2nN0ridM4lXy"};
    let trippingBilly = {name: "Tripping Billy", health: 90, attack: 10, image: "7zF3biR7j50eQ"};
    let meInMiddleSchool = {name: "Me in Middle School", health: 100, attack: 15, image: "YPEpEDDFs7sEU"};

    let characters = [sassyChicken, dramaCat, creepachu, trippingBilly, meInMiddleSchool];

    let giphyChosen = false;
    let enemyChosen = false;
    let currentGiphy = false;
    let currentEnemy = false;

    let yourAttack;
    let yourHealth;
    let enemyAttack;
    let enemyHealth;
    let enemiesLeft = 4;
    

    function genCharacters() {

            for (let k = 0; k < characters.length; k++) {
                // let charName = charArray[k];
                // let charApi = charApiArray[k];
                // let btnThing = btnThingy[k];

                // let hpVal = 50;
                // let attVal = 50;

                const giphyApiKey = "gAw2fynIwAANSTYnFxo7kHEYbOEsfAov";

                const giphyQuery = "https://api.giphy.com/v1/gifs/" + characters[k].image + "?&api_key=" + giphyApiKey;

                $.ajax({
                    type: "GET",
                    url: giphyQuery,
                    success: function (response) {

                        let results = response.data;
                        let stillUrl = results.images.fixed_height_still.url;
                        let animateUrl = results.images.fixed_height.url;

                        let charTemplate = `
                            <div class="card m-1" style="width: 18rem;" data-attack-power="${characters[k].attack}" data-health-power="${characters[k].health}">
                                <img src="${stillUrl}" class="card-img-top portrait" data-animate="${animateUrl}" data-still="${stillUrl}" 
                                    data-state="still" alt="placeholder">
                                <div class="card-body">
                                    <h5 class="card-title">Character Name: ${characters[k].name}</h5>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item" id="show-health">HP: ${characters[k].health}</li>
                                    <li class="list-group-item" id="show-attack">Attack: ${characters[k].attack}</li>
                                </ul>
                            </div>
                            `

                        $("#characterPortrait").append(charTemplate);

                        //taunt button changes it from still to animated, attack button changes it back to still
                        // $(".portrait").on("click", function () {
                        //     $(this).attr("src", $(this).attr("data-animate"));
                        //     $(this).attr("data-state", "animate");
                        // });

                        // $("#attack").on("click", function () {
                        //     $(this).attr("src", $(this).attr("data-still"));
                        //     $(this).attr("data-state", "still");
                        // });

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
            $(document).on("click", ".card", function(){
                
                if (giphyChosen === false && enemyChosen === false) {
                    giphyChosen = true;
                    currentGiphy = true;
                    $(this).attr("id", "you");
                    yourAttack = $(this).attr("data-attack-power");
                    yourHealth = Math.floor(Math.random() * (500 - 400 + 1)) + 400;
                    console.log(yourAttack, yourHealth);
                    $(this).find("ul").find("#show-health").attr("id", "your-health");
                    $("#your-health").text("Your Health: " + yourHealth);
                    $("#chosen-character").append($(this));
                     $("#directions").text("Choose your first oppponent");
                     $("#chosen-character").append("<div id ='fight-buttons'><button id='attack'>Attack Button</button><button id='taunt'>Taunt Button</button></div>");
                   
                     
                }
                else if (giphyChosen === true && enemyChosen === false){
                    enemyChosen = true;
                    currentEnemy = true;
                    enemyAttack = $(this).attr("data-attack-power");
                    enemyHealth = $(this).attr("data-health-power");
                    console.log(enemyAttack, enemyHealth);
                    $(this).find("ul").find("#show-health").attr("id", "enemy-health");
                    $("#enemy-health").text("Enemy Health: " + enemyHealth);
                    $("#chosen-enemy").append($(this));
                    $("#directions").text("Its time to fight!");
                    $("#characterPortrait").hide();
                    
                    $(document).on("click", "#attack", function() {
 
                        gamePlay();
                        
                    });
                }
            });
    }

 
    genCharacters();
    //this will reset the values for the elements stats
        function reset() {
            sassyChicken = {name: "Sassy Chicken", health: 90, attack: 15, image: "ftqLysT45BJMagKFuk"};
            dramaCat = {name: "Drama Cat", health: 100, attack: 10, image: "ZyiSGjEVsLnB0SGkgN"};
            creepachu = {name: "Creepachu", health: 110, attack: 15, image: "U2nN0ridM4lXy"};
            trippingBilly = {name: "Tripping Billy", health: 90, attack: 10, image: "7zF3biR7j50eQ"};
            meInMiddleSchool = {name: "Me in Middle School", health: 100, attack: 15, image: "YPEpEDDFs7sEU"};
        
            characters = [sassyChicken, dramaCat, creepachu, trippingBilly, meInMiddleSchool];

            giphyChosen = false;
            enemyChosen = false;
            currentGiphy = false;
            currentEnemy = false;
            yourAttack="";
            yourHealth="";
            enemyAttack="";
            enemyHealth="";
            enemiesLeft = 4;

            $("#directions").empty();
            $("#directions").text("Choose an element to battle with and prepare to face the rest of the elements");
            
            genCharacters();
        };
    


        function gamePlay() {         
            
        
            if (enemyHealth > 0 && enemiesLeft > 0 && yourHealth > 0 ) {
               
                $("#directions").text("Destroy them")
                  
                enemyHealth = enemyHealth - yourAttack;
                console.log(enemyHealth);
                $("#enemy-health").text("Enemy Health: " + enemyHealth);
                yourHealth = yourHealth - enemyAttack;
                $("#your-health").text("Your Health: " + yourHealth);
        
                
            }
            else if (enemyHealth <= 1 && yourHealth > 0 && enemiesLeft > 0) {
                    enemiesLeft--;
                    $("#chosen-enemy").empty();
                    console.log("enemies left: " + enemiesLeft);
                    $("#your-health").text("Your Health: " + yourHealth);
                    $("#characterPortrait").show();
                    $("#you").hide();
                    $("#fight-buttons").hide();
                    enemyChosen = false;
                    currentEnemy= false;
                    
                    nextRound();
            
            
                  
                
            }
        
        
        };

        function nextRound() {
            if(enemiesLeft === 0) {
                win();
            }
            else if(enemiesLeft > 0 && yourHealth < 0) {
                lose();
            }
            else {
        
                
            $("#directions").text("Choose your next oppponent");
            $(document).on("click", ".card", function() {
                $("#you").show();
                $("#fight-buttons").show();
                    if (giphyChosen === true && enemyChosen === false){
                        enemyChosen = true;
                        currentEnemy = true;
                        enemyAttack = $(this).attr("data-attack-power");
                        enemyHealth = $(this).attr("data-health-power");
                        console.log(enemyAttack, enemyHealth);
                        $("#chosen-enemy").append($(this));
                        $("#directions").text("Its time to fight!");
                        $("#characterPortrait").hide();
                        
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
            $(document).on("click", "#reset-button", function() {
                reset();
            });
        }
        
        function lose() {
            $("#directions").text("You Lose!");
        
            let resetButton = `
            <button type="button" class="btn btn-primary" id="reset-button">Play Again</button>
            `
            $("#directions").append(resetButton);
            $(document).on("click", "#reset-button", function() {
                reset();
            });
        }
});




