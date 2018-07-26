window['PBA_Settings'] = {
    validation_conf: {
        debug: true,
        lang: 'fr',
        rules: {
            password: {
                pwcheck: true
            },
            password_conf: {
                equalTo: "#password"
            },
            previousPassword: {
                pwcheck: true
            }
        },
        messages: {
            password: {
                pwcheck: "Minimum 8 caractères, minuscules et majuscules, un chiffre minimum"
            },
            previousPassword: {
                pwcheck: "Minimum 8 caractères, minuscules et majuscules, un chiffre minimum"
            },
            password_conf: {
                equalTo: "Les mots de passe ne sont pas équivalent"
            }
        },
        errorElement: 'span',
        errorPlacement: function(error, element) {
            if (element.attr("name") == "accept" )
                error.insertAfter(".accept-cgu label");
            else
                error.insertAfter(element);
        }
    }
}

$(document).ready(function() {  
    
    $.extend($.validator.messages, {required: "Ce champs est obligatoire", email: "Veuillez fournir une adresse électronique valide."});
    
    $.validator.addMethod("pwcheck",
        function(value, element) {
            if((value != value.toUpperCase()) && (value != value.toLowerCase()) && (/[0-9]/g.test(value)) && (value.length >= 8)){
                return true;
            }else{
                return false;
            }
    });

    // 
    $('.already_visited input[type="radio"]').change(function(){
        if($(this).val() == 'Oui'){
            $('.howmany-times').removeClass('hidden');
        }else{
            $('.howmany-times').addClass('hidden');
        }
    });

    // affiche un retour visuel dès que input:file change
    $(".input-file input").change(function(){  
        $(".file-return").html( $(this).val() );  
        $('.delete_avatar').toggleClass('hidden');
    });
    $(".delete_avatar").on('click', function(){  
        $(".file-return").html('');  
        $(".input-file input").val('');
        $('.delete_avatar').toggleClass('hidden');
    });

    // 
    if($("#datepicker").length){
    $("#datepicker").datepicker({
        altField: "#datepicker",
        closeText: 'Fermer',
        prevText: 'Précédent',
        nextText: 'Suivant',
        currentText: 'Aujourd\'hui',
        monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        weekHeader: 'Sem.',
        dateFormat: 'yy-mm-dd'
    });
    }
}); // Fin document ready