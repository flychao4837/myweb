"use strict"

var fs = require("fs");
var util = require('util');
var src="import";
var filename = "index.html";
var timeHash = +new Date()+""+parseInt( Math.random()*10000);
/*监视模版*/
var fnImportReplace = function(src, filename){
	fs.readFile("import/"+filename,{encoding: 'utf8'},function(err, data){
		var dataReplace = data.replace(/<link\s?rel="import"\s?href="(.*)"\s*\/?>/gi, function(matchs,m1){
			//console.log(m1)  \s取到的空格 可能是0-n个 需要贪婪匹配
			return fs.readFileSync(src+"/"+m1,{encoding:"utf-8"})
		})
		//dataReplace 为undefined时length也是有值的  
		//void(0).lenght>0 === false; void(0).length<0 === false ;void(0).length ==0 ===false
		if(dataReplace && dataReplace.length>0){
			fs.writeFile(filename,dataReplace,{encoding:'utf-8'},function(err){
				if(err){
					console.log( err);
				}else{
					console.log(filename+"模版文件生成成功");
				}
			})
		}else{
			console.log("模版文件生成失败 = "+filename);
		}
	})
}

fnImportReplace(src, filename);

// 监控文件，变更后重新生成
fs.watch(src, function(event, filename) {
	//src+"/"+filename filename指向index.html
	//这里的filename如果不引进变量的值，在callback里会指向变化的任意页
    if (event == 'change') {
        console.log(src + '/' + filename + '发生了改变，重新生成...');
        fnImportReplace(src, "index.html"); //直接指明 filename 

    }
});

//监控js文件变化，更新import模版 同时更新js时间戳
// 1、在指明模版文件的情况下替换
// var fnChangeJSFile = function(src,filename){
// 	fs.readFile("import/js.html",{"encoding":"utf-8"}, function(err,data){
// 		var timeHash = +new Date()+""+parseInt( Math.random()*10000);
// 		var re =new RegExp( filename + "\\s?(\\?v=(\\w+))?","gm"); // re为/^\d+bl$/gim

// 		var dataReplace = data.replace(re,function(matchs,m1){
// 			return filename+"?v="+timeHash
// 		});
// 		fs.writeFile('import/js.html',dataReplace,{encoding:'utf-8'},function(err){
// 			if(err){
// 				console.log( err);
// 			}else{
// 				console.log(filename+"js模版生成成功");
// 			}
// 		})
// 	})
// }
// 2、遍历文件夹，搜寻文件，逐个替换
//需要向下遍历目录，找出子级目录或子孙级目录
function walk(path,floor,handelFile,filename,filedir){
	var paths = path;
	handelFile(paths,0,filename,filedir);
	floor++;
	fs.readdir(paths ,function(err,files){
		if(err){
			console.log("read dir error,path is " + paths)
		}else{
			files.forEach(function(item){
				var tmpPath = paths+"/"+item;
				fs.stat(tmpPath,function(err,stats){
					if(err){
						console.log('stat error tmpPath' + tmpPath);  
					}else{
						if(stats.isDirectory()){
							walk(tmpPath,floor,handelFile,filename,filedir)
						}else{
							handelFile(tmpPath,floor,filename,filedir);
						}
					}
				})
				
			})
		}
	})
}

function handleFile(path, floor,filename,filedir) {
    fs.stat(path, function(err, stats) {  
        if(err) {  
            console.log('stat error');  
        }else{  
            if(stats.isDirectory()) {  
                console.log("menu="+path);  
            }else{  
            	console.log("92: "+path)
                fs.readFile(path,{"encoding":"utf-8"}, function(err,data){
					
					//var re =new RegExp( filedir+"/"+filename + "\\s?(\\?v=(\\w+))?","gm"); // re为/^\d+bl$/gim
					//var re = new RegExp("src(\\s)*=(\\s)*(\"|')+"+filedir+"\/"+filename+"(\?v=(\\w+))?","igm")
					var str = "src(\\s)*=(\\s)*(\"|')?(\\s)?"+filedir+"\/"+filename+"(\\?v=(\\w+))?(\\s)?(\"|')?"
					var re = new RegExp(str)
					//console.log("reg = "+re);
					//console.log("读取的文件数据"+data);
					//console.log("timeHash = "+filename+"?v="+timeHash)
					var dataReplace = data.replace(re,function(matchs,m1){
						return "src=\""+filedir+"/"+filename+"?v="+timeHash+"\""
					});
					//console.log(dataReplace);
					// 判断下替换文本的长度
					// 替换错误的文本 由于没有获取到有效的文本，替换后的长度为0，
					// 此时源文件正常，因此不能用错误文件内容替换源文件,保持源文件的原有状态不变
					if(dataReplace &&dataReplace.length>0){
						//console.log("替换后的数据"+dataReplace);
						fs.writeFile(path,dataReplace,{encoding:'utf-8'},function(err){
							if(err){
								console.log("文件写入失败"+err);
							}else{
								console.log(path + " js时间戳替换成功");
							}
						})
					}else{
						console.log("内容长度为0，文件替换错误 = "+path);
						console.log("替换后的数据"+dataReplace+"\n");
					}
				}) 
            }  
        }  
    })  
} 
 
var fnChangeJSFiles = function(src,filename,filedir){
	var paths = [];
	if(typeof(src)=="string"){
		paths.push(src)
	}else if(util.isArray(src)){
		paths = src
	}
	//需要向下遍历目录，找出子级目录或子孙级目录
	paths.forEach(function(path){
		fs.readdir(path, function(args){
			walk(path, 0, handleFile,filename,filedir); 
		})
	})
}
// fs.watch("js",{encoding:"utf-8"}, function(event,filename){
// 	if(event=="change"){
// 		console.log("147: js/"+filename + "发生修改，更新文件");
// 		var filedir="js";
// 		fnChangeJSFiles(['import','html'],filename,filedir);
// 	}
// });
// fs.watch("js/global",{encoding:"utf-8"}, function(event,filename){
// 	if(event=="change"){
// 		console.log("153: js/global/"+filename + "发生修改，更新文件");
// 		var filedir="js/global";
// 		fnChangeJSFiles(['import','html'],filename,filedir);
// 	}
// });
// fs.watch("js/global/js",{encoding:"utf-8"}, function(event,filename){
// 	if(event=="change"){
// 		console.log("159: js/global/js/"+filename + "发生修改，更新文件");
// 		var filedir="js/global/js";
// 		fnChangeJSFiles(['import','html'],filename,filedir);
// 	}
// });


var list = ["js","js/global","js/global/js"];

//["js","js/global","js/global/js"].forEach() 会返回一个undefined 这个是forEach函数的返回值，跟数据无关
list.forEach(function(pathdir){
	if(pathdir){
		fs.watch(pathdir,{encoding:"utf-8"}, function(event,filename){
			if(event=="change"){
				console.log("174: js/global/js/"+filename + "发生修改，更新文件");
				fnChangeJSFiles(['import','html'],filename,pathdir);
			}
		});
	}
})