<?php 
// MailGun
require 'vendor/autoload.php';
use Mailgun\Mailgun;
$mg = Mailgun::create('hidden here on github');
$domain = "mg.paulopamplona.com";


// define variables and set to empty values
$name_error = $email_error = $url_error = $message_error = "";
$name = $email = $message = $url = $success = "";

//form is submitted with POST method
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  if (empty($_POST["name"])) {
    $name_error = $lang_name_required;
    $formName = $lang_name_required; 
    $input_name_style = "red-color"; 
  } else {
    $name = test_input($_POST["name"]);
    // check if name only contains letters and whitespace
    if (!preg_match("/^[a-zA-Z ]*$/",$name)) {
      $name_error = $lang_name_error;
      $input_name_style = "red-color"; 
    }
  }

  if (empty($_POST["email"])) {
    $email_error = $lang_email_required;
    $formEmail = $lang_email_required; 
    $input_email_style = "red-color"; 
  } else {
    $email = test_input($_POST["email"]);
    // check if e-mail address is well-formed
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $email_error = $lang_email_error;
        $input_email_style = "red-color";  
    }
  }

  if (empty($_POST["url"])) {
    $url_error = "";
  } else {
    $url = test_input($_POST["url"]);
    // check if URL address syntax is valid (this regular expression also allows dashes in the URL)
    if (!preg_match("/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i",$url)) {
        $url_error = $lang_url_error;
        $input_url_style = "red-color"; 
    }
  }

  if (empty($_POST["message"])) {
    $message_error = $lang_message_required;
    $formMessage = $lang_message_required; 
    $input_message_style = "red-color"; 

  } else {
    $message = test_input($_POST["message"]);
  }
  
  if ($name_error == '' and $email_error == '' and $url_error == '' and $message_error == ''){
      $message_body = '';
      unset($_POST['submit']);
      foreach ($_POST as $key => $value){
          $message_body .=  "$key: $value\n";
      }
      

      /*
      $mg->messages()->send('mg.paulopamplona.com', [
        'from'    => 'mailgun@mg.paulopamplona.com',
        'to'      => 'pamplonapaulo@gmail.com',
        'subject' => 'The PHP SDK is awesome!',
        'text'    => 'It is so simple to send a message.'
      ]);
      */

      $sent = $mg->messages()->send('mg.paulopamplona.com', [
        'from'    => 'mailgun@mg.paulopamplona.com',
        'to'      => 'pamplonapaulo@gmail.com',
        'subject' => '*** HURRY! | PAULOPAMPLONA.COM | CONTACT',
        'text'    => $message_body
      ]);

      if($sent)
      {
        $form_may_avoid_loading = 'loading-off';
        $contactTitle = $lang_title_success;
        $contactParagraph2 = $lang_paragraph_success;
        $name = $email = $message = $url = '';
        $form_status = "hide-form just-used";
      }

      /*
      $to = 'pamplonapaulo@gmail.com';
      $subject = 'Contact Form Submit';
      if (mail($to, $subject, $message_body)){

          $form_may_avoid_loading = 'loading-off';
          $contactTitle = $lang_title_success;
          $contactParagraph2 = $lang_paragraph_success;
          $name = $email = $message = $url = '';
          $form_status = "hide-form just-used";
      }
      */

  } else {

    $form_may_avoid_loading = 'loading-off';
    $contactTitle = $lang_title_error;
    $contactParagraph2 = $lang_paragraph_error;

    if($name_error == ''){
        $valueName = $name;
    }
    if($email_error == ''){
        $valueEmail = $email;
    }
    if($url_error == ''){
        $valueUrl = $url;
    }
    if($message_error == ''){
        $valueMessage = $message;
    }

    $form_status = "just-used";

  }
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}