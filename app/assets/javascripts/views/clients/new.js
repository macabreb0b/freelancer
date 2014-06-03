/*global Freelancer, JST, Backbone, $ */
Freelancer.Views.NewClient = Backbone.View.extend({
  
  events: {
    'submit form': 'newClient'
  },
  
  template: JST['clients/_form'],
  
  render: function() {
    var renderedContent = this.template({
      client: new Freelancer.Models.Client()
    });
    this.$el.html(renderedContent);
    
    return this;
  },
  
  newClient: function(event) {
    event.preventDefault();
    var view = this;
    this.$el.find('button').attr('disabled', 'disabled');
    
    var params = $(event.target).serializeJSON();
    var client = new Freelancer.Models.Client(params.client);
    client.save({}, {
      wait: true,
      success: function() {
        Freelancer.Collections.clients.add(client);
        Backbone.history.navigate('#/clients/' + client.id, { trigger: true });
      },
      error: function(model, response) {
        view.$el.find('#errors').html(response.responseJSON);
        view.$el.find('button').removeAttr('disabled');
      }
    });
  }
});