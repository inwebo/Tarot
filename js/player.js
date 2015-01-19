window.Inwebo               = window.Inwebo                 || {};
window.Inwebo.Plugins       = window.Inwebo.Plugins         || {};
var p = window.Inwebo.Plugins.Tarot = window.Inwebo.Plugins.Tarot   || {};

;(function(window, document, ud){

    window.Inwebo.Plugins.Tarot.Player = function(name) {

        var plugin = this;

        plugin.name     = "";

        /**
         * Total score
         * @type {number}
         */
        plugin.score    = 0;

        /**
         * Score by turn
         * >0   , <0
         * [null,-100];
         * [100, null];
         * @type {Array}
         */
        plugin.scores   = [];

        plugin.init = function () {
            plugin.name = name;
        };

        /**
         * Public set score by turn.
         * @param int score
         */
        plugin.setScore = function(score){

            var turnScore = [null,null];

            if( score > 0 ) {
                turnScore[0] = score;
            }
            else {
                turnScore[1] = score;
            }
            plugin.scores.push(turnScore);
            setScore( score );
        };

        /**
         * @param int turn
         */
        plugin.getScoreByTurn = function(turn){
            return (plugin.scores[turn] !== ud) ? plugin.scores[turn] : null ;
        };

        plugin.getTotal = function(type) {
            var i, l;
            l = plugin.scores.length;
            var buffer = null;

            // Pour tous les scores
            for(i = 0; i < l; i++) {
                var t = i+1;

                if( type === "plus" && plugin.scores[i][0] !== null) {
                    buffer = buffer + plugin.scores[i][0];
                }
                else if(type === "minus" && plugin.scores[i][1] !== null) {
                    buffer = buffer + plugin.scores[i][1];
                }

            }
            return buffer;
        };

        var setScore = function( score ) {
            plugin.score += score;
        };

        plugin.init();
    }
})(window, document);