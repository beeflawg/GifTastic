var movies = ["dog", "cat", "whale", "rabbit"];

            // displayMovieInfo function re-renders the HTML to display the appropriate content
            function displayMovieInfo() {

                var movie = $(this).attr("data-name");
                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=LQ5V2s6Zm92XYwAgjOznLnOZVxroZGlB&limit=10";

                // apikey = LQ5V2s6Zm92XYwAgjOznLnOZVxroZGlB

                // Creating an AJAX call for the specific movie button being clicked
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    console.log(response);
                    var results = response.data;

                    // Looping over every result item
                    for (var i = 0; i < results.length; i++) {

                        // Only taking action if the photo has an appropriate rating
                        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                            // Creating a div for the gif
                            var gifDiv = $("<div>");

                            // Storing the result item's rating
                            var rating = results[i].rating;

                            // Creating a paragraph tag with the result item's rating
                            var p = $("<p>").text("Rating: " + rating);

                            // Creating an image tag
                            var personImage = $("<img>");

                            // Giving the image tag an src attribute of a proprty pulled off the
                            // result item
                            personImage.attr("src", results[i].images.fixed_height_still.url);

                            // Appending the paragraph and personImage we created to the "gifDiv" div we created
                            gifDiv.append(p);
                            gifDiv.append(personImage);

                            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                            $("#movies-view").prepend(gifDiv);
                        }
                    }
                });

            }

            // Function for displaying movie data
            function renderButtons() {

                // Deleting the movies prior to adding new movies
                // (this is necessary otherwise you will have repeat buttons)
                $("#buttons-view").empty();

                // Looping through the array of movies
                for (var i = 0; i < movies.length; i++) {

                    // Then dynamicaly generating buttons for each movie in the array
                    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
                    var a = $("<button>");
                    // Adding a class of movie-btn to our button
                    a.addClass("movie-btn");
                    // Adding a data-attribute
                    a.attr("data-name", movies[i]);
                    // Providing the initial button text
                    a.text(movies[i]);
                    // Adding the button to the buttons-view div
                    $("#buttons-view").append(a);
                }
            }

            // This function handles events where a movie button is clicked
            $("#add-movie").on("click", function (event) {
                event.preventDefault();
                // This line grabs the input from the textbox
                var movie = $("#movie-input").val().trim();

                // Adding movie from the textbox to our array
                movies.push(movie);

                // Calling renderButtons which handles the processing of our movie array
                renderButtons();
            });

            // Adding a click event listener to all elements with a class of "movie-btn"
            $(document).on("click", ".movie-btn", displayMovieInfo);

            // Calling the renderButtons function to display the intial buttons
            renderButtons();