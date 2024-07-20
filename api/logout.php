<?php
  include_once '../core/initialize.php';
  session_start();
  $post = new Post($dbconn);
  $logout = $post->logout();
?>