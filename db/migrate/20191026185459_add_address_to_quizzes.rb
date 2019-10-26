class AddAddressToQuizzes < ActiveRecord::Migration[5.2]
  def change
    add_column :quizzes, :address, :text
  end
end
