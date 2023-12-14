$(function () {
	console.log('%c ', 'padding: 20px 100px; background:url(http://ipgroup.co.kr/resource/images/logo.svg) no-repeat 0 50%; background-size: 200px auto;');

	/* main-page-animations */
	if ($('#main-container').length === 1) {
		$('#main-content1 .inview-main').animate({
			'text-indent': 0
		}, 500, function () {
			$(this).addClass('active');
		});
		/* Plugin-intialization */
		$('#main-container').pagepiling({
			anchors: ['main', 'work-a', 'work-b', 'work-c'],
			navigation: {
				'position': 'right',
				'tooltips': ''
			},
			easing: 'swing',
			scrollingSpeed: 1000,
			afterLoad: function (anchorLink, index) {
				$('#main-content' + index + ' .inview-main').addClass('active');
			},
			onLeave: function (index, nextIndex, direction) {
				$('#main-content' + index + ' .inview-main').removeClass('active');
			}
		});
	}

	/* nav-menu */
	$('.nav-menu').on('click', function () {
		var body = $('body');
		if (body.hasClass('nav-menu-opened')) {
			body.removeClass('nav-menu-opened').addClass('nav-menu-closed').off('scroll touchmove mousewheel');
		} else {
			body.removeClass('nav-menu-closed').addClass('nav-menu-opened').on('scroll touchmove mousewheel', function(e){
				e.preventDefault();
			});
		}
	});
	$('.nav .side > li > a').on('click', function () {
		$('.nav-menu').trigger('click');
	});

	/* pages-parallax */
	$('.inview-img').on('inview', function (event, isInView) {
		var el = $(this);
		if (isInView === true) {
			el.addClass('active');
		}/*  else {
			el.removeClass('active');
		} */
	});
	var careerTalentSlideTF = true;
	$('.inview-items').on('inview', function (event, isInView) {
		var el = $(this);
		if (isInView === true) {
			el.addClass('active');
		}
		if ($(this).hasClass('career-talent') && careerTalentSlideTF) {
			careerTalentSlideTF = false;
			$('.career-talent ul').slider({ pagerSelector: '.career-talent .paging > span > em', nextSelector: '.career-talent .control .ico-next', prevSelector: '.career-talent .control .ico-prev'});
		 }
	});
	$('.inview-work').on('inview', function () {
		$(this).addClass('active');
	});
	$('.inview-forms').on('inview', function () {
		$(this).addClass('active');
	});
	$(document).on('inview', '.work-list li > div', function () {
		$(this).addClass('active');
	});

	/* pages-scroll-smooth */
	$('body.pages').easeScroll({
		frameRate: 100,
		animationTime: 1000,
		stepSize: 100,
		pulseAlgorithm: !0,
		pulseScale: 4,
		pulseNormalize: 1,
		accelerationDelta: 50,
		accelerationMax: 1,
		keyboardSupport: false,
		arrowScroll: 50
	});

	/* subpages-scroll-top */
	$('.pages .icon-touch-scroll, .btn-top').on('click', function () {
		$('html, body').stop().animate({ scrollTop: 0}, 500);
	});
});

