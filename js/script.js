$(document).ready(function(){
  var baseURL = 'https://api.instagram.com/v1/users/self/media/recent';
  var imgData;

  var getData = function(url){
    $.ajax({
      url: url,
      dataType: 'jsonp',
      data: {
        access_token:'',
        count: 12
      }
    })

    .done(function(data){
      imgData = data;
      console.dir(imgData);
    })
    .fail(function(data){
      $('#gallery').text(textStatus);
    })
  }
  getData(baseURL);
});
