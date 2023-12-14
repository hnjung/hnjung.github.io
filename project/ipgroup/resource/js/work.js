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