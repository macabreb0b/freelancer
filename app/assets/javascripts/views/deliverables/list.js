/*global Freelancer, Backbone, JST, $, alert */
Freelancer.Views.DeliverableListView = Backbone.CompositeView.extend({
  initialize: function() {
    this.listenTo(this.model, 'change:completed change:name', this.render);
    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'remove', this.resetSubviews);
    this.listenTo(this.model.hours(), 'add remove', this.render);
    
    
    this.getSubdeliverables();
    this.resetSubviews();
  },
  
  tagName: 'li',
  
  className: function() {
    if(this.model.get('collapsed')) {
      return 'deliverable collapsed';
    } else {
      return 'deliverable'; 
    }
  },
  
  template: JST['deliverables/list'],
  
  formTemplate: JST['deliverables/_form'],
  
  events: {
    'click .unchecked': 'closeIt',
    'click .checked': 'openIt',
    'click .show-subdeliverables': 'showSubdeliverables',
    'click .hide-subdeliverables': 'hideSubdeliverables',
    'click .show-new-subdeliverable': 'toggleNewSubdeliverable',
    'submit .new-subdeliverable': 'newSubdeliverable',
    'click .add-hour': 'addHour',
    'click .remove-hour': 'removeHour',
    'click .show-details': 'showModal'
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
  
  addHour: function(event) {
    event.stopPropagation();
    event.currentTarget.setAttribute('disabled', 'disabled');
    this.model.addHour();
  },
  
  closeIt: function(event) {
    event.stopPropagation();
    event.currentTarget.setAttribute('disabled', 'disabled');

    this.model.save({ completed: true }, {
      wait: true
    });
  },
  
  getSubdeliverables: function() {
    this.subdeliverables = this.collection.where({
      parent_deliverable_id: this.model.id
    });
  },
  
  hideSubdeliverables: function(event) {
    event.stopPropagation();
    this.$el.find('.subdeliverables').first().slideUp('fast');
    var view = this;
    setTimeout(function() {
      view.$el.addClass('collapsed');
    }, 200);
    this.model.save({ collapsed: true });
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
  },
  
  openIt: function(event) {
    event.stopPropagation();
    event.currentTarget.setAttribute('disabled', 'disabled');

    this.model.save({ completed: false }, {
      wait: true
    });
  },
  
  removeHour: function(event) {
    event.stopPropagation();
    event.currentTarget.setAttribute('disabled', 'disabled');
    this.model.removeHour();
  },
  
  render: function() {
    this.getSubdeliverables();
    
    var renderedContent = this.template({
      deliverable: this.model,
      subdeliverableCount: this.subdeliverables.length,
      hours: this.model.hours().length,
      removable: this.model.checkRemovable()
    });
    this.$el.html(renderedContent);
    
    this.attachSubviews();
    this.$('.subdeliverables').prepend(this.formTemplate());
    return this;
  },
  
  resetSubviews: function() {
    this.removeSubviews('.subdeliverables');
    this.getSubdeliverables();
    this.subdeliverables.forEach(this.addDeliverable.bind(this));
  },
  
  showModal: function(event) {
    event.stopPropagation();
    
    var detailView = new Freelancer.Views.Detail({
      model: this.model
    });

    $('#deliverable-detail').html(detailView.render().$el);
    $('#deliverable-detail').modal({
      show: true,
      backdrop: true
    });
  },
  
  showSubdeliverables: function(event) {
    event.stopPropagation();
    this.$el.find('.subdeliverables').first().slideDown('fast');
    var view = this;
    
    // wait for slideDown action to show before removing class
    setTimeout(function() {
      view.$el.removeClass('collapsed');
    }, 200);
    this.model.save({ collapsed: false });
  },
  
  toggleNewSubdeliverable: function(event) {
    event.stopPropagation();
    this.$el.find('form').first().slideToggle('fast');
  }
  
 
});