Mouette.Logger.setLevel("info");

var data = {
  firstname: "Galileo",
  lastname: "Galilei",
  born: 1564,
  died: 1642
};

// Aias.HTTP.setMockup({ data: data });

var request = Aias.HTTP.GET("http://httpbin.org/get", "json")
  .then(function(response) {
    console.log("get", response);
    //console.log("get2", response.firstname);
  })
  .catch(function(err) {
    console.log("error", err.message);
  });

var request = Aias.HTTP.POST("http://httpbin.org/post", "json", data)
  .then(function(response) {
    console.log("post", response);
  })
  .catch(function(err) {
    console.log("error", err.message);
  });

Aias.HTTP.setEventType("observable");

var request = Aias.HTTP.GET("http://httpbin.org/get", "json").subscribe(
  function(response) {
    console.log("observable", response);
  },
  function(err) {
    console.log("HTTP Error", err);
  }
);
