$(function(){
	$('#_audience_list a').click(function(){
		var id = $(this).attr('id');
		var class_elm = $(this).parent().parent().attr('class');
		$(this).parent().parent().removeClass(class_elm).addClass('nav nav-tabs '+id);
	});

	var emoticon_opt = {
		handle: "a#toggle",
		css: null
	};
	$('body').emotions(emoticon_opt);
	
    $('#login_btn_login').click(function(){
        login();
    });

    $('#tb_username').keypress(function(key){
        if(key.which == 13){
            login();
        }
    });

    $('#tb_password').keypress(function(key){
        if(key.which == 13){
            login();
        }
    });

    function login(){
        var username = $('#tb_username').val();
        var password = $('#tb_password').val();
        if(username == ""){
            $('#txt_notification_login').text('Bạn chưa nhập tên!');
        }
        else if(password == ""){
            $('#txt_notification_login').text('Bạn chưa nhập mật khẩu!');
        }
        else{
            $('#txt_notification_login').text('Vui lòng chờ....');
           isConnectByRegister = false;
           reconnect();
        }
    }

    $('.modal-footer .btn.btn-danger').click(function(){
        var username = $('#tb_username_regis').val();
        var password = $('#tb_pass_regis').val();
        var re_password = $('#tb_re_pass_regis').val();
        if(username.length < 4){
            $('#txt_notification_regis').text("Tên đăng nhập quá ngắn.");
        }
        else if(password.length < 4){
            $('#txt_notification_regis').text("Mật khẩu quá ngắn.");
        }
        else if(password != re_password){
            $('#txt_notification_regis').text("Mật khẩu nhập lại không giống.");
        }else
        {
            $('#txt_notification_regis').text("Vui lòng chờ....");
            isConnectByRegister = true;
            username_regis = username;
            password_regis = password;
            reconnect();
        }
    });

    $('.btn-join-match').click(function(){
        joinMatch();
    });

    $('.btn-startgame').click(function(){
        startMatch();
    });

    $('.btn-enterchat').click(function(){
        var text = $('.chat-input').val();
        sendChatInTable(text);
        $('.chat-input').val('');
    });

    $('.btn-logout').click(function(){
        leftTable();
    });

    $(".recharge_amount").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, and enter
            if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) ||
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault();
                }
            }
    });
    
    $(".recharge_amount").keypress(function(event){
        if(event.which == 13){
            recharge($(".recharge_amount").val());
        }
    });

    $('#btn_recharge').click(function(){
        recharge($(".recharge_amount").val());
    });

    $('#btn_returnChip').click(function(){
        returnChip($(".recharge_amount").val());
    });

    function recharge(value){
        if(value >= 0 && value < 100){
            $('#txt_notification_recharge').text('Chip nạp không được nhỏ hơn 100!');
        }else{
            $('#txt_notification_recharge').text('');
            getChip(value);
        }
    }

    $('.chat-input').keypress(function(event){
        if(event.which == 13){
            var text = $('.chat-input').val();
            sendChatInTable(text);
            $('.chat-input').val('');
        }
    });

    $('.check-item.fold #fold').click(function(){
        fold();
    });
    $('.check-item.check #check').click(function(){
        check();
    });
    $('.check-item.call #call').click(function(){
        var value = $('.check-item.call #call').val();
        call(value);
    });
    $('.btn-raise').click(function(){
        raise($('#raise-amount').val().replace('$',''));
    });
//
//    $('.check-item.check_fold .checkbox.check_fold').click(function(){
//
//    });
//    $('.check-item.call_any#call_any').click(function(){
//
//    });
});

var STEP_FOLD = 0;
var STEP_CHECK_FOLD = 1;
var STEP_CHECK = 2;
var STEP_CALL_ANY = 3;
//var STEP_CALL = 0;

function canvasRun(){
		var myCanvas = document.getElementById('canvas');
		game.init(myCanvas);
		State.waiting.init();
		game.currState = State.waiting;
        run();
        function run() {
            requestAnimFrame(run);
            game.run();
        };
}

