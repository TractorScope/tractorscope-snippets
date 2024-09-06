<?php

$tractorscope_api_key = 'key_1234';

$dashboard = 'dsh_abc123';

$filters = (object) array(
	'Aggregation' => 'month',
	'Date Range' => '2020-01-01to2021-01-01',
	'User' => 1,
	'Role' => 'admin'
);

$data = rawurlencode(json_encode(
	(object) array(
		'dashboard' => $dashboard,
		'filters' => $filters
	)
));

$signature = hash_hmac('sha256', $data, $tractorscope_api_key);

$tractorscope_embed_url = 'https://app.tractorscope.com/embed/dashboard/'.$dashboard.'?data='.$data.'&signature='.$signature;

echo $tractorscope_embed_url;

?>
