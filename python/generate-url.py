
# api key secret can be generated in account

TRACTORSCOPE_API_SECRET = 'key_1234'

import hashlib
import hmac
import json
from urllib.parse import quote

def generate_tractor_url(dashboard, filters):
    data = quote(json.dumps({'dashboard': dashboard, 'filters': filters},separators=(',', ':')))

    # Create the encrypted signature
    signature = hmac.new(
        TRACTORSCOPE_API_SECRET.encode(),
        data.encode(),
        hashlib.sha256
    ).hexdigest()

    url = (
        'https://app.tractorscope.com'
        '/embed/dashboard/' +
        dashboard +
        '?data=' +
        data +
        '&signature=' +
        signature
    )

    return url

url1 = generate_tractor_url('dsh_abc123', {'userId': 'user_123'})
url2 = generate_tractor_url('dsh_bcd234', {'spaceId': '55'})

print(url1)
print(url2)