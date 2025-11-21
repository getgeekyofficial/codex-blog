# Migrating The Codex to WordPress (getgeeky.blog)

## 🎯 Overview

You have a custom HTML/CSS/JS blog and want to use it with your WordPress domain `getgeeky.blog`. Here are your options:

---

## Option 1: Convert to WordPress Theme (RECOMMENDED)

This keeps WordPress functionality while using your custom design.

### Step-by-Step Process

#### 1. Create Theme Structure
Create a new folder called `codex-theme` with these files:

```
codex-theme/
├── style.css (WordPress theme header)
├── index.php (Homepage template)
├── single.php (Article template)
├── header.php (Navigation)
├── footer.php (Footer)
├── functions.php (Theme functions)
├── css/
│   ├── style.css (your existing styles)
│   └── article.css
├── js/
│   ├── script.js
│   └── article.js
└── images/
```

#### 2. Create style.css (Theme Header)
```css
/*
Theme Name: The Codex
Theme URI: https://getgeeky.blog
Author: Your Name
Author URI: https://getgeeky.blog
Description: Premium dark-themed blog with neon accents
Version: 1.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: codex
*/

/* Import your actual styles */
@import url('css/style.css');
```

#### 3. Create functions.php
```php
<?php
function codex_theme_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    
    // Register navigation menu
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'codex'),
    ));
}
add_action('after_setup_theme', 'codex_theme_setup');

// Enqueue styles and scripts
function codex_enqueue_assets() {
    // Styles
    wp_enqueue_style('codex-style', get_stylesheet_uri());
    wp_enqueue_style('codex-main', get_template_directory_uri() . '/css/style.css');
    wp_enqueue_style('codex-article', get_template_directory_uri() . '/css/article.css');
    
    // Google Fonts
    wp_enqueue_style('codex-fonts', 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600;700&display=swap');
    
    // Font Awesome
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
    
    // Scripts
    wp_enqueue_script('codex-script', get_template_directory_uri() . '/js/script.js', array(), '1.0', true);
    
    if (is_single()) {
        wp_enqueue_script('codex-article', get_template_directory_uri() . '/js/article.js', array(), '1.0', true);
    }
}
add_action('wp_enqueue_scripts', 'codex_enqueue_assets');
?>
```

#### 4. Create header.php
```php
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <nav class="navbar">
        <div class="container">
            <div class="nav-wrapper">
                <div class="logo">
                    <i class="fas fa-eye"></i>
                    <span><?php bloginfo('name'); ?></span>
                </div>
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'primary',
                    'container' => false,
                    'menu_class' => 'nav-menu',
                ));
                ?>
                <div class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </nav>
```

#### 5. Create footer.php
```php
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <div class="logo">
                        <i class="fas fa-eye"></i>
                        <span><?php bloginfo('name'); ?></span>
                    </div>
                    <p><?php bloginfo('description'); ?></p>
                    <div class="social-icons">
                        <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                        <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                        <a href="#" aria-label="Discord"><i class="fab fa-discord"></i></a>
                    </div>
                </div>
                <!-- Rest of footer content -->
            </div>
            <div class="footer-bottom">
                <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. All rights reserved.</p>
            </div>
        </div>
    </footer>
    <?php wp_footer(); ?>
</body>
</html>
```

#### 6. Create index.php (Homepage)
```php
<?php get_header(); ?>

<!-- Your hero section HTML -->
<section class="hero" id="home">
    <!-- Hero content -->
</section>

<!-- Pillars Section with WordPress Loop -->
<section class="pillars" id="pillars">
    <div class="container">
        <h2 class="section-title">Choose Your Path</h2>
        <div class="pillars-grid">
            <?php
            $args = array(
                'posts_per_page' => 3,
                'category_name' => 'featured'
            );
            $query = new WP_Query($args);
            
            while ($query->have_posts()) : $query->the_post();
            ?>
            <article class="pillar-card">
                <div class="card-image">
                    <?php the_post_thumbnail('large'); ?>
                </div>
                <div class="card-content">
                    <h3 class="card-title"><?php the_title(); ?></h3>
                    <p class="card-excerpt"><?php echo wp_trim_words(get_the_excerpt(), 30); ?></p>
                    <a href="<?php the_permalink(); ?>" class="btn-read-more">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            </article>
            <?php endwhile; wp_reset_postdata(); ?>
        </div>
    </div>
</section>

<!-- Rest of your homepage sections -->

<?php get_footer(); ?>
```

