<?php
// prevent the server from timing out
set_time_limit(0);

// include the web sockets server script (the server is started at the far bottom of this file)
require 'PHPWebSocket.php';

// set consts
const TYPE_NICKNAME = 'nickname';
const TYPE_CONNECTION = 'connection';
const TYPE_DISCONNECTION = 'disconnection';
const TYPE_MESSAGE = 'message';

/**
 * When a client sends data to the server
 * @param  string $clientID      id of the client
 * @param  string $message       message of the client
 * @param  int    $messageLength message length
 */
function wsOnMessage($clientID, $message, $messageLength, $binary) {
    global $server;
    $ip = long2ip( $server->wsClients[$clientID][6] );

    // check if message length is 0
    if ($messageLength == 0) {
        $server->wsClose($clientID);
        return;
    }

    //Send the message to everyone but the person who said it
    foreach ( $server->wsClients as $id => $client )
        if ( $id != $clientID )
            $server->wsSend($id, makeJSONMessage(TYPE_MESSAGE, $clientID, $message));
}

/**
 * When a client connects
 * @param  string $clientID id of the client
 */
function wsOnOpen($clientID)
{
    global $server;
    $ip = long2ip( $server->wsClients[$clientID][6] );

    $server->log( "$ip ($clientID) has connected." );

    //Send a join notice to everyone but the person who joined
    foreach ( $server->wsClients as $id => $client )
        if ( $id != $clientID )
            $server->wsSend($id, makeJSONMessage(TYPE_CONNECTION, $clientID));

    //Send nickname notice to the new connected user
    $server->wsSend($clientID, makeJSONMessage(TYPE_NICKNAME, $clientID, $clientID));
}

/**
 * When a client closes or lost connection
 * @param  string $clientID id of the client
 */
function wsOnClose($clientID, $status) {
    global $server;
    $ip = long2ip( $server->wsClients[$clientID][6] );

    $server->log( "$ip ($clientID) has disconnected." );

    //Send a user left notice to everyone in the room
    foreach ( $server->wsClients as $id => $client )
        $server->wsSend($id, makeJSONMessage(TYPE_DISCONNECTION, $clientID));
}

/**
 * Creates the JSON message that will be sent to the client
 * @param  string $type     message type
 *                          "nickname"      : when a user has connected to the chat, to send him his nickname
 *                          "connection"    : when a user has connected to the chat
 *                          "disconnection" : when a user has disconnected to the chat
 *                          "message"       : when a user sends a message
 * @param  string $clientID the id of the client
 * @param  string $content  the content of the message
 * @return string
 */
function makeJSONMessage($type, $clientID, $content = null) {
    if($content === null)
        $content = date('YmdHis');
    else
        $content = str_replace('\'', '\\\'', $content);
    $json = "{'type': '$type',
        'clientID': '$clientID',
        'content': '$content'}";
    return $json;
}

// start the server
$server = new PHPWebSocket();
$server->bind('message', 'wsOnMessage');
$server->bind('open', 'wsOnOpen');
$server->bind('close', 'wsOnClose');
// for other computers to connect, you will probably need to change this to your LAN IP or external IP,
// alternatively use: gethostbyaddr(gethostbyname($_SERVER['SERVER_NAME']))
$server->wsStartserver('127.0.0.1', 9300);

?>