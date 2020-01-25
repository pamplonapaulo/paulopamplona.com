
(function(){

    'use strict';

    var timelineArray = document.querySelectorAll('.hero-slider ul');
    var position = 0;
    var lengthTimeline;
    var itemsOnStage = 1;
    var prev = document.querySelector('.timeline-nav .nav-left-btn');
    var next = document.querySelector('.timeline-nav .nav-right-btn');

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




    /* * * * * * * * * * * * * * * * *
    *                                 *
    *  Timeline event type filter     *
    *                                 *
    * * * * * * * * * * * * * * * * * */

    const filterBtn = document.querySelector('#show-filters-btn');
    const filterMenu = document.querySelector('.bg-cover');

    filterBtn.addEventListener('click', function(){
        filterMenu.classList.toggle('visible');
    });

    const labels = document.querySelectorAll('#timeline [type=\"checkbox\"]');
    const lifeEvents = document.querySelectorAll('#timeline .hero-slider-container li');

    // Checkboxes listener
    for(let i = 0; i < labels.length; i++){
        labels[i].addEventListener('click', function(){
            toggleLifeEventState(labels[i].getAttribute('value'));
        })
    }

    function toggleLifeEventState(lifeEventType){

        for(let i=0; i<lifeEvents.length; i++){

            if(lifeEvents[i].classList.contains(lifeEventType)){

                lifeEvents[i].classList.toggle('unchecked');
            }
        }

        lengthTimeline = timelineArray[0].querySelectorAll('li:not(.unchecked)').length;

        position = 0;
        prev.style.opacity = 0;

        if(timelineArray[0].querySelectorAll('li:not(.unchecked)').length <= itemsOnStage){
            next.style.opacity = 0;
        } else {
            next.style.opacity = 1;
        }

        moveTimelineULElement(timelineArray);
        hideDateRedundance(selectYears());
        hideDateRedundance(selectMonths());

        if(window.innerWidth < 1024){
            resetPagination();
        }
    }

    function startTimeline(){

        for(let i = 0; i < labels.length; i++){

            if(labels[i].getAttribute('checked') == null){
                toggleLifeEventState(labels[i].getAttribute('value'));
            }
        }
    }

    // Trigged by checkbox changes:
    function resetPagination(){

        let items = document.querySelectorAll('#timeline ul li:not(.unchecked)');

        function wipeOutOldHTML(){

            document.querySelector("#timeline .pagination .dots").innerHTML = '';
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
    
                let DOMPosition = document.querySelector('#timeline .pagination .dots');
    
                DOMPosition.style.width = 'calc(calc(50vw / 7)*' + items.length + ')';

                DOMPosition.appendChild(fragment);
            }
        }

        function replacePaginationClasses(items){

            let dots = document.querySelectorAll('#timeline .pagination .item');
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

        function rewindWrapper(){
            let dotsLine = document.querySelector('#timeline .pagination .wrapper .dots');
            dotsLine.style.transform = 'translateX(0)';
        }

        wipeOutOldHTML();

        appendPaginationFragment(items);

        replacePaginationClasses(items);

        rewindWrapper();
    }

    setTimeout(function(){
        
        startTimeline();

        lengthTimeline = timelineArray[0].querySelectorAll('li:not(.unchecked)').length;
                            
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
        var yearsArray = document.querySelectorAll('li:not(.unchecked) .hero-slider-year h2');

        for(var i=0; i<itemsOnStage; i++){  
            stageYearsArray.push(yearsArray[elementIndex]);
            elementIndex++;
        }
        return stageYearsArray;
    }

    function selectMonths(){
        
        var stageYearsArray = [];
        var elementIndex = position;
        var yearsArray = document.querySelectorAll('li:not(.unchecked) .hero-slider-month h2');

        for(var i=0; i<itemsOnStage; i++){  
            stageYearsArray.push(yearsArray[elementIndex]);
            elementIndex++;
        }
        return stageYearsArray;
    }

    function selectStagedSlides(){
        
        var stageContentsArray = [];
        var elementIndex = position;
        var contentArray = document.querySelectorAll('.hero-slider-container li:not(.unchecked)');

        for(var i=0; i<itemsOnStage; i++){  
            stageContentsArray.push(contentArray[elementIndex]);
            elementIndex++;
        }
        return stageContentsArray;
    }

    function moveTimelineULElement(timelineArray){

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
                moveTimelineULElement(timelineArray);
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
                moveTimelineULElement(timelineArray);
                hideDateRedundance(selectYears());
                hideDateRedundance(selectMonths());

                if(window.innerWidth >= 1024){
                    setSpecialMouseHover(selectStagedSlides());
                }
                navVisibility();    
            }
        });

    }, 4000);

})();