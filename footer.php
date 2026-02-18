<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-section">
                <h3><?php bloginfo( 'name' ); ?></h3>
                <p style="color: #888888;">
                    <?php bloginfo( 'description' ); ?>
                </p>
            </div>
            
            <div class="footer-section">
                <h3>Menu</h3>
                <?php
                // Qui mostriamo il menu se è stato assegnato, altrimenti una lista di esempio
                if ( has_nav_menu( 'footer' ) ) {
                    wp_nav_menu( array( 'theme_location' => 'footer', 'depth' => 1 ) );
                } else {
                    echo '<ul><li><a href="#">Home</a></li><li><a href="#">Servizi</a></li></ul>';
                }
                ?>
            </div>
            
            <div class="footer-section">
                <h3>Contatti</h3>
                <ul>
                    <li><a href="#">info@altfocus.local</a></li>
                    <li><a href="#">+39 123 456 7890</a></li>
                    <li><a href="#">Milano, Italia</a></li>
                </ul>
            </div>
        </div>
    </div>
    
    <div class="footer-bottom">
        <p>&copy; <?php echo date( 'Y' ); ?> <?php bloginfo( 'name' ); ?>. Tutti i diritti riservati.</p>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>