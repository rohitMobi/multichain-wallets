exports.getDecodeAuth = () => {
    var username = 'multichainrpc';
    var password = '4c12yZsGdihvihy2MK6xFnBDy5mvjSWQaEw17PNFeJng' //'Axh5rArAQqjpZPZQCzLh4JdAtjQCEhE3tRjGsqcdVy77';

    const token = `${username}:${password}`;
    const encodedToken = Buffer.from(token).toString('base64');
    return encodedToken;
}

exports.base_url = "http://localhost:2762/"; //"http://localhost:4382/";
exports.chain_name = "dexChain"; //"chain1";