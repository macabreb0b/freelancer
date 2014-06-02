Freelancer.Views.Sidebar = Backbone.View.extend({
  template: JST['layouts/sidebar'],
  
  render: function() {
    
    var renderedContent = this.template({
      
    })
    this.$el.html(renderedContent);
    return this;
  }
  
})