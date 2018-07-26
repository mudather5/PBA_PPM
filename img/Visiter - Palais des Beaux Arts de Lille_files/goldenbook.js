;(function($){

    var GoldenBook = (function(){

        var defaults= {};

        function init(params){
            
            return new Promise(function(resolve, reject){
                try{
                    if($(params.sel.wrapper).data('has-masonry')){
                        $(params.sel.wrapper)
                    }
                    $(params.sel.item, params.sel.wrapper).each(function(i, node){
                        setCommentClass(node);

                        if(node.classList.contains('long-comment') && !$('.commentContent', node).hasClass('is-truncated')){
                            var originalContent = $('.commentContent', node).html();
                            $('.commentContent', node)
                                .data('originalContent', originalContent)
                                .dotdotdot({ height: (parseInt($('.commentContent', node).css('line-height')) * 7) })
                                .append('<a href="#" class="readmore">Lire la suite</a>');
                        }
                    })
                    resolve();
                }
                catch(e){
                    reject(new Error('GoldenBook - error on init'));
                }
            });

        };

        // short-comment, normal-comment, long-comment
        function setCommentClass(node){
            var $comment = $('.commentContent', node);
            var lineHeight = parseInt($comment.css('line-height'));

            $(node).removeClass('short-comment normal-comment long-comment');

            try{
                if($comment[0].offsetHeight <= (lineHeight * 2)){
                    node.classList.add('short-comment');
                }
                else if($comment[0].offsetHeight <= (lineHeight * 6)){
                    node.classList.add('normal-comment');
                }
                else{
                    node.classList.add('long-comment');
                }
            }
            catch(e){
                new Error('GoldenBook - error on setCommentClass');
            }
        };

        function setMasonry(params){
            return $(params.sel.wrapper).masonry({
                percentPosition: true,
                itemSelector: params.sel.item
            });
        };


        function setAdditionalEvents(params){
            // Read more buttons on long comments
            $('a.readmore', params.sel.wrapper).off('click.readmoreComment').on('click.readmoreComment', function(e){
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
        }

        return {
            init: function(params){
                var options = $.extend({}, defaults, params);
                
                var init_p = init(options);

                // Fully loaded/constructed golden book
                init_p.then(function(result){
                    var scrollTopBefore = false;
                   
                    if(!$('html.mobile').length){

                        // Destroy old instance
                        if($(options.sel.wrapper).data('masonry')){
                            scrollTopBefore = $(document).scrollTop();
                            $(options.sel.wrapper).masonry('destroy');
                        }

                        // Masonry init
                        setMasonry(options);
                    }

                    // Events
                    setAdditionalEvents(options);

                    if(scrollTopBefore){
                        $(document).scrollTop(scrollTopBefore);
                    }
                });
            }
        }
    })();


    $(document).ready(function(){
        
        if($('.page--goldenbook').length){

            GoldenBook.init({
                sel:{
                    item: '.comment-wrapper',
                    wrapper: '.xDistribution--comment'
                }
            });

            /*** scroll pagination livre d'or ***/
            var $pagination = $('.page--goldenbook').find('.next-pagination');
            var $paginationContainer = $('.pagination-ajax');
            var $paginationButton = $('.showPagination button');
            if ($pagination.length) {
                $paginationContainer.prepend($pagination);

                $paginationButton.on('click', function() {

                    // Loader
                    $(this).data('beforeLoadContent', this.innerHTML);
                    this.innerHTML = '<span class="svg-refresh"></span>';

                    waypointInfiniteHandler = new Waypoint.Infinite({
                        element: $('.xDistribution--comment'),
                        items: 'comment-wrapper',
                        more: 'a.next-pagination',
                        loadingClass: 'pagination-chargement',
                        onAfterPageLoad: function() {
                            waypointInfiniteHandler.destroy();
                            //$('.page--goldenbook .page--goldenbook--comment p').dotdotdot({wrap: 'word', height: 55, watch:true});
                            if ($('.page--goldenbook .pagination-ajax .next-pagination').length == 0){
                                $('.showPagination').hide();
                            }
                            GoldenBook.init({
                                sel:{
                                    item: '.comment-wrapper',
                                    wrapper: '.xDistribution--comment'
                                }
                            });
                        }
                    });
                    waypointInfiniteHandler.destroy();

                    if ($('.page--goldenbook .pagination-ajax .next-pagination').length == 0){
                        $('.showPagination').hide();
                    }
                    else{
                        $(this).data('beforeLoadContent', this.innerHTML);
                        this.innerHTML = $(this).data('beforeLoadContent');
                    }
                });
            } else {
                $('.showPagination').hide();
            }

            $('.scrollTop button').on('click', function(e){
                e.preventDefault();

                $('html, body').animate({ scrollTop:0 }, '500');
            })

        }


    });

})(jQuery)



