class SessionsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :user_data_not_found
  
  skip_before_action :authorize

  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password]) #shorthand for: if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :ok
    else
      render json: { error: "Username or password not found; try again!" }, status: :unauthorized
    end
  end

  def destroy
    if session[:user_id]
        session.delete :user_id
        head :no_content
    else 
        render json: {errors: ["You must be logged in to access this content"] }, status: :unauthorized
    end
  end
end
