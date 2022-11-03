/**
 * An HTTP endpoint that acts as a webhook for Discord guild.member.add event
 * @param {object} event
 * @returns {any} result
 */
module.exports = async (event, context) => {

  const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
  const {registerFont, createCanvas, loadImage, Image} = require('canvas')

  const comicsans = require('@canvas-fonts/arial');
  registerFont(comicsans, {family: 'Arial'});

  const canvas = createCanvas(400, 200)
  const ctx = canvas.getContext('2d')

  const background = new Image();
  background.src = "https://user-images.githubusercontent.com/64305974/169025716-523264ab-1be9-49ee-bd60-41e02cdadbac.jpg";
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = '#ffffff';

  background.onload = function(){
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      ctx.textAlign = 'center';
      ctx.fillText(`Welcome`, 200, 140);
      ctx.fillText(`${context.params.event.user.username}!`, 200, 170)
  }

  ctx.font = '900 24px "Arial"';
  ctx.fillStyle = '#f6f7f7';

  let user = await lib.discord.users['@0.1.5'].retrieve({
    user_id: context.params.event.user.id
  });

  let avatar_url = user.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
    : `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`;

  let image = await loadImage(avatar_url);
    ctx.save();
    ctx.beginPath();
    ctx.arc(200, 50, 35, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(image, 165, 15, 70, 70);
    ctx.beginPath();
    ctx.arc(0, 0, 35, 0, Math.PI * 2, true);
    ctx.clip();
    ctx.closePath();
    ctx.restore();

  return lib.discord.channels['@0.2.1'].messages.create({
      channel_id: `893167703328714792`,
      content: ``,
      file: canvas.toBuffer(),
      filename: 'welcome.png',
    });

};
