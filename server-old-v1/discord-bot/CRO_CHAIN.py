import discord
import requests
from discord.ext import commands, tasks
import os
import subprocess
import mysql.connector

connection = mysql.connector.connect(
  host='remotemysql.com',
  user=os.getenv('DB_USER'),
  password=os.getenv('DB_PASS'),
  database='MCWKiOrWYL'
)

def to_lower(argument):
  return argument.lower()

class CRO_CHAIN(commands.Cog, name='Crypto.org Chain'):
  def __init__(self, bot):
    self.bot = bot
    self.price = None
    self.update.start()
    self.image = requests.get('https://crypto.com/price/coin-data/icon/CRO/color_icon.png').content

  @commands.command()
  async def rewards(self, ctx):
    res = requests.get('https://crypto.org/explorer/api/v1/accounts/cro195qdmaeu97dzeyjed8f9a9qhl7mngwcpwa2dyw')
    result = res.json()['result']
    totalRewards = float(result['totalRewards'][0]['amount'])/100000000
    embed = discord.Embed(title='CRO Stake Rewards', description=f'{totalRewards:,} CRO', color=discord.Color.green())
    await ctx.send(embed=embed)
  
  @commands.command()
  async def cro(self, ctx, keyword):
    price = self.price
    if keyword.lower() == 'stats':
      res = requests.get('https://crypto.org/explorer/api/v1/accounts/cro195qdmaeu97dzeyjed8f9a9qhl7mngwcpwa2dyw')
      result = res.json()['result']
      address = result['address']
      balance = float(result['balance'][0]['amount'])/100000000
      totalRewards = float(result['totalRewards'][0]['amount'])/100000000
      bondedBalance = float(result['bondedBalance'][0]['amount'])/100000000
      totalBalance = float(result['totalBalance'][0]['amount'])/100000000
      embed = discord.Embed(title='CRO Stats :chart_with_upwards_trend: ', description=f'1 CRO = (${price} SGD)', color=discord.Color.green())
      embed.add_field(name='Address :house_with_garden:', value=address, inline=False)
      embed.add_field(name='Balance :dollar:', value=f'{balance:,.2f} CRO ≈ (${balance*price:,.2f} SGD)', inline=False)
      embed.add_field(name='Total Rewards :trophy:', value=f'{totalRewards:,.2f} CRO ≈ (${totalRewards*price:,.2f} SGD)', inline=False)
      embed.add_field(name='Bonded Balance :handshake:', value=f'{bondedBalance:,.2f} CRO ≈ (${bondedBalance*price:,.2f} SGD)', inline=False)
      embed.add_field(name='Total Balance :moneybag:', value=f'{totalBalance:,.2f} CRO ≈ (${totalBalance*price:,.2f} SGD)', inline=False)
      #await self.bot.user.edit(username='Crypto.com Coin', avatar=self.image)
      await ctx.send(embed=embed)
  
  @commands.command()
  async def cro_address(self, ctx, address):
    res = requests.get(f'https://crypto.org/explorer/api/v1/accounts/{address}')
    body = res.json()
    result = body['result']
    embed = discord.Embed()
    if result is not None:
      price = self.price
      address = result['address']
      title = 'Address'
      description = address
      color = 65280
      balance = result['balance']
      totalRewards = result['totalRewards']
      bondedBalance = result['bondedBalance']
      totalBalance = result['totalBalance']
      if balance:
        balance = float(balance[0]['amount'])/100000000
        embed.add_field(name='Balance', value=f'{balance:,.2f} CRO ≈ (${price*balance:,.2f})', inline=False)
      if totalRewards:
        totalRewards = float(totalRewards[0]['amount'])/100000000
        embed.add_field(name='Total Rewards', value=f'{totalRewards:,.2f} CRO ≈ (${price*totalRewards:,.2f})', inline=False)
      if bondedBalance:
        bondedBalance = float(bondedBalance[0]['amount'])/100000000
        embed.add_field(name='Bonded Balance', value=f'{bondedBalance:,.2f} CRO ≈ (${price*bondedBalance:,.2f})', inline=False)
      if totalBalance:
        totalBalance = float(totalBalance[0]['amount'])/100000000
        embed.add_field(name='Total Balance', value=f'{totalBalance:,.2f} CRO ≈ (${price*totalBalance:,.2f})', inline=False)
    else:
      title = 'Invalid Address'
      description = body['error']
      color = 16711680
    embed.title = title
    embed.description = description
    embed.color = color
    await ctx.send(embed=embed)

  @commands.command()
  async def query(self, ctx, keyword: to_lower, abtv):
    print('keyword:', keyword)
    print('abtv:', abtv)
    embed = discord.Embed(title=keyword.capitalize())
    if keyword == 'address':
      res = requests.get(f'https://crypto.org/explorer/api/v1/accounts/{abtv}')
      result = res.json()['result']
    elif keyword == 'block':
      res = requests.get(f'https://crypto.org/explorer/api/v1/blocks/{abtv}')
      result = res.json()['result']
    elif keyword == 'transaction':
      res = requests.get(f'https://crypto.org/explorer/api/v1/transactions/{abtv}')
      result = res.json()['result']
      success = result['success']
      blockTime = result['blockTime']
      blockHeight = result['blockHeight']
      blockHash = result['blockHash']
      hash = result['hash']
      if success == True:
        success = ':white_check_mark:'
      else:
        success = ':no_entry:'
      embed.add_field(name='Status', value=success, inline=False)
      embed.add_field(name='Block Time (UTC)', value=blockTime, inline=False)
      embed.add_field(name='Block Height', value=blockHeight, inline=False)
      embed.add_field(name='Block Hash', value=blockHash, inline=False)
      embed.add_field(name='Tx Hash', value=hash, inline=False)
      url = f'https://crypto.org/explorer/tx/{abtv}'
    elif keyword == 'validator':
      res = requests.get(f'https://crypto.org/explorer/api/v1/validators/{abtv}')
      result = res.json()['result']
    if result is not None:
      #print(result)
      #await ctx.send(result)
      color = discord.Color.green()
      embed.color = color
      embed.url = url
      await ctx.send(embed=embed)
  
  @tasks.loop(minutes=1, reconnect=True)
  async def update(self):
    res = requests.get('https://api.coingecko.com/api/v3/simple/price?ids=crypto-com-chain&vs_currencies=sgd')
    self.price = res.json()['crypto-com-chain']['sgd']

def setup(client):
  client.add_cog(CRO_CHAIN(client))