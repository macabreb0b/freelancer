/*global Freelancer, Backbone, JST, $, alert */
Freelancer.Views.DeliverableListView = Backbone.CompositeView.extend({
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'remove', this.resetSubviews);
    this.resetSubviews();
  },
  
  tagName: 'li',
  
  className: 'deliverable',
  
  template: JST['deliverables/list'],
  
  formTemplate: JST['deliverables/_form'],
  
  events: {
    'click .unchecked': 'closeIt',
    'click .checked': 'openIt',
    'click .show-subdeliverables': 'showSubdeliverables',
    'click .hide-subdeliverables': 'hideSubdeliverables',
    'click .show-new-subdeliverable': 'toggleNewSubdeliverable',
    'submit .new-subdeliverable': 'newSubdeliverable',
    'click .remove-task': 'removeTask'
  },
  
  render: function() {
    var renderedContent = this.template({
      deliverable: this.model
    });
    this.$el.html(renderedContent);
    
    this.attachSubviews();
    this.$('.subdeliverables').prepend(this.formTemplate());
    return this;
  },
  
  resetSubviews: function() {
    this.removeSubviews('.subdeliverables');
    this.subDeliverables = this.collection.where({
      parent_deliverable_id: this.model.id
    });
    this.subDeliverables.forEach(this.addDeliverable.bind(this));
  },
  
  closeIt: function(event) {
    event.stopPropagation();

    this.model.save({ completed: true }, {
      wait: true
    });
  },
  
  openIt: function(event) {
    event.stopPropagation();

    this.model.save({ completed: false }, {
      wait: true
    });
  },
  
  removeTask: function(event) {
    event.preventDefault();
    event.stopPropagation();
    var view = this;
    
    this.model.destroy({
      wait: true,
      success: function() {
        view.remove();
      },
      error: function() {
        alert('cannot remove a completed deliverable!');
      }
    });
  },
  
  addDeliverable: function(deliverable) {
    var selector = '.subdeliverables';
    var view = this;
  
    var subview = new Freelancer.Views.DeliverableListView({
      model: deliverable,
      collection: view.collection
    });
    this.addSubview(selector, subview);
  },
  
  toggleNewSubdeliverable: function(event) {
    event.stopPropagation();
    this.$el.find('form').first().slideToggle('fast');
  },
  
  showSubdeliverables: function(event) {
    event.stopPropagation();
    this.$el.find('.subdeliverables').first().slideDown('fast');
    this.$el.removeClass('collapsed');
  },
  
  hideSubdeliverables: function(event) {
    event.stopPropagation();
    this.$el.find('.subdeliverables').first().slideUp('fast');
    this.$el.addClass('collapsed');
  },
  
  newSubdeliverable: function(event) {
    event.preventDefault();
    event.stopPropagation();
    
    var data = $(event.target).serializeJSON().deliverable;
    data.parent_deliverable_id = this.model.id;
    
    var view = this;
    this.collection.create(data, {
      wait: true,
      success: function(model) {
        view.$('[name="deliverable[name]"]').val('');
        view.addDeliverable(model);
      }
    });
  }
});