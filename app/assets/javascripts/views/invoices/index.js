Freelancer.Views.InvoicesIndex = Backbone.View.extend({
  initialize: function() {
    this.listenTo(Freelancer.Collections.projects, 'sync', this.render);
  },
  
  template: JST['invoices/index'],
  
  render: function() {
    var renderedContent = this.template({
      invoices: this.collection,
      projects: Freelancer.Collections.projects
    });
    this.$el.html(renderedContent)
    return this;
  }
})