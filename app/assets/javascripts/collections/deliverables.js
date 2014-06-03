/*global Freelancer, Backbone */

Freelancer.Collections.Deliverables = Backbone.Collection.extend({
  initialize: function(models, options) {
    this.project = options.project;
  },
  
  url: function() {
    return 'api/projects/' + this.project.id + '/deliverables';
  },
  
  model: Freelancer.Models.Deliverable
});