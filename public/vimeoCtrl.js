$(function(){
  var vimeoUsername = 'https://vimeo.com/api/v2/27215381/videos.json';
  var videoNumber =0

  $.ajax({
    url:vimeoUsername,
    error:function(){return},
    success:function(response){
      playVideo(response)
    }
  })

  function playVideo(data){
    console.log(data)
    var options = {
      id: data[0].id,
      autoplay:true,

  };
    var player = new Vimeo.Player('embed', options);
    player.setVolume(0);
 
    player.on('ended', function() {
      console.log('ended')
      videoNumber++
      if(videoNumber == 20){
        videoNumber=0
      }
      player.loadVideo(data[videoNumber].id)
    });
  }

})