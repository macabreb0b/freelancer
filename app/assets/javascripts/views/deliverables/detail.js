Freelancer.Views.Detail = Backbone.View.extend({
  initialize: function() {
    // this.listenTo(this.model, 'sync', this.render);
  },
  
  // events: {},
  
  template: JST['deliverables/detail'],
  
  render: function() {
    var renderedContent = this.template({
      deliverable: this.model
    });
    
    this.$el.html(renderedContent);
    return this;
  }
  
});