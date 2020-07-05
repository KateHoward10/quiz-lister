module ApplicationHelper
  def gravatar_for(user)
    email_address = user.email.downcase
    hash = Digest::MD5.hexdigest(email_address)
    gravatar_url = "https://www.gravatar.com/avatar/#{hash}?d=identicon"
    image_tag(gravatar_url, size: "28x28")
  end
end
