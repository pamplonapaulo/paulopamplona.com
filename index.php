<?php 
session_start();
include_once('pages/lang.php');
include_once('pages/includes/timeline-array.php');
include_once('pages/includes/skills-array.php');
include('pages/includes/form_process.php');

?>

<!DOCTYPE html>
<html lang="en">

    <?php include('pages/includes/head.php'); ?>

<body>

    <div id="loading" class="<?= $form_may_avoid_loading ?>">
        <div class="dancing-letters">        
            <span>l</span>
            <span>o</span>
            <span>a</span>
            <span>d</span>
            <span>i</span>
            <span>n</span>
            <span>g</span>
            <span>.</span>
            <span>.</span>
            <span>.</span>
        </div>

        <div class="author-presentation isFadedOut">        
            <span>p</span>
            <span>a</span>
            <span>u</span>
            <span>l</span>
            <span>o</span>
            <span>&nbsp;</span>
            <span>p</span>
            <span>a</span>
            <span>m</span>
            <span>p</span>
            <span>l</span>
            <span>o</span>
            <span>n</span>
            <span>a</span>
        </div>

        <div class="loading-bgs">
            <div class="loading-bg"></div>
            <div class="loading-bg"></div>
            <div class="loading-bg"></div>
            <div class="loading-bg"></div>
            <div class="loading-bg"></div>
            <div class="loading-bg"></div>
            <div class="loading-bg"></div>
            <div class="loading-bg"></div>
        </div>
    </div>

    <?php include('pages/includes/header.php'); ?>
    
    <?php include('pages/timeline.php'); ?>

    <?php include('pages/skills.php'); ?>

    <?php include('pages/projects.php'); ?>

    <?php include('pages/contact.php'); ?>

    <?php include('pages/includes/footer.php'); ?>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/plugins/ScrollToPlugin.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js"></script>

    <script type="text/javascript" src="./js/pagination.js"></script>
    <script type="text/javascript" src="./js/language-button.js"></script>
    <script type="text/javascript" src="./js/timeline-bgs.js"></script>
    <script type="text/javascript" src="./js/timeline-carousel.js"></script>
    <script type="text/javascript" src="./js/mobile-header.js"></script>
    <script type="text/javascript" src="./js/scrolling.js"></script>
    <script type="text/javascript" src="./js/skills.js"></script>
    <script type="text/javascript" src="./js/projects.js"></script>
    <script type="text/javascript" src="./js/hashListener.js"></script>
    <script type="text/javascript" src="./js/mobile-swiper.js"></script>
    <script type="text/javascript" src="./js/mobile-keyboard-issue.js"></script>
    <script type="text/javascript" src="./js/loader.js"></script>

</body>
</html>


