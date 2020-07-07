module ApplicationHelper
  def avatar_for(user)
    name = user.username || user.email
    colours = ["4B0082", "8B008B", "9400D3", "8A2BE2", "483D8B", "191970", "0000CD", "008080", "006400", "2F4F4F"]
    colour = colours[name.length % colours.length]
    html = <<-HTML
      <div class="avatar" style="background: ##{colour}">#{name[0].upcase}</div>
    HTML

    html.html_safe
  end
end
