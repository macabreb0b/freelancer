/*global Freelancer, Backbone */

Freelancer.Collections.Deliverables = Backbone.Collection.extend({
  initialize: function(models, options) {
    this.project = options.project
  },
  
  url: function() {
    return this.project.url() + 'deliverables';
  },
  
  model: Freelancer.Models.Deliverable
});