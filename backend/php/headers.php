<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Cookie');
header('Access-Control-Allow-Credentials: true');

// Set an array of allowed origins
$allowedOrigins = array(
  'http://localhost:3000',
  'http://localhost:8080'
);

// Check if the request's origin header exists and it's in the allowed origins array
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
  header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
} else {
  // Deny access if the origin is not allowed
  header('HTTP/1.1 403 Forbidden');
  exit;
}
?>