/* cursor-animations */
var cursor, follow;
function cursorSetting() {
	$('body').append('<div class="cursor"></div><div class="cursor-follow"></div>');
	cursor = $('.cursor'),
	follow = $('.cursor-follow');
	cursor.hide();
	follow.hide();
}
function cursorChange() {
	cursor.show();
	follow.show();
	var e = event,
		t = $(e.target),
		f = follow,
		c = cursor;
	if ((t[0].nodeName === "SPAN" || t[0].nodeName === "svg" || t[0].nodeName === "path" || t[0].nodeName === "IMG") && $(e.target).closest('a').length > 0) t = $(e.target).closest('a');

	var tLeft = t.offset().left,
		tTop = t.offset().top,
		tWidth = t.outerWidth(),
		tHeight = t.outerHeight(),
		pScroll = $(window).scrollTop();
	
	if (pScroll > 0) tTop = tTop - pScroll;

	if(t.data('mouse-control') == 'type-m'){ //header-gnb-nav-over
		c.addClass('on-focus');
		f.css({
			'transform': 'translate3d(' + (tLeft + tWidth - 18) + 'px,' + (tTop + tHeight - 11) + 'px,0)'
		}).addClass('on-focus');
	} else if(t.data('mouse-control') == 'type-d'){ //main-pp-nav-over
		c.addClass('on-focus');
		f.css({
			'transform': 'translate3d(' + (tLeft + 8) + 'px,' + (tTop + 8) + 'px,0)',
			'width': (tWidth - 12) + 'px',
			'height': (tHeight - 12) + 'px',
			'background-color': 'transparent'
		}).addClass('on-focus');
	} else if(t.data('mouse-control') == 'type-s') { //header-side-nav0-over
		c.addClass('on-focus');
		f.css({
			'transform': 'translate3d(' + (tLeft + tHeight - 7) + 'px,' + (tTop + 10) + 'px,0)',
			'width': '3px',
			'height': '3px',
			'border-width': '1px'
		}).addClass('on-focus');
	} else if(t.data('mouse-control') == 'type-f'){ //footer-util-over
		c.addClass('on-focus');
		f.css({
			'transform': 'translate3d(' + (tLeft + 2) + 'px,' + (tTop + 2) + 'px,0)',
			'width': tWidth + 'px',
			'height': tHeight + 'px'
		}).addClass('on-focus');
	} else if(t.data('mouse-control') == 'type-f-company'){ //footer-util-over(company)
		c.addClass('on-focus');
		f.css({
			'transform': 'translate3d(' + (event.clientX - 36) + 'px,' + (event.clientY - 36) + 'px,0)',
			'padding': '36px'
		}).addClass('on-focus on-footer-company');
	} else if(t.data('mouse-control') == 'type-f-pinterest'){ //footer-util-over(pinterest)
		c.addClass('on-focus');
		f.css({
			'transform': 'translate3d(' + (event.clientX - 36) + 'px,' + (event.clientY - 36) + 'px,0)',
			'padding': '36px'
		}).addClass('on-focus on-footer-pinterest');
	} else if(t.data('mouse-control') == 'type-f-facebook'){ //footer-util-over(facebook)
		c.addClass('on-focus');
		f.css({
			'transform': 'translate3d(' + (event.clientX - 36) + 'px,' + (event.clientY - 36) + 'px,0)',
			'padding': '36px'
		}).addClass('on-focus on-footer-facebook');
	} else if(t.data('mouse-control') == 'type-wd'){ //work-detail-util-over
		c.addClass('on-focus');
		f.css({
			'transform': 'translate3d(' + (event.clientX - 36) + 'px,' + (event.clientY - 36) + 'px,0)',
			'background-color': '#fff',
			'border-color': '#fff',
			'padding': '36px',
			'opacity': '.15'
		}).addClass('on-focus');
	} else if(t.data('mouse-control') == 'type-c'){ //contact-slide-control
		c.addClass('on-focus');
		f.css({
			'transform': 'translate3d(' + (tLeft + 2) + 'px,' + (tTop + 2) + 'px,0)',
			'width': tWidth + 'px',
			'height': tHeight + 'px',
			'border-color': '#fff',
			'border-width': '1px'
		}).addClass('on-focus');
	} else if(t.data('mouse-control') == 'type-l'){ //etc-over
		c.addClass('on-focus');
		f.css({
			'transform': 'translate3d(' + (event.clientX - 36) + 'px,' + (event.clientY - 36) + 'px,0)',
			'padding': '36px',
			'opacity': '.15'
		}).addClass('on-focus on-etc-over');
	} else if(t.data('mouse-control') == 'type-i'){ //form-over
		c.addClass('on-focus');
		f.css({
			'opacity': '0'
		}).addClass('on-focus');
	} else {
		f.removeClass('on-focus on-etc-over on-footer-company on-footer-pinterest on-footer-facebook');
		c.removeClass('on-focus on-footer-company');
		mouseMove( c, e );
		mouseMove( f, e );
	}
}
function mouseMove(obj, event){
	$(obj).removeAttr('style');
	$(obj).css({
		'transform': 'translate3d(' + event.clientX + 'px,' + event.clientY + 'px,0)'
	});
	if ($('.about-link-pages').length > 0) mouseThemaCheck();
}
function mouseThemaCheck() {
	var winTop2 = $(window).scrollTop();
	var winH2 = $(window).innerHeight();
	var contTop2 = Math.round($('.about-link-pages').offset().top);

	if (winTop2 >= (contTop2 - winH2) + (winH2 - (follow.offset().top - winTop2))) {
		cursor.addClass('reverse');
		follow.addClass('reverse');
	} else {
		cursor.removeClass('reverse');
		follow.removeClass('reverse');
	}
}

