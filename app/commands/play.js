const Command = require('./_Command')
const ytdl = require('ytdl-core')

class Play extends Command {
    name = 'play';
    description = 'Play a youtube video (audio only)';

    async execute(message) {
        var voiceChannel;

        try {
            const args = message.content.split(' ')
            const queue = message.client.queue
            const serverQueue = message.client.queue.get(message.guild.id)

            voiceChannel = message.member.voice.channel;
            if (!voiceChannel) 
                return message.channel.send(`You need to be in a voice channel to use this command.`)
            
            const permission = voiceChannel.permissionsFor(message.client.user)
            if (!permission.has('CONNECT') || !permission.has('SPEAK'))
                return message.channel.send(`Cannot connect to ${voiceChannel} because bot is missing permissions.`)
      
            const videoInfo = await ytdl.getInfo(args[1])
            const video = {
                title: videoInfo.title,
                url: videoInfo.video_url
            }

            if (!serverQueue) {
                const queueConstruct = {
                    textChannel: message.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 5,
                    playing: true
                }

                queue.set(message.guild.id, queueConstruct)
                queueConstruct.songs.push(video)

                try {
                    var connection = await voiceChannel.join();
                    queueConstruct.connection = connection;
                    this.play(message, queueConstruct.songs[0]);

                } catch(error) {
                    console.error(error)
                    queue.delete(message.guild.id)
                    return message.channel.send(error)
                }
            } else {
                serverQueue.songs.push(video);
                return message.channel.send(`${video.title} has been added to the video queue.`);
            }
        } catch (error) {
            console.error(error);
            message.channel.send(error.message);
        }
    }
    
    play (message, video) {
        const queue = message.client.queue;
        const guild = message.guild;
        const serverQueue = queue.get(message.guild.id);

        if (!video) {
            serverQueue.voiceChannel.leave();
            queue.delete(guild.id);
            return;
        }

        const dispatcher = serverQueue.connection.play(ytdl(video.url, {filter: 'audioonly'}))
            .on('end', () => {
                console.log('video ended');
                serverQueue.songs.shift();
                this.play(message, serverQueue.songs[0]);
            }).on ('error', error => {
                console.error(error);
                voiceChannel.leave();
        })

        dispatcher.setVolume(0.5);
    }
}

module.exports = new Play()