class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.text :username
      t.text :password_digest
      t.text :first_name
      t.text :last_name
      t.text :nickname
      t.text :email
      t.text :archetype

      t.timestamps
    end
  end
end

