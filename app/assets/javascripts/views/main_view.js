/*global JST, Freelancer, Backbone */
Freelancer.Views.MainView = Backbone.View.extend({
  initialize: function() {
    // add sidebar subview and mainview subview
    
    // listenTo 'sidebar' trigger to show which to highlight
  },
  
  template: JST['layouts/main'],
  
  render: function() {
    var renderedContent = this.template({
      
    })
    // this.attachSubviews();
    var sidebar = new Freelancer.Views.Sidebar();
    this.$el.html(renderedContent);
    this.$el.find('#sidebar').html(sidebar.render().$el);
    return this;
  }
  
  
})