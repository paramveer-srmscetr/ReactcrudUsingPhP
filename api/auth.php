<?php
// auth
session_start();

// Connect to your MySQL database (replace these with your database details)
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$conn = mysqli_connect("localhost", "root", "", "reactphplogin");
if ($conn === false) {
  die("ERROR: Could Not Connect" . mysqli_connect_error());
}

// Function to authenticate user
function authenticateUser($username, $password) {
  global $conn;

  // Sanitize user input to prevent SQL injection
  $username = mysqli_real_escape_string($conn, $username);
  $password = mysqli_real_escape_string($conn, $password);
 
  // Retrieve user from the database
  $query = "SELECT * FROM tbl_user1 WHERE username='$username' AND password='$password'";
  $result = mysqli_query($conn, $query);

  if ($result && mysqli_num_rows($result) > 0) {
    // User credentials are valid
    $user = mysqli_fetch_assoc($result);
    
    return $user ;
  } else {
    // User credentials are invalid
    return false;
  }
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
//   case "GET": --instead it I used the information from login component--
//     // Check if the user is logged in
//     // if (isset($_SESSION['username']) && isset($_SESSION['userid'])) {
//     //     echo json_encode(['loggedIn' => true]);
//     // } else {
//     //     echo json_encode(['loggedIn' => false]);
//     // }
//     echo json_encode(['loggedIn' => true]);
//         break;

    case "POST":
      $post_data = json_decode(file_get_contents("php://input"));
  
      if (isset($post_data->logout)) {
          // Logout endpoint
          session_unset();
          session_destroy();
          echo json_encode(['success' => true]);
      } elseif (isset($post_data->username) && isset($post_data->password)) {
          // Login endpoint
          $username = $post_data->username;
          $password = $post_data->password;
  
          $user = authenticateUser($username, $password);
          if ($user) {
            error_log('User authenticated successfully. Username: ' . $user['username']);
            $_SESSION['username'] = $user['username'];
           $_SESSION['userid'] = $user['userid'];
            echo json_encode(['success' => true, 'loggedIn' => true]);
        } else {
            error_log('Authentication failed. Invalid credentials.');
            echo json_encode(['success' => false, 'error' => 'Invalid credentials']);
        }
      }
      break;
}

mysqli_close($conn);
?>
