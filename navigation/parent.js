var $frame = $('#content-frame');
var menuHideState = true;

var switchSelect = function(el) {
  var $el = $(el);
  var $nav = $el.closest('.nav-sidebar');

  $nav.find('.active').removeClass('active');

  $el.closest('li').addClass('active');

  // Add a clicked class to stop hover effect
  // (see :not(.clicked):hover in CSS)
  $nav.addClass('clicked');

  // Remove clicked class when hovering away from
  // the freshly selected navigation item
  $el.mouseleave(function(ev){
    $nav.removeClass('clicked');
  });
};

var toggleMenu = function(obj) {
  if (obj) { menuHideState = !menuHideState; }
  $('.nav-sidebar-wrap').toggleClass('menu-toggled', menuHideState);
  $frame.contents().find('body').toggleClass('menu-toggled', menuHideState);
};

/**********************************************************************/

$(function() {
  toggleMenu();

  $frame.on('load', function(foo){
    toggleMenu();

    /*
    $frame.contents().find('body').on('click', function(ev){
      console.log('hello');

      if (!menuHideState) {
        toggleMenu(true);
      };
    });
    */
  });

  $('.navbar-toggle').click(toggleMenu);

  $('.nav-sidebar a').click(function(ev){
    switchSelect(this);
  });
});
