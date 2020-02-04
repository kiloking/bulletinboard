$(function(){
  var $categories = $('#categories')
  var $title = $('#title')
  var $content = $('#content')
  var $author = $('#author')
  var $submit = $('#submit') 
  var devcategoriesURL = 'http://localhost:3001/api/categories'
  var devpostsURL = 'http://localhost:3001/api/posts'
  var prodURL = 'https://nameless-bastion-39488.herokuapp.com/api/users'
/**
如果你要造一條船，不要只曉得敲鑼打鼓，張羅人們去砍樹鋸木。
你要先讓他們對航海充滿幻想。讓員工看到未來、看到願景，告訴他們你為什麼要這樣做，剩下的就讓他們自己去發揮。

這是之前看別人發Netflix的文章，受用無窮。
**/ 

  async function loadCategories(){
    const response = await fetch(devcategoriesURL)
    const data = await response.json()
    console.log(data)
    data.forEach((element,i) => {
      console.log(i,element)
      var option = $('<option></option>')
      option.val(element._id)
      option.html(element.title)
      $categories.append(option)

    });
    
  }
  loadCategories()

  $submit.click(event =>{
    console.log($categories.val())
    console.log($title.val())
    console.log($content.val())
    console.log($author.val())
    postForm({
      title:$title.val(),
      content:$content.val(),
      category:$categories.val(),
      author:$author.val(),
    })
  })

  function postForm(params){
    fetch(devpostsURL, {
      method: 'POST',
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
      }).catch((err) => {
        console.log('錯誤:', err);
    })
  }


})