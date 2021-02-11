$(function(){
// карточка товара
$('.product__images-slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: '.product__images-nav'
});
$('.product__images-nav').slick({
   slidesToShow: 4,
   slidesToScroll: 1,
   asNavFor: '.product__images-slider',
   dots: false,
   centerMode: true,
   vertical: true,
   focusOnSelect: true,
   responsive: [
      {
        breakpoint: 768,
        settings: {
            slidesToShow: 3,
            vertical: false, 
        }
      }]
     
});

 $('.slick-slide').mouseover(function(){
      $(this).click();
      }); 

// блок мы рекомендуем
$('.recommended__row').slick({
      slidesToShow: 5,
      slidesToScroll: 2,
      responsive: [
            {
            breakpoint: 1240,
            settings: {
                  slidesToShow: 4,
                  slidesToScroll: 2
                  }
            },
            {
              breakpoint: 1000,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 730,
              settings: {
                rows: 2,
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                rows: 1,
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
});


})