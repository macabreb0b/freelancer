Rails.application.routes.draw do
  root to: 'static_pages#root'
  devise_for :users
  
  namespace :api, default: :json do
    resources :clients do
      resources :projects, only: [:index, :create]
    end
    
    resources :projects, only: [:index, :create, :update, :destroy, :show] do
      resources :deliverables, only: [:index, :create, :update, :destroy]
    end
    
    post 'deliverables/:id/add_hour',
          to: 'deliverables#add_hour'
          
    resources :deliverables, only: [:show] do
      resources :hours, only: [:destroy]
    end
  end
end
