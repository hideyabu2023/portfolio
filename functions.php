<?php
//==========================================
// head内の不要コードの非表示
//==========================================
remove_action('wp_head', 'feed_links', 2);
remove_action('wp_head', 'feed_links_extra', 3);
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'index_rel_link');
remove_action('wp_head', 'parent_post_rel_link', 10, 0);
remove_action('wp_head', 'start_post_rel_link', 10, 0);
remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0);
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'rest_output_link_wp_head');
remove_action('wp_head', 'wp_oembed_add_discovery_links');
remove_action('wp_head', 'wp_oembed_add_host_js');


//==========================================
//デフォルトのjqueryコード非表示
//==========================================
function my_delete_local_jquery()
{
  wp_deregister_script('jquery');
}
add_action('wp_enqueue_scripts', 'my_delete_local_jquery');

//デフォルトのcssコード非表示
wp_enqueue_style('twentyseventeen-style', get_stylesheet_uri());


//==========================================
//デフォルトのアドレス場バーの非表示
//==========================================
add_filter('show_admin_bar', '__return_false');


//==========================================
// タイトルタグの設定
//==========================================
function twentyfourteen_wp_title($title, $sep)
{
  global $paged, $page;

  if (is_feed()) {
    return $title;
  }

  // Add the site name.
  $title .= get_bloginfo('name', 'display');

  // Add the site description for the home/front page.
  $site_description = get_bloginfo('description', 'display');
  if ($site_description && (is_home() || is_front_page())) {
    $title = "$title";
  }

  // Add a page number if necessary.
  if (($paged >= 2 || $page >= 2) && !is_404()) {
    $title = "$title $sep " . sprintf(__('Page %s', 'twentyfourteen'), max($paged, $page));
  }

  return $title;
}
add_filter('wp_title', 'twentyfourteen_wp_title', 10, 2);

add_theme_support('title-tag');
function wp_document_title_parts($title)
{
  if (is_home() || is_front_page()) {
    unset($title['tagline']); // キャッチフレーズを出力しない
  } elseif (is_category()) {
    $title['title'] = '「' . $title['title'] . '」カテゴリーの記事一覧';
  } elseif (is_tag()) {
    $title['title'] = '「' . $title['title'] . '」タグの記事一覧';
  } elseif (is_archive()) {
    $title['title'] = $title['title'] . 'の記事一覧';
  }
  return $title;
}
add_filter('document_title_parts', 'wp_document_title_parts', 10, 1);


//==========================================
// keyword description設定
//==========================================
// カスタムフィールド追加
add_action('admin_menu', 'my_add_custom_fields');
add_action('save_post', 'my_save_custom_fields');
function my_add_custom_fields()
{
  add_meta_box('my_f01', 'メタキーワード(検索キーワード)', 'my_keywords', 'post');
  add_meta_box('my_f01', 'メタキーワード(検索キーワード)', 'my_keywords', 'page');
  add_meta_box('my_f02', 'メタディスクリプション(ページの説明)', 'my_description', 'post');
  add_meta_box('my_f02', 'メタディスクリプション(ページの説明)', 'my_description', 'page');
}

// カスタムフィールドの入力欄表示
function my_keywords()
{
  global $post;
  $f_data = get_post_meta($post->ID, 'meta_keywords', true);
  wp_nonce_field(wp_create_nonce(__FILE__), 'ul_nonce');
  echo '<p>キーワードは半角カンマ「,」で区切ります。</p>';
  echo '<input style="width:100%" type="text" name="meta_keywords" value="' . htmlspecialchars($f_data) . '" />';
}
function my_description()
{
  global $post;
  $f_data = get_post_meta($post->ID, 'meta_description', true);
  wp_nonce_field(wp_create_nonce(__FILE__), 'ul_nonce');
  echo '<p>全角120字以内が望ましいです。</p>';
  echo '<textarea style="width:100%" rows="4" type="text" name="meta_description">' . htmlspecialchars($f_data) . '</textarea>';
}

// カスタムフィールドの値を保存
function my_save_custom_fields($post_id)
{

  //nonceによるセキュリティ対策
  $ul_nonce = isset($_POST['ul_nonce']) ? $_POST['ul_nonce'] : null;
  if (!wp_verify_nonce($ul_nonce, wp_create_nonce(__FILE__))) {
    return $post_id;
  }

  //例外処理
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return $post_id;
  }
  if (!current_user_can('edit_post', $post_id)) {
    return $post_id;
  }

  //カスタムフィールドのキー一覧
  $keys = array(
    'meta_keywords',
    'meta_description',
  );

  //カスタムフィールドの更新
  foreach ($keys as $key) {
    $data = $_POST[$key];
    if (get_post_meta($post_id, $key) == "") {
      add_post_meta($post_id, $key, $data, true);
    } elseif ($data != get_post_meta($post_id, $key, true)) {
      update_post_meta($post_id, $key, $data);
    } elseif ($data == "") {
      delete_post_meta($post_id, $key, get_post_meta($post_id, $key, true));
    }
  }
}

