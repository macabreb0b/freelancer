Freelancer.Models.Invoice = Backbone.Model.extend({
  urlRoot: 'api/invoices',
  
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
        invoice: this
      });
    return this._deliverables;
  },
  
  date: function() {
    var model = this;
    return dateFormat(model.escape('date'), "m/dd/yy");
  },
  
  total: function() {
    var total = 0;
    if(this.deliverables().length > 0) {
      this.deliverables().each(function(deliverable) {
        total += deliverable.total();
      });
    }
    return total;
  }
});