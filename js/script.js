$(document).ready(function(){
  var instaURL = 'https://api.instagram.com/v1/users/self/media/recent';
  var imgData;

  var getInstaData = function(url){
    $.ajax({
      url: url,
      dataType: 'jsonp',
      data: {
        access_token:insta_accesstoken,
        count: 12
      }
    })

    .done(function(data){
      imgData = data;
      console.dir(imgData);

      $(imgData.data).each(function(){

        var caption ='';
        if(this.caption){
          caption = this.caption.text;
        }

        $('#gallery').append(
          $('<div class="img_block"></div>')
          // .append(
          //   $('<a></a>')
          //   .attr('href', this.link)
            // .attr('target', '_blank')
            .append(
              $('<img>').attr('src',this.images.low_resolution.url)
            )
          // )

        );

      });
    })
    .fail(function(data){
      $('#gallery').text(textStatus);
    })
  }
  getInstaData(instaURL);

});
