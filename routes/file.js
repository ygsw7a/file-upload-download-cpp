var express = require('express');
var _router = express.Router();
var multer = require('multer');
var path = require('path');

var store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './uploads');
    },
    filename:function(req,file,cb){
        //cb(null, Date.now()+'.'+file.originalname);        
		cb(null, file.originalname);
		
    }
});


var upload = multer({storage:store}).single('file');

_router.post('/upload', function(req,res,next){
    upload(req,res,function(err){
        if(err){
            return res.status(501).json({error:err});
        }
        //do all database record saving activity
        //return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
	

        var exec = require('child_process').exec;
        var execFile = require('child_process').execFile
        var program = "./cpp/standalone_flex_fileH/build/Release/standalone_flex_fileH";
        
		//var inputPath = path.join(__dirname, '/uploads/input.csv');
	    //var inputPath = path.join(__dirname, 'input.csv');
	    var inputPath = path.join(__dirname,'../uploads') +'/'+ req.file.filename;//'input.csv';
	    var outputPath = path.join(__dirname,'../uploads') +'/'+  'output.csv';
        //var outputPath = path.join(__dirname, 'output.csv');
        console.log("input File " + inputPath);
        console.log("output File " + outputPath);
        //console.log("Calculation Done! ");
        
        var primes = execFile(program, [inputPath, outputPath], function(error) {
          if (error ) throw error;
        });
        console.log("Calculation Done! ");		
		
		return res.json({originalname:outputPath, uploadname:'output.csv'});
		//return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
    });
});
		
_router.post('/download', function(req,res,next){
    //filepath = path.join(__dirname,'../uploads') +'/'+ req.body.filename;
	filepath = path.join(__dirname,'../uploads') +'/'+ 'output.csv';
    res.sendFile(filepath);
});

module.exports = _router;