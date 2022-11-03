const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

if(context.params.event.content.includes("k.status")) {
  // This is our code which updates our status!
  // You could improve it by letting the user specify what the status should be set to
  lib.discord.users['@0.1.5'].me.status.update({
    activity_name: `with Coffee`,
    activity_type: 'GAME',
    status: 'ONLINE'
  });
  
  // This code posts in our Discord channel when our command is run!
  return lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `Status set!`
  });
}

// This code checks if our message includes !clearstatus
// We only want to clear their status if it does!
if(context.params.event.content.includes("k.clearstatus")) {
  
  // This code clears our custom status
  lib.discord.users['@0.1.5'].me.status.clear();
  
  // This code posts in our Discord channel when our command is run!
  return lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `Status cleared!`
  });
}