/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init Favorite
5. Init Fix Product Border
6. Init Isotope Filtering
7. Init Price Slider
8. Init Checkboxes



******************************/

jQuery(document).ready(function ($) {
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var header = $('.header');
	var topNav = $('.top_nav')
	var mainSlider = $('.main_slider');
	var hamburger = $('.hamburger_container');
	var menu = $('.hamburger_menu');
	var menuActive = false;
	var hamburgerClose = $('.hamburger_close');
	var fsOverlay = $('.fs_menu_overlay');

	setHeader();

	$(window).on('resize', function () {
		initFixProductBorder();
		setHeader();
	});

	$(document).on('scroll', function () {
		setHeader();
	});

	initMenu();
	initFavorite();
	initFixProductBorder();
	initIsotopeFiltering();
	initPriceSlider();
	initCheckboxes();

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

	4. Init Favorite

	*/

	function initFavorite() {
		if ($('.favorite').length) {
			var favs = $('.favorite');

			favs.each(function () {
				var fav = $(this);
				var active = false;
				if (fav.hasClass('active')) {
					active = true;
				}

				fav.on('click', function () {
					if (active) {
						fav.removeClass('active');
						active = false;
					}
					else {
						fav.addClass('active');
						active = true;
					}
				});
			});
		}
	}

    /* 

	5. Init Fix Product Border

	*/

	function initFixProductBorder() {
		if ($('.product_filter').length) {
			var products = $('.product_filter:visible');
			var wdth = window.innerWidth;

			// reset border
			products.each(function () {
				$(this).css('border-right', 'solid 1px #e9e9e9');
			});

			// if window width is 991px or less

			if (wdth < 480) {
				for (var i = 0; i < products.length; i++) {
					var product = $(products[i]);
					product.css('border-right', 'none');
				}
			}

			else if (wdth < 576) {
				if (products.length < 5) {
					var product = $(products[products.length - 1]);
					product.css('border-right', 'none');
				}
				for (var i = 1; i < products.length; i += 2) {
					var product = $(products[i]);
					product.css('border-right', 'none');
				}
			}

			else if (wdth < 768) {
				if (products.length < 5) {
					var product = $(products[products.length - 1]);
					product.css('border-right', 'none');
				}
				for (var i = 2; i < products.length; i += 3) {
					var product = $(products[i]);
					product.css('border-right', 'none');
				}
			}

			else if (wdth < 992) {
				if (products.length < 5) {
					var product = $(products[products.length - 1]);
					product.css('border-right', 'none');
				}
				for (var i = 2; i < products.length; i += 3) {
					var product = $(products[i]);
					product.css('border-right', 'none');
				}
			}

			//if window width is larger than 991px
			else {
				if (products.length < 5) {
					var product = $(products[products.length - 1]);
					product.css('border-right', 'none');
				}
				for (var i = 3; i < products.length; i += 4) {
					var product = $(products[i]);
					product.css('border-right', 'none');
				}
			}
		}
	}

    /* 

	6. Init Isotope Filtering

	*/

	function initIsotopeFiltering() {
		var sortTypes = $('.type_sorting_btn');
		var sortNums = $('.num_sorting_btn');
		var sortTypesSelected = $('.sorting_type .item_sorting_btn is-checked span');
		var filterButton = $('.filter_button');

		if ($('.product-grid').length) {
			$('.product-grid').isotope({
				itemSelector: '.product-item',
				getSortData: {
					price: function (itemElement) {
						var priceEle = $(itemElement).find('.product_price').text().replace('$', '');
						return parseFloat(priceEle);
					},
					name: '.product_name'
				},
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				}
			});

			// Short based on the value from the sorting_type dropdown
			sortTypes.each(function () {
				$(this).on('click', function () {
					$('.type_sorting_text').text($(this).text());
					var option = $(this).attr('data-isotope-option');
					option = JSON.parse(option);
					$('.product-grid').isotope(option);
				});
			});

			// Show only a selected number of items
			sortNums.each(function () {
				$(this).on('click', function () {
					var numSortingText = $(this).text();
					var numFilter = ':nth-child(-n+' + numSortingText + ')';
					$('.num_sorting_text').text($(this).text());
					$('.product-grid').isotope({ filter: numFilter });
				});
			});

			// Filter based on the price range slider
			filterButton.on('click', function () {
				$('.product-grid').isotope({
					filter: function () {
						var priceRange = $('#amount').val();
						var priceMin = parseFloat(priceRange.split('-')[0].replace('$', ''));
						var priceMax = parseFloat(priceRange.split('-')[1].replace('$', ''));
						var itemPrice = $(this).find('.product_price').clone().children().remove().end().text().replace('$', '');

						return (itemPrice >= priceMin) && (itemPrice <= priceMax);
					},
					animationOptions: {
						duration: 750,
						easing: 'linear',
						queue: false
					}
				});
			});
		}
	}

    /* 

	7. Init Price Slider

	*/

	function initPriceSlider() {
		$("#slider-range").slider(
			{
				range: true,
				min: 0,
				max: 50,
				values: [0, 25],
				slide: function (event, ui) {
					$("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
				}
			});

		$("#amount").val("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));
	}

    /* 

	8. Init Checkboxes

	*/

	function initCheckboxes() {
		if ($('.checkboxes li').length) {
			var boxes = $('.checkboxes li');

			boxes.each(function () {
				var box = $(this);

				box.on('click', function () {
					if (box.hasClass('active')) {
						box.find('i').removeClass('fa-square');
						box.find('i').addClass('fa-square-o');
						box.toggleClass('active');
					}
					else {
						box.find('i').removeClass('fa-square-o');
						box.find('i').addClass('fa-square');
						box.toggleClass('active');
					}
					// box.toggleClass('active');
				});
			});

			if ($('.show_more').length) {
				var checkboxes = $('.checkboxes');

				$('.show_more').on('click', function () {
					checkboxes.toggleClass('active');
				});
			}
		};
	}
});
initStarRating();
Productdata = '';
var ContentRating = [];
products();

function detail(appname) {
	localStorage.setItem("appname", appname);

}
function products() {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "http://localhost:8080/appname", true);
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4) {
			console.log(this.responseText);
			var text = this.responseText;
			var data = JSON.parse(text);
			Productdata = data;
			var detail = '<div class="product-grid row">';
			for (var i = 0; i < 1000; i++) {
				detail = detail +
					'<div class="product-item ' + data[i].type + '">' +
					'<div class="product product_filter">' +
					'<div class="product_image">' +
					'<img src="images/product_5.png" alt="">' +
					'</div>' +
					'<div class="favorite"></div>' +
					'<div class="product_bubble product_bubble_left product_bubble_green d-flex flex-column align-items-center">' +
					'<span>' + data[i].type + '</span>' +
					'</div>' +
					'<div class="product_info">' +
					'<div class="product_price">' + data[i].price + '</div> USD' +
					'<h6 class="product_name" id="truncate">' + data[i].app + '</a></h6>' +
					'<span  class="rating-static rating-' + data[i].rating * 10 + '"><div id="reviews" >' + data[i].reviews + '</div></span>' +
					'</div>' +
					'</div>' +
					'<div class="red_button add_to_cart_button"><a href="single.html"  onclick="detail(' + "'" + data[i].app + "'" + ')">MORE DETAIL</a></div>' +
					'</div>';
					
			ContentRating.push(data[i].contentRating);
			}
			filtercontent(ContentRating)

			detail = detail + '</div>';

			document.getElementById('prodetail').innerHTML = detail;
		}
	};

	xhttp.send();
	
}
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
function rating(rating) {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "http://localhost:8080/rating/" + rating, true);

	console.log("http://localhost:8080/rating/" + rating);

	xhttp.onreadystatechange = function () {
		if (this.readyState == 4) {
			console.log(this.responseText);
			var text = this.responseText;
			var data = JSON.parse(text);
			Productdata = data;
			var detail = '<div class="product-grid row">';
			for (var i = 0; i < data.length; i++) {
	
				detail = detail +
					'<div class="product-item ' + data[i].type + '">' +
					'<div class="product product_filter">' +
					'<div class="product_image">' +
					'<img src="images/product_5.png" alt="">' +
					'</div>' +
					'<div class="favorite"></div>' +
					'<div class="product_bubble product_bubble_left product_bubble_green d-flex flex-column align-items-center">' +
					'<span>' + data[i].type + '</span>' +
					'</div>' +
					'<div class="product_info">' +
					'<div class="product_price">' + data[i].price + '</div> USD' +
					'<h6 class="product_name" id="truncate">' + data[i].app + '</a></h6>' +
					'<span  class="rating-static rating-' + data[i].rating * 10 + '"><div id="reviews" >' + data[i].reviews + '</div></span>' +
					'</div>' +
					'</div>' +
					'<div class="red_button add_to_cart_button"><a href="single.html"  onclick="detail(' + "'" + data[i].app + "'" + ')">MORE DETAIL</a></div>' +
					'</div>';


			}
			detail = detail + '</div>';

			document.getElementById('prodetail').innerHTML = detail;
		}
	};

	xhttp.send();
}
function filtersearch(searchdata) {
	console.log(searchdata);

	const filterItems = (needle, heystack) => {
		let query = needle.toLowerCase();
		return heystack.filter(item => item.app.toLowerCase().indexOf(needle) >= 0);
	}
	var item = filterItems(searchdata.toLowerCase(), Productdata);
	console.log(item)
	search(item);
}

