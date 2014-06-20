/*global Freelancer, Backbone, JST */
Freelancer.Views.HoursDisplay = Backbone.View.extend({
  className: 'panel panel-primary hours-display',
  
  initialize: function() {
    this.listenTo(this.model, 
      'change:total_hours change:uninvoiced_hours_count', this.render);
  },
  template: JST['projects/hours_display'],
  
  render: function() {
    var disabled = this.model.escape('uninvoiced_hours_count') && 
          this.model.escape('uninvoiced_hours_count') < 1;
    
    var renderedContent = this.template({
      total_hours: this.model.escape('total_hours'),
      uninvoiced_hours: this.model.escape('uninvoiced_hours_count'),
      disabled: disabled
    });
    
    this.$el.html(renderedContent);
    return this;
  }
});