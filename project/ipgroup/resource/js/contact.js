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