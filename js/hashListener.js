(function (){

    'use strict';

    var isTimelineFirstView = true;
    var isSkillsFirstView = true;

    function induceMobileSwiping(idSelector, duration, waveViolence, time){

        setTimeout(function(){

            var wrapper = document.querySelector(idSelector + ' ul');

            TweenMax.fromTo(wrapper, duration,

                {
                    x: -300,
                    ease: Elastic.easeOut.config(1.1, waveViolence)
                },

                {
                    x: 0,
                    ease: Elastic.easeOut.config(1.1, waveViolence)
                }
            );

        }, time);
    }

    window.addEventListener("hashchange", function(){
    
        if(window.innerWidth < 1024 && location.hash == "#timeline" && isTimelineFirstView){
            isTimelineFirstView = false;
            induceMobileSwiping('#timeline', 2, 0.15, 1500);
        }

        if(window.innerWidth < 1024 && location.hash == "#skills" && isSkillsFirstView){
            isSkillsFirstView = false;
            induceMobileSwiping('#skills', 2, 0.3, 1500);
        }
    });
    
    if(window.innerWidth < 1024 && location.hash == "#timeline" && isTimelineFirstView){
        isTimelineFirstView = false;
        induceMobileSwiping('#timeline', 2, 0.15, 10000);
    }
    
    if(window.innerWidth < 1024 && location.hash == "#skills" && isSkillsFirstView){
        isSkillsFirstView = false;
        induceMobileSwiping('#skills', 2, 0.3, 10000);
    } 

})();