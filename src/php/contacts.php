<?php
    include "bot.php";
    $name = $_POST["name"];
    $surname = $_POST["surname"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    $json_data = json_encode([
        "content" => "**NUOVO MESSAGGIO**\n\n🖥 IP: " . getIPAddress() . "\n👤 Nome: $name $surname\n📧 Email: $email\n💬 Messaggio: \n$message",
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
    send($json_data);
?>