//メタキーワード取得
function my_meta_keywords_set()
{
  //記事ページ
  if (get_post_meta(get_the_ID(), 'meta_keywords', true)) {
    echo htmlspecialchars(get_post_meta(get_the_ID(), 'meta_keywords', true));
    //その他・共通
  } else {
    echo htmlspecialchars('ポートフォリオ,Webコーダー,フロントエンドエンジニア');
  }
}

//メタディスクリプション取得
function my_meta_description_set()
{
  //記事ページ
  if (get_post_meta(get_the_ID(), 'meta_description', true)) {
    echo htmlspecialchars(get_post_meta(get_the_ID(), 'meta_description', true));
    //その他・共通
  } else {
    echo htmlspecialchars('おおやぶのポートフォリオです。');
  }
}

//==========================================
//グローバルナビゲーション---current
//==========================================
function is_current($uri = "")
{
  $uri = trim($uri, "/");
  $request_uri = $_SERVER['REQUEST_URI'];

  if ($uri && strpos($request_uri . "/", "/" . $uri . "/", 0) !== FALSE) {
    return true;
  }
  $request_uri = trim(str_replace("/index.php", "", $request_uri), '/');
  if (!$uri && !$request_uri) {
    return true;
  }
  return false;
}

function echo_current($uri = "")
{
  if (is_current($uri)) {
    echo 'class="current"';
  };
}

/*-------------------------------
  基本情報
---------------------------------*/
//==========================================
//ヘッダーにある不要なタグを削除
//==========================================
remove_action('wp_head', 'wp_generator');


//==========================================
//          アイキャッチ画像設定
//==========================================
//アイキャッチ機能をONに
add_theme_support('post-thumbnails');


//==========================================
//          ”投稿”の項目名変更
//==========================================

function change_post_menu_label()
{

  $henkoutitle = '制作実績';

  global $menu;
  global $submenu;
  $menu[5][0] = $henkoutitle;
  $submenu['edit.php'][5][0] = $henkoutitle . '一覧';
  $submenu['edit.php'][10][0] = '新しい' . $henkoutitle;
  $submenu['edit.php'][16][0] = 'タグ';
  //echo ”;
}
function change_post_object_label()
{

  $henkoutitle = '投稿';

  global $wp_post_types;
  $labels = &$wp_post_types['post']->labels;
  $labels->name = $henkoutitle;
  $labels->singular_name = $henkoutitle;
  $labels->add_new = _x('記事を作る', $henkoutitle);
  $labels->add_new_item = '新しい' . $henkoutitle;
  $labels->edit_item = $henkoutitle . 'の編集';
  $labels->new_item = '新しい' . $henkoutitle;
  $labels->view_item = $henkoutitle . 'を表示';
  $labels->search_items = $henkoutitle . '検索';
  $labels->not_found =  $henkoutitle . 'が見つかりませんでした';
  $labels->not_found_in_trash = 'ゴミ箱の' . $henkoutitle . 'にも見つかりませんでした';
}


add_action('init', 'change_post_object_label');
add_action('admin_menu', 'change_post_menu_label');
add_action('init', function () {
  remove_post_type_support('post', 'editor');
}, 99);


//==========================================
//アイキャッチ画像呼び出し関数化
//==========================================

function thumImgGet($thum_width = '150', $thum_height = '150')
{
  $exist_img = the_post_thumbnail(array($thum_width, $thum_height));
  if (has_post_thumbnail()) {
    echo $exist_img;
  } else {
    echo '<img src="' . THEME . '/images/com/noimg.png" width="' . $thum_width . '" height="' . $thum_height . '" alt="ノーイメージ" />';
  }
}
//==========================================
//          エキサープト
//==========================================
remove_filter('the_excerpt', 'wpautop');

function new_excerpt_more($more)
{
  return '...';
}
add_filter('excerpt_more', 'new_excerpt_more');


//==========================================
//カスタムフィールドをJSON形式で返す設定
//==========================================
add_action('graphql_register_types', function () {
  register_graphql_field('Post', 'customFields', [
    'type' => 'String',
    'description' => __('Custom fields from CFS', 'your-textdomain'),
    'resolve' => function ($post) {
      $fields = CFS()->get(false, $post->ID);
      return !empty($fields) ? json_encode($fields) : null;
    }
  ]);
});


function cfs_expose_custom_fields_in_rest_api($response, $post, $request)
{
  $custom_fields = CFS()->get(false, $post->ID);
  $response->data['custom_fields'] = $custom_fields;
  return $response;
}
add_filter('rest_prepare_post', 'cfs_expose_custom_fields_in_rest_api', 10, 3);
