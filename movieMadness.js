// $(document).ready(function() {
// This is initial array of movie buttons
  const movies = [
    "Indiana Jones", "The Matrix", "Star Wars", "Ghostbusters", "Back To The Future", "Jaws",
    "ET", "When Harry Met Sally", "Ferris Bueller", "Office Space", "This Is Spinal Tap"
  ];

  // button for the initial movies
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (let i = 0; i < arrayToUse.length; i++) {
      const a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }

  }

  $(document).on("click", ".movie-button", function() {
    $("#movies").empty();
    $(".movie-button").removeClass("active");
    $(this).addClass("active");

    // query to the giphy api with my key
    const type = $(this).attr("data-type");
    const queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=d7Pf3ibuLWucX4bRsYocNzWRSxO502eR&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        const results = response.data;

        for (let i = 0; i < results.length; i++) {
          const movieDiv = $("<div class=\"movie-item\">");

          const rating = results[i].rating;

          const p = $("<p>").text("Rating: " + rating);

          const animated = results[i].images.fixed_height.url;
          const still = results[i].images.fixed_height_still.url;

          const movieImage = $("<img>");
          movieImage.attr("src", still);
          movieImage.attr("data-still", still);
          movieImage.attr("data-animate", animated);
          movieImage.attr("data-state", "still");
          movieImage.addClass("movie-image");

          movieDiv.append(p);
          movieDiv.append(movieImage);

          $("#movies").append(movieDiv);
        }
      });
  });

  $(document).on("click", ".movie-image", function() {

    const state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-movie").on("click", function(event) {
    event.preventDefault();
    const newMovie = $("input").eq(0).val();

    if (newMovie.length > 2) {
      movies.push(newMovie);
    }

    populateButtons(movies, "movie-button", "#movie-buttons");

  });

  populateButtons(movies, "movie-button", "#movie-buttons");
// });
