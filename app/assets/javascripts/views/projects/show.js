/*global JST, Freelancer, Backbone, $ */

Freelancer.Views.ShowProject = Backbone.CompositeView.extend({
  initialize: function() {
    this.listenTo(this.model.deliverables(), 'add', this.addDeliverable);
    this.listenTo(this.model.deliverables(), 'remove', this.resetSubviews);
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(Freelancer.Collections.clients, 'sync', this.render);
    this.listenTo(this.model.deliverables(), 'add-hour', this.addHour);
    this.listenTo(this.model.deliverables(), 'remove-hour', this.removeHour);
    
    // this.addDeliverableDetail();
    this.addHoursDisplay();
    this.resetSubviews();
  },
  
  events: {
    'click .delete-project': 'deleteProject',
    'submit .new-deliverable': 'newDeliverable',
    'click .make-invoice': 'makeInvoice'
  },
  
  template: JST['projects/show'],
  
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
  
  addHour: function() {
    this.model.set('uninvoiced_hours_count', 
        this.model.get('uninvoiced_hours_count') + 1);
    this.model.set('total_hours', 
        this.model.get('total_hours') + 1);
  },
  
  addHoursDisplay: function() {
    var hoursDisplay = new Freelancer.Views.HoursDisplay({
      model: this.model
    });
    this.addSubview('.hours', hoursDisplay);
  },
  
  deleteProject: function(event) {
    event.preventDefault();
    this.spinner();
    
    this.model.destroy({
      wait: true, 
      success: function() {
        // wait to navigate to projects index until model has been destroyed + removed from collection
        Backbone.history.navigate('#/projects', { 
          trigger: true 
        });      
      }
    });
  },
  
  makeInvoice: function(event) {
    // show modal
    this.spinner();
    
    $.ajax({
      url: this.model.url() + '/invoice',
      method: 'POST',
      success: function(model, response) {
        // alert('success!');
        Backbone.history.navigate('#/invoices/' + model.id, { 
          trigger: true
        })
      },
      error: function(model, response) {
        // render error messages
        debugger
      }
    })
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
  
  removeHour: function() {
    this.model.set('uninvoiced_hours_count', 
        this.model.get('uninvoiced_hours_count') - 1);
    this.model.set('total_hours', 
        this.model.get('total_hours') - 1);
  },
  
  render: function() {
    var renderedContent = this.template({
      project: this.model,
      client: Freelancer.Collections.clients.getOrFetch(this.model.get('client_id'))
    });
    this.$el.html(renderedContent);
    $('#hourly').tooltip();
    this.attachSubviews();
    return this;
  },
  
  resetSubviews: function() {
    this.removeSubviews('.deliverables');
    this.model.deliverables().each(this.addDeliverable.bind(this));
  }
});