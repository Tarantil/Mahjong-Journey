var logo = document.querySelector('.banner__logo');
var leftAnimElement = document.querySelectorAll('.anim-el_left');
var rightAnimElement = document.querySelectorAll('.anim-el_right');
var slider = document.querySelector('.swiper');

var Visible = function (target) {
    // Все позиции элемента
    var targetPosition = {
        top: window.pageYOffset + target.getBoundingClientRect().top-250,
        bottom: window.pageYOffset + target.getBoundingClientRect().bottom
      },
      // Получаем позиции окна
      windowPosition = {
        top: window.pageYOffset,
        bottom: window.pageYOffset + document.documentElement.clientHeight
      };

    if (targetPosition.bottom > windowPosition.top && 
      targetPosition.top < windowPosition.bottom){ 
      return true;
    } else {
    	return false;
    };
  };


var swiper = new Swiper('.swiper', {
  loop: true,
  speed: 1000,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});

window.addEventListener('scroll',() => {
  leftAnimElement.forEach(element => {
  	if(Visible(element)){
  		element.classList.add('anim-el_active');
  	};
  });
  rightAnimElement.forEach(element => {
  	if(Visible(element)){
  		element.classList.add('anim-el_active');
  	};
  });
  if(Visible(slider)){
  		swiper.autoplay.start();
  }
  else{
  	swiper.autoplay.stop();
  };
  

});
 document.addEventListener("DOMContentLoaded", () => {
    logo.classList.add('banner__logo_active');
  });
