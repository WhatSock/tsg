// JavaScript Document
// Course Specific Javascript
/* ==========================================================================
    Author: Laurence Lewis
    Email: laurence@a11ycats.com.au
    Last updated: 2 August 2017
    Version: 4.1
*/
( function( $ ) {
    "use strict";
    /*********************
		Places the fontawesome new window icon for visual users and enables notification for screen reader users that the link opens in a new browser tab/window
    *********************************/
    $("a[target=\"_blank\"]").append("<span class=\"offscreenText\"> (Opens in a new tab/window)</span>").attr("rel","noopener").after( " <span aria-hidden=\"true\" class=\"fa fa-external-link\"></span>" );
    

} )( jQuery );