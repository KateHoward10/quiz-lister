Rails.application.routes.draw do
  resources :quizzes

root "quizzes#index"
get "/:page" => "static#show"

end
