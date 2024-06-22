<?php
  session_start();
  echo 'test.php page</br>';
  if (isset($_SESSION['username'])) {
    var_dump($_SESSION);
    echo 'session is set';
  }else {
    echo 'session is not set';
    header('Location:../index.html');
  }
?>