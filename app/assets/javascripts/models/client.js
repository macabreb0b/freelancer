/*global Freelancer, Backbone */

Freelancer.Models.Client = Backbone.Model.extend({
  urlRoot: 'api/clients',
  
  parse: function(payload) {
    if(payload.projects) {
      this.projects().set(payload.projects, { parse: true });
      delete payload.projects;
    }
    return payload;
  },
  
  projects: function() {
    this._projects = this._projects || 
      new Freelancer.Collections.Projects([], {
        client: this
      });
    return this._projects;
  }
});