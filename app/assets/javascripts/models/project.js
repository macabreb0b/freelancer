Freelancer.Models.Project = Backbone.Model.extend({
  urlRoot: 'api/projects',
  
  initialize: function(model, options) {
    this.set('open', true);
  }
})