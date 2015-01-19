window.Inwebo          = window.Inwebo          || {};
window.Inwebo.Plugins  = window.Inwebo.Plugins  || {};
window.Inwebo.Plugins.Tarot = window.Inwebo.Plugins.Tarot   || {};

;(function(window, document, ud){

    window.Inwebo.Plugins.Tarot.Selectors = {
        table: {
            id:'scores-table',
            players_name_id:'scores-table-players-name',
            row_dummy_id:'scores-table-row-dummy',
            total_player_id:'scores-table-row-dummy',
            bilan_id:'scores-table-bilan'
        },
        form: {
            id:'turn',
            preneur:'preneur',
            contract:'contract',
            oudlers:'oudlers',
            isPetitEnding:'isPetitEnding',
            primes:'primes',
            chelems:'chelems',
            submit:'submit-turn'
        }
    };

})(window, document);