/*------------------------------------*\
          	$ENVIRONMENT
\*------------------------------------*/
var environment = 'desktop';
var environmentChanged = false;
var tabulationMode = false;

function viewport() {
    var e = window,
        a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return {
        width: e[a + 'Width'],
        height: e[a + 'Height']
    };
}


var windowWidth = viewport().width; // This should match your media query
function testEnvironment() {
    var currentEnvironment = environment;
    windowWidth = viewport().width;
    if (windowWidth <= 1279 && windowWidth > 639) {
        environment = 'tablette';
    } else if (windowWidth <= 639) {
        environment = 'mobile';
    } else {
        environment = 'desktop';
    }
    if (currentEnvironment != environment) {
        return true;
    } else {
        return false;
    }
}
/*Cible MAC Uniquement*/
if (navigator.userAgent.indexOf('Mac') > 0) {
    $('body').addClass('mac');
}

function hackFloatRight() {}

/*------------------------------------*\
            $SEARCHENGINE
\*------------------------------------*/
function manageAutoComplete() {
    if ($('.searchEngine').length) {
        if (environment == 'desktop') {
            $('.searchEngine input').autocomplete('enable');
        } else {
            $('.searchEngine input').autocomplete('disable');
        }
    }
}

function swapPlanRWD() {
    if ($('.page--infos-plan-musee').length) {
        //var link = '../images/Plans/';
        var link = $('input[name=plan-src]').val();
        if (environment == "desktop") {
            $('section.plan').each(function() {
                var planNumber = $(this).data('plan');
                var url = link + 'plan-' + planNumber + '--desktop.jpg';
                $(this).find('img').attr('src', url);
            })
        } else {
            $('section.plan').each(function() {
                var planNumber = $(this).data('plan');
                var url = link + 'plan-' + planNumber + '--mobile.jpg';
                $(this).find('img').attr('src', url);
            })
        }
    }
}

// Si le navigateur ne prend pas en charge le placeholder
if (document.createElement('input').placeholder == undefined) {
    // Champ avec un attribut HTML5 placeholder
    $('[placeholder]')
    // Au focus on clean si sa valeur équivaut à celle du placeholder
    .focus(function() {
        if ($(this).val() == $(this).attr('placeholder')) {
            $(this).val('');
        }
    })
    // Au blur on remet le placeholder si le champ est laissé vide
    .blur(function() {
        if ($(this).val() == '') {
            $(this).val($(this).attr('placeholder'));
        }
    })
    // On déclenche un blur afin d'initialiser le champ
    .blur()
    // Au submit on clean pour éviter d'envoyer la valeur du placeholder
    .parents('form').submit(function() {
        $(this).find('[placeholder]').each(function() {
            if ($(this).val() == $(this).attr('placeholder')) {
                $(this).val('');
            }
        });
    });
}

// Vidéo pour -webkit navigateurs
var $video = $('#bgvid');
$video.on('canplaythrough', function() {
    this.play();
});

// FALLBACK CALC
function testCalcSupported() {
    var el = document.createElement("div");
    var isCalcSupported;

    el.style.cssText = "width: calc(2em);"; //adapter pour inclure les préfixes nécessaires
    isCalcSupported = !!el.style.length;
    if (isCalcSupported) {
        return true;
    } else {
        return false;
    }
}

// Calc Titre Page RWD
function calcTitrePage() {
    if ($('.titrePage').length) {
        var maxWidth = $('.headerRWD').width();
        var minus1 = $('.headerRwd .blocLogo').outerWidth(true);
        var minus2 = $('.search-icon-mobile').width() + 172;
        var calculatedWidth;

        if (environment == 'tablette') {
            calculatedWidth = maxWidth - minus1 - minus2 - 25;
            $('.titrePage').css('width', calculatedWidth);
        } else if (environment == 'mobile') {
            calculatedWidth = maxWidth - minus1 - minus2 - 12.5;
            $('.titrePage').css('width', calculatedWidth);
        }
    }
}

