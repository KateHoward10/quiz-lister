class RemovePhotoUrlFromQuiz < ActiveRecord::Migration[5.2]
  def up
    if column_exists? :quizzes, :photo_url
      remove_column :quizzes, :photo_url
    end
  end

  def down
    add_column :quizzes, :photo_url, :string
  end
end
