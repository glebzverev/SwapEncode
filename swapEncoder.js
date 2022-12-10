const ethers = require("ethers")
const BN = ethers.BigNumber

function numStringToBytes(num, bytes) { 
    var bn = new BN.from(num)
    return padToBytes(bn._hex, bytes);
 }
 
 function padToBytes(n, bytes) {
    n = n.slice(2) 
    while (n.length < bytes*2) {
         n = "0" + n;
     }
     return n;
 }

function ecnodeSingle(param, dtype){
    if (dtype == "address"){
        return param
    }
    if (dtype == "uint256"){
        return (numStringToBytes(param, 32))
    }    
    if (dtype == "uint160"){
        return (numStringToBytes(param, 20))
    }
    if (dtype == "bytes4"){
        return param.slice(2)
    }
}

function encodePackedWithSelector(selector, params, dtypes){
    console.log(params)

    byteParams = [] 
    
    for (var i in params){
        byteParams.push(ecnodeSingle(params[i], dtypes[i]))
    }
    
    var data = `${selector}`
    for (var i = 0; i< byteParams.length; i++){
        data+=padToBytes(byteParams[i], 32)
    }
    return data
}

exports.encodePackedWithSelector = encodePackedWithSelector