Freelancer.Models.Project = Backbone.Model.extend({
  urlRoot: 'api/projects',
  
  parse: function(payload) {
    if(payload.deliverables) {
      this.deliverables()
        .set(payload.deliverables, { parse: true });
      delete payload.deliverables;
    }
    if(payload.invoices) {
      this.invoices()
        .set(payload.invoices, { parse: true });
      delete payload.invoices;
    }
    return payload;
  },
  
  deliverables: function() {
    this._deliverables = this._deliverables || 
      new Freelancer.Collections.Deliverables([], {
        project: this
      });
    return this._deliverables;
  },
  
  invoices: function() {
    this._invoices = this._invoices || 
      new Freelancer.Collections.Invoices([], {
        project: this
      });
    return this._invoices;
  }
})