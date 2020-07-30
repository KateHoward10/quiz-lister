# Load the Rails application.
require_relative 'application'

ActionMailer::Base.smtp_settings = {
  from: ENV['GMAIL_USERNAME'],
  address: 'smtp.mailgun.org',
  port: 587,
  authentication: 'plain',
  user_name: ENV['MAILGUN_SMTP_LOGIN'],
  password: ENV['MAILGUN_SMTP_PASSWORD'],
  domain: ENV['MAILGUN_DOMAIN'],
  enable_starttls_auto: true
}

# Initialize the Rails application.
Rails.application.initialize!
