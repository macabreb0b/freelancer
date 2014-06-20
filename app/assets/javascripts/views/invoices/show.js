/*global Freelancer, JST, Backbone */
Freelancer.Views.ShowInvoice = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },
  
  template: JST['invoices/show'],
  
  events: {
    'click .drop-invoice': 'dropInvoice'
  },
  
  dropInvoice: function(event) {
    var project_id = this.model.get('project_id');
    var project = Freelancer.Collections.projects.getOrFetch(project_id);
    // replace view with a loading gif here
    
    this.model.destroy({
      wait: true,
      success: function(model, response) {
        // project.reset();
        Backbone.history.navigate('#/projects/' + project_id, {trigger: true})
      },
      error: function(model, response) {
        alert('error!')
        debugger
      }
    })
  },
  
  render: function() {
    var renderedContent = this.template({
      invoice: this.model,
      deliverables: this.model.deliverables()
    });
    this.$el.html(renderedContent);
    return this;
  }
  
  
});