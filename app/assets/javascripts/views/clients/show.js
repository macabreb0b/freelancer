/*global JST, Freelancer, Backbone */

Freelancer.Views.ShowClient = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    // this.listenTo(this.model.projects(), 'sync', this.render);
  },
  
  events: {
    'click .drop-client': 'dropClient'
  },
  
  template: JST['clients/show'],
  
  render: function() {
    var renderedContent = this.template({
      client: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  dropClient: function(event) {
    event.preventDefault();
    this.model.destroy({
      wait: true,
      success: function() {
        Backbone.history.navigate('#/clients', { 
          trigger: true
        });
      }
    });
  }
});