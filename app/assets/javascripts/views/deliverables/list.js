/*global Freelancer, Backbone, JST, $ */
Freelancer.Views.DeliverableListView = Backbone.CompositeView.extend({
  initialize: function() {
    Freelancer.deliverableViews.push(this);
    // this.listenTo(this.collection, 'add', this.addDeliverable);
    this.listenTo(this.model, 'change', this.render);
    
    this.subDeliverables = this.collection.where({
      parent_deliverable_id: this.model.id
    })
    this.subDeliverables.forEach(this.addDeliverable.bind(this));
  },
  
  tagName: 'li',
  
  className: 'deliverable',
  
  template: JST['deliverables/list'],
  
  events: {
    'click .close-deliverable': 'closeIt',
    'click .open-deliverable': 'openIt',
    'click .remove-task': 'removeTask'
  },
  
  render: function() {
    // alert('rendering')
    var renderedContent = this.template({
      deliverable: this.model
    });
    this.$el.html(renderedContent);
    
    this.attachSubviews();
    return this;
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
    var view = this;
    
    this.model.destroy({
      success: function() {
        view.remove();
      }
    });
  },
  
  addDeliverable: function(deliverable) {
    var selector = '.subdeliverables';
    var view = this;
    
    // if(deliverable.get('parent_deliverable_id') === this.model.id) {
      var subview = new Freelancer.Views.DeliverableListView({
        model: deliverable,
        collection: view.collection
      });
      this.addSubview(selector, subview);
    // }
  }
});