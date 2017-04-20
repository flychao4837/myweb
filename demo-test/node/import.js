"use strict"

var fs = require("fs");
var util = require('util');
var src="import";
var filename = "index.html";
var fnImportReplace = function(src, filename){
	fs.readFile("import/"+filename,{encoding: 'utf8'},function(err, data){
		var dataReplace = data.replace(/<link\s?rel="import"\s?href="(.*)"\s*\/?>/gi, function(matchs,m1){
			//console.log(m1)  \s取到的空格 可能是0-n个 需要贪婪匹配
			return fs.readFileSync(src+"/"+m1,{encoding:"utf-8"})
		})
		fs.writeFile(filename,dataReplace,{encoding:'utf-8'},function(err){
			if(err){
				console.log( err);
			}else{
				console.log(filename+"模版文件生成成功");
			}
		})
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
// 		var re =new RegExp( filename + "\\s?(\\?v=(\\w*))?","gm"); // re为/^\d+bl$/gim

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
function walk(path,floor,handelFile,filename){
	var paths = path;
	handelFile(paths,0,filename);
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
							walk(tmpPath,floor,handelFile,filename)
						}else{
							handelFile(tmpPath,floor,filename);
						}
					}
				})
				
			})
		}
	})
}

function handleFile(path, floor,filename) {
    fs.stat(path, function(err, stats) {  
        if(err) {  
            console.log('87 stat error');  
        }else{  
            if(stats.isDirectory()) {  
                console.log("menu="+path);  
            }else{  
            	console.log("92: "+path)
                fs.readFile(path,{"encoding":"utf-8"}, function(err,data){
					var timeHash = +new Date()+""+parseInt( Math.random()*10000);
					var re =new RegExp( filename + "\\s?(\\?v=(\\w*))?","gm"); // re为/^\d+bl$/gim
					//console.log("reg = "+re);
					//console.log("读取的文件数据"+data);
					//console.log("timeHash = "+filename+"?v="+timeHash)
					var dataReplace = data.replace(re,function(matchs,m1){
						return filename+"?v="+timeHash
					});
					//console.log("替换后的数据"+dataReplace);
					fs.writeFile(path,dataReplace,{encoding:'utf-8'},function(err){
						if(err){
							console.log("文件写入失败"+err);
						}else{
							console.log(path + " js时间戳替换成功");
						}
					})
				}) 
            }  
        }  
    })  
} 
 
var fnChangeJSFiles = function(src,filename){
	var paths = [];
	if(typeof(src)=="string"){
		paths.push(src)
	}else if(util.isArray(src)){
		paths = src
	}
	//需要向下遍历目录，找出子级目录或子孙级目录
	paths.forEach(function(path){
		fs.readdir(path, function(args){
			walk(path, 0, handleFile,filename); 
		})
	})
}
fs.watch("js",{encoding:"utf-8"}, function(event,filename){
	if(event=="change"){
		console.log("133: "+src+"/"+filename + "发生修改，更新文件");
		fnChangeJSFiles(['import','html'],filename);
	}
});
