// ombd api documentation is available here:
// http://www.omdbapi.com/



// request URL for omdb's id search
// http://www.omdbapi.com/?i=tt0095016&plot=full&r=json
// this gets called by pre-written event handlers
app.getMovieById = function getMovieById(id) {

    console.log("app.getMovieById() called w/ ID of " + id);

}



// request URL for omdb's title search
// http://www.omdbapi.com/?i=tt0095016&plot=full&r=json
// this gets called by pre-written event handlers
app.getMovieByTitle = function getMovieByTitle(title) {

    console.log("getMovieByTitle() called w: " + title);

    // format title with +'s between words and create full ajax call url
    var newTitle = title.replace(/\s/g, '+');
    console.log("modified title: " + newTitle);
    var omdbCallByTitle =
        'http://www.omdbapi.com/?t=' + title + '&plot=full&r=json';
    console.log(omdbCallByTitle);

    $.ajax({
        type: 'get',
        url: omdbCallByTitle,
        success: function(data) {
        console.log('we got data from api!');
        console.table(data);

        // create new MovieModel object with data
        var movie = new app.MovieModel(data);
        console.log(movie);

        // create new MovieView passing data from model & render to page
        var view = new app.MovieView(movie);
        view.render();
        },

        error: function() {
        console.log('ajax call didn\'t work');
        }
    });
}



// MovieModel() is a constructor to store ajax call data in object
// does this object persist? Value added?
// id, title, rating, director, plot, year, genre should all be in
// the `options` object. store all the information in the model
app.MovieModel = function MovieModel(options) {

    this.id = options.imdbID;
    this.title = options.Title;
    this.poster = options.Poster;
    this.rating = options.Rated;
    this.director = options.Director;
    this.plot = options.Plot;
    this.year = options.Year;
    this.genre = options.Genre;

    console.log('model has data for: ' + this.title);

}



// MovieView()
// options should contain the `model` for which the view is using
// 1. create a view object
// 2. create a render() method ie this.render = function() {}
// 3. render() should a div with a class of '.movie' via string concatenation
//    you will want to add the id, title, rating, director, plot, year,
//    and genre. See design/movielayout.html
// 4. finally, render() will $(selector).append()
// each new '.movie' to "#movie-listing".
app.MovieView = function MovieView(options) {

    console.log('hello from MovieView()');

    // view object
    this.id = options.imdbID;
    this.title = options.title;
    this.poster = options.poster;
    this.rating = options.rating;
    this.director = options.director;
    this.plot = options.plot;
    this.year = options.year;
    this.genre = options.genre;

    console.log(this.title);

    this.render = function() {

        var viewHtml = '<div class="movie"><table><tr><td><img src="' + this.poster + '" alt="' + this.title + '"></td><td><h3>' + this.title + '</h3><p><strong>Released:</strong> ' + this.year + '<br><strong>Directed By:</strong> ' + this.director + '<br><em>' + this.genre + '</em></p><p>' + this.plot + '</p></td></tr></table></div>';

        // sample_code - no str error but ...
        // var viewHtml = $('<div class="movie">  <table> <tr><td><img src="'+this.Poster+'" alt="'+this.Title+'""></td><td><h3>'+this.Title+'</h3><p><strong>Released:</strong>'+this.Year+'<br><strong>Directed By:</strong>'+this.Director+'<br><em>'+this.Genre+'</em></p><p>'+this.Plot+'</p></td></tr></table></div>');

        $('#movie-listing').append(viewHtml);

    }
}
