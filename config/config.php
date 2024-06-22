<?php
  $servername = 'localhost';
  $password = '';
  $username = 'root';
  $dbname = '';


  $conn = new mysqli($servername, $username, $password);

  if ($conn->connect_error) {
   die('Connection failed: ' . $conn->connect_error);
  }
  // echo 'connected</br>';

  $sql = "CREATE DATABASE IF NOT EXISTS api_test_db";
  if($conn->query($sql) === TRUE){
    // echo 'database created';
    $dbname = 'api_test_db';
  }else{
    echo 'database creation error: ' . $conn->error;
  }


  $dbconn = new mysqli($servername, $username, $password,$dbname);
  if ($dbconn->connect_error) {
   die('Connection failed: ' . $dbconn->connect_error);
  }
  // echo 'connected</br>';

?>