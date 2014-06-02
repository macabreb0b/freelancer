/*global JST, Freelancer, Backbone */

Freelancer.Views.ShowProject = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(Freelancer.Collections.clients, 'sync', this.render)
  },
  
  template: JST['projects/show'],
  
  render: function() {
    var renderedContent = this.template({
      project: this.model,
      client: Freelancer.Collections.clients.getOrFetch(this.model.get('client_id'))
    })
    this.$el.html(renderedContent);
    return this;
  }
});