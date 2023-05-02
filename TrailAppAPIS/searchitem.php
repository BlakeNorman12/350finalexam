<?php

$connect=mysqli_connect("localhost", "root", "");
$database = mysqli_select_db($connect, "trail");

$EncodedData =file_get_contents('php://input');
$DecodedData =json_decode($EncodedData, true);

$State=$DecodedData['State'];
$Season=$DecodedData['Season'];
$Category=$DecodedData['Category'];


$sql = "SELECT * from traildata WHERE StateName ='$State' AND Season ='$Season' AND Category ='$Category'";
$result = $connect->query($sql);

if ($result->num_rows > 0) {
    echo 'works';
} else {
    echo "doesn't work";
}

$connect->close();
?>