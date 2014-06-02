/*global JST, Freelancer, Backbone */

Freelancer.Views.Dashboard = Backbone.View.extend({
  template: JST['dashboard'],
  
  render: function() {
    var renderedContent = this.template({
      deliverables: this.collection
    });
    this.$el.html(renderedContent);
    return this;
  }
})