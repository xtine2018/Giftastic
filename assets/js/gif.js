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
    makeButtons();
    return false;
})

$(document).on('click', 'button', function(){
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
            gifDiv.append(pokemonGif)
            $("#gifs").prepend(gifDiv);
        }
    });

    $(document).on('click', '.gif', function() {
        var state = $(this).attr('data-state');
        if(state === 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }
        else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
}
);})
