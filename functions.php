<?php
/**
 * Alt Focus Theme Functions - Full Patterns Setup
 */

// 1. SETUP DEL TEMA
function alt_focus_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'custom-logo' );
    add_theme_support( 'align-wide' );
    
    register_nav_menus( array(
        'primary' => 'Menu Principale',
    ) );
}
add_action( 'after_setup_theme', 'alt_focus_setup' );

// 2. CARICAMENTO CSS E JS (CORRETTO)
function alt_focus_scripts() {
    // Carica lo style.css con un parametro tempo per evitare la cache durante lo sviluppo
    wp_enqueue_style( 'alt-focus-style', get_stylesheet_uri(), array(), time() );
    
    // Carica il file custom.js (assicurati che il file sia nella cartella principale del tema)
    wp_enqueue_script( 'alt-focus-custom', get_template_directory_uri() . '/custom.js', array(), time(), true );
}
add_action( 'wp_enqueue_scripts', 'alt_focus_scripts' );

// 3. REGISTRAZIONE DEI PATTERN
function alt_focus_register_patterns() {
    register_block_pattern_category('alt-focus', array('label' => 'Alt Focus - Sezioni Sito'));

    // --- PATTERN NAVBAR ---
    register_block_pattern('alt-focus/navbar', array(
        'title' => '00. Navbar Header',
        'categories' => array('alt-focus'),
        'content' => '<header class="wp-block-group navbar">
            <div class="container">
                <div class="logo"><span>ALT</span> FOCUS</div>
                <nav class="nav-menu">
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#services">Servizi</a></li>
                        <li><a href="#portfolio">Portfolio</a></li>
                        <li><a href="#about">Chi Siamo</a></li>
                        <li><a href="#contact" class="btn-nav">Contatti</a></li>
                    </ul>
                </nav>
            </div>
        </header>'
    ));

    // --- 1. HERO ---
    register_block_pattern('alt-focus/hero', array(
        'title' => '01. Hero Home',
        'categories' => array('alt-focus'),
        'content' => '<section class="wp-block-group hero"><div class="hero-content"><h1 class="hero-title">Trasforma il Tuo <span class="highlight">Brand</span> con <span class="highlight">Creatività</span> Digitale</h1><p class="hero-subtitle">Social Marketing, Web Design e Strategie Digitali Vincenti</p><p class="hero-description">Siamo Alt Focus: la tua agenzia di comunicazione digitale. Creiamo campagne memorabili che trasformano i tuoi follower in clienti fedeli.</p><div class="hero-buttons"><a href="#contact" class="btn btn-primary">Inizia il Progetto</a><a href="#portfolio" class="btn btn-secondary">Vedi i Nostri Lavori</a></div></div></section>'
    ));

    // --- 2. SERVIZI ---
    register_block_pattern('alt-focus/services', array(
        'title' => '02. Sezione Servizi',
        'categories' => array('alt-focus'),
        'content' => '<section class="wp-block-group services"><div class="container"><h2 class="section-title">I Nostri Servizi</h2><p class="section-subtitle">Soluzioni complete per la tua presenza digitale</p><div class="services-grid"><div class="service-card"><div class="service-icon">📱</div><h3 class="service-title">Social Media Marketing</h3><p class="service-description">Strategie mirate su Instagram, TikTok, Facebook e LinkedIn.</p></div><div class="service-card"><div class="service-icon">🎨</div><h3 class="service-title">Graphic Design</h3><p class="service-description">Visual stunning che catturano l\'attenzione.</p></div><div class="service-card"><div class="service-icon">💻</div><h3 class="service-title">Web Development</h3><p class="service-description">Siti web moderni, veloci e SEO-ottimizzati.</p></div></div></div></section>'
    ));

    // --- 3. PORTFOLIO ---
    register_block_pattern('alt-focus/portfolio', array(
        'title' => '03. Sezione Portfolio',
        'categories' => array('alt-focus'),
        'content' => '<section class="wp-block-group portfolio"><div class="container"><h2 class="section-title">Portfolio</h2><div class="portfolio-grid"><div class="portfolio-item"><div style="background: linear-gradient(135deg, #d946ef 0%, #ec4899 100%); width: 100%; height: 250px;"></div><div class="portfolio-overlay"><h3>Campagna Social</h3><p>Social Media</p></div></div><div class="portfolio-item"><div style="background: linear-gradient(135deg, #a21caf 0%, #d946ef 100%); width: 100%; height: 250px;"></div><div class="portfolio-overlay"><h3>Brand Identity</h3><p>Graphic Design</p></div></div><div class="portfolio-item"><div style="background: linear-gradient(135deg, #ec4899 0%, #f472b6 100%); width: 100%; height: 250px;"></div><div class="portfolio-overlay"><h3>Web Design</h3><p>Web Development</p></div></div></div></div></section>'
    ));

    // --- 4. CHI SIAMO ---
    register_block_pattern('alt-focus/about', array(
        'title' => '04. Sezione Chi Siamo',
        'categories' => array('alt-focus'),
        'content' => '<section class="wp-block-group about"><div class="container"><div class="about-content"><div class="about-text"><h2>Chi Siamo</h2><p>Alt Focus è più di un\'agenzia digitale.</p><ul class="about-features"><li>Team multidisciplinare</li><li>Strategie data-driven</li></ul><a href="#contact" class="btn btn-primary">Parla con un Esperto</a></div><div class="about-image"><div style="background: linear-gradient(135deg, #d946ef 0%, #ec4899 100%); width: 100%; height: 400px; display: flex; align-items: center; justify-content: center; font-size: 100px; border-radius:20px;">🚀</div></div></div></div></section>'
    ));

    // --- 5. TESTIMONIALS ---
    register_block_pattern('alt-focus/testimonials', array(
        'title' => '05. Sezione Recensioni',
        'categories' => array('alt-focus'),
        'content' => '<section class="wp-block-group testimonials"><div class="container"><h2 class="section-title">Cosa Dicono</h2><div class="testimonials-grid"><div class="testimonial-card"><p class="testimonial-text">"Alt Focus ha trasformato la nostra presenza social."</p></div></div></div></section>'
    ));

    // --- 6. CTA ---
    register_block_pattern('alt-focus/cta', array(
        'title' => '06. Call to Action',
        'categories' => array('alt-focus'),
        'content' => '<section class="wp-block-group cta"><div class="cta-content"><h2>Pronto a Trasformare il Tuo Brand?</h2><a href="#contact" class="btn btn-secondary">Richiedi Consulenza</a></div></section>'
    ));

    // --- 7. PAGINA CONTATTI AVANZATA ---
    register_block_pattern('alt-focus/contact-page-full', array(
        'title' => '07. Pagina Contattaci (Modulo Completo)',
        'categories' => array('alt-focus'),
        'content' => '<section class="wp-block-group contact-page-full" style="padding: 100px 0; background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%);">
            <div class="container">
                <div style="text-align: center; margin-bottom: 50px;">
                    <h1 class="section-title" style="font-size: 48px;">Contattaci</h1>
                    <p style="color: #ccc; font-size: 18px;">Dacci alcune info sulla tua attività e verrai ricontattato/a!</p>
                </div>
                <div style="max-width: 800px; margin: 0 auto; background: rgba(255,255,255,0.05); padding: 40px; border-radius: 20px; border: 1px solid rgba(217, 70, 239, 0.2);">
                    [contact-form-7 id="INSERISCI_ID_QUI" title="Modulo Contatti Professionale"]
                    </div>
            </div>
        </section>'
    ));
}
add_action( 'init', 'alt_focus_register_patterns' );