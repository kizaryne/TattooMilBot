const {
    Telegraf,
    Markup
} = require ('telegraf')
require ('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN_M);

// Команда старт
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.username}, что бы вызвать меню оптравь /menu, если возникнут проблемы отправь /help`))

//Меню
bot.command('menu', async (ctx)=> {
    try {
    await ctx.reply('Что вам интересно?', Markup.inlineKeyboard(
    [
        [Markup.button.callback('Расписание', 'btn_1'), Markup.button.callback('Партфолио', 'btn_2'), Markup.button.callback('Отзывы', 'btn_3')]
    ]
    ))
} catch(e) {
    console.error(e)
}
})

// Работа кнопок в меню
function addActionBot(name, src, text) {
    bot.action(name, async (ctx) => {
        try{
            await ctx.answerCbQuery()
            if(src !== false) {
                await ctx.replyWithPhoto({
                   source: src 
                })
            }
           await ctx.replyWithHTML(text, {
            disable_web_page_previrw: true
           })
        } catch(e) {
            console.error(e)    
        }
    })
}

//Расписание
addActionBot('btn_1', './img/Расписание 3.jpg', text.text1)
//Партфолио
addActionBot('btn_2', './img/Эскиз 1.jpg', text.text2)
//Отзывы
addActionBot('btn_3', './img/Отзыв 1.jpg', text.text3)

// Команда старт
bot.help((ctx) => ctx.reply(`${ctx.message.from.username}, если у вас возникли проблемы с моей работой то перезапустите меня используя команду /start`))

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
