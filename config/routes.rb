Rails.application.routes.draw do
  devise_for :users, :path => '/', :path_names => { :sign_in => 'login', :sign_up => 'signup', :sign_out => 'logout' }
  resources :quizzes do
    member do
      post 'toggle_favorite', to: "quizzes#toggle_favorite"
    end
  end
  get "/favourites" => "favorites#index"

  root "quizzes#index"
  get "/:page" => "static#show"

end
