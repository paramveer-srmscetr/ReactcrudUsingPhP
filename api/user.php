<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$db_conn = mysqli_connect("localhost", "root", "", "reactphp");
if ($db_conn === false) {
  die("ERROR: Could Not Connect" . mysqli_connect_error());
}

$method = $_SERVER['REQUEST_METHOD'];
//echo "test----".$method; die;
switch ($method) {
  case "GET":
    $path = explode('/', $_SERVER['REQUEST_URI']);

    if (isset($path[4]) && is_numeric($path[4])) {
      $json_array = array();
      $userid = $path[4];

      $getuserrow = mysqli_query($db_conn, "SELECT * FROM tbl_user WHERE userid='$userid' ");
      while ($userrow = mysqli_fetch_array($getuserrow)) {
        $json_array['rowUserdata'] = array('id' => $userrow['userid'], 'username' => $userrow['username'], 'email' => $userrow['useremail'], 'status' => $userrow['status'],'thumbs_up' => $userrow['thumbs_up'],
        'thumbs_down' => $userrow['thumbs_down'],);
      }
      echo json_encode($json_array['rowUserdata']);
      return;
    } else {

      $alluser = mysqli_query($db_conn, "SELECT * FROM tbl_user");
      if (mysqli_num_rows($alluser) > 0) {
        while ($row = mysqli_fetch_array($alluser)) {
          $json_array["userdata"][] = array("id" => $row['userid'], "username" => $row["username"], "email" => $row["useremail"], "status" => $row["status"]);
        }
        echo json_encode($json_array["userdata"]);
        return;
      } else {
        echo json_encode(["result" => "Please check the Data"]);
        return;
      }
    }
    break;

  //   case "POST":
  //     $userpostdata = json_decode(file_get_contents("php://input"));
  //     //echo "sucess data";
  //     //print_r($userpostdata); die;
  //     $username = $userpostdata->username;
  //     $useremail = $userpostdata->email;
  //     $status = $userpostdata->status;
  //     $result = mysqli_query($db_conn, "INSERT INTO tbl_user (username, useremail, status) 
  //         VALUES('$username', '$useremail', '$status')");

  //     if ($result) {
  //       echo json_encode(["success" => "User comment added Successfully"]);
  //       return;
  //     } else {
  //       echo json_encode(["success" => "Please Check the User Data!"]);
  //       return;
  //     }
  //     break;

  // case "POST":
  //   // Check if it's a thumbs update request

  //   $thumbsPostData = json_decode(file_get_contents("php://input"));
  //   if ($thumbsPostData) {
  //     $userid = $thumbsPostData->id;
  //     $thumbsType = $thumbsPostData->type;

  //     // Validate if the type is 'up' or 'down'
  //     if ($thumbsType !== 'up' && $thumbsType !== 'down') {
  //       echo json_encode(["error" => "Invalid thumbs type"]);
  //       return;
  //     }

  //     // Update thumbs count based on the type using a direct query
  //     $updateThumbsQuery = "UPDATE tbl_user SET thumbs_{$thumbsType} = thumbs_{$thumbsType}+'1' WHERE userid = '$userid' ";

  //     $result = mysqli_query($db_conn, $updateThumbsQuery);
  //     echo json_decode($updateThumbsQuery);
  //     if ($result) {
  //       echo json_encode(["success" => "Thumbs {$thumbsType} recorded"]);
  //     } else {
  //       echo json_encode(["error" => "Failed to record thumbs {$thumbsType}"]);
  //     }
  //   } 
  //   break;

  case "POST":
    // Check if it's a user comment or thumbs update request
    $postData = json_decode(file_get_contents("php://input"));

    if (isset($postData->username) && isset($postData->email) && isset($postData->status)) {
        // It's a user comment request
        $username = $postData->username;
        $useremail = $postData->email;
        $status = $postData->status;

        $result = mysqli_query($db_conn, "INSERT INTO tbl_user (username, useremail, status) 
            VALUES('$username', '$useremail', '$status')");

        if ($result) {
            echo json_encode(["success" => "User comment added Successfully"]);
        } else {
            echo json_encode(["error" => "Please Check the User Data!"]);
        }
        
    } elseif (isset($postData->id) && isset($postData->type)) {
        // It's a thumbs update request
        $userid = $postData->id;
        $thumbsType = $postData->type;

        // Validate if the type is 'up' or 'down'
        if ($thumbsType !== 'up' && $thumbsType !== 'down') {
            echo json_encode(["error" => "Invalid thumbs type"]);
        } else {
            // Update thumbs count based on the type using a direct query
            $updateThumbsQuery = "UPDATE tbl_user SET thumbs_{$thumbsType} = thumbs_{$thumbsType}+'1' WHERE userid = '$userid' ";

            $result = mysqli_query($db_conn, $updateThumbsQuery);

            if ($result) {
                echo json_encode(["success" => "Thumbs {$thumbsType} recorded"]);
            } else {
                echo json_encode(["error" => "Failed to record thumbs {$thumbsType}"]);
            }
        }
    } else {
        echo json_encode(["error" => "Invalid POST request"]);
    }
    break;
    


  case "PUT":
    $userUpdate = json_decode(file_get_contents("php://input"));

    $userid = $userUpdate->id;
    $username = $userUpdate->username;
    $useremail = $userUpdate->email;
    $status = $userUpdate->status;

    $updateData = mysqli_query($db_conn, "UPDATE tbl_user SET username='$username', useremail='$useremail', status='$status' WHERE userid='$userid'  ");
    if ($updateData) {
      echo json_encode(["success" => "User Record Update Successfully"]);
      return;
    } else {
      echo json_encode(["success" => "Please Check the User Data!"]);
      return;
    }
    // print_r($userUpdate); die;
    break;

  case "DELETE":
    $path = explode('/', $_SERVER["REQUEST_URI"]);
    //echo "message userid------".$path[4]; die;
    $result = mysqli_query($db_conn, "DELETE FROM tbl_user WHERE userid= '$path[4]' ");
    if ($result) {
      echo json_encode(["success" => "User Record Deleted Successfully"]);
      return;
    } else {
      echo json_encode(["Please Check the User Data!"]);
      return;
    }

    break;
}
