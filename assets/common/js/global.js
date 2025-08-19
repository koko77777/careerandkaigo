// global.js

// ロード時の処理 ===================================
$(function(){
	winClass();	// 現在のウインドウ幅に応じてclassを付与
	pageScroll();	// ページスクローラー
	spHeaderNav();	// SPヘッダナビ
	lpSetting();	// LPページ判定
	globalNavOn();	// グローバルナビカレント表示
	tabNavMenu();	// タブメニュー

	$('.armg_nav_pagetop').css('display','none');	// pagetop戻るボタン表示初期化
});

// ロード完了時の処理 ===================================
$(window).on('load',function() {
	winClass();	// 現在のウインドウ幅に応じてclassを付与
	headerFixed();	// ヘッダーfixed
	footerPageTopBtnFixed();	// ページトップボタンfixed
});

// リサイズ時の処理 ===================================
$(window).on('resize', function(){
	winClass();	// 現在のウインドウ幅に応じてclassを付与
});

// スクロール時の処理 ===================================
$(window).on('scroll', function(){
	headerFixed();	// ヘッダーfixed
	footerPageTopBtnFixed();	// ページトップボタンfixed
});

// 現在のウインドウ幅に応じてclassを付与
function winClass() {
	var breakwidth = 640;	// PC<>SPブレイクポイント
	var winwidth = $(window).width();
	if (winwidth <= breakwidth) {
    deviceType = "sp";
		if($('body').hasClass('mode_sp')) {
			return;
		} else {
			$('body').removeClass('mode_pc').addClass('mode_sp');
			resizeMethod();	// 表示切り替え時に呼び出す処理
		}
	} else {
    deviceType = "pc";
		if($('body').hasClass('mode_pc')) {
			return;
		} else {
			$('body').removeClass('mode_sp').addClass('mode_pc');
			resizeMethod();	// 表示切り替え時に呼び出す処理
		}
	}
}

// 表示切り替え時に呼び出す処理
function resizeMethod() {
	if ($('body').hasClass('mode_pc')) {
		// PC表示時の処理
		// SPメニューが開いていたら黒背景を非表示
		if ($('.armg_header .btn_spnavbtn').hasClass('btnon')) {
			$('.armg_stage').fadeOut();
		}
	}
	if ($('body').hasClass('mode_sp')) {
		// SP表示時の処理
		// SPメニューが開いていたら黒背景を表示
		if ($('.armg_header .btn_spnavbtn').hasClass('btnon')) {
			$('.armg_stage').fadeIn();
		}
	}
}

// ページスクローラー
function pageScroll() {
	var pcScrollPadding = 50;
	var spScrollPadding = 60;

	$('.armg_nav_pagetop a,a.armg_nav_pagetop').click(function(){
		$('html,body').animate({scrollTop: 0},1000,'easeOutExpo');
		return false;
	});
	$('a.scroll,.scroll a').click(function(){
		var tagname = $(this).attr('href');
		if (tagname == '#wrap') {
			$('html,body').animate({scrollTop: 0},1000,'easeOutExpo');
			return false;
		} else {
			var tagname = $(tagname).offset().top;
			if ($('body').hasClass('mode_pc')) {
				// PC表示時の処理
				var tagname = tagname - pcScrollPadding;
			}
			if ($('body').hasClass('mode_sp')) {
				// SP表示時の処理
				var tagname = tagname - spScrollPadding;
				
				// LPナビが開いていたら畳む
				$('.armg_lpheader_nav').slideUp();
				$('.btn_spnavbtn').removeClass('btnon');
			}
			$('html,body').animate({scrollTop: tagname},1000,'easeOutExpo');
			return false;
		}
	});
}

