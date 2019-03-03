window.onload = function() {
  currentYear();
};

function currentYear(){
  const date = new Date();
  const autoDate = document.querySelector('#autoDate');
  autoDate.textContent = date.getFullYear();
};
function pagetop(){
  width = "100%";
}
var feed = new Instafeed({
  get: 'user',
  userId: '11180810277', //the id and access token i was given when setting up a developer account for instagram
  accessToken: '11180810277.fbcd7ac.8ac285facbea465592e9826cafbc9d03',
  limit: 3,
  resolution:'standard_resolution',
  filter: function(image) {
  var MAX_LENGTH = 40;

  // here we create a property called "short_caption"
  // on the image object, using the original caption
  if (image.caption && image.caption.text) {
    image.short_caption = image.caption.text.slice(0,30, MAX_LENGTH); //displays characters of the captions 0 to 30
  } else {
    image.short_caption = "";
  }

  // ensure the filter doesn't reject any images
  return true;
},
  template: '<div class="col-4"><img class="w-100" src={{image}}><hr><i<br></i><br><p>{{model.short_caption}}...<a href="{{link}}" target="_blank">Read More</a></p></div>'
});
feed.run();
