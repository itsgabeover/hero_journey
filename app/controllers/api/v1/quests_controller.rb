class QuestsController < ApplicationController
  before_action :authorize
  before_action :set_quest, only: [:update, :destroy]

  def index
    render json: current_user.quests
  end

  def create
    quest = current_user.quests.create!(quest_params)
    render json: quest, status: :created
  end

  def update
    @quest.update!(quest_params)
    render json: @quest
  end

  def destroy
    @quest.destroy
    head :no_content
  end

  private

  def set_quest
    @quest = current_user.quests.find(params[:id])
  end

  def quest_params
    params.require(:quest).permit(:title, :description, :status, :progress, :goal)
  end
end
