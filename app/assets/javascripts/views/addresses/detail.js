Freelancer.Views.AddressDetail = Backbone.View.extend({
  events: {
    'click': 'selectAddress'
  },

  tagName: "li",
  
  className: 'address-detail',
  
  template: JST['addresses/detail'],

  render: function() {
    var renderedContent = this.template({
      address: this.model
    });
    
    this.$el.html(renderedContent);
    return this;
  },
  
  selectAddress: function(event) {
    this.model.collection.trigger('selectAddress', this.model);
  }
});