/*------------------------------------*\
                $Lang
\*------------------------------------*/
function toggleLangAction() {
    if (environment == 'desktop') {
        $('header .blocLang .lang .langSelect').off('click');
        $('header .blocLang .lang .langSelect').on('click', function() {
            $(this).find('.langHidden').removeClass('hidden');
        }).on('mouseleave', function() {
            $(this).find('.langHidden').addClass('hidden');
        });
    } else {
        $('header .blocLang .lang .langSelect').off();
        $('header .blocLang .lang .langSelect').on('click', function(e) {
            if ($('header .blocLang .lang .langSelect .langHidden.hidden').length) {
                e.preventDefault();
            }

            $(this).find('.langHidden').toggleClass('hidden');
        })
        $('header .blocLang .lang .langSelect').focusout(function() {
            $(this).find('.langHidden').addClass('hidden');
        });
    }
}
/*------------------------------------*\
            $DotDotDot
\*------------------------------------*/
function dotRWD() {
    if (environment == 'desktop') {
        $('.gallery--artips-4 .vignette .title').dotdotdot({
            wrap: 'word',
            height: 85,
            watch: true
        });
        $('.gallery--artips-6 .vignette .title').dotdotdot({
            wrap: 'word',
            height: 85,
            watch: true
        });
        $('.gallery--parcours-4 .vignette .title').dotdotdot({
            wrap: 'word',
            height: 65,
            watch: true
        });
        $('.gallery--collection-4 .vignette .title').dotdotdot({
            wrap: 'word',
            height: 85,
            watch: true
        });
        $('.gallery--oeuvre-4 .vignette .title').dotdotdot({
            wrap: 'word',
            height: 40,
            watch: true
        });
        $('.gallery--oeuvre-6 .vignette .title').dotdotdot({
            wrap: 'word',
            height: 40,
            watch: true
        });
        $('.actu--item .title').dotdotdot({
            wrap: 'word',
            height: 60,
            watch: true
        });
        $('.mini-actu .title').dotdotdot({
            wrap: 'word',
            height: 90,
            watch: true
        });
        $('.contenuTitre h1').dotdotdot({
            wrap: 'word',
            height: 135,
            watch: true
        });
        $('.contenuTitre p').dotdotdot({
            wrap: 'word',
            height: 65,
            watch: true
        });
        $('.actu-slider h1').dotdotdot({
            wrap: 'word',
            height: 70,
            watch: true
        });
        $('.actu-slider .sous-titre-actu').dotdotdot({
            wrap: 'word',
            height: 110,
            watch: true
        });
        $('.actu-slider .contenu-actu').dotdotdot({
            wrap: 'word',
            height: 140,
            watch: true
        });
        $('.actu-slider .contenu-actu .bigger').dotdotdot({
            wrap: 'word',
            height: 70,
            watch: true
        });
        $('.arianne h1').dotdotdot({
            wrap: 'word',
            height: 50,
            watch: true
        });
        $('.nommagePhoto').dotdotdot({
            wrap: 'letter',
            height: 48,
            watch: true
        });
    } else if (environment == 'tablette') {
        $('.gallery--artips-4 .vignette .title').dotdotdot({
            wrap: 'word',
            height: 120,
            watch: true
        });
        $('.gallery--artips-6 .vignette .title').dotdotdot({
            wrap: 'word',
            height: 120,
            watch: true
        });
        $('.gallery--parcours-4 .vignette .title').dotdotdot({
            wrap: 'word',
            height: 150,
            watch: true
        });
        $('.gallery--collection-4 .vignette .title').dotdotdot({
            wrap: 'word',
            height: 85,
            watch: true
        });
        $('.gallery--oeuvre-4 .vignette .title').dotdotdot({
            wrap: 'word',
            height: 57,
            watch: true
        });
        $('.gallery--oeuvre-6 .vignette .title').dotdotdot({
            wrap: 'word',
            height: 57,
            watch: true
        });
        $('.mini-actu .title').dotdotdot({
            wrap: 'word',
            height: 60,
            watch: true
        });
        $('.contenuTitre h1').dotdotdot({
            wrap: 'word',
            height: 135,
            watch: true
        });
        $('.contenuTitre p').dotdotdot({
            wrap: 'word',
            height: 65,
            watch: true
        });
        $('.actu-slider h1').dotdotdot({
            wrap: 'word',
            height: 70,
            watch: true
        });
        $('.actu-slider .sous-titre-actu').dotdotdot({
            wrap: 'word',
            height: 110,
            watch: true
        });
        $('.actu-slider .contenu-actu').dotdotdot({
            wrap: 'word',
            height: 140,
            watch: true
        });
        $('.actu-slider .contenu-actu .bigger').dotdotdot({
            wrap: 'word',
            height: 70,
            watch: true
        });
        $('.sousTitrePage').dotdotdot({
            wrap: 'word',
            height: 31,
            watch: true
        });
    } else {
        $('.gallery--artips-4 .vignette .title').dotdotdot({
            wrap: 'word',
            height: 60,
            watch: true
        });
        $('.gallery--artips-6 .vignette .title').dotdotdot({
            wrap: 'word',
            height: 60,
            watch: true
        });
        $('.gallery--parcours-4 .vignette .title').dotdotdot({
            wrap: 'word',
            height: 75,
            watch: true
        });
        $('.gallery--collection-4 .vignette .title').dotdotdot({
            wrap: 'word',
            height: 42,
            watch: true
        });
        $('.gallery--oeuvre-4 .vignette .title').dotdotdot({
            wrap: 'word',
            height: 28,
            watch: true
        });
        $('.gallery--oeuvre-6 .vignette .title').dotdotdot({
            wrap: 'word',
            height: 28,
            watch: true
        });
        $('.mini-actu .title').dotdotdot({
            wrap: 'word',
            height: 30,
            watch: true
        });
        $('.contenuTitre h1').dotdotdot({
            wrap: 'word',
            height: 70,
            watch: true
        });
        $('.contenuTitre p').dotdotdot({
            wrap: 'word',
            height: 32,
            watch: true
        });
        $('.actu-slider h1').dotdotdot({
            wrap: 'word',
            height: 35,
            watch: true
        });
        $('.actu-slider .sous-titre-actu').dotdotdot({
            wrap: 'word',
            height: 55,
            watch: true
        });
        $('.actu-slider .contenu-actu').dotdotdot({
            wrap: 'word',
            height: 70,
            watch: true
        });
        $('.actu-slider .contenu-actu .bigger').dotdotdot({
            wrap: 'word',
            height: 70,
            watch: true
        });
        $('.sousTitrePage').dotdotdot({
            wrap: 'word',
            height: 16,
            watch: true
        });
    }

    $('.dotme').dotdotdot({
        wrap: 'word',
        watch: true
    });
}

