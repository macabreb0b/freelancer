/*global Freelancer, Backbone */
Freelancer.Collections.Clients = Backbone.Collection.extend({
  model: Freelancer.Models.Client,
  
  url: 'api/clients'
});

Freelancer.Collections.clients = new Freelancer.Collections.Clients();