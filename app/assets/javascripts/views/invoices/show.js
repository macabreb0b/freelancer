Freelancer.Views.ShowInvoice = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },
  
  template: JST['invoices/show'],
  
  render: function() {
    var renderedContent = this.template({
      invoice: this.model
    });
    this.$el.html(renderedContent);
    return this;
  }
})