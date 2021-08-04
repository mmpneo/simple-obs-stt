use std::collections::HashMap;
use std::sync::Arc;
use std::cmp::PartialEq;
use futures::{FutureExt, StreamExt};
use tokio::sync::{mpsc, RwLock};
use tokio_stream::wrappers::UnboundedReceiverStream;
use warp::ws::{Message, WebSocket};
use serde::{Serialize, Deserialize};
use serde_json::Value as SerdeValue;

//todo refactor this cursed file later

pub type Users = Arc<RwLock<HashMap<String, mpsc::UnboundedSender<Result<Message, warp::Error>>>>>;

// enum PeerJS_MessageType {
//     OPEN("OPEN"), -- socket ready
//     LEAVE("LEAVE"),
//     CANDIDATE("CANDIDATE"),
//     OFFER("OFFER"),
//     ANSWER("ANSWER"),
//     EXPIRE("EXPIRE"), -- host not found
//     HEARTBEAT("HEARTBEAT"),
//     ID_TAKEN("IDTAKEN"),
//     ERROR("ERROR")
// }

#[derive(Serialize, Deserialize, PartialEq)]
struct IMessage {
    #[serde(rename(serialize = "type", deserialize = "type"))]
    #[serde(default)]
    pub t: String,
    #[serde(default)]
    pub src: String,
    #[serde(default)]
    pub dst: String,
    #[serde(default)]
    pub payload: SerdeValue,
}

#[derive(Serialize, Deserialize, PartialEq)]
struct IMessageShort {
    #[serde(rename(serialize = "type", deserialize = "type"))]
    #[serde(default)]
    pub t: String
}

pub async fn user_connected(id: String, ws: WebSocket, users: Users) {
    eprintln!("connecting id: {}", id);

    let (user_ws_tx, mut user_ws_rx) = ws.split();

    // Use an unbounded channel to handle buffering and flushing of messages
    let (tx, rx) = mpsc::unbounded_channel();
    let rx = UnboundedReceiverStream::new(rx);
    tokio::task::spawn(rx.forward(user_ws_tx));

    let t_ser = serde_json::to_string(&IMessageShort { t: "OPEN".to_string() }).unwrap();
    tx.send(Ok(Message::text(t_ser)));

    users.write().await.insert(id.clone(), tx);

    let users2 = users.clone();

    // Every time the user sends a message, broadcast it to
    // all other users...
    while let Some(result) = user_ws_rx.next().await {
        let msg = match result {
            Ok(msg) => msg,
            Err(e) => {
                eprintln!("websocket error(uid={}): {}", id.clone(), e);
                break;
            }
        };
        user_message(id.clone(), msg, &users).await;
    }
    user_disconnected(id.clone(), &users2).await;
}

async fn user_disconnected(id: String, users: &Users) {
    eprintln!("disconnecting id: {}", id);
    users.write().await.remove(&id);
}

async fn user_message(id: String, msg: Message, users: &Users) {
    let msg = if let Ok(s) = msg.to_str() { s } else { return; };
    let mut des_message: IMessage = serde_json::from_str(msg).unwrap();
    let users = users.read().await;

    if des_message.t == "OFFER" && !users.contains_key(des_message.dst.as_str()) {
        let target = users.get(&id).unwrap();
        let t_ser = serde_json::to_string(&IMessage {
            t: "EXPIRE".to_string(),
            src: des_message.dst,
            dst: id.clone(),
            payload: des_message.payload
        }).unwrap();
        target.send(Ok(Message::text(t_ser)));
    }
    else if des_message.dst != "" && users.contains_key(des_message.dst.as_str()) {
        des_message.src = id;
        let target = users.get(des_message.dst.as_str()).unwrap();
        let ser_message = serde_json::to_string(&des_message).unwrap();
        target.send(Ok(Message::text(ser_message)));
    }
}
