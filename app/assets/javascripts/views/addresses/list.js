Freelancer.Views.AddressListView = Backbone.CompositeView.extend({
  addAddresses: function() {
    var view = this;
    this.$('.addresses').empty();
    this.collection.each(function(address) {
      view.addAddress(address);
    });
  },
  
  addAddress: function(address) {
    var detailView = new Freelancer.Views.AddressDetail({
      model: address
    })
    this.addSubview('.addresses', detailView);
  },
  
  closeView: function(event) {
    this.trigger('hide');
    this.remove();
  },
  
  events: {
    'click .close': 'closeView',
    'click .new-address': 'showNewAddressForm',
    'click .cancel-edit': 'hideNewAddressForm'
  },
  
  hideNewAddressForm: function(event) {
    event.preventDefault();
    
    this.$('.new-address-holder').html(
      '<a href="#" class="new-address">new address</a>'
    )
  },
  
  initialize: function(options) {
    this.listenTo(this.collection, 'sync', this.addAddresses);
    this.listenTo(this.collection, 'selectAddress', this.setNewAddress);
  },
  
  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  },
  
  setNewAddress: function(address) {
    this.model.setUserAddress(address);
    this.closeView();
  },
  
  showNewAddressForm: function(event) {
    event.preventDefault();
    var formView = new Freelancer.Views.NewAddress({
      model: new Freelancer.Models.Address,
      collection: this.collection
    });
    
    this.$('.new-address-holder').html(formView.render().$el);
  },

  template: JST['addresses/list']
  
})