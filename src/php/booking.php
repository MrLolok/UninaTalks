<?php
    include "bot.php";
    $event = $_POST["event"];
    $fullname = $_POST["fullname"];
    $email = $_POST["email"];
    $notes = $_POST["notes"];
    $json_data = json_encode([
        "content" => "**NUOVA PRENOTAZIONE**\n\n🖥 IP: " . getIPAddress() . "\n📕 Evento: $event\n👤 Nome: $fullname\n📧 Email: $email\n💬 Note: \n$notes",
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
    send($json_data);
?>