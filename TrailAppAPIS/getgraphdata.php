<?php
    $connect=mysqli_connect("localhost", "root", "");
    $database = mysqli_select_db($connect, "trail");

    $sql = "SELECT * FROM survey";
    $result = $connect->query($sql);

   

    $Row = mysqli_fetch_assoc($result);
        
    $Secure = $Row["Secure"];
    $Fast = $Row["Fast"];
    $Useful = $Row["Useful"];
    $TooSlow = $Row["TooSlow"];
    $Crashes = $Row["Crashes"];

   
    
    $Response[]=array("Secure"=>$Secure, 
                      "Fast"=>$Fast,
                      "Useful"=>$Useful, 
                      "TooSlow"=>$TooSlow, 
                      "Crashes"=>$Crashes);
    
    echo json_encode($Response)
?>