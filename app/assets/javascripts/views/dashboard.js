/*global JST, Freelancer, Backbone */

Freelancer.Views.Dashboard = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render)
  },
  
  template: JST['dashboard'],
  
  render: function() {
    var renderedContent = this.template({
      openProjects: this.collection.where({open: true}),
      closedProjects: this.collection.where({open: false})
    });
    this.$el.html(renderedContent);
    return this;
  }
})