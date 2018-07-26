;(function($){

    var QuatreK = (function(){

        var defaults= {},
            contentTypes = {
                'instagram': {
                    cacheValidity: minToMs(15),
                    cache: { data: null, nextIndex: 0, lastVersion: null },
                    apiUrl: window.location.origin + '/emotions/instagram/',
                    htmlLayout: '<div data-type="instagram" class="grid-block gb-insta" style="background-image:url(\'#BKG#\')"><a href="#" target="_BLANK" title="Instagram - Lien externe"></a></div>',
                    blocks: {
                        'grid-block-1':  { node: document.getElementById('grid-block-1') },
                        'grid-block-5':  { node: document.getElementById('grid-block-5') },
                        'grid-block-13': { node: document.getElementById('grid-block-13') },
                        'grid-block-14': { node: document.getElementById('grid-block-14') },
                        //--------------------------------------------------------------
                        'grid-block-8':  { node: document.getElementById('grid-block-8') },
                    }
                },
                'goldenbook': {
                    cacheValidity: minToMs(2),
                    cache: { data: null, nextIndex: 0, lastVersion: null },
                    apiUrl: window.location.origin + '/emotions/goldenbook/',
                    htmlLayout: '<div data-type="goldenbook" class="grid-block gb-comment gb-comment--lo">#CONTENT#</div>',
                    blocks: {
                        'grid-block-2':  { node: document.getElementById('grid-block-2') },
                        'grid-block-6':  { node: document.getElementById('grid-block-6') },
                    }
                },
                'twitter': {
                    cacheValidity: minToMs(2),
                    cache: { data: null, nextIndex: 0, lastVersion: null },
                    apiUrl: window.location.origin + '/emotions/twitter/',
                    htmlLayout: '<div data-type="twitter" class="grid-block gb-twitter" style="background-image: url(\'#BKG#\');"><a target="_BLANK" title="Twitter - Lien externe"><p class="dotme">#CONTENT#</p><p>#DATE#</p></a></div>',
                    blocks: {
                        'grid-block-3':  { node: document.getElementById('grid-block-3') },
                        //-----------------------------------------------------
                        'grid-block-10': { node: document.getElementById('grid-block-10') },
                    }
                },
                'comment': {
                    cacheValidity: minToMs(5),
                    cache: { data: null, nextIndex: 0, lastVersion: null },
                    apiUrl: window.location.origin + '/emotions/comments/',
                    htmlLayout: '<div data-type="comment" class="grid-block gb-comment gb-comment--oe"><div class="comment-wrapper"><a href="#" class="visu" style="background-image: url(\'#BKG#\')"></a><div class="commentContent">#CONTENT#</div><p class="commentAuthor dotme">#AUTHOR#</p></div></div>',
                    blocks: {
                        'grid-block-4':  { node: document.getElementById('grid-block-4') },
                        'grid-block-7':  { node: document.getElementById('grid-block-7') },
                        //----------------------------------
                        'grid-block-12': { node: document.getElementById('grid-block-12') },
                    }
                },
                // 'favorites': {
                //     cacheValidity: minToMs(5),
                //     cache: { data: null, nextIndex: 0, lastVersion: null },
                //     apiUrl: window.location.origin + '/emotions/likedartworks/',
                //     htmlLayout: '<div data-type="favorites" class="grid-block gb-favorites" style="background-image:url(\'#BKG#\');"><a href="#" title="Favori"><p>#AUTHOR#</p></a></div>',
                //     blocks: {
                //         'grid-block-8':  { node: document.getElementById('grid-block-8') },
                //         'grid-block-10': { node: document.getElementById('grid-block-10') },
                //         'grid-block-12': { node: document.getElementById('grid-block-12') },
                //     }
                // },
                'facebook': {
                    cacheValidity: minToMs(15),
                    cache: { data: null, nextIndex: 0, lastVersion: null },
                    apiUrl: window.location.origin + '/emotions/facebook/',
                    htmlLayout: '<div data-type="facebook" class="grid-block gb-facebook" style="background-image: url(\'#BKG#\');"><a target="_BLANK" title="Facebook - Lien externe"><p class="dotme">#CONTENT#</p><p>#DATE#</p></a></div>',
                    blocks: {
                        'grid-block-9':  { node: document.getElementById('grid-block-9') },
                        'grid-block-11': { node: document.getElementById('grid-block-11') },
                    }
                },
            };


        /**
         * Get/Updata the data from the server if necessary
         * @param {object} params
         * @param {string} params.type Type of data
         * @param {boolean} params.forceAjax Force the ajax call to get fresh datas
         * @return {promise} 
         */
        function getData(params){
            return new Promise(function(resolve, reject){
                try{
                    if(params.type !== undefined){ // Type of data
                        if (params.forceAjax // Force cache refresh
                        || Date.now() > (contentTypes[params.type].cache.lastVersion + contentTypes[params.type].cacheValidity) // Cache validity expired
                        || contentTypes[params.type].cache.data == null){ // Empty cache

                            cl('New data '+params.type, 'info');
                            $.get(contentTypes[params.type].apiUrl+'20', function(data){
                                contentTypes[params.type].cache.data = data;
                                contentTypes[params.type].cache.lastVersion = Date.now();

                                // Cache timer
                                setTimeout(function(){
                                    cl('CacheValidity refresh '+params.type, 'info');
                                    getData({
                                        type: params.type,
                                        forceAjax: true
                                    });
                                }, contentTypes[params.type].cacheValidity);

                                resolve(data);
                            });     
                        }
                        else{
                            cl('Cached data '+params.type, 'info');
                            resolve(contentTypes[params.type].cache.data);
                        }
                    }
                    else{
                         reject(new Error('QuatreK - error when retrieving data'));
                    }
                }
                catch(e){
                    reject(e);
                }
            });
        }


        /**
         * Get the next set of data from a specific type cache
         * @param {string} type Type of data
         * @return {object} Data
         */
        function getNextData(type){

            if(contentTypes[type].cache.data.length == 0){ return false; }
            
            var nextIndex = contentTypes[type].cache.data.length <= contentTypes[type].cache.nextIndex ? 0 : contentTypes[type].cache.nextIndex;
            var returnData = contentTypes[type].cache.data[nextIndex];
            nextIndex++;
            contentTypes[type].cache.nextIndex = nextIndex;

            return returnData;
        }


        /**
         * Set a specific block
         * @param {object} params
         * @param {node} params.node Block to refresh
         * @param {object} params.data Data of block
         * @return {void}
         */
        function setBlock(params){

            var block = params.node;
            var type = block.getAttribute('data-type');
            var id = block.getAttribute('id'),
                contentType = contentTypes[type],
                data = getNextData(type),
                timerRand = 0;

            // No data retrieved from server -> Placeholder 
            if(data == false){ 

                //TODO 

                return false;
            }

            var blockHtml = contentType.htmlLayout,
                $blockHtml;

            if(type == 'instagram'||type == 'favorites'||type == 'twitter'){
                // Randomizing refresh rate from 15 to 25 seconds
                timerRand = (getRandomInt(-5,5)+20)*1000;
            }
            else{
                // Randomizing refresh rate from 35 to 55 seconds
                timerRand = (getRandomInt(-10,10)+45)*1000;
            }

            // Replacing placeholders with datas
            blockHtml = blockHtml.replace('#CONTENT#', data.content);
            blockHtml = blockHtml.replace('#AUTHOR#', data.author||'<i class="toRemove" />');
            blockHtml = blockHtml.replace('#DATE#', data.date);
            blockHtml = blockHtml.replace('#BKG#', data.background);

            // setting block ID on new html
            $blockHtml = $(blockHtml).attr('id', id);

            // Creating the clone
            createFadingClone({node: block}).then(function(){

                // Setting the new content
                $(block).replaceWith($blockHtml);
                var $newNode = $('#'+id+':not(.clone)');
                contentType.blocks[id].node = $newNode[0];
                
                // Setting the hyphens on content
                dotNode($newNode);
                
                // Setting the block refresh
                setTimeout(function(){
                    setBlock({node: contentType.blocks[id].node});
                }, timerRand);

            });
        }


        /**
         * Setting the hyphens on node
         * @param {node} params.node Block to search in
         * @return {void}
         */
        function dotNode(node){
            switch(node.attr('id')){
                case 'grid-block-2':
                    $('.commentContent p', node).dotdotdot({wrap: 'word', height: 212});
                    break;
                case 'grid-block-3':
                    $('p.dotme', node).dotdotdot({wrap: 'word', height: 218});
                    break;
                case 'grid-block-4':
                    $('.commentContent p', node).dotdotdot({wrap: 'word', height: 74});
                    break;
                case 'grid-block-6':
                    $('.commentContent p', node).dotdotdot({wrap: 'word', height: 44});
                    break;
                case 'grid-block-7':
                    $('.commentContent p', node).dotdotdot({wrap: 'word', height: 194});
                    break;
                case 'grid-block-9':
                    $('p.dotme', node).dotdotdot({wrap: 'word', height: 74});
                    break;
                case 'grid-block-10':
                    $('p.dotme', node).dotdotdot({wrap: 'word', height: 182});
                    break;
                case 'grid-block-11':
                    $('p.dotme', node).dotdotdot({wrap: 'word', height: 92});
                    break;
                case 'grid-block-12':
                    $('.commentContent p', node).dotdotdot({wrap: 'word', height: 120});
                    break;
                default:
                    break;
            }
            $('.dotme', node).dotdotdot({wrap: 'word'});
        }


        /**
         * Set all the blocks of a specific type
         * @param {string} type Type of data blocks
         * @return {void}
         */
        function setBlocksByType(type){
            cl('set blocks '+type, 'group');
            $.each(contentTypes[type].blocks, function(id, block){
                cl(['set block '+id, block]);

                setBlock({node: block.node});

            })
            cl('set blocks '+type, 'groupEnd');
        }


        /**
         * Only for visual purposes - Creating a fading clone on absolute position on top of block then fade to reveal the new one
         * @param {node} params.node Block to clone 
         * @return {promise}
         */
        function createFadingClone(params){
            return new Promise(function(resolve, reject){
                try{
                    if(params.node.innerHTML != ''){
                        
                        var $fadingClone = $(params.node.outerHTML);

                        $fadingClone.addClass('clone').appendTo($(params.node).parent());
                        setTimeout(function(){
                            if(Math.round(Math.random())){
                                $fadingClone.slideUp(500, function(){
                                    $fadingClone.remove();
                                });
                            }
                            else{
                                $fadingClone.fadeOut(500, function(){
                                    $fadingClone.remove();
                                });
                            }
                        }, 1000);
                    }
                    resolve();
                }
                catch(e){
                    reject(e);
                }
            });
        }


        /**
         * Update the social networks followers counters
         * @return {void}
         */
        function updateSNFollowwers(){
            $.get(window.location.origin + '/emotions/socialnumbers/')
                .done(function(data){
                    $.each(data, function(i, data){
                        $('#gb-'+data.id+'-count i').html(data.content);
                    });
                    
                    // Refresh after 10 minutes
                    setTimeout(updateSNFollowwers, minToMs(10));

                })
                .fail(function(){
                     $('body').addClass('error-4k');
                     new Error('QuatreK - error on retrieving social networks followers')
                });
        }


        /**
         * Translate minutes in milliseconds
         * @param {integer} minutes
         * @return {integer} 
         */
        function minToMs(minutes){
            return minutes*60*1000;
        }


        /**
         * Get random integer
         * @param {integer} min
         * @param {integer} max
         * @return {integer}
         */        
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }


        /**
         * Plugin initialisation
         * @param {object} params
         * @return {promise} 
         */
        function init(params){
            
            return new Promise(function(resolve, reject){
                try{

                    // Display loading icon in corner
                    setLoader(true);

                    // Update Social Networks followers counters
                    updateSNFollowwers();

                    var counter = 0;
                    $.each(contentTypes, function(type, data){

                        // Get datas of a specific type
                        getData({type: type, forceAjax: true}).then(function(data){
                            counter++;

                            // Initialisation of blocks of a specific type
                            setBlocksByType(type);

                            // All datas are OK 
                            if(counter == Object.keys(contentTypes).length){
                                resolve();

                                // Hide loading icon
                                setLoader(false);
                            }

                        },function(e){new Error(e)})
                       
                    });
                    
                }
                catch(e){
                    $('body').addClass('error-4k');
                    reject(new Error('QuatreK - error on init'));
                }
            });

        };


        /**
         * Show/hide the top left loading spinner
         * @param {boolean} visibility true = show / false||undefined = hide
         * @return {void} 
         */
        function setLoader(visibility){
            if(visibility){ $('.loader-4k').fadeIn(150); }
            else{ $('.loader-4k').fadeOut(300); }
        }


        return {
            init: function(params){
                var options = $.extend({}, defaults, params);
                
                var init_p = init(options);

                // Fully loaded/constructed page
                init_p.then(function(result){
                    cl('Page chargée', 'info');
                });
            }
        }
    })();


    $(document).ready(function(){
        
        if($('.page--emotions-4k').length){
            QuatreK.init();
        }
            
    });

})(jQuery)



