<?php
$errmusic = isset($_GET['err-music']) ? $_GET['err-music'] : (isset($_POST['err-music']) ? $_POST['err-music'] : 'null404');

$errmsg = isset($_GET['err-msg']) ? $_GET['err-msg'] : (isset($_POST['err-msg']) ? $_POST['err-msg'] : 'null404');

// 获取发送请求的计算机的IP
$ip = $_SERVER['REMOTE_ADDR'];
// 获取当前日期和时间
$date = date('Y-m-d H:i:s');
// 获取年份
$year = date('Y');
// 检查目录是否存在，不存在则创建
$dirPath = './log/';
if (!file_exists($dirPath)) {
    mkdir($dirPath, 0777, true);
}
// 检查文件是否存在，不存在则创建
$filePath = $dirPath . $year . '.txt';
$fileExists = file_exists($filePath);
if (!$fileExists) {
    file_put_contents($filePath, '');
}
// 组装要写入文件的内容
$fileContent = '';
$fileContent .= 'Time: ' . $date . PHP_EOL;
$fileContent .= 'IP: ' . $ip . PHP_EOL;
$fileContent .= 'err-music:' . $errmusic . PHP_EOL;
$fileContent .= 'err-msg:'. $errmsg . PHP_EOL;
if ($fileExists && !empty(file_get_contents($filePath))) {
    $fileContent = "==============" . PHP_EOL . $fileContent;
}
// 检查文件内容是否存在相似值
$fileLines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
$similarValueFound = false;
$prevLine = null;
foreach ($fileLines as $line) {
    if ($prevLine !== null && strpos($prevLine, 'err-music') !== false && strpos($prevLine, $errmusic) !== false) {
        $similarValueFound = true;
        $errmsg1 = $line;
        $msgcode = mb_substr($errmsg1, 0, 3, 'UTF-8');
        break;
    }
    $prevLine = $line;
}
// 如果存在相似值则不进行写入，直接返回信息
if ($similarValueFound) {
    if($msgcode == "已处理"){
        header("HTTP/1.1 200");
        $code = 200;
    }else{
        header("HTTP/1.1 400 Error Don't Exist");
        $code = 400;
    }
    header('Server: a2942 Web serevr');
    // 设置Content-Type为application/json
    header('Content-Type: application/json');
    // 返回结果
    $response = [
        'err-music' => $errmusic,
        'err-msg' => $errmsg1,
        'code' => $code,
        'time' => $date
    ];
    echo json_encode($response);
    exit;
}
// 尝试写入数据到文件，并检查是否成功
if (@file_put_contents($filePath, $fileContent, FILE_APPEND) === false) {
    // 写入文件失败时的处理逻辑
    header('HTTP/1.1 500 Operation Was Denied');
    header('Server: a2942 Web serevr');
    header('Content-Type: application/json');
    $response = [
        'msg' => '写入文件失败，抱歉此次上报失败，为您造成的不便我非常抱歉！',
        'code' => 500,
        'time' => $date
    ];
    echo json_encode($response);
    exit;
}
// 设置Content-Type为application/json
header('Server: a2942 Web serevr');
header('Content-Type: application/json');
// 返回结果
$response = [
    'msg' => '成功,我们将及时处理失效文件，感谢您的参与！',
    'code' => 200,
    'time' => $date
];
echo json_encode($response);
?>