Rails.application.routes.draw do
  devise_for :users, path: '/', path_names: { sign_in: 'login', sign_up: 'signup', sign_out: 'logout' }, controllers: { registrations: 'registrations' }

  resources :quizzes, param: :slug do
    resources :events, only: [:index, :create, :destroy] do
      member do
        post "toggle_attending", to: "events#toggle_attending"
      end
    end
    member do
      post "toggle_favorite", to: "quizzes#toggle_favorite"
    end
  end

  get "/favourites" => "favorites#index"
  get "/my_quizzes" => "quizzes#my_quizzes"
  get "/calendar" => "quizzes#calendar"
  get "/map" => "quizzes#map"

  root "quizzes#index"
  get "/:page" => "static#show"

  resources :users
end
