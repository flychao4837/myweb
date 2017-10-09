<?php
header('Content-type:text/json');
$v=array(
	"errcode"=>"0", 
	// 查询状态，0：正常 ，其他为异常状态
	"errmsg"=>"",   
	//异常状体 给出的错误提示
	// result 为结果集
	"result"=>array(
		"sort"=>array("sortby"=>"soldnum","sorttype"=>"desc"), 
		//排序(可为空)sortby=> soldnum(销量) ，addtime（上架时间） ，price（价格）   
		//排序方式（可为空）sorttype => asc，desc，

		//条目=> 品牌名，品牌id，商品的标题，商品图，销售价，销量
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