var PAGE_LOBBY = 0;
var PAGE_LOBBY_LOG_IN = 1;
var PAGE_IN_GAME = 2;
var main_page = 0;
function changePage(page){
    main_page = page;
    switch(page){
        case PAGE_LOBBY: //PAGE_LOBBY
            $('.btn.btn-primary').show();
            $('.btn.btn-danger').show();
            $('.playnow').show();
            $('.containe.room-table').show();
            $('.content-list.t_active').jScrollPane({autoReinitialise:true, stickToBottom:true});

            $('.table-play-game').hide();
            $('.chat-container').hide();
            $('.btn-recharge').hide();
            $('.navbar-elm.pull-left').hide();
//            $('.timer-box').hide();
            $('.navbar-elm.pull-right').hide();
        break;

        case PAGE_LOBBY_LOG_IN:
            $('.playnow').show();
            $('.containe.room-table').show();
            $('.content-list.t_active').jScrollPane({autoReinitialise:true, stickToBottom:true});

            $('.table-play-game').hide();
            $('.chat-container').hide();
            $('.btn-recharge').show();
            $('.navbar-elm.pull-left').show();
//            $('.timer-box').hide();
            $('.navbar-elm.pull-right').hide();
        break

        case PAGE_IN_GAME: //PAGE_IN_GAME
            $('.playnow').hide();
            $('.containe.room-table').hide();

            $('.btn-recharge').show();
            $('.navbar-elm.pull-left').show();
//            $('.timer-box').show();
            $('.table-play-game').show();
            $('.chat-container').show();
            $('.navbar-elm.pull-right').show();

            $('.chat-content .jspContainer .jspPane').empty();
            $('.chat-content').jScrollPane({autoReinitialise:true, stickToBottom:true});
            $('.log-box .jspContainer .jspPane').empty();
            $('.log-box').jScrollPane({autoReinitialise:true, stickToBottom:true});
        break;
    }
}

function showLoginForm(isShow){
	if(isShow == true){
		$('.navbar-inner.no-corner .btn.btn-primary').show();
		$('.navbar-inner.no-corner .btn.btn-danger').show();
	}
	else{
		$('.navbar-inner.no-corner .btn.btn-primary').hide();
		$('.navbar-inner.no-corner .btn.btn-danger').hide();
	}
}

function parseChipToString(chip){
    var result = '';
    if(chip / 1000000 >= 1){
        var val = Math.floor(chip / 1000000);
        result += val + 'k';
        val = chip % 1000000;
        val = Math.floor(val / 100000);
        if(val >= 1)
            result += val;
    }else if(chip / 1000 >= 1){
        var val = Math.floor(chip / 1000);
        result += val + 'k';
        val = chip % 1000;
        val = Math.floor(val / 100);
        if(val >= 1)
            result += val;
    }else{
        return chip + '';
    }

    return result;
}

function getActualImageByNumberPlayer(number){
	switch(number){
		case 1: return "bg_c empty8"; 
		case 2: return "bg_c empty7"; 
		case 3: return "bg_c empty6"; 
		case 4: return "bg_c empty5"; 
		case 5: return "bg_c empty4"; 
		case 6: return "bg_c empty3"; 
		case 7: return "bg_c empty2"; 
		case 8: return "bg_c empty1"; 
	}
}

function getActualSlotClassName(slot){
	switch(slot){
		case 0: return "player-box p-box1";
		case 1: return "player-box p-box2";
		case 2: return "player-box p-box3";
		case 3: return "player-box p-box4";
		case 4: return "player-box p-box5";
		case 5: return "player-box p-box6";
		case 6: return "player-box p-box7";
		case 7: return "player-box p-box8";
	}
    return "";
}

function getChipBetClassName(slot){
	switch(slot){
		case 0: return "chip_bet chip_b1";
		case 1: return "chip_bet chip_b2";
		case 2: return "chip_bet chip_b3";
		case 3: return "chip_bet chip_b4";
		case 4: return "chip_bet chip_b5";
		case 5: return "chip_bet chip_b6";
		case 6: return "chip_bet chip_b7";
		case 7: return "chip_bet chip_b8";
	}
}

