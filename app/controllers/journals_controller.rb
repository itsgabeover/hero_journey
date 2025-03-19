class JournalsController < ApplicationController
    def index
        render json: Journal.all, status: :ok
    end

    def show
        render json: find_journal, serializer: JournalSerializer, status: :ok
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
        journal = find_journal
        journal.update!(journal_params)
        render json: journal, status: :ok
    end

    def destroy
        journal = find_journal
        journal.destroy
        head :no_content
    end

    def unassigned
        journals = current_user.journals.where(folder_id: nil)
        render json: journals
    end

    private

    def journal_params
        params.permit(:title, :body, :archetype, :user_id, :folder_id)
    end

    # Add this method to find a journal by ID
    def find_journal
        Journal.find(params[:id])
    end
    
    # Keep this method for when you need to find a user
    def find_user
        User.find(params[:id])
    end
end