import { Context, Markup, Telegraf, Telegram } from 'telegraf';
import { Update } from 'typegram';
import { BOT_TOKEN } from './utils';

const bot: Telegraf<Context<Update>> = new Telegraf(BOT_TOKEN as string);

bot.start(ctx => {
  ctx.reply('Hello ' + ctx.from.first_name + '!');
});

bot.help(ctx => {
  ctx.reply('Send /start to receive a greeting');
  ctx.reply('Send /keyboard to receive a message with a keyboard');
  ctx.reply('Send /quit to stop the bot');
});

bot.command('quit', ctx => {
  // Explicit usage
  ctx.telegram.leaveChat(ctx.message.chat.id);

  // Context shortcut
  ctx.leaveChat();
});

bot.command('keyboard', ctx => {
  ctx.reply('Keyboard', Markup.inlineKeyboard([Markup.button.callback('First option', 'first'), Markup.button.callback('Second option', 'second')]));
});

bot.on('text', ctx => {
  ctx.reply('You choose the ' + (ctx.message.text === 'first' ? 'First' : 'Second') + ' Option!');
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
