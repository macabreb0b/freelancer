/*global JST, Freelancer, Backbone */
Freelancer.Views.MainView = Backbone.View.extend({
  initialize: function() {
    
    // listenTo 'sidebar' trigger to show which to highlight
    
    this.setDisplayHeight();
  },
  
  template: JST['layouts/main'],
  
  render: function() {
    var renderedContent = this.template()
    // this.attachSubviews();
    var sidebar = new Freelancer.Views.Sidebar();
    this.$el.html(renderedContent);
    this.setDisplayHeight();
    this.$el.find('#sidebar').html(sidebar.render().$el);
    return this;
  },
  
  setDisplayHeight: function() {
    var windowHeight = window.innerHeight;
    this.$('#display').height(windowHeight - 51)
  }
  
  
})