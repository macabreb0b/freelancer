/*global JST, Freelancer, Backbone, alert */

Freelancer.Views.ShowProject = Backbone.CompositeView.extend({
  initialize: function() {
    this.listenTo(this.model.deliverables(), 'add', this.addDeliverable);
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(Freelancer.Collections.clients, 'sync', this.render);
  },
  
  events: {
    'click .delete-project': 'deleteProject',
    'submit .new-deliverable': 'newDeliverable'
  },
  
  template: JST['projects/show'],
  
  render: function() {
    var renderedContent = this.template({
      project: this.model,
      client: Freelancer.Collections.clients.getOrFetch(this.model.get('client_id'))
    });
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  },
  
  newDeliverable: function(event) {
    event.preventDefault();
    var data = $(event.target).serializeJSON()['deliverable'];
    
    var view = this;
    this.model.deliverables().create(data, {
      wait: true,
      success: function(response) {
        view.$('[name="deliverable[name]"]').val('');
      }
    })
  },
  
  addDeliverable: function(deliverable) {
    var selector = '.deliverables';
    var subview = new Freelancer.Views.ShowDeliverable({
      model: deliverable
    });
    this.addSubview(selector, subview);
  },
  
  deleteProject: function(event) {
    event.preventDefault();
    this.model.destroy();
    Backbone.history.navigate('#/projects', { trigger: true });
  }
});