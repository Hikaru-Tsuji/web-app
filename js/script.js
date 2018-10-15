$(document).ready(function(){

  var youtubeURL ='https://www.googleapis.com/youtube/v3/search';
  var youtubeImgData;

  var instaURL = 'https://api.instagram.com/v1/users/self/media/recent';
  var instaImgData;

  var getYoutubeData = function(url){
    $.ajax({
      url: url,
      dataType: 'jsonp',
      data: {
        part: 'id',
        channelId:youtube_userName,
        order: 'date',
        key: youtube_APIkey,
      }
    })

    .done(function(data){
      youtubeImgData = data;
      console.dir(youtubeImgData);


    })

    .fail(function(data){
      console.log('youtube_failed');
    })
  }

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
      instaImgData = data;
      console.dir(instaImgData);

      $(instaImgData.data).each(function(){
        var caption ='';
        if(this.caption){
          caption = this.caption.text;
        }
        $('#gallery').append(
          $('<div class="img_block"></div>').append(
            $('<a></a>')
            .attr('href', this.link)
            .attr('target', '_blank').append(
              $('<img>').attr('src',this.images.low_resolution.url)
            )
          )
        );
      });
    })

    .fail(function(data){
      console.log('instagram_failed');
    })
  }

  getYoutubeData(youtubeURL);
  getInstaData(instaURL);

});
