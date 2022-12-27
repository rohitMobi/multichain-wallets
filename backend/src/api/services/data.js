exports.getDecodeAuth = () => {
    var username = 'multichainrpc';
    var password = 'Axh5rArAQqjpZPZQCzLh4JdAtjQCEhE3tRjGsqcdVy77' //'4c12yZsGdihvihy2MK6xFnBDy5mvjSWQaEw17PNFeJng';

    const token = `${username}:${password}`;
    const encodedToken = Buffer.from(token).toString('base64');
    return encodedToken;
}

exports.base_url = "http://localhost:4382/"; //"http://localhost:2762/";
exports.chain_name = "chain1"; //"dexChain";