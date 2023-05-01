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
                this.HandleRoomNoExist(messageObject);
                break;
            case "playerJoinedRoom":
                this.HandlePlayerJoinedRoom(messageObject);
                break;
            case "playerLeftRoom":
                break;
            case "roomInformation":
                this.HandleRoomInformation(messageObject);
                break;
        }
    }

    private void HandleRoomNoExist(IncomingMessage messageObject)
    {
        RoomNoExistMessage message = JsonSerializer.Deserialize<RoomNoExistMessage>(@messageObject.Message);
        OS.Alert($"The room you are attempting to join (code: {message.RoomCode}) does not exist.");
    }

    private void HandlePlayerJoinedRoom(IncomingMessage messageObject)
    {
        PlayerJoinedRoomMesage message = JsonSerializer.Deserialize<PlayerJoinedRoomMesage>(@messageObject.Message);
        OS.Alert($"Player: {message.PlayerUsername} ({message.PlayerId}) has joined room {message.RoomCode}.");
    }

    private void HandleRoomInformation(IncomingMessage messageObject)
    {
        // Now we can create the new room
        // Room room = new Room(roomCode);
        // this.GetParent().AddChild(room);
        // process the rest of the information about the room such as players, etc.
    }

}