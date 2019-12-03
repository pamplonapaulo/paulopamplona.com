
(function(){

    'use strict';

    var prev;
    var next;

    var timelineArray;
    var position;
    var lengthTimeline;
    var itemsOnStage;

    setTimeout(function(){
        
        prev = document.querySelector('.timeline-nav .nav-left-btn');
        next = document.querySelector('.timeline-nav .nav-right-btn');
    
        timelineArray = document.querySelectorAll('.hero-slider ul');
        position = 0;
        lengthTimeline = timelineArray[0].querySelectorAll('li').length;
        itemsOnStage = 1;
                    
    }, 1000);

    function navVisibility(){

        if(position == 0){
            prev.style.opacity = 0;
            next.style.opacity = 1;
        } else if(position == (lengthTimeline - itemsOnStage)) {
            next.style.opacity = 0;
            prev.style.opacity = 1;
        } else {
            prev.style.opacity = 1;
            next.style.opacity = 1;
        }
    }

    function defineStageSize(){

        // Tablet screen
        if(window.innerWidth >= 760){
            itemsOnStage = 3;
        }

        // Desktop screen
        if(window.innerWidth >= 1024){
            itemsOnStage = 5;
            setSpecialMouseHover(selectStagedSlides());
        }
    }

    function setSpecialMouseHover(elContents){

        elContents[4].addEventListener('mouseover', squeezeExtremeLeft);
        elContents[4].addEventListener('mouseout', extendExtremeLeft);
    }

    function unsetSpecialMouseHover(elContents){

        elContents[4].removeEventListener('mouseover', squeezeExtremeLeft);
        elContents[4].removeEventListener('mouseout', extendExtremeLeft);
    }

    function squeezeExtremeLeft(){

        var itemOnExtremeLeft = document.querySelectorAll('.hero-slider-container li')[0];

        itemOnExtremeLeft.classList.add('squeezed');

        unsetHiddenDate();
    }

    function extendExtremeLeft(){

        var itemOnExtremeLeft = document.querySelectorAll('.hero-slider-container li')[0];

        itemOnExtremeLeft.classList.remove('squeezed');

        resetHiddenDate();
    }

    function unsetHiddenDate(){
    
        var stagedYears = selectYears();
        var stagedMonths = selectMonths();

        if(stagedYears[1].classList.contains('hidden')){
            stagedYears[1].classList.remove('hidden');
            stagedYears[1].classList.add('visibleOnHover');
        }
        if(stagedMonths[1].classList.contains('hidden')){
            stagedMonths[1].classList.remove('hidden');
            stagedMonths[1].classList.add('visibleOnHover');
        }
    }

    function resetHiddenDate(){
    
        var stagedYears = selectYears();
        var stagedMonths = selectMonths();

        if(stagedYears[1].classList.contains('visibleOnHover')){
            stagedYears[1].classList.remove('visibleOnHover');
            stagedYears[1].classList.add('hidden');
        }
        if(stagedMonths[1].classList.contains('visibleOnHover')){
            stagedMonths[1].classList.remove('visibleOnHover');
            stagedMonths[1].classList.add('hidden');
        }
    }

    // Date redundance preventer:

    function hideDateRedundance(staged){

        for(var i=0; i<staged.length; i++){

            if(staged[i+1]){

                if(staged[i].innerText == staged[i+1].innerText){
                        
                    staged[i+1].classList.add('hidden');                    
                } 
            }
            staged[0].classList.remove('hidden');
        }
    }

    // Staged elements selectors:

    function selectYears(){
        
        var stageYearsArray = [];
        var elementIndex = position;
        var yearsArray = document.querySelectorAll('.hero-slider-year h2');

        for(var i=0; i<itemsOnStage; i++){  
            stageYearsArray.push(yearsArray[elementIndex]);
            elementIndex++;
        }
        return stageYearsArray;
    }

    function selectMonths(){
        
        var stageYearsArray = [];
        var elementIndex = position;
        var yearsArray = document.querySelectorAll('.hero-slider-month h2');

        for(var i=0; i<itemsOnStage; i++){  
            stageYearsArray.push(yearsArray[elementIndex]);
            elementIndex++;
        }
        return stageYearsArray;
    }

    function selectStagedSlides(){
        
        var stageContentsArray = [];
        var elementIndex = position;
        var contentArray = document.querySelectorAll('.hero-slider-container li');

        for(var i=0; i<itemsOnStage; i++){  
            stageContentsArray.push(contentArray[elementIndex]);
            elementIndex++;
        }

        return stageContentsArray;
    }

    function moveTimeline(timelineArray){

        for(var i=0; i<timelineArray.length; i++){

            timelineArray[i].style.transform = 'translateX(calc(calc(-90vw/' + itemsOnStage + ')*' + position + '))';    
        }
    }

    setTimeout(function(){
        
        defineStageSize();
        navVisibility();
        hideDateRedundance(selectYears());
        hideDateRedundance(selectMonths());
                
    }, 1200);

    setTimeout(function(){

        prev.addEventListener('click', function(){
            
            if(position > 0){
                if(window.innerWidth >= 1024){
                    unsetSpecialMouseHover(selectStagedSlides());
                }    

                position--;
                moveTimeline(timelineArray);
                hideDateRedundance(selectYears());
                hideDateRedundance(selectMonths());

                if(window.innerWidth >= 1024){
                    setSpecialMouseHover(selectStagedSlides());
                }
                navVisibility();    
            }    
        });

        next.addEventListener('click', function(){

            if(position < (lengthTimeline - itemsOnStage)){
                if(window.innerWidth >= 1024){
                    unsetSpecialMouseHover(selectStagedSlides());
                }    

                position++;
                moveTimeline(timelineArray);
                hideDateRedundance(selectYears());
                hideDateRedundance(selectMonths());

                if(window.innerWidth >= 1024){
                    setSpecialMouseHover(selectStagedSlides());
                }
                navVisibility();    
            }
        });

    }, 4000);

    pagination('timeline', 768);

})(document, window.pagination);