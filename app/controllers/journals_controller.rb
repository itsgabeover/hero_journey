class JournalsController < ApplicationController
  before_action :set_journal, only: [:show, :update, :destroy]

  # GET /journals
  def index
    render json: current_user.journals, status: :ok
  end

  # GET /journals/:id
  def show
    render json: @journal, serializer: JournalSerializer, status: :ok
  end

  # GET /journals/my_journals
  def my_journals
    render json: current_user.journals, status: :ok
  end

  # POST /journals
  def create
    new_entry = current_user.journals.create!(journal_params)
    render json: new_entry, status: :created
  end

  # PATCH/PUT /journals/:id
  def update
    @journal.update!(journal_params)
    render json: @journal, status: :ok
  end

  # DELETE /journals/:id
  def destroy
    @journal.destroy
    head :no_content
  end

  # GET /journals/unassigned
  def unassigned
    journals = current_user.journals.where(folder_id: nil)
    render json: journals, status: :ok
  end

  private

  def journal_params
    params.permit(:title, :body, :archetype, :folder_id)
  end

  def set_journal
    @journal = current_user.journals.find(params[:id])
  end
end
