Freelancer.Views.NewAddress = Backbone.View.extend({
  className: 'address-form',

  createAddress: function(params) {
    var view = this;
    
    this.model.save(params.address, {
      success: function(address) {
        view.collection.trigger('selectAddress', address);
      },
      error: function() {
        // TODO: do something with errors
      }
    })
  },
  
  events: {
    'click button': 'submitForm'
  },
  
  render: function() {
    var renderedContent = this.template({
      address: this.model
    });
    
    this.$el.html(renderedContent);
    return this;
  },
  
  
  submitForm: function(events) {
    event.preventDefault();
    
    // TODO: make sure required inputs are filled in
    
    var params = this.$el.serializeJSON();
    this.createAddress(params);
  },
  
  tagName: 'form',
  
  template: JST['addresses/_form']
})