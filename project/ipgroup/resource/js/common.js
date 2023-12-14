/* main.js */
$(function () {
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
			'height': tHeight + 'px',
			'background-color': 'transparent'
		}).addClass('on-focus');
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

/* work.js */
$(function () {
	/* work-list-viewport-check */
	if (viewportW > 1024) { 
		workListSize('pc');
	} else {
		workListSize();
	}

	/* work-list */
	var filterWord = '',
		workLi = '.work-list > li',
		filterLi = '.work-filter > li',
		workBtn = '.work-pages .btn-area';
	if ($(workLi).length > 0) {
		redering();
	}
	$(workBtn).on('click', function(e){
		sorting();
		e.preventDefault();
	});

	/* work-list-tab-click */
	$(filterLi + ' a').on('click', function (e) {
		var $element = $(this);
		filterWord = $element.data('work-filter');
		$element.parent('li').siblings('li').removeClass('active');
		$element.parent('li').addClass('active');
		$(workLi).hide().removeClass('active show nth-odd nth-even');
		redering();
		e.preventDefault();
	});

	/* work-list-sorting */
	function sorting() {
		workLi = '.work-list > li';
		if (filterWord === '') {
			$(workLi + ':hidden').addClass('show');
			$(workLi + ':hidden').slice(0, workLiShowNum).show();
		} else {
			$(workLi + '.filter-' + filterWord + ':hidden').addClass('show');
			$(workLi + '.filter-' + filterWord + ':hidden').slice(0, workLiShowNum).show();
		}
		$(workLi + '.type-s').addClass('show');
		$(workLi + '.type-s > div').addClass('show').show();
		$(workLi + '.show:odd').addClass('nth-odd');
		$(workLi + '.show:even').addClass('nth-even');

		$('.work-list li > inview-work').on('inview');
		$('.inview-work.show').not(':hidden').each(function (i) {
			if ($(this).offset().top < $(window).height() + $(window).scrollTop()) {
				$(this).trigger("inview");
			}
		});

		if( $(workLi + '.show:hidden').length === 0 ){
			$(workBtn).hide();
		} else {
			$(workBtn).show();
		}
	}

	/* work-list-redering */
	function redering() {
		var workLiTotal = '',
			workGroupALen = '',
			workWrapData = [],
			groupAHtml = '',
			groupBHtml = '';

		$(workLi + '.group-a').remove();
		$(workLi + '.group-b').remove();
		$.each(workLiSimple, function (i) {
			if (filterWord) {
				$.each(workLiSimple[i].hashtag, function (j) {
					if (workLiSimple[i].hashtag[j] === filterWord) {
						workWrapData.push(workLiSimple[i]);
					}
				});
			} else {
				workWrapData.push(workLiSimple[i]);
			}
		});
		workLiTotal = workWrapData.length;
		if (workLiTotal < 10) {
			workGroupALen = workLiTotal;
			if( workListShowType === 'pc') workLiShowNum = workLiShowNum + 1;
			$(workLi).closest('ul').append('<li class="type-s group-a filter-si filter-sm filter-web filter-app filter-case"></li>');
		} else {
			workGroupALen = Math.ceil(workLiTotal / 2);
			if( workListShowType === 'pc') workLiShowNum = workLiShowNum + 2;
			$(workLi).closest('ul').append('<li class="type-s group-a filter-si filter-sm filter-web filter-app filter-case"></li><li class="type-s group-b filter-si filter-sm filter-web filter-app filter-case"></li>');
		}

		$.each(workWrapData, function (i) {
			if (i < workGroupALen) {
				groupAHtml += '					<div class="simple-list';
				$.each(workWrapData[i].hashtag, function (j) {
					groupAHtml += ' filter-' + workWrapData[i].hashtag[j];
				});
				groupAHtml += ' inview-work">';
				groupAHtml += '						<h4 class="subject"><span class="seq">' + workWrapData[i].seq + '</span> ' + workWrapData[i].subject + '</h4>';
				groupAHtml += '					</div>';
			} else {
				groupBHtml += '					<div class="simple-list';
				$.each(workWrapData[i].hashtag, function (j) {
					groupBHtml += ' filter-' + workWrapData[i].hashtag[j];
				});
				groupBHtml += ' inview-work">';
				groupBHtml += '						<h4 class="subject"><span class="seq">' + workWrapData[i].seq + '</span> ' + workWrapData[i].subject + '</h4>';
				groupBHtml += '					</div>';
			}
		});
		if (workLiTotal < 10) { 
			$('.group-a').html(groupAHtml);
		} else {
			$('.group-a').html(groupAHtml);
			$('.group-b').html(groupBHtml);
		}
		sorting();
	}

	if ($('body.pages-work-detail').length > 0) {
		var pageURL = window.document.location.href;
		$('#side-nav .menu-next, #side-nav .menu-prev').show();
		if (pageURL.indexOf(workSeqStart) != -1) {
			$('#side-nav .menu-prev').remove();
			$('#side-nav .side-menu').addClass('on-first');
		}
		if (pageURL.indexOf(workSeqEnd) != -1) {
			$('#side-nav .menu-next').remove();
			$('#side-nav .side-menu').addClass('on-last');
		}
	}
});

