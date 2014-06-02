/*global Freelancer, Backbone */
Freelancer.Views.ShowDeliverable = Backbone.View.extend({
  tagName: 'li',
  
  className: 'deliverable',
  
  template: JST['deliverables/show'],
  
  render: function() {
    var renderedContent = this.template({
      deliverable: this.model
    });
    this.$el.html(renderedContent);
    return this;
  }
});