function dot() {
    $('.gallery--collection-locked-4 .vignette .title').dotdotdot({
        wrap: 'word',
        height: 85,
        watch: true
    });
    $('.gallery--plan-6 .vignette .title').dotdotdot({
        wrap: 'word',
        height: 40,
        watch: true
    });
    $('.nommagePhoto').dotdotdot({
        wrap: 'letter',
        height: 48,
        watch: true
    });
}


function infoPratiqueTime() {
    var d = new Date();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    var day = d.getDay();
    $('#hours').replaceWith(hours);
    //$('#day').replaceWith(day);
    $('#minutes').replaceWith(minutes);
    $('#seconds').replaceWith(seconds);
    /* Switch musée OUVERT / FERME */

    if ( (day == 1 && hours >= 14 && hours < 18) ||
		 ( (day  == 0 || day > 2) && hours >= 10 && hours < 18) ) {
        $('.bloc-green').addClass('ouvert');
        $('.bloc-green').removeClass('ferme');
    } else {
        $('.bloc-green').addClass('ferme');
        $('.bloc-green').removeClass('ouvert');
    }
}

var video_width;
var video_height;

// Swap
function swapPicture() {
    if ($('.infos-gallery').length) {
        $('.gallery-picto').on('click', function() {
            var src = $(this).data('target');
            var url = src;
            $('.sliderFicheOeuvre .oeuvre-visu img').attr('src', url);
        })
    }
}
var sliderOeuvre;

function buildSliderOeuvre() {

    //console.log('lalalalal');
    if ($('.sliderOeuvre').length) {
        if (environment != "desktop") {
            if(!$('.sliderFicheOeuvre .bx-viewport').length){
                $('.sliderOeuvre li:not(.visible-desktop)').each(function(i) {
                    $('.sliderFicheOeuvre').find('.pagerSquare').append('<a data-slide-index="' + i + '" href=""><div class="pager-square"></div></a>');
                })
                // console.log(sliderOeuvre);
                //console.log('oh yeah');
                sliderOeuvre = $('.sliderOeuvre').bxSlider({
                    startSlide: '0',
                    pagerCustom: $('.pagerSquare'),
                    prevSelector: $('.sliderFicheOeuvre').find('.prevPage'),
                    nextSelector: $('.sliderFicheOeuvre').find('.nextPage'),
                    nextText: '',
                    prevText: '',
                    slideSelector: 'li.visible-mobile',
                    adaptiveHeight: true
                });
            }
        } else {
            if (sliderOeuvre) {
                sliderOeuvre.destroySlider();
                $('.sliderFicheOeuvre .oeuvre-visu').css('width', '735px');
                $('.sliderFicheOeuvre .oeuvreControls').append('<div class="pagerSquare"></div>');
            }
        }
    }
}

