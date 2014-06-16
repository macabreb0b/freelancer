Freelancer.Collections.Hours = Backbone.Collection.extend({
  url: function() {
    return 'api/deliverables/' + this.deliverable.id + '/hours'
  },
  
  model: Freelancer.Models.Hour,
  
  initialize: function(models, options) {
    this.deliverable = options.deliverable;
  }
})