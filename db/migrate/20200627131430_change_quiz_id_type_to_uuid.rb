class ChangeQuizIdTypeToUuid < ActiveRecord::Migration[5.2]
  def change
    enable_extension 'pgcrypto'
    add_column :quizzes, :uuid, :uuid, default: "gen_random_uuid()", null: false

    change_table :quizzes do |t|
      t.remove :id
      t.rename :uuid, :id
    end
    execute "ALTER TABLE quizzes ADD PRIMARY KEY (id);"
  end
end
