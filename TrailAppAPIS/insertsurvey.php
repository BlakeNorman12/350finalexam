<?php
    $connect=mysqli_connect("localhost", "root", "");
    $database = mysqli_select_db($connect, "trail");

    $EncodedData =file_get_contents('php://input');
    $DecodedData =json_decode($EncodedData, true);

    $Secure=$DecodedData['Secure'];
    $Fast=$DecodedData['Fast'];
    $Useful=$DecodedData['Useful'];
    $TooSlow=$DecodedData['TooSlow'];
    $Crashes=$DecodedData['Crashes'];

    $IQ = "UPDATE survey set Secure = '$Secure' + Secure, 
        Fast = '$Fast' + Fast, 
        Useful = '$Useful' + Useful, 
        TooSlow = '$TooSlow' + TooSlow, 
        Crashes = '$Crashes' + Crashes where ID = 1";

    $R = mysqli_query($connect, $IQ);

    if ($R) {
        $Message = "works";
    }else{
        $Message= "Value was not registered";
    }

    echo($Message);
?>