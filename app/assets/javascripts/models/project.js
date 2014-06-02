Freelancer.Models.Project = Backbone.Model.extend({
  urlRoot: 'api/projects',
  
  initialize: function(model, options) {
    
  },
  
  parse: function(payload) {
    if(payload.deliverables) {
      this.projects().set(payload.deliverables, { parse: true });
      delete payload.deliverables;
    }
    return payload
  },
  
  deliverables: function() {
    this._deliverables = this._deliverables || 
      new Freelancer.Collections.Deliverables([], {
        client: this
      });
    return this._deliverables;
  }
})