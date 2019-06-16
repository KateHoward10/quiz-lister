class AddCoordinatesToQuizzes < ActiveRecord::Migration[5.2]
  def change
    add_column :quizzes, :latitude, :decimal
    add_column :quizzes, :longitude, :decimal
  end
end
