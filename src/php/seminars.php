<?php
    include "bot.php";
    $fullname = $_POST["fullname"];
    $phone = $_POST["phone"];
    $email = $_POST["email"];
    $title = $_POST["title"];
    $arguments = $_POST["arguments"];
    $description = $_POST["description"];
    $json_data = json_encode([
        "content" => "**NUOVA PROPOSTA**\n\n🖥 IP: " . getIPAddress() . "\n👤 Nome: $fullname\n☎️ Telefono: $phone\n📧 Email: $email\n🏷 Titolo: $title\n❓ Argomenti: $arguments\n💬 Descrizione: \n$description",
        "components" => [
            [
                "type" => 1,
                "components" => [
                    [
                        "type" => 2,
                        "label" => "Approva",
                        "style" => 3,
                        "custom_id" => "seminar_accept"
                    ],
                    [
                        "type" => 2,
                        "label" => "Rifiuta",
                        "style" => 4,
                        "custom_id" => "seminar_reject"
                    ]
                ]
            ]
        ]
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
    send($json_data);
?>