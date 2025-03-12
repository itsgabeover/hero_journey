class RenameTagsToArchetypeInJournalsNew < ActiveRecord::Migration[7.2]
  def change
    rename_column :journals, :tags, :archetype
  end
end