function positionRWD() {
    if (environment == 'desktop') {
        $('.Home-page .hide-video-mobile').appendTo(".classeVideo");
        $("#tablette-appli").insertAfter('#tablette-appli-after');
        $("#logo2").insertBefore('#logo3');
        $("#logo7").insertAfter('#logo6');
        $("#logo9").insertAfter('#logo8');
        $("#logo10").insertAfter('#logo9');
    } else if (environment == 'tablette') {
        $('.fillerCookie').addClass('reallyHidden');
        $('.Home-page .hide-video-mobile').detach();
        $("#tablette-appli").insertBefore('#tabletteBefore');
        $("#logo2").insertAfter('#logo1');
        $("#logo7").insertBefore('#logo8');
        $("#logo9").insertAfter('#deplacement-js-mobile');
        $("#logo10").insertAfter('#logo9');
    } else {
        $('.fillerCookie').addClass('reallyHidden');
        $('.Home-page .hide-video-mobile').detach();
        $("#tablette-appli").insertBefore('#tabletteBefore');
        $("#logo2").insertAfter('#logo1');
        $("#logo7").insertBefore('#logo8');
        $("#logo9").insertAfter('#deplacement-js-mobile');
        $("#logo10").insertAfter('#logo9');
    }
}

function btnMonPBA(){
    if (environment == 'desktop') {
        $('#user-connect').insertAfter('.searchInput');
    }else{
        $('#user-connect').insertAfter('.containerMenuRWD .menuDeroulant');
    }
}

/*------------------------------------*\
            Youtube API
\*------------------------------------*/
function ratioYoutube(){
  var container_width = $('.bg-image').width();
  var container_height= $('.bg-image').height();
  var video_width = $('.classeVideo').data('video-width');
  var video_height = $('.classeVideo').data('video-height');
  var video_ratio = (video_height*100)/video_width;
  var target_height = (container_width*video_ratio)/100;
  var target_top_position = -((target_height-container_height)/2);

  $('.Home-page iframe').height(target_height);
  $('.Home-page iframe').css('top',target_top_position);
}
if ($('#player').length) {
    var tag = document.createElement('script');
    tag.src = "http://www.youtube.com/player_api";
    var video_src = $('.classeVideo').data('video-src');
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
    function onYouTubePlayerAPIReady() {
        player = new YT.Player('player', {
            playerVars: {
                'autoplay': 1,
                'controls': 0,
                'autohide': 1,
                'wmode': 'transparent',
                'loop': 1,
                'playlist': video_src,
                'disablekb': 1,
                'iv_load_policy': 3,
                'rel': 0
            },
            videoId: video_src,
            height: "100%",
            width: "100%",
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerReady
            }
        });
    }
    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        event.target.mute();
        ratioYoutube();
    }
}
$("#prevent").focus(function() {
    slider.reloadSlider();
});

   /*------------------------------------*\
           $SHARETHIS-POPUP
  \*------------------------------------*/
    
function initShareThis(){
        $(document).on('keydown', function(e) {
            var keyCode = e.keyCode || e.which;
            if (keyCode == 9) {
                tabulationMode = true;
            }
        });
        $('.arianne .share').addClass('share-this share-btn hidden-phone');
        $shareFull = $('#share-full'),
        $shareFullOpenBtn = $('.share-btn'),
        $shareFullCloseBtn = $('#share-full button.overlay-close'),

        transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        },
        transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
        support = {
            transitions: Modernizr.csstransitions
        };

        function toggleOverlay($menu) {

            if ($menu.hasClass('open')) { //si ouvert on ferme
                blockMainContentForModal(false);
                $menu.removeClass('open').addClass('close');
                var onEndTransitionFn = function(ev) {
                    // if (support.transitions) {
                    //     if (ev.propertyName !== 'visibility') return;
                    //     this.removeEventListener(transEndEventName, onEndTransitionFn);
                    // }
                    $menu.removeClass('close');
                };
                if (support.transitions) { //si support des transitions on enclenche les transitions CSS
                    // $menu.addEventListener(transEndEventName, onEndTransitionFn);
                    onEndTransitionFn();
                } else {
                    onEndTransitionFn();
                }
            } else if (!$menu.hasClass('close')) { //si fermé on ouvre
                blockMainContentForModal(true, 'share');

                $menu.addClass('open');
                /*
        if( navigator.userAgent.match(/iPhone|iPad|iPod/i) ) {//pour éviter le bogue de la position fixed sur IOS
            $menu.css({
            position: 'absolute',
            top: $(window).scrollTop()+'px',
            overflow:"visible"
            });
        }*/

                if (tabulationMode) {
                    setTimeout(function() {
                        $("#share-full li:first a").focus();
                    }, 500);
                }
            }
        }

        if ($shareFullOpenBtn) {
            $shareFullOpenBtn.on('click', function() {
                toggleOverlay($shareFull);
                // console.log('freklfe');
            });
            $shareFullCloseBtn.on('click', function() {
                toggleOverlay($shareFull);
            });
            $('#embed-link').click(function() {
                $(this).select();
            });
        }

        function blockMainContentForModal(statut, typeModal) {
            $('#fond-modale').removeClass('menu-recherche menu-newsletter menu-partage');
            if (statut == true) {
                $('body').addClass('modale-active');
                $('#fond-modale').removeClass('hidden');
                if (typeModal == 'search') $('#fond-modale').addClass('menu-recherche');
                if (typeModal == 'newsletter') $('#fond-modale').addClass('menu-newsletter');
                if (typeModal == 'share') $('#fond-modale').addClass('menu-partage');
            } else {
                $('body').removeClass('modale-active');
                $('#fond-modale').addClass('hidden');
            }
        }
    }


