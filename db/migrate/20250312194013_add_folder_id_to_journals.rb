class AddFolderIdToJournals < ActiveRecord::Migration[7.0]
  def change
    add_reference :journals, :folder, foreign_key: true, null: true
  end
end