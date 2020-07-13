<?php
set_time_limit(60*5);
$data_source_file = 'data.json';

if (isset($_GET['write'])) {
    $f=fopen($data_source_file, 'r');
    flock($f, LOCK_EX);
    $json='';
    while ($get = fgets($f, 1024)) {
        $json .= $get;
    }
    $json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
    $json =json_decode($json, true);
    $data=json_decode($_GET['write'], true);
    $data['timestamp']=time();
    array_push($json, $data);
    file_put_contents($data_source_file, str_replace(',', ",\n", json_encode($json)));
    flock(fopen($data_source_file, 'r'), LOCK_UN);
    exit;
}
while (true) {
    $last_ajax_call = isset($_GET['timestamp']) ? (int) $_GET['timestamp'] : null;
    clearstatcache();
    $last_change_in_data_file = filemtime($data_source_file);
    if ($last_ajax_call == null || $last_change_in_data_file > $last_ajax_call) {
        flock(fopen($data_source_file, 'r'), LOCK_SH);
        $json=loadJson($data_source_file);
        flock(fopen($data_source_file, 'r'), LOCK_UN);
        $data=[];
        foreach ($json as $line) {
            if (isset($_GET['timestamp'])&&$line['timestamp']<=$_GET['timestamp']) { //更新要求秒以前のデータは飛ばす
                continue;
            }
            array_push($data, $line);
        }
        $result = array(
            'data' => $data,
            'timestamp' => $last_change_in_data_file,
        );
        $json = json_encode($result);
        echo $json;
        break;
    } else {
        usleep(250*1000);//250ミリ秒待機
        continue;
    }
}

function loadJson($filename)
{
    $json= file_get_contents($filename);
    $json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
    $json =json_decode($json, true);
    return $json;
}
