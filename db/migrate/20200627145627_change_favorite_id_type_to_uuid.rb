class ChangeFavoriteIdTypeToUuid < ActiveRecord::Migration[5.2]
  def up
    execute "ALTER TABLE favorites ALTER COLUMN favoritable_id TYPE char USING favoritable_id::char;"
    execute "ALTER TABLE favorites ALTER COLUMN favoritable_id TYPE uuid USING favoritable_id::uuid;"
  end

  def down
    change_column :favorites, :favoritable_id, :bigint
  end
end
