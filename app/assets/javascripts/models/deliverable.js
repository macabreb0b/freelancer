/*global Freelancer, Backbone, $, console, alert */

Freelancer.Models.Deliverable = Backbone.Model.extend({
  addHour: function() {
    var that = this;
    
    $.ajax({
      url: '/api/deliverables/' + this.id + '/add_hour',
      method: 'post',
      success: function(model) {
        that.hours().add(model);
        that.collection.trigger('add-hour');
      },
      error: function() {
        alert('error adding hour!')
      }
    });
  },

  checkRemovable: function() {
    if(typeof this.findRemovableHour() === 'undefined') {
      return false;
    } else {
      return true;
    }
  },
  
  findRemovableHour: function() {
    return this.hours().findWhere({ 
      invoice_id: null
    });
  },
  
  hours: function() {
    this._hours = this._hours || 
      new Freelancer.Collections.Hours([], {
        deliverable: this
      });
    return this._hours;
  },
  
  parse: function(payload) {
    if(payload.hours) {
      this.hours()
        .set(payload.hours, { parse: true });
      delete payload.hours;
    }
    return payload;
  },
  
  removeHour: function() {
    var hour = this.findRemovableHour();
    var deliverable = this;
    
    if (hour) {
      hour.destroy({
        wait: true,
        success: function() {
          deliverable.collection.trigger('remove-hour');
        }
      });
    } else {
      alert('no uninvoiced hours to remove!');
    } 
  },

  total: function() {
    return parseInt(this.get('count')) * parseInt(this.get('hourly'));
  }
});