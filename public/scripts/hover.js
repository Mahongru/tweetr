$(function () {

  $(".tweet").on('mouseenter', function (event) {

    $("section article header").css("opacity", 1);
    $("section article footer div").css("opacity", 1);
    $("section article").css("border", "1px solid black");
  })

  $(".tweet").on('mouseleave', function (event) {

    $("section article header").css("opacity", 0.7);
    $("section article footer div").css("opacity", 0);
    $("section article").css("border", "1px solid #e1e1e1");

  })
})