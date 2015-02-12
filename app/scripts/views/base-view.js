'use strict';

(function() {
  Backbone.View.prototype.close = function(){
    this.off();              //remove callbacks
    this.stopListening();    //stop listening to events
    this.undelegateEvents(); //remove view's delegated events
    this.$el.html('');       //remove view contents without root element
    if (this.onClose){
      this.onClose();        //close callback
    }
  };
})();
