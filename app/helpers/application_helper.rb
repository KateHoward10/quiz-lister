module ApplicationHelper
  def avatar_for(user)
    name = user.username || user.email
    colours = ["4B0082", "8B008B", "9400D3", "8A2BE2", "483D8B", "191970", "0000CD", "008080", "006400", "2F4F4F"]
    colour = colours[name.length % colours.length]
    avatar_url = "https://eu.ui-avatars.com/api/?name=#{name}&length=1&rounded=true&bold=true&background=#{colour}&color=fff"
    image_tag(avatar_url, size: "28x28")
  end
end
