Freelancer.Collections.Invoices = Backbone.Collection.extend({
  initialize: function(models, options) {
    if(options && options.project) { this.project = options.project };
  },
  
  comparator: function(thing) {
    return -thing.id
  },
  
  url: 'api/invoices',
  
  model: Freelancer.Models.Invoice
});

Freelancer.Collections.invoices = new Freelancer.Collections.Invoices();