var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.post('/', function(req, res){
    checkData(req.body.net)
});

function checkData(params, res){
    if(params['epochs'] === ''){
        params['epochs'] = 1000;
    } 
    if (params['batchSize'] === ''){
        params['batchSize'] = 30;
    }
    if (params['dataset'] === ''){
        params['dataset'] = 'Digits';
    }
    if (params['activation'] === ''){
        params['activation'] = 'relu';
    }
    if (params['alpha'] === ''){
        params['alpha'] = 0.03;
    }
    if (params['lambda'] === ''){
        params['lambda'] = 0.3;
    }
    if (params['numlayers'] === ''){
        params['numlayers'] = 5;
    }
    if (params['nodelayers'] === ''){
        params['nodelayers'] = [16, 16];
    }
    console.log(params)
}

module.exports = router;

