/*global Freelancer, Backbone, JST */
Freelancer.Views.ShowDeliverable = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },
  
  tagName: 'li',
  
  className: 'deliverable',
  
  template: JST['deliverables/show'],
  
  events: {
    'click .close-deliverable': 'closeIt',
    'click .open-deliverable': 'openIt',
    'click .remove-task': 'removeTask'
  },
  
  render: function() {
    var renderedContent = this.template({
      deliverable: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  closeIt: function(event) {
    event.preventDefault();
    var view = this;
    
    this.model.save({ completed: true }, {
      wait: true
    });
  },
  
  openIt: function(event) {
    event.preventDefault();
    var view = this;
    
    this.model.save({ completed: false }, {
      wait: true
    });
  },
  
  removeTask: function(event) {
    event.preventDefault();
    var view = this;
    
    this.model.destroy({
      success: function() {
        view.remove();
      }
    });
  }
});