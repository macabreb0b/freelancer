/*global Freelancer, JST, Backbone */
Freelancer.Views.ShowInvoice = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },
  
  template: JST['invoices/show'],
  
  events: {
    'click .drop-invoice': 'dropInvoice'
  },
  
  dropInvoice: function() {
    var project_id = this.model.get('project_id');
    var project = Freelancer.Collections.projects.getOrFetch(project_id);
    // replace view with a loading gif here
    this.spinner();
    
    this.model.destroy({
      wait: true,
      success: function() {
        Backbone.history.navigate('#/projects/' + project_id, { 
          trigger: true 
        });
      },
      error: function(model, response) {
        alert('error!');
        // debugger;
      }
    });
  },
  
  render: function() {
    
    // fetch project and listen for sync
    if(this.model.get('project_id') && !this.project) {
      this.project = Freelancer.Collections.projects
            .getOrFetch(this.model.get('project_id'));
      this.listenToOnce(this.project, 'sync', this.render);
    }
    
    var renderedContent = this.template({
      invoice: this.model,
      deliverables: this.model.deliverables(),
      project: this.project
    });
    this.$el.html(renderedContent);
    return this;
  }
  
  
});