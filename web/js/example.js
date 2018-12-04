
// var toto = WEE.Ajax.call('assets/shaders/shader1.txt')
//                    .then(function (val) { console.log(val); })
//                    .catch(function (err) { console.log('error', err.message); });

// var exampleDiv = Wee.Dom.findById('exampleDiv');
// Wee.Dom.addHTMLElement(exampleDiv, 'p', {content: 'Ce paragraphe a été ajouté dynamiquement.', class: 'text-primary'});

// var request = Aias.HTTP.get("assets/shaders/shader1.txt")
//                        .then(function (val) { console.log(val); })
//                        .catch(function (err) { console.log('error', err.message); });

var data = {
  firstname:'Galileo',
  lastname:'Galilei',
  born:1564,
  died:1642
};

var request = Aias.HTTP.post("http://httpbin.org/post", data)
                      .then(function (val) { console.log(val); })
                      .catch(function (err) { console.log('error', err.message); });

