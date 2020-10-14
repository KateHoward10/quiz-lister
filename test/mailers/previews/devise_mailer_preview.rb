class DeviseMailerPreview < ActionMailer::Preview
  # http://localhost:3000/rails/mailers/devise_mailer/email_changed
  def email_changed
    DeviseMailer.email_changed(User.first, {})
  end

  # http://localhost:3000/rails/mailers/devise_mailer/confirmation_instructions
  def confirmation_instructions
    DeviseMailer.confirmation_instructions(User.first, {})
  end

  # http://localhost:3000/rails/mailers/devise_mailer/password_change
  def password_change
    DeviseMailer.password_change(User.first, {})
  end

  # http://localhost:3000/rails/mailers/devise_mailer/reset_password_instructions
  def reset_password_instructions
    DeviseMailer.reset_password_instructions(User.first, {})
  end
end
