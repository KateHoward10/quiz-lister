class AddPhotoUrlToQuizzes < ActiveRecord::Migration[5.2]
  def change
    add_column :quizzes, :photo_url, :string
  end
end
