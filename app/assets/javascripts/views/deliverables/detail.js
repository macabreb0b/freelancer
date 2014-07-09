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
    'focus [contenteditable]': 'startEditing',
    'blur [contenteditable]': 'stopEditing'
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
  },
  
  startEditing: function(event) {
    this.waitForIt = false;
    
    var $target = $(event.target);
    // debugger
    $target.data('before', event.target.innerText)
    $target.on('DOMCharacterDataModified',
         this.stopEditing.bind(this));
  },
  
  stopEditing: function(event) {
    // this.editable = true;
    var that = this;
    
    var sendEdit = function() {
      var $target = $(event.target);
      var newContent = event.target.innerText;
      var attr = $target.data('attr');

      that.model.set(attr, newContent);
      that.model.save({}, { 
        wait: true 
      });
      that.waitForIt = true;
      that.timerId = false
    };
    
    // var throttledEdit = _.throttle(sendEdit, 3000)
    // var debouncedEdit = _.debounce(sendEdit, 300)
    //
    // throttledEdit();
    // debouncedEdit();
    if(this.waitForIt) {
      if(!this.timerId) {
        this.timerId = setTimeout(sendEdit, 100);
      }
    } else {
      sendEdit();
    }
  }
});