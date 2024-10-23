<?php get_header(); ?>
<!-- contents -->
<div id="contents" class="top">
  <section id="top-about">
    <div class="top-about-container flex flx-btw flx-alitem-c">
      <div class="top-about-img sp-none"></div>
      <div class="top-about-info">
        <h3 class="top-about-ttl">
          <span class="eng">About</span>
          <span class="ja"><em>おおやぶ</em>って<br class="pc-none">どんなひと？</span>
        </h3>
        <div class="top-about-img pc-none"></div>
        <div class="top-about-info-txt">
          <p class="strong-txt">
            <strong>「やるか」<br>「やらないか」</strong>
          </p>
          <p>人生はその選択の連続です。</p>
          <p>
            デザインもコーディングも、<br class="pc-none">すべて未経験からスタートし、<br>一から学んできました。
          </p>
          <p>
            もちろん、<br class="pc-none">すべて独学というわけではありません。<br>
            企業に努め、下積みを経て現在に至ります。
          </p>
          <p>
            やってやれないことはない。<br>
            何かをはじめることに遅いなんてない。<br>
            わからないことは恥ずかしいことじゃない。
          </p>
          <p>
            昨日の自分より「一歩前へ」<br>
            そんな人生を歩んできました。
          </p>
        </div>
      </div>
    </div>
  </section>
  <!-- top-about -->

  <?php
  $args = array(
    'post_type' => 'post',
    'posts_per_page' => 4,
  );
  $my_query = new WP_Query($args);
  if ($my_query) :
  ?>
    <section id="top-works">
      <h3 class="top-works-ttl">
        <span class="eng">Works</span>
        <span class="ja">これまでの実績</span>
      </h3>
      <div class="top-works-container flex flx-wrp">
        <?php while ($my_query->have_posts()) : $my_query->the_post(); ?>
          <article class="com-top-works">
            <a href="<?php the_permalink(); ?>">
              <div class="com-img">
                <?php if ($cfs->get('thumbnail')) : ?>
                  <img src="<?php echo $cfs->get('thumbnail'); ?>" alt="<?php the_title(); ?>">
                <?php endif; ?>
              </div>
              <h4 class="site-name">
                <?php if (mb_strlen($post->post_title) > 30) {
                  $title = mb_substr($post->post_title, 0, 30);
                  echo $title . '...';
                } else {
                  echo $post->post_title;
                } ?>
              </h4>
              <dl class="top-works-skill">
                <?php if (cfs()->get('task')) : ?>
                  <div class="in-dl flex">
                    <dt>担当</dt>
                    <dd><?php echo cfs()->get('task'); ?></dd>
                  </div>
                <?php endif; ?>
                <?php
                $programs = cfs()->get('program');
                if ($programs) :
                ?>
                  <div class="in-dl flex">
                    <dt>言語</dt>
                    <dd>
                      <ul class="program-word-list">
                        <?php
                        foreach ($programs as $key => $label) :
                        ?>
                          <li><span><?php echo $label; ?></span></li>
                        <?php endforeach; ?>
                      </ul>
                    </dd>
                  </div>
                <?php endif; ?>
              </dl>
            </a>
          </article>
        <?php endwhile; ?>
      </div>
      <a href="/works/" class="more-btn"><span>All Works</span></a>
    </section>
  <?php endif; ?>
</div>
<!-- /contents -->
</main>
<?php get_footer(); ?>