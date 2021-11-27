var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
            case 'НайдиЯойщика':
                bot.sendMessage({
                    to: channelID,
                    message: "Это же "+"<@301010748145139713>"
                });
            break;
            case 'помощь':
                bot.sendMessage({
                    to: channelID,
                    message: 'Список команд: \n !помощь - список команд \n !НайдиЯойщика - ищет главного яойщика сервера \n !ГдеДеньгиЗин - рассчитывает дату получения первой прибыли компании'
                });
            break;
            case 'ГдеДеньгиЗин':
            	var start = new Date(2014, 06, 09), // month is zero based
			    now  = new Date,
			    end,
			    revenue = 7.5;               // no arguments -> current date
				Math.round((now-start)/(1000*60*60*24)*100/revenue); // round the amount of days
				end= new Date(now+Math.round((now-start)*100/revenue));
				var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
				end.setDate(now.getDate() + Math.round((now-start)/(1000*60*60*24)*100/revenue)); 
				//end.toLocaleDateString("ru-ru")
                bot.sendMessage({
                    to: channelID,
                    message: 'Первая прибыль компании ожидается '+end.getDate()+'.'+(end.getMonth()+1)+'.'+end.getFullYear()+' (через '+Math.round((now-start)/(1000*60*60*24)*100/revenue)+' дней)\n'
                });
            break;
            case 'ОБоте':
                bot.sendMessage({
                    to: channelID,
                    message: 'Dimini Bot\nVersion 0.0.3\nbuild 20211127173000\nDevelopment: Dmitry Yaskovich\n'
                });
            break;
    //         case 'выключиИлью':
		  // let userToModify = message.mentions.members.first();
    //               let roleToAdd = message.mentions.roles.first();
    //               userToModify.addRole(roleToAdd);
    //         break;
            default:
                bot.sendMessage({
                    to: channelID,
                    message: 'Функционал бота сравним с прибылью компании, отстаньте от него'
                });
            // Just add any case commands if you want to..
         }
     }
});