function search(item) {


	var detail = '<div class="col"><div class="product-grid row" data-isotope=' + '"' + '{ "itemSelector": ".product-item", "layoutMode": "fitRows" }' + '"' + '>';
	for (var i = 0; i < item.length; i++) {

		detail = detail +
			'<div class="product-item ' + item[i].type + '">' +
			'<div class="product product_filter">' +
			'<div class="product_image">' +
			'<img src="images/product_5.png" alt="">' +
			'</div>' +
			'<div class="favorite"></div>' +
			'<div class="product_bubble product_bubble_left product_bubble_green d-flex flex-column align-items-center">' +
			'<span>' + item[i].type + '</span>' +
			'</div>' +
			'<div class="product_info">' +
			'<div class="product_price">' + item[i].price + '</div> USD' +
			'<h6 class="product_name" id="truncate">' + item[i].app + '</a></h6>' +
			'<span  class="rating-static rating-' + item[i].rating * 10 + '"><div id="reviews" >' + item[i].reviews + '</div></span>' +
			'</div>' +
			'</div>' +
			'<div class="red_button add_to_cart_button"><a href="single.html"  onclick="detail(' + "'" + item[i].app + "'" + ')">MORE DETAIL</a></div>' +
			'</div>';

	}
	detail = detail + '</div></div>';


	document.getElementById('prodetail').innerHTML = detail;
}
var Category = []
recategory();
function recategory() {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "http://localhost:8080/category", true);
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4) {
			console.log(this.responseText);
			var text = this.responseText;
			var data = JSON.parse(text);
			for (var i = 0; i < data.length; i++) {
				Category.push(data[i].category);
			} filtercategory(Category)
		}
	}
	xhttp.send();

};

