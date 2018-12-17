/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init Thumbnail
5. Init Quantity
6. Init Star Rating
7. Init Favorite
8. Init Tabs



******************************/

jQuery(document).ready(function ($) {
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var header = $('.header');
	var topNav = $('.top_nav')
	var hamburger = $('.hamburger_container');
	var menu = $('.hamburger_menu');
	var menuActive = false;
	var hamburgerClose = $('.hamburger_close');
	var fsOverlay = $('.fs_menu_overlay');

	setHeader();

	$(window).on('resize', function () {
		setHeader();
	});

	$(document).on('scroll', function () {
		setHeader();
	});

	initMenu();
	initThumbnail();
	initQuantity();
	initStarRating();
	initFavorite();
	initTabs();

	/* 

	2. Set Header

	*/

	function setHeader() {
		if (window.innerWidth < 992) {
			if ($(window).scrollTop() > 100) {
				header.css({ 'top': "0" });
			}
			else {
				header.css({ 'top': "0" });
			}
		}
		else {
			if ($(window).scrollTop() > 100) {
				header.css({ 'top': "-50px" });
			}
			else {
				header.css({ 'top': "0" });
			}
		}
		if (window.innerWidth > 991 && menuActive) {
			closeMenu();
		}
	}

	/* 

	3. Init Menu

	*/

	function initMenu() {
		if (hamburger.length) {
			hamburger.on('click', function () {
				if (!menuActive) {
					openMenu();
				}
			});
		}

		if (fsOverlay.length) {
			fsOverlay.on('click', function () {
				if (menuActive) {
					closeMenu();
				}
			});
		}

		if (hamburgerClose.length) {
			hamburgerClose.on('click', function () {
				if (menuActive) {
					closeMenu();
				}
			});
		}

		if ($('.menu_item').length) {
			var items = document.getElementsByClassName('menu_item');
			var i;

			for (i = 0; i < items.length; i++) {
				if (items[i].classList.contains("has-children")) {
					items[i].onclick = function () {
						this.classList.toggle("active");
						var panel = this.children[1];
						if (panel.style.maxHeight) {
							panel.style.maxHeight = null;
						}
						else {
							panel.style.maxHeight = panel.scrollHeight + "px";
						}
					}
				}
			}
		}
	}

	function openMenu() {
		menu.addClass('active');
		// menu.css('right', "0");
		fsOverlay.css('pointer-events', "auto");
		menuActive = true;
	}

	function closeMenu() {
		menu.removeClass('active');
		fsOverlay.css('pointer-events', "none");
		menuActive = false;
	}

	/* 

	4. Init Thumbnail

	*/

	function initThumbnail() {
		if ($('.single_product_thumbnails ul li').length) {
			var thumbs = $('.single_product_thumbnails ul li');
			var singleImage = $('.single_product_image_background');

			thumbs.each(function () {
				var item = $(this);
				item.on('click', function () {
					thumbs.removeClass('active');
					item.addClass('active');
					var img = item.find('img').data('image');
					singleImage.css('background-image', 'url(' + img + ')');
				});
			});
		}
	}

	/* 

	5. Init Quantity

	*/

	function initQuantity() {
		if ($('.plus').length && $('.minus').length) {
			var plus = $('.plus');
			var minus = $('.minus');
			var value = $('#quantity_value');

			plus.on('click', function () {
				var x = parseInt(value.text());
				value.text(x + 1);
			});

			minus.on('click', function () {
				var x = parseInt(value.text());
				if (x > 1) {
					value.text(x - 1);
				}
			});
		}
	}

	/* 

	6. Init Star Rating

	*/

	function initStarRating() {
		if ($('.user_star_rating li').length) {
			var stars = $('.user_star_rating li');

			stars.each(function () {
				var star = $(this);

				star.on('click', function () {
					var i = star.index();

					stars.find('i').each(function () {
						$(this).removeClass('fa-star');
						$(this).addClass('fa-star-o');
					});
					for (var x = 0; x <= i; x++) {
						$(stars[x]).find('i').removeClass('fa-star-o');
						$(stars[x]).find('i').addClass('fa-star');
					};
				});
			});
		}
	}

	/* 

	7. Init Favorite

	*/

	function initFavorite() {
		if ($('.product_favorite').length) {
			var fav = $('.product_favorite');

			fav.on('click', function () {
				fav.toggleClass('active');
			});
		}
	}

	/* 

	8. Init Tabs

	*/

	function initTabs() {
		if ($('.tabs').length) {
			var tabs = $('.tabs li');
			var tabContainers = $('.tab_container');

			tabs.each(function () {
				var tab = $(this);
				var tab_id = tab.data('active-tab');

				tab.on('click', function () {
					if (!tab.hasClass('active')) {
						tabs.removeClass('active');
						tabContainers.removeClass('active');
						tab.addClass('active');
						$('#' + tab_id).addClass('active');
					}
				});
			});
		}
	}
});
/* 

*****************************************************************************************************************************************************************************************

*/
appname();

