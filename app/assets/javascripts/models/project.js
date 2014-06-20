Freelancer.Models.Project = Backbone.Model.extend({
  urlRoot: 'api/projects',
  
  parse: function(payload) {
    if(payload.deliverables) {
      this.deliverables()
        .set(payload.deliverables, { parse: true });
      delete payload.deliverables;
    }
    return payload;
  },
  
  deliverables: function() {
    this._deliverables = this._deliverables || 
      new Freelancer.Collections.Deliverables([], {
        project: this
      });
    return this._deliverables;
  }
})