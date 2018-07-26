/** @global */
window['debugPBA'] = function(){
    if(window.location.host == 'www.pba-lille.fr')
        return false;
    
    return true;
}();


/**
 * Shortcut function for console.log/.info/.warn/.error
 * @param  {var} param {param to console[fct]}
 * @param  {string} [fct=log] {console[fct] to call}
 * @return {void}
 */
function cl(param, fct){
    if(param == undefined){return false;}
    if(fct == undefined){fct = 'log';}
    if(debugPBA && console && (fct && console[fct])){
        console[fct](param);
    }
}


/**
* Show/hide elements depending on input value / Use the 'hide' class from BS
* @param  {DOMNode} params.inputNode input node
* @param  {string} params.inputName input name
* @param  {string} params.inputValue input value
* @param  {boolean} params.hideAll override all the behavior, hide relatives blocks
* @param  {DOMNode} params.scopeNode scope for jquery selectors
* @return {void}
* @example
* // data-rel-input-value : {in:['value1', 'value2'], out: ['value3', 'value4']} / 
* // usage (example) :
* // <select name="user_country" id="user_country">                            ---- Listen change event on this node
* // <div [...] data-rel-input="user_country" data-rel-input-value="France">   ---- Shown on value = France - Data attributes indicate relation with input and its value
* // <div [...] data-rel-input="user_country" data-rel-input-value="!France">  ---- Shown on value != France
* @todo Refactoring
*/
function setRelativeNodesVisibility(params){ 

    if(params.inputNode || (params.inputName && (params.inputValue || params.hideAll))){

        var inputName = params.inputNode != undefined ? params.inputNode.name : params.inputName ;
        var scopeNode = params.scopeNode != undefined ? params.scopeNode : document;

        if(params.hideAll){
            var relInputsNodes = scopeNode.querySelectorAll('[data-rel-input="'+inputName+'"]');
            for (var i = 0; i < relInputsNodes.length; ++i) {
                relInputsNodes[i].classList.add('hide');
            }
            return;
        }

        var inputValue = params.inputNode != undefined ? params.inputNode.value : params.inputValue;
        var hideAll  = params.hideAll != undefined ? params.hideAll : false;
        
        var relInputsNodes = scopeNode.querySelectorAll('[data-rel-input="'+inputName+'"]');
        for (var i = 0; i < relInputsNodes.length; ++i) {

            var dataValue = relInputsNodes[i].dataset.relInputValue;
            if(dataValue[0] != '!'){
                if(dataValue == inputValue){
                    relInputsNodes[i].classList.remove('hide');
                }
                else{
                    relInputsNodes[i].classList.add('hide');
                }
            }
            else{
                if(dataValue == '!'+inputValue){
                    relInputsNodes[i].classList.add('hide');
                }
                else{
                    relInputsNodes[i].classList.remove('hide');
                }
            } 
        }
    }
}