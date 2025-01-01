const express = require('express');
const cron = require('node-cron');
const router = express.Router();

router.get('', (req, res) => {
  // console.log(discordClient);
  res.sendStatus(200);
});

router.post('/send-dm', (req, res) => {
  const { id, guild_id, message } = req.body;
  // const guild = discordClient.guilds.cache.get(guild_id);
  // console.log(guild);
  const user = discordClient.users.cache.get(id);
  console.log(user);
  user.send(message);
  res.sendStatus(200);
});

// router.put('/delete-dm', (req, res) => {
//   const { id } = req.body;
//   // const guild = discordClient.guilds.cache.get(guild_id);
//   // console.log(guild);
//   const user = discordClient.users.cache.get(id);
//   console.log(user);
//   user.deleteDM();
//   res.sendStatus(200);
// });

router.get('/guild', async (req, res) => {
  const { id } = req.query;
  const guild = discordClient.guilds.cache.get(id);
  res.send(guild);
});

router.get('/guilds', async (req, res) => {
  let guildArray = [];
  guilds = await discordClient.guilds.fetch();
  // console.log(guilds);
  guilds.forEach(guild => {
    // console.log(guild);
    guildArray.push({
      id: guild.id,
      name: guild.name,
    });
  });
  res.send(guildArray);
});

router.get('/users', async (req, res) => {
  let userArray = [];
  guilds = discordClient.guilds.cache;
  // console.log(guilds);
  guilds.forEach(guild => {
    members = guild.members.cache;
    // console.log(members);
    members.map(member => {
      member.user.guild_id = guild.id;
      member.user.guild_name = guild.name;
      return member;
    });
    members = members.filter(member => member.user.bot === false);
    members.forEach(member => {
      userArray.push(member.user);
    });
  });
  res.send(userArray);
});

router.post('', async (req, res) => {
  const { content, embeds } = req.body;
  res.sendStatus(200);
});

cron.schedule('*/30 * * * * *', async () => {
  // console.log('running a task every 30 second');
  guilds = await discordClient.guilds.fetch();
  // console.log(guilds);
  guilds.forEach(async (guild) => {
    guild = await guild.fetch();
    // console.log(guild);
    members = await guild.members.fetch();
    // console.log(members);
  });
});

cron.schedule('*/30 * * * * *', async () => {
  let uniqueIds = [];
  let userArray = [];
  guilds = discordClient.guilds.cache;
  // console.log(guilds);
  guilds.forEach(guild => {
    members = guild.members.cache;
    // console.log(members);
    members.map(member => {
      member.user.guild_id = guild.id;
      member.user.guild_name = guild.name;
      return member;
    });
    members = members.filter(member => member.user.bot === false);
    members.forEach(member => {
      userArray.push(member.user);
    });
    members = members.filter(member => {
      const isDuplicate = uniqueIds.includes(member.id);
      if (!isDuplicate) {
        uniqueIds.push(member.id);
        return true;
      }
      return false;
    });
  });
});

module.exports = router;