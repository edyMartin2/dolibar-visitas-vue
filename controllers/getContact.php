<?php
require 'connection.php';

$nombre=$_GET['dato'];
$nombres = '';



$conn=new Connection();
$conn->createConnection();

$consult="SELECT CONCAT(firstname,' ',lastname) as fullName FROM llx_socpeople WHERE CONCAT(firstname,' ',lastname) LIKE '".$nombre."%'";

$result=$conn->createConsult($consult);

$numRows=$result->num_rows;

if ($numRows>0) {
	while ($row=$result->fetch_assoc()) {
		$nombres .= '{"nombre":"'.$row['fullName'].'"},';
	}
}else{
	
}

echo '['.$nombres.'{}]';

$conn->closeConnection();


?>