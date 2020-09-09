Rails.application.routes.draw do
  root 'topics#index'
  resources :topics
  post '/upload/images', to: "info#upload_image"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
