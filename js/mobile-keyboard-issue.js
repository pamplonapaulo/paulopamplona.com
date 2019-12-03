(function (){

    'use strict';

    if(window.innerWidth < 768){

        var formInputs = document.querySelectorAll('#contact form fieldset input');
        var textArea = document.querySelector('#contact form fieldset textarea');
        var listeners = [];

        for(var i = 0; i<formInputs.length; i++){

            listeners.push(formInputs[i]);
        }

        listeners.push(textArea);

        for(var i = 0; i<listeners.length; i++){
        
            listeners[i].addEventListener('focus', function(){

                document.querySelector('#contact-submit').classList.add('hidden-ux-btn')
                document.querySelector('footer').style.display = 'none';
                document.querySelector('#contact').style.height = 'auto';

                hideAllInputs();
                showSingleInput(event.target);
            })
        }

        function showSingleInput(elementOnUse){

            elementOnUse.classList.remove('hidden-ux');

            updateMessage(elementOnUse);

            isLastField(elementOnUse);
        }

        function hideAllInputs(){

            for(var i = 0; i<listeners.length; i++){

                listeners[i].classList.add('hidden-ux');

            }
        }

        function isLastField(element){
            
            if(element.parentElement.querySelector('textarea')){
                document.querySelector('#contact-submit').classList.remove('hidden-ux-btn')
            }
            
        }

        function onSubmitt(){

            document.querySelector('footer').style.display = 'block';
            document.querySelector('#contact').style.height = '100vh';

            for(var i = 0; i<listeners.length; i++){
                listeners[i].classList.remove('hidden-ux');
            }
        }

        function updateMessage(fieldFocused){

            var text = fieldFocused.getAttribute('placeholder').toUpperCase() + ':';

            var display = document.querySelector('#contact .lead p span:nth-of-type(2)');

            var wrapper = document.querySelector('#contact .wrapper');
            wrapper.style.marginTop = '0';

            display.style.marginBottom = "10px";
            display.innerHTML = text;
        }
    }   

})();