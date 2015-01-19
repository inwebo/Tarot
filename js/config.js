window.Inwebo          = window.Inwebo          || {};
window.Inwebo.Plugins  = window.Inwebo.Plugins  || {};
var p = window.Inwebo.Plugins.Tarot = window.Inwebo.Plugins.Tarot   || {};


;(function(window, document, ud){

    window.Inwebo.Plugins.Tarot.Config = {

        primes : {
            petitAuBout   : 10,
            poignee       : 20,
            poigneeDouble : 30,
            poigneeTriple : 40,
            contrat       : 25
        },

        contrats : [
            // Prise
            1,
            // Garde
            2,
            // Garde sans
            4,
            // Garde contre
            6
        ],

        getContractMultiplicator : function(index) {
            switch (index) {
                case 1:
                    return "Prise";
                case 2:
                    return "Garde";
                case 4:
                    return "Garde sans";
                case 6:
                    return "Garde contre";
            }
        },


        getContractNameByIndex : function(index) {
            switch (index) {
                case 1:
                    return "Prise";
                case 2:
                    return "Garde";
                case 4:
                    return "Garde sans";
                case 6:
                    return "Garde contre";
            }
        },

        getPrimes : function(index) {
            var p  =[
                this.primes.poignee,
                this.primes.poigneeDouble,
                this.primes.poigneeTriple,
            ];

            return p[index];
        }

    }


})(window, document);