$(window).resize(function () {
	viewportW = $(window).width();
	if (viewportW > 1024) {
		workListSize('pc');
	} else {
		workListSize();
	}
});

/* work-list-viewport-check */
var workLiShowNum = '', workListShowType = '';
function workListSize(type) {
	$('.work-pages').filter(function () {
		if ($(this).find('.work-list > li').length > 0) {
			if (type != 'pc') {
				workLiShowNum = 4; workListShowType = 'mo';
			} else {
				workLiShowNum = $('.work-list > li').length; workListShowType = 'pc';
			}
		}
	});
}

function workDetailClose() {
	if (document.referrer && document.referrer.indexOf('/work.html') != -1) {
		history.back();
	} else {
		location.href = '../work.html';
	}
}
function workDetailNext(seq) {
	var nextSeq = seq * 1 + 1;
	if (nextSeq > workSeqEnd) {
		return false;
	} else {
		if (workSeqExcep.indexOf(nextSeq) != -1) {
			location.href = './w' + nextSeq + '.html';
		} else {
			location.href = './template.php?seq=' + nextSeq;
		}
	}
}
function workDetailPrev(seq) {
	var prevSeq = seq * 1 - 1;
	if (prevSeq < workSeqStart) {
		return false;
	} else {
		if (workSeqExcep.indexOf(prevSeq) != -1) {
			location.href = './w' + prevSeq + '.html';
		} else {
			location.href = './template.php?seq=' + prevSeq;
		}
	}
}
function workDetailFacebook(){
	var popupWidth = 600;
	var popupHeight = 800;
	var popupX = (window.screen.width / 2) - (popupWidth / 2);
	var popupY= (window.screen.height / 2) - (popupHeight / 2);
	var pageURL = window.document.location.href;
	window.open('https://www.facebook.com/sharer.php?u=' + pageURL, 'Facebook Share', 'top=' + popupY + ', left=' + popupX + ', width=' + popupWidth + ', height=' + popupHeight + ', resizable=yes');
}
function workDetailURLCopy(){
	var pageURL = window.document.location.href;
	var workURLIpt = document.getElementById('work-url');
	workURLIpt.value = pageURL;
	workURLIpt.select();
	workURLIpt.setSelectionRange(0,99999);
	document.execCommand('copy');
	alert('링크가 복사되었습니다');
}

