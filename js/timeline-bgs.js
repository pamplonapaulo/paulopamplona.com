
(function(){

    'use strict';

    function searchBgImage(){

        var lifeEvents = document.querySelectorAll('#timeline li');

        for(var i=0; i<lifeEvents.length; i++){

            var images = lifeEvents[i].querySelectorAll('.material-icons');

            for(var x=0; x<images.length; x++){
                
                var obj = images[x].getAttribute('data-hover');

                includeClickEvent(i, x, obj);
            }
         }
    }

    function includeClickEvent(lifeEventIndex, iconIndex, image){

        var liArray = document.querySelectorAll('.hero-slider-container li');
        var pageBg = document.querySelector('section.hero-image');

        liArray[lifeEventIndex].querySelectorAll('.material-icons')[iconIndex].addEventListener("click", function(){
            
            backgroundTransition(image, pageBg);
        });

    }

    function backgroundTransition(image, pageBg){
        
       var path = './assets/timeline/' + image;

       if(tryImagePath(path)){
            pageBg.style.backgroundImage = 'url("./assets/timeline/' + image + '")';
       }
    }

    function tryImagePath(path){

        var request;

        if(window.XMLHttpRequest)
            request = new XMLHttpRequest();
        else
            request = new ActiveXObject("Microsoft.XMLHTTP");

        request.open('GET', path, false);
        request.send();

        if (request.status === 404) {
            console.log('img FAIL');
            return false;
        } else {
            return true;
        }
    }

    if(window.innerWidth >= 1024){
        setTimeout(function(){ searchBgImage(); }, 1000);
    }   

})();