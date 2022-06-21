class SessionsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :user_data_not_found
  
  skip_before_action :authorize, only: :create

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
    session.destroy
    render status: :no_content
  end
end
