$(document).ready(function(){

  {
      const chanelURL =`https://www.youtube.com/channel/${youtube_userName}/videos`;
      $('#yt-btn').append(
        $('<a class="btn-content">Youtubeへ</a>')
        .attr('href',chanelURL)
        .attr('target', '_blank'));
  }

  {
    const instaMypageURL =`https://www.instagram.com/${instagram_userName}`;
    $('#inst-btn').append(
      $('<a class="btn-content">Instagramへ</a>')
      .attr('href',instaMypageURL)
      .attr('target', '_blank'));
  }

  $('#copyRight').append(copyRight);

  let youtubeURL ='https://www.googleapis.com/youtube/v3/search';
  let instaURL = 'https://api.instagram.com/v1/users/self/media/recent';


  const getYoutubeData = function(url){
    $.ajax({
      url: url,
      dataType: 'jsonp',
      data: {
        part: 'id',
        channelId:youtube_userName,
        order: 'date',
        maxResults: 3,
        key: youtube_APIkey,
      }
    })

    .done(function(data){
      const youtubeImgData = data;
      // console.dir(youtubeImgData);

      $(youtubeImgData.items).each(function(){

        const videoName = this.id.videoId;
        const iframeText  = `https://www.youtube.com/embed/${videoName}`
        $('#movie').append(
          $('<div class="mov_block"></div>').append(
            $('<iframe width="640px" height="360px" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>')
            .attr('src',iframeText)
          )
        );
      });
    })

    .fail(function(data){
      console.log('youtube_failed');
    })
  }


  const getInstaData = function(url){
    $.ajax({
      url: url,
      dataType: 'jsonp',
      data: {
        access_token:insta_accesstoken,
        count: 9
      }
    })

    .done(function(data){
      const instaImgData = data;
      // console.dir(instaImgData);

      $(instaImgData.data).each(function(){

        $('#gallery').append(
          $('<div class="img_block"></div>').append(
            $('<img>').attr('src',this.images.low_resolution.url)
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