function filtercategory(Category) {
	const object = {};
	const result = [];

	Category.forEach(item => {
		if (!object[item])
			object[item] = 0;
		object[item] += 1;
	})

	for (const prop in object) {
		if (object[prop] >= 2) {
			result.push(prop);
		}
	}

	category(result)

}

function category(result) {
      var detail = ''
	for (var i = 0; i < result.length; i++) {
		var detail = detail + '<li><i class="fa fa-square-o" aria-hidden="true" onclick="findbycategory(' + "'" + result[i] + "'" + ')"></i>' +
			'<span>' + result[i] + '</span>' +
			'</li>';
	}
	detail = detail + '</div>';
	

	document.getElementById('category').innerHTML = detail;
}

function findbycategory(result) {

	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "http://localhost:8080/category/" + result, true);

	xhttp.onreadystatechange = function () {
		if (this.readyState == 4) {
			console.log(this.responseText);
			var text = this.responseText;
			var data = JSON.parse(text);
			Productdata = data;
			var detail = '<div class="product-grid row">';
			for (var i = 0; i < data.length; i++) {

				detail = detail +
					'<div class="product-item ' + data[i].type + '">' +
					'<div class="product product_filter">' +
					'<div class="product_image">' +
					'<img src="images/product_5.png" alt="">' +
					'</div>' +
					'<div class="favorite"></div>' +
					'<div class="product_bubble product_bubble_left product_bubble_green d-flex flex-column align-items-center">' +
					'<span>' + data[i].type + '</span>' +
					'</div>' +
					'<div class="product_info">' +
					'<div class="product_price">' + data[i].price + '</div> USD' +
					'<h6 class="product_name" id="truncate">' + data[i].app + '</a></h6>' +
					'<span  class="rating-static rating-' + data[i].rating * 10 + '"><div id="reviews" >' + data[i].reviews + '</div></span>' +
					'</div>' +
					'</div>' +
					'<div class="red_button add_to_cart_button"><a href="single.html"  onclick="detail(' + "'" + data[i].app + "'" + ')">MORE DETAIL</a></div>' +
					'</div>';


			}
			detail = detail + '</div>';

			document.getElementById('prodetail').innerHTML = detail;
		}
	};

	xhttp.send();

}

