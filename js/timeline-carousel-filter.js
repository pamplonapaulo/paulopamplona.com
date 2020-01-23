// (function(){

//     'use strict';

//     const filterBtn = document.querySelector('#show-filters-btn');
//     const filterMenu = document.querySelector('.bg-cover');

//     filterBtn.addEventListener('click', function(){
//         filterMenu.classList.toggle('visible');
//     });

//     const labels = document.querySelectorAll('#timeline [type=\"checkbox\"]');
//     const lifeEvents = document.querySelectorAll('#timeline .hero-slider-container li');

//     for(let i = 0; i < labels.length; i++){
//         labels[i].addEventListener('click', function(){
//             toggleLifeEventState(labels[i].getAttribute('value'));
//         })
//     }

//     function toggleLifeEventState(lifeEventType){

//         for(let i=0; i<lifeEvents.length; i++){

//             if(lifeEvents[i].classList.contains(lifeEventType)){

//                 lifeEvents[i].classList.toggle('unchecked');
//             }
//         }        
//     }

//     function startTimeline(){

//         for(let i = 0; i < labels.length; i++){

//             if(labels[i].getAttribute('checked') == null){
//                 toggleLifeEventState(labels[i].getAttribute('value'));
//             }
//         }
//     }

//     startTimeline();

// })();