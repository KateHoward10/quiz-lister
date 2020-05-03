Rails.application.routes.draw do
  devise_for :users
  resources :quizzes

root "quizzes#index"
get "/:page" => "static#show"

end
