(function(){

    'use strict';

    var idiomBtn = document.querySelector('.idioms');

    var ukFlag = document.querySelector('.langEN');
    var ptFlag = document.querySelector('.langPT');
    
    var ptLink = document.querySelectorAll('.hiddenIdiomLinks a')[0];
    var ukLink = document.querySelectorAll('.hiddenIdiomLinks a')[1];

    if(window.location.search == "?lang=en"){
        ukFlag.classList.toggle('on');
        ptFlag.classList.toggle('on');

        window.currentLanguage = 0;
    } else {
        window.currentLanguage = 1;
    }

    idiomBtn.addEventListener('click', function(e){

        e.preventDefault();

        ukFlag.classList.toggle('on');
        ptFlag.classList.toggle('on');

        if(window.location.search == "?lang=en"){
            window.currentLanguage = 1;
            setTimeout(function(){ ptLink.click(); }, 1200);
        } else {
            window.currentLanguage = 0;
            setTimeout(function(){ ukLink.click(); }, 1200);            
        }
            
    });

})();