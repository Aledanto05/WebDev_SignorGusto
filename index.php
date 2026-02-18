<?php get_header(); ?>

<main id="primary" class="site-main">
    <?php
    if ( have_posts() ) : // Usiamo i due punti per la sintassi alternativa
        while ( have_posts() ) : the_post();
            
            // Questo stampa tutto quello che l'azienda crea nell'editor (compresi i tuoi pattern)
            the_content(); 

        endwhile; // Chiude il while
    endif; // Ora 'endif' è corretto perché abbiamo usato i ':' sopra
    ?>
</main>

<?php get_footer(); ?>