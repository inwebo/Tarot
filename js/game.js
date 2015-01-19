window.Inwebo          = window.Inwebo          || {};
window.Inwebo.Plugins  = window.Inwebo.Plugins  || {};
p = window.Inwebo.Plugins.Tarot = window.Inwebo.Plugins.Tarot   || {};

;(function(window, document, ud, p){

    window.Inwebo.Plugins.Tarot.Game = function(players) {

        var plugin = this;

        plugin.players    = [];
        plugin.turns      = [];

        plugin.init = function () {
            plugin.players = players;
        };

        plugin.getPointsByOudlers = function(nbrBout){
            switch (nbrBout) {
                case 0:
                    return 56;

                case 1:
                    return 51;

                case 2:
                    return 41;

                case 3:
                    return 36;
            };
        };

        /**
         * 0    : Annoncé & réalisé
         * 1    : Non annoncé & réalisé
         * 3    : Annoncé & non réalisé
         */
        plugin.getChelemPoints = function( type ) {
            switch (type) {
                default:
                case 0:
                    return 400;

                case 1:
                    return 200;

                case 2:
                    return -200;
            };
        };

        plugin.turn = function(turn) {
            turn = plugin.computeScore(turn);
            plugin.turns.push(turn);
        };

        var isValidContract = function(turn) {
            var isValidContract = false;
            isValidContract |= ( turn.points >= plugin.getPointsByOudlers(turn.oudlers) );
            return isValidContract;
        };

        plugin.computeScore = function(turn) {
            // Score
            var gains = calculateGains(turn);
            turn.score.attack  += gains.attack;
            turn.score.defense += gains.attack;

            var oudlersEnding = calculateOudlersEnding(turn);

            turn.score.attack  += oudlersEnding;
            turn.score.defense += oudlersEnding;

            var primes = calculatePoignee(turn);
            turn.score.attack  += primes.attack;
            turn.score.defense += primes.defense;

            if( isValidContract(turn) ) {
                turn.score.defense = turn.score.attack * -1;
                turn.score.attack = turn.score.attack * 3;

            }
            else {
                turn.score.attack = turn.score.defense * 3 * -1;
                turn.score.defense = turn.score.defense;
            }

            return turn;
        };

        var calculateGains = function(turn){
            var bonus = {
                attack:0,
                defense:0
            };

            var gain = window.Inwebo.Plugins.Tarot.Config.primes.contrat;
            gain = gain + (turn.points - plugin.getPointsByOudlers(turn.oudlers));
            gain = gain * turn.contrat;
            // Contrat fait
            if( isValidContract(turn) ) {
                bonus.attack += gain;
                bonus.defense -= gain;
            }
            else {
                bonus.attack -= gain;
                bonus.defense += gain;
            }
            return bonus;
        };

        var calculatePoignee = function(turn) {
            var bonus = {
                attack:0,
                defense:0
            };

            var primes = turn.prime;
            var length  = turn.prime.length;

            for(var i = 0; i<length; i++) {
                if( primes[i][1] !== "-1" ) {
                    var index =  parseInt(primes[i][1]);
                    var prime = window.Inwebo.Plugins.Tarot.Config.getPrimes(index);
                    if( plugin.players[i] === turn.preneur ) {
                        if( isValidContract(turn) ) {
                            bonus.attack += prime;
                            bonus.defense -= prime;
                        }
                        else {
                            bonus.attack -= prime;
                            bonus.defense += prime;
                        }
                    }
                    else {
                        if( isValidContract(turn) ) {
                            bonus.attack -= prime;
                            bonus.defense += prime;
                        }
                        else {
                            bonus.attack += prime;
                            bonus.defense -= prime;
                        }
                    }
                }

            }
            return bonus;
        };

        var calculateOudlersEnding = function(turn){
            var bonus = 0;
            // Petit au bout
            if( turn.petitAuBout != -1 ) {
                bonus = window.Inwebo.Plugins.Tarot.Config.primes.petitAuBout * window.Inwebo.Plugins.Tarot.Config.contrats[turn.contrat];
                // Attack
                    if( !isValidContract(turn) ) {
                        bonus = bonus*-1;
                    }
            }
            return bonus;
        };

        var calculateChelem = function(turn){
            var bonus = {
                attack:0,
                defense:0
            };

            var primes = turn.prime;
            var length  = turn.prime.length;

            for(var i = 0; i<length; i++) {
                if( primes[i][1] !== "-1" ) {
                    var index =  parseInt(primes[i][1]);
                    var prime = window.Inwebo.Plugins.Tarot.Config.getPrimes(index);
                    if( plugin.players[i] === turn.preneur ) {
                        if( isValidContract(turn) ) {
                            bonus.attack += prime;
                            bonus.defense -= prime;
                        }
                        else {
                            bonus.attack -= prime;
                            bonus.defense += prime;
                        }
                    }
                    else {
                        if( isValidContract(turn) ) {
                            bonus.attack -= prime;
                            bonus.defense += prime;
                        }
                        else {
                            bonus.attack += prime;
                            bonus.defense -= prime;
                        }
                    }
                }

            }
            return bonus;
        };

        plugin.countTurns = function() {
            return plugin.turns.length;
        };

        plugin.init();
    }
})(window, document);