function addPlayerInTable(name, avatar, chip, level, slot){
    var slot_name_class = getActualSlotClassName(slot);

    removePlayerInTable(slot);

    $('.table-game').append('<div class="' + slot_name_class + '" id="slot_' + slot + '" />');
    $("#slot_" + slot)
//        .append('<canvas class="canvas card"></canvas>')
        .append('<div class="name">' + name + '</div>')
        .append('<div class="avatar"></div>')
        .append('<div class="timeout_bar"></div>')
        .append('<div class="money">$<span>' + parseChipToString(chip) + '</span></div>')
        .append('<div class="level">Level:<span>' + level + '</span></div>');
}

function removePlayerInTable(slot){
    $("#slot_" + slot).remove();
}

function clearPlayerOnTable(){
    $('.player-box').remove();
}

function addChipBet(chip, slot){
    var str = getChipBetClassName(slot);
    removeChipBet(slot);
    
    $('.table-game').append('<div class="' + str + '" id="bet_slot_' + slot + '">$ </div>');
    $('.table-game #bet_slot_' + slot).append('<span>' + parseChipToString(chip) + '</span>');
}

function addPot(chip, order){
    $('.table-game').append('<div class="chip_bet pot_table" id="pot_table_' + order + '">$ </div>');
    $('.table-game #pot_table_' + order).append('<span>' + parseChipToString(chip) + '</span>');
}

function removeChipBet(slot){
    $('.table-game #bet_slot_' + slot).remove();
}

function sendChatInTable(text){
    if(curr_table_id != -1){
        chatInTable(curr_table_id, text);
    }
}

function updatePersonalInfo(username, chip, avatar){
    $('.navbar-elm.pull-left .username').text(username);
    $('.navbar-elm.pull-left .money').text('$' + parseChipToString(chip));
}

/*
    in-game check item function
 */
function displayAllCheckItem(show){
    if(show == false){
        $('.bottom-game').hide();
//        $('.btn-raise').hide();
    }else{
        $('.bottom-game').show();
//        $('.btn-raise').show();
    }
}
var STAGE_WAITING_TURN = 0; //
var STAGE_PLAY_NORMAL = 1; //call cho bằng tố hoặc fold
var STAGE_PLAY_CHECK = 2; //bằng tố - check hoặc fold, có thể call
var STAGE_PLAY_ALL_ONLY = 3; //mức tố cao hơn chip đang có, fold hoặc all-in
function showCheckItem(stage){
    switch(stage){
        case STAGE_WAITING_TURN:
            enableCheckItem('fold', true);
            enableCheckItem('check_fold', true);
            enableCheckItem('check', true);
            enableCheckItem('call_any', true);
            enableCheckItem('call', false);
            enableRaiseForm(false);
            break;
        case STAGE_PLAY_NORMAL:
            enableCheckItem('fold', true);
            enableCheckItem('check_fold', false);
            enableCheckItem('check', false);
            enableCheckItem('call_any', false);
            enableCheckItem('call', true);
            enableRaiseForm(true);
            break;
        case STAGE_PLAY_CHECK:
            enableCheckItem('fold', true);
            enableCheckItem('check_fold', false);
            enableCheckItem('check', true);
            enableCheckItem('call_any', false);
            enableCheckItem('call', false);
            enableRaiseForm(true);
            break;
        case STAGE_PLAY_ALL_ONLY:
            enableCheckItem('fold', true);
            enableCheckItem('check_fold', false);
            enableCheckItem('check', false);
            enableCheckItem('call_any', false);
            enableCheckItem('call', true);
            enableRaiseForm(false);
            break;
    }
}

function enableCheckItem(name, enable){
    if(enable == false){
        $('.check-item.' + name ).attr('class', 'check-item ' + name + ' disabled');
//        $('.check-item.' + name + ' input').attr('disabled', 'disabled');
    }else{
        $('.check-item.' + name ).attr('class', 'check-item ' + name);
//        $('.check-item.' + name + ' input').removeAttr('disabled');
    }
}

function enableRaiseForm(isShow){
    if(isShow == true){
        $('.btn-raise').attr('class', 'btn-raise');
        $('#raise-amount').show();
        $('#slider-range-min').show();
    }else{
        $('.btn-raise').attr('class', 'btn-raise disabled');
        $('#raise-amount').hide();
        $('#slider-range-min').hide();
    }
}

