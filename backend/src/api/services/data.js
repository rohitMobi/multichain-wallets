exports.getDecodeAuth = () => {
    var username = 'multichainrpc';
    var password = '4c12yZsGdihvihy2MK6xFnBDy5mvjSWQaEw17PNFeJng';

    const token = `${username}:${password}`;
    const encodedToken = Buffer.from(token).toString('base64');
    return encodedToken;
}