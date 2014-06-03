/*global Freelancer, Backbone */
Freelancer.Collections.Projects = Backbone.Collection.extend({
  initialize: function(model, options) {
    if(options && options.client) { this.client = options.client };
  },
  
  model: Freelancer.Models.Project,
  
  url: function() {    
    if(this.client) {
      return 'api/clients/' + this.client.id + '/projects';      
    } else {
      return 'api/projects'
    }
  }
});

Freelancer.Collections.projects = new Freelancer.Collections.Projects();