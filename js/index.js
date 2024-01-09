$(function () {
  let window_width = $(window).width();

  //화면너비가 달라질 때 마다 새로고침
  // $(window).resize(function () {
  //   location.reload();
  // });

  //visaul animation start
  $("#visual").addClass("on");
  $("#con1").addClass("on");
  $("#con2 .inner > ul li").eq(0).addClass("on");
  $(".con2").addClass("on");
  $(".con3").addClass("on");
  $(".con4").addClass("on");
  // console.log("hello");

  // 화면너비 1024px 이상 에서만 실행
  if (window_width >= 1024) {
    //스크롤 이벤트
    // 개별적으로 Wheel 이벤트 적용
    let elm = "body section";
    $(elm).each(function (index) {
      // 개별적으로 Wheel 이벤트 적용
      $(this).on("mousewheel DOMMouseScroll", function (e) {
        e.preventDefault();
        var delta = 0;
        if (!event) event = window.event;
        if (event.wheelDelta) {
          delta = event.wheelDelta / 120;
          if (window.opera) delta = -delta;
        } else if (event.detail) delta = -event.detail / 3;
        var moveTop = $(window).scrollTop();
        var elmSelecter = $(elm).eq(index);
        // 마우스휠을 위에서 아래로
        if (delta < 0) {
          if ($(elmSelecter).next() != undefined) {
            try {
              moveTop = $(elmSelecter).next().offset().top;
            } catch (e) {}
          }
          // 마우스휠을 아래에서 위로
        } else {
          if ($(elmSelecter).prev() != undefined) {
            try {
              moveTop = $(elmSelecter).prev().offset().top;
            } catch (e) {}
          }
        }

        // 화면 이동 0.8초(800)
        $("html,body")
          .stop()
          .animate(
            {
              scrollTop: moveTop + "px",
            },
            {
              duration: 800,
              complete: function () {},
            }
          );
      });
    });

    $("#visual .circle .inner").mouseup(function () {
      $("#visual .circle .mouse").css({
        display: "block",
      });
    });
    $("#visual .circle .inner").mouseleave(function () {
      $("#visual .circle .mouse").css({
        display: "block",
      });
    });
    //con1 mouse block
    $(".con1 .mouse").css({
      display: "block",
    });
    $(".con1 .mouse").css({
      display: "block",
    });

    // visual 눈동자 움직임
    $("#visual").mousemove(function (e) {
      // .inner 기준으로 마우스 x축,y축 위치가 + 또는 - 인지 인식
      let mouseX_left = e.pageX - $("#visual .left p").offset().left;
      let mouseY_left = e.pageY - $("#visual .left p").offset().top;
      let mouseX_right = e.pageX - $("#visual .right p").offset().left;
      let mouseY_right = e.pageY - $("#visual .right p").offset().top;

      // 눈동자가 눈을 벋어나지 않도록 계산
      let maxX_left =
        $("#visual .left p").width() - $("#visual .left p span").width();
      let maxY_left =
        $("#visual .left p").height() - $("#visual .left p span").height();
      let maxX_right =
        $("#visual .right p").width() - $("#visual .right p span").width();
      let maxY_right =
        $("#visual .right p").height() - $("#visual .right p span").height();

      // Math.max에서 mouseX,Y 와 0 중 큰 수를 고르고 Math.min에서 Math.max 와 maxX,Y 중 작은 수를 고름
      mouseX_left = Math.min(Math.max(mouseX_left, 0), maxX_left);
      mouseY_left = Math.min(Math.max(mouseY_left, 0), maxY_left);
      mouseX_right = Math.min(Math.max(mouseX_right, 0), maxX_right);
      mouseY_right = Math.min(Math.max(mouseY_right, 0), maxY_right);

      // .circle 움직임
      $("#visual .left p span").css({
        left: mouseX_left,
        top: mouseY_left,
      });
      $("#visual .right p span").css({
        left: mouseX_right,
        top: mouseY_right,
      });
    });

    $(".con1 .character .charac_wrap").mousedown(function () {
      $(this).addClass("on");
      $(".con1 .mouse").css({
        display: "none",
      });
    });
    $(".con1 .character .charac_wrap").mouseup(function () {
      $(this).removeClass("on");
    });
    $(".con1 .character .charac_wrap").mouseleave(function () {
      $(this).removeClass("on");
    });

    //scroll toggleClass
    window.addEventListener("scroll", () => {
      let viewPoint = $(this).scrollTop();
      let visualTop = $("#visual").offset().top,
        con1Top = $(".con1").offset().top,
        con2Top = $(".con2").offset().top,
        con3Top = $(".con3").offset().top,
        con4Top = $(".con4").offset().top;
      if (viewPoint >= visualTop && viewPoint < con1Top) {
        $(".scroll_nav span").removeClass("on");
        $(".scroll_nav span").eq(0).addClass("on");
      } else if (viewPoint >= con1Top && viewPoint < con2Top) {
        $(".scroll_nav span").removeClass("on");
        $(".scroll_nav span").eq(1).addClass("on");

        $(".con1").addClass("on");
      } else if (viewPoint >= con2Top && viewPoint < con3Top) {
        $(".scroll_nav span").removeClass("on");
        $(".scroll_nav span").eq(2).addClass("on");
        $(".con2 .inner > ul li").removeClass("on");
        $(".con2 .inner > ul li").eq(0).addClass("on");

        $(".con2").addClass("on");
      } else if (viewPoint >= con3Top && viewPoint < con4Top) {
        $(".scroll_nav span").removeClass("on");
        $(".scroll_nav span").eq(3).addClass("on");

        $(".con3").addClass("on");
      } else if (viewPoint >= con4Top) {
        $(".scroll_nav span").removeClass("on");
        $(".scroll_nav span").eq(4).addClass("on");

        $(".con4").addClass("on");
      }

      // scroll_nav 클릭시 이동
      $(".scroll_nav span").on("click", function () {
        target = $(this).children("a").attr("href");
        targetpos = $(target).offset().top;
        movescroll(targetpos);
      });
      function movescroll(targetpos) {
        $("html, body").stop().animate({ scrollTop: targetpos }, 1000);
      }
    });
  }

  ///////////////////////////////////////////////////////////

  // visual
  $("#visual .circle .inner").mousedown(function () {
    $(this).addClass("on");
    $("#visual .circle .shadow").addClass("fix");
    $("#visual .circle .lips").addClass("on");
    $("#visual .circle .mouse").css({
      display: "none",
    });
  });
  $("#visual .circle .inner").mouseup(function () {
    $(this).removeClass("on");
    $("#visual .circle .shadow").removeClass("fix");
    $("#visual .circle .lips").removeClass("on");
  });
  $("#visual .circle .inner").mouseleave(function () {
    $("#visual .circle .shadow").removeClass("fix");
    $("#visual .circle .lips").removeClass("on");
  });

  // visual draggEvent
  $("#visual .circle").draggable({
    axis: "x",
    containment: "#visual",
  });

  // con1
  // con1 draggEvent
  $(".con1 .character").draggable({
    axis: "x",
    containment: ".con1",
  });

  // con2
  $(".con2 ul li").click(function () {
    $(".con2 ul li").removeClass("on");
    $(this).toggleClass("on");
  });
  $(".con2 ul li").mousedown(function () {
    $(this).css({
      border: "15px solid #fff",
    });
  });
  $(".con2 ul li").mouseup(function () {
    $(this).css({
      border: "0px solid #fff",
    });
  });
  $(".con2 ul li").mouseleave(function () {
    $(this).css({
      border: "0px solid #fff",
    });
  });

  // con3
  let con3_selectIndex;
  $(".con3 .con3_nav li").click(function () {
    $(".con3 .con3_nav li").removeClass("on");
    $(this).addClass("on");

    con3_selectIndex = $(this).index();
    $(".con3 .con3_site li").removeClass("on");
    $(".con3 .con3_site li").eq(con3_selectIndex).addClass("on");
    $(".con3 .pcInner li").removeClass("on");
    $(".con3 .pcInner li").eq(con3_selectIndex).addClass("on");
    $(".con3 .mbInner li").removeClass("on");
    $(".con3 .mbInner li").eq(con3_selectIndex).addClass("on");
  });

  // 모바일 화면 안보이기
  $(".con3 .mbView").addClass("none");
  if($(".con3 .con3_nav li").eq(0).hasClass("on")){
    $(".con3 .mbView").removeClass("none");
  }else{
    $(".con3 .mbView").addClass("none");
  }

  //con4
  $(".con4 .txt_wrap .txt_box li").mouseenter(function () {
    $(this).find("span").addClass("on");
  });
  $(".con4 .txt_wrap .txt_box li").mouseleave(function () {
    $(".con4 .txt_inform span").removeClass("on");
  });

  ////////////////////////
});
