(function (win){

    'use strict';

    /* ************************************************************
    
    PAGINATION COMPONENT
    
    ************************************************************ */

    function buildPagination(section, screen){

        var btnPrev = document.querySelector('.' + section + '-nav .nav-left-btn');
        var btnNext = document.querySelector('.' + section + '-nav .nav-right-btn');
        var items;
        var dots;
        var position = 0;
        var dotsLengthPosition = 0;
        var stageWidth = 50;

        if(window.innerWidth >= 1024){
            stageWidth = 20;
        }

        if(arguments[2]){
            items = arguments[2];
        } else {
            items = document.querySelectorAll('#' + section + ' ul li:not(.unchecked)');
        }
    
        function buildPagination(){

            for(var i=0; i<items.length; i++){
                popPagination(i);
            }
            dots = document.querySelectorAll('#' + section + ' .pagination .item');
            dots[position].classList.add('current-bg');
        }

        function popPagination(i){
            
            var fragment = document.createDocumentFragment();
    
            var div = document.createElement('div');
            div.classList.add('item');
            div.setAttribute('dot-index', i);
    
            var span = document.createElement('span');
    
            div.appendChild(span);
            fragment.appendChild(div);

            var DOMPosition = document.querySelector('#' + section + ' .pagination .dots');

            DOMPosition.style.width = 'calc(calc(50vw / 7)*' + items.length + ')';
    
            DOMPosition.appendChild(fragment);
        }

        function setLittleDots(){

            for(var i=6; i<dots.length; i++){
    
                dots[i].classList.add('infinite-bg');
            }
        }

        function setStage(){
            for(var i=0; i<7; i++){
    
                dots[i].classList.add('staged');
            }
        }

        function updateStage(dir){

            var stageds = document.querySelectorAll('#' + section + ' .pagination .dots .staged');
            var yellowIndex = parseInt(document.querySelector('#' + section + ' .pagination .dots .current-bg').getAttribute('dot-index'));
            var dotsLine = document.querySelector('#' + section + ' .pagination .wrapper .dots');
    
            if(dir == 'next'){
    
                if(position > -(dots.length - 2) && stageds[5].classList.contains('current-bg')){
    
                    stageds[0].classList.remove('staged');
                    stageds[1].classList.add('infinite-bg');
                    dots[(yellowIndex + 2)].classList.add('staged');
                    dots[(yellowIndex + 1)].classList.remove('infinite-bg');
                    dots[(yellowIndex + 1)].classList.add('current-bg');
                    dots[yellowIndex].classList.remove('current-bg');
    
                    if(!dots[0].classList.contains('infinite-bg')){
                        dots[0].classList.add('infinite-bg');
                    }    
                    dotsLengthPosition--;
                    //dotsLine.style.transform = 'translateX(calc(calc(50vw / 7)*' + dotsLengthPosition + '))';
                    dotsLine.style.transform = 'translateX(calc(calc(' + stageWidth + 'vw / 7)*' + dotsLengthPosition + '))';    
                }
                if(position == -(dots.length - 3)){
                    dots[(yellowIndex + 2)].classList.remove('infinite-bg');
                }
    
                if(position >= -(dots.length - 2)){
                    dots[(yellowIndex + 1)].classList.add('current-bg');
                    dots[yellowIndex].classList.remove('current-bg');
                    position--;        
                }
            }
    
            if(dir == 'prev'){
    
                if(position < -1 && stageds[1].classList.contains('current-bg')){
                    stageds[6].classList.remove('staged');
                    stageds[5].classList.add('infinite-bg');
                    dots[(yellowIndex - 2)].classList.add('staged');
                    dots[(yellowIndex - 1)].classList.remove('infinite-bg');
                    dotsLengthPosition++;
                    //dotsLine.style.transform = 'translateX(calc(calc(50vw / 7)*' + dotsLengthPosition + '))';
                    dotsLine.style.transform = 'translateX(calc(calc(' + stageWidth + 'vw / 7)*' + dotsLengthPosition + '))';
                }
    
                if(position == -2){
                    dots[0].classList.remove('infinite-bg');
                }    
    
                if(position < 0){
                    dots[(yellowIndex - 1)].classList.add('current-bg');
                    dots[yellowIndex].classList.remove('current-bg');
                    position++;        
                }
            }
        }

        if(window.innerWidth < screen || screen == 'any'){

            btnPrev.addEventListener('click', function(){
                updateStage('prev');
            })
        
            btnNext.addEventListener('click', function(){
                updateStage('next');
            })
        
            buildPagination();
        
            if(items.length > 7){
                setLittleDots();
                setStage();
            }
        }

    };

    /* ************************************************************
    
    END | PAGINATION COMPONENT
    
    ************************************************************ */
    
    win.pagination = buildPagination;

        
})(window, document);