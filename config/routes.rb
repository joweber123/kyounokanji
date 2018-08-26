Rails.application.routes.draw do
  root 'static_pages#home'
  resources :articles do
    resources :comments
  end
  # get 'static_pages/home'
  namespace :admin do
    resources :articles do
      resources :comments
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
