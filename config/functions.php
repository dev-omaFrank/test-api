<?php
  function check_input($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }

  function validate_input(){
    echo 'validatre emial here';
  }
?>