/*global Freelancer, Backbone */

Freelancer.Views.ClientsIndex = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },
  
  template: JST['clients/index'],
  
  render: function() {
    var renderedContent = this.template({
      clients: this.collection
    });
    this.$el.html(renderedContent);
    return this;
  }
});