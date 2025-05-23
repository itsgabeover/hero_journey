class SessionsController < ApplicationController
  skip_before_action :authorize, only: [:create, :show]

  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, serializer: UserSerializer, status: :ok
    else
      render json: { error: "Username or password not found; try again!" }, status: :unauthorized
    end
  end

  def destroy
    reset_session
    Rails.logger.info "User logged out successfully"
    head :no_content
  end

  def show  # GET /me
    if current_user
      render json: current_user
    else
      render json: { error: "Not logged in" }, status: :unauthorized
    end
  end
end
