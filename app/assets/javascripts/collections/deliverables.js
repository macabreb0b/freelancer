/*global Freelancer, Backbone */

Freelancer.Collections.Deliverables = Backbone.Collection.extend({
  initialize: function(models, options) {
    if(options.project) {
      this.project = options.project;
    }
    if(options.invoice) {
      this.invoice = options.invoice;
    }
  },
  
  url: function() {
    return 'api/projects/' + this.project.id + '/deliverables';
  },
  
  model: Freelancer.Models.Deliverable
});