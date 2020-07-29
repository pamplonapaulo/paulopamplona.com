<section id="skills" class="skills">

        <ul>

            <?php 

                $indexCounter = 0;
            
                foreach ($skillsItems as $skills => $item) { ?>

                <li class="<?php echo $item[cssClass]?>" data-index="<?php echo $indexCounter++ ?>" data-image="<?php echo $item[bgImage]?>">
                    <div class="skill-wrapper">
                        <h1><?php echo $item[title]?></h1>
                        <i class="material-icons"><?php echo $item[rating1]?></i>
                        <i class="material-icons"><?php echo $item[rating2]?></i>
                        <i class="material-icons"><?php echo $item[rating3]?></i>
                        <i class="material-icons"><?php echo $item[rating4]?></i>
                        <i class="material-icons"><?php echo $item[rating5]?></i>
                        <div class="skill-comments">
                            <p><?php echo $item[p1]?></p>
                            <p><?php echo $item[p2]?></p>
                            <p><?php echo $item[p3]?></p>
                            <p><?php echo $item[p4]?></p>
                        </div>
                    </div>
                </li>

            <?php } ?>

        </ul>

        <div class="pagination">
            <div class="wrapper">
                <div class="dots">

                </div>
            </div>
        </div>  

    </section>

    <div class="skills-nav hero-nav">
        <div class="nav-left-btn fl-left clear-l">
            <div class="fl-right">
                <div class="wrapper">
                    <span style="float: right;"></span>
                </div>
            </div>
        </div>
    </div>

    <div class="skills-nav hero-nav on-right">
        <div class="nav-right-btn fl-right clear-r">
            <div class="fl-left mirror-h">
                <div class="wrapper">
                    <span style="float: right;"></span>
                </div>
            </div>
        </div>
    </div>

    <script>
        (function(){
            'use strict'

            setTimeout(() => {

                if(window.innerWidth < 678) {
                    var folder = 'mobile'
                }

                if(window.innerWidth >= 678 && window.innerWidth < 1024) {
                    var folder = 'tablet'
                }

                if(window.innerWidth >= 1024) {
                    var folder = 'desktop'
                }

                var items = document.querySelectorAll('#skills ul li')

                for(var i = 0; i < items.length; i++){
                    var fileName = items[i].getAttribute('data-image')
                    items[i].setAttribute('style', 'background-image: url(\'./assets/skills/' + folder + '/' + fileName + '\');')
                }

            }, 2000);

        })();
    </script>
