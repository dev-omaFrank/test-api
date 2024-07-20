<?php
  include_once '../core/initialize.php';
    $email = $password = '';
    if ($_SERVER["REQUEST_METHOD"] == "POST"){
      $username = check_input($_POST['username']);
      $password = check_input($_POST['password']);
      if ($username == '' || $password == '') {
        echo json_encode(["success" => false, "message" => "Field(s) cannot be empty"]);
    }else {
      $post = new Post($dbconn);
      $result = $post->sign_in($username, $password);
    }
  }
?>