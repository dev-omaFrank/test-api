<?php
  class Post{
    private $dbconn;
    private $table = 'users';

    public $id;
    public $username;
    public $password;

    public function __construct($dbconn){
      $this->dbconn = $dbconn;
    }

    public function read(){
      $query = 'SELECT * FROM ' . $this->table;
      $stmt = $this->dbconn->query($query);
      if ($stmt) {
          echo 'data fetched';
      }else {
        echo 'stmt is false: ' . $this->dbconn->error;
      }
      return $stmt;
    }


    public function sign_in($param1, $param2){
      $sql = "SELECT * FROM " . $this->table . " WHERE username = ? AND password = ?";
      $sql_check = $this->dbconn->prepare($sql);
      $sql_check->bind_param("ss", $param1, $param2);
      $sql_check->execute();
      $result = $sql_check->get_result();
      if ($result->num_rows > 0) {
        echo json_encode(["status"=>true, "message"=>"Login Successful."]);
        //start session here
        //redirect here
       }else {
         echo json_encode(["status"=>false, "message"=>"Invalid Username or Password"]);
       }
    }


    public function sign_up($param1,$param2){
      $sql = "SELECT * FROM " . $this->table . " WHERE username = ?";
      $sql_check = $this->dbconn->prepare($sql);
      $sql_check->bind_param("s", $param1);
      $sql_check->execute();
      $result = $sql_check->get_result();

      if ($result->num_rows > 0) {
       echo json_encode(["status"=>false, "message"=>"This email has been used to sign up previously."]);
      }else {
        $sql = "INSERT INTO " . $this->table . " (username, password) VALUES (?, ?)";
        $sql_insert = $this->dbconn->prepare($sql);
        $sql_insert->bind_param("ss", $param1, $param2);
          if ($sql_insert->execute()) {
            //write code to confirm email and update database.
            validate_input();
            echo json_encode(["status"=>true, "message"=>"You have successfully created an account. </br>Proceed your inbox to verify your email address."]);
          } else {
            echo 'Error inserting data: ' . $sql_insert->error;
          }
        }
      }
    }
?>