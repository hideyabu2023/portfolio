<!DOCTYPE html>
<html xml:lang="ja" lang="ja">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="format-detection" content="telephone=no" />
  <title><?php wp_title('|', true, 'right'); ?></title>
  <meta name="keywords" content="<?php my_meta_keywords_set(); ?>">
  <meta name="description" content="<?php my_meta_description_set(); ?>">
  <meta property="og:description" content="<?php my_meta_description_set(); ?>" />
  <!--▼ link -->
  <link rel="index" href="/" title="ホーム/トップページ" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <!-- ▼ css -->
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/contact.css" />
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/lib.css" />
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/reset.css" />
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/common_sp.css" media="screen and (max-width:767px)" />
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/common.css" media="screen and (min-width:768px)" />

  <!-- Drawer css start ▽ -->
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/drawer.min.css" />
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/drawer_def.css" media="screen and (max-width:767px)" />
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/drawer.css" media="screen and (max-width:767px)" />
  <!-- Drawer css end △ -->

  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/style_sp.css" media="screen and (max-width:767px)" />
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/style.css" media="screen and (min-width:768px)" />
  <!-- ▼ js -->
  <!--[if lt IE 9]><script src="<?php echo get_template_directory_uri(); ?>/js/html5shiv.js"></script><![endif]-->
  <!-- [if lt IE 9]><script src="<?php echo get_template_directory_uri(); ?>/js/selectivizr.js"></script><![endif] -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
  <!-- Drawer js start ▽ -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/iScroll/5.2.0/iscroll.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script src="<?php echo get_template_directory_uri(); ?>/js/drawer.min.js" charset="utf-8"></script>
  <!-- Drawer js end △ -->

  <script src="https://ajaxzip3.github.io/ajaxzip3.js"></script>
  <?php wp_head(); ?>
</head>

<body class="drawer drawer--right drawer--sidebar">
  <header id="header" class="hd-wrp flex flx-btw flx-alitem-c">
    <h1 class="hd-l">
      <a href="/">
        <img src="<?php echo get_template_directory_uri(); ?>/img/common/hd-logo.png" alt="notfound" />
      </a>
    </h1>
    <!-- hd_l -->
    <div class="hd-r">
      <nav id="nav" class="sp-none">
        <ul class="nav-list">
          <li <?php echo_current('/'); ?>>
            <a href="/"><span>トップ</span>
            </a>
          </li>
          <li <?php echo_current('about'); ?>><a href="/about/"><span>私について</span></a></li>
          <li <?php echo_current('works'); ?>><a href="/works/"><span>制作実績</span></a></li>
        </ul>
      </nav>
    </div>
    <!-- hd_r -->
  </header>
  <!-- /header -->
  <!-- Drawer start ▽ -->
  <div role="banner" class="pc-none">
    <div class="drawer-hamburger-wrp">
      <button type="button" class="drawer-toggle drawer-hamburger">
        <span class="sr-only">toggle navigation</span>
        <span class="drawer-hamburger-icon"></span>
      </button>
    </div>

    <div class="drawer-nav" role="navigation">
      <p class="drawer-logo">
        <a href="/">
          <img src="<?php echo get_template_directory_uri(); ?>/img/common/hd-logo.png" alt="notfound.">
        </a>
      </p>
      <ul class="drawer-menu">
        <li <?php echo_current(''); ?>>
          <a href="/" class="drawer-menu-item"><span>ホーム</span></a>
        </li>
        <li <?php echo_current('about'); ?>><a href="/about/" class="drawer-menu-item"><span>私について</span></a></li>
        <li <?php echo_current('works'); ?>><a href="/works/" class="drawer-menu-item"><span>制作実績</span></a></li>
      </ul>
      <div class="drawer-info">
        <ul class="sns-list flex flx-alitem-c flx-center">
          <li>
            <a href="https://www.instagram.com/notfound_error2022/" target="_blank">
              <img src="<?php echo get_template_directory_uri(); ?>/img/common/instagram-logo.png" alt="instagram">
            </a>
          </li>
        </ul>
        <!-- <a href="/contact/" class="drawer-mail-btn">
          <span>CONTACT</span>
        </a> -->
      </div>
    </div>
    <!-- Drawer end △ -->
  </div>
  <main>
    <?php if (is_home() || is_front_page()) : ?>
      <!-- mv -->
      <div id="mv" class="flex flx-btw flx-rr">
        <div class="mv-r"></div>
        <div class="mv-l flex flx-alitem-c flx-center">
          <h2 class="catch">
            <small>いつだって、</small>
            <span class="main">選択は<br>自由だ</span>
          </h2>
        </div>
      </div>
      <!-- /mv -->
    <?php else : ?>
      <!-- sv -->
      <div id="sub-visual" class="flex flx-alitem-c">
        <h2 class="sv-ttl">
          <?php if (is_page()) : ?>
            <span><?php the_title(); ?></span>
          <?php else : ?>
            <span>制作実績</span>
          <?php endif; ?>
        </h2>
      </div>
      <!-- /sv -->
    <?php endif; ?>