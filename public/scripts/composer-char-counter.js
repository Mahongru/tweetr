$( document ).ready(function() {
  $(".textsection").on("input", (event) => {
    var max = 140;
    var len = $(".textsection").val().length;
    var char = max - len;

  $(".counter").text(char);

    if (char < 0) {
      $("input").prop('disabled', true);
      $("input").css('color', '#e1e1e1');
      $(".counter").css('color', 'tomato');
    }
    if (char >= 0) {
      $("input").prop('disabled', false);
      $("input").css('color', 'black');
      $(".counter").css('color', '#244751');

    }
  });
});