<?php 

/**
 * creacion de la clase de coneccion
 */
class Connection{

	private $conn;
	private $user;
	private $password;
	private $host;
	private $dataBase;
	
	function __construct(){
		$this->host="localhost";
		$this->user="root";
		$this->password="";
		$this->dataBase="dolibarr";
	}

	public function createConnection(){
		$this->conn= new mysqli($this->host,$this->user,$this->password,$this->dataBase);

		if ($this->conn->connect_errno) {
			echo "<script>alert('ha sucedido un error en la aplicación, por favor contactate con uno de nuestros técnicos');</script>";
		}

		$this->conn->set_charset("utf8");
	}

	public function createConsult($consult){
		$consults=$this->conn->query($consult);
		return $consults;
	}

	public function insertId(){
		$id=$this->conn->insert_id;
		return $id;
	}

	public function closeConnection(){
		$this->conn->close();
	}

	public function prueba(){
		echo "esta es una prueba de conección.";
	}
}


?>