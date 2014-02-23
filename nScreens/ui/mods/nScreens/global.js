var nScreens = {
	// this is where the UI ends up
	main: "top: 0px; left: 1280px; width: 1920px; height: 1080px;",
	
	// this is the size of the primary holodeck
	mainHolodeck: "top: 0px; left: 0px; width: 4480px; height: 1080px;",// make sure to end in ; 
	
	views: [
		"top: 0px; right: 0px; width: 1280px; height: 1024px;",
		"top: 0px; left: 0px; width: 1280px; height: 1024px;"
	],
	// index of views // if a view is not correctly showing try to add it's index here
	// this is expensive fps wise. Try to make it so the main holodeck is big enough to cover for one of the views
	hackForIndex: [1], // 0 is completely above the main holodeck for this default config => no hack required
	// only one view can be part of the swapping with the main view
	pipIndex: 0,
	
//	// dualscreen
//	main: "top: 0px; left: 0px; width: 1920px; height: 1080px;",// make sure to end in ;
//	mainHolodeck: "top: 0px; left: 0px; width: 1920px; height: 1080px;",// make sure to end in ;
//	
//	views: [
//	   "top: 0px; right: 0px; width: 1280px; height: 1024px;",
//	],
//		// index of views // if a view is not correctly showing try to add it's index here
//		// this is expensive fps wise. Try to make it so the main holodeck is big enough to cover for one of the views
//		hackForIndex: [0],
//		pipIndex: 0,
};

// fun stuff, easy to crash PA
//(function() {
//	
//	// i.e. 4x4 views
//	var xNum = 4;
//	var yNum = 4;
//	
//	var w = 4480 / xNum;
//	var h = 1080 / yNum;
//	
//	var cnt = 0;
//	
//	nScreens.views.length = 0;
//	
//	for (var x = 0; x < xNum; x++) {
//		for (var y = 0; y < yNum; y++) {
//			var t = Math.floor(y * h);
//			var l = Math.floor(x * w);
//			
//			nScreens.views.push("top: "+t+"px; left: "+l+"px; width: "+w+"px; height: "+h+"px;");
//			
//			cnt++;
//			nScreens.hackForIndex.push(cnt);
//		}
//	}
//}());


$(function() {
	var holodecks = $('holodeck').length;

	// assume this tells us we are in live_game
	// we need to run before the live_game.js on the live_game.html, thus we are a global mod here
	if (holodecks > 0) {
		// remove the default holodecks
		$('holodeck').remove();
		
		var allViews = [];
		allViews.push(nScreens.mainHolodeck);
		for (var i = 0; i < nScreens.views.length; i++) {
			allViews.push(nScreens.views[i]);
		}
		
		for (var i = 0; i < allViews.length; i++) {
			var view = allViews[i];
			
			var deck = $('<holodeck></holodeck>');
			
			if (i === 0) {
				deck.addClass("primary");
			}
			
			deck.attr('style', view+"z-index: -17000;position:fixed;");
			
			var tagetContainer = "body";
			
			$(tagetContainer).append(deck);
			
			if (i >= 1 && nScreens.hackForIndex.indexOf(i-1) != -1) {
				$(tagetContainer).append($(deck).clone());				
			}
		}
	}
});

var nScreenFixUi = function() {
	var bc = $('body').children().not('holodeck').detach();
	bc.each(function() {
		$(this).addClass("receiveMouse");
	});
	var resizer = $('<div style="position: absolute;'+nScreens.main+'" class="ignoreMouse"></div>');
	
	resizer.append(bc);
	$('body').append(resizer);
	// fix bad fixed positions
	var stupidFixedStuff = [
        '.div_status_bar_cont',
        '.div_player_list_panel',
        '.div_alert_panel_cont',
        '.div_planet_list_panel',
        '.div_planet_detail_panel',
        '.div_celestial_cont'
	];
	for (var i = 0; i < stupidFixedStuff.length; i++) {
		$(stupidFixedStuff[i]).css('position', 'absolute');
	}
	// sort of fixes floating frames from rFloatframes
	// yes for them fixed is the right thing
	$(".ui-draggable").css("position", "fixed");
};

// live game is special
if (window.location.href.indexOf("live_game") === -1) {
	$(nScreenFixUi);
}

