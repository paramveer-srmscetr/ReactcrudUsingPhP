<?php
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

// Function to register a new user
function registerUser($username, $password, $email) {
  global $conn;

  // Sanitize user input to prevent SQL injection
  $username = mysqli_real_escape_string($conn, $username);
  $password = mysqli_real_escape_string($conn, $password);
  $email = mysqli_real_escape_string($conn, $email);

  // You may want to add password hashing before storing it in the database
  // Example: $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

  // Insert new user into the database
  $query = "INSERT INTO tbl_user1 (username, password, email) VALUES ('$username', '$password', '$email')";
  $result = mysqli_query($conn, $query);

  return $result;
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
  case "POST":
    $post_data = json_decode(file_get_contents("php://input"));

    if (isset($post_data->username) && isset($post_data->password) && isset($post_data->email)) {
      // Signup endpoint
      $username = $post_data->username;
      $password = $post_data->password;
      $email = $post_data->email;

      $result = registerUser($username, $password, $email);

      if ($result) {
        echo json_encode(['success' => true]);
      } else {
        echo json_encode(['success' => false, 'error' => 'User registration failed']);
      }
    } else {
      echo json_encode(['success' => false, 'error' => 'Invalid request']);
    }
    break;

  default:
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
    break;
}

mysqli_close($conn);
?>
