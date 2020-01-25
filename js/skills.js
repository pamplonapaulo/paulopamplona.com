(function(){

    'use strict';

    var prev = document.querySelector('.skills-nav .nav-left-btn');
    var next = document.querySelector('.skills-nav .nav-right-btn');

    var skillsWrapper = document.querySelector('.skills ul');
    var position = 0;
    var skills = skillsWrapper.querySelectorAll('li');
    var itemsOnStage = 1;

    defineStageSize();

    function navVisibility(){

        if(position == 0){
            prev.style.display = 'none';
            next.style.display = 'block';
        } else if((position + itemsOnStage) == skills.length) {
            next.style.display = 'none';
            prev.style.display = 'block';
        } else {
            prev.style.display = 'block';
            next.style.display = 'block';
        }
    }

    navVisibility();

    function defineStageSize(){

        // Tablet screen
        if(window.innerWidth >= 760){
            itemsOnStage = 2;
        }

        // Desktop screen
        if(window.innerWidth >= 1024){
            itemsOnStage = 4;
        }
    }

    // Navigation Buttons:
    prev.addEventListener('click', function(){
        position--;
        moveSkills();
        navVisibility();    
    });

    next.addEventListener('click', function(){
        position++;
        moveSkills();
        navVisibility();
    });

    function moveSkills(){

        var unit = skillsWrapper.querySelectorAll('li')[0].clientWidth;

        if(itemsOnStage == 1){
            skillsWrapper.style.transform = 'translateX(calc(-67.5vw * ' + position + '))';
        }
        
        if(itemsOnStage == 2){
            skillsWrapper.style.transform = 'translateX(calc((35vw + 5vw + 2px) * -' + position + '))';
        }

        if(itemsOnStage == 4){

            if((position + itemsOnStage) == skills.length){
                skillsWrapper.style.transform = 'translateX(calc(calc(-' + unit + 'px - 1.2vw) * ' + (position - 0.5) + '))';
            } else if(position >= 0) {
                skillsWrapper.style.transform = 'translateX(calc(calc(-' + unit + 'px - 1.2vw) * ' + position + '))';
            } else if(position == -1){
                position++
            }
        }
    }

    if(window.innerWidth < 1024){

        for(var i=0; i<skills.length; i++){

            skills[i].addEventListener('click', function(event){
                activeSkill(event.target);
            })
        }

        function activeSkill(skillHeader){

            var skillBody = skillHeader.childNodes[1].childNodes[13]; 
            var isActive = skillBody.classList.contains('onDelay');

            if(getIndex(skillHeader) != position){

                next.click();

                if(getIndex(skillHeader) != position){

                    next.click();
                }
            }

            if(isActive){

                skillBody.classList.toggle('onDelay');

                setTimeout(function(){

                    skillHeader.classList.toggle('on');
                
                }, 300);

            } else {

                skillHeader.classList.toggle('on');

                setTimeout(function(){

                    skillBody.classList.toggle('onDelay');
                
                }, 300);                   
            }
        }

        function getIndex(clickedSkill){

            return clickedSkill.getAttribute('data-index');
        }
    }

    setTimeout(function(){

        //document.querySelector('#skills .pagination').style.width = '100vw';
        //document.querySelector('#skills .pagination').style.transform = 'translateY(-250%)';
        // pagination('skills', 768);

    }, 3000);
    
})();