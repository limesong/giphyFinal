$(document).ready(function() {

  function encodeQueryData(data)
  {
    var ret = [];
    for (var d in data)
    ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
  }

  function httpGetAsync(theUrl, callback)
  {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
  }


  function getGif(query) {
    // console.log(query);
    var tempQuery = query;
    query = query.replace(' ', '+');
    var params = { 'api_key': apikey, 'q': query};
    params = encodeQueryData(params);

    // api from https://github.com/Giphy/GiphyAPI#search-endpoint

    httpGetAsync('http://api.giphy.com/v1/gifs/search?' + params, function(data) {

      var gifs = JSON.parse(data);

      var firstgif = gifs.data[0].images.fixed_width.url;
      /*var secondgif = gifs.data[1].images.fixed_width.url;
      var thirdgif = gifs.data[2].images.fixed_width.url;
      var fourthgif = gifs.data[3].images.fixed_width.url;
      var fifthgif = gifs.data[4].images.fixed_width.url;*/

      //img.src = ""
      //$("#image0").html("<img src='" + firstgif + "'>");
      /*$("#image1").html("<img src='" + secondgif + "'>");
      $("#image2").html("<img src='" + thirdgif + "'>");
      $("#image3").html("<img src='" + fourthgif + "'>");
      $("#image4").html("<img src='" + fifthgif + "'>");*/
      // console.log(firstgif);
      console.log(tempQuery);
      objectGifs.push({
        className: tempQuery,
        url: firstgif
      })
    });
  }


  $("#submitButton").on("click", function() {
    //  var query = $("#inputQuery").val();
    objectGifs = [];
    for (let i = 0; i < objects.length; i++) {
      getGif(objects[i].className);
    }

  });

  //$("inputquery" ).replaceWith( $( "classNames" ) );
});
