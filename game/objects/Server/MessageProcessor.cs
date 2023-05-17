using Godot;
using System.Text.Json;
using MessageTypes;

public partial class MessageProcessor : Node
{

    public void ProcessIncomingMessage(string message)
    {
        IncomingMessage messageObject = JsonSerializer.Deserialize<IncomingMessage>(@message);
        IncomingMessageType messageType = messageObject.Type;
        string messageEvent = messageObject.Event;

        switch(messageType)
        {
            case IncomingMessageType.Broadcast:
                this.HandleBroadcastMessage(messageEvent, messageObject);
            break;

            case IncomingMessageType.Individual:
                this.HandleIndividualMessage(messageEvent, messageObject);
            break;
        }

    }

    private void HandleBroadcastMessage(string messageEvent, IncomingMessage messageObject)
    {
        switch(messageEvent)
        {
            case "playerJoinedRoom":
                this.HandlePlayerJoinedRoomMessage(messageObject);
                break;
            case "playerLeftRoom":
                this.HandlePlayerLeftRoomMessage(messageObject);
                break;
        }
    }

    private void HandleIndividualMessage(string messageEvent, IncomingMessage messageObject)
    {
        switch(messageEvent)
        {
            case "roomNoExist":
                this.HandleRoomNoExistMessage(messageObject);
                break;
            case "playerInformation":
                this.HandlePlayerInformationMessage(messageObject);
                break;
            case "roomInformation":
                this.HandleRoomInformationMessage(messageObject);
                break;
        }
    }

    private void HandleRoomNoExistMessage(IncomingMessage messageObject)
    {
        RoomNoExistMessage message = JsonSerializer.Deserialize<RoomNoExistMessage>(@messageObject.Message);
        OS.Alert($"The room you are attempting to join (code: {message.RoomCode}) does not exist.");
    }

    private void HandlePlayerInformationMessage(IncomingMessage messageObject)
    {
        PlayerInformationMessage message = JsonSerializer.Deserialize<PlayerInformationMessage>(@messageObject.Message);

        // Load and instantiate Player scene
        PackedScene currentPlayerScene = GD.Load<PackedScene>("res://objects/Player/Player.tscn");
        Player currentPlayer = (Player)currentPlayerScene.Instantiate();
        
        // Assign ID and username to scene representing current player
        currentPlayer.SetId(message.PlayerId);
        currentPlayer.SetUsername(message.PlayerUsername);
        
        // Make the Player instance global
        CurrentPlayer.Obj = currentPlayer;
    }

    private void HandleRoomInformationMessage(IncomingMessage messageObject)
    {
        RoomInformationMessage message = JsonSerializer.Deserialize<RoomInformationMessage>(@messageObject.Message);
        OS.Alert($"You have joined room {message.RoomCode} containing {message.RoomPlayers.Length} other player(s).");

        // Set room code and add current player to room
        this.GetParent().GetNode<Room>("Room").SetCode(message.RoomCode);
        this.GetParent().GetNode<Room>("Room").AddChild(CurrentPlayer.Obj);

        // Add all other players to room
        for(int i = 0; i < message.RoomPlayers.Length; i++)
        {
            PackedScene playerScene = GD.Load<PackedScene>("res://objects/Player/Player.tscn");
            Player currentPlayer = (Player)playerScene.Instantiate();
            this.GetParent().GetNode<Room>("Room").AddChild(currentPlayer);
        }


    }

    private void HandlePlayerJoinedRoomMessage(IncomingMessage messageObject)
    {
        PlayerJoinedRoomMessage message = JsonSerializer.Deserialize<PlayerJoinedRoomMessage>(@messageObject.Message);
        OS.Alert($"Player: {message.PlayerUsername} ({message.PlayerId}) has joined room {message.RoomCode}.");
        
        // Add this player to room

    }

    private void HandlePlayerLeftRoomMessage(IncomingMessage messageObject)
    {
        PlayerLeftRoomMessage message = JsonSerializer.Deserialize<PlayerLeftRoomMessage>(@messageObject.Message);
        OS.Alert($"Player: {message.PlayerUsername} ({message.PlayerId}) has left the room due to: {message.DisconnectMessage} ({message.DisconnectCode}).");
    }

}