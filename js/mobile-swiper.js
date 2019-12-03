
    var el = document.querySelector('body');

    function swipedetect(el, callback){

        var touchsurface = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 50, //required min distance traveled to be considered swipe
        restraint = 100, // maximum distance allowed at the same time in perpendicular direction
        allowedTime = 300, // maximum time allowed to travel that distance
        elapsedTime,
        startTime,
        handleswipe = callback || function(swipedir){}

        touchsurface.addEventListener('touchstart', function(e){
            var touchobj = e.changedTouches[0]
            swipedir = 'none'
            dist = 0
            startX = touchobj.pageX
            startY = touchobj.pageY
            startTime = new Date().getTime() // record time when finger first makes contact with surface
            //e.preventDefault()
        }, false)

        touchsurface.addEventListener('touchmove', function(e){
            e.preventDefault() // prevent scrolling when inside DIV
        }, false)

        touchsurface.addEventListener('touchend', function(e){
            var touchobj = e.changedTouches[0]
            distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
            distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
            elapsedTime = new Date().getTime() - startTime // get time elapsed
            if (elapsedTime <= allowedTime){ // first condition for swipe met
                if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                    swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
                }
                else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                    swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
                }
            }
            handleswipe(swipedir)
            //e.preventDefault()
        }, false)
    }

    swipedetect(el, function(swipedir){

        var selector = window.location.hash.replace(/#/, '');
        var btns = document.querySelectorAll('.' + selector + '-nav > div' );

        if (swipedir =='right') {
            btns[0].click();
        }
        if (swipedir =='left') {
            btns[1].click();
        }
        if (swipedir =='up') {
            changeScroll('down');
        }
        if (swipedir =='down') {
            changeScroll('up');
        }
    })

    function changeScroll(direction){
        
        var hashes = ['timeline', 'skills', 'projects', 'contact', 'social'];

        function forceHashUpdate(index){
            window.location.hash = '#' + hashes[index];
        }

        if(window.location.hash == '#timeline' && direction == 'down'){
            forceHashUpdate(1);
            changeCurrentView(1);    
        } else if(window.location.hash == '#skills' && direction == 'down'){
            forceHashUpdate(2);
            changeCurrentView(2);
        } else if(window.location.hash == '#projects' && direction == 'down'){
            forceHashUpdate(3);
            changeCurrentView(3);
        } else if(window.location.hash == '#contact' && direction == 'down'){
            forceHashUpdate(4);
            //changeCurrentView(3);
        } else if(window.location.hash == '#social' && direction == 'up'){
            forceHashUpdate(3);
            //changeCurrentView(3);
        } else if(window.location.hash == '#contact' && direction == 'up'){
            forceHashUpdate(2);
            changeCurrentView(2);
        } else if(window.location.hash == '#projects' && direction == 'up'){
            forceHashUpdate(1);
            changeCurrentView(1);
        } else if(window.location.hash == '#skills' && direction == 'up'){
            forceHashUpdate(0);
            changeCurrentView(0);
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
          txtSmall.innerHTML = 'paulo pamplona\'s';
          txtBig.innerHTML = pageTitles[0].innerHTML;
          document.querySelectorAll('.timeline-nav')[0].classList.toggle('show');
          document.querySelectorAll('.timeline-nav')[1].classList.toggle('show');
        }
    
        if(view == 1){
          txtSmall.style.opacity = '1';
          txtSmall.innerHTML = 'tech';
          txtBig.innerHTML = pageTitles[1].innerHTML;
          document.querySelectorAll('.timeline-nav')[0].classList.toggle('show');
          document.querySelectorAll('.timeline-nav')[1].classList.toggle('show');
        }
    
        if(view == 2){
          txtSmall.style.opacity = '1';
          txtSmall.innerHTML = 'front-end';
          txtBig.innerHTML = pageTitles[2].innerHTML;
        }
    
        if(view == 3){
          txtSmall.style.opacity = '1';
          txtSmall.innerHTML = '&nbsp;';
          txtBig.innerHTML = pageTitles[3].innerHTML;
        }
      }