function updateSlider(game_bet){
    $( "#slider-range-min" ).slider({
        range: "min",
        value: game_bet,
        min: game_bet,
        max: 2000,
        slide: function( event, ui ) {
            $( "#raise-amount" ).val( "$" + ui.value );
        }
    });
    $( "#raise-amount" ).val( "$" + $( "#slider-range-min" ).slider( "value" ) );
}

/*
    Cards function
 */
function clearCardOnBoard(){
    $('.card_on_board').empty();
    $('#slot_1 .timeout_bar').css('width', 0);
    $('#slot_2 .timeout_bar').css('width', 0);
    $('#slot_3 .timeout_bar').css('width', 0);
    $('#slot_4 .timeout_bar').css('width', 0);
    $('#slot_5 .timeout_bar').css('width', 0);
    $('#slot_6 .timeout_bar').css('width', 0);
    $('#slot_7 .timeout_bar').css('width', 0);
}
function appendCardOnBoard(card){
    var card_id = 'card_' + card;
    var element = '.card_on_board .card#' + card_id;
    $('.card_on_board').append(
        '<div class="card" id="' + card_id + '">' +
            '<div class="rank"></div>' +
            '<div class="small_suit suit1"></div>' +
            '<div class="small_suit suit2"></div>' +
            '<div class="suit"></div>' +
        '</div>');

    $(element).children('.rank').text(getRankString(card));
    $(element).children('.rank').css('color', getSuitColor(card));
    var bgr_str = getSmallSuitBackgroundImageString(card);
    $(element).children('.small_suit').css('background', bgr_str);
    $(element).children('.suit').css('background', getBigSuitBackgroundImageString(card));
}

function clearCardOnSlot(slot){
    if(slot){
        $('#slot_' + slot + ' .hand_card').empty();
    }else{
        $('.hand_card').remove();
    }
}

function appendCardOnSlot(slot, card1, card2){
    var slot_id = '#slot_' + slot;
    var hand_card_slot = slot_id + ' .hand_card';
    $(hand_card_slot).remove();
    $(slot_id).append('<div class="hand_card">' +
                                '<div class="card hand_card1 " id="card_' + card1+ '">' +
                                    '<div class="rank"></div>' +
                                    '<div class="small_suit suit1"></div>' +
                                    '<div class="small_suit suit2"></div>' +
                                    '<div class="suit"></div>' +
                                '</div>' +
                                '<div class="card hand_card2" id="card_' + card2+ '">' +
                                    '<div class="rank"></div>' +
                                    '<div class="small_suit suit1"></div>' +
                                    '<div class="small_suit suit2"></div>' +
                                    '<div class="suit"></div>' +
                                '</div>' +
                            '</div>');
    $(hand_card_slot + ' .card.hand_card1').children('.rank').text(getRankString(card1));
    $(hand_card_slot + ' .card.hand_card1').children('.rank').css('color', getSuitColor(card1));
    var bgr_str = getSmallSuitBackgroundImageString(card1);
    $(hand_card_slot + ' .card.hand_card1').children('.small_suit').css('background', bgr_str);
    $(hand_card_slot + ' .card.hand_card1').children('.suit').css('background', getBigSuitBackgroundImageString(card1));

    $(hand_card_slot + ' .card.hand_card2').children('.rank').text(getRankString(card2));
    $(hand_card_slot + ' .card.hand_card2').children('.rank').css('color', getSuitColor(card2));
    var bgr_str = getSmallSuitBackgroundImageString(card2);
    $(hand_card_slot + ' .card.hand_card2').children('.small_suit').css('background', bgr_str);
    $(hand_card_slot + ' .card.hand_card2').children('.suit').css('background', getBigSuitBackgroundImageString(card2));
}

var SUIT_SPADE     = 0;
var SUIT_CLUB      = 1;
var SUIT_DIAMOND   = 2;
var SUIT_HEART     = 3;
function getRank(card){
    return Math.floor(card / 4);
};

function getSuit(card){
        return card % 4;
};

