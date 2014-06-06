Freelancer.Views.ShowDeliverable = Backbone.View.extend({
  initialize: function(options) {
    this.client = options.client;
    this.project = options.project;
  },
  
  template: JST['deliverables/show'],
  
  render: function() {
    var renderedContent = this.template({
      deliverable: this.model,
      project: this.project,
      client: this.client
    })
  },
  
  
})