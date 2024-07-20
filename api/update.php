<?php
 include_once '../core/initialize.php';
 $username = $password = $oldpassword = '';
 if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $username = check_input($_POST['username']);
    $password = check_input($_POST['password']);
    $oldpassword = check_input($_POST['oldpassword']);
    if ($username == '' || $password == '' || $oldpassword == '') {
      echo json_encode(["success" => false, "message" => "Field(s) cannot be empty"]);
    }else {
      $post = new Post($dbconn);
      $result = $post->update($username, $password, $oldpassword);
    }
  }
?>