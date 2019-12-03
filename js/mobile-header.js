(function(){

    'use strict';

    if(window.innerWidth < 760){

        window.onscroll = function() {
            if(window.scrollY == 0){
                document.querySelector('header').classList.remove('no-transparency');
            }
            
            if(window.scrollY > 10){
                document.querySelector('header').classList.add('no-transparency');
            }
        }
    }

})();