/*global JST, Freelancer, Backbone */

Freelancer.Views.ShowClient = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },
  
  template: JST['clients/show'],
  
  render: function() {
    var renderedContent = this.template({
      client: this.model
    })
    this.$el.html(renderedContent);
    return this;
  }
});