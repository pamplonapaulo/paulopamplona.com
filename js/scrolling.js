(function(){

  'use strict';

  // Navigation:

  var hamb = document.querySelector('a.hamb-icon');
  var nav = document.querySelector('nav');
  var overlay = document.querySelector('#overlay');

  hamb.addEventListener('click', function(){
      toggleStuff();
  });

  overlay.addEventListener('click', function(){
      toggleStuff();
  });

  function toggleStuff(){

      hamb.classList.toggle('active');
      nav.classList.toggle('visible');
      overlay.classList.toggle('visible');

      setTimeout(function(){ overlay.classList.toggle('fadeOut'); }, 800);
  }

  var menu = document.querySelectorAll('.menu li');

  for(var i=0; i<menu.length; i++){
    
    menu[i].addEventListener('click', function(event){

      var page = event.target.querySelector('a').getAttribute('data-scroll');

      smoothScroll(page);
      forceHashUpdate(page);
      toggleStuff();

    });
  }

  // Scroll Pagination:

  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  var keys = {37: 1, 38: 1, 39: 1, 40: 1};

  var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

  window.wheelCounter = 0;

  function preventDefault(e) {

    window.wheelCounter++;    

    e = e || window.event;
    if (e.preventDefault){

      e.preventDefault();
    }
    e.returnValue = false;  
  }

  function preventDefaultForScrollKeys(e) {

      if (keys[e.keyCode]) {
          preventDefault(e);

          if(e.keyCode == 38){
            changeScroll('up');
          }
          if(e.keyCode == 40){
            changeScroll('down');
          }
          return false;
      }
  }

  function disableScroll() {

    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    document.addEventListener('wheel', preventDefault, {passive: false}); // Disable scrolling in Chrome
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;

    document.addEventListener('touchmove', preventDefault, {passive: false}); // mobile

  }

  function enableScroll() {
      if (window.removeEventListener)
          window.removeEventListener('DOMMouseScroll', preventDefault, false);
      document.removeEventListener('wheel', preventDefault, {passive: false}); // Enable scrolling in Chrome
      window.onmousewheel = document.onmousewheel = null; 
      window.onwheel = null; 
      window.ontouchmove = null;  
      document.onkeydown = null;  
  }

  window.addEventListener("wheel", function(event){

    var deviceSensibility;

    if(isTrackPad(event)){
      deviceSensibility = 70;
    } else {
      deviceSensibility = 5;
      if(isSafari){
        deviceSensibility = 2;
      }
    }

    if(event.deltaY > 0 && this.wheelCounter > deviceSensibility){
      this.wheelCounter = 0;
      changeScroll('down');
    } else if(event.deltaY < 0 && this.wheelCounter > deviceSensibility){
      this.wheelCounter = 0;
      changeScroll('up');
    }
  });

  var countDecimals = function(value) {
    if (Math.floor(value) !== value)
        return value.toString().split(".")[1].length || 0;
    return 0;
  }

  function isTrackPad(e){
    if(countDecimals(e.deltaY)==0){
      return true;
    } else {
      return false;
    }
  }

  var currentView = 0;

  var page1 = 0;
  var page2 = document.querySelector('.skills').clientHeight;
  var page3 = page2 * 2;
  var page4 = page2 * 3;

  var pages = [ page1 , page2 , page3, page4 ];

  
  if(window.innerWidth < 768){
    var footer = page4 + document.querySelector('.footer').clientHeight;
    pages = [ page1 , page2 , page3, page4, footer ];
  }
  
  function changeScroll(direction){

    if(direction == 'down'){

      if(currentView == 0){
        smoothScroll(1);
        //forceHashUpdate(1);
      } else if(currentView == 1){
        smoothScroll(2);
        //forceHashUpdate(2);
      } else if(currentView == 2){
        smoothScroll(3);
        //forceHashUpdate(3);
      } else if(currentView == 3 && window.innerWidth < 768){
        // I wonder if isn't necessary and if it´ll conflict with './mobile-swiper.js'. So far, so good.
        smoothScroll(4);
        //forceHashUpdate(4);
      }
    
    } else if(direction == 'up'){

      if(currentView == 1){
        smoothScroll(0);
        //forceHashUpdate(0);
      } else if(currentView == 2){
        smoothScroll(1);
        //forceHashUpdate(1);
      } else if(currentView == 3){
        smoothScroll(2);
        //forceHashUpdate(2);
      } else if(currentView == 4){
        smoothScroll(3);
        //forceHashUpdate(3);
      }
    }
  }

  function forceHashUpdate(index){
    var hashes = ['timeline', 'skills', 'projects', 'contact', 'social'];
    location.hash = hashes[index];
  }

  function getSection(){

    if(window.scrollY < pages[1] && window.location.hash != "#timeline"){
      forceHashUpdate(0);
      changeCurrentView(0);
    } else if(window.scrollY >= pages[1] && window.scrollY < pages[2] && window.location.hash != "#skills"){
      forceHashUpdate(1);
      changeCurrentView(1);
    } else if(window.scrollY >= pages[2] && window.scrollY < pages[3] && window.location.hash != "#projects"){
      forceHashUpdate(2);
      changeCurrentView(2);
    } else if(window.scrollY >= pages[3] && window.scrollY < pages[4] && window.location.hash != "#contact"){
      forceHashUpdate(3);
      changeCurrentView(3);
    } else if(window.scrollY >= pages[4] && window.location.hash != "#social"){
      forceHashUpdate(4);
      changeCurrentView(3);
    }
  }

  function smoothScroll(toHere){

    var end = pages[toHere];

    if(isSafari){

        TweenLite.to(window, .5, {scrollTo:end});

    } else {

        window.scroll({
        top: end, 
        left: 0, 
        behavior: 'smooth'
        });
    }

    changeCurrentView(toHere);

    setTimeout(function(){

      forceHashUpdate(toHere);

    }, 700);
    
  }
  
  function getInitialPosition(){

    var userPos = Math.round(window.scrollY);

    if(userPos == pages[0] || window.location.hash == "#timeline"){
      changeCurrentView(0);
      //location.hash = "timeline";
    }
    if(userPos == pages[1] || window.location.hash == "#skills"){
      changeCurrentView(1);
      //location.hash = "skills";
    }
    if(userPos == pages[2] || window.location.hash == "#projects"){
      changeCurrentView(2);
      //location.hash = "projects";
    }
    if(userPos == pages[3] || window.location.hash == "#contact"){
      changeCurrentView(3);
      //location.hash = "contact";
    }
    if(userPos == pages[4] || window.location.hash == "#social"){
      changeCurrentView(3);      
      //location.hash = "contact";
    }
  }

  function changeCurrentView(newView){

    toggleSectionTitle();

    currentView = newView;

    setTimeout(function(){ changeSectionTitle(currentView); }, 500);

    setTimeout(function(){ toggleSectionTitle(); }, 800);

    window.currentPage = currentView;
  }

  function toggleSectionTitle(){
    document.querySelector('header .section-title').classList.toggle('hidden');
  }

  function changeSectionTitle(view){
    var txtSmall = document.querySelector('header .section-title .thin');
    var txtBig = document.querySelector('header .section-title .thick');
    var pageTitles = document.querySelectorAll('.menu li a');

    if(view == 0){
      txtSmall.style.opacity = '1';
      txtSmall.innerHTML = getSubtitle(pageTitles[0]);
      txtBig.innerHTML = pageTitles[0].innerHTML;
      document.querySelectorAll('.timeline-nav')[0].classList.toggle('show');
      document.querySelectorAll('.timeline-nav')[1].classList.toggle('show');
    }

    if(view == 1){
      txtSmall.style.opacity = '1';
      txtSmall.innerHTML = getSubtitle(pageTitles[1]);
      txtBig.innerHTML = pageTitles[1].innerHTML;
    }

    if(view == 2){
      txtSmall.style.opacity = '1';
      txtSmall.innerHTML = getSubtitle(pageTitles[2]);
      txtBig.innerHTML = pageTitles[2].innerHTML;
    }

    if(view == 3 || view == 4){
      txtSmall.style.opacity = '1';
      txtSmall.innerHTML = '&nbsp;';
      txtBig.innerHTML = pageTitles[3].innerHTML;
    }
  }

  function getSubtitle(element){

    return element.getAttribute('data-subhighlight');

  }

  function jumptoForm(){

    var formOnUse = document.querySelector('#contact form').classList.contains('just-used');

    if(formOnUse){

      document.querySelector('html').classList.toggle('no-smooth');

      window.location.hash =  "#contact";

      document.querySelector('html').classList.toggle('no-smooth');

      getInitialPosition();
    }
  }

  disableScroll();
  
  if(window.innerWidth < 1024){

    window.addEventListener('DOMContentLoaded', (event) => {
        
      setTimeout(function(){

        getSection();

      }, 7000);
      
    });
  }
  
  getInitialPosition();
  jumptoForm();  

})();