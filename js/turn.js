window.Inwebo          = window.Inwebo          || {};
window.Inwebo.Plugins  = window.Inwebo.Plugins  || {};
var p = window.Inwebo.Plugins.Tarot = window.Inwebo.Plugins.Tarot   || {};

;(function(window, document, ud){

    window.Inwebo.Plugins.Tarot.Turn = function( id, joueur, contrat, points, nbrbouts,petitAuBout,prime, chelem ) {

        var plugin = this;

        plugin.id;

        /**
         * Player
         * @type {null}
         */
        plugin.preneur = null;
        /**
         * Contrat
         * @type {int}
         */
        plugin.contrat = null;
        /**
         * [0,91]
         * @type {int}
         */
        plugin.points = null;
        /**
         * 0,1,2,3
         * @type {null}
         */
        plugin.oudlers = null;
        /**
         * @type {int}
         */
        plugin.petitAuBout = null;
        /**
         * @type {int}
         */
        plugin.prime = null;
        /**
         * @type {int}
         */
        plugin.chelem = null;

        plugin.score = {
            attack  : null,
            defense : null
        };

        plugin.init = function () {
            plugin.id = id;
            plugin.preneur = joueur;
            plugin.contrat = contrat;
            plugin.points = points;
            plugin.oudlers = nbrbouts;
            plugin.petitAuBout = petitAuBout;
            plugin.prime = prime;
            plugin.chelem = chelem;
        };

        plugin.getContractNameByIndex = function() {
            return window.Inwebo.Plugins.Tarot.Config.getContractNameByIndex(plugin.contrat);
        };

        plugin.init();
    };
})(window, document);