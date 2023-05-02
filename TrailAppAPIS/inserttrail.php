<?php
    $connect=mysqli_connect("localhost", "root", "");
    $database = mysqli_select_db($connect, "trail");

    $EncodedData =file_get_contents('php://input');
    $DecodedData =json_decode($EncodedData, true);

    $Name=$DecodedData['Name'];
    $State=$DecodedData['State'];
    $Season=$DecodedData['Season'];
    $Category=$DecodedData['Category'];

    $IQ = "insert into traildata(TrailName, StateName, Season, Category) values('$Name', '$State', '$Season', '$Category')";

    $R = mysqli_query($connect, $IQ);

    if ($R) {
        $Message = "Value has been registered successfully into database";
    }else{
        $Message= "Value was not registered";
    }

    echo($Message);
?>