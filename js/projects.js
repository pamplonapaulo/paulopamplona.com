(function(win){

    'use strict';

    var projects;
    var currentProject = 0;
    var idiom = currentLanguage;
    
    function loadProjects(){
        var ajax = new XMLHttpRequest();
        ajax.open('GET', './js/projects.json');
        ajax.send();
        var response = '';
        ajax.addEventListener('readystatechange', function(){
            if ( isRequestOk() ){

                try {
                    response = JSON.parse(ajax.responseText);    
                }
                catch(e) {
                    response = ajax.responseText;    
                }
                projects = response;

                win.projects = projects;

                switchWrappersOpacity(0);
        
                setTimeout(function(){ populateDOM(projects[currentProject]); }, 1500);
        
                setTimeout(function(){ animateElements('hide', .001); }, 1600);
        
                setTimeout(function(){ switchWrappersOpacity(1); }, 2400);
        
                setTimeout(function(){
                    setNavigation();
                    controlNavVisibility();
                }, 2500);

                setTimeout(function(){ includeUrlListeners(); }, 3550);
            } 
        }, false);

        function isRequestOk(){
            return ajax.readyState === 4 && ajax.status === 200;
        }
    }

    function populateDOM(project){

        buildImage(project.image);

        buildSingleSpan(project.title, 'title');
        buildSingleSpan(project.year, 'year');

        buildSpanBlock(project.text[idiom], 'text');
        buildSpanBlock(project.stack, 'stack');

        buildLink(project.url, 'siteUrl');
        buildLink(project.git, 'github');
    }

    function buildImage(image){

        var columns = document.querySelectorAll('.projects .bg-wrapper');

        for (var i=0; i< columns.length; i++){
            columns[i].style.backgroundImage = 'url(./assets/projects/' + image + ')';
        }
    }

    function buildSingleSpan(content, type){

        var wrapper = document.querySelector('.projects .' + type);
        var fragment = document.createDocumentFragment();

        var span = document.createElement('span');
        var b = document.createElement('b');

        b.innerHTML = content;

        span.appendChild(b);
        fragment.appendChild(span);    
        wrapper.appendChild(fragment);
    }

    function buildSpanBlock(content, type){

        var array = content.split(' ');

        var wrapper = document.querySelector('.projects .' + type);
        var fragment = document.createDocumentFragment();

        for (var i=0; i<array.length; i++){

            if(type == 'stack'){
                var p = document.createElement('p');
            }

            var span = document.createElement('span');
            var b = document.createElement('b');

            b.innerHTML = array[i];

            span.appendChild(b);

            if(type == 'stack'){
                p.appendChild(span);
                fragment.appendChild(p);    
            } else {
                fragment.appendChild(span);
            }
        }
        wrapper.appendChild(fragment);
    }

    function buildLink(link, type){

        var wrapper = document.querySelector('.project-link.' + type).parentElement;
        
        if(link == ' '){
            wrapper.style.display = 'none';
        } else {
            wrapper.style.display = 'block';
            var anchor = document.querySelector('.project-link.' + type).parentElement;
            anchor.setAttribute('href', link);
        }
    }

    function resetDOM(){

        resetElement('title');
        resetElement('year');
        resetElement('text');
        resetElement('stack');
    }

    function resetElement(selector){

        document.querySelector('.projects .' + selector).innerHTML = '';
    }

    function setNavigation(){

        var btnNext = document.querySelector('.projects-nav .nav-right-btn');
        var btnPrev = document.querySelector('.projects-nav .nav-left-btn');
        
        btnNext.addEventListener("click", function(){

            if(currentProject < (projects.length - 1)){
                currentProject++;
                changeProject();
                controlNavVisibility();
            }
        });

        btnPrev.addEventListener("click", function(){

            if(currentProject >= 1){
                currentProject--;
                changeProject();
                controlNavVisibility();
            }            
        });
    }

    function changeProject(){

        animateElements('hide', .5);

        setTimeout(function(){ switchWrappersOpacity(0); }, 1000);

        setTimeout(function(){ resetDOM(); }, 1000);

        setTimeout(function(){ populateDOM(projects[currentProject]); }, 1500);

        setTimeout(function(){ animateElements('hide', .001); }, 1500);

        setTimeout(function(){ switchWrappersOpacity(1); }, 2400);

        setTimeout(function(){ animateElements('show', .75); }, 2500);

    }

    function animateElements(fadeDirection, speed){

        var img = document.querySelectorAll('.project-img .col .bg-wrapper');
        var title = document.querySelector('.projects .title span b');
        var info = document.querySelectorAll('.project-info span b');

        var translationImg = img[0].parentElement.clientWidth;
        var translationTitle = -160;
        var translationIconsAndInfo = -80;
        var iconOpacity = 0;

        if(fadeDirection == 'show'){

            translationImg = 0;
            translationTitle = 0;
            translationIconsAndInfo = 0;
            iconOpacity = 1;
        }

        TweenMax.to(img, speed, {
            x: translationImg
        });

        TweenMax.to(title, speed, {
            y: translationTitle
        });

        if(window.innerWidth < 1024){

            var icons = document.querySelectorAll('.project-link');

            TweenMax.staggerTo(icons, speed, {
                opacity: iconOpacity
            }, .03);
        } else {

            var icons = document.querySelectorAll('.project-link img');

            TweenMax.staggerTo(icons, speed, {
                y: translationIconsAndInfo
            }, .03);
        }

        TweenMax.staggerTo(info, speed, {
            y: translationIconsAndInfo
        }, .02);
    }

    function switchWrappersOpacity(status){
        switchSingleWrapperOpacity('title', status);
        switchSingleWrapperOpacity('year', status);
        switchSingleWrapperOpacity('text', status);
        switchSingleWrapperOpacity('stack', status);
    }

    function switchSingleWrapperOpacity(selector, status){

        document.querySelector('.projects .' + selector).style.opacity = status;
    }

    function controlNavVisibility(){

        var btns = document.querySelectorAll('.projects-nav');

        if(currentProject == 0){
            btns[0].style.display = 'none';
        } else if((projects.length - 1) == currentProject){
            btns[1].style.display = 'none';
        } else {
            btns[0].style.display = 'block';
            btns[1].style.display = 'block';
        }
    }

    function includeUrlListeners(){
        
        var hasProjectsPageBeenViewed = false;

        window.addEventListener("hashchange", function(){
    
            if(location.hash == "#projects" && !hasProjectsPageBeenViewed){
    
                setTimeout(function(){ animateElements('show', .75); }, 750);
                
                hasProjectsPageBeenViewed = true;
            }
        });
        
        if(location.hash == "#projects" && !hasProjectsPageBeenViewed){

            setTimeout(function(){ 
                animateElements('show', .75);
            }, 4300);

            hasProjectsPageBeenViewed = true;
        }        
    }

    loadProjects();

    // window.addEventListener('DOMContentLoaded', (event) => {

    //     setTimeout(function(){

    //             pagination('projects', 'any', projects);

    //     }, 6000);

    // });    




})(window, document);