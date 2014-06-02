/*global Freelancer, Backbone */

Freelancer.Collections.Deliverables = Backbone.Collection.extend({
  url: function() {
    return 'api/projects/' + this.project.id + 'deliverables';
  },
  
  model: Freelancer.Models.Deliverable
});