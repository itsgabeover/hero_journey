class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create]

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def show
    user = User.find(params[:id])
    render json: user
  end

  def update
    user = User.find(params[:id])
    user.update!(user_params)
    render json: user, status: :ok
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
    head :no_content
  end

  private

  def user_params
    params.require(:user).permit(
    :username,
    :password,
    :password_confirmation,
    :first_name,
    :last_name,
    :nickname,
    :email,
    :archetype
    )
  end
end
