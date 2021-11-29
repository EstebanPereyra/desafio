import fs from 'fs';

export class Chat {
    async getAllChat(){
        try{
            let data = await fs.promises.readFile('./chat.txt','utf-8');
            let chats = JSON.parse(data);
            return {status:"success",payload:chats}
        }catch (error){
            return {status:"error",message:`Error al obtener los mensajes de chat. Intente más tarde. ${error}`}
        }
    }
    async registerChat(chat){
        try{
            let data = await fs.promises.readFile('./chat.txt','utf-8');
            let chats = JSON.parse(data);
            let id = chats[chats.length-1].id+1;
            chat = Object.assign({id:id},chat);
            chats.push(chat);
            try{
                await fs.promises.writeFile('./chat.txt',JSON.stringify(chats,null,2));
                return {status:"success",message:"Mensaje añadido correctamente"}
            }catch (error){
                return {statis:"error",message:`No se pudo añadir el mensaje. Intente más tarde. ${error}`} 
            }
        }catch{
            chat = Object.assign({id:1},chat)
            try{
                await fs.promises.writeFile('./chat.txt',JSON.stringify([chat],null,2));
                return {status:"success", message:"Mensaje añadido correctamente"}
            }
            catch{
                return {status:"error",message:"No se pudo añadir el mensaje"}
            }
        }
    }

}

export default Chat;