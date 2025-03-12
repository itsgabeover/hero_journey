class FoldersController < ApplicationController
  def index
    folders = current_user.folders.includes(:journals)
    render json: folders, include: :journals
  end

  def show
    folder = current_user.folders.find(params[:id])
    render json: folder, include: :journals
  end

  def create
    folder = current_user.folders.new(folder_params)
    if folder.save
      render json: folder, status: :created
    else
      render json: { errors: folder.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    folder = current_user.folders.find(params[:id])
    if folder.update(folder_params)
      render json: folder, status: :ok
    else
      render json: { errors: folder.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    folder = current_user.folders.find(params[:id])
    folder.destroy
    head :no_content
  end

  private

  def folder_params
    params.require(:folder).permit(:name)
  end
end
