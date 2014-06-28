/*global Freelancer, Backbone, CanvasLoader, window */

Freelancer.Routers.AppRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },
  
  routes: {
    '': 'home',
    'clients': 'clientsIndex',
    'clients/new': 'newClient',
    'clients/:id': 'showClient',
    'clients/:id/edit': 'editClient',
    'projects': 'projectsIndex',
    'projects/new': 'newProject',
    'projects/:id': 'showProject',
    'projects/:id/edit': 'editProject',
    'clients/:id/projects/new': 'newClientProject',
    'invoices': 'invoicesIndex',
    'invoices/new': 'newInvoice',
    'invoices/:id': 'showInvoice',
    'invoices/:id/edit': 'editInvoice'
  },
  
  mainView: function(section) {
    if(!this._mainView) {
      this._mainView = new Freelancer.Views.MainView();
      this.$rootEl.html(this._mainView.render().$el);
    }
    this.swapSidebar(section);
    this._mainView.spinner('#display');
    return this._mainView;
  },
  
  home: function() {
    this.mainView('.home');
    Freelancer.Collections.projects.fetch();
    
    var dashboardView = new Freelancer.Views.Dashboard({
      collection: Freelancer.Collections.projects
    });
    this.swapDisplay(dashboardView);
  },
  
  clientsIndex: function() {
    this.mainView('.clients');
    
    var view = this;
    
    Freelancer.Collections.clients.fetch({
      success: function() {
        var indexView = new Freelancer.Views.ClientsIndex({
          collection: Freelancer.Collections.clients
        });
        view.swapDisplay(indexView);
      }
    });
  },
  
  editClient: function(id) {
    this.mainView('.clients');
    
    var client = Freelancer.Collections.clients.getOrFetch(id);
    var editView = new Freelancer.Views.EditClient({
      model: client
    });
    this.swapDisplay(editView);
  },
  
  newClient: function() {
    this.mainView('.clients');
    
    var newView = new Freelancer.Views.NewClient();
    this.swapDisplay(newView);
  },
  
  projectsIndex: function() {
    this.mainView('.projects');

    var router = this;
    
    Freelancer.Collections.projects.fetch({
      success: function() {
        var indexView = new Freelancer.Views.ProjectsIndex({
          collection: Freelancer.Collections.projects
        });
        router.swapDisplay(indexView);
      }
    });
  },
  
  showClient: function(id) {
    this.mainView('.clients');
    
    var client = Freelancer.Collections.clients.getOrFetch(id);
    var showView = new Freelancer.Views.ShowClient({
      model: client
    });
    this.swapDisplay(showView);
  },
    
  showProject: function(id) {
    this.mainView('.projects');
    var router = this;

    var project = Freelancer.Collections.projects.getOrFetch(id);
    project.fetch({ 
      success: function() {
        var showView = new Freelancer.Views.ShowProject({
          model: project
        });
        router.swapDisplay(showView);
      }
    });
  },
  
  editProject: function(id) {
    this.mainView('.projects');
    
    var project = Freelancer.Collections.projects.getOrFetch(id);
    Freelancer.Collections.clients.fetch();
    
    var editView = new Freelancer.Views.EditProject({
      model: project,
      collection: Freelancer.Collections.clients
    });
    this.swapDisplay(editView);
  },
  
  newProject: function() {
    this.mainView('.projects');
    var router = this;
    
    Freelancer.Collections.clients.fetch({
      wait: true,
      success: function(models, response) {
        // redirect if no clients exist
        if(typeof response[0] == "undefined") {
          window.alert('You must create a client first!');
          Backbone.history.navigate('#/clients/new', { trigger: true });
        } else {
          var newView = new Freelancer.Views.NewProject({
            collection: Freelancer.Collections.clients
          });
          router.swapDisplay(newView);
        }
      }
    });
  },
  
  invoicesIndex: function() {
    this.mainView('.invoices');
    var router = this;
    Freelancer.Collections.projects.fetch();
    
    Freelancer.Collections.invoices.fetch({
      wait: true,
      success: function() {
        var newView = new Freelancer.Views.InvoicesIndex({
          collection: Freelancer.Collections.invoices
        });
        router.swapDisplay(newView);
      }
    });
  },
  
  showInvoice: function(id) {
    this.mainView('.invoices');

    var invoice = Freelancer.Collections.invoices.getOrFetch(id);
    var newView = new Freelancer.Views.ShowInvoice({
      model: invoice
    });
    this.swapDisplay(newView);
  },
  
  newClientProject: function(id) {
    this.mainView('.projects');
    
    var router = this;
    Freelancer.Collections.clients.fetch({
      success: function() {
        var newView = new Freelancer.Views.NewClientProject({
          collection: Freelancer.Collections.clients
        });
        newView.client_id = id;
        router.swapDisplay(newView);
      }
    });    
  },
  
  swapDisplay: function(newView) {
    if(this._currentDisplayView) {
     this._currentDisplayView.remove();
    }
    this._currentDisplayView = newView;
    this._mainView.$el.find('#display')
         .html(newView.render().$el); 
  },
  
  swapSidebar: function(section) {
    if(this._currentSection !== section) {
      this._currentSection = section;
      var $sidebar = this.mainView().$el.find('#sidebar');
      $sidebar.find('li').removeClass('active');
      $sidebar.find(section).addClass('active');
    }
  }
});