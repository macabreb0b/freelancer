/*global Freelancer, Backbone */

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
    'clients/:id/projects/new': 'newClientProject'
  },
  
  mainView: function() {
    if(!this._mainView) {
      this._mainView = new Freelancer.Views.MainView();
      this.$rootEl.html(this._mainView.render().$el);
    }
    return this._mainView;
  },
  
  home: function() {
    this.mainView();
    Freelancer.Collections.projects.fetch();
    
    var dashboardView = new Freelancer.Views.Dashboard({
      collection: Freelancer.Collections.projects
    });
    this.swapDisplay(dashboardView);
  },
  
  clientsIndex: function() {
    this.mainView();
    
    Freelancer.Collections.clients.fetch();
    var indexView = new Freelancer.Views.ClientsIndex({
      collection: Freelancer.Collections.clients
    });
    this.swapDisplay(indexView);
  },
  
  showClient: function(id) {
    this.mainView();
    
    var client = Freelancer.Collections.clients.getOrFetch(id);
    var showView = new Freelancer.Views.ShowClient({
      model: client
    });
    this.swapDisplay(showView);
  },
  
  editClient: function(id) {
    this.mainView();
    
    var client = Freelancer.Collections.clients.getOrFetch(id);
    var editView = new Freelancer.Views.EditClient({
      model: client
    });
    this.swapDisplay(editView);
  },
  
  newClient: function() {
    this.mainView();
    var newView = new Freelancer.Views.NewClient();
    this.swapDisplay(newView);
  },
  
  projectsIndex: function() {
    this.mainView();
    
    Freelancer.Collections.projects.fetch();
    var indexView = new Freelancer.Views.ProjectsIndex({
      collection: Freelancer.Collections.projects
    });
    this.swapDisplay(indexView);
  },
    
  showProject: function(id) {
    this.mainView();
    
    var project = Freelancer.Collections.projects.getOrFetch(id);
    var showView = new Freelancer.Views.ShowProject({
      model: project
    });
    this.swapDisplay(showView);
  },
  
  editProject: function(id) {
    this.mainView();
    
    var project = Freelancer.Collections.projects.getOrFetch(id);
    Freelancer.Collections.clients.fetch()
    
    var editView = new Freelancer.Views.EditProject({
      model: project,
      collection: Freelancer.Collections.clients
    });
    this.swapDisplay(editView);
  },
  
  newProject: function() {
    this.mainView();
    
    Freelancer.Collections.clients.fetch();
    
    var newView = new Freelancer.Views.NewProject({
      collection: Freelancer.Collections.clients
    });
    this.swapDisplay(newView);
  },
  
  newClientProject: function(id) {
    this.mainView();
    
    Freelancer.Collections.clients.fetch();

    var newView = new Freelancer.Views.NewClientProject({
      collection: Freelancer.Collections.clients
    });
    newView.client_id = id
    this.swapDisplay(newView);
  },
  
  swapDisplay: function(newView) {
   if(this._currentDisplayView) {
     this._currentDisplayView.remove();
   }
   this._currentDisplayView = newView;
   this.mainView().$el.find('#display').html(newView.render().$el); 
  }
});