function filtercontent(ContentRating) {
	const object = {};
	const results = [];

	ContentRating.forEach(item => {
		if (!object[item])
			object[item] = 0;
		object[item] += 1;
	})

	for (const prop in object) {
		if (object[prop] >= 2) {
			results.push(prop);
		}
	}

	ContentRate(results)

}

function ContentRate(results) {
      var detail = ''
	for (var i = 0; i < results.length; i++) {
		var detail = detail + '<li><i class="fa fa-square-o" aria-hidden="true" onclick="findbyContentRating(' + "'" + results[i] + "'" + ')"></i>' +
			'<span>' + results[i] + '</span>' +
			'</li>';
	}
	detail = detail + '</div>';

	document.getElementById('ContentRating').innerHTML = detail;
}
function findbyContentRating(results) {

	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "http://localhost:8080/ContentRating/" + results, true);

	xhttp.onreadystatechange = function () {
		if (this.readyState == 4) {
			console.log(this.responseText);
			var text = this.responseText;
			var data = JSON.parse(text);
			var detail = '<div class="product-grid row">';
			for (var i = 0; i < data.length; i++) {

				detail = detail +
					'<div class="product-item ' + data[i].type + '">' +
					'<div class="product product_filter">' +
					'<div class="product_image">' +
					'<img src="images/product_5.png" alt="">' +
					'</div>' +
					'<div class="favorite"></div>' +
					'<div class="product_bubble product_bubble_left product_bubble_green d-flex flex-column align-items-center">' +
					'<span>' + data[i].type + '</span>' +
					'</div>' +
					'<div class="product_info">' +
					'<div class="product_price">' + data[i].price + '</div> USD' +
					'<h6 class="product_name" id="truncate">' + data[i].app + '</a></h6>' +
					'<span  class="rating-static rating-' + data[i].rating * 10 + '"><div id="reviews" >' + data[i].reviews + '</div></span>' +
					'</div>' +
					'</div>' +
					'<div class="red_button add_to_cart_button"><a href="single.html"  onclick="detail(' + "'" + data[i].app + "'" + ')">MORE DETAIL</a></div>' +
					'</div>';
			}
			detail = detail + '</div>';

			document.getElementById('prodetail').innerHTML = detail;
		}
	};

	xhttp.send();

}