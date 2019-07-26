$(document).ready(function () {

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
                console.log(response);

                let results = response.data;
                let stillUrl = results.images.fixed_height_still.url;
                let animateUrl = results.images.fixed_height.url;

                let charTemplate = `
            <div class="card m-1 border border-dark" style="width: 18rem; height: 24rem;" data-id="${btnThing}">
                <img src="${stillUrl}" class="card-img-top portrait border border-dark" data-animate="${animateUrl}" data-still="${stillUrl}" data-state="still" alt="placeholder">
                <div class="card-body">
                    <h5 class="card-title text-center py-1">${charName}</h5>
                </div>
                <ul class="list-group list-group-flush ">
                    <li class="list-group-item text-center py-1">HP: ${hpVal} Attack: ${attVal}</li>
                </ul>
                <div class="card-body">
                    <a href="#" class="card-link py-1" id="attack" data-id="${btnThing}">Attack Button</a>
                    <a href="#" class="card-link py-1" id="taunt" data-id="${btnThing}">Taunt Button</a>
                </div>
            </div>
            `
                $("#characterPortrait").append(charTemplate);
            }
        });
    }
});