<?php get_header(); ?>
<div id="contents-u" class="works-u">
  <ul class="all-works-list tag-btn-list flex flx-center flx-alitem-c">
    <li>
      <a href="/corporate/" class="more-btn">
        <span>コーポレート</span>
      </a>
    </li>
    <li>
      <a href="/lp/" class="more-btn">
        <span>LP</span>
      </a>
    </li>
    <li>
      <a href="/ec/" class="more-btn">
        <span>EC</span>
      </a>
    </li>
    <li>
      <a href="/learning/" class="more-btn">
        <span>LEARNING</span>
      </a>
    </li>
    <li>
      <a href="/works/" class="more-btn">
        <span>ALL</span>
      </a>
    </li>
  </ul>

  <section id="all-works">
    <h3 class="all-works-ttl com-ttl">
      <span class="eng">Works</span>
      <span class="ja">制作実績一覧</span>
    </h3>
    <p style="text-align: center; margin-bottom: 60px;">※年間80件の案件を制作していましたが、公開サイトに制限があるため一部抜粋して参考サイトに掲載しております。</p>
    <div class="all-works-container flex flx-wrp">
      <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
          <article class="com-all-works">
            <a href="<?php the_permalink(); ?>">
              <div class="com-img">
                <img src="<?php echo $cfs->get('thumbnail'); ?>" alt="">
              </div>
              <h4 class="site-name">
                <?php if (mb_strlen($post->post_title) > 30) {
                  $title = mb_substr($post->post_title, 0, 30);
                  echo $title . '...';
                } else {
                  echo $post->post_title;
                } ?>
              </h4>
              <dl class="all-works-skill eng">
                <div class="in-dl flex">
                  <dt>担当</dt>
                  <dd><?php echo cfs()->get('task'); ?></dd>
                </div>
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
      <?php endwhile;
      endif;
      wp_reset_query(); ?>
    </div>
  </section>
  <!--nextpage-->
</div>
<?php get_footer(); ?>