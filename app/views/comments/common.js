$(function(){

  function isSP(){
    return $('#wrapper').width() <= 767;
  }

  function resetNavi(){
    if(isSP()){
      $('.header-nav-main').show();
      if (!$('#sp-menu').hasClass('active')){
        $('.header-nav-main').slideUp(0);
      }
    }
    else{
      $('.header-nav-main').slideDown(0);
    }
  }

  resetNavi();
  $(window).resize(function(){
    resetNavi();
  });

  $(window).scroll(function() {
    if($(this).scrollTop() > 10) {
      $('#header').addClass('movie');
    } else {
      $('#header').removeClass('movie');
    }
  });

  var $HeaderNavMain = $('.header-nav-main');

  $(document).on('click touchstart',"#sp-menu",function(e){
    e.preventDefault();
    e.stopPropagation();
    if ($HeaderNavMain.hasClass('active')){
      $('#sp-menu').removeClass('active');
      $HeaderNavMain.removeClass('active').slideUp(200);
    }
    else{
      $('#sp-menu').addClass('active');
      $HeaderNavMain.addClass('active').slideDown(200);
    }
  });

  $(document).on('click touchstart',".header-nav-main",function(e){
    e.stopPropagation();
  });

  $(document).on('click touchstart',"body",function(e){
    if ($HeaderNavMain.hasClass('active')){
      $HeaderNavMain.removeClass('active').slideUp(200);
    }
  });

  $(document).on('click touchstart','#pagetop',function(e){
    e.preventDefault();
    $('body,html').animate({scrollTop:0},800);
  });

  $('.anchor').on('click touchstart',function(e){
    e.preventDefault();
    if (isSP()){
      return;
    }
    var target = $(this).data('anc_p');//id取得
    var scr_p = $(target).offset().top - 100;//その位置を取得
    $('body,html').animate({scrollTop:scr_p},800);//指定した位置まで移動
  });

  var t_pos = 70;
  $('.page-link').on('click touchstart',function(e){
    e.preventDefault();
    var target = $(this).attr('href');//id取得
    var scr_p = $(target).offset().top - t_pos;//その位置を取得
    $('body,html').animate({scrollTop:scr_p},800);//指定した位置まで移動
  });

  $(document).on('click touchstart','.anchorlink',function(e){
    e.preventDefault();
    $('body,html').animate({scrollTop:0},800);
  });

  $(document).on('click touchstart','.more_btn',function(e){
    e.preventDefault();
    $btn = $(this);
    $wrap = $btn.closest('.more_wrap');
    $items = $wrap.find('.more_item');
    $count = 0;
    $items.each(function(){
      $count++;
      if ($(this).hasClass('active')){
        return true;
      }
      else{
        $(this).addClass('active').slideUp(0).slideDown(200);
        return false;
      }
    });
    $btn.blur();
    if ($items.length <= $count){
      $btn.addClass('none');
      $wrap.find('.more_reset').addClass('active');
    }
  });

  $(document).on('click touchstart','.more_reset',function(e){
    e.preventDefault();
    // $reset = $(this);
    // $wrap = $reset.closest('.more_wrap');
    // $wrap.find('.more_item').removeClass('active').slideUp(200);
    // $wrap.find('.more_btn').removeClass('none');
    // $reset.removeClass('active');
    $('body,html').animate({scrollTop:0},800);
  });

  if ($("#archive-nav").length > 0){
    var $nav = $("#archive-nav");
    if (isSP()){
      $nav.show(0);
      t_pos = 110;
      var $header = $('#header');
      var height = $header.outerHeight();
      var top = parseInt($nav.css('margin-top'),10);
      var max = top - height;
      var $menu = $nav.find('.archive-list > ul').slideUp(0);
      function setGalleryArchivesSP(t){
        if(t <= max){
          $nav.css("margin-top", top - t).css("max-height", window.innerHeight - (top - t) );
        }
        else{
          $nav.css("margin-top", height).css("max-height", window.innerHeight - height );
        }
      }
      $(document).on('click touchstart','#archive-menu',function(e){
        e.preventDefault();
        var $self = $(this);
        if ($self.hasClass('open')){
          $self.removeClass('open');
          $menu.slideUp(200);
        }
        else{
          $self.addClass('open');
          $menu.slideDown(200);
        }
      });
      $(document).on('click touchstart',"#archive-nav ul li a.page-link",function(e){
        $('#archive-menu').removeClass('open');
        $menu.slideUp(200);
      });
    }
    else{
      var $main = $("#gallery");
      var min_move = $main.offset().top;
      function setGalleryArchives(t){
        t = t + 21;
        if(t > min_move){
          $nav.addClass('active');
        }
        else if(t <= min_move){
          $nav.removeClass('active');
        }
      }

      var wh = window.innerHeight - 180;
      if ($("#archive-nav .archive-list").height() > wh){
        $("#archive-nav .archive-list").height(wh).addClass('setheight');
      }
      $(window).resize(function(){
        var wh = window.innerHeight - 180;
        if ($("#archive-nav .archive-list").height() > wh){
          $("#archive-nav .archive-list").height(wh).addClass('setheight');
        }
        else{
          $("#archive-nav .archive-list").height('auto').removeClass('setheight');
        }
      });
    }
    $(window).load(function(){
      if ($(location.hash).length > 0){
        $('body,html').animate({scrollTop:$(location.hash).offset().top - t_pos},0);
      }
      if (isSP()){
        setGalleryArchivesSP($(window).scrollTop());
      }
      else{
        setGalleryArchives($(window).scrollTop());
      }
      $(window).scroll(function(){
        var t = $(this).scrollTop();
        if (isSP()){
          setGalleryArchivesSP(t);
        }else{
          setGalleryArchives(t);
        }
      });
    });
  }




  $(document).on('change','#select_file_input',function(e){
    var path = $(this).val();
    var regex = /\\|\\/;
    var array = path.split(regex);
    $("#select_file_name").html(array[array.length - 1]);
  });


  $('.menu_item').on('click touchstart',function(e){
    e.preventDefault();
    var id = $(this).attr('data-slug');
    $('html,body').animate({
        scrollTop: $('#'+id).offset().top -100
    }, 1000);
  });

});
