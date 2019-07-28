$(document).ready(function () {



    let sassyChicken = { name: "Sassy Chicken", health: 90, attack: 15, image: "ftqLysT45BJMagKFuk" };
    let dramaCat = { name: "Drama Cat", health: 100, attack: 10, image: "ZyiSGjEVsLnB0SGkgN" };
    let creepachu = { name: "Creepachu", health: 110, attack: 15, image: "U2nN0ridM4lXy" };
    let trippingBilly = { name: "Tripping Billy", health: 90, attack: 10, image: "7zF3biR7j50eQ" };
    let meInMiddleSchool = { name: "Me in Middle School", health: 100, attack: 15, image: "YPEpEDDFs7sEU" };

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


    genCharacters = () => {
        annyang.pause();

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
                            <div class="card m-1 ${characters[k].name}" style="width: 18rem;" data-attack-power="${characters[k].attack}" data-health-power="${characters[k].health}">
                                <img src="${stillUrl}" class="card-img-top portrait" data-animate="${animateUrl}" data-still="${stillUrl}" data-id="${characters[k].name}" 
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




        // chooseYourCharacter = () => {
        $(document).on("click", ".card", function () {

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
                $("#directions").text("Choose your first opponent");
            } else if (giphyChosen === true && enemyChosen === false) {
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

                const loadCanvas = `
                    <canvas id="myCanvas" width="1500" height="800"></canvas>
                    `
                $("#combatZone").append(loadCanvas);
                backgroundAnimation();
                gameCountdown();
            }
        });
    }

    chooseSassyChicken = () => {

        if ($(".portrait").attr("data-id") === "Sassy Chicken") {
            console.log("bleh");
            $(".sassyChicken").trigger("click");
        }

    }

    //this will reset the game
    reset = () => {
        sassyChicken = { name: "Sassy Chicken", health: 90, attack: 15, image: "ftqLysT45BJMagKFuk" };
        dramaCat = { name: "Drama Cat", health: 100, attack: 10, image: "ZyiSGjEVsLnB0SGkgN" };
        creepachu = { name: "Creepachu", health: 110, attack: 15, image: "U2nN0ridM4lXy" };
        trippingBilly = { name: "Tripping Billy", health: 90, attack: 10, image: "7zF3biR7j50eQ" };
        meInMiddleSchool = { name: "Me in Middle School", health: 100, attack: 15, image: "YPEpEDDFs7sEU" };

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

        $("#directions").empty();

        genCharacters();
    };

    gamePlay = () => {
        $("#directions").text("Destroy them")
        enemyHealth = enemyHealth - yourAttack;
        console.log(enemyHealth);
        $("#enemy-health").text("Enemy Health: " + enemyHealth);
        yourHealth = yourHealth - enemyAttack;
        $("#your-health").text("Your Health: " + yourHealth);
        if (enemyHealth <= 0) {
            enemiesLeft--;
            if (enemiesLeft === 0) {
                win();
            } else {
                $("#chosen-enemy").empty();
                console.log("enemies left: " + enemiesLeft);
                $("#your-health").text("Your Health: " + yourHealth);
                $("#characterPortrait").show();
                $("#you").hide();
                $("#fight-buttons").hide();
                enemyChosen = false;
                currentEnemy = false;
                nextRound();
            }
        }


    };

    nextRound = () => {

        if (enemiesLeft > 0 && yourHealth <= 0) {
            lose();
        }
        else {

            $("#directions").text("Choose your next oppponent");
            $(document).on("click", ".card", function () {
                $("#you").show();
                $("#fight-buttons").show();
                if (giphyChosen === true && enemyChosen === false) {
                    enemyChosen = true;
                    currentEnemy = true;
                    enemyAttack = $(this).attr("data-attack-power");
                    enemyHealth = $(this).attr("data-health-power");
                    console.log('the enemy health', enemyHealth);
                    console.log(enemyAttack, enemyHealth);
                    $("#chosen-enemy").append($(this));
                    $("#directions").text("Its time to fight!");
                    $("#characterPortrait").hide();

                    gamePlay();
                }

            });
        }
    }
    win = () => {
        $("#directions").text("You Win!");
        $("#chosen-character").empty();

        let resetButton = `
            <br>
            <button type="button" class="btn btn-primary" id="reset-button">Play Again</button>
            `
        $("#directions").append(resetButton);
        $(document).on("click", "#reset-button", function () {
            reset();
        });
    }

    lose = () => {
        $("#directions").text("You Lose!");

        let resetButton = `
            <button type="button" class="btn btn-primary" id="reset-button">Play Again</button>
            `
        $("#directions").append(resetButton);
        $(document).on("click", "#reset-button", function () {
            reset();
        });
    }

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
            "do the thing": chooseSassyChicken

        }

        annyang.addCommands(commands);
        annyang.start({
            autoRestart: true
        });
    }

});




