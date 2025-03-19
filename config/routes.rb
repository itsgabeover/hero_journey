Rails.application.routes.draw do
  root to: 'home#index'
  
  get "home/index"
  get '/journals/unassigned', to: 'journals#unassigned'
  resources :journals
  resources :users
  resources :folders, only: [:index, :show, :create, :update, :destroy]

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/me", to: "sessions#show"

  post "/signup", to: "users#create"
 

  post "/newJournalEntry", to: "journals#create"

  get "/myJournals", to: "journals#my_journals"

  patch "/editprofile/:id", to: "users#update"

  
end
