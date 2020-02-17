import {devcategoriesURL ,devpostsURL} from '../apiurl.js';
$(function(){
  var $categories = $('#categories')
  var $title = $('#title')
  var $content = $('textarea.content')
  CKEDITOR.replace( 'content' );
  var $author = $('#author')
  var $submit = $('#submit')
  var $requireFlash = $('#requireFlash')
  // var devcategoriesURL = 'http://192.168.1.137:3001/api/categories'
  // var devpostsURL = 'http://192.168.1.137:3001/api/posts'
  var postid =  request('id')
  var cateid

  //抓網址參數
  function request(paras){
      var url = location.href;
      var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
      var paraObj = {}
      for (i=0; j=paraString[i]; i++){
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
      }
      var returnValue = paraObj[paras.toLowerCase()];
      if(typeof(returnValue)=="undefined"){
        return "";
      }else{
        return returnValue;
      }
  }
  console.log(postid)
  getSinglePost(postid)

  function getSinglePost(_id){
    fetch(devpostsURL+'/'+ _id)
    .then(response =>{
      return response.json();
    })
    .then(data => {
      console.log(data)
      // getCategory(data.category)
      $title.val(data.title)
      $author.val(data.author)
      CKEDITOR.instances['content'].setData(data.content)
      cateid=data.category


    })
    .catch(err => console.log(err))
  }


  async function loadCategories(cateid){
    const response = await fetch(devcategoriesURL)
    const data = await response.json()
    data.forEach((element,i) => {
      console.log(i,element)
        var option = $('<option></option>')
        option.val(element._id)
        option.html(element.title)
        $categories.append(option)
    });
  }
  // 執行函數 並代入現在取得的分類id
  loadCategories(cateid).then(e=>{
    $('#categories').val(cateid)
    console.log(cateid)
  })


  $submit.click(event =>{
    // console.log($categories.val())
    if(!$title.val()) {
      $requireFlash.html('標題是必填的')
      return
    }
    var content = CKEDITOR.instances['content'].getData()
    if(!content) {
      $requireFlash.html('內文是必填的')
      return
    }
    if(!$author.val()) {
      $requireFlash.html('作者是必填的')
      return
    }

    // console.log($content.val())

    // console.log($author.val())
    postForm({
      id: postid,
      title:$title.val(),
      content:content,
      category:$categories.val(),
      author:$author.val(),
    })
  })

  function postForm(params){
    fetch(devpostsURL+'/'+params.id, {
      method: 'PUT',
      // headers 加入 json 格式
      headers: {
        'Content-Type': 'application/json'
      },
      // body 將 json 轉字串送出
      body: JSON.stringify({
        title: params.title,
        content: params.content,
        category:params.category,
        author:params.author
      })
    }).then((response) => {
        return response.json();
      }).then((jsonData) => {
        console.log(jsonData);
        $requireFlash.html('<a href="javascript:history.go(-1)" class="button is-success">修改成功，回上一頁</a>')
      }).catch((err) => {
        console.log('錯誤:', err);
    })
  }


})