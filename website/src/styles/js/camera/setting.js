/*global jQuery:false */
jQuery(document).ready(function($) {
"use strict";
	//Camera Jquery
	$('#camera-slide').camera({		
		thumbnails: false,
		hover: false,
		fx: 'random',
		time: 3000,
		transPeriod: 1500,
		pagination: false,
		loader: 'none'
	});
});