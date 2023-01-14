// Карусель

$(document).ready(function(){
    $('.carrousel__inner').slick({
        speed: 1000,
        adaptiveHeight: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron-left-solid.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron-right-solid.svg"></button>',
        responsive: [ 
            {
            breakpoint: 768,
            settings: {
              dots: true,
              arrows: false
            }
        }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
      $(item).each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
      });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal

    $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
      $('.overlay, #consultation, #order, #gratitude').fadeOut('slow');
    });

    $('.button_catalog').each(function(i) {
      $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
      });
    });

    // Закриття модального вікна кнопкою "Escape"

    document.addEventListener('keydown', (e) => {
      if (e.code === "Escape") { // К условию можно добавить что окно уже открыто, проверить style.display
        $('.overlay, #consultation, #order, #gratitude').fadeOut('slow');
      }
    });

    // Зариття модального вікна при кліку на прозорому фоні "overlay"

    const overlay = document.querySelector('.overlay');
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          $('.overlay, #consultation, #order, #gratitude').fadeOut('slow');
        }
    });

    // Валідація форм

    function validateForms(form) {
      $(form).validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          phone: "required",
          email: {
              required: true,
              email: true
          }
        },
        messages: {
          name: {
            required: "Please specify your name",
            minlength: jQuery.validator.format("At least {0} characters required!")
          },
          phone: "Please enter your phone number",
          email: {
            required: "We need your email address to contact you",
            email: "Your email address must be in the format of name@domain.com"
          }
        }
    });
  };

  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');
    
  $('input[name=phone]').mask("+7 (999) 999-9999");

  $('form').submit(function(e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #gratitude').fadeIn('slow');

      // Автоматичне закриття вікон після відпраки
    //   setTimeout(() => {
    //     $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    // }, 10000);

      $('form').trigger('reset');
    });

    return false;
  });

  //Smooth scroll and pageup

  $(window).scroll(function(){
    if ($(this).scrollTop() > 1300) {
      $('.pageup').fadeIn();
    }
    else {
      $('.pageup').fadeOut();
    }
  });

  $("a[href=#up]").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });

  new WOW().init();

});