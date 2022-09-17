let limit = 80
import fs from 'fs'
import fetch from 'node-fetch'
import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper';
let handler = async (m, { conn, args, isPrems, isOwner }) => {
if (!args || !args[0]) throw '*𝑸𝒖𝒆 𝒆𝒔𝒕𝒂́ 𝒃𝒖𝒔𝒄𝒂𝒏𝒅𝒐? 𝑰𝒏𝒔𝒆𝒓𝒕𝒆 𝒆𝒍 𝒄𝒐𝒎𝒂𝒏𝒅𝒐 𝒎𝒂́𝒔 𝒆𝒍 𝒆𝒏𝒍𝒂𝒄𝒆/𝒍𝒊𝒏𝒌𝑫𝒆 𝒖𝒏 𝒗𝒊́𝒅𝒆𝒐 𝒅𝒆 𝒀𝒐𝒖𝒕𝒖𝒃𝒆*'
await conn.reply(m.chat, `*_⏳Sᴇ ᴇsᴛᴀ ᴘʀᴏᴄᴇsᴀɴᴅᴏ Sᴜ ᴀᴜᴅɪᴏ...⏳_*`, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, 
title: '𝑫𝒋 𝑩𝒐𝒕',
body: '𝑻𝒉𝒆 𝑳𝒐𝒍𝒊𝒃𝒐𝒕-𝑴𝑫',
previewType: 0, thumbnail: fs.readFileSync("./Menu2.jpg"),
sourceUrl: `https://github.com/BrunoSobrino/TheMystic-Bot-MD`}}})
let chat = global.db.data.chats[m.chat]
const isY = /y(es)/gi.test(args[1])
const { thumbnail, audio: _audio, title } = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
const limitedSize = (isPrems || isOwner ? 99 : limit) * 1024
let audio, source, res, link, lastError, isLimit
for (let i in _audio) {
try {
audio = _audio[i]
isLimit = limitedSize < audio.fileSize
if (isLimit) continue
link = await audio.download()
if (link) res = await fetch(link)
isLimit = res?.headers.get('content-length') && parseInt(res.headers.get('content-length')) < limitedSize
if (isLimit) continue
if (res) source = await res.arrayBuffer()
if (source instanceof ArrayBuffer) break
} catch (e) {
audio = link = source = null
lastError = e
}}
await conn.sendMessage(m.chat, { document: { url: link}, mimetype: 'audio/mpeg', fileName: `${title}.mp3`}, {quoted: m})
}
handler.command = /^ytmp3doc|ytadoc|ytmp3.2|yta.2$/i
handler.limit = 1
export default handler
