<?php
header('Content-type:text/json');
$v=array(
	"errcode"=>"0", 
	// 查询状态，0：正常 ，其他为异常状态
	"errmsg"=>"",   
	//异常状体 给出的错误提示
	// result 为结果集
	"result"=>"0"
);

$json=json_encode($v);
echo $json;
?>
