"use strict"

var fs = require("fs");
var util = require('util');
var src="import";
var filename = "index.html";
var timeHash = +new Date()+""+parseInt( Math.random()*10000);
/*** 方式1、只监视模版 ***/
var fnImportReplace = function(src, filename){
	fs.readFile("import/"+filename,{encoding: 'utf8'},function(err, data){
		var dataReplace = data.replace(/<link\s?rel="import"\s?href="(.*)"\s*\/?>/gi, function(matchs,m1){
			//console.log(m1)  \s取到的空格 可能是0-n个 需要贪婪匹配
			return fs.readFileSync(src+"/"+m1,{encoding:"utf-8"})
		})
		//dataReplace 为undefined时length也是有默认值的  
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


/** 方式2、遍历文件夹，搜寻文件，逐个替换
需要向下遍历目录，找出子级目录或子孙级目录 **/
function walk(path,floor,handelFile,filename,filedir){
	var paths = path;
	handelFile(paths,0,filename,filedir);
	floor++;
	fs.readdir(paths ,function(err,files){
		if(err){
			console.log("read dir error,path is " + paths);
			return false;
		}else{
			files.forEach(function(item){
				var tmpPath = paths+"/"+item;
				fs.stat(tmpPath,function(err,stats){
					if(err){
						console.log('stat error tmpPath' + tmpPath); 
						return false; 
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
            console.log('stats error');
            return false 
        }else{  
            if(stats.isDirectory()) {
                console.log("错误的文件地址，当前为目录 menu="+path);
                return false;
            }else{
            	var ext = getFileExt(filename);
            	if(fileext.indexOf(ext)>-1){
            		fs.readFile(path,{"encoding":"utf-8"}, function(err,data){
            			//资源路径两种形式，href是引用和页面关联，是在当前元素和引用资源之间建立联系，
            			//src表示引用资源，表示替换当前元素
						if(ext==="css"){
							var str = "href(\\s)*=(\\s)*(\"|')?(\\s)?"+filedir+"\/"+filename+"(\\?v=(\\w+))?(\\s)?(\"|')?"
							var re = new RegExp(str)
							var dataReplace = data.replace(re,function(matchs,m1){
								return "href=\""+filedir+"/"+filename+"?v="+timeHash+"\""
							});
						}else{
							var str = "src(\\s)*=(\\s)*(\"|')?(\\s)?"+filedir+"\/"+filename+"(\\?v=(\\w+))?(\\s)?(\"|')?"
							var re = new RegExp(str)
							var dataReplace = data.replace(re,function(matchs,m1){
								return "src=\""+filedir+"/"+filename+"?v="+timeHash+"\""
							});
						}
						console.log("reg = "+re);
						//console.log("读取的文件数据"+data);
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
            	}else{
            		console.log("格式error，不做处理 "+ext);
            		return false;
            	}
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
var getFileExt = function(filename){
	var pattern="";
	for(var i=0,len=fileext.length;i<len;i++){
		if(i<len-1){
			pattern+="\."+fileext[i]+"|";
		}else{
			pattern+="\."+fileext[i];
		}
	}
	var reg = new RegExp(pattern,"ig")
	if(reg.test(filename)){
		return filename.substr(filename.lastIndexOf(".")+1).toLowerCase();
	}else{
		return false;
	}
}
var list = ["js","js/global","js/global/js","css","image"];//要监视的文件目录
var fileext = ["js","css","jpeg","jpg","gif","png","bmp"];//要监视的文件类型

//["js","js/global","js/global/js"].forEach() 会返回一个undefined 这个是forEach函数的返回值，跟数据无关
list.forEach(function(pathdir){
	if(pathdir){
		fs.watch(pathdir,{encoding:"utf-8"}, function(event,filename){
			if(event=="change"){
				console.log("174:"+pathdir+"/"+filename + "发生修改，更新文件");
				fnChangeJSFiles(["import","html"],filename,pathdir);
			}
		});
	}
})