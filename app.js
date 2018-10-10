//Promise.all - Gets highest rated movie (Rotten Tomatoes) from OMDB API

function getBestMovie(...movies){
  const apiKey = 'Your OMDB API key';
  const baseUrl = `http://www.omdbapi.com/?apikey=${apiKey}&t=`,
        urls = movies.map( title => $.getJSON(baseUrl + title) );

  return Promise.all(urls)
    .then(formatRatings)
    .then(getHighestRating)
    .catch(err=>console.log(err));
}

function formatRatings(data){ 
 //Convert ratings to int
 //Create map with movie title and int rating
  const ratingsMap = new Map();
    data.forEach(function(movie){
      let formattedRatting = parseInt(movie.Ratings[1].Value.replace('%',''));
      ratingsMap.set(movie.Title, formattedRatting);
    });
  
 //New Map in ascending order
  const ratingsMapAsc = new Map([...ratingsMap.entries()].sort((a,b)=>b[1]-a[1]));  
  return ratingsMapAsc;
}

function getHighestRating(movieMap){
  //get map's first element
  const movie = movieMap.keys().next().value,
        rating = movieMap.values().next().value;
  console.log(`Highest rated movie is ${movie} with a rating of ${rating}% in the Tomatometer.`);
  };

//testing
getBestMovie('die hard', 'jumanji', 'blade runner', 'requiem for a dream');
