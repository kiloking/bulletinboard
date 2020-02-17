var apiEndpoint = 'https://vimeo.com/api/v2/';
var oEmbedEndpoint = 'https://vimeo.com/api/oembed.json';
var oEmbedCallback = 'switchVideo';
var videosCallback = 'setupGallery';
var vimeoUsername = '27215381';

var videosArray =[]
var videoNumber =0

// 拿影片ID 變列表
// Get the user's videos
$(document).ready(function() {
  $.getScript(apiEndpoint + vimeoUsername + '/videos.json?callback=' + videosCallback);
  console.log(apiEndpoint + vimeoUsername + '/videos.json?callback=' + videosCallback)
});

function getVideo(url) {
  $.getScript(oEmbedEndpoint + '?url=' + url + '&width=504&height=280&callback=' + oEmbedCallback);
  
  console.log(videoNumber)
}

function setupGallery(videos) {
  // Set the user's thumbnail and the page title
  console.log(videos)
  videosArray = videos
  
  $('#stats').prepend('<img id="portrait" src="' + videos[0].user_portrait_medium + '" />');
  $('#stats h2').text(videos[0].user_name + "'s Videos");
  // Load the first video
  getVideo(videos[0].url);
  // Add the videos to the gallery
  for (var i = 0; i < videos.length; i++) {
    var html = '<li><a href="' + videos[i].url + '"><img src="' + videos[i].thumbnail_medium + '" class="thumb" />';
    html += '<p>' + videos[i].title + '</p></a></li>';
    $('#thumbs ul').append(html);
    // videosArray.push(videos[i].id)
  }
  console.log(videosArray)
  // Switch to the video when a thumbnail is clicked
  $('#thumbs a').click(function(event) {
    event.preventDefault();
    getVideo(this.href);
    return false;
  });
}
function switchVideo(video) {
  console.log(video)
  $('#embed').html('<iframe id="player1" src="https://player.vimeo.com/video/'+video.video_id+'?&autoplay=1" width="504" height="280" frameborder="0" allow="autoplay; fullscreen" allowfullscreen title="MoonShine Matte Painting"></iframe>');

  var iframe = $('#player1')[0];
	var player = new Vimeo.Player(iframe);
  var status = $('.stats');
  
  console.log(videoNumber)
  player.on('ended', function() {
    status.text('ended');
    console.log('ended')
    videoNumber++
    if(videoNumber == 21){
      videoNumber=0
    }
    // switchVideo(videosArray[videoNumber])
    getVideo(videosArray[videoNumber].url);
    
	});

	player.on('timeupdate', function(data) {
    status.text(data.seconds + 's played');
    // console.log(data.seconds + 's played')
  });
  

}
