Freelancer.Views.Detail = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'change:completed', this.render);
    this.listenTo(this.model.hours(), 'add remove', this.render);
  },
  
  events: {
    'click .add-hour': 'addHour',
    'click .remove-hour': 'removeHour',
    'click .unchecked': 'closeIt',
    'click .checked': 'openIt',
    'click .remove-task': 'removeTask',
  },
  
  className: 'modal-dialog',
  
  template: JST['deliverables/detail'],
  
  addHour: function(event) {
    event.currentTarget.setAttribute('disabled', 'disabled');
    this.model.addHour();
  },
  
  closeIt: function(event) {
    event.currentTarget.setAttribute('disabled', 'disabled');

    this.model.save({ completed: true }, {
      wait: true
    });
  },
  
  openIt: function(event) {
    event.currentTarget.setAttribute('disabled', 'disabled');

    this.model.save({ completed: false }, {
      wait: true
    });
  },
  
  removeHour: function(event) {
    event.currentTarget.setAttribute('disabled', 'disabled');
    this.model.removeHour();
  },
  
  removeTask: function(event) {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setAttribute('disabled', 'disabled');
    
    var view = this;
    
    this.model.destroy({
      wait: true,
      success: function() {
        view.remove();
      },
      error: function() {
        alert('cannot remove a completed deliverable!');
        event.currentTarget.removeAttribute('disabled');
      }
    });
  },
  
  render: function() {
    var renderedContent = this.template({
      deliverable: this.model,
      removable: this.model.checkRemovable(),
      hours: this.model.hours().length
    });
    
    this.$el.html(renderedContent);
    return this;
  }
  
  
  
});