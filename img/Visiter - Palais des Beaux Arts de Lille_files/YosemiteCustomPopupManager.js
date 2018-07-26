(function( $ ) {
 
    $.fn.YosemiteCustomPopup = function(methodOrOptions) {

        var methods = {
            getSettings : function(options){
                return $.extend({
                    // options par défaut
                    popupTriggers :             '.popup-trigger', // les éléments qui vont être écoutés pour appeler des vues popup
                    popupSelector :             '.popup-bloc', //la popup à afficher
                    popupWrapperSelector :      '.popup-bloc-wrapper', //le noeud à populer avec les retours ajax
                    popupOverlay :              '.overlay',
                    popupOverlayClasses:        '',
                    popupCloseButtonSelector :  '.popup-close',
                    popupViewData :             'popup-view', // l'attribut data qu'on va aller chercher pour la vue à charger
                    popupViewParams :           'popup-view-params', // des datas a transmettre a la vue
                    popupParamsData :           'popup-params', // nom de l'attribut des données à envoyer à la vue
                    httpMethodData :            'popup-method', // nom de l'attribut data permettant de choisir la méthode http
                    popupOpenNewData :          'popup-open-new',
                    popupOverlayData :          'popup-overlay', 
                    popupPreventScrollData :    'popup-scroll', 
                    popupPreventScroll :        true,
                    popupOpenNew :              false,
                    popupOverlayClose:          true,
                    defaultUrl :                '/popup/', // l'url du module backoffice pour gérer les popup, à laisser comme tel dans la plupart des cas
                    view :                      '', //la vue popup à appeler
                    HttpMethod :                'GET', //la méthode http, par défaut GET
                    httpParams :                '', // les données à envoyer au controller
                    viewParams :                null, // les données à envoyer à la vue
                    showCallBack :              function(popup){ // fonction d'affichage de la popup appelé une fois l'html chargé
                                                    $(popup).show(); 
                                                },
                    destroyCallBack :           function(popup){ // fonction de retrait de la popup appelé une fois la croix cliquée
                                                    $(popup).remove(); 
                                                }
                }, options );
            },
            init : function(options) {
                var globSettings = methods.getSettings(options);

                return $(globSettings.popupTriggers).each(function(){

                    // Récuperation des options par défaut fusionnées avec celles passées en parametres
                    var settings = methods.getSettings(options);

                    var popupOpenNewData = $(this).data(settings.popupOpenNewData);
                    if(typeof popupOpenNewData !== 'undefined' && popupOpenNewData === true)
                        settings.popupOpenNew = true;
                    
                    var view = $(this).data(settings.popupViewData);
                    if( typeof(view) === 'undefined'){
                        return false;
                    }

                    settings.popupOverlay = $(this).data(settings.popupOverlayData) != undefined ? $(this).data(settings.popupOverlayData) : settings.popupOverlay;
                    settings.popupOverlayClasses = $(this).data(settings.popupOverlayClasses) != undefined ? $(this).data(settings.popupOverlayClasses) : settings.popupOverlayClasses;
                    settings.popupPreventScroll = $(this).data(settings.popupPreventScrollData) != undefined ? $(this).data(settings.popupPreventScrollData) : settings.popupPreventScroll;
                    settings.viewParams = $(this).data(settings.popupViewParams) != undefined ? $(this).data(settings.popupViewParams) : null;

                    if($(this).is('form')){
                        $(this).off('submit').on('submit', function(e){
                            e.preventDefault();
                            
                            //var formData = new FormData();

                            settings.view = view;
                            settings.HttpMethod = 'POST';
                            settings.httpParams =  $(this).get(0) ;

                            methods.getView(settings);
                        });
                    }
                    else{
                        $(this).off('click').on('click', function(e){
                            e.preventDefault();
                            
                            
                            var httpParams = $(this).data(settings.popupParamsData);
                            if( typeof(httpParams) === 'undefined'){ 
                                httpParams = '';            
                            }
                            
                            settings.view = view;
                            settings.HttpMethod = 'GET';
                            settings.httpParams = httpParams;

                            methods.getView(settings);
                                                        
                        });
                    }
                });
            },
            getView : function(options) {

                // Récuperation des options par défaut fusionnées avec celles passées en parametres
                var settings = methods.getSettings(options);

                var url = settings.defaultUrl + settings.view;

                if(settings.HttpMethod == "POST" ){
                   var ajaxData = new FormData( settings.httpParams );
                }
                else{
                    var ajaxData = settings.httpParams;
                }

                $.ajax({
                    url: url, 
                    type: settings.HttpMethod, 
                    data: ajaxData, 
                    contentType: false,
                    processData: false,
                    cache: false,
                    success: function(data) { 
                        if(data.erros){
                            console.log('erreur dans le traitement de la popup');
                        }

                        if(data.options.newPopup === true){
                           settings.popupOpenNew = true;
                        }

                        methods.setPopup({
                            data : data,
                            options : settings
                        });
                    }
                });
            },
            reload : function( timer, gotoLink) { 
                timer = timer != undefined ? timer : 0;
                gotoLink = gotoLink != undefined ? gotoLink : 0;

                setTimeout(function(){ window.location.href = gotoLink; }, timer);    
            },
            closePopup : function(options, timer) { 
                timer = timer != undefined ? timer : 0;
                // Récuperation des options par défaut fusionnées avec celles passées en parametres
                var settings = methods.getSettings(options);
                setTimeout(function(){ 
                    methods.destroyPopup( $(settings.popupSelector).last() );
                }, timer);    
            },
            setPopup : function( params ){
                // Récuperation des options par défaut fusionnées avec celles passées en parametres
                var settings = methods.getSettings(params.options);
                var data = params.data;

                if(typeof data.options !== 'undefined'){
                    if(data.options.reload === true){
                        methods.reload(data.options.reloadTimer, data.options.reloadGoto);
                    }
                }

                if( typeof data.popupContent !== 'undefined' && data.popupContent != '' ){//si le contenu de la popup n'est pas vide
                    if( ( !$(settings.popupSelector).length || settings.popupOpenNew ) && ( typeof data.popupParent !== 'undefined' && data.popupParent != '' ) ){ // si il faut créer un nouveau container de popup
                        $(settings.popupSelector).removeClass("last");
                        var parent = methods.setPopupParent(data.popupParent, params.options);
                        $(settings.popupSelector).last().addClass("last");
                    }
                
                    methods.setPopupContent({content : data.popupContent , options : settings});
                    settings.showCallBack(settings.popupSelector);

                    methods.initDestructors(settings);
                    methods.init(settings);
                    methods.initViewJS(settings.view, settings.viewParams);

                }
                if(typeof data.options !== 'undefined'){
                    if(data.options.closePopup){
                        methods.closePopup(settings, data.options.closePopupTimer);
                    }
                }

            },
            setPopupParent : function( html, options){
                // Récuperation des options par défaut fusionnées avec celles passées en parametres
                var settings = methods.getSettings(options);

                if($(settings.popupOverlay).length == 0){

                    if(settings.popupOverlay[0] == '.'){
                        $('body').append('<div class="' + settings.popupOverlay.slice(1) + '"></div>');
                    }
                    else if(settings.popupOverlay[0] == '#'){
                        $('body').append('<div id="' + settings.popupOverlay.slice(1) + '"></div>');
                    }
                    else{
                        cl('Undefined overlay', 'error');
                        return false;
                    }

                    if(settings.popupPreventScroll){
                        $('html').addClass('noscroll');
                    }

                    $(settings.popupOverlay).on('click', function(e){
                        if(e.target == this){
                            methods.destroyPopup('.pop-up');
                        }
                    })

                }
                return $(settings.popupOverlay).append(html);
            },
            setPopupContent : function( params ){
                // Récuperation des options par défaut fusionnées avec celles passées en parametres
                var settings = methods.getSettings(params.options);
                var content = params.content;
                
                $(settings.popupWrapperSelector).last().html(content);

            },
            initDestructors : function(options){
                // Récuperation des options par défaut fusionnées avec celles passées en parametres
                var settings = methods.getSettings(options);
                $(settings.popupCloseButtonSelector).off().on('click', function(){
                    methods.destroyPopup( $(this).closest($(settings.popupSelector)) );
                });
            },
            destroyPopup: function(selector){
                var settings = methods.getSettings();
                settings.destroyCallBack(selector);
                if($(settings.popupSelector).length == 0){
                    $(settings.popupOverlay).remove();
                    $('html').removeClass('noscroll');
                }
            },
            initViewJS : function( view, data ){ //appel le js embarqué avec la popup si il existe (doit être sous le nom de : initialize_popup_nomdelavue)
                if (typeof window["initialize_popup_" + view] !== "undefined") { 
                   window["initialize_popup_" + view](data);
                }
            }
            
        };



        // routeur permettant de savoir quelle fonction utiliser et comment transmettre des params
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.YosemiteCustomPopup' );
        }    
    };
    

 
}( jQuery ));

$(document).ready(function() {

    $().YosemiteCustomPopup();
});