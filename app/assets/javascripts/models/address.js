Freelancer.Models.Address = Backbone.Model.extend({
  initialize: function(attrs, options) {
    if(options && options.addressable) {
      this.addressable = options.addressable;
    }
  },
  
  urlRoot: 'api/addresses'
})