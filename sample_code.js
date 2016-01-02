// ombd api documentation is available here:
// http://www.omdbapi.com/

/**
 * app.getMovieById
 * @param id    - omdb id of the movie you're searching for
 */
app.getMovieById = function getMovieById(id) {

  console.log("app.getMovieById() has been called. nothing happens. wait.. some tumbleweeds are tumbling by! an ID of '" + id + "' was entered.");
  console.log(id);
  $.ajax({
    type:'get',
    url:'http://www.omdbapi.com/?i='+id+'&plot=full&r=json',
    success:function(data){
      console.log(data);
      console.log(data.Title,data.Plot);
      var movie = new app.MovieModel(data);
      var view = new app.MovieView(data);
      view.render();
      console.log(movie.Title);
    },
    error: function(err){
      console.log(err);
    }
  });//end ajax call



  // request URL for omdb's id search
  // http://www.omdbapi.com/?i=tt0095016&plot=full&r=json

  // 1. create your ajax request and then in your success method.

  // 2. you should create a new MovieModel object based on the returned
  // result.

  // var movie = new app.MovieModel(data);
  // 3. you should create a new MovieView object based on movie model
  // 4. you call render() on the view
  // 5. your render() should append the `$el` to the DOM

}

/**
 * app.getMovieByTitle
 * @param title     - title of the movie you're searching for
 */
app.getMovieByTitle = function getMovieByTitle(title) {

  console.log("app.getMovieByTitle() has been called. the form stares at you blankly. wait, what? A title of '" + title + "' was entered");

  // request URL for omdb's title search:
  //http://www.omdbapi.com/?t=Die+Hard&y=1988&plot=full&r=json

  // 1. create your ajax request and then in your success method.
  $.ajax({
    type:'get',
    url:'http://www.omdbapi.com/?t='+title+'&y=&plot=full&r=json',
    success:function(data){
      console.log(data);
      console.log(data.imdbID);
      $('#movie-listing').append("<img src='http://img.omdbapi.com/?i='+data.imdbID+'&apikey=d31f1a94 ' alt=data.title");
      // 2. you should create a new MovieModel object based on the returned
      // result.
      var movie = new app.MovieModel(data);
      var view = new app.MovieView(movie);
      view.render();


      console.log(data);
      console.log(view.Title);
      console.log(movie.imdbRating);

        // 3. you should create a new MovieView object based on movie model

    },// end of success();
    error:function(err){
      console.log(err);
    }
  });



  // 4. you call render() on the view
  // 5. your render() should append the `$el` to the DOM


}


/**
 * app.MovieModel
 * movie model constructor
 * @param options  - options object
 */
app.MovieModel = function MovieModel(options) {

  // id, title, rating, director, plot, year, genre should all be in the `options` object
  // store all the information in the model

  this.Title=options.Title;
  this.Year=options.Year;
  this.Rated=options.Rated;
  this.Released=options.Released;
  this.Genre=options.Genre;
  this.Plot=options.Plot;
  this.Poster=options.Poster;
  this.Director=options.Director;
  this.Year=options.Year;
  this.imdbRating=options.imdbRating;
  this.imdbID=options.imdbID;

}

/**
 * app.MovieView
 * movie view constructor
 * @param options  - options object
 */
app.MovieView = function MovieView(options) {
  this.imdbID=options.imdbID;
  this.Title=options.Title;
  this.imdbRating=options.imdbRating;
  this.Director=options.Director;
  this.Plot=options.Plot;
  this.Year=options.Year;
  this.Genre=options.Genre;
  this.Poster=options.Poster;

  // options should contain the `model` for which the view is using
  this.render=function(){
    //non-bonus output
    // var div = $('<div class="movie"><h3>'+this.Title+'</h3><p><strong>Released:</strong>'+this.Year+'<br><strong>Directed By:</strong>'+this.Director+'<br><em>'+this.Genre+'</em></p><p>'+this.Plot+'</p></div>');

    var div = $('<div class="movie"><table><tr><td><img src="'+this.Poster+'" alt="'+this.Title+'""></td><td><h3>'+this.Title+'</h3><p><strong>Released:</strong>'+this.Year+'<br><strong>Directed By:</strong>'+this.Director+'<br><em>'+this.Genre+'</em></p><p>'+this.Plot+'</p></td></tr></table></div>');

    $('#movie-listing').append(div);

  }
  // 1. create a view
  // 2. create a render() method
  // 3. render() should a div with a class of '.movie' via string concatenation
  //    you will want to add the id, title, imdbrating, director, plot, year,
  //    and genre. See design/movielayout.html
  // 4. finally, render() will $(selector).append() each new '.movie' to "#movie-listing".

}
