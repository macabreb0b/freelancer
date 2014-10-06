Freelancer.Models.Invoice = Backbone.Model.extend({
  urlRoot: 'api/invoices',
  
  parse: function(payload) {
    if(payload.deliverables) {
      this.deliverables()
        .set(payload.deliverables, { parse: true });
      delete payload.deliverables;
    }
    
    if(payload.user_address) {
      this.userAddress().set(payload.user_address);
      delete payload.user_address;
    }
    
    if(payload.client_address) {
      this.clientAddress().set(payload.client_address);
      delete payload.client_address;
    }
    return payload;
  },
  
  clientAddress: function() {
    this._clientAddress = this._clientAddress || 
          new Freelancer.Models.Address()
    return this._clientAddress
  },
  
  deliverables: function() {
    this._deliverables = this._deliverables || 
      new Freelancer.Collections.Deliverables([], {
        invoice: this
      });
    return this._deliverables;
  },
  
  date: function() {
    var model = this;
    return dateFormat(model.escape('date'), "m/dd/yy");
  },
  
  setUserAddress: function(address) {
    this._userAddress = address;
    this.save({'user_address_id': this.userAddress().get('id')});
    this.trigger('selectAddress', address);
    return this._userAddress;
  },
  
  total: function() {
    var total = 0;
    if(this.deliverables().length > 0) {
      this.deliverables().each(function(deliverable) {
        total += deliverable.total();
      });
    }
    return total;
  },
  
  userAddress: function() {
    this._userAddress = this._userAddress || 
          new Freelancer.Models.Address()
    return this._userAddress;
  },
});