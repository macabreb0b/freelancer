Freelancer.Collections.Invoices = Backbone.Collection.extend({
  url: 'api/invoices',
  
  model: Freelancer.Models.Invoice
});

Freelancer.Collections.invoices = new Freelancer.Collections.Invoices();