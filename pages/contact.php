    <section id="contact" class="contact">

        <div class="container">

            <article class="lead">

                <h6>&nbsp;</h6>

                <h1><?php echo $contactTitle; ?></h1>

                <p>
                    <span><?php echo $contactParagraph1; ?></span>
                    <span><?php echo $contactParagraph2; ?></span>
                    <span><?php echo $contactParagraph3; ?></span>
                </p>

            </article>

            <form class="<?= $form_status ?>" id="contactForm" action="<?= htmlspecialchars($_SERVER["PHP_SELF"]) ?>" method="post">

                <div class="success"><?= $success ?></div>

                <div class="wrapper">

                    <fieldset>
                        <input class="<?= $input_name_style ?>" placeholder="<?php echo $formName; ?>" type="text" name="name" value="<?php echo $valueName; ?>" tabindex="1">

                        <input class="<?= $input_email_style ?>" placeholder="<?php echo $formEmail; ?>" type="text" name="email" value="<?php echo $valueEmail; ?>" tabindex="2">

                        <input class="<?= $input_url_style ?>" placeholder="<?php echo $formUrl; ?>" type="text" name="url" value="<?php echo $valueUrl; ?>" tabindex="3">
                    </fieldset>

                    <fieldset>

                        <textarea class="<?= $input_message_style ?>" placeholder="<?php echo $formMessage; ?>" name="message" tabindex="4"><?php echo $valueMessage; ?></textarea>

                    </fieldset>

                </div>

                <button name="<?php echo $formSubmit; ?>" type="submit" id="contact-submit" data-submit="...Sending"><?php echo $formSubmit; ?></button>

            </form>

        </div>
        
    </section>