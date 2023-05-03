using Godot;
using System.Text.Json;
using MessageTypes;

public partial class MessageProcessor : Node
{

    public void ProcessIncomingMessage(string message)
    {
        IncomingMessage messageObject = JsonSerializer.Deserialize<IncomingMessage>(@message);
        string messageEvent = messageObject.Event;
        this.HandleMessageEvent(messageEvent, messageObject);
    }

    private void HandleMessageEvent(string messageEvent, IncomingMessage messageObject)
    {
        switch(messageEvent)
        {
            case "roomNoExist":
                this.HandleRoomNoExistMessage(messageObject);
                break;
            case "roomInformation":
                this.HandleRoomInformationMessage(messageObject);
                break;
            case "playerJoinedRoom":
                this.HandlePlayerJoinedRoomMessage(messageObject);
                break;
            case "playerLeftRoom":
                this.HandlePlayerLeftRoomMessage(messageObject);
                break;
        }
    }

    private void HandleRoomNoExistMessage(IncomingMessage messageObject)
    {
        RoomNoExistMessage message = JsonSerializer.Deserialize<RoomNoExistMessage>(@messageObject.Message);
        OS.Alert($"The room you are attempting to join (code: {message.RoomCode}) does not exist.");
    }

    private void HandleRoomInformationMessage(IncomingMessage messageObject)
    {
        RoomInformationMessage message = JsonSerializer.Deserialize<RoomInformationMessage>(@messageObject.Message);
        OS.Alert($"You have joined room {message.RoomCode} containing {message.RoomPlayers.Length} player(s).");

        // Load player scene, set room code and add player to room
        PackedScene player = GD.Load<PackedScene>("res://objects/Player/Player.tscn");
        this.GetParent().GetNode<Room>("Room").SetCode(message.RoomCode);
        this.GetParent().GetNode<Room>("Room").AddChild(player.Instantiate());
        // TODO: Add all players in room
    }

    private void HandlePlayerJoinedRoomMessage(IncomingMessage messageObject)
    {
        PlayerJoinedRoomMessage message = JsonSerializer.Deserialize<PlayerJoinedRoomMessage>(@messageObject.Message);
        OS.Alert($"Player: {message.PlayerUsername} ({message.PlayerId}) has joined room {message.RoomCode}.");
    }

    private void HandlePlayerLeftRoomMessage(IncomingMessage messageObject)
    {
        PlayerLeftRoomMessage message = JsonSerializer.Deserialize<PlayerLeftRoomMessage>(@messageObject.Message);
        OS.Alert($"Player: {message.PlayerUsername} ({message.PlayerId}) has left the room due to: {message.DisconnectMessage} ({message.DisconnectCode}).");
    }

}