$(document).ready(function() {

    // T2645
    if($('.contact-us textarea').length){
        $('.contact-us textarea').after('<div style="margin-bottom: 15px; margin-top: -5px;" class="small">5 mots minimum</div>');
    }

    // executes when HTML-Document is loaded and DOM is ready
    testEnvironment();
    dot();
    dotRWD();
    toggleLangAction();
    //En commentaire car l'image desktop et mobile des plans sont identiques
    //swapPlanRWD();
    swapPicture();
    //infoPratiqueTime();
    positionRWD();
    //onYouTubeIframeAPIReady();
    btnMonPBA();
    
    if((environment == "mobile") && ($('.sliderOeuvre').length)){
        var nbr_img = $('.sliderOeuvre li').length;
        $('.sliderOeuvre li').each(function( i ){
        });
    }

    // Scroll To Gabarit 2
    $('.has-scroll').click(function() {
        target = $(this).data('target-scroll');

        if ($(target).length) {
            $('html, body').animate({
                scrollTop: $(target).offset().top - $('#mainNav').height()
            }, 'slow');
        }
    })
    //Fancy Select Page Contact
    if ($('.toFancySelect').length) {
        $('.toFancySelect').fancySelect();
    }

    /* if (environment =='tablette'){
      $('.logos-app').insertBefore($('.mobile-insert-after'));
      $('.col-2-tablette').insertBefore($('.col-1-tablette'));
  }*/

    /*------------------------------------*\
           $SHARETHIS-POPUP
  \*------------------------------------*/
    
    initShareThis();



    /*------------------------------------*\
            Liens d'évitements
  \*------------------------------------*/
    //Pour débogguer le focus
    var evitementDisplay = false;
    /*setInterval(function() { 
	  console.log(document.activeElement);
	}, 2000);*/
    $('#skipnavigation li a').on('focus', function() {
        if (!evitementDisplay) {
            evitementDisplay = true;
            $('#skipnavigation').addClass('hasSkipLinkBanner');
        }
    }).on('blur', function() {
        if (evitementDisplay) {
            evitementDisplay = false;
            $('#skipnavigation').removeClass('hasSkipLinkBanner');
        }
    });


    //Parent selector for HP
    if ($('.bigger').length) {
        $("p:has(.bigger)").css("margin-bottom", "18");
    }
    /*------------------------------------*\
          Menu Déroulant Mobile
  \*------------------------------------*/
    $('.headerUp .burger').click(function() {
        if ($('.rechercheRWD').css('display') == 'block') {
            $('.rechercheRWD').css("display", "none");
            $('.headerRWD .triangleSearch').toggleClass("hidden");
        }
        $('#applicationDownloadBlock').remove();
        $('.containerMenuRWD').slideToggle();
        $('body').toggleClass('no-overflow');
        $('#skipToContent').toggleClass('no-overflow');
        $('.oeuvre-infos-mobile').css('height', '0');
        $(this).toggleClass('burger-icon-closed').toggleClass('burger-icon-opened');
        $('.headerRWD .triangleBurger').toggleClass("hidden");
        $('.rechercheRWD').css("display", "none");
    });

    $('.headerUp .buttonSearch').click(function() {
        if ($('.containerMenuRWD').css('display') == 'block') {
            $('.containerMenuRWD').css("display", "none");
            $('.headerRWD .triangleBurger').toggleClass("hidden");
            $('.headerUp .burger').toggleClass('burger-icon-closed').toggleClass('burger-icon-opened');
        }
        $('.rechercheRWD').slideToggle();
        $('.headerRWD .triangleSearch').toggleClass("hidden");
        $('body').removeClass("no-overflow");
        $('.containerMenuRWD').css("display", " none");
    });


    $('.menuDeroulant button').click(function() {
        $(this).toggleClass('more').toggleClass('less');
        $(this).parent('li').next('li').next('li').find('.ul_lvl2').slideToggle();
    });

    $('.collections-parcours-visite .plus-info-unique button').click(function() {
        $('.plus-info-toggle').slideToggle();
        if ($(this).find('.icon-more-circled').length) {
            $(this).find('.icon').removeClass('icon-more-circled');
            $(this).find('.icon').addClass('icon-less-circled');
        } else {
            $(this).find('.icon').addClass('icon-more-circled');
            $(this).find('.icon').removeClass('icon-less-circled');
        }
    });

    /*ARIANE COLLECTION*/
    // Select collection
    if ($('.section-agenda .collection-select').length) {
        $('.section-agenda .collection-select').on('click', function() {
            $(this).parents('.select-contain').find('.collection-list').slideToggle();
            if ($('.collection-select .icon-chevron-down').length) {
                $('.collection-select .icon').addClass('icon-chevron-up');
                $('.collection-select .icon').removeClass('icon-chevron-down');
            } else {
                $('.collection-select .icon').removeClass('icon-chevron-up');
                $('.collection-select .icon').addClass('icon-chevron-down');
            }
        });



        // Change collection
        $('.section-agenda .collection-list a').on('click', function() {
            var selected = $(this).html();
            $('.collection-select .collection.active span').html(selected);
        })
    }

    // Arianne tri collection
    if ($('.arianne.collections-liste .collection-select').length) {
        $('.arianne.collections-liste .collection-select').on('click', function() {
            $(this).parents('.select-contain').find('.collection-list').slideToggle();
            if ($('.collection-select .icon-chevron-down').length) {
                $('.collection-select .icon').addClass('icon-chevron-up');
                $('.collection-select .icon').removeClass('icon-chevron-down');
            } else {
                $('.collection-select .icon').removeClass('icon-chevron-up');
                $('.collection-select .icon').addClass('icon-chevron-down');
            }
        });



        // Change collection
        $('.arianne.collections-liste .collection-list a').on('click', function() {
            var selected = $(this).html();
            $('.collection-select .collection.active span').html(selected);
        })
    }


    // Recherche oeuvre  + Avancée
    if ($('.collections-liste-oeuvre').length) {

        $('.collection-select').on('click', function() {
            // Si le moteur de recherche est ouvert on le ferme
            if ($('.collection-advance.open').length) {
                var critere = false;
                $('.collection-advance').removeClass('open');
                $('.collection-advance').fadeOut();
                $('body').removeClass('has-advance');
                $('.collection-select .icon').removeClass('icon-chevron-up');
                $('.collection-select .icon').addClass('icon-chevron-down');

                // Test select vide
                $('.collection-advance select').each(function() {
                    if ($(this).val() != null) {
                        critere = true;
                    }
                })

                // Si aucun champ rempli Reset le nom du bouton
                if (critere == false) {
                    $('.collection-select .collection.active span').html('Selection Tri');
                }

            } else {
                //  Sinon on ouvre le menu de base
                $(this).parents('.arianne').find('.collection-list').slideToggle();
                if ($('.collection-select .icon-chevron-down').length) {
                    $('.collection-select .icon').addClass('icon-chevron-up');
                    $('.collection-select .icon').removeClass('icon-chevron-down');
                } else {
                    $('.collection-select .icon').removeClass('icon-chevron-up');
                    $('.collection-select .icon').addClass('icon-chevron-down');
                }
            }
        });

        // Change collection
        $('.collection-list a').on('click', function() {
            var selected = $(this).html();
            $('.collection-select .collection.active span').html(selected);
        })

        // Ouverture de la recherche avancée
        $('.advance').on('click', function() {
            var selected = $(this).html();
            $('body').addClass('has-advance');
            $('.collection-select .collection.active span').html(selected);
            $('.collection-list').hide(0);
            // $('.patch').slideToggle();
            $('.collection-advance').fadeIn();
            // $('.collections-liste-oeuvre').animate({
            //   'margin-top': '232px'
            // })
            $('.collection-advance').addClass('open');
        })

        // Reset des filtres
        $('.reset').on('click', function() {
            $('.collection-advance .select').each(function() {
                $(this).find('select').val(null);
                var reset = $(this).find('label').html();
                $(this).find('.trigger').html(reset);
            })
        })
    }

    if ($('.tovalidate').length) {
        $('.tovalidate').bootstrapValidator();
    }

   

    // SearchEngine
    if ($('.searchEngine').length) {
        $(function() {
            $('.searchEngine input').autocomplete({
                source: [],
            })
            $('.searchEngine input').change(function() {})
        });
    }
    // manageAutoComplete();
    $(".searchEngine input").on("autocompletecreate", function(event, ui) {
        setTimeout(function() {
            manageAutoComplete();
        }, 1);

    });


    $('#audio-player-btn, #audio-player-btn-2').on('click', function(e){

        if($('#audio-player-overlay').length == 0){
            var overlay = $('<div id="audio-player-overlay"><span class="svg-refresh" style="color:#fff; font-size: 20px;"></span><button class="popup-close close"><span class="sr-only">Fermer</span></button></div>');
            $(this).after(overlay);
        
            var httpParams = $(this).data('popup-params');
            if( typeof httpParams === 'undefined'){ 
                httpParams = '';
            }

            $.ajax({
                url: '/popup/audio', 
                type: 'GET', 
                data: httpParams, 
                contentType: false,
                processData: false,
                cache: false,
                success: function(data) { 
                    $('.svg-refresh', overlay).remove();
                    if(data.errors){
                        cl('Ajax loading error - Audio player', 'error');
                    }
                    
                    overlay.append(data.popupContent);
                    $('.popup-close', overlay).one('click', function(e){
                        overlay.remove();
                    })
                }
            });
        }
    });

    $('#setCoupDeCoeurPBA').on('change', function() {
        var parcours_id = $(this).attr('value');
        var state = $(this).is(':checked');

        $.ajax({
            url: '/mon-compte/coupdecoeur_pba',
            type: 'GET',
            data: 'parcours_id='+parcours_id+'&state='+state,
            contentType: false,
            processData: false,
            cache: false
        });
    });

    // PAGE EMOTIONS
    if($('.class_identifier_emotions').length){

        $('.commentContent').each(function(i, node){
            $(node)
                .data('originalContent', $(node).text())
                .append('<a href="#" class="readmore">Lire la suite</a>')
                .dotdotdot({
                    wrap: 'word',
                    watch: true,
                    after: 'a.readmore'
                })
                .on('click', 'a.readmore', function(e){
                    e.preventDefault();

                    $().YosemiteCustomPopup('setPopup', 
                        {data:{
                            popupContent: '<h2>Commentaire de ' + $(this).closest('.is-truncated').next('.commentAuthor').html() + '</h2>' + $(this).closest('.is-truncated').data('originalContent'), 
                            popupParent: '<div class="pop-up popup-bloc" id="popup-goldenbook"><button class="popup-close close"><span class="sr-only">Fermer</span></button><div class="popup-bloc-wrapper"></div></div>'
                        }, 
                        options: {
                            popupOpenNew: true
                        }
                    });
                });
        });

    }


    // Bloc "telecharger appli mobile"
    if($('#applicationDownloadBlock').length){
        if(sessionStorage.getItem('AppDLBlock')){
            $('#applicationDownloadBlock').remove();
            return false;
        }
        else{
            $('#applicationDownloadBlock').show();
            $('header.nav').addClass('hasAppDLBlock');
            $('#applicationDownloadBlock .close').on('click', function(e){
                e.preventDefault();
                $('#applicationDownloadBlock').remove();
                sessionStorage.setItem('AppDLBlock', true);
            });
        }
    }



}); // Fin document ready

