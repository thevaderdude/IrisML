var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// neural net
router.post('/', function(req, res){
    checkData(req.body.mlin);
});

function checkData(params, res){
    if(params['activation'] === ''){
        params['activation'] = 'sigmoid';
    } 
    if (params['alpha'] === ''){
        params['alpha'] = 0.03;
    }
    if (params['lambda'] === ''){
        params['lambda'] = 0.3;
    }
    if (params['epochs'] === ''){
        params['epochs'] = 1000;
    }
    if (params['batchSize'] === ''){
        params['batchSize'] = 30;
    }
    if (params['dataset'] === ''){
        params['dataset'] = 'digits';
    }
    console.log(params)
}

module.exports = router;