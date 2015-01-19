window.Inwebo               = window.Inwebo                 || {};
window.Inwebo.Plugins       = window.Inwebo.Plugins         || {};
var p = window.Inwebo.Plugins.Tarot = window.Inwebo.Plugins.Tarot   || {};

;(function(window, document, ud){

    // Seed.
    var turns = 1;

    // Joueurs par défaut.
    var players = [
        new p.Player("North"),
        new p.Player("East"),
        new p.Player("South"),
        new p.Player("West")
    ];

    // Nouvelle partie
    var game = new p.Game(players);

    // SubmitTurn


    var displayFormButton = window.document.getElementById("display-form");

    var submitFormButton = window.document.getElementById("submit-form");

    displayFormButton.onclick = function() {
        var triangle = window.document.getElementById("footer-triangle");
        var page = window.document.getElementById("form-group-page");

        if( triangle.style.display==="none" ||  triangle.style.display==="") {
            triangle.setAttribute('style','display:block');
            page.setAttribute('style','display:table');
        }
        else if(triangle.style.display==="block"){
            triangle.setAttribute('style','display:none');
            page.setAttribute('style','display:none');
        }

        this.style.display = "none";
        window.document.getElementById("submit-form").style.display = "inline";
    };

    submitFormButton.onclick = function() {

        var values = window.document.getElementById("turn");
        var player = players[parseInt(values.elements["preneur"].value)];
        //var formValues = getFormTurnValues(window.document.getElementById('scores-tables'));
        var turn  = new p.Turn(
            turns,
            players[parseInt(values.elements["preneur"].value)],
            parseInt(values.elements["contract"].value),
            parseInt(values.elements["points"].value),
            parseInt(values.elements["oudlers"].value),
            parseInt(values.elements["isPetitEnding"].value),
            getPrimes('primes', 'select'),
            getPrimes('chelems', 'select')
        );

        game.turn(turn);
        updatePlayers(game,turn);

        var row = createTurnTableRow();
        row = setTurnTableRow(row,game,turn);
        insertTurnTableRow(row);


        updateTotalPlayer(game);
        updateBilanPlayer(game);

        window.document.getElementById("turn").reset();

        var triangle = window.document.getElementById("footer-triangle");
        var page = window.document.getElementById("form-group-page");
        var display = window.document.getElementById("display-form");

        this.style.display = "none";
        triangle.style.display = "none";
        page.style.display = "none";
        display.style.display = "inline";
        turns++;
    };

    var getFormTurnValues = function( formNode ){
        return {
            preneur         : formNode.elements["preneur"].value,
            contract        : parseInt(formNode.elements["contract"].value),
            points          : parseInt(formNode.elements["points"].value),
            oudlers         : parseInt(formNode.elements["oudlers"].value),
            isPetitEnding   : parseInt(formNode.elements["isPetitEnding"].value),
            prime           : null,
            chelem          : null
        };
    };

    var getPrimes = function(id, node) {
        var primes = window.document.getElementById(id).getElementsByTagName(node);
        var buffer  = [];
        var length = primes.length;
        for(var i = 0; i < length;i++) {
            buffer.push([primes[i].dataset.player, primes[i].value ]);
        }
        return buffer;
    };

    var updatePlayers = function(game, turn){
        var i,l;
        l = game.players.length;
        for(i = 0; i < l; i++) {
            var player = game.players[i];
            // Est le preneur ?
            if( turn.preneur === player ) {
                player.setScore(turn.score.attack);
            }
            else {
                player.setScore(turn.score.defense);
            }
        }
    };

    var createTurnTableRow = function(){
        var _node= window.document.getElementById('scores-table-row-dummy');
        return _node.cloneNode(true);
    };

    var setTurnTableRow = function(row, game, turn) {
        row.setAttribute('id','turn-'+turns);
        row.setAttribute('style','display:table-row');
        var p = row.getElementsByTagName('p');
        p[0].innerHTML = game.turns.length;
        p[1].innerHTML = turn.getContractNameByIndex();

        var l,i;
        l = game.players.length;

        // Pour tous les joueurs
        for(i = 0; i < l; i++) {
            var v =[];

            // Pour tous les p
            for( j = 2 ; j < p.length;j++ ) {
                var t = i + 1;
                if( p[j].getAttribute('class') === "p"+t ) {
                    v.push(p[j]);
                }
            }

            var score = game.players[i].scores[game.players[i].scores.length-1];

            if( score[0] !== null ) {
                v[0].innerHTML =game.players[i].scores[game.players[i].scores.length-1][0];
            }
            else {
                v[1].innerHTML =game.players[i].scores[game.players[i].scores.length-1][1];
            }

        }

        return row;
    };

    var updateTotalPlayer = function(game) {
        var p = window.document.getElementById("scores-table-total-player").getElementsByTagName('p');
        var l  = game.players.length;
        // Pour tous les joueurs
        for(i = 0; i < l; i++) {
            // Pour tous les p
            for( j = 1 ; j < p.length;j++ ) {
                var t = i + 1;

                if( p[j].getAttribute('class') === "p"+t && p[j].getAttribute('data-type')==="plus") {
                    p[j].innerHTML = game.players[i].getTotal('plus');
                }
                else if(p[j].getAttribute('class') === "p"+t && p[j].getAttribute('data-type')==="minus") {
                    p[j].innerHTML = game.players[i].getTotal('minus');
                }
            }
        }
    };

    var updateBilanPlayer = function(game) {

        var l,i;
        l = game.players.length;

        // Pour tous les joueurs
        for(i = 0; i < l; i++) {
            var t = i + 1;
            var b = window.document.getElementById('scores-tables-bilan-p'+t);
            b.innerHTML = game.players[i].score;
        }

    };

    var insertTurnTableRow = function(row) {
        var parentElement = document.getElementById('scores-table').getElementsByTagName('tbody')[0];

        var sibling = document.getElementById('scores-table-total-player');

        parentElement.insertBefore(row, sibling);
    };

    // @todo fadeOut content-editable.
    var _ = function(id) {
        return window.document.getElementById(id);
    };
    _('scores-table');
})(window, document);