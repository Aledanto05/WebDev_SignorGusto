<?php
/**
 * Alt Focus Theme Header
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php bloginfo( 'description' ); ?>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800;900&family=Segoe+UI:wght@400;600;700&display=swap" rel="stylesheet">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <?php wp_body_open(); ?>

    <header class="navbar">
        <div class="container">
            <div class="logo">
                <?php
                if ( has_custom_logo() ) {
                    the_custom_logo();
                } else {
                    echo '<span>ALT</span> FOCUS';
                }
                ?>
            </div>
            <nav class="nav-menu">
                <?php
                wp_nav_menu( array(
                    'theme_location'  => 'primary',
                    'fallback_cb'     => 'wp_page_menu',
                    'container_class' => 'nav-container',
                ) );
                ?>
            </nav>
        </div>
    </header>
