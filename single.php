<?php get_header(); ?>
<!-- contents -->
<div id="contents-u" class="works-u">
  <section id="s-works">
    <h3 class="s-works-ttl com-ttl">
      <span class="ja"><?php the_title(); ?></span>
    </h3>
    <div class="s-works-container flex flx-btw flx-alitem-strt">
      <div class="com-img">
        <?php if ($cfs->get('thumbnail')) : ?>
          <img src="<?php echo $cfs->get('thumbnail'); ?>" alt="<?php the_title(); ?>">
        <?php endif; ?>
      </div>
      <div class="s-works-bx">
        <dl class="s-works-dl eng">
          <?php if (cfs()->get('contract')) : ?>
            <div class="in-dl flex">
              <dt>契約</dt>
              <dd><?php echo cfs()->get('contract'); ?></dd>
            </div>
          <?php endif; ?>
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
          <?php if (cfs()->get('cost')) : ?>
            <div class="in-dl flex">
              <dt>工数</dt>
              <dd><?php echo cfs()->get('cost'); ?></dd>
            </div>
          <?php endif; ?>
        </dl>
      </div>
    </div>
    <?php if (cfs()->get('url')) : ?>
      <a href="<?php echo cfs()->get('url'); ?>" class="more-btn" target="_blank">
        <span>制作サイトを見る</span>
      </a>
    <?php endif; ?>
    <div class="page-btn">
      <div class="inbox">
        <div class="navigation clearfix">
          <p class="navileft">
            <?php previous_post_link('%link', '前の記事へ'); ?>
          </p>
          <p class="navitop text-c">
            │<a href="<?php echo home_url(); ?>/works/">一覧へ</a>│
          </p>
          <p class="naviright">
            <?php next_post_link('%link', '次の記事へ'); ?>
          </p>
        </div>
      </div>
    </div>
  </section>
</div>
<!-- /contents -->
</main>
<?php get_footer(); ?>