// ヘッダーfixed
function headerFixed(){
	var pcMainScroll = 130;
	var pcLPScroll = 130;
	var spMainScroll = 60;
	var scrollValue = $(window).scrollTop(); //スクロール値を取得
	if(pcMainScroll < scrollValue) {
		if ($('body').hasClass('mode_pc') && $('body').hasClass('mode_df')) {
			if($('body').hasClass('mainfixed')) {
				return;
			} else {
				$('body').addClass('mainfixed');
				$('.armg_header').addClass('armg_liner').addClass('armg_fixed').css('display','none').slideDown();
				$('.armg_nav_pagetop').fadeIn();	// pagetop戻るボタン表示
			}
		}
	} else {
		if ($('body').hasClass('mode_pc') && $('body').hasClass('mode_df')) {
			if($('body').hasClass('mainfixed')) {
				$('body').removeClass('mainfixed');
				$('.armg_header').removeClass('armg_liner').removeClass('armg_fixed').css('display','block');
				$('.armg_nav_pagetop').fadeOut();	// pagetop戻るボタン非表示
			} else {
				return;
			}
		}
	}
	if(pcLPScroll < scrollValue) {
		if ($('body').hasClass('mode_pc') && $('body').hasClass('mode_lp')) {
			if($('body').hasClass('lpfixed')) {
				return;
			} else {
				$('body').addClass('lpfixed');
				$('.armg_lpheader').addClass('armg_liner').addClass('armg_fixed').css('display','none').slideDown();
				$('.armg_nav_pagetop').fadeIn();	// pagetop戻るボタン表示
			}
		}
	} else {
		if ($('body').hasClass('mode_pc') && $('body').hasClass('mode_lp')) {
			if($('body').hasClass('lpfixed')) {
				$('body').removeClass('lpfixed');
				$('.armg_lpheader').removeClass('armg_liner').removeClass('armg_fixed').css('display','block');
				$('.armg_nav_pagetop').fadeOut();	// pagetop戻るボタン非表示
			} else {
				return;
			}
		}
	}
	if(spMainScroll < scrollValue) {
		if ($('body').hasClass('mode_sp')) {
			$('.armg_nav_pagetop').fadeIn();	// pagetop戻るボタン表示
		}
		if ($('body').hasClass('mode_sp') && $('body').hasClass('mode_lp')) {
			$('body').addClass('lpfixed');
			$('.armg_lpheader').addClass('armg_fixed');
		}
	} else {
		if ($('body').hasClass('mode_sp')) {
			$('.armg_nav_pagetop').fadeOut();	// pagetop戻るボタン非表示
		}
		if ($('body').hasClass('mode_sp') && $('body').hasClass('mode_lp')) {
			$('body').removeClass('lpfixed');
			$('.armg_lpheader').removeClass('armg_fixed');
		}
	}
	headerHeight = eval($("body").css('padding-top').replace('px', ''));
}

// ページトップボタンfixed
function footerPageTopBtnFixed() {
	var winHeight = $(window).innerHeight();
	var footerPoint = $('.armg_footer_section').offset().top;
	var scrollPoint = footerPoint - winHeight;
	if ($('body').hasClass('mode_pc')) {
		var scrollValue = ($(this).scrollTop() - 30);
	}
	if ($('body').hasClass('mode_sp')) {
		var scrollValue = ($(this).scrollTop() - 25);
	}
	if (scrollValue > scrollPoint) {
		$('.armg_nav_pagetop').addClass('navfit');
	} else {
		$('.armg_nav_pagetop').removeClass('navfit');
	}
}

// SPヘッダ＆フッタナビ
function spHeaderNav() {
	$('.btn_spnavbtn').on('click',function(){
		var navName = $(this).data('navclass');
		if($(this).hasClass('btnon')) {
			$(this).removeClass('btnon');
			$('.'+navName).slideUp();
			if (navName == 'armg_globalnav') {
				$('.armg_stage').fadeOut();
			}
		} else {
			$(this).addClass('btnon');
			$('.'+navName).slideDown();
			if (navName == 'armg_globalnav') {
				$('.armg_stage').fadeIn();
			}
		}
		return false;
	});
}

// LPページ判定
function lpSetting(){
	if ($('.armg_header_lp').length) {
		$('body').addClass('mode_lp');
	} else {
		$('body').addClass('mode_df');
	}
}

// グローバルナビカレント表示
function globalNavOn(){
	var nowUrl = location.pathname;
	$('.armg_globalnav_main').find('a').removeClass('navon');
	if (nowUrl.indexOf('/service/') != -1) {
		$('.armg_globalnav_business').find('a').addClass('navon');
	}
	if (nowUrl.indexOf('/seminarinfo/') != -1) {
		$('.armg_globalnav_seminar').find('a').addClass('navon');
	}
	if (nowUrl.indexOf('/case/') != -1) {
		$('.armg_globalnav_case').find('a').addClass('navon');
	}
	if (nowUrl.indexOf('/news/') != -1) {
		$('.armg_globalnav_news').find('a').addClass('navon');
	}
	if (nowUrl.indexOf('/company/') != -1) {
		$('.armg_globalnav_company').find('a').addClass('navon');
	}
	if (nowUrl.indexOf('/recruit/') != -1) {
		$('.armg_globalnav_recruit').find('a').addClass('navon');
	}
}

// タブメニュー
function tabNavMenu(){
	$('.armg_tabnav_btn').on('click',function(){
		var tabHash = $(this).attr('href');
		$(this).closest('ul').find('.armg_tabnav_btn').removeClass('tabon');
		$(this).addClass('tabon');
		$('.armg_tabnav_detail').find('.armg_tabnav_box').css('display','none').removeClass('boxon');
		$(tabHash).css('display','none').fadeIn().addClass('boxon');
		return false;
	});
}

