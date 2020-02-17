$(document).ready(function() {

  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

  });
});
import {devcategoriesURL ,devpostsURL} from './apiurl.js';
$(function(){
  var $svg = $('.like')
  var $postsList = $('.postsList')
  var $body = $('body')
  // var devcategoriesURL = 'http://192.168.1.137:3001/api/categories'
  // var devpostsURL = 'http://192.168.1.137:3001/api/posts'

  async function getPostsData(){
    const response = await fetch(devpostsURL)
    const data = await response.json()
    console.log(data)
    data.forEach((element,i) => {
      // console.log(element.category)
      createPostItem(element)


    });
  }
  function getCategoriesData (dataId)  {
    let newdata;
    $.ajax({
      url:devcategoriesURL+'/'+ dataId,
      async:false,
      beforSend:function(){

      },
      error:function(){
        console.log('error')
      },
      success:function(response){
        newdata = response

      }
    })
    return newdata


  }
  getPostsData()


  function createPostItem(element){

    const {_id,title,content,category,author,date,views} = element
    let cateText = getCategoriesData(category)

    var $Li = $('<li></li>')
    $Li.attr('data-id' , _id)

    var cardhtml =`
      <div class="item" >

          <h4>[${cateText.title}] ${title}</h4>
          <div class="info">
            <div class="has-text-weight-bold">${author}</div>
            <div class="has-text-grey	">${date.substr(0,10)}</div>
          </div>

      </div>
    `
    $Li.append(cardhtml)
    $postsList.append($Li)


  }
  
  var myVar = setInterval(refreshNews, 60000);
  function refreshNews(){
    $postsList.empty()
    console.log('青空')
    getPostsData()
  }



})