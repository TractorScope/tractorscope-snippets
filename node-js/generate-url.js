// api key secret can be generated in account

const TRACTORSCOPE_API_SECRET = 'key_1234'; 

const crypto = require('crypto');

function generateTractorUrl(dashboard, filters) {

    const data = encodeURIComponent(JSON.stringify({ dashboard, filters }));

    // create the encrypted signature
    const signature = crypto
        .createHmac('sha256', TRACTORSCOPE_API_SECRET)
        .update(data)
        .digest('hex');

    const url =
        'https://app.tractorscope.com' +
        '/embed/dashboard/' +
        dashboard +
        '?data=' +
        data +
        '&signature=' +
        signature;

    return url

}

const url1 = generateTractorUrl('dsh_abc123', { 'userId': 'user_123' });
const url2 = generateTractorUrl('dsh_bcd234', {'spaceId': '55'})

console.log(url1);
console.log(url2);
