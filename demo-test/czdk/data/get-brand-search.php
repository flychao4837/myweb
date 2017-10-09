<?php
header('Content-type:text/json');
$v=array(
	"errcode"=>"0",
	"errmsg"=>"",
	"result"=>array(
		"sort"=>array("sortby"=>"soldnum","sorttype"=>"asc"),
		"list"=>array(
			array("name"=>"嘉实多","id"=>100,"title"=>"嘉实多磁护5W-40 SN","image"=>"./img/product.png","price"=>"358","sold"=>"20"),
			array("name"=>"壳牌","id"=>100,"title"=>"嘉实多磁护5W-40 SN","image"=>"./img/product.png","price"=>"358","sold"=>"21"),
			array("name"=>"美孚","id"=>100,"title"=>"嘉实多磁护5W-40 SN","image"=>"./img/product.png","price"=>"358","sold"=>"22"),
			array("name"=>"美孚","id"=>100,"title"=>"嘉实多磁护5W-40 SN","image"=>"./img/product.png","price"=>"358","sold"=>"22"),
			array("name"=>"美孚","id"=>100,"title"=>"嘉实多磁护5W-40 SN","image"=>"./img/product.png","price"=>"358","sold"=>"22"),
			array("name"=>"美孚","id"=>100,"title"=>"嘉实多磁护5W-40 SN","image"=>"./img/product.png","price"=>"358","sold"=>"22"),
			array("name"=>"美孚","id"=>100,"title"=>"嘉实多磁护5W-40 SN","image"=>"./img/product.png","price"=>"358","sold"=>"22"),
			array("name"=>"美孚","id"=>100,"title"=>"嘉实多磁护5W-40 SN","image"=>"./img/product.png","price"=>"358","sold"=>"22"),
			array("name"=>"美孚","id"=>100,"title"=>"嘉实多磁护5W-40 SN","image"=>"./img/product.png","price"=>"358","sold"=>"22"),
		)
	)
);

$json=json_encode($v);
echo $json;
?>
