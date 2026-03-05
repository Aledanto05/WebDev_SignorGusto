<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $azienda = htmlspecialchars($_POST['azienda']);
    $email_cliente = filter_var($_POST['email_cliente'], FILTER_SANITIZE_EMAIL);
    $settore = htmlspecialchars($_POST['settore']);
    $messaggio = nl2br(htmlspecialchars($_POST['messaggio']));

    $tua_email = "aledanto05@gmail.com"; // La tua mail per ricevere le notifiche
    $mittente_sito = "aledanto05@gmail.com"; // La mail del tuo dominio su Aruba

    // --- HEADER PER EMAIL HTML ---
    $headers  = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: Signor Gusto <$mittente_sito>" . "\r\n";

    // --- EMAIL PER IL CLIENTE (Grafica) ---
    $soggetto_cliente = "Benvenuto a tavola con Signor Gusto";
    
    $corpo_cliente = "
    <html>
    <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
        <div style='max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;'>
            <div style='background-color: #2c3e50; padding: 20px; text-align: center;'>
                <h1 style='color: #ffffff; margin: 0; font-size: 24px;'>Signor Gusto</h1>
                <p style='color: #bdc3c7; margin: 5px 0 0 0;'>Marketing & Food Strategy</p>
            </div>
            <div style='padding: 30px;'>
                <h2 style='color: #2c3e50;'>Ciao $azienda,</h2>
                <p>Grazie per averci contattato! Abbiamo ricevuto la tua richiesta per il settore <strong>$settore</strong>.</p>
                <p>Il nostro team sta già analizzando il tuo progetto. Ti contatteremo entro le prossime 24 ore per fissare il tuo <strong>primo consulto gratuito</strong>.</p>
                <div style='background-color: #f9f9f9; padding: 15px; border-left: 4px solid #2c3e50; margin: 20px 0;'>
                    <p style='margin: 0; font-style: italic;'>\"Il successo nel food nasce da una strategia ben cucinata.\"</p>
                </div>
                <p>A presto,</p>
                <p><strong>Lo Staff di Signor Gusto</strong></p>
            </div>
            <div style='background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #777;'>
                <p style='margin: 0;'>&copy; 2024 Signor Gusto - Tutti i diritti riservati</p>
                <p style='margin: 5px 0 0 0;'>Questo è un messaggio automatico, si prega di non rispondere direttamente.</p>
            </div>
        </div>
    </body>
    </html>";

    // Invio mail al cliente
    mail($email_cliente, $soggetto_cliente, $corpo_cliente, $headers);

    // Invio notifica a te (semplice testo)
    $corpo_notifica = "Nuova richiesta da: $azienda\nSettore: $settore\nEmail: $email_cliente\n\nMessaggio:\n$messaggio";
    mail($tua_email, "NUOVO LEAD: $azienda", $corpo_notifica, "From: $mittente_sito");

    // Reindirizzamento a una pagina di successo
    header("Location: grazie.html"); 
}
?>