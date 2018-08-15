class CreateArticles < ActiveRecord::Migration[5.1]
  def change
    create_table :articles do |t|
      t.string :title
      t.text :original
      t.text :correction

      t.timestamps
    end
  end
end
