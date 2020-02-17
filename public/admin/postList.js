import {devcategoriesURL ,devpostsURL} from '../apiurl.js';
$(function(){
  var $svg = $('.like')
  var $postsList = $('.postsList')
  var $body = $('body')
  var devcategoriesURL = 'http://192.168.1.137:3001/api/categories'
  var devpostsURL = 'http://192.168.1.137:3001/api/posts'

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
    var $delBtn= $('<button></button>').addClass('delbtn').html('刪除')
    var $editBtn= $('<button></button>').addClass('editbtn').html('編輯')
    var $Li = $('<li></li>')
    $Li.attr('data-id' , _id)
    var cardhtml =`
      <div class="item" >
          <ul>
            <li><span>標題:</span>${title} </li>
            <li><span>內容:</span>${content.replace(/<\/?[^>]*>/g, '')} </li>
            <li><span>作者:</span>${author} </li>
            <li><span>發佈日期:</span>${date.substr(0,10)} </li>
            <li><span>分類:</span>${cateText.title} </li>
            <li><span>觀看次數:</span>${views} </li>
          </ul>
      </div>
    `

    $Li.append(cardhtml)
    $Li.children().append($delBtn)
    $Li.children().append($editBtn)
    $postsList.append($Li)

    $delBtn.click(event=>{
      // console.log(_id)
      var base = this;
      console.log($(event.target).parent().parent())
      var msg = "確定要刪除嗎？\n\n請確認！";
      if (confirm(msg)==true){
        
        fetch(devpostsURL+'/'+_id, {
          method: 'DELETE',
          // headers 加入 json 格式
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
            return response.json(); 
          }).then((jsonData) => {
            // console.log(jsonData);
            
          }).catch((err) => {
            console.log('錯誤:', err);
        })
        $(event.target).parent().parent().remove()
      return true;
      }else{
      return false;
      }
      
    })

    $editBtn.click(e=>{
      window.location.href = "/admin/edit_post.html?id=" + _id;

    })

  }






})