<?php
  define('ROOT_DIR',  dirname(__DIR__));
  define('CONFIG_PATH', ROOT_DIR. '/config');
  define('CORE_PATH', ROOT_DIR. '/core');

  require CONFIG_PATH . "/config.php";
  require CONFIG_PATH . "/functions.php";
  require_once CORE_PATH . '/post.php';
?>