var browserType = navigator.userAgent.toLowerCase();
var viewportW = $(window).width();

$(window).resize(function () {
	/* cursor-animations */
	viewportW = $(window).width();
	if (browserType.indexOf('chrome') != -1) {
		if (viewportW > 1024) {
			$('body').on('mousemove.cursor', cursorChange).css({ 'cursor': 'none' });
		} else {
			$('body').off('mousemove.cursor').css({ 'cursor': 'default' });
			cursor.hide();
			follow.hide();
		}
	}
});

function getIEVersion() {
	var rv = -1;
	if (navigator.appName == 'Microsoft Internet Explorer') {
		var ua = navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
		rv = parseFloat(RegExp.$1);
	}
	return rv;
}
var browserVer = getIEVersion();
if (browserVer > -1 && browserVer < 11) {
	$('body').addClass('ie10');
} else {
	/* console.log('none ie 10') */
}

$(window).on('load', function () {
	$('.loading').fadeOut(500);

	/* cursor-animations */
	cursorSetting();
	if (browserType.indexOf('chrome') != -1 && viewportW > 1024) { 
		$('body').on('mousemove.cursor', cursorChange).css({ 'cursor': 'none' });
		$(window).on('scroll', function (e) {
			var winTop2 = $(window).scrollTop();
			var winH2 = $(window).innerHeight();
			if ($('.about-link-pages').length > 0) {
				var contTop2 = Math.round($('.about-link-pages').offset().top);
				if (winTop2 >= (contTop2 - winH2) + (winH2 - (follow.offset().top - winTop2))) {
					cursor.addClass('reverse');
					follow.addClass('reverse');
				} else {
					cursor.removeClass('reverse');
					follow.removeClass('reverse');
				}
			}
		});
	} else {
		$('body').off('mousemove.cursor').css({ 'cursor': 'default' });
	}

	if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (browserType.indexOf("msie") != -1)) {
		$('body').addClass('ie');
	}
});
var winTop, winH, contTop;
var lastScrollTop = 0, delta = 15;
$(window).on('scroll', function (e) {
	/* pages-ui-show, hidden */
	if ($('body').hasClass('pages') && !$('body').hasClass('nav-menu-opened')) {
		winTop = $(window).scrollTop();
		winH = $(window).innerHeight();
		if ($('.about-link-pages').length > 0) {
			contTop = Math.round($('.about-link-pages').offset().top);
			if (winTop >= (contTop - winH)) $('.about-link-pages .inner').css({ opacity : (winTop - (contTop - winH)) / $('.about-link-pages .inner').outerHeight() });
			if (winTop >= (contTop - winH) + (winH - ($('.btn-top').offset().top - winTop))) {
				$('.btn-top').addClass('reverse');
			} else {
				$('.btn-top').removeClass('reverse');
			}
		} else {
			contTop = $('body').outerHeight();
		}
		if (winTop > 0) {
			$('body').removeClass('ui-disabled');
			$('header, footer').hide();
			if (winTop >= (contTop - 1)) {
				$('body').addClass('ui-disabled');
				$('header, footer').show();
			}
		} else {
			$('body').removeClass('ui-disabled');
			$('header').show();
		}
		/* console.log(winTop, contTop); */
	}

	/* pages-btn-top-ui-show, hidden */
	if ($('body').hasClass('pages')) {
		var nowScrollTop = $(window).scrollTop();
		if (Math.abs(lastScrollTop - nowScrollTop) <= delta) return;
		if (nowScrollTop > lastScrollTop) {
			$('.btn-top').removeClass('mouse-up');
		} else {
			$('.btn-top').addClass('mouse-up');
			if (nowScrollTop < 60) $('.btn-top').removeClass('mouse-up');
		}
		lastScrollTop = nowScrollTop;
	}
});