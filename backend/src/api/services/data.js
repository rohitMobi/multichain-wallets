var localusername = 'multichainrpc'; 
var localpassword = '4c12yZsGdihvihy2MK6xFnBDy5mvjSWQaEw17PNFeJng';
var localbase_url = "http://localhost:2762/";
var localchain_name = "dexChain";

var windowsusername = 'multichainrpc'; 
var windowspassword = 'Axh5rArAQqjpZPZQCzLh4JdAtjQCEhE3tRjGsqcdVy77';
var windowsbase_url = "http://localhost:4382/";
var windowschain_name = "chain1";

var serverusername = 'multichainrpc'; 
var serverpassword = '7ED5GKA3fV8exmYQT4QowSCdpVjPBLWqqvWTTtCLcNbF';
var serverbase_url = "http://localhost:6794/";
var serverchain_name = "chainOne";

exports.getDecodeAuth = () => {
    var username = windowsusername;
    var password = windowspassword;

    const token = `${username}:${password}`;
    const encodedToken = Buffer.from(token).toString('base64');
    return encodedToken;
}

exports.base_url = windowsbase_url.toString();
exports.chain_name = windowschain_name.toString();