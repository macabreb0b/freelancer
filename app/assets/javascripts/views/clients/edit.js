/*global Freelancer, Backbone, JST, $ */

Freelancer.Views.EditClient = Backbone.View.extend({
  
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },
  
  events: {
    'submit form': 'updateClient'
  },
  
  template: JST['clients/_form'],
  
  render: function() {
    var renderedContent = this.template({
      client: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  updateClient: function(event) {
    event.preventDefault();
    var data = $(event.target).serializeJSON();
    
    var client = this.model;
    client.save(data, {
      wait: true,
      success: function() {
        Backbone.history.navigate('#/clients/' + client.id, { trigger: true });
      }
    });
  }
});