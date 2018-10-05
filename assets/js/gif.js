//pseudo code//
// create an array of pokemons that will correlate with buttons//
// the buttons will then populate 10 still gifs upon click//
//if the user selects a new button, 10 new gifs will prepend the previously generated gifs//
//only 10 gifs will be visible on the screen at a time//
//the 10 gifs will appear on the screen as a still image//
//upon click the gifs will animate//


$(document).ready(function () {
    var pokemons = ["Pikachu", "Squirtle", "Bulbasaur", "Charmander", "Pidgey", "Rattata", "Ekans", "Jigglypuff", "Eevee", "Snorlax"];
    
    function makeButtons() {
        $('#buttons').empty();
        for(var i = 0; i < pokemons.length; i++) {
            var button = $('<button>');
            button.addClass('pokemon');
            button.attr('data-name', pokemons[i]);
            button.text(pokemons[i]);
            $('#buttons').append(button);
        }
    }
    makeButtons();
    
    $("#addPokemon").on("click", function() {
        var pokemon = $("#pokemon-input").val().trim();
        pokemons.push(pokemon);
        $("#gifs").empty(); 
        makeButtons();
        return false;
    });
    
    $(document).on('click', 'button', function(){
        $("#gifs").empty(); 
        var pokemon = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=XXa3vkfF45jjJDFAgDVYJWRRoUMI9uSm&q=" + pokemon + "&limit=10";
        $.ajax({url: queryURL, method: "GET"}).done(function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $('<div class=gifs>');
                var pokemonGif = $('<img>');
                pokemonGif.attr('src', results[i].images.fixed_height_still.url);
                pokemonGif.attr('title', "Rating: " + results[i].rating);
                pokemonGif.attr('data-still', results[i].images.fixed_height_still.url);
                pokemonGif.attr('data-state', 'still');
                pokemonGif.addClass('gif');
                pokemonGif.attr('data-animate', results[i].images.fixed_height.url);
                gifDiv.append(pokemonGif);
                $("#gifs").prepend(gifDiv);
                console.log("animal image", gifDiv,"animal div", pokemonGif, "animal", pokemon);
            }
        });
    });
    
        $(document).on('click', '.gif', function() {
            var state = $(this).attr('data-state');
            if(state === 'still') {
                $(this).attr('src', $(this).attr('data-animate'));
                $(this).attr('data-state', 'animate');
            }
            else {
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state', 'still');
            }
        });
    });