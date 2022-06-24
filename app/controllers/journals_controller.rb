class JournalsController < ApplicationController
    def index
        render json: Journal.all, status: :ok
    end

    def show
        render json: find_user, serializer: JournalSerializer, status: :ok
    end

    def my_journals
        current_user = User.find(session[:user_id])
        render json: current_user.journals, status: :ok
    end
    
    def create
        new_entry = Journal.create!(journal_params)
        render json: new_entry, status: :created
    end

    def update
        this_user = find_user
        this_user.update!(user_params)
        render json: this_user, status: :ok
    end

    def destroy
        this_user = find_user
        this_user.destroy
        render status: :no_content
    end

    private

    def journal_params
        params.permit(:title, :body, :tags, :user_id)
    end
    def find_user
        User.find(params[:id])
    end
    

end
