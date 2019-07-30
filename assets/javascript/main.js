$(document).ready(function () {



    let sassyChicken = { name: "Chicken", health: 90, attack: 15, image: "ftqLysT45BJMagKFuk" };
    let dramaCat = { name: "Cat", health: 100, attack: 10, image: "ZyiSGjEVsLnB0SGkgN" };
    let creepachu = { name: "Creeper", health: 110, attack: 15, image: "U2nN0ridM4lXy" };
    let trippingBilly = { name: "Billy", health: 90, attack: 10, image: "7zF3biR7j50eQ" };
    let meInMiddleSchool = { name: "School", health: 100, attack: 15, image: "YPEpEDDFs7sEU" };

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

    let userChoice;
    let userChoice2;


    genCharacters = () => {
        
        $("#directions").text("Choose your character and say its name to select it");

        for (let k = 0; k < characters.length; k++) {

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
                            <div class="card m-1" id="${characters[k].name}" style="width: 18rem;" data-attack-power="${characters[k].attack}" data-health-power="${characters[k].health}">
                                <img src="${animateUrl}" class="card-img-top portrait" data-animate="${animateUrl}" data-still="${stillUrl}" data-id="${characters[k].name}" 
                                    data-state="still" alt="placeholder">
                                <div class="card-body">
                                    <h5 class="card-title">${characters[k].name}</h5>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item" id="show-health">HP: ${characters[k].health}</li>
                                    <li class="list-group-item" id="show-attack">Attack: ${characters[k].attack}</li>
                                </ul>
                            </div>
                            `

                    $("#characterPortrait").append(charTemplate);
                }
            });
        }

    }
        characterCheck = () => {

            annyang.addCallback('resultMatch', function(userSaid, commandText, phrases){
                for (i = 0; i < characters.length; i++) {
                    if ((userSaid.toLowerCase()).localeCompare((characters[i].name).toLowerCase()) === 0) {
                        console.log("user said: " + userSaid);
                        console.log("character name: " + characters[i].name);
                        userChoice = characters[i].name;

                        if (giphyChosen === false && enemyChosen === false) {
                            giphyChosen = true;
                            currentGiphy = true;
                            console.log(userChoice);
                            $("#"+userChoice).attr("id", "you");
                            yourAttack = $("#you").attr("data-attack-power");
                            yourHealth = Math.floor(Math.random() * (500 - 400 + 1)) + 400;
                            console.log(yourAttack, yourHealth);
                            $("#you").find("ul").find("#show-health").attr("id", "your-health");
                            $("#your-health").text("Your Health: " + yourHealth);
                            $("#chosen-character").append($("#you"));
                            $("#directions").text("Choose your first opponent");
                        }
                         else if (giphyChosen === true && enemyChosen === false) {
                            enemyChosen = true;
                            currentEnemy = true;
                            enemyAttack = $("#"+userChoice).attr("data-attack-power");
                            enemyHealth = $("#"+userChoice).attr("data-health-power");
                            console.log(enemyAttack, enemyHealth);
                            $("#"+userChoice).find("ul").find("#show-health").attr("id", "enemy-health");
                            $("#enemy-health").text("Enemy Health: " + enemyHealth);
                            $("#chosen-enemy").append($("#"+userChoice));
                            $("#directions").text("Its time to fight! Say attack to begin battling!");
                            $("#characterPortrait").hide();
                            $("#combatZone").show();
                            
                            const loadCanvas = `
                                <canvas id="myCanvas" width="1500" height="800"></canvas>
                                `
                            $("#combatZone").append(loadCanvas);
                            backgroundAnimation();
                            
                        }
                    }
                }

                
            
                
            })
    
        }

            
        
    

    //this will reset the game
    reset = () => {
        console.log("reset the game");
        sassyChicken = { name: "Chicken", health: 90, attack: 15, image: "ftqLysT45BJMagKFuk" };
        dramaCat = { name: "Cat", health: 100, attack: 10, image: "ZyiSGjEVsLnB0SGkgN" };
        creepachu = { name: "Creeper", health: 110, attack: 15, image: "U2nN0ridM4lXy" };
        trippingBilly = { name: "Billy", health: 90, attack: 10, image: "7zF3biR7j50eQ" };
        meInMiddleSchool = { name: "School", health: 100, attack: 15, image: "YPEpEDDFs7sEU" };

        characters = [sassyChicken, dramaCat, creepachu, trippingBilly, meInMiddleSchool];

        giphyChosen = false;
        enemyChosen = false;
        currentGiphy = false;
        currentEnemy = false;
        yourAttack = "";
        yourHealth = "";
        enemyAttack = "";
        enemyHealth = "";
        enemiesLeft = 4;

        userChoice="";
        
        console.log(yourHealth, yourAttack, enemyAttack, enemyHealth, enemiesLeft);
        $("#directions").text("Say 'let me play the damn game' to play again");
        $("#characterPortrait").show();

        
    };

    gamePlay = () => {
        $("#directions").text("Destroy them")
        enemyHealth = enemyHealth - yourAttack;
        console.log("enemy health:" + enemyHealth);
        $("#enemy-health").text("Enemy Health: " + enemyHealth);
        yourHealth = yourHealth - enemyAttack;
        $("#your-health").text("Your Health: " + yourHealth);
        if (enemyHealth <= 0) {
            enemiesLeft--;
            if (enemiesLeft === 0) {
                $("#directions").text("You Win! Say reset to play again");
                $("#chosen-character").empty();
                $("#chosen-enemy").empty();
                $("#combatZone").hide();
            } else {
                $("#chosen-enemy").empty();
                $("#directions").text("choose your next opponent");
                console.log("enemies left: " + enemiesLeft);
                $("#your-health").text("Your Health: " + yourHealth);
                console.log("health left: " + yourHealth);
                $("#characterPortrait").show();
                $("#combatZone").hide();
                enemyChosen = false;
                currentEnemy = false;
                if (enemiesLeft > 0 && yourHealth <= 0) {
                    $("#directions").text("You Lose! Say reset to play again");

                }
                
            }
        }


    };


    backgroundAnimation = () => {
        
        let image = new Image();
        image.src = "assets/images/transport.jpg";
        let canvas = document.getElementById("myCanvas");
        let context = canvas.getContext("2d");
        let row, imageWidth, imageHeight;

        image.onload = function () {
            imageWidth = image.width;
            imageHeight = image.height;
            row = imageHeight;
            requestAnimationFrame(animate);
        };

        function animate() {
            context.drawImage(image, 1, row, imageWidth, 1, 0, 0, imageWidth, row);
            if (row > 0) row--;
            requestAnimationFrame(animate);
        }
    }

    gameCountdown = () => {

        const countReady = `
        <aside class="ready">
        Ready?!
        </aside>
        `
        const countdownTimer = `
        <aside class="countdownTime"></aside>
        `

        setTimeout(function () {
            $("#gameplay-buttons").append(countReady);
        }, 10);

        setTimeout(function () {
            $(".ready").text("");
            $("#gameplay-buttons").append(countdownTimer);
            $(".countdownTime").text("5");
        }, 3000);

        setTimeout(function () {
            $(".countdownTime").text("4");
        }, 4000);

        setTimeout(function () {
            $(".countdownTime").text("3");
        }, 5000);

        setTimeout(function () {
            $(".countdownTime").text("2");
        }, 6000);

        setTimeout(function () {
            $(".countdownTime").text("1");
        }, 7000);
        setTimeout(function () {
            $(".countdownTime").text("");
            $(".ready").text("Fight!");
        }, 8000);

        setTimeout(function () {
            $(".ready").text("Fight!!");
        }, 9000);

        setTimeout(function () {
            $(".ready").text("Fight!!!");
        }, 10000);

        setTimeout(function () {
            $(".ready").text("");
        }, 12000);
    }

    //Annyang code
    if (annyang) {
        let commands = {
            "let me play the damn game": genCharacters,
            "attack": gamePlay,
            "chicken": characterCheck,
            "cat": characterCheck,
            "creeper": characterCheck,
            "billy": characterCheck,
            "school": characterCheck,
            "reset": reset

        }

        annyang.addCommands(commands);
        annyang.start({
            autoRestart: true
        });
    }

});




