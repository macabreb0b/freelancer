/*global Freelancer, Backbone, JST, $ */

Freelancer.Views.NewClientProject = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },
  
  events: {
    'submit form': 'newProject',
    'click cancel-new-project': 'cancelNewProject'
  },
  
  template: JST['projects/_form'],
  
  render: function() {
    var renderedContent = this.template({
      project: new Freelancer.Models.Project({
        client_id: this.client_id
      }),
      client: this.collection.get(this.client_id),
      clients: this.collection,
      cxlLink: '#/clients/' + this.client_id
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  newProject: function(event) {
    event.preventDefault();
    var view = this;
    this.$el.find('button').attr('disabled', 'disabled');
    
    var params = $(event.target).serializeJSON();
    var project = new Freelancer.Models.Project(params.project);
    project.save({}, {
      wait: true,
      success: function() {
        Freelancer.Collections.projects.add(project);
        Backbone.history.navigate('#/projects/' + project.id, { trigger: true });
      },
      error: function(response) {
        view.$el.find('#errors').html(response.responseJSON);
        view.$el.find('button').removeAttr('disabled');
      }
    });
  },
  
  cancelNewProject: function(event) {
    event.preventDefault();
    Backbone.history.navigate('#/clients/' + this.client_id, {trigger: true})
  }
});