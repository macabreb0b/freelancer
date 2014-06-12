/*global Backbone, Freelancer, $, JST */

Freelancer.Views.EditProject = Backbone.View.extend({
  
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.render);
  },
  
  events: {
    'submit form': 'updateProject',
    'click cancel-new-project': 'cancelNewProject'
  },
  
  template: JST['projects/_form'],
  
  render: function() {
    var renderedContent = this.template({
      project: this.model,
      clients: this.collection,
      client: this.collection.getOrFetch(this.model.get('client_id')),
      cxlLink: '#/projects/' + this.model.id
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  updateProject: function(event) {
    event.preventDefault();
    var data = $(event.target).serializeJSON();
    
    var project = this.model;
    project.save(data, {
      wait: true,
      success: function() {
        Backbone.history.navigate('#/projects/' + project.id, { trigger: true });
      }
    });
  },
  
  cancelNewProject: function(event) {
    event.preventDefault();
    Backbone.history.navigate('#/projects/' + this.model.id, { trigger: true });
  }
});