var pokemons = ["Pikachu", "Squirtle", "Bulbasaur", "Charmander", "Pidgey", "Rattata", "Ekans", "Jigglypuff", "Eevee", "Snorlax"];

function pokemonButtons() {
    $('#buttons').empty();
    for(var i = 0; i < pokemons.length; i++) {
        var a = $('<button>')
        a.addClass('pokemon');
        a.attr('data-name', pokemons[i]);
        a.text(pokemons[i]);
        $('#buttons').append(a);
    }
}
  
$("#addPokemon").on("click", function() {
    var pokemon = $("#pokemon-input").val().trim();
    pokemons.push(pokemon);
    pokemonButtons();
    return false;
})

function displayGifs() {
    var pokemon = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?=" + pokemon + "&api_key=9Tzq7TnG9N5kCxDVQ9o0FjCjCin7mwR7F&limit=10";
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
            $("#gifsView").prepend(gifDiv);
        }
    });

    $(document).on('click', '.gif', function() {
        var state = $(this).attr('data-state');
        if(state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }
        else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });

    $(document).on("click", ".pokemon", displayGifs);
    pokemonButtons();
}
