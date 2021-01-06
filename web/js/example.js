// Mouette.Logger.setLevel("info");
var data = {
  firstname: "Galileo",
  lastname: "Galilei",
  born: 1564,
  died: 1642
};

Aias.HTTP.setHeaders("GET", {
  "Content-Type": "application/x-www-form-urlencoded"
});
// var request = Aias.HTTP.promise.get("http://httpbin.org/get", "json")
//   .then(function(response) {
//     console.log("get", response);
//     //console.log("get2", response.firstname);
//   })
//   .catch(function(err) {
//     console.log("error", err.message);
//   });

// var request = Aias.HTTP.promise.post("http://httpbin.org/post", "json", data)
//   .then(function(response) {
//     console.log("post", response);
//   })
//   .catch(function(err) {
//     console.log("error", err.message);
//   });

var request = Aias.HTTP.observable.get("http://httpbin.org/get", "json", {"Content-Type":undefined}).subscribe(
  function(response) {
    console.log("observable", response);
  },
  function(err) {
    console.log("HTTP Error", err);
  }
);


// var request = Aias.HTTP.promise.connect("http://httpbin.org/get", "json")
//   .then(function(response) {
//     console.log("connect", response);
//     //console.log("get2", response.firstname);
//   })
//   .catch(function(err) {
//     console.log("error", err.message);
//   });

//   var request = Aias.HTTP.promise.options("http://httpbin.org/get", "json")
//   .then(function(response) {
//     console.log("options", response);
//     //console.log("get2", response.firstname);
//   })
//   .catch(function(err) {
//     console.log("error", err.message);
//   });

//   var request = Aias.HTTP.promise.trace("http://httpbin.org/get", "json")
//   .then(function(response) {
//     console.log("trace", response);
//     //console.log("get2", response.firstname);
//   })
//   .catch(function(err) {
//     console.log("error", err.message);
//   });
