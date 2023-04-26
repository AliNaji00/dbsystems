<?php
    $url='db';   // DB Address
    $username='admin';   // DB Account
    $password='test';       // DB Password
    $dbName='bssdb';    // DB Name
    $conn=new mysqli($url, $username, $password, $dbName);
    if(!$conn){
        // faile
        die("Could not Connect to {$dbName}");
    }else {
        // success
        $conn->set_charset("UTF8");
    }
?>
