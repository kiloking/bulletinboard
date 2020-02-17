import {devcategoriesURL ,devpostsURL} from '../apiurl.js';
$(function(){
  var $categories = $('#categories')
  var $title = $('#title')
  var $bgcolor = $('#bgcolor')
  var $fontcolor = $('#fontcolor')
  var $submit = $('#submit') 
  var $requireFlash = $('#requireFlash')
 
  // var devcategoriesURL = 'http://192.168.1.137:3001/api/categories'
  // var devpostsURL = 'http://192.168.1.137:3001/api/posts'

  var $tagsExample = $('.tagsExample')
  var $example = $('.example')
  var bgcolor ;
  var fontcolor;
  createTagExample('text')
  function createTagExample(text){
    $example.text(text)
  }
  $title.keyup(e=>{
    console.log(e.currentTarget.value)
    createTagExample(e.currentTarget.value)
  })
  $submit.click(event =>{
    // console.log($categories.val())
    if(!$title.val()) {
      $requireFlash.html('分類名稱是必填的')
      return
    }
    if(!bgcolor) {
      bgcolor = '#4a4a4a';
    }
    if(!fontcolor) {
      fontcolor = '#fff';
    }


    // console.log($content.val())
    
    // console.log($author.val())
    postForm({
      title:$title.val(),
      content:bgcolor,
      category:fontcolor,
    })
  })

  function postForm(params){
    fetch(devcategoriesURL, {
      method: 'POST',
      // headers 加入 json 格式
      headers: {
        'Content-Type': 'application/json'
      },
      // body 將 json 轉字串送出
      body: JSON.stringify({
        title: params.title,
        backgroundcolor: params.content, 
        fontcolor:params.category
      })
    }).then((response) => {
        return response.json(); 
      }).then((jsonData) => {
        console.log(jsonData);
        $requireFlash.html('新增分類完成。')
      }).catch((err) => {
        console.log('錯誤:', err);
        $requireFlash.html('新增分類錯誤。')
    })
  }


  var pk = new Piklor(".color-picker", [
      "#1abc9c"
    , "#2ecc71"
    , "#3498db"
    , "#9b59b6"
    , "#34495e"
    , "#16a085"
    , "#27ae60"
    , "#2980b9"
    , "#8e44ad"
    , "#2c3e50"
    , "#f1c40f"
    , "#e67e22"
    , "#e74c3c"
    , "#ecf0f1"
    , "#95a5a6"
    , "#f39c12"
    , "#d35400"
    , "#c0392b"
    , "#bdc3c7"
    , "#7f8c8d"
    ,"#000000"

  ], {
    autoclose : false,
    
  })
  , header = pk.getElm(".example");

  pk.colorChosen(function (col) {
    header.style.backgroundColor = col;
    bgcolor = col;
  });


  var pkfontcolor = new Piklor(".color-picker-fontcolor", [
      "#1abc9c"
    , "#2ecc71"
    , "#3498db"
    , "#9b59b6"
    , "#34495e"
    , "#16a085"
    , "#27ae60"
    , "#2980b9"
    , "#8e44ad"
    , "#2c3e50"
    , "#f1c40f"
    , "#e67e22"
    , "#e74c3c"
    , "#ecf0f1"
    , "#95a5a6"
    , "#f39c12"
    , "#d35400"
    , "#c0392b"
    , "#bdc3c7"
    , "#7f8c8d"
    , "#000000"
    , "#ffffff"
    , "#A38B63"
    , "#8888ff"
    , "#00cccc"
  ], {
    autoclose : false,
    
  })
  , fcolor = pkfontcolor.getElm(".example");

  pkfontcolor.colorChosen(function (col) {
    fcolor.style.color = col;
    fontcolor = col
  });



})