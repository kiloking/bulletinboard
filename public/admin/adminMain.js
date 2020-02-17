$(document).ready(function() {

  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

  });
});

$(function(){
  var $navbar = $('.navbar')
  createMenu()
  function createMenu(){
    $navbar.html(`
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <img src="../img/logo.png" width="112" height="28">
          </a>
          <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item" href='post.html'>
              新增文章
            </a>
            <a class="navbar-item" href='/admin'>
              文章列表
            </a>
            <a class="navbar-item" href='category.html'>
              新增分類
            </a>
            <a class="navbar-item" href='categoryList.html'>
              分類列表
            </a>
          </div>
        </div>
    </div>
    `)
  }





})