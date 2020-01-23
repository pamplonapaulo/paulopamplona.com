<section id="timeline" class="hero-image">

    <form>

        <button id="show-filters-btn"><?= 'Filter'; ?></button>

<?php

    function convertEventType($eventType) {

        if($eventType == 'projeto paralelo' || $eventType == 'side project')
            echo 'side-project';
        if($eventType == 'educação' || $eventType == 'education')
            echo 'education';
        if($eventType == 'profissional' || $eventType == 'professional')
            echo 'professional';
        if($eventType == 'chapéu de cliente' || $eventType == 'client\'s hat')
            echo 'client';
        if($eventType == 'pessoal' || $eventType == 'personal')
            echo 'personal';
        if($eventType == 'projeto acadêmico' || $eventType == 'acedemic project')
            echo 'academic';
    }

?>

        <div class="bg-cover">

            <fieldset>
                <input type="checkbox" id="side-project" name="side-project" value="side-project" tabindex="1" checked>
                <label for="side-project"><?= $side; ?></label>
            </fieldset>

            <fieldset>
                <input type="checkbox" id="professional" name="professional" value="professional" tabindex="2" checked>
                <label for="professional"><?= $pro; ?></label>
            </fieldset>
        
            <fieldset>
                <input type="checkbox" id="personal" name="personal" value="personal" tabindex="3" >
                <label for="personal"><?= $per; ?></label>
            </fieldset>
        
            <fieldset>
                <input type="checkbox" id="education" name="education" value="education" tabindex="4" >
                <label for="education"><?= $edu; ?></label>
            </fieldset>
        
            <fieldset>
                <input type="checkbox" id="academic" name="academic" value="academic" tabindex="5" >
                <label for="academic"><?= $academy; ?></label>
            </fieldset>
        
            <fieldset>
                <input type="checkbox" id="client" name="client" value="client" tabindex="6" >
                <label for="client"><?= $client; ?></label>
            </fieldset>

        </div>
    
    </form>

    <div class="hero-slider">

        <ul class="hero-slider-container">

            <?php foreach ($timelineItems as $eventIndex => $lifeEvent) { ?>

                <li data-index="<?= $eventIndex ?>" class="<?php convertEventType($lifeEvent[type]); ?>">

                    <div class="hero-slider-year">
                        <h2 data-index="<?= $eventIndex; ?>" class="loader-hack"><?php echo $lifeEvent[year]; ?></h2>
                    </div>
                    
                    <div class="hero-slider-month">
                        <h2 data-index="<?= $eventIndex; ?>"><?php echo $lifeEvent[month]; ?></h2>
                    </div>
                    
                    <div class="hero-slider-content">
                        <h2><?= $lifeEvent[type]; ?></h2>

                            <?php foreach ($lifeEvent[bgImage] as $bgIndex => $bgImage) {

                                if($bgImage != ""){

                                    echo '<i class="material-icons" data-hover="' . $bgImage . '">image</i>';
                                }
                                
                            } ?>

                        <h1><?= $lifeEvent[content]?></h1>

                        <?php 

                            if($lifeEvent[link] != ""){

                                if($lifeEvent[link][0] != ""){

                                    echo '<a class="hero-slider-btn" href="' . $lifeEvent[link][0] . '" target="_blank">github</a>';

                                }

                                if($lifeEvent[link][1] != ""){

                                    echo '<a class="hero-slider-btn" href="' . $lifeEvent[link][1] . '" target="_blank">site</a>';

                                }
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