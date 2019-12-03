<section id="timeline" class="hero-image">

        <div class="hero-slider">

            <ul class="hero-slider-container">

                <?php foreach ($timelineItems as $eventIndex => $lifeEvent) { ?>

                    <li data-index="<?php echo $eventIndex; ?>">

                        <div class="hero-slider-year">
                            <h2 data-index="<?php echo $eventIndex; ?>" class="loader-hack"><?php echo $lifeEvent[year]?></h2>
                        </div>
                        
                        <div class="hero-slider-month">
                            <h2 data-index="<?php echo $eventIndex; ?>"><?php echo $lifeEvent[month]?></h2>
                        </div>
                        
                        <div class="hero-slider-content">
                            <h2><?php echo $lifeEvent[type]?></h2>

                                <?php foreach ($lifeEvent[bgImage] as $bgIndex => $bgImage) {

                                    if($bgImage != ""){

                                        echo '<i class="material-icons" data-hover="' . $bgImage . '">image</i>';
                                    }
                                    
                                } ?>

                            <h1><?php echo $lifeEvent[content]?></h1>

                            <?php 

                                if($lifeEvent[link] != ""){

                                    echo '<a class="hero-slider-btn" href="' . $lifeEvent[link] . '" target="_blank">github</a>';

                                }
                            ?>

                        </div>

                    </li>

                <?php } ?>

            </ul>

        </div>

        <div class="pagination">
            <div class="wrapper">
                <div class="dots">

                </div>
            </div>
        </div>  

    </section>

    <div class="timeline-nav hero-nav">
        <div class="nav-left-btn fl-left clear-l">
            <h2 class="">&nbsp;</h2>
            <!-- <h2 class="">&nbsp;</h2> -->
            <div class="fl-right">
                <div class="wrapper">
                    <span style="float: right;"></span>
                </div>
            </div>
        </div>
    </div>

    <div class="timeline-nav hero-nav on-right">
        <div class="nav-right-btn fl-right clear-r">
            <h2 class="">&nbsp;</h2>
            <!-- <h2 class="">&nbsp;</h2> -->
            <div class="fl-left mirror-h">
                <div class="wrapper">
                    <span style="float: right;"></span>
                </div>
            </div>
        </div>
    </div>