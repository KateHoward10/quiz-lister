Rails.application.routes.draw do
  devise_for :users
  resources :quizzes do
    member do
      post 'toggle_favorite', to: "quizzes#toggle_favorite"
    end
  end
  get "/favourites" => "favorites#index"

root "quizzes#index"
get "/:page" => "static#show"

end
