gaProperty = $('#cnil_banner_consent').attr( 'data-site-id' );

var cnilBannerAskConsentString = '<div class="wrap-center alert alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span class="sr-only">Fermer</span></button>En poursuivant votre navigation sur ce site, vous acceptez l\'utilisation de cookies pour réaliser des statistiques de visites. Pour s\'opposer à ce dépôt, <a href="javascript:gaOptout()">cliquer ici</a>.</div>';
var cnilBannerOptoutString = '<div class="alert alert-info alert-dismissible text-center" style="display: none" role="alert"><button type="button" class="close" data-dismiss="alert"><span class="sr-only">Fermer</span></button>Votre opposition au dépôt des cookies a bien été prise en compte.</div>';

$(document).ready( function() {
    $('#cnil_banner_consent').html( cnilBannerAskConsentString );
});

var disableStr = 'ga-disable-' + gaProperty;

if (document.cookie.indexOf('hasConsent=false') > -1)
	window[disableStr] = true;

function getCookieExpireDate()
{ 
	var cookieTimeout = 34214400000;
	var date = new Date();
	date.setTime(date.getTime()+cookieTimeout);
	var expires = "; expires="+date.toGMTString();
	return expires;
}

function askConsent()
{
	$('#cnil_banner_consent').show();
}

function getCookie(NomDuCookie)
{
	if (document.cookie.length > 0)
	{        
		begin = document.cookie.indexOf(NomDuCookie+"=");
		if (begin != -1)
		{
			begin += NomDuCookie.length+1;
			end = document.cookie.indexOf(";", begin);
			if (end == -1)
				end = document.cookie.length;
			return unescape(document.cookie.substring(begin, end)); 
		}
	}
	return null;
}
  
function delCookie(name )
{
	var path = ";path=" + "/";
	var expiration = "Thu, 01-Jan-1970 00:00:01 GMT";
	var domain=";domain=" + "."+document.location.hostname;
	document.cookie = name + "=" + path + domain + ";expires=" + expiration;
	domain=document.location.hostname;
	domain=";domain=" + "."+domain.substring(domain.lastIndexOf(".", domain.lastIndexOf(".") - 1) + 1);
	document.cookie = name + "=" + path + domain + ";expires=" + expiration;
}
 
function deleteAnalyticsCookies()
{
	var cookieNames = ["__utma","__utmb","__utmc","__utmz","_ga"]
	for (var i=0; i<cookieNames.length; i++)
		delCookie(cookieNames[i])
}

function gaOptout() {
    document.cookie = disableStr + '=true;'+ getCookieExpireDate() +' ; path=/';       
    document.cookie = 'hasConsent=false;'+ getCookieExpireDate() +' ; path=/';
	
    $('#cnil_banner_consent div').fadeOut( function() {
        $('#cnil_banner_consent').html( cnilBannerOptoutString );
        $('#cnil_banner_consent div').fadeIn();
    });
    
    window[disableStr] = true;
    deleteAnalyticsCookies();
}

var consentCookie =  getCookie('hasConsent');
if (consentCookie == null)
{
	var referrer_host = document.referrer.split('/')[2]; 
	if ( referrer_host != document.location.hostname )
	{        
		window[disableStr] = true;
		window[disableStr] = true;
		$(document).ready( function() {
			askConsent();
		});
	}
	else
		document.cookie = 'hasConsent=true; '+ getCookieExpireDate() +' ; path=/'; 
}