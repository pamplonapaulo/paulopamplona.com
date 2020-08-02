    <header class="header">

        <div class="logo">
            <a href="#">
                <img src="./assets/icons-logos/logo-white.svg" alt="Logo">
            </a>
        </div>

        <div class="section-title">
            <span class="thin"></span>
            <span class="thick"></span>
        </div>

        <a class="hamb-icon">
            <span></span>
        </a>

        <nav class="nav">

            <div class="social">

                <div class="linkedin">
                    <a href="https://www.linkedin.com/in/paulopamplona" target="_blank">
                        <img src="./assets/social/linkedin-black.svg" alt="LinkedIn">
                    </a>
                </div>

                <div class="github">
                    <a href="https://github.com/pamplonapaulo" target="_blank">
                        <img src="./assets/social/github.svg" alt="GitHub">
                    </a>
                </div>

                <div class="curriculum">
                    <a href="./assets/paulo-pamplona-curriculum.pdf" target="_blank">
                        <img src="./assets/social/curriculum.svg" alt="Curriculum Vitae PDF file">
                    </a>
                </div>

                <div class="whatsapp">
                    <a href="https://api.whatsapp.com/send?phone=5511993527916" target="_blank">
                        <img src="./assets/social/whatsapp.svg" alt="Direct message via Whatsapp">
                    </a>
                </div>


            
            </div>

            <div class="idioms">

                <a title="Português" href="#" class="flags langPT on">
                    <img src="./assets/icon-flags/pt.png" alt="Portuguese flag"/>
                </a>

                <a title="English" href="#" class="flags langEN">
                    <img src="./assets/icon-flags/uk.png" alt="English flag"/>
                </a>


                <div class="fancy-css-arrow">

                    <div class="edge-up"></div>
                    <div class="body-up"></div>
                    <div class="body-right"></div>
                    <div class="edge-right"></div>

                </div>

            </div>

            <!--It hacks a DOM layers issue at the visible html-->
            <div class="hiddenIdiomLinks" style="display: none;">
                <a href="?lang=pt"></a>
                <a href="?lang=en"></a>
            </div>


            <ul class="menu">

                <li><a href="#" data-subhighlight="<?php echo $timelineSub; ?>" data-scroll="0"><?php echo $timeline; ?></a></li>
                <li><a href="#" data-subhighlight="<?php echo $skillsSub; ?>" data-scroll="1"><?php echo $skills; ?></a></li>
                <li><a href="#" data-subhighlight="<?php echo $projectsSub; ?>" data-scroll="2"><?php echo $projects; ?></a></li>
                <li><a href="#" data-subhighlight="<?php echo $contactSub; ?>" data-scroll="3"><?php echo $contact; ?></a></li>

            </ul>
        </nav>

        <div id="overlay"></div>


    </header>