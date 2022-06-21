Rails.application.routes.draw do
  resources :events
  resources :journals
  resources :users

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  post "/newJournalEntry", to: "journals#create"

  get "/myJournals", to: "journals#my_journals"

  patch "/editprofile/:id", to: "users#update"
  
end
