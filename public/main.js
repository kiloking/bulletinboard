$(document).ready(function() {

  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

  });
});

$(function(){
  var $svg = $('.like')
  var $postsList = $('.postsList')
  var $body = $('body')
  var devcategoriesURL = 'http://localhost:3001/api/categories'
  var devpostsURL = 'http://localhost:3001/api/posts'

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
    // const response = await fetch(devcategoriesURL+'/'+ dataId)
    // const json = await response.json();
    // console.log(json)
    // return json.title
    // let newdata;
    // return  fetch(devcategoriesURL+'/'+ dataId)
    // .then(response =>{
    //   return response.json();
    // })
    // .then(data => {
    //   newdata= data
    //   return newdata})
    // .catch(err => console.log(err))
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
        <div class="link">
          <h4>${title}</h4>
          <div class="content">
          ${content}
          </div>
          <div class="info">
            <div class="has-text-weight-bold">${author}</div>
            <div class="has-text-grey	">${date.substr(0,10)}</div>
            <div class="tag" style="background-color:${cateText.backgroundcolor}; color:${cateText.fontcolor}">${cateText.title}</div>
          </div>
        </div>
        <button class="like">
          <i class="fas fa-eye"></i>
          <div>${views}</div>
        </button>
      </div>
    `
    $Li.append(cardhtml)
    $postsList.append($Li)

    $Li.click(event =>{
      getSinglePost(_id)
    })
  }
  function getSinglePost(_id){
    fetch(devpostsURL+'/'+ _id)
    .then(response =>{
      return response.json();
    })
    .then(data => {
      // console.log(data)
      createLightBox(data)
    })
    .catch(err => console.log(err))
  }
  function createLightBox(data){
    const {title,content, category,author,date} = data
    let cateText = getCategoriesData(category)
    var $light = $('<div></div>').addClass('lightbox')
    $light.css('display', 'flex')

    var $bg = $('<div></div>').addClass('lightboxbg')

    var lightboxContent =`
      <div class="lightbox-content">
        <div class="mainTitle">
          <h4>${title}</h4>
          <div class="info">
            <div class="has-text-weight-bold">${author}</div> 
            <div class="has-text-grey	">${date}</div>
            <div class="tag" style="background-color:${cateText.backgroundcolor}; color:${cateText.fontcolor}">${cateText.title}</div>
          </div>
        </div>
        <div class="content">
          <div class="mainContent">
            ${content}
          </div>

          
        </div>
      </div>
    `
    $light.append($bg)

    $light.append(lightboxContent)
    $body.append($light)


    $bg.click(e=>{
      $light.remove()
    })
  }




})