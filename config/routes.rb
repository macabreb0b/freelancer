Rails.application.routes.draw do
  root to: 'static_pages#root'
  devise_for :users
  
  namespace :api, defaults: { format: :json } do
    resources :clients do
      resources :projects, only: [:index, :create]
    end
    
    resources :projects, only: [:index, :create, :update, :destroy, :show] do
      post 'invoice', to: 'projects#invoice'
      resources :deliverables, only: [:create, :update, :destroy]
    end
    
    resources :invoices, only: [:show, :index, :update, :destroy]
    
    post 'deliverables/:id/add_hour',
          to: 'deliverables#add_hour'
          
    resources :deliverables, only: [:show] do
      resources :hours, only: [:destroy]
    end
    
    resources :addresses, only: [:index, :create]
  end
end
