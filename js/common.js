// ===========================================================
// ぺージ内リンク・スムーズ
// ===========================================================
$(function ()
{
  $("a[href^=#]").click(function ()
  {
    var speed = 800;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top;
    $("html, body").animate({ scrollTop: position }, speed, "swing");
    return false;
  });
});

// ===========================================================
// ぺージトップ
// ===========================================================
$(function ()
{
  // 「ページトップへ」をクリックした場合
  $("#pagetop").click(function ()
  {
    // ページトップにスクロール
    $("html,body").animate(
      {
        scrollTop: 0,
      },
      300
    );
    return false;
  });
});