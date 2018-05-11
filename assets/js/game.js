// Create an array of quotes
var quotes = ["Frankly, my dear, I don't give a damn", "Go ahead, make my day", "May the Force be with you", "You talkin' to me?", "I'm (the) king of the world!", "Bond. James Bond", "Show me the money!", "You can't handle the truth!", "I'll be back", "We'll always have Paris", "I see dead people", "It's alive! It's alive!", "Houston, we have a problem", "There's no crying in baseball!", "Say 'hello' to my little friend!"];

// Creates buttons
function makeButtons(){ 
	$('#buttonsView').empty();
	for (var i = 0; i < quotes.length; i++){
		var a = $('<button>') 
		a.addClass('quote');
		a.attr('data-name', quotes[i]);
		a.text(quotes[i]);
		$('#buttonsView').append(a);
	}
}

// Handles addQuote button event
$("#addQuote").on("click", function(){

	var quote = $("#quote-input").val().trim();
	quotes.push(quote);
	makeButtons();
	return false; 
})

// Function to display gifs
function displayGifs(){
	var quote = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + quote + "&limit=9&api_key=dc6zaTOxFJmzC";

		$.ajax({url: queryURL, method: "GET"}).done(function (response) {
			console.log(response.data);
			var results = response.data;
			for (var i = 0; i < results.length; i++) {
				var gifDiv = $('<div class=gifs>');
				var quoteGif = $('<img>');
					quoteGif.attr('src', results[i].images.fixed_height.url);
					quoteGif.attr('title', "Rating: " + results[i].rating);
					quoteGif.attr('data-running', results[i].images.fixed_height.url);
					quoteGif.attr('data-state', 'running');
					quoteGif.addClass('gif');
					quoteGif.attr('data-animate', results[i].images.fixed_height_still.url);
				gifDiv.append(quoteGif)

				$("#gifsView").prepend(gifDiv);
			}
			
		});
}

// Function for pausing gifs
$(document).on('click', '.gif', function(){
	var state = $(this).attr('data-state');
		if ( state == 'running'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('running'));
                $(this).attr('data-state', 'running');
            };
});



// Function for displaying quote gifs
$(document).on("click", ".quote", displayGifs);

// Calls the makeButtons function
makeButtons();