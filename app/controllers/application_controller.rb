class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  before_action :authorize

  private

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])  # <- This is the missing piece
  end

  def authorize
    unless current_user  # use the helper, not @current_user directly
      render json: { errors: ["Not authorized"] }, status: :unauthorized
    end
  end

  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end
end