/* contact.js */
$(function () {
	/* contact-form-check */
	$('.frm-input').on('change keyup paste mouseup focus blur', function (e) {
		var $this = $(this);
		var thisWrap = $this.closest('li');
		var thisValue = $this.val();

		thisWrap.removeClass('on-fill').addClass('on-focus');
		if (e.type === 'blur') thisWrap.removeClass('on-focus');
		thisWrap.removeClass('on-fill on-error');
		if (thisValue.length > 0) {
			thisWrap.addClass('on-fill');
			frmValueCheck($this);
		} else {
			thisWrap.removeClass('on-fill on-error');
		}
	});

	function frmValueCheck(t) {
		var $this = t;
		var thisWrap = $this.closest('.frm-item');
		var thisValue = $this.val();
		var thisVali = $this.data('validation');
		var regExp, returnVal;
		var isCheckbox = ($this.attr('type') == 'radio') || ($this.attr('type') == 'checkbox');
		var thisName = $this.attr('name');

		if (isCheckbox) {
			var $these = $('[name='+ thisName +']');
			var $selectbox = $these.filter(':checked');
			var valiCheck = !!$selectbox.length;
			$these.closest('.frm-item')[valiCheck ? 'removeClass' : 'addClass']('on-error');
		}

		var isTextArea = $this[0].nodeName.toLowerCase() == 'textarea';
		if (isTextArea) {
			checkTextAreaMaxLength($this,event);
		}

		if (thisValue.length > 0) {
			switch (thisVali) {
				case 'tel':
					$this.val($this.val().replace(/[^0-9]/g, ''));
					$this.val($this.val().replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,'$1-$2-$3'));
					regExp = /\d{2,4}-\d{3,4}-\d{3,4}/;
					returnVal = regExp.test(thisValue);
					if (!returnVal) {
						thisWrap.addClass('on-error');
					} else {
						thisWrap.removeClass('on-error');
					}
					break;
				case 'mail':
					$this.val($this.val().replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''));
					regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
					returnVal = regExp.test(thisValue);
					if (!returnVal) {
						thisWrap.addClass('on-error');
					} else {
						thisWrap.removeClass('on-error');
					}
					break;
				case 'file':
					var ext = thisValue.split('.').pop().toLowerCase();
					if ($.inArray(ext, ['pdf', 'zip']) == -1) {
						alert('첨부파일은 PDF, ZIP 형식으로 등록 가능합니다.');
						thisWrap.find('.file-icon').trigger('click');
					} else {
						var fileSize = $this[0].files[0].size;
						var maxSize = 10 * 1024 * 1024;
						if (fileSize > maxSize) {
							alert('첨부파일 사이즈는 10MB 이내로 등록 가능합니다.');
							thisWrap.find('.file-icon').trigger('click');
						}
					}
					thisWrap.removeClass('on-focus');
				default:
					/* if (thisValue.length === 0) {
						thisWrap.addClass('on-error');
					} else {
						thisWrap.removeClass('on-error');
					} */
			}
		}
	}

	function frmValueNullCheck(t,p) {
		var $this = t;
		var thisWrap = $this.closest('.frm-item');
		var thisValue = $this.val();
		var thisMust = $this.attr('required');
		var frmWrap = p;
		var isCheckbox = ($this.attr('type') == 'radio') || ($this.attr('type') == 'checkbox');
		var thisName = $this.attr('name');

		if (isCheckbox) {
			var $these = $('[name='+ thisName +']');
			var $selectbox = $these.filter(':checked');
			var valiCheck = !!$selectbox.length;
			$these.closest('.frm-item')[valiCheck ? 'removeClass' : 'addClass']('on-error');
		}

		if (thisMust) {
			if (thisValue.length <= 0) {
				thisWrap.addClass('on-error');
			} else {
				thisWrap.removeClass('on-error');
			}
		}
		var agreeChk = $(frmWrap).find('.frm-agree input').is(':checked');
		if (!agreeChk) {
			$(frmWrap).find('.frm-agree').addClass('on-error');
		} else {
			$(frmWrap).find('.frm-agree').removeClass('on-error');
		}
	}
	function frmErrorCheck(t) {
		var errorCount = $(t).find('.on-error').length;
		if (errorCount === 0) {
			var formName = $(t).children('form').attr('name');
			/* console.log('send mail', formName); */
			$('.' + formName).submit();
		} else {
			alert('필수 항목을 입력해주세요.');
		}
	}

	$('.request-frm .btn-frm-apply').on('click', function () {
		$('.request-form').find('input, select, textarea').each(function (i) {
			frmValueNullCheck($(this), '.request-frm');
		});
		frmErrorCheck('.request-frm');
	});
	$('.career-frm .btn-frm-apply').on('click', function () {
		$('.career-form').find('input, select, textarea').each(function (i) {
			frmValueNullCheck($(this), '.career-frm');
		});
		frmErrorCheck('.career-frm');
	});

	$('.agree-link').on('click', function () {
		var popID = $(this).data('pop-id');
		$('body').addClass('pop-open');
		$('#' + popID).fadeIn(200);
	});
	$('.pop-policy .ico-close').on('click', function () {
		var popID = $(this).closest('.pop-policy').attr('id');
		$('body').removeClass('pop-open');
		$('#' + popID).fadeOut(200);
	});

	function checkTextAreaMaxLength(textBox, e) { 
		var maxLength = parseInt($(textBox).data("length"));
		if (!checkSpecialKeys(e)) {
			if (textBox.val().length > maxLength - 1) textBox.val( textBox.val().substring(0, maxLength) ); 
		}
		var countText = $(textBox).data("count-class");
		$('.' + countText).html(textBox.val().length);
		return true; 
	}
	function checkSpecialKeys(e) { 
		if (e.keyCode != 8 && e.keyCode != 46 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40) 
			return false; 
		else 
			return true; 
	}
	if ($('.frm-select').length > 0) {
		$('.frm-select').each(function() {
			var classes = $(this).attr('class');
			var template =	'<div class="' + classes + '">';
				template += '	<span class="frm-select-trigger" data-mouse-control="type-i">' + $(this).attr("placeholder") + '</span>';
				template += '	<div class="frm-options">';
				$(this).find('option').each(function() {
					template += '		<span class="frm-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '" data-mouse-control="type-i">' + $(this).html() + '</span>';
				});
			template += '</div></div>';
			
			$(this).wrap('<div class="frm-select-wrapper"></div>');
			$(this).hide();
			$(this).after(template);
		});
	}
	$('.frm-option:first-of-type').hover(function () {
		$(this).parents('.frm-options').addClass('option-hover');
	}, function() {
		$(this).parents('.frm-options').removeClass('option-hover');
	});
	$('.frm-select-trigger').on('click', function () {
		$(this).closest('.frm-item').removeClass('on-error');
		$('html').one('click',function() {
			$('.frm-select').removeClass('opened');
		});
		$(this).parents('.frm-select').toggleClass('opened');
		$(this).closest('.frm-item').toggleClass('on-focus');
		event.stopPropagation();
	});
	$('.frm-option').on('click', function () {
		$(this).closest('.frm-item').removeClass('on-focus');
		$(this).parents('.frm-select-wrapper').find('select').val($(this).data('value'));
		$(this).parents('.frm-options').find('.frm-option').removeClass('selection');
		$(this).addClass('selection');
		$(this).parents('.frm-select').removeClass('opened');
		$(this).parents('.frm-select').find('.frm-select-trigger').text($(this).text());
	});

	$('.file-icon').on('click', function () {
		var target = $(this).siblings('.file-hidden');
		resetInputFile(target);
		$(this).closest('.frm-item').removeClass('on-fill');
		$(target).trigger('onchange');
	});
	function resetInputFile(t) {
		var agent = navigator.userAgent.toLowerCase();
		var $this = t;
		if((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) {
			$this.replaceWith($this.clone(true));
		} else {
			$this.val('');
		}
	}

	$.fn.slider = function(options){
		var settings = $.extend({
			startSlide: 0, 				/* 시작 슬라이드 */
			playSpeed: 3000,			/* 슬라이드 전환 속도 */
			slideSelector: this,		/* 슬라이드 셀렉터 */
			pagerSelector: '.pager',	/* 페이징 셀렉터 */
			nextSelector: '.next',		/* 다음 버튼 셀렉터 */
			prevSelector: '.prev'		/* 이전 버튼 셀렉터 */
		}, options);

		/* 값 저장 */
		var total = $(settings.slideSelector).children().length, reStartSlide, autoSlide;
		$(settings.slideSelector).children().eq(settings.startSlide).addClass('on').show();

		$(settings.nextSelector).on('click', function(e){ /* 다음 버튼 클릭 시 */
			var nowIndex = $(settings.slideSelector).children('.on').index();
			var clickIndex = nowIndex + 1;
			if (total <= clickIndex) clickIndex = 0;
			$(settings.pagerSelector).html(clickIndex + 1);
			moveSlide(nowIndex, clickIndex);
			reStart();
			e.preventDefault();
		});

		$(settings.prevSelector).on('click', function(e){ /* 이전 버튼 클릭 시 */
			var nowIndex = $(settings.slideSelector).children('.on').index();
			var clickIndex = nowIndex - 1;
			if ((clickIndex + 1) === 0) $(settings.pagerSelector).html(total);
			else $(settings.pagerSelector).html(clickIndex + 1);
			moveSlide(nowIndex, clickIndex);
			reStart();
			e.preventDefault();
		});

		function reStart(){ /* 자동 재생 재시작 시 */
			clearInterval(autoSlide);
			clearTimeout(reStartSlide);
			reStartSlide = setTimeout(function(){
				autoPlay();
			}, settings.playSpeed);
		}

		function autoPlay(){
			autoSlide = setInterval(function(){ /* 자동 슬라이드 재생 */
				$(settings.nextSelector).trigger('click');
			}, settings.playSpeed);
		}
		autoPlay();

		function moveSlide(oldIndex, newIndex){ /* 모션 처리 */
			if(oldIndex != newIndex){
				$(settings.slideSelector).children().eq(oldIndex).removeClass('on');
				$(settings.slideSelector).children().eq(newIndex).addClass('on');
			}
		}
	}
});