window.Freelancer = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function($rootEl) {
    new Freelancer.Routers.AppRouter({
      $rootEl: $rootEl
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  if(typeof $('#content')[0] !== "undefined"){
    Freelancer.initialize($('#content'));    
  }
});

Backbone.Collection.prototype.getOrFetch = function(id) {
  var collection = this;
  var model = this.get(id);

  if(model) {
    return model;
  } else {
    model = new this.model({
      id: id
    });
    model.fetch({
      success: function() {
        collection.add(model);
      }
    });
    return model;
  }
}