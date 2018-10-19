$(document).ready(function(){

  const YOUTUBE_SEARCH_API_URL ='https://www.googleapis.com/youtube/v3/search';
  const INSTAGRAM_RECENT_API_URL = 'https://api.instagram.com/v1/users/self/media/recent';
  const YOUTUBE_CHANNEL_ID = 'UCifqUptiSNtp1u8ma9LryGA';

  const getYoutubeData = (_channelId,_maxResults) =>{
    $.ajax({
      url: YOUTUBE_SEARCH_API_URL,
      dataType: 'json',
      data: {
        part: 'id',
        channelId: _channelId,
        order: 'date',
        maxResults: _maxResults,
        key: YOUTUBE_API_KEY,
      }
    })
    .done((data) =>{
      const youtubeImgData = data;
      const $movie = $('#movie');
      let iframeHTML = '';
      for( let i = 0, len = youtubeImgData.items.length; i < len; i++ ){
        const item = youtubeImgData.items[i];
        const videoId = item.id.videoId;
        iframeHTML += `
        <div class="mov_block">
        <iframe
        width="640"
        height="360"
        src="https://www.youtube.com/embed/${videoId}?rel=0"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        ></iframe>
      </div>
      `;
      }
      $movie.append(iframeHTML);
    })
    .fail((error) =>{
      console.error(error);
    });
  }

  const getInstaData = (_count) =>{
    $.ajax({
      url: INSTAGRAM_RECENT_API_URL,
      dataType: 'json',
      data: {
        access_token:INSTAGRAM_ACCESSTOKEN,
        count: _count
      }
    })
    .done((data)=>{
      const instaImgData = data;
      const $gallery = $('#gallery');
      let imgHTML = '';
      for( let i = 0, len = instaImgData.data.length; i < len; i++ ){
        const data = instaImgData.data[i];
        const instImg = data.images.low_resolution.url;
        imgHTML +=`
        <div class="img_block">
        <img src=${instImg}>
        </div>
        `;
      }
      $gallery.append(imgHTML);
    })
    .fail((error) => {
      console.error(error);
    });
  }
  getYoutubeData(YOUTUBE_CHANNEL_ID, 3);
  getInstaData(9);
});
