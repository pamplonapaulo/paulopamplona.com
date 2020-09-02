(function(){

    'use strict';
    
    if (!!window.location.href.match(/\?lang=/g)) {

        document.querySelector('#loading .dancing-letters').classList.add('isHidden');
        document.querySelector('#loading .author-presentation').classList.remove('isFadedOut');
        document.querySelector('#loading .author-presentation').classList.add('isFadedOut');
        document.querySelector('#loading .author-presentation').classList.add('isFadedOut');
        restoreStuffOpacity();
        document.querySelector('#loading .loading-bgs').classList.add('isHidden');
        document.querySelector('#loading').style.display = 'none';

    } else {
        window.addEventListener('DOMContentLoaded', (event) => {
            openPage();
        });
    }
    
    function openPage(){

        document.querySelector('#loading .dancing-letters').classList.add('isHidden');
        
        setTimeout(function(){

            document.querySelector('#loading .author-presentation').classList.remove('isFadedOut');
        }, 1500);

        setTimeout(function(){
            
            document.querySelector('#loading .author-presentation').classList.add('isFadedOut');
        }, 5650);
        
        setTimeout(function(){
            
            restoreStuffOpacity();

            document.querySelector('#loading .loading-bgs').classList.add('isHidden');
        }, 7000);

        setTimeout(function(){
            
            document.querySelector('#loading').style.display = 'none';
            //document.querySelector('header.header nav.nav').style.opacity = 1;
        }, 8500);
    }

    function restoreStuffOpacity(){

        restoreOpacity(document.querySelector('header'));
        restoreOpacity(document.querySelector('footer'));
        restoreOpacity(document.querySelector('header.header nav.nav'));
        restoreOpacity(document.querySelector('.bg-cover'));

        var years = document.querySelectorAll('#timeline ul li .hero-slider-year h2');
        for(var i=0; i < years.length; i++){
            years[i].classList.remove('loader-hack');
        }

        var sections = document.querySelectorAll('body > section');
        var navs = document.querySelectorAll('body > div.hero-nav');

        sections.forEach(restoreOpacity);
        navs.forEach(restoreOpacity);
    }

    function restoreOpacity(element){
        element.style.opacity = '1';
    }

})();