datas = ''
function appname() {
	var app = localStorage.getItem('appname');
	console.log('55555++++++',app);
	
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "http://localhost:8080/appname/" + app, true);
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4) {
			console.log(this.responseText);
			var text = this.responseText;
			var data = JSON.parse(text);
			datas = data;
			console.log('55555',data);
			for (var i = 0; i < datas.length; i++) {
				var detail = '<a href="single.html"><i class="fa fa-angle-right" aria-hidden="true"></i>' + datas[i].app + '</a>'
				console.log(datas[i].app);
			}
			document.getElementById('productname').innerHTML = detail;
			detailPro(data);
			comment(app);	
		}
	};
	xhttp.send();
}

function detailPro(datadetail) {
	console.log('666666',datadetail);

	for (var i = 0; i < datadetail.length; i++) {

		var details = '<div class="product_details_title">' +
			'<h2>' + datadetail[i].app + '</h2>' +
			'<p>Category :  ' + datadetail[i].app + '</p>' +
			'</div>' +
			'<div class="free_delivery d-flex flex-row align-items-center justify-content-center">' +
			'<span class="ti-truck"></span><span>' + datadetail[i].type + '</span>' +
			'</div>' +
			'<div class="original_price">' + datadetail[i].price + ' $</div>' +
			'<div class="product_price">Price : ' + datadetail[i].price + ' $</div>' +
			'<br><br>' +
			'<div class="product_price">Reviews : ' + datadetail[i].reviews + '   </div>' +
			'<ul class="star_rating">' +
			'<span class="rating-static rating-'+datadetail[i].rating*10+'"></span>'+	
			'</ul>' +
			'<br><br>' +
			'<i class="fa fa-download" style="font-size:24px;color: #0099ff"></i>&nbsp;&nbsp;&nbsp;&nbsp;<div class="product_price">Installs : ' + datadetail[i].reviews + ' Users</div>' +
			'<div class="quantity d-flex flex-column flex-sm-row align-items-sm-center">' +
			'<div class="red_button add_to_cart_button"><a href="#">Download Now</a></div>' +
			'<div class="product_favorite d-flex flex-column align-items-center justify-content-center"></div>' +
			'</div>';

		var detailadd = '<div class="row">' +
			'<div class="col additional_info_col">' +
			'<div class="tab_title additional_info_title">' +
			'<h4>Additional Information</h4>' +
			'</div>' +
			'<p>SIZE :<span>' + datadetail[i].size + '</span></p>' +
			'<p>CONTENT RATING :<span>' + datadetail[i].contentRating + '</span></p>' +
			'<p>LAST UPDATE :<span>' + datadetail[i].lastUpdated + '</span></p>' +
			'<p>CURRENT VERSION :<span>' + datadetail[i].currentVer + '</span></p>' +
			'<p>ANDROID VERSION :<span>' + datadetail[i].androidVer + '</span></p>' +
			'</div>' +
			'</div>';
	}

	document.getElementById('product_detail').innerHTML = details;
	document.getElementById('Additional').innerHTML = detailadd;


}

	function comment(datas) {
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", "http://localhost:8080/Appuser/"+datas, true);
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4) {
				console.log(this.responseText);
				var text = this.responseText;
				var data = JSON.parse(text);
				var detail = '<div class="tab_title reviews_title"><h4>Reviews ('+ data.length +')</h4></div>';
				for (var i = 0; i < data.length; i++) {
					detail = detail +
					'<div class="user_review_container d-flex flex-column flex-sm-row">'+
					'<div class="user">'+
						'<div class="user_pic"></div>'+
						'<div class="user_rating">'+
							'<ul class="star_rating">'+
								'<li>'+
									'<i class="fa fa-star" aria-hidden="true"></i>'+
								'</li>'+
								'<li>'+
									'<i class="fa fa-star" aria-hidden="true"></i>'+
								'</li>'+
								'<li>'+
									'<i class="fa fa-star" aria-hidden="true"></i>'+
								'</li>'+
								'<li>'+
									'<i class="fa fa-star" aria-hidden="true"></i>'+
								'</li>'+
								'<li>'+
									'<i class="fa fa-star-o" aria-hidden="true"></i>'+
								'</li>'+
							'</ul>'+
						'</div>'+
					'</div>'+
					'<div class="review">'+
						'<div class="review_date">27 Aug 2016</div>'+
						'<div class="user_name">Sentiment : '+data[i].sentiment+'</div>'+
						'<p>'+data[i].translated_Review+'.</p>'+
					'</div>'+
				'</div>';

				}
				var detailre = '<span>Reviews ('+data.length+')</span>'
				console.log(detail);

				document.getElementById('comments').innerHTML = detail;
				document.getElementById('reviewnum').innerHTML = detailre;


			} 
		};

		xhttp.send();
	}