function getSmallSuitBackgroundImageString(card){
    var suit = getSuit(card);
    var background = "url('./img/card.png') no-repeat";
    switch(suit){
        case SUIT_SPADE:
            return background + ' 0px -49px';
        break;
        case SUIT_CLUB:
            return background + ' -25px -49px';
        break;
        case SUIT_DIAMOND:
            return background + ' -50px -49px';
        break;
        case SUIT_HEART:
            return background + ' -75px -49px';
        break;
    }
}

function getBigSuitBackgroundImageString(card){
    var suit = getSuit(card);
    var rank = getRank(card);
    var background = "url('./img/card.png') no-repeat";
    if(rank < 11 || rank > 13){
        switch(suit){
            case SUIT_SPADE:
                return background + ' 0px 0px';
            break;
            case SUIT_CLUB:
                return background + ' -52px 0px';
            break;
            case SUIT_DIAMOND:
                return background + ' -104px 0px';
            break;
            case SUIT_HEART:
                return background + ' -156px 0px';
            break;
        }
    }else{
        switch(rank){
            case 11: // JACK
                return background + ' -208px 0px';
            break;
            case 12: // QUEEN
                return background + ' -260px 0px';
            break;
            case 13: // KING
                return background + ' -312px 0px';
            break;
        }
    }
}

function getRankString(card){
    var rank = getRank(card);
    if(rank < 11){
        return rank.toString();
    }else{
        switch(rank){
            case 11: return 'J'; break;
            case 12: return 'Q'; break;
            case 13: return 'K'; break;
            case 14: return 'A'; break;
        }
    }
}

function getSuitColor(card){
    var suit = getSuit(card);
    switch(suit){
        case SUIT_SPADE:
        case SUIT_CLUB: return '#000';
        case SUIT_DIAMOND:
        case SUIT_HEART: return '#e61709';
    }
}

function showBestcards(best_cards){
    best_cards.forEach(function(element){
//        console.log(element);
        $('#card_' + element).toggleClass('disabled', false);
    });
}

function showAllCards(other_hand_cards){
    other_hand_cards.forEach(function(element){
        appendCardOnSlot( element.slot,  element.cards[0],  element.cards[1]);
    });
}

function showResultMatch(slot, content){
    $('#slot_' + slot).append('<div class="result"><div>' + content + '</div></div>')
}

function clearResultMatch(){
    $('.result').remove();
}

/*
    CHANGE SLOT FUNCTION
 */
function appendAllChangeSlot(){
    $('.change_slot').append('<a href="#none" class="btn-change-slot" id="change_slot_0"></a>');
    $('.change_slot').append('<a href="#none" class="btn-change-slot" id="change_slot_1"></a>');
    $('.change_slot').append('<a href="#none" class="btn-change-slot" id="change_slot_2"></a>');
    $('.change_slot').append('<a href="#none" class="btn-change-slot" id="change_slot_3"></a>');
    $('.change_slot').append('<a href="#none" class="btn-change-slot" id="change_slot_4"></a>');
    $('.change_slot').append('<a href="#none" class="btn-change-slot" id="change_slot_5"></a>');
    $('.change_slot').append('<a href="#none" class="btn-change-slot" id="change_slot_6"></a>');
    $('.change_slot').append('<a href="#none" class="btn-change-slot" id="change_slot_7"></a>');
    $('.btn-change-slot').click(function(){
        var slot = this.id.replace('change_slot_','');
        changeSlot(slot);
    });
}

function appendChangeSlot(slot){
     $('.change_slot').append('<a href="#none" class="btn-change-slot" id="change_slot_' + slot + '"></a>');
    $('.btn-change-slot').click(function(){
        var slot = this.id.replace('change_slot_','');
        changeSlot(slot);
    });
}

function removeChangeSlot(slot){
    $('#change_slot_' + slot).remove();
}

function removeAllChangeSlot(){
    $('.btn-change-slot').remove();
}

function showAllChangeSlot(){
    $('.btn-change-slot').show();
}

function showChangeSlot(slot){
    var change_slot = $('#change_slot_' + slot);
    if(change_slot.length != 0){
        change_slot.show();
    }else{
        appendChangeSlot(slot);
    }
}

function hideAllChangeSlot(){
    $('.btn-change-slot').hide();
}

function hideChangeSlot(slot){
    $('#change_slot_' + slot).hide();
}