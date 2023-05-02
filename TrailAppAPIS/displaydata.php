<?php

$connect=mysqli_connect("localhost", "root", "");
$database = mysqli_select_db($connect, "trail");

$EncodedData =file_get_contents('php://input');
$DecodedData =json_decode($EncodedData, true);

$StateName = $DecodedData['State'];
$Season = $DecodedData['Season'];
$Category = $DecodedData['Category'];

$sql = "SELECT * FROM traildata WHERE StateName ='$StateName' AND Season ='$Season' AND Category ='$Category'";
$result = $connect->query($sql);

if(mysqli_num_rows($result)>0)
{
    $data = array();

    while($row = $result->fetch_assoc()) {
        $data[] = $row;
      };

    header('Content-Type: application/json');
    echo json_encode($data);
}

$connect->close();
?>
