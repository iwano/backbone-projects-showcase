'use strict';

(function() {
  Backbone.View.prototype.close = function(){

    this.remove();
    this.unbind();
    if (this.onClose){
      this.onClose();        //close callback
    }

  };
})();
