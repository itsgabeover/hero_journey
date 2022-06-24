class UsersController < ApplicationController
    skip_before_action :authorize, only: :create
    
    def index
        render json: User.all, status: :ok
    end

    def show
        render json: @current_user
      end
    
    def create
        new_user = User.create!(user_params)
        session[:user_id] = new_user.id
        render json: new_user, status: :created
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

    def find_user
        User.find(params[:id])
    end
    
    def user_params
        params.permit(:username, :password, :password_confirmation, :first_name, :last_name, :email, :archetype, :nickname)
end

end
