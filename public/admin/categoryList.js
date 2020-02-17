import {devcategoriesURL ,devpostsURL} from '../apiurl.js';
$(function(){
  var $svg = $('.like')
  var $postsList = $('.postsList')
  var $body = $('body')
  // var devcategoriesURL = 'http://192.168.1.137:3001/api/categories'
  // var devpostsURL = 'http://192.168.1.137:3001/api/posts'

  async function getPostsData(){
    const response = await fetch(devcategoriesURL)
    const data = await response.json()
    console.log(data)
    data.forEach((element,i) => {
      // console.log(element.category)
      createPostItem(element)
    });
  }
  getPostsData()


  function createPostItem(element){
    const {_id,title,backgroundcolor,fontcolor} = element
    var $delBtn= $('<button></button>').addClass('delbtn').html('暫時不給刪除')
    var $editBtn= $('<button></button>').addClass('editbtn').html('修改')
    var $Li = $('<li></li>')
    $Li.attr('data-id' , _id)
    var cardhtml =`
      <div class="item" >
          <ul>
            <li><span>分類名稱:</span>${title} </li>
            <li><span>背景顏色:</span>${backgroundcolor}  <span class="cube" style="background:${backgroundcolor}"></span></li>
            <li><span>字體顏色:</span>${fontcolor} <span class="cube" style="background:${fontcolor}"></span></li>
          </ul>
      </div>
    `

    $Li.append(cardhtml)
    $Li.children().append($delBtn)
    $Li.children().append($editBtn)
    $postsList.append($Li)

    $delBtn.click(event=>{
      var base = this;
      console.log($(event.target).parent().parent())
      var msg = "確定要刪除嗎？\n\n請確認！";
      if (confirm(msg)==true){

        // fetch(devcategoriesURL+'/'+_id, {
        //   method: 'DELETE',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        // }).then((response) => {
        //     return response.json();
        //   }).then((jsonData) => {

        //   }).catch((err) => {
        //     console.log('錯誤:', err);
        // })
        // $(event.target).parent().parent().remove()
      return true;
      }else{
      return false;
      }

    })
    $editBtn.click(e=>{
      window.location.href = "/admin/edit_category.html?id=" + _id;

    })

  }






})