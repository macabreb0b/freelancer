/*global Freelancer, Backbone */

Freelancer.Views.ProjectsIndex = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'sync destroy', this.render);
  },
  
  template: JST['projects/index'],
  
  render: function() {
    var renderedContent = this.template({
      projects: this.collection
    });
    this.$el.html(renderedContent);
    return this;
  }
  
});