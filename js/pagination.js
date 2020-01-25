(function (){

    'use strict';

    /* ************************************************************
    
    PAGINATION COMPONENT
    
    ************************************************************ */

    function pagination(section, screen){

        const btnPrev = document.querySelector('.' + section + '-nav .nav-left-btn');
        const btnNext = document.querySelector('.' + section + '-nav .nav-right-btn');

        let optionalJSON = arguments[2];
        let items;

        let dots;
        let position = 0;
        let dotsLengthPosition = 0;
        let stageWidth = 50;

        function resetPositionBtns(section){

            if(section == 'timeline'){

                const filters = document.querySelectorAll('#timeline [type=\"checkbox\"]');

                for(let i = 0; i < filters.length; i++){
                    filters[i].addEventListener('click', function(){
                        position = 0;
                    })
                }
            }
        }

        resetPositionBtns(section);

        function setItemsArray(itemsFromJson){

            if(itemsFromJson){
                items = itemsFromJson;
            } else {
                items = document.querySelectorAll('#' + section + ' ul li:not(.unchecked)');
            }
        }

        if(window.innerWidth >= 1024){
            stageWidth = 20;
        }
    
        function buildPagination(items){

            appendPaginationFragment(items);
            placePaginationClasses(items);
        }

        function appendPaginationFragment(items){

            for(let i=0; i<items.length; i++){

                let fragment = document.createDocumentFragment();
    
                let div = document.createElement('div');
                div.classList.add('item');
                div.setAttribute('dot-index', i);
        
                let span = document.createElement('span');
        
                div.appendChild(span);
                fragment.appendChild(div);
    
                let DOMPosition = document.querySelector('#' + section + ' .pagination .dots');
    
                DOMPosition.style.width = 'calc(calc(50vw / 7)*' + items.length + ')';
        
                DOMPosition.appendChild(fragment);    
            }            
        }

        function placePaginationClasses(items){

            let dots = document.querySelectorAll('#' + section + ' .pagination .item');
            dots[position].classList.add('current-bg');
    
            if(items.length > 7){
                for(let i=6; i<dots.length; i++){
                    dots[i].classList.add('infinite-bg');
                }
    
                for(let i=0; i<7; i++){
                    dots[i].classList.add('staged');
                }
            } else {
                for(let i=0; i<items.length; i++){
                    dots[i].classList.add('staged');
                }
            }
        }

        function updateStage(dir){

            dots = document.querySelectorAll('#' + section + ' .pagination .item');

            let stageds = document.querySelectorAll('#' + section + ' .pagination .dots .staged');
            let yellowIndex = parseInt(document.querySelector('#' + section + ' .pagination .dots .current-bg').getAttribute('dot-index'));            

            function addDotClass(element, className){
                element.classList.add(className);
            }

            function removeDotClass(element, className){
                element.classList.remove(className);
            }

            function moveDots(dir){

                let dotsLine = document.querySelector('#' + section + ' .pagination .wrapper .dots');

                if(dir == 'next'){
                    dotsLengthPosition--;
                } else if(dir == 'prev'){
                    dotsLengthPosition++;
                }
                dotsLine.style.transform = 'translateX(calc(calc(' + stageWidth + 'vw / 7)*' + dotsLengthPosition + '))';
            }

            function moveYellowDot(dir){
                if(dir == 'next'){
                    addDotClass(dots[(yellowIndex + 1)], 'current-bg');
                    removeDotClass(dots[yellowIndex], 'current-bg');
                } else if(dir == 'prev'){
                    addDotClass(dots[(yellowIndex - 1)], 'current-bg');
                    removeDotClass(dots[yellowIndex], 'current-bg');
                }
            }

            if(dir == 'next'){
    
                if(stageds.length > 5 && position > -(dots.length - 2) && stageds[5].classList.contains('current-bg')){

                    removeDotClass(stageds[0], 'staged');
                    addDotClass(stageds[1], 'infinite-bg');
                    addDotClass(dots[(yellowIndex + 2)], 'staged');
                    removeDotClass(dots[(yellowIndex + 1)], 'infinite-bg');

                    moveYellowDot(dir);

                    if(!dots[0].classList.contains('infinite-bg')){
                        addDotClass(dots[0], 'infinite-bg');
                    }
                    moveDots(dir);    
                }

                if(position == -(dots.length - 3)){
                    removeDotClass(dots[(yellowIndex + 2)], 'infinite-bg');
                }
    
                if(position >= -(dots.length - 2)){
                    moveYellowDot(dir);
                    position--;   
                }
            }
    
            if(dir == 'prev'){
                
                if(position < -1 && stageds[1].classList.contains('current-bg')){
                    removeDotClass(stageds[6], 'staged');
                    addDotClass(stageds[5], 'infinite-bg');
                    addDotClass(dots[(yellowIndex - 2)], 'staged');
                    removeDotClass(dots[(yellowIndex - 1)], 'infinite-bg');
                    moveDots(dir);    
                }
    
                if(position == -2){
                    removeDotClass(dots[0], 'infinite-bg');
                }    
    
                if(position < 0){
                    moveYellowDot(dir);
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

            if(section != 'timeline'){
                setItemsArray(optionalJSON);
                buildPagination(items);
            }
        }
    };


    /* ************************************************************
    
    END | PAGINATION COMPONENT
    
    ************************************************************ */
    
    setTimeout(function(){
        pagination('timeline', 768);    
        pagination('skills', 768);

    }, 3000);

    window.addEventListener('DOMContentLoaded', (event) => {

        setTimeout(function(){
                pagination('projects', 'any', projects);
        }, 6000);
    });  
        
})(document, window.projects);