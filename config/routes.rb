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
    
    resources :deliverables, only: [:show]
  end
end
