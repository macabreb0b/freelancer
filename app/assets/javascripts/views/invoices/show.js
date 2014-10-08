/*global Freelancer, JST, Backbone */
Freelancer.Views.ShowInvoice = Backbone.CompositeView.extend({
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'selectAddress', this.addUserAddress);
    
    this.addUserAddress(this.model.userAddress());
    this.showAddressList = false;
  },
  
  template: JST['invoices/show'],
  
  events: {
    'click .drop-invoice': 'dropInvoice',
    'click .address-holder': 'showAddresses',
    'click .make-pdf': 'makePdf'
  },
  
  addUserAddress: function(address) {
    this.clearUserAddress();
    
    var detailView = new Freelancer.Views.AddressDetail({
      model: address
    })
    this.addSubview('.user-address', detailView);
  },
  
  clearUserAddress: function() {
    var subview = this.subviews('.user-address')[0];
    
    subview && this.removeSubview('.user-address', subview);
  },
  
  dropInvoice: function() {
    var project_id = this.model.get('project_id');
    this.spinner();
    
    this.model.destroy({
      wait: true,
      success: function() {
        Backbone.history.navigate('#/projects/' + project_id, { 
          trigger: true 
        });
      },
      error: function(model, response) {
        alert('error!');
      }
    });
  },
  
  render: function() {
    // fetch project and listen for sync
    if(this.model.get('project_id') && !this.project) {
      this.project = Freelancer.Collections.projects
            .getOrFetch(this.model.get('project_id'));
      this.listenToOnce(this.project, 'sync', this.render);
    }
    
    var renderedContent = this.template({
      invoice: this.model,
      deliverables: this.model.deliverables(),
      project: this.project
    });
    
    this.$el.html(renderedContent);    
    this.attachSubviews();
    return this;
  },
  
  showAddresses: function(event) {
    if(!this.showAddressList){
      var addresses = new Freelancer.Collections.Addresses()
      addresses.fetch()
      
      var addressList = new Freelancer.Views.AddressListView({
        model: this.model,
        collection: addresses
      });

      this.addSubview('.address-list-popup', addressList);
      addressList.spinner('.addresses');
      
      this.showAddressBox();
      this.listenToOnce(addressList, 'hide', this.hideAddressBox);
    }
    
    return false;
  },
  
  showAddressBox: function() {
    this.$('.address-list-popup').show();
    this.showAddressList = true;
  },
  
  hideAddressBox: function() {
    this.$('.address-list-popup').hide();
    this.showAddressList = false;
  },
  
  makePdf: function(event) {
    window.location = '/invoices/' + this.model.get('id') + '.pdf'
  }
  
});