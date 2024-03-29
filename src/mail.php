<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$json  = file_get_contents('php://input');
$obj   = json_decode($json, true);

$name  = $obj['user-name'];
$phone = $obj['user-phone'];

// Формирование самого письма
$title = "Заголовок письма";

$body = " <h2>Новое письмо</h2>
  <tr style='background-color: #f8f8f8;'>
    <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Имя: </b>$name</td>
    <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Номер телефона: </b>$phone</td>
  </tr>
  ";
$body = "<table style='width: 100%;'>$body</table>";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->CharSet = "UTF-8";
  $mail->SMTPAuth   = true;
  // $mail->SMTPDebug = 2; 
  $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

  // Настройки вашей почты
  $mail->Host       = ''; // SMTP сервера вашей почты
  $mail->Username   = ''; // Логин на почте
  $mail->Password   = ''; // Пароль 
  $mail->SMTPSecure = '';
  $mail->Port       = ;

  $mail->setFrom('mr.aruter@gmail.com', 'Сухарев Кирилл'); // Адрес самой почты и имя отправителя

  // Получатель письма
  $mail->addAddress('mr.aruter@gmail.com');
  $mail->addAddress('aruter@yandex.ru');

  // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
  $result = "error";
  $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "status" => $status]);