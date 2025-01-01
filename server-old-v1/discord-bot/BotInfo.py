
import discord
from datetime import datetime
from discord.ext import commands

class BotInfo(commands.Cog):
  def __init__(self, client):
    self.client = client
    self.start_time = datetime.now()

  @commands.command()
  async def uptime(self, ctx):
    current_time = datetime.now()
    start_time = self.start_time
    uptime = current_time - start_time
    seconds = uptime.seconds % (24 * 3600) % 3600 % 60
    minutes = uptime.seconds % 3600 // 60
    hours = uptime.seconds % (24 * 3600) // 3600
    days = uptime.seconds // (24 * 3600)
    uptime_format = f'{days} day(s), {hours} hour(s), {minutes} minute(s) and {seconds} second(s)'
    embed = discord.Embed(title='Uptime :hourglass:', description=uptime_format, colour=discord.Colour.green())
    embed.add_field(name='Online Since', value=start_time.strftime('%d/%m/%Y, %I:%M%p')) #:%S
    await ctx.send(embed=embed)

def setup(client):
  client.add_cog(BotInfo(client))