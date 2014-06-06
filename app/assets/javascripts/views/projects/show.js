/*global JST, Freelancer, Backbone, $ */

Freelancer.Views.ShowProject = Backbone.CompositeView.extend({
  initialize: function() {
    this.listenTo(this.model.deliverables(), 'add', this.addDeliverable);
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(Freelancer.Collections.clients, 'sync', this.render);
    
    this.model.deliverables().each(this.addDeliverable.bind(this));
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
    var data = $(event.target).serializeJSON().deliverable;
    
    var view = this;
    this.model.deliverables().create(data, {
      wait: true,
      success: function() {
        view.$('[name="deliverable[name]"]').val('');
      }
    });
  },
  
  addDeliverable: function(deliverable) {
    var selector = '.deliverables';
    if(!deliverable.get('parent_deliverable_id')) {
      var subview = new Freelancer.Views.DeliverableListView({
        model: deliverable,
        collection: this.model.deliverables()
      });
      this.addSubview(selector, subview);
    }
  },
  
  deleteProject: function(event) {
    event.preventDefault();
    this.model.destroy({
      wait: true, 
      success: function() {
        // wait to navigate to projects index until model has been destroyed + removed from collection
        Backbone.history.navigate('#/projects', { 
          trigger: true 
        });      
      }
  });
  }
});