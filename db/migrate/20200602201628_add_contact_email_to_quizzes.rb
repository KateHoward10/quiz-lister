class AddContactEmailToQuizzes < ActiveRecord::Migration[5.2]
  def change
    add_column :quizzes, :contact_email, :string
    remove_column :quizzes, :photo_url
  end
end
