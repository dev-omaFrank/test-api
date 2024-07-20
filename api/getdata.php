<?php
  session_start();
  if ($_SERVER['REQUEST_METHOD'] === 'GET') {
      $username = isset($_SESSION['username']) ? $_SESSION['username'] : null;
      echo json_encode(["username" => $username, "message" => "This is an example of a GET request using PHP and JavaScript"]);
  }
?>
