/*global Freelancer, Backbone, $, console, alert */

Freelancer.Models.Deliverable = Backbone.Model.extend({
  parse: function(payload) {
    if(payload.hours) {
      this.hours()
        .set(payload.hours, { parse: true });
      delete payload.hours;
    }
    return payload;
  },
  
  hours: function() {
    this._hours = this._hours || 
      new Freelancer.Collections.Hours([], {
        deliverable: this
      });
    return this._hours;
  },
  
  total: function() {
    return parseInt(this.get('count')) * parseInt(this.get('hourly'));
  },
  
  addHour: function() {
    var that = this;
    
    $.ajax({
      url: '/api/deliverables/' + this.id + '/add_hour',
      method: 'post',
      success: function(model) {
        that.hours().add(model);
        that.collection.trigger('update-hours', 'add');
      }
    });
  },
  
  removeHour: function() {
    var hour = this.hours().findWhere({ 
      invoice_id: null
    });
    
    if (hour) {
      hour.destroy({
        wait: true
      });
      this.collection.trigger('update-hours', 'remove');
    } else {
      alert('no uninvoiced hours to remove!');
    } 
  }
});