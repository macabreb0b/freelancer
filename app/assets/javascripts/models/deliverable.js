/*global Freelancer, Backbone, $, console */

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
  
  addHour: function() {
    var that = this;
    
    $.ajax({
      url: '/api/deliverables/' + this.id + '/add_hour',
      method: 'post',
      success: function(model) {
        that.hours().add(model);
      }
    });
  },
  
  removeHour: function() {
    var that = this;
    var hour = this.hours().findWhere({ 
      invoiced: false
    })
    
    if (hour) {
      hour.destroy({
        wait: true
      })
    } else {
      alert('no uninvoiced hours to remove!');
    } 
  }
});