/*------------------------------------*\
      Fancy-select has-success
\*------------------------------------*/

var mySelect = $('.tovalidate');
mySelect.fancySelect().on('change.fs', function() {
    $(this).trigger('change.$');
    if ($('.selectContact-container .trigger').hasClass('selected')) {
        if ($('.selectContact-container.form-group').hasClass('has-error')) {
            $('.selectContact-container .fancy-select .options').on('click', 'li', function() {
                $('.selectContact-container.form-group').removeClass('has-error');
                $('.selectContact-container.form-group').addClass('has-success');
                $('.selectContact-container .help-block').addClass('hidden');
            });
        }
    }
});

$(window).load(function() {
    // executes when complete page is fully loaded, including all frames, objects and images
    $('body').removeClass('.no-js');
    // $("#popup-account-create .flexbox").customScrollbar();
    // $("#popup-connect .flexbox").customScrollbar();
    // $("#popup-connect").mCustomScrollbar(); 

 buildSliderOeuvre();
    // Map
    if ($('#map_1').length) {
        var stylez = [{
            "stylers": [{
                "visibility": "on"
            }, {
                "saturation": -83
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
                "color": "#E06245"
            }, {
                "visibility": "on"
            }, {
                "saturation": -53
            }]
        }, {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "on"
            }, {
                "weight": 0.8
            }, {
                "color": "#E06245"
            }]
        }];
        var mapstyle_id = 'minimal';
        var my_cat_style = {
            red: {
                icon: '../images/marker-map.png'
            },
        };
        $("#map_1").mosne_map({
            elements: '#map_1_list .maplocation',
            clickedzoom: 8,
            mapstyle: stylez,
            mapstyle_name: mapstyle_id,
            infowindows: false,
            infobox: true,
            mode: 'address',
            cat_style: my_cat_style
        });
    }
    /*------------------------------------*\
               $BXSLIDER
\*------------------------------------*/
    if ($('.bxslider').length) {
        var lockedItem = 0;
        $('.bxslider li').each(function() {
            $('.bxslider').parent('.sliderGabarit').find('.pagerSquare').append('<a data-slide-index="' + lockedItem + '" href=""><div class="pager-square"></div></a>');
            lockedItem++;
        })
        $('.bxslider').each(function() {

            $(this).bxSlider({
                startSlide: '0',
                pagerCustom: $('.pagerSquare'),
                prevSelector: $(this).parent('.sliderGabarit').find('.prevPage'),
                nextSelector: $(this).parent('.sliderGabarit').find('.nextPage'),
                nextText: '',
                prevText: ''
            })
        });
        $('.prevPage .bx-prev').addClass('icon-chevron-left icon');
        $('.nextPage .bx-next').addClass('icon-chevron-right icon');
    }
    // SLIDER Locked
    if ($('.locked-bxslider').length) {
        var lockedItem = 0;
        $('.locked-bxslider li').each(function() {
            $('.locked-bxslider').parent('.sliderGabarit').find('.pagerSquare').append('<a data-slide-index="' + lockedItem + '" href=""><div class="pager-square"></div></a>');
            lockedItem++;
        })
        $('.locked-bxslider').each(function() {
            $(this).bxSlider({
                startSlide: '0',
                pagerCustom: $('.pagerSquare'),
                prevSelector: $(this).parent('.sliderGabarit').find('.prevPage'),
                nextSelector: $(this).parent('.sliderGabarit').find('.nextPage'),
                nextText: '',
                prevText: ''
            })
        });
        $('.prevPage .bx-prev').addClass('icon-chevron-left icon');
        $('.nextPage .bx-next').addClass('icon-chevron-right icon');
    }

    // SLIDER HOME

    if ($('.bxsliderHome').length) {
        $('.bxsliderHome').each(function() {
            var currentSlider = $(this);
            $(this).find('li').each(function(i) {
                currentSlider.parent('.sliderHome').find('.pagerSquare').append('<a data-slide-index="' + i + '" href=""><div class="pager-square"></div></a>');
            })
            $(this).bxSlider({
                startSlide: '0',
                pagerCustom: $('.pagerSquare'),
                prevSelector: $(this).parent('.sliderHome').find('.prevPage'),
                nextSelector: $(this).parent('.sliderHome').find('.nextPage'),
                nextText: '',
                prevText: '',
                auto: true,
                pause: 3000,
                speed: 1000
                //, keyboardEnabled: 'true'
            })
        });
        $('.prevPage .bx-prev').addClass('icon-chevron-left icon');
        $('.nextPage .bx-next').addClass('icon-chevron-right icon');
    }

    if (!testCalcSupported()) {
        calcTitrePage();
    }
    $(window).resize(function() {
        // Fallback
        if (!testCalcSupported()) {
            calcTitrePage();
            if (environment != 'desktop') {
                if ($('.banner--anchor-4 .scrollTo--picto').length) {
                    $('.banner--anchor-4 .scrollTo--picto').each(function() {
                        var width = $('.banner--anchor-4').width() - 130;
                        $(this).find('.innerContent').css('width', width);
                    })
                }
                if ($('#player').length) {
                    $('#player').remove();
                }
            }
            if (environment == 'tablette') {
                if ($('.artist-detail').length) {
                    $('.artist-detail').each(function() {
                        var calcWidth = $('.artist-details').width() - 220;
                        $(this).css('width', calcWidth);
                    })
                }
            } else if (environment == 'mobile') {
                if ($('.artist-detail').length) {
                    $('.artist-detail').each(function() {
                        var calcWidth = $('.artist-details').width() - 110;
                        $(this).css('width', calcWidth);
                    })
                }
            }
            if (environment == 'desktop') {
              if ($('#player').length) {
                ratioYoutube();
              }
            };
        }

        if (testEnvironment()) { // S'execute si environment a changé
            dotRWD();
            //En commentaire car l'image desktop et mobile des plans sont identiques
            //swapPlanRWD();
            buildSliderOeuvre();
            positionRWD();
            manageAutoComplete();
            btnMonPBA();

            // HAck float right
            if ($('.anchor-contain').length) {
                $('.anchor-contain .has-scroll').not('.icon-chevron-down').each(function() {
                    $(this).removeClass('scrollTo--picto');
                    setTimeout(function() {
                        $('.anchor-contain .has-scroll').not('.icon-chevron-down').addClass('scrollTo--picto');
                    }, 200)
                });
                // $('.anchor-contain .has-scroll:nth-child(3)').css('float','none');
                $('.anchor-contain .icon-chevron-down').removeClass('scrollTo--picto');
            }

            if (environment == 'desktop') {

            } else if (environment == 'tablette') {

            } else {

            }
        }
    });
}); // Fin Window load