#### 7. Create single.php (Article Page)
```php
<?php get_header(); ?>

<?php while (have_posts()) : the_post(); ?>

<section class="article-hero">
    <div class="article-hero-bg">
        <?php the_post_thumbnail('full'); ?>
        <div class="hero-overlay"></div>
    </div>
    <div class="container">
        <div class="article-hero-content">
            <div class="article-category">
                <i class="fas fa-lock-open"></i>
                <span><?php the_category(', '); ?></span>
            </div>
            <h1 class="article-title"><?php the_title(); ?></h1>
            <div class="article-meta">
                <div class="meta-item">
                    <?php echo get_avatar(get_the_author_meta('ID'), 50); ?>
                    <div class="author-info">
                        <span class="author-name"><?php the_author(); ?></span>
                        <span class="author-title">Author</span>
                    </div>
                </div>
                <div class="meta-divider"></div>
                <div class="meta-item">
                    <i class="far fa-calendar"></i>
                    <span><?php echo get_the_date(); ?></span>
                </div>
            </div>
        </div>
    </div>
</section>

<article class="article-content">
    <div class="container">
        <div class="article-layout">
            <aside class="article-sidebar">
                <!-- Sidebar content -->
            </aside>
            <div class="article-main">
                <div class="article-body">
                    <?php the_content(); ?>
                </div>
            </div>
        </div>
    </div>
</article>

<?php endwhile; ?>

<?php get_footer(); ?>
```

#### 8. Upload to WordPress
1. Zip the `codex-theme` folder
2. Go to WordPress Admin → Appearance → Themes
3. Click "Add New" → "Upload Theme"
4. Upload the zip file
5. Activate the theme

---

## Option 2: Use as Static Site with WordPress Domain

Host the HTML site separately and point your domain to it.

### Steps:
1. **Host on Netlify/Vercel (Free)**
   - Upload your `codex-blog` folder to Netlify
   - Get a URL like `yoursite.netlify.app`

2. **Point Your Domain**
   - In your domain registrar (where you bought getgeeky.blog)
   - Update DNS settings:
     - Type: CNAME
     - Name: www
     - Value: yoursite.netlify.app
   - Or use Netlify's nameservers

3. **Keep WordPress for Blog**
   - Use WordPress at `blog.getgeeky.blog`
   - Use custom HTML at `getgeeky.blog`

---

## Option 3: WordPress Page Builder Integration

Use a page builder plugin to recreate the design.

### Recommended Plugins:
1. **Elementor Pro** - Drag & drop builder
2. **Oxygen Builder** - Full design control
3. **Bricks Builder** - Performance-focused

### Steps:
1. Install page builder plugin
2. Create new page
3. Use custom HTML/CSS widgets
4. Copy your HTML sections
5. Add your CSS to theme customizer

---

## Option 4: Custom HTML Plugin

Keep WordPress but use custom HTML for specific pages.

### Steps:
1. Install "Insert Headers and Footers" plugin
2. Install "Custom CSS & JS" plugin
3. Create pages with custom HTML
4. Add your CSS/JS through plugins

---

## 🎯 RECOMMENDED APPROACH for getgeeky.blog

### Best Solution: Convert to WordPress Theme

**Why?**
- ✅ Keep your custom design
- ✅ Use WordPress content management
- ✅ Easy to update content
- ✅ SEO plugins work
- ✅ Comments, users, plugins all work

**Time Required:** 4-6 hours

**Difficulty:** Intermediate (I can help!)

---

## 🚀 Quick Start for WordPress Theme

I can create the WordPress theme files for you. Would you like me to:

1. **Convert your HTML to WordPress theme** - I'll create all the PHP files needed
2. **Provide installation instructions** - Step-by-step guide
3. **Include customization guide** - How to modify content

Just let me know and I'll create the complete WordPress theme package!

---

## 📞 Need Help?

Common issues and solutions:

**Issue:** Theme doesn't look right
**Solution:** Check if CSS/JS files are loading (view page source)

**Issue:** Images not showing
**Solution:** Upload images to WordPress Media Library

**Issue:** Menu not working
**Solution:** Go to Appearance → Menus and assign to Primary location

**Issue:** Fonts not loading
**Solution:** Check functions.php enqueue statements

---

## 💡 Pro Tips

1. **Test locally first** - Use Local by Flywheel or XAMPP
2. **Backup WordPress** - Before installing custom theme
3. **Child theme** - Create child theme for updates
4. **Mobile testing** - Test on actual devices
5. **Performance** - Use caching plugin (WP Rocket, W3 Total Cache)

Would you like me to create the complete WordPress theme files for you?
