<?php

function console_log($output, $with_script_tags = true) {
    $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) . 
');';
    if ($with_script_tags) {
        $js_code = '<script>' . $js_code . '</script>';
    }
    echo $js_code;
}

echo console_log(' ');
echo console_log('$_SESSION[\'lang\']');
echo console_log($_SESSION['lang']);
echo console_log(' ');
echo console_log('$_GET[\'lang\']');
echo console_log($_GET['lang']);
echo console_log(' ');


if(isset($_GET['lang']) && $_GET['lang']=='pt'){
    unset($_SESSION['lang']);
    $_SESSION['lang']=true;
    $_SESSION['lang']='pt';
}

if(isset($_GET['lang']) && $_GET['lang']=='en'){
    unset($_SESSION['lang']);
    $_SESSION['lang']=true;
    $_SESSION['lang']='en';
}

if(!isset($_GET['lang']) && !isset($_SESSION['lang'])){
    include_once('lang/en.php');
}

if(isset($_SESSION['lang']) && $_SESSION['lang']=='pt'){
    include_once('lang/pt.php');
}

if(isset($_SESSION['lang']) && $_SESSION['lang']=='en'){
    include_once